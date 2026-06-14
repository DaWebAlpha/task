Continuing with **MongoDB Database** — replacing our in-memory array with real persistent storage.

---

# MONGODB SETUP

## What is MongoDB?

**MongoDB** = A document database. Instead of tables (like SQL), it stores **JSON-like documents** in collections.

| SQL (MySQL) | MongoDB |
|-------------|---------|
| Table | Collection |
| Row | Document |
| Column | Field |
| Schema | Flexible structure |

**Why MongoDB for this project:**
- JavaScript/JSON native format (no conversion needed)
- Flexible schema (tasks can have optional fields)
- Easy to set up and use with Node.js

---

## STEP 1: Install MongoDB

**Option A: Local MongoDB (installed on your computer)**

Download from [mongodb.com](https://www.mongodb.com/try/download/community) or use Homebrew:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Option B: MongoDB Atlas (cloud — free tier)**

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up for free
3. Create cluster → Get connection string

**For learning, we'll use local MongoDB.** The code works the same for Atlas, just change the connection string.

---

## STEP 2: Update .env for MongoDB

**File:** `task_manager/server/.env`

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
```

**Connection string breakdown:**
```
mongodb://  ← Protocol
localhost:27017  ← Server address and port
/taskmanager  ← Database name (created automatically)
```

---

## STEP 3: Create Mongoose Model

**Mongoose** = ODM (Object Document Mapper). It lets you define schemas and provides methods to interact with MongoDB.

**File:** `task_manager/server/models/Task.js`

```javascript
const mongoose = require("mongoose");

// Define the schema (structure of documents)
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title must be less than 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description must be less than 500 characters"],
    default: "",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],  // Only these values allowed
    default: "medium",
  },
  dueDate: {
    type: String,  // Stored as YYYY-MM-DD string
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Auto-set to current time
  },
});

// Create the model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
```

---

## LINE-BY-LINE: Mongoose Schema Explained

### Schema Definition

```javascript
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
});
```

**What this does:**
- Defines what fields a Task document can have
- Specifies types (String, Number, Date, Boolean, etc.)
- Sets validation rules

### Validation Options

| Option | What It Does | Example |
|--------|-------------|---------|
| `required` | Field must exist | `required: [true, "Custom error message"]` |
| `minlength` | Minimum string length | `minlength: 3` |
| `maxlength` | Maximum string length | `maxlength: 100` |
| `trim` | Remove whitespace from ends | `trim: true` |
| `default` | Value if not provided | `default: "medium"` |
| `enum` | Only allow specific values | `enum: ["low", "medium", "high"]` |

### Model Creation

```javascript
const Task = mongoose.model("Task", taskSchema);
```

**What this does:**
- Creates a model named "Task"
- MongoDB automatically pluralizes: collection becomes `tasks`
- Gives you methods like `Task.find()`, `Task.create()`, `Task.findById()`

---

## STEP 4: Update server.js to Connect to MongoDB

**File:** `task_manager/server/server.js`

```javascript
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);  // Exit if can't connect
  });

// Routes
app.use("/api/tasks", require("./routes/tasks"));

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "Task Manager API is running!",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## STEP 5: Update Routes to Use MongoDB

**File:** `task_manager/server/routes/tasks.js`

```javascript
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET /api/tasks — Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });  // Newest first
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// GET /api/tasks/:id — Get single task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// POST /api/tasks — Create task
router.post("/", async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    // Validation
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ error: "Title must be at least 3 characters" });
    }

    const newTask = new Task({
      title: title.trim(),
      description: (description || "").trim(),
      priority: priority || "medium",
      dueDate: dueDate || "",
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    if (err.name === "ValidationError") {
      // Mongoose validation error
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PATCH /api/tasks/:id/toggle — Toggle status
router.patch("/:id/toggle", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.status = task.status === "pending" ? "completed" : "pending";
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle task" });
  }
});

// DELETE /api/tasks/:id — Delete task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
```

---

## LINE-BY-LINE: MongoDB Operations Explained

### Finding Documents

```javascript
const tasks = await Task.find().sort({ createdAt: -1 });
```

| Method | What It Does |
|--------|-------------|
| `Task.find()` | Get all documents |
| `Task.findById(id)` | Get one document by ID |
| `Task.findOne({ status: "pending" })` | Get first matching document |
| `.sort({ createdAt: -1 })` | Sort by field (-1 = descending, 1 = ascending) |

### Creating Documents

```javascript
const newTask = new Task({ title: "Buy milk" });
const savedTask = await newTask.save();
```

**Two steps:**
1. `new Task(data)` — Create instance in memory
2. `.save()` — Save to database (returns saved document with `_id`)

### Updating Documents

```javascript
const task = await Task.findById(id);
task.status = "completed";
await task.save();
```

**Alternative (direct update):**
```javascript
await Task.findByIdAndUpdate(id, { status: "completed" });
```

### Deleting Documents

```javascript
const task = await Task.findByIdAndDelete(id);
```

**Returns:** The deleted document (or null if not found)

---

## STEP 6: Update Frontend Service for MongoDB IDs

MongoDB uses `_id` (string) instead of `id` (number). We need to handle this.

**File:** `task_manager/client/src/services/taskApi.js`

```javascript
const API_URL = "http://localhost:5000/api/tasks";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Network error" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
};

// GET all tasks
export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  const tasks = await handleResponse(response);
  // Normalize MongoDB _id to id for frontend consistency
  return tasks.map(task => ({ ...task, id: task._id }));
};

// GET single task
export const fetchTaskById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const task = await handleResponse(response);
  return { ...task, id: task._id };
};

// CREATE task
export const createTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  const task = await handleResponse(response);
  return { ...task, id: task._id };
};

// TOGGLE status
export const toggleTaskStatus = async (id) => {
  const response = await fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
  });
  const task = await handleResponse(response);
  return { ...task, id: task._id };
};

// DELETE task
export const deleteTaskById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
```

**Why normalize `_id` to `id`?**
- MongoDB uses `_id` (ObjectId string like "507f1f77bcf86cd799439011")
- Our frontend components expect `id` (used in `key={task.id}`, URLs like `/task/123`)
- Mapping ensures consistency across the app

---

## STEP 7: Test Everything

**1. Start MongoDB (if local):**
```bash
brew services start mongodb-community  # Mac
# Or ensure MongoDB service is running
```

**2. Start Backend:**
```bash
cd task_manager/server
npm run dev
```

**3. Start Frontend (new terminal):**
```bash
cd task_manager/client
npm run dev
```

**4. Test in Browser:**
- Open `http://localhost:5173`
- Add tasks → Check `http://localhost:5000/api/tasks` (they persist)
- Refresh page → Tasks still there (from database)
- Toggle complete → Updates in database
- Delete → Removed from database
- Restart server → Tasks still there (MongoDB persists)

---

## WHAT YOU'VE BUILT

| Layer | Technology | Role |
|-------|-----------|------|
| Frontend | React + Vite | User interface |
| Styling | Tailwind CSS | Visual design |
| Routing | React Router | Page navigation |
| State | useReducer + Context | App state |
| HTTP Client | Fetch API | Talk to backend |
| Backend | Express.js | API server |
| Database | MongoDB | Persistent storage |
| ODM | Mongoose | Database interaction |

---

## NEXT STEPS (Optional Enhancements)

1. **Edit Task** — PATCH endpoint to update title/description
2. **Search/Filter** — Backend query parameters (`?status=pending&priority=high`)
3. **Pagination** — `?page=1&limit=10` for large task lists
4. **Authentication** — JWT tokens, login/register
5. **Deployment** — Host on Render/Railway/Vercel

**Ready for any of these?** Or are you satisfied with the full-stack Task Manager and want to move to a new project?
