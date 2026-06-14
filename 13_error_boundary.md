
# PART 3: Error Boundaries

## What are Error Boundaries?

**Error Boundaries** = Components that catch JavaScript errors in their child component tree and display a fallback UI instead of crashing the entire app.

**Without Error Boundary:**
- One component throws error → entire app goes white screen
- User must refresh the page

**With Error Boundary:**
- One component throws error → only that section shows fallback
- Rest of app continues working

---

## File: `src/components/ErrorBoundary.jsx`

```jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // This method is called when a child throws an error
  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  // This method is called with error details
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service (Sentry, LogRocket, etc.)
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-xl m-4">
          <h2 className="text-lg font-bold text-red-800 mb-2">
            ⚠️ Something went wrong
          </h2>
          <p className="text-red-600 mb-4">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
          
          {/* Show error details in development */}
          {process.env.NODE_ENV === "development" && this.state.errorInfo && (
            <details className="mt-4">
              <summary className="text-red-500 cursor-pointer text-sm">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 p-4 bg-red-100 rounded-lg text-xs text-red-800 overflow-auto">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## LINE-BY-LINE: Error Boundaries Explained

### Why Class Component?

**Error boundaries MUST be class components.** Hooks don't support `componentDidCatch` or `getDerivedStateFromError`.

**React team reasoning:** Error boundaries are rare, and class components handle lifecycle methods better for this use case.

---

### getDerivedStateFromError

```jsx
static getDerivedStateFromError(error) {
  return { hasError: true, error };
}
```

**When called:** During the "render" phase, when a child throws an error.

**What it does:**
- Receives the error object
- Returns new state to trigger a re-render
- MUST be static (no access to `this`)
- Should be pure (no side effects)

**Analogy:** Like a smoke detector. It detects the problem and triggers the alarm (state update), but doesn't put out the fire.

---

### componentDidCatch

```jsx
componentDidCatch(error, errorInfo) {
  console.error("ErrorBoundary caught an error:", error, errorInfo);
  this.setState({ errorInfo });
}
```

**When called:** During the "commit" phase, after the fallback UI has rendered.

**What it does:**
- Receives error and errorInfo (with component stack trace)
- Safe place for side effects (logging, analytics)
- Can update state (but state already updated by getDerivedStateFromError)

**Parameters:**
- `error`: The actual Error object thrown
- `errorInfo`: Object with `componentStack` showing which component tree crashed

---

### What Error Boundaries Catch

| ✅ Catches | ❌ Doesn't Catch |
|-----------|-----------------|
| Errors in render | Errors in event handlers |
| Errors in lifecycle methods | Errors in async code (setTimeout, fetch) |
| Errors in constructors | Errors in the error boundary itself |
| Errors in child components | Errors in server-side rendering |

---

## Using Error Boundaries in App.jsx

```jsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary"; // ← NEW
import Layout from "./components/Layout";
import Header from "./components/Header";

const HomePage = lazy(() => import("./pages/HomePage"));
const AddTaskPage = lazy(() => import("./pages/AddTaskPage"));
const StatsPage = lazy(() => import("./pages/StatsPage"));
const TaskDetailPage = lazy(() => import("./pages/TaskDetailPage"));

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary> {/* ← Wrap entire app */}
      <Layout>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={
              <ErrorBoundary> {/* ← Wrap each route for granular control */}
                <HomePage />
              </ErrorBoundary>
            } />
            <Route path="/add" element={
              <ErrorBoundary>
                <AddTaskPage />
              </ErrorBoundary>
            } />
            <Route path="/stats" element={
              <ErrorBoundary>
                <StatsPage />
              </ErrorBoundary>
            } />
            <Route path="/task/:id" element={
              <ErrorBoundary>
                <TaskDetailPage />
              </ErrorBoundary>
            } />
            <Route path="*" element={
              <div className="text-center p-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  404 - Page Not Found
                </h2>
              </div>
            } />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
```

**Why wrap each route separately?**
- If HomePage crashes, StatsPage still works
- User can navigate to a working page
- Better user experience than entire app crashing

---

# PART 4: Portals

## What are Portals?

**Portals** = Render a child component into a different DOM node than its parent.

**Without Portal:**
```html
<div id="root">
  <div class="app">
    <div class="modal"> ← Modal trapped inside app, can be clipped by parent
```

**With Portal:**
```html
<div id="root">
  <div class="app">
</div>
<div id="modal-root"> ← Modal rendered outside app, full screen, no clipping
  <div class="modal">
```

**Why use portals:**
- Modals, toasts, tooltips need to escape parent CSS (overflow: hidden, z-index)
- Accessibility: modals should be direct children of `<body>`
- Event bubbling: portal events bubble to React parent, not DOM parent

---

## File: `src/components/Modal.jsx` (Portal Example)

```jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Close on click outside
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // createPortal renders this into #modal-root (or document.body)
  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="text-gray-600">{children}</div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body // ← Render into body, not inside the component tree
  );
}

export default Modal;
```

---

## LINE-BY-LINE: Portals Explained

### createPortal

```jsx
return createPortal(children, container);
```

**Arguments:**
1. `children` — React element to render
2. `container` — DOM node to render into (usually `document.body`)

**What happens:**
- React renders the modal into `document.body`
- But it's still part of the React tree (events bubble to React parent)
- CSS from parent components doesn't affect it (it's outside their DOM)

---

### Why document.body?

| Location | Problem |
|----------|---------|
| Inside parent div | Parent's `overflow: hidden` clips modal |
| Inside parent div | Parent's `z-index` stacks below other elements |
| document.body | Full viewport access, top z-index, no clipping |

---

## Using Modal in TaskList (Delete Confirmation)

**Update TaskList.jsx:**

```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import taskUtils from "../utils/task.utils";
import Modal from "./Modal"; // ← NEW

function TaskList() {
  const { tasks, toggleStatus, deleteTask } = useTasks();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null, taskTitle: "" });

  const openDeleteModal = (task) => {
    setDeleteModal({ isOpen: true, taskId: task.id, taskTitle: task.title });
  };

  const confirmDelete = () => {
    deleteTask(deleteModal.taskId);
    setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" });
  };

  if (tasks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center p-8">
        <p className="text-gray-500 text-lg">
          No tasks yet! Add one above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
        >
          {/* ... other task content ... */}

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
      ))}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: "" })}
        title="Confirm Delete"
      >
        <p>
          Are you sure you want to delete <strong>"{deleteModal.taskTitle}"</strong>?
          This action cannot be undone.
        </p>
        <div className="mt-4 flex justify-end gap-3">
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

## CONCEPTS COVERED SO FAR

| Concept | Status | File |
|---------|--------|------|
| useRef | ✅ | TaskForm.jsx |
| useId | ✅ | TaskForm.jsx |
| Error Boundaries | ✅ | ErrorBoundary.jsx |
| Portals | ✅ | Modal.jsx |

---

# NEXT CONCEPTS (Coming Up)

1. **useLayoutEffect** — Measure DOM before paint
2. **useTransition** — Mark updates as non-urgent
3. **useDeferredValue** — Defer slow re-renders
4. **useImperativeHandle** — Custom ref API
5. **Custom Hooks advanced** — useLocalStorage, useFetch
6. **Compound Components** — Advanced pattern

Ready to continue with **useLayoutEffect** and **useTransition**? Or questions about what we've covered so far?
