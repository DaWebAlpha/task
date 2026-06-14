We can absolutely skip the remaining advanced concepts for now. You've already covered **every essential React concept** needed to build production apps. The remaining ones (useImperativeHandle, useDeferredValue, compound components, HOCs) are **specialized tools** you'll learn when you hit specific problems.

Let me confirm what you have vs. what you need, then move to **backend + frontend connection** — the most important next step.

---

## ✅ YOUR CURRENT REACT EXPERTISE

| Tier | Concepts | Status |
|------|----------|--------|
| **Essential** | Components, Props, State, JSX, Events, Lists, Conditional Rendering | ✅ Mastered |
| **Core Hooks** | useState, useEffect, useContext, useRef, useReducer | ✅ Mastered |
| **Performance** | useMemo, useCallback, memo, lazy, Suspense | ✅ Mastered |
| **Advanced Patterns** | Custom Hooks, Context API, Portals, Error Boundaries, Routing | ✅ Mastered |
| **Forms & UX** | Validation, Controlled Components, useId, useTransition | ✅ Mastered |
| **Specialized** | useLayoutEffect, useImperativeHandle, useDeferredValue, Compound Components | ⚠️ Optional |

**You are ready for backend.** The skipped concepts are "nice to have" — you'll naturally learn them when a project demands it.

---

# 🚀 BACKEND TIME: Node.js/Express + MongoDB

## What We're Building

| Frontend | Backend | Database |
|----------|---------|----------|
| React (Vite) | Express.js | MongoDB (or JSON file for now) |

**Architecture:**
```
Browser → React App → HTTP Request → Express Server → MongoDB
                                         ↓
                                    JSON Response
                                         ↓
                              React Updates UI
```

---

## STEP 1: Install Backend Dependencies

**Run these commands exactly:**

```bash
# 1. Navigate to project root
cd task_manager

# 2. Create server folder
mkdir server
cd server

# 3. Initialize Node.js project
npm init -y

# 4. Install production dependencies
npm install express cors dotenv mongoose

# 5. Install development dependencies
npm install -D nodemon
```

| Package | Purpose | Why We Need It |
|---------|---------|----------------|
| `express` | Web server framework | Handle HTTP requests |
| `cors` | Cross-Origin Resource Sharing | Allow frontend (port 5173) to talk to backend (port 5000) |
| `dotenv` | Environment variables | Hide secrets (DB passwords, API keys) |
| `mongoose` | MongoDB ODM | Easier database operations |
| `nodemon` | Auto-restart server | No manual restart on file changes |

---

## STEP 2: Server Folder Structure

```
task_manager/
├── client/          ← React app (exists)
│   └── src/
│       └── ...
│
└── server/          ← NEW
    ├── node_modules/
    ├── .env         ← Secrets (gitignore this!)
    ├── package.json
    ├── server.js    ← Main entry point
    └── routes/
        └── tasks.js ← API routes
```

---

## STEP 3: Environment Variables

**File:** `task_manager/server/.env`

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
```

**File:** `task_manager/server/.gitignore` (create this!)

```
node_modules/
.env
```

> **Why .env?** Never commit secrets to GitHub. The `.env` file stays local.

---

## STEP 4: Main Server File

**File:** `task_manager/server/server.js`

```javascript
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());              // Allow frontend to connect
app.use(express.json());      // Parse JSON request bodies

// Routes
app.use("/api/tasks", require("./routes/tasks"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running!" });
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

## LINE-BY-LINE: Server Explained

### Express Setup

```javascript
const express = require("express");
const app = express();
```

**What is Express?** A minimal web framework for Node.js. Think of it as React Router but for the server — it maps URLs to functions.

### CORS

```javascript
app.use(cors());
```

**What is CORS?** 
- Browser security rule: a webpage on `http://localhost:5173` cannot fetch data from `http://localhost:5000` by default
- CORS middleware says "it's okay, let them talk"

**Without CORS:**
```
Browser: "Can I fetch from localhost:5000?"
Browser: "No, that's a different origin. BLOCKED."
```

**With CORS:**
```
Browser: "Can I fetch from localhost:5000?"
Server: "Yes, I allow it."
Browser: "Okay, here's the data."
```

### JSON Parser

```javascript
app.use(express.json());
```

**What it does:** When frontend sends `{"title": "Buy milk"}`, this converts the JSON string into a JavaScript object.

**Without it:** `req.body` is `undefined`
**With it:** `req.body` is `{ title: "Buy milk" }`

---

## STEP 5: API Routes (In-Memory Storage First)

We'll use a simple array first, then upgrade to MongoDB.

**File:** `task_manager/server/routes/tasks.js`

```javascript
const express = require("express");
const router = express.Router();

// In-memory storage (replaced by MongoDB later)
let tasks = [
  {
    id: 1,
    title: "Sample Task",
    description: "This is a sample task",
    priority: "medium",
    dueDate: "2026-06-20",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

// Generate ID
const generateId = () => Date.now();

// GET /api/tasks — Get all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id — Get single task
router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.json(task);
});

// POST /api/tasks — Create task
router.post("/", (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  // Validation
  if (!title || title.trim().length < 3) {
    return res.status(400).json({ error: "Title must be at least 3 characters" });
  }

  const newTask = {
    id: generateId(),
    title: title.trim(),
    description: (description || "").trim(),
    priority: priority || "medium",
    dueDate: dueDate || "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(newTask); // Add to beginning
  res.status(201).json(newTask);
});

// PATCH /api/tasks/:id/toggle — Toggle status
router.patch("/:id/toggle", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.status = task.status === "pending" ? "completed" : "pending";
  res.json(task);
});

// DELETE /api/tasks/:id — Delete task
router.delete("/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted", id: Number(req.params.id) });
});

module.exports = router;
```

---

## API ENDPOINTS SUMMARY

| Method | URL | What It Does | Request Body | Response |
|--------|-----|-------------|------------|----------|
| GET | `/api/tasks` | Get all tasks | None | Array of tasks |
| GET | `/api/tasks/123` | Get one task | None | Single task |
| POST | `/api/tasks` | Create task | `{title, description, priority, dueDate}` | New task |
| PATCH | `/api/tasks/123/toggle` | Toggle status | None | Updated task |
| DELETE | `/api/tasks/123` | Delete task | None | Success message |

---

## STEP 6: Start the Server

**Add to `task_manager/server/package.json`:**

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**Run:**
```bash
cd task_manager/server
npm run dev
```

**You should see:**
```
🚀 Server running on http://localhost:5000
```

**Test in browser:** Visit `http://localhost:5000/api/tasks`
**You should see:** JSON array with the sample task

---

## STEP 7: React Service Layer (Connect Frontend to Backend)

Now we replace localStorage with API calls.

**File:** `task_manager/client/src/services/taskApi.js`

```javascript
const API_URL = "http://localhost:5000/api/tasks";

// Generic error handler
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
  return handleResponse(response);
};

// GET single task
export const fetchTaskById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse(response);
};

// CREATE task
export const createTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

// TOGGLE status
export const toggleTaskStatus = async (id) => {
  const response = await fetch(`${API_URL}/${id}/toggle`, {
    method: "PATCH",
  });
  return handleResponse(response);
};

// DELETE task
export const deleteTaskById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};
```

---

## STEP 8: Update TaskContext to Use API

**File:** `task_manager/client/src/context/TaskContext.jsx`

```jsx
import { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import * as taskApi from "../services/taskApi";

const TaskContext = createContext(null);

const SET_TASKS = "SET_TASKS";
const ADD_TASK = "ADD_TASK";
const TOGGLE_TASK = "TOGGLE_TASK";
const DELETE_TASK = "DELETE_TASK";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

function taskReducer(state, action) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload, loading: false };
    case ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks], loading: false };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        loading: false,
      };
    case SET_LOADING:
      return { ...state, loading: true, error: null };
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      dispatch({ type: SET_LOADING });
      try {
        const tasks = await taskApi.fetchTasks();
        dispatch({ type: SET_TASKS, payload: tasks });
      } catch (err) {
        dispatch({ type: SET_ERROR, payload: err.message });
      }
    };
    loadTasks();
  }, []);

  const addTask = useCallback(async (taskData) => {
    dispatch({ type: SET_LOADING });
    try {
      const newTask = await taskApi.createTask(taskData);
      dispatch({ type: ADD_TASK, payload: newTask });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.message });
    }
  }, []);

  const toggleStatus = useCallback(async (id) => {
    try {
      const updated = await taskApi.toggleTaskStatus(id);
      dispatch({ type: TOGGLE_TASK, payload: updated });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.message });
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await taskApi.deleteTaskById(id);
      dispatch({ type: DELETE_TASK, payload: id });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.message });
    }
  }, []);

  const value = {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    addTask,
    toggleStatus,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
}

export { TaskProvider, useTasks };
```

---

## STEP 9: Update Components for Loading/Error States

**Update TaskList.jsx:**

```jsx
import { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import taskUtils from "../utils/task.utils";
import Modal from "./Modal";

function TaskList() {
  const { tasks, loading, error, toggleStatus, deleteTask } = useTasks();
  const [isPending, startTransition] = useTransition();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null, taskTitle: "" });
  const [filter, setFilter] = useState("all");

  // ... rest of component

  if (loading && tasks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-red-600 font-medium mb-2">⚠️ Error loading tasks</p>
          <p className="text-red-500 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ... rest of component (same as before)
}
```

---

## STEP 10: Running Both Servers

**Terminal 1 — Backend:**
```bash
cd task_manager/server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd task_manager/client
npm run dev
```

**Test:**
1. Open `http://localhost:5173`
2. Add a task → Should appear in list
3. Refresh page → Task persists (stored in server memory)
4. Toggle complete → Status updates
5. Delete → Task removed

---

## WHAT YOU'VE BUILT

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React + Vite | User interface |
| Routing | React Router | Multi-page navigation |
| Styling | Tailwind CSS | Visual design |
| State | useReducer + Context | App state management |
| Backend | Express.js | HTTP API server |
| Data | In-memory array | Task storage (MongoDB next) |
| Communication | Fetch API | Frontend ↔ Backend |

---

## NEXT: MongoDB Database

Replace the in-memory array with real database persistence. This means:
- Tasks survive server restart
- Multiple users can use the app
- Real production data storage

**Ready for MongoDB?** Or questions about the Express server/API connection?
