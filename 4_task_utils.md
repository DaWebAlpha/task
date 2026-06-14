## Step 17: Create Task Utility Functions

Create a new file:

```text
src/utils/task.utils.js
```

Add:

```js
import constants from "./constants";

const generateTaskId = () => Date.now();

export const createTask = (data) => ({
  id: generateTaskId(),
  title: data.title.trim(),
  description: (data.description || "").trim(),
  priority: data.priority || constants.TASK_PRIORITY.MEDIUM,
  dueDate: data.dueDate || "",
  status: constants.TASK_STATUS.PENDING,
  createdAt: new Date().toISOString(),
});

const getPriorityStyles = (priority) => {
  switch (priority) {
    case constants.TASK_PRIORITY.HIGH:
      return "bg-red-100 text-red-700";

    case constants.TASK_PRIORITY.MEDIUM:
      return "bg-yellow-100 text-yellow-700";

    case constants.TASK_PRIORITY.LOW:
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default {
  generateTaskId,
  createTask,
  getPriorityStyles,
};
```

### Explanation

This file contains reusable task helper functions.

Purpose:

```text
Create Task
Generate IDs
Priority Styling
```

Instead of putting this logic inside components, we move it into a utility file.

---

### generateTaskId()

```js
const generateTaskId = () => Date.now();
```

Returns the current timestamp.

Example:

```js
generateTaskId();
```

Result:

```text
1750001234567
```

Used as a simple unique task ID.

---

### createTask()

```js
export const createTask = (data) => ({
```

Creates a complete task object.

Input:

```js
{
  title: "Pound fufu",
  description: "Will pound fufu on Friday"
}
```

Output:

```js
{
  id: 1750001234567,
  title: "Pound fufu",
  description: "Will pound fufu on Friday",
  priority: "high",
  dueDate: "...",
  status: "pending",
  createdAt: "..."
}
```

---

### Trim User Input

```js
title: data.title.trim()
```

Removes spaces before and after text.

Example:

```js
"   Learn React   "
```

Becomes:

```js
"Learn React"
```

---

### Optional Description

```js
description: (data.description || "").trim()
```

If description is missing:

```js
undefined
```

React uses:

```js
""
```

instead.

---

### Default Priority

```js
priority: data.priority || constants.TASK_PRIORITY.MEDIUM
```

If user does not choose a priority:

```js
medium
```

is automatically assigned.

---

### Default Status

```js
status: constants.TASK_STATUS.PENDING
```

Every newly created task starts as:

```text
pending
```

---

### createdAt

```js
createdAt: new Date().toISOString()
```

Creates a timestamp.

Example:

```text
2026-06-14T18:20:10.123Z
```

Useful for sorting and tracking task creation.

---

### getPriorityStyles()

```js
getPriorityStyles(priority)
```

Returns Tailwind classes based on priority.

---

High Priority:

```js
getPriorityStyles("high")
```

Returns:

```css
bg-red-100 text-red-700
```

---

Medium Priority:

```js
getPriorityStyles("medium")
```

Returns:

```css
bg-yellow-100 text-yellow-700
```

---

Low Priority:

```js
getPriorityStyles("low")
```

Returns:

```css
bg-green-100 text-green-700
```

---

Invalid Priority:

```js
getPriorityStyles("unknown")
```

Returns:

```css
bg-gray-100 text-gray-600
```

---

### Export

```js
export default {
  generateTaskId,
  createTask,
  getPriorityStyles
}
```

Import with:

```js
import taskUtils from "./utils/task.utils";
```

Usage:

```js
taskUtils.generateTaskId()

taskUtils.createTask(data)

taskUtils.getPriorityStyles("high")
```

---

## Step 18: Test Task Utility Functions

Open:

```text
src/App.jsx
```

Replace the code with your testing component.

### Purpose

This page is used to verify that all utility functions work correctly before using them in the Task Manager.

---

### Import Task Utilities

```js
import taskUtils from "./utils/task.utils";
```

Provides access to:

```js
taskUtils.generateTaskId()

taskUtils.createTask()

taskUtils.getPriorityStyles()
```

---

### Import Constants

```js
import constants from "./utils/constants";
```

Provides access to:

```js
constants.TASK_PRIORITY.HIGH

constants.TASK_STATUS.PENDING
```

---

### Test Data

```js
const data = {
  title: "Pound fufu",
  description: "Will pound fufu on Friday",
  priority: constants.TASK_PRIORITY.HIGH,
  dueDate: new Date(Date.now() + 36000000).toISOString(),
};
```

Creates sample task data.

---

### Create Task

```js
const task = createTask(data);
```

Uses the utility function to build a complete task object.

---

### Test 1: generateTaskId()

Displays:

```text
Generated ID: 1750001234567
```

Verifies that IDs are being generated correctly.

---

### Test 2: createTask()

Displays:

```text
Title
Description
Priority
Status
Due Date
Created At
ID
```

Verifies the task object structure.

---

### Test 3: getPriorityStyles()

Tests:

```js
low
medium
high
default
```

Each value should render with different colors.

```text
LOW      -> Green
MEDIUM   -> Yellow
HIGH     -> Red
DEFAULT  -> Gray
```

---

### Project Structure So Far

```text
src/
├── components/
│   ├── Header.jsx
│   └── Layout.jsx
│
├── utils/
│   ├── constants.js
│   └── task.utils.js
│
├── App.jsx
├── context/
├── features/
├── hooks/
├── services/
├── styles/
└── types/
```

### Purpose

* `constants.js` stores reusable application constants.
* `task.utils.js` stores reusable task helper functions.
* `App.jsx` currently acts as a testing playground to verify utility functions before building the real Task Manager UI.  /**
 * Step 17 Test: Verify Task Utility Functions
 * 
 * This file tests that task.utils.js functions work correctly:
 * - generateTaskId() creates unique IDs
 * - createTask() builds complete task objects
 * - getPriorityStyles() returns correct Tailwind classes
 */

// React hooks for state and side effects
import { useState, useEffect } from "react";

// Shared UI components
import Header from "./components/Header";
import Layout from "./components/Layout";

// Task utility functions
import taskUtils from "./utils/task.utils";

// Application constants
import constants from "./utils/constants";

function App() {
  // Extract utility functions for easier access
  const generateTaskId = taskUtils.generateTaskId;
  const createTask = taskUtils.createTask;
  const getPriorityStyles = taskUtils.getPriorityStyles;

  // Test priority values including an invalid one for default case
  const priority = ["low", "medium", "high", "default"];

  // Test data for createTask
  const data = {
    title: "Pound fufu",
    description: "Will pound fufu on Friday",
    priority: constants.TASK_PRIORITY.HIGH,
    dueDate: new Date(Date.now() + 36000000).toISOString(),
  };

  // Create a task using utility function
  const task = createTask(data);

  // Log created task to console for verification
  console.log(task);

  // State for delayed ID generation demo
  const [taskId, setTaskId] = useState("Generating...");

  // Generate ID after 1 second to show it's dynamic
  useEffect(() => {
    const timer = setTimeout(() => {
      const newId = generateTaskId();
      setTaskId(newId);
    }, 1000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {/* Application header */}
      <Header />

      {/* Main content area */}
      <main className="p-4">
        <div className="max-w-4xl mx-auto space-y-5">

          {/* Test 1: generateTaskId */}
          <div className="bg-white shadow-md p-4 rounded-xl border border-gray-300">
            <h2 className="font-bold text-gray-800 mb-2">
              Test 1: generateTaskId()
            </h2>
            <p className="text-gray-600">
              Generated ID: <span className="font-mono text-blue-600">{taskId}</span>
            </p>
          </div>

          {/* Test 2: createTask */}
          <div className="bg-white shadow-md p-4 rounded-xl border border-gray-300">
            <h2 className="font-bold text-gray-800 mb-2">
              Test 2: createTask()
            </h2>
            <div className="text-gray-600 space-y-1">
              <p>Title: {task.title}</p>
              <p>Description: {task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Status: {task.status}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Created At: {task.createdAt}</p>
              <p>ID: {task.id}</p>
            </div>
          </div>

          {/* Test 3: getPriorityStyles */}
          <div className="bg-white shadow-md p-4 rounded-xl border border-gray-300">
            <h2 className="font-bold text-gray-800 mb-2">
              Test 3: getPriorityStyles()
            </h2>
            <div className="space-y-2">
              {priority.map((prior) => (
                <p
                  key={prior}
                  className={`${getPriorityStyles(prior)} p-4 text-center rounded-lg font-semibold`}
                >
                  Priority: {prior.toUpperCase()}
                </p>
              ))}
            </div>
          </div>

        </div>
      </main>
    </Layout>
  );
}

export default App;
