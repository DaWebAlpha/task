## Step 16: Create Task Constants

Create a new file:

```text
src/utils/constants.js
```

Add:

```js
/**
 * Task Priority Levels
 * Use these constants instead of typing "low", "medium", "high" as strings.
 * Prevents typos and makes autocomplete work in your editor.
 */
const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

/**
 * Task Status Values
 * Use these constants instead of typing "pending", "completed" as strings.
 */
const TASK_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
};

/**
 * Example Task Object Structure:
 *
 * {
 *   id: 1234567890,
 *   title: "Buy groceries",
 *   description: "Milk, eggs",
 *   priority: "medium",
 *   dueDate: "2026-06-20",
 *   status: "pending",
 *   createdAt: "2026-06-14T12:00:00.000Z"
 * }
 */

export default {
  TASK_PRIORITY,
  TASK_STATUS,
};
```

### Explanation

This file stores application-wide task constants.

Instead of writing:

```js
priority: "high"
```

or

```js
status: "completed"
```

throughout the application, we store the values in one place.

---

### TASK_PRIORITY

```js
const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};
```

Available values:

```js
TASK_PRIORITY.LOW
TASK_PRIORITY.MEDIUM
TASK_PRIORITY.HIGH
```

Returns:

```text
low
medium
high
```

---

### TASK_STATUS

```js
const TASK_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
};
```

Available values:

```js
TASK_STATUS.PENDING
TASK_STATUS.COMPLETED
```

Returns:

```text
pending
completed
```

---

### Why Use Constants?

Bad:

```js
task.priority = "hgh";
```

Typo:

```text
hgh ❌
```

Good:

```js
task.priority = TASK_PRIORITY.HIGH;
```

Result:

```text
high ✅
```

Using constants reduces typing mistakes and improves consistency.

---

### Export Default

```js
export default {
  TASK_PRIORITY,
  TASK_STATUS,
};
```

Exports both objects together.

Example import:

```js
import constants from "../utils/constants";
```

Usage:

```js
constants.TASK_PRIORITY.HIGH

constants.TASK_STATUS.PENDING
```

---

### Example Task Object

```js
const task = {
  id: Date.now(),
  title: "Learn React",
  description: "Study components and props",
  priority: "high",
  dueDate: "2026-06-20",
  status: "pending",
  createdAt: new Date().toISOString(),
};
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
│   └── constants.js
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

* Stores task-related constants.
* Prevents hard-coded values throughout the application.
* Improves consistency and maintainability.
* Makes future updates easier.

/**
 * Step 16 Test: Verify Constants Import
 * 
 * This file tests that our constants from utils/constants.js
 * import correctly and return the expected string values.
 */

// Import shared UI components
import Header from "./components/Header";
import Layout from "./components/Layout";

// Import application constants
import constant from "./utils/constants";

function App() {
  // Extract constant objects for easier access
  const TASK_PRIORITY = constant.TASK_PRIORITY;
  const TASK_STATUS = constant.TASK_STATUS;

  // Extract individual priority values
  const HIGH = TASK_PRIORITY.HIGH;
  const LOW = TASK_PRIORITY.LOW;
  const MEDIUM = TASK_PRIORITY.MEDIUM;

  // Test 1: Log individual values
  console.log(`HIGH: ${HIGH}, MEDIUM: ${MEDIUM}, LOW: ${LOW}`);
  // Expected Output: HIGH: high, MEDIUM: medium, LOW: low

  // Test 2: Log entire priority object
  console.log(TASK_PRIORITY);
  // Expected Output: { LOW: "low", MEDIUM: "medium", HIGH: "high" }

  // Test 3: Log entire status object
  console.log(TASK_STATUS);
  // Expected Output: { PENDING: "pending", COMPLETED: "completed" }

  // Test 4: Log status values individually
  console.log(`PENDING: ${TASK_STATUS.PENDING}`);
  // Expected Output: PENDING: pending

  console.log(`COMPLETED: ${TASK_STATUS.COMPLETED}`);
  // Expected Output: COMPLETED: completed

  return (
    <Layout>
      {/* Application header */}
      <Header />

      {/* Main content area */}
      <main className="p-8">
        {/* Test display section */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Priority values display */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              Task Priority Constants
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>TASK_PRIORITY.HIGH = "{TASK_PRIORITY.HIGH}"</p>
              <p>TASK_PRIORITY.MEDIUM = "{TASK_PRIORITY.MEDIUM}"</p>
              <p>TASK_PRIORITY.LOW = "{TASK_PRIORITY.LOW}"</p>
            </div>
          </div>

          {/* Status values display */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              Task Status Constants
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>TASK_STATUS.PENDING = "{TASK_STATUS.PENDING}"</p>
              <p>TASK_STATUS.COMPLETED = "{TASK_STATUS.COMPLETED}"</p>
            </div>
          </div>

          {/* Usage example */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h2 className="text-lg font-bold text-blue-800 mb-3">
              Usage Example
            </h2>
            <p className="text-blue-700">
              Priority: {TASK_PRIORITY.HIGH} | Status: {TASK_STATUS.PENDING}
            </p>
          </div>

        </div>
      </main>
    </Layout>
  );
}

export default App;
