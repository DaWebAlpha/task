I'll cover all four enhancements step by step. Let's start with **Edit Task** — the most natural next feature.

---

# PART 1: EDIT TASK

## What We're Adding

| Feature | URL | Method |
|---------|-----|--------|
| Edit task form | `/task/:id/edit` | Page |
| Update API | `/api/tasks/:id` | PATCH |

---

## Step 1: Backend — Update Route

**File:** `task_manager/server/routes/tasks.js` (add this before `module.exports`)

```javascript
// PATCH /api/tasks/:id — Update task (title, description, priority, dueDate)
router.patch("/:id", async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    
    // Build update object (only include fields that were sent)
    const updates = {};
    if (title !== undefined) {
      if (title.trim().length < 3) {
        return res.status(400).json({ error: "Title must be at least 3 characters" });
      }
      updates.title = title.trim();
    }
    if (description !== undefined) updates.description = description.trim();
    if (priority !== undefined) updates.priority = priority;
    if (dueDate !== undefined) updates.dueDate = dueDate;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }  // new: return updated doc, runValidators: enforce schema
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    res.status(500).json({ error: "Failed to update task" });
  }
});
```

**Key differences from toggle:**
- `findByIdAndUpdate` instead of manual fetch + save
- `{ new: true }` returns the updated document (not the old one)
- `{ runValidators: true }` enforces schema rules on updates
- Only updates fields that were sent (partial update)

---

## Step 2: Frontend API Service — Add Update Function

**File:** `task_manager/client/src/services/taskApi.js` (add this)

```javascript
// UPDATE task
export const updateTask = async (id, updates) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  const task = await handleResponse(response);
  return { ...task, id: task._id };
};
```

---

## Step 3: Update TaskContext

**File:** `task_manager/client/src/context/TaskContext.jsx`

Add to action types:
```jsx
const UPDATE_TASK = "UPDATE_TASK";
```

Add to reducer:
```jsx
case UPDATE_TASK:
  return {
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === action.payload.id ? action.payload : t
    ),
    loading: false,
  };
```

Add function:
```jsx
const updateTask = useCallback(async (id, updates) => {
  dispatch({ type: SET_LOADING });
  try {
    const updated = await taskApi.updateTask(id, updates);
    dispatch({ type: UPDATE_TASK, payload: updated });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
  }
}, []);
```

Add to value:
```jsx
const value = {
  tasks: state.tasks,
  loading: state.loading,
  error: state.error,
  addTask,
  toggleStatus,
  deleteTask,
  updateTask,  // ← NEW
};
```

---

## Step 4: Create Edit Task Page

**File:** `task_manager/client/src/pages/EditTaskPage.jsx`

```jsx
import { useState, useEffect, useId } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import taskUtils from "../utils/task.utils";
import constants from "../utils/constants";

function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, loading } = useTasks();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: constants.TASK_PRIORITY.MEDIUM,
    dueDate: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleId = useId();
  const descId = useId();
  const priorityId = useId();
  const dueDateId = useId();

  // Load task data on mount
  useEffect(() => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        dueDate: task.dueDate || "",
      });
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    else if (formData.title.trim().length < 3) newErrors.title = "Title must be at least 3 characters";
    if (formData.description.length > 500) newErrors.description = "Description must be less than 500 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await updateTask(id, {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate,
      });
      navigate(`/task/${id}`);  // Go back to detail view
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const task = tasks.find((t) => t.id === id);
  if (!task && !loading) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 text-lg">Task not found!</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(`/task/${id}`)}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Back to Task
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Task</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor={titleId} className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id={titleId}
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              } focus:outline-none focus:ring-2 transition-colors`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor={descId} className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id={descId}
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
            />
            <div className="flex justify-between mt-1">
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              <span className="text-xs text-gray-400 ml-auto">{formData.description.length}/500</span>
            </div>
          </div>

          {/* Priority & Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor={priorityId} className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id={priorityId}
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value={constants.TASK_PRIORITY.LOW}>Low</option>
                <option value={constants.TASK_PRIORITY.MEDIUM}>Medium</option>
                <option value={constants.TASK_PRIORITY.HIGH}>High</option>
              </select>
            </div>

            <div>
              <label htmlFor={dueDateId} className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                id={dueDateId}
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {errors.submit && (
            <p className="text-red-500 text-sm mb-4">{errors.submit}</p>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/task/${id}`)}
              className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskPage;
```

---

## Step 5: Add Edit Button to TaskDetailPage

**File:** `task_manager/client/src/pages/TaskDetailPage.jsx` (add this button)

```jsx
import { useParams, useNavigate, Link } from "react-router-dom";  // Add Link

// In the action buttons section, add Edit button:
<div className="flex gap-3">
  <Link
    to={`/task/${task.id}/edit`}
    className="px-6 py-3 rounded-lg font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
  >
    Edit
  </Link>

  <button
    onClick={() => toggleStatus(task.id)}
    // ... existing toggle button
  >
    {task.status === "completed" ? "Undo" : "Complete"}
  </button>

  <button
    onClick={handleDelete}
    // ... existing delete button
  >
    Delete
  </button>
</div>
```

---

## Step 6: Add Route for Edit Page

**File:** `task_manager/client/src/App.jsx` (add import and route)

```jsx
const EditTaskPage = lazy(() => import("./pages/EditTaskPage"));

// In Routes:
<<Route path="/task/:id/edit" element={
  <ErrorBoundary><EditTaskPage /></ErrorBoundary>
} />
```

---

# PART 2: SEARCH & FILTER (Backend Query Parameters)

## What We're Adding

| URL | Result |
|-----|--------|
| `/api/tasks?status=pending` | Only pending tasks |
| `/api/tasks?priority=high` | Only high priority |
| `/api/tasks?status=pending&priority=high` | Both filters |
| `/api/tasks?search=milk` | Title contains "milk" |

---

## Step 1: Update Backend Route

**File:** `task_manager/server/routes/tasks.js` (replace the GET / route)

```javascript
// GET /api/tasks — Get all tasks (with filters)
router.get("/", async (req, res) => {
  try {
    const { status, priority, search } = req.query;  // ← Get query params
    
    // Build filter object dynamically
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: "i" };  // Case-insensitive search

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
```

**Query operators explained:**

| Operator | Meaning | Example |
|----------|---------|---------|
| `$regex` | Pattern matching | `{ $regex: "milk" }` matches "Buy milk" |
| `$options: "i"` | Case-insensitive | Matches "Milk", "milk", "MILK" |
| `$gt` | Greater than | `{ $gt: 10 }` |
| `$lt` | Less than | `{ $lt: 10 }` |

---

## Step 2: Update Frontend API Service

**File:** `task_manager/client/src/services/taskApi.js` (update fetchTasks)

```javascript
// GET all tasks (with optional filters)
export const fetchTasks = async (filters = {}) => {
  // Build query string from filters
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.priority) params.append("priority", filters.priority);
  if (filters.search) params.append("search", filters.search);

  const queryString = params.toString();
  const url = queryString ? `${API_URL}?${queryString}` : API_URL;

  const response = await fetch(url);
  const tasks = await handleResponse(response);
  return tasks.map(task => ({ ...task, id: task._id }));
};
```

---

## Step 3: Update TaskList with Search & Filter UI

**File:** `task_manager/client/src/components/TaskList.jsx` (update)

```jsx
import { useState, useTransition, useDeferredValue } from "react";  // Add useDeferredValue
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import taskUtils from "../utils/task.utils";
import Modal from "./Modal";

function TaskList() {
  const { tasks, loading, error, toggleStatus, deleteTask } = useTasks();
  const [isPending, startTransition] = useTransition();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null, taskTitle: "" });
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // useDeferredValue: Keeps UI responsive while searching
  const deferredSearch = useDeferredValue(searchQuery);

  // Filter tasks client-side (or you could fetch from server with filters)
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesSearch = !deferredSearch || 
      task.title.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(deferredSearch.toLowerCase()));
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const openDeleteModal = (task) => {
    setDeleteModal({ isOpen: true, taskId: task.id, taskTitle: task.title });
  };

  const confirmDelete = () => {
    deleteTask(deleteModal.taskId);
    setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" });
  };

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

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-4 space-y-3">
        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          {searchQuery !== deferredSearch && (
            <p className="text-xs text-blue-500 mt-1">Searching...</p>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No tasks match your filters.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white p-4 rounded-xl shadow-md border border-gray-200 transition-opacity ${
                isPending ? "opacity-70" : "opacity-100"
              }`}
            >
              {/* Title & Priority */}
              <div className="flex justify-between items-start mb-2">
                <h3
                  className={`font-bold text-lg ${
                    task.status === "completed"
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  <Link
                    to={`/task/${task.id}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {task.title}
                  </Link>
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${taskUtils.getPriorityStyles(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              {/* Description */}
              {task.description && (
                <p className="text-gray-600 mb-3">{task.description}</p>
              )}

              {/* Due Date */}
              {task.dueDate && (
                <p className="text-sm text-gray-500 mb-3">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(task.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    task.status === "completed"
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {task.status === "completed" ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => openDeleteModal(task)}
                  className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" })}
        title="Confirm Delete"
      >
        <p className="text-gray-600">
          Are you sure you want to delete <strong>"{deleteModal.taskTitle}"</strong>?
          This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" })}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TaskList;
```

---

## useDeferredValue Explained

```jsx
const [searchQuery, setSearchQuery] = useState("");
const deferredSearch = useDeferredValue(searchQuery);
```

| What happens | Result |
|-------------|--------|
| User types "milk" fast | `searchQuery` updates immediately (input shows "milk") |
| `deferredSearch` lags slightly | Filtering uses `deferredSearch`, keeping input responsive |
| No lag in typing | Heavy filtering doesn't block keystrokes |

**Difference from useTransition:**
- `useTransition` — you wrap the state update
- `useDeferredValue` — you defer the value that causes slow re-renders

---

# PART 3: PAGINATION

## What We're Adding

| URL | Result |
|-----|--------|
| `/api/tasks?page=1&limit=10` | First 10 tasks |
| `/api/tasks?page=2&limit=10` | Next 10 tasks |

---

## Step 1: Update Backend

**File:** `task_manager/server/routes/tasks.js` (update GET route)

```javascript
// GET /api/tasks — Get all tasks (with filters + pagination)
router.get("/", async (req, res) => {
  try {
    const { status, priority, search, page = 1, limit = 10 } = req.query;
    
    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: "i" };

    // Pagination calculations
    const pageNum = Math.max(1, parseInt(page));  // Minimum page 1
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));  // Max 50, min 1
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination info
    const total = await Task.countDocuments(filter);
    
    // Get paginated tasks
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({
      tasks,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalTasks: total,
        limit: limitNum,
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
```

**Response structure:**
```json
{
  "tasks": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalTasks": 48,
    "limit": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## Step 2: Update Frontend API

**File:** `task_manager/client/src/services/taskApi.js`

```javascript
// GET all tasks (with filters + pagination)
export const fetchTasks = async (filters = {}, page = 1, limit = 10) => {
  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.priority) params.append("priority", filters.priority);
  if (filters.search) params.append("search", filters.search);
  params.append("page", page);
  params.append("limit", limit);

  const response = await fetch(`${API_URL}?${params.toString()}`);
  const data = await handleResponse(response);
  
  // Normalize task IDs
  return {
    tasks: data.tasks.map(task => ({ ...task, id: task._id })),
    pagination: data.pagination,
  };
};
```

---

## Step 3: Update TaskContext for Pagination

**File:** `task_manager/client/src/context/TaskContext.jsx`

```jsx
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  pagination: {  // ← NEW
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

// In reducer:
case SET_TASKS:
  return { 
    ...state, 
    tasks: action.payload.tasks, 
    pagination: action.payload.pagination,
    loading: false 
  };

// Update fetch/load function:
useEffect(() => {
  const loadTasks = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const data = await taskApi.fetchTasks({}, 1, 10);  // Page 1, 10 per page
      dispatch({ type: SET_TASKS, payload: data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.message });
    }
  };
  loadTasks();
}, []);

// Add loadMore function:
const loadPage = useCallback(async (page, filters = {}) => {
  dispatch({ type: SET_LOADING });
  try {
    const data = await taskApi.fetchTasks(filters, page, 10);
    dispatch({ type: SET_TASKS, payload: data });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.message });
  }
}, []);
```

---

## Step 4: Add Pagination UI to TaskList

Add this at the bottom of TaskList, after the tasks list:

```jsx
{/* Pagination Controls */}
{tasks.length > 0 && (
  <div className="flex justify-center items-center gap-2 mt-6">
    <button
      onClick={() => loadPage(pagination.currentPage - 1)}
      disabled={!pagination.hasPrevPage || loading}
      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      ← Previous
    </button>

    <span className="text-sm text-gray-500">
      Page {pagination.currentPage} of {pagination.totalPages}
      <span className="text-gray-400"> ({pagination.totalTasks} total)</span>
    </span>

    <button
      onClick={() => loadPage(pagination.currentPage + 1)}
      disabled={!pagination.hasNextPage || loading}
      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Next →
    </button>
  </div>
)}
```

---

# PART 4: AUTHENTICATION (JWT Tokens)

## What We're Building

| Feature | How It Works |
|---------|-------------|
| Register | Create account with email/password |
| Login | Get JWT token |
| Protected Routes | Only logged-in users can manage tasks |
| Persist Login | Token stored in localStorage |

---

## Step 1: Install Dependencies

```bash
cd task_manager/server
npm install bcryptjs jsonwebtoken
```

| Package | Purpose |
|---------|---------|
| `bcryptjs` | Hash passwords (never store plain text!) |
| `jsonwebtoken` | Create and verify JWT tokens |

---

## Step 2: Create User Model

**File:** `task_manager/server/models/User.js`

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);  // 10 = salt rounds
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
```

---

## Step 3: Create Auth Middleware

**File:** `task_manager/server/middleware/auth.js`

```javascript
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallbacksecret");
    req.userId = decoded.userId;  // Attach user ID to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
```

---

## Step 4: Create Auth Routes

**File:** `task_manager/server/routes/auth.js`

```javascript
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create user
    const user = new User({ email, password, name });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
```

---

## Step 5: Update .env

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

---

## Step 6: Update server.js

```javascript
// Add these lines
app.use("/api/auth", require("./routes/auth"));

// Protect task routes
const authMiddleware = require("./middleware/auth");
app.use("/api/tasks", authMiddleware, require("./routes/tasks"));  // ← All task routes now require auth
```

---

## Step 7: Update Task Model to Link to User

**File:** `task_manager/server/models/Task.js` (add to schema)

```javascript
userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
```

---

## Step 8: Update Task Routes to Filter by User

In each task route, add `userId: req.userId` to filters:

```javascript
// GET
const filter = { userId: req.userId };
if (status) filter.status = status;
// ...

// POST
const newTask = new Task({
  userId: req.userId,  // ← Link to logged-in user
  title: title.trim(),
  // ...
});

// All other routes: add { userId: req.userId, _id: req.params.id } to ensure users can only access their own tasks
```

---

## Step 9: Frontend Auth Context

**File:** `task_manager/client/src/context/AuthContext.jsx`

```jsx
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const AuthContext = createContext(null);

const API_URL = "http://localhost:5000/api/auth";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (email, password, name) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
```

---

## Step 10: Update API Service to Include Token

**File:** `task_manager/client/src/services/taskApi.js`

```javascript
// Helper to get auth headers
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Update all fetch calls to use getHeaders()
export const fetchTasks = async (filters = {}, page = 1, limit = 10) => {
  const params = new URLSearchParams();
  // ... build params
  
  const response = await fetch(`${API_URL}?${params.toString()}`, {
    headers: getHeaders(),  // ← Add auth header
  });
  // ...
};

// Same for createTask, updateTask, etc.
export const createTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),  // ← Add auth header
    body: JSON.stringify(taskData),
  });
  // ...
};
```

---

## Step 11: Create Login/Register Pages

**File:** `task_manager/client/src/pages/LoginPage.jsx`

```jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
```

---

## Step 12: Protect Routes

**File:** `task_manager/client/src/components/ProtectedRoute.jsx`

```jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

---

## Step 13: Update App.jsx with Auth

```jsx
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

// Wrap app with AuthProvider in main.jsx
// In Routes:
<<Route path="/login" element={<LoginPage />} />
<<Route path="/register" element={<RegisterPage />} />
<<Route path="/" element={
  <ProtectedRoute>
    <HomePage />
  </ProtectedRoute>
} />
// ... wrap all other protected routes
```

---

## FINAL PROJECT STRUCTURE

```
task_manager/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      ← NEW
│   │   │   └── TaskContext.jsx      ← UPDATED
│   │   ├── services/
│   │   │   └── taskApi.js           ← UPDATED
│   │   └── App.jsx                  ← UPDATED
│   └── ...
│
└── server/
    ├── models/
    │   ├── Task.js                   ← UPDATED (userId)
    │   └── User.js                   ← NEW
    ├── routes/
    │   ├── tasks.js                  ← UPDATED (filters, pagination, auth)
    │   └── auth.js                   ← NEW
    ├── middleware/
    │   └── auth.js                   ← NEW
    ├── .env
    └── server.js                     ← UPDATED
```

---

## CONCEPTS COVERED IN THIS SESSION

| Concept | Where Used |
|---------|-----------|
| **Edit/Update** | PATCH endpoint, EditTaskPage |
| **Search/Filter** | Query params, MongoDB $regex |
| **Pagination** | skip/limit, page navigation |
| **Authentication** | JWT, bcrypt, protected routes |
| **Authorization** | User-specific tasks, middleware |
| **Password Hashing** | bcryptjs |
| **Token Storage** | localStorage, auth headers |
| **Protected Routes** | React Router guards |

---

## WHAT YOU'VE BUILT

A **full-stack, production-ready Task Manager** with:
- ✅ React frontend with all essential concepts
- ✅ REST API with Express
- ✅ MongoDB database with Mongoose
- ✅ Search, filter, pagination
- ✅ User authentication with JWT
- ✅ Protected routes and data

**You're now a React + Node.js full-stack developer.**

Want to deploy this to the internet next? Or start a new project?
