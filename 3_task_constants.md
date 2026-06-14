I'll document the Task Constants component following the clean style (no step numbers, just component name as header with detailed explanations).

---

# TASK CONSTANTS

## File: `src/utils/constants.js`

```javascript
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

---

## LINE-BY-LINE EXPLANATION

### JSDOC COMMENT BLOCK

```javascript
/**
 * Task Priority Levels
 * Use these constants instead of typing "low", "medium", "high" as strings.
 * Prevents typos and makes autocomplete work in your editor.
 */
```

**What this is:** A JSDoc comment block (starts with `/**`, ends with `*/`). It documents the code for other developers and IDEs.

**Why it matters:** When you hover over `TASK_PRIORITY` in your editor, it shows this description. Helps teammates understand why this exists.

---

### TASK_PRIORITY OBJECT

```javascript
const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};
```

**What this is:** A JavaScript object that stores string values with UPPERCASE keys.

**How to use it:**

| Instead of writing... | Write this... |
|----------------------|---------------|
| `priority: "high"` | `priority: TASK_PRIORITY.HIGH` |
| `priority: "medium"` | `priority: TASK_PRIORITY.MEDIUM` |
| `priority: "low"` | `priority: TASK_PRIORITY.LOW` |

**Why use constants:**

| Problem with strings | Solution with constants |
|---------------------|------------------------|
| `priority: "hgh"` ← typo, hard to find | `TASK_PRIORITY.HGH` ← editor shows error immediately |
| `"high"` vs `"High"` vs `"HIGH"` | Only one valid option: `TASK_PRIORITY.HIGH` |
| Searching for all "high" priorities finds unrelated words | Search for `TASK_PRIORITY.HIGH` finds exact matches |
| Changing "pending" to "incomplete" requires find-replace everywhere | Change in one place: `PENDING: "incomplete"` |

**Analogy:** Like using a dictionary instead of guessing spellings. The dictionary (constant object) has all valid words, and your editor (IDE) can autocomplete them.

---

### TASK_STATUS OBJECT

```javascript
const TASK_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
};
```

**Same pattern as TASK_PRIORITY.** Stores status values to prevent typos and enable autocomplete.

**Usage:**

| Instead of... | Use... |
|--------------|--------|
| `status: "pending"` | `status: TASK_STATUS.PENDING` |
| `status: "completed"` | `status: TASK_STATUS.COMPLETED` |

---

### EXAMPLE TASK OBJECT COMMENT

```javascript
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
```

**What this is:** Documentation showing what a task object looks like in your application.

**Field explanations:**

| Field | Type | Example | Purpose |
|-------|------|---------|---------|
| `id` | Number | `1234567890` | Unique identifier for the task |
| `title` | String | `"Buy groceries"` | Short name of the task |
| `description` | String | `"Milk, eggs"` | More details about the task |
| `priority` | String | `"medium"` | How important (low/medium/high) |
| `dueDate` | String | `"2026-06-20"` | When the task must be done |
| `status` | String | `"pending"` | Current state (pending/completed) |
| `createdAt` | String | `"2026-06-14T12:00:00.000Z"` | When task was created (ISO format) |

**Why ISO format for dates:** `2026-06-14T12:00:00.000Z` is a standard format that works across all browsers and systems. The `Z` means UTC time (no timezone confusion).

---

### EXPORT DEFAULT

```javascript
export default {
  TASK_PRIORITY,
  TASK_STATUS,
};
```

**What this does:** Makes both objects available when someone imports this file.

**How to import:**

```javascript
import constants from "./utils/constants";
```

**How to use after import:**

```javascript
constants.TASK_PRIORITY.HIGH     // "high"
constants.TASK_STATUS.PENDING      // "pending"
```

**Alternative: Named exports (not used here)**

```javascript
// Could also write:
export { TASK_PRIORITY, TASK_STATUS };

// Then import as:
import { TASK_PRIORITY, TASK_STATUS } from "./utils/constants";
```

**Why default export was chosen:** One import gets everything. Easier to add more constants later without changing import statements.

---

## HOW TO TEST THE CONSTANTS

### File: `src/App.jsx`

```jsx
import Header from "./components/Header";
import Layout from "./components/Layout";
import constants from "./utils/constants";

function App() {
  // Extract constant objects for easier access
  const TASK_PRIORITY = constants.TASK_PRIORITY;
  const TASK_STATUS = constants.TASK_STATUS;

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
      <Header />

      <main className="p-8">
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
```

---

## HOW TO READ THE TEST FILE

### IMPORTS

```jsx
import Header from "./components/Header";
import Layout from "./components/Layout";
import constants from "./utils/constants";
```

| Import | Purpose |
|--------|---------|
| `Header` | App header component |
| `Layout` | Page wrapper component |
| `constants` | The constants file we are testing |

---

### EXTRACTING CONSTANTS

```jsx
const TASK_PRIORITY = constants.TASK_PRIORITY;
const TASK_STATUS = constants.TASK_STATUS;
```

**Why extract:** Shorter names for repeated use. Instead of `constants.TASK_PRIORITY.HIGH` everywhere, you write `TASK_PRIORITY.HIGH`.

**Alternative (direct access):**
```jsx
constants.TASK_PRIORITY.HIGH
constants.TASK_STATUS.PENDING
```

---

### CONSOLE TESTS

```jsx
console.log(`HIGH: ${HIGH}, MEDIUM: ${MEDIUM}, LOW: ${LOW}`);
```

**What this does:** Outputs values to browser DevTools console (press F12 → Console tab).

**Template literal syntax:** Backticks `` ` `` allow embedding variables with `${variable}`.

**Expected output:**
```
HIGH: high, MEDIUM: medium, LOW: low
```

```jsx
console.log(TASK_PRIORITY);
```

**Expected output:**
```
{ LOW: "low", MEDIUM: "medium", HIGH: "high" }
```

---

### DISPLAY TESTS (VISUAL)

```jsx
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
```

**What to verify in browser:**
- White card with rounded corners and shadow
- Title "Task Priority Constants" in bold
- Three lines showing constant names and values
- Values match: "high", "medium", "low"

---

### USAGE EXAMPLE

```jsx
<div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
  <h2 className="text-lg font-bold text-blue-800 mb-3">
    Usage Example
  </h2>
  <p className="text-blue-700">
    Priority: {TASK_PRIORITY.HIGH} | Status: {TASK_STATUS.PENDING}
  </p>
</div>
```

**What this shows:** How constants look in real application code.

**Expected display:**
```
Priority: high | Status: pending
```

---

## RUNNING THE TESTS

```bash
cd task_manager/client
npm run dev
```

**Open browser:** `http://localhost:5173`

**Verify:**
1. Three cards display on page
2. Priority values show: high, medium, low
3. Status values show: pending, completed
4. Blue usage example card shows: "Priority: high | Status: pending"
5. Open DevTools Console (F12) and verify 5 log outputs match expected

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
│   │   │   └── constants.js      ← NEW
│   │   ├── App.jsx               ← TEST FILE
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
| `const` objects | Store related values together |
| UPPERCASE keys | Convention for constant names |
| `export default` | Make objects available for import |
| Template literals | `` `HIGH: ${HIGH}` `` |
| JSDoc comments | Document code for teammates |
| `console.log` | Verify values in development |

---

## WHY CONSTANTS MATTER (REAL EXAMPLE)

**Without constants (bug-prone):**
```javascript
function filterTasks(tasks) {
  return tasks.filter(t => t.priority === "hgh"); // typo! "hgh" not "high"
}
// Returns empty array, hard to debug why
```

**With constants (safe):**
```javascript
function filterTasks(tasks) {
  return tasks.filter(t => t.priority === TASK_PRIORITY.HIGH);
}
// TASK_PRIORITY.HGH would show error in editor before running
```

**Changing values later:**

```javascript
// Before: status uses "pending" and "completed"
// After: business wants "todo" and "done"

// Without constants: find-replace in 50 files, hope nothing breaks
// With constants: change in one place

const TASK_STATUS = {
  PENDING: "todo",      // changed from "pending"
  COMPLETED: "done",    // changed from "completed"
};
// All code using TASK_STATUS.PENDING now uses "todo" automatically
```

---

Send me the next component and I will document it the same way!
