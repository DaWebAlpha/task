I'll document the Task Utility Functions following the clean style (no step numbers, just component name as header with detailed explanations).

---

# TASK UTILITY FUNCTIONS

## File: `src/utils/task.utils.js`

```javascript
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

---

## LINE-BY-LINE EXPLANATION

### IMPORT

```javascript
import constants from "./constants";
```

**What this does:** Brings in the constants file we created earlier (TASK_PRIORITY and TASK_STATUS).

**Why needed:** The utility functions need to reference these values for defaults and comparisons.

---

### GENERATE TASK ID

```javascript
const generateTaskId = () => Date.now();
```

**What this does:** Returns the current timestamp as a number (milliseconds since January 1, 1970).

**Example output:**
```
1750001234567
```

**Why use timestamps for IDs:** Simple way to generate unique numbers. No two tasks are created at the exact same millisecond.

**Limitation:** If you create multiple tasks in the same millisecond, IDs could collide. For production apps, use libraries like `uuid` or `nanoid`.

**Analogy:** Like a ticket machine at a bank. Each person gets a number, and numbers increase over time. No two people get the same number.

---

### CREATE TASK FUNCTION

```javascript
export const createTask = (data) => ({
```

**What this does:** Creates a complete task object from partial data provided by the user.

**The `export` keyword:** Makes this function available for import in other files.

**Arrow function with implicit return:** The parentheses `({...})` around the object let JavaScript know this is an object literal being returned, not a function body.

---

### ID ASSIGNMENT

```javascript
  id: generateTaskId(),
```

**What this does:** Calls `generateTaskId()` and stores the result as the task's unique identifier.

**Example:**
```javascript
// Input data has no id
{ title: "Buy milk" }

// Output task has auto-generated id
{ id: 1750001234567, title: "Buy milk", ... }
```

---

### TITLE CLEANUP

```javascript
  title: data.title.trim(),
```

**What `trim()` does:** Removes whitespace from both ends of a string.

**Examples:**

| Input | After trim() |
|-------|-------------|
| `"  Buy milk  "` | `"Buy milk"` |
| `"Learn React"` | `"Learn React"` |
| `"   "` | `""` (empty string) |

**Why trim:** Users often accidentally type spaces before or after text. Trimming prevents "  Buy milk  " from being stored with extra spaces.

---

### DESCRIPTION CLEANUP

```javascript
  description: (data.description || "").trim(),
```

**What this does:** Two operations in one line.

**Step by step:**

| What happens | Result |
|-------------|--------|
| `data.description` exists | Use that value |
| `data.description` is undefined/null | Use `""` (empty string) |
| Then `.trim()` | Remove surrounding spaces |

**Why the `|| ""` fallback:** If the user doesn't provide a description, `data.description` is `undefined`. You cannot call `.trim()` on `undefined` — it would crash. The `|| ""` provides a safe empty string to trim.

**Example:**
```javascript
// User provides description
{ description: "  Full cream  " }
// Result: "Full cream"

// User skips description
{ }
// data.description is undefined
// undefined || "" → ""
// "".trim() → ""
// Result: "" (safe empty string)
```

---

### PRIORITY DEFAULT

```javascript
  priority: data.priority || constants.TASK_PRIORITY.MEDIUM,
```

**What this does:** Uses the priority the user selected, or defaults to "medium" if none was chosen.

**How `||` (logical OR) works:**

| `data.priority` value | Result stored |
|----------------------|---------------|
| `"high"` | `"high"` |
| `"low"` | `"low"` |
| `""` (empty string) | `"medium"` (falsy, so OR triggers) |
| `undefined` | `"medium"` (falsy, so OR triggers) |
| `null` | `"medium"` (falsy, so OR triggers) |

**Why default to medium:** Most tasks are neither extremely urgent nor completely trivial. Medium is a safe middle ground.

---

### DUE DATE DEFAULT

```javascript
  dueDate: data.dueDate || "",
```

**What this does:** Uses the user's date, or stores an empty string if none was provided.

**Why empty string not null:** Forms and inputs work better with strings. An empty input shows `""` as its value, not `null`.

---

### STATUS DEFAULT

```javascript
  status: constants.TASK_STATUS.PENDING,
```

**What this does:** Every new task starts as "pending".

**Why not use `||` here:** We always want "pending" for new tasks. We don't accept a status from the user during creation. The task is always pending until the user marks it complete later.

---

### CREATED TIMESTAMP

```javascript
  createdAt: new Date().toISOString(),
```

**What this does:** Records the exact moment the task was created.

**Example output:**
```
"2026-06-14T18:20:10.123Z"
```

**What ISO format means:**
- `2026-06-14` → Date (June 14, 2026)
- `T` → Separator between date and time
- `18:20:10.123` → Time (6:20 PM, 10 seconds, 123 milliseconds)
- `Z` → UTC timezone (no local timezone offset)

**Why ISO format:** Works across all browsers and systems. Sorts correctly as text. Includes timezone information.

---

### GET PRIORITY STYLES

```javascript
const getPriorityStyles = (priority) => {
  switch (priority) {
    case constants.TASK_PRIORITY.HIGH:
      return "bg-red-100 text-red-700";
```

**What this does:** Returns Tailwind CSS classes based on the priority level.

**How `switch` works:** Compares the input against each `case`. When matched, returns the corresponding string.

**The color logic:**

| Priority | Background | Text | Visual Meaning |
|----------|-----------|------|---------------|
| HIGH | `bg-red-100` (light red) | `text-red-700` (dark red) | Urgent, attention needed |
| MEDIUM | `bg-yellow-100` (light yellow) | `text-yellow-700` (dark yellow) | Warning, moderate attention |
| LOW | `bg-green-100` (light green) | `text-green-700` (dark green) | Safe, low attention |
| default | `bg-gray-100` (light gray) | `text-gray-600` (gray) | Unknown, neutral |

**Why these colors:** Universal color coding. Red = danger/urgent. Yellow = caution. Green = good/safe. Gray = unknown.

---

### DEFAULT CASE

```javascript
    default:
      return "bg-gray-100 text-gray-600";
```

**What this does:** Catches any priority value that doesn't match HIGH, MEDIUM, or LOW.

**When this happens:** If the priority string is misspelled, corrupted, or from an older version of the app.

**Why not crash:** Graceful degradation. The UI still renders, just without color coding.

---

### EXPORTS

```javascript
export default {
  generateTaskId,
  createTask,
  getPriorityStyles,
};
```

**What this does:** Makes all three functions available when someone imports this file.

**Named export vs default export:**

| Export type | How to import |
|-------------|-------------|
| `export const createTask` | `import { createTask } from "./task.utils"` |
| `export default { ... }` | `import taskUtils from "./task.utils"` |

**Why use default export:** One import gets everything. Easier to add more functions later without changing import statements.

---

## HOW TO TEST THE TASK UTILITIES

### File: `src/App.jsx`

```jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Layout from "./components/Layout";
import taskUtils from "./utils/task.utils";
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
      <Header />

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
```

---

## HOW TO READ THE TEST FILE

### IMPORTS

```jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Layout from "./components/Layout";
import taskUtils from "./utils/task.utils";
import constants from "./utils/constants";
```

| Import | Purpose |
|--------|---------|
| `useState` | Store the generated ID (starts as "Generating...") |
| `useEffect` | Run timer after component mounts |
| `Header` | App header component |
| `Layout` | Page wrapper component |
| `taskUtils` | The utility functions we are testing |
| `constants` | Priority values for test data |

---

### EXTRACTING FUNCTIONS

```jsx
const generateTaskId = taskUtils.generateTaskId;
const createTask = taskUtils.createTask;
const getPriorityStyles = taskUtils.getPriorityStyles;
```

**Why extract:** Shorter names for repeated use. Instead of `taskUtils.createTask(data)`, write `createTask(data)`.

---

### TEST DATA

```jsx
const data = {
  title: "Pound fufu",
  description: "Will pound fufu on Friday",
  priority: constants.TASK_PRIORITY.HIGH,
  dueDate: new Date(Date.now() + 36000000).toISOString(),
};
```

**What this creates:**

| Field | Value | Explanation |
|-------|-------|-------------|
| `title` | `"Pound fufu"` | Task name |
| `description` | `"Will pound fufu on Friday"` | Task details |
| `priority` | `"high"` | From constants |
| `dueDate` | Current time + 10 hours | `36000000` = 10 hours in milliseconds |

**Why `Date.now() + 36000000`:** Creates a due date 10 hours in the future. Demonstrates dynamic date generation.

---

### CREATE TASK

```jsx
const task = createTask(data);
```

**What this produces:**

```javascript
{
  id: 1750001234567,           // Generated timestamp
  title: "Pound fufu",          // Trimmed from data
  description: "Will pound fufu on Friday",  // Trimmed from data
  priority: "high",             // From data (user selected)
  dueDate: "2026-06-15T04:20:10.123Z",  // From data (10 hours later)
  status: "pending",            // Always pending for new tasks
  createdAt: "2026-06-14T18:20:10.123Z"  // Current time
}
```

**Console verification:** `console.log(task)` outputs the full object to browser DevTools.

---

### DELAYED ID GENERATION

```jsx
const [taskId, setTaskId] = useState("Generating...");

useEffect(() => {
  const timer = setTimeout(() => {
    const newId = generateTaskId();
    setTaskId(newId);
  }, 1000);

  return () => clearTimeout(timer);
}, []);
```

**What this does:**

| Time | What happens | Display |
|------|-------------|---------|
| 0ms (initial) | Component renders | "Generating..." |
| 1000ms (1 second) | Timer fires, generates new ID | `1750001234567` |
| Unmount | Cleanup runs, timer cancelled | (no change) |

**Why delay:** Demonstrates that `generateTaskId()` produces different values at different times. If you called it twice in the same millisecond, you'd get the same number.

**The cleanup function:** `return () => clearTimeout(timer)` prevents memory leaks and state updates on unmounted components.

---

### TEST 1: GENERATE TASK ID

```jsx
<div className="bg-white shadow-md p-4 rounded-xl border border-gray-300">
  <h2 className="font-bold text-gray-800 mb-2">
    Test 1: generateTaskId()
  </h2>
  <p className="text-gray-600">
    Generated ID: <span className="font-mono text-blue-600">{taskId}</span>
  </p>
</div>
```

**What to verify:**
- Initially shows "Generating..."
- After 1 second, shows a large number (timestamp)
- The number is different every time you refresh the page

---

### TEST 2: CREATE TASK

```jsx
<div className="text-gray-600 space-y-1">
  <p>Title: {task.title}</p>
  <p>Description: {task.description}</p>
  <p>Priority: {task.priority}</p>
  <p>Status: {task.status}</p>
  <p>Due Date: {task.dueDate}</p>
  <p>Created At: {task.createdAt}</p>
  <p>ID: {task.id}</p>
</div>
```

**What to verify:**

| Field | Expected Value | Check |
|-------|---------------|-------|
| Title | "Pound fufu" | No extra spaces |
| Description | "Will pound fufu on Friday" | No extra spaces |
| Priority | "high" | Matches constants |
| Status | "pending" | Always pending for new tasks |
| Due Date | ISO string | Valid date format |
| Created At | ISO string | Valid date format |
| ID | Number | Large timestamp value |

---

### TEST 3: GET PRIORITY STYLES

```jsx
const priority = ["low", "medium", "high", "default"];
...
{priority.map((prior) => (
  <p
    key={prior}
    className={`${getPriorityStyles(prior)} p-4 text-center rounded-lg font-semibold`}
  >
    Priority: {prior.toUpperCase()}
  </p>
))}
```

**What this renders:**

| Priority | Background | Text | Color Meaning |
|----------|-----------|------|---------------|
| LOW | `bg-green-100` | `text-green-700` | Green badge |
| MEDIUM | `bg-yellow-100` | `text-yellow-700` | Yellow badge |
| HIGH | `bg-red-100` | `text-red-700` | Red badge |
| DEFAULT | `bg-gray-100` | `text-gray-600` | Gray badge |

**What to verify:**
- Four colored badges display
- LOW is green, MEDIUM is yellow, HIGH is red
- DEFAULT (invalid priority) is gray
- All have padding, rounded corners, centered text

---

## RUNNING THE TESTS

```bash
cd task_manager/client
npm run dev
```

**Open browser:** `http://localhost:5173`

**Verify:**

| Test | What to check |
|------|--------------|
| Test 1 | ID starts as "Generating..." then becomes a number |
| Test 2 | All 7 fields display with correct values |
| Test 3 | Four colored badges: green, yellow, red, gray |
| Console | Full task object logged with all fields |

---

## PROJECT STRUCTURE SO FAR

```
task_manager/
│
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Layout.jsx
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── task.utils.js   ← NEW
│   │   ├── App.jsx             ← TEST FILE
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── server/
```

---

## WHAT YOU HAVE LEARNED

| Concept | Where Used |
|---------|-----------|
| `Date.now()` | Generate unique IDs from timestamps |
| `.trim()` | Clean user input strings |
| `||` fallback | Provide default values for missing data |
| `new Date().toISOString()` | Create standardized timestamps |
| `switch` statement | Map values to different outputs |
| `useState` + `useEffect` | Delayed demonstration of dynamic values |
| `setTimeout` / `clearTimeout` | Timer with cleanup |
| Template literals | `` `Priority: ${prior.toUpperCase()}` `` |

---

## WHY UTILITY FUNCTIONS MATTER

**Without utilities (messy component):**
```jsx
function TaskForm() {
  const handleSubmit = () => {
    // All this logic inside the component
    const task = {
      id: Date.now(),
      title: title.trim(),
      description: (description || "").trim(),
      priority: priority || "medium",
      dueDate: dueDate || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    // ...
  };
}
```

**With utilities (clean component):**
```jsx
function TaskForm() {
  const handleSubmit = () => {
    // One line, consistent everywhere
    const task = createTask({ title, description, priority, dueDate });
    // ...
  };
}
```

**Benefits:**
- Consistent task structure across the app
- Input cleaning happens automatically
- Default values applied consistently
- Easy to modify task structure later
- Easy to test in isolation

---

Send me the next component and I will document it the same way!
