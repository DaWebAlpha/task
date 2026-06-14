Step 17 is complete. Let's move to Step 18.

---

## Step 18: Create Task Context

### File to Create
```text
src/context/TaskContext.jsx
```

---

### What This File Does

Global state management for tasks. Instead of passing props down through many components, any component can access tasks directly.

Uses React Context + `useReducer` for predictable state updates.

---

### Imports Needed

```jsx
import { createContext, useContext, useReducer, useCallback } from "react";
```

---

### Step 1: Create the Context

```jsx
const TaskContext = createContext(null);
```

**What it does:** Creates an empty container that will hold our task data and functions.

---

### Step 2: Define Action Types

```jsx
const ADD_TASK = "ADD_TASK";
const TOGGLE_STATUS = "TOGGLE_STATUS";
const DELETE_TASK = "DELETE_TASK";
```

**What it does:** String constants for reducer actions. Prevents typos in dispatch calls.

---

### Step 3: Create the Reducer

```jsx
function taskReducer(state, action) {
  switch (action.type) {
    case ADD_TASK:
      return [action.payload, ...state];
    case TOGGLE_STATUS:
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
          : task
      );
    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}
```

**What it does:**
- `ADD_TASK`: Adds new task to beginning of array
- `TOGGLE_STATUS`: Flips status between pending/completed
- `DELETE_TASK`: Removes task by ID

---

### Step 4: Create the Provider

```jsx
export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = useCallback((taskData) => {
    dispatch({ type: ADD_TASK, payload: taskData });
  }, []);

  const toggleStatus = useCallback((id) => {
    dispatch({ type: TOGGLE_STATUS, payload: id });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: DELETE_TASK, payload: id });
  }, []);

  const value = {
    tasks,
    addTask,
    toggleStatus,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
```

**What it does:**
- `useReducer` manages state with our `taskReducer`
- `useCallback` memoizes functions so they don't recreate on every render
- `value` object exposes everything to children

---

### Step 5: Create the Custom Hook

```jsx
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
}
```

**What it does:**
- Lets any component access tasks with one line: `const { tasks, addTask } = useTasks()`
- Throws error if used outside `TaskProvider` (prevents silent bugs)

---

### Export

```jsx
export { TaskProvider, useTasks };
```

Or keep `TaskProvider` as named export and `useTasks` as named export.

---

### How You'll Use It

**Wrap App:**
```jsx
<TaskProvider>
  <App />
</TaskProvider>
```

**Inside any component:**
```jsx
const { tasks, addTask, toggleStatus, deleteTask } = useTasks();
```

---

### Your Turn

Write `src/context/TaskContext.jsx` with:

1. Imports from React
2. `TaskContext` creation
3. Action type constants
4. `taskReducer` function (ADD_TASK, TOGGLE_STATUS, DELETE_TASK)
5. `TaskProvider` component with `useReducer`, `useCallback` functions, and `value` object
6. `useTasks` custom hook with error check
7. Named exports
8. JSDoc comments and your lesson-style explanations

**Send back when ready.**
