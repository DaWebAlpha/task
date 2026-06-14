I'll continue building the Task Manager project, alerting you when installations are needed and stating exactly where to put files.

---

# TASK LIST COMPONENT

## What We're Building

A component that shows all tasks. Each task displays its title, description, priority badge, due date, status, and buttons to toggle complete/pending or delete.

---

## BEFORE WE START: INSTALL NOTHING NEW

All dependencies for this component are already installed from previous steps:
- React (from `npm create vite`)
- Tailwind CSS (from `npm install tailwindcss @tailwindcss/vite`)

---

## File Location

**Create this file:** `src/components/TaskList.jsx`

**Full path:** `task_manager/client/src/components/TaskList.jsx`

---

## File: `src/components/TaskList.jsx`

```jsx
import { useTasks } from "../context/TaskContext";
import taskUtils from "../utils/task.utils";

function TaskList() {
  // Get tasks and functions from our context "phone"
  const { tasks, toggleStatus, deleteTask } = useTasks();

  // If no tasks exist yet, show a friendly message
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
          {/* Top row: Title and Priority Badge */}
          <div className="flex justify-between items-start mb-2">
            <h3
              className={`font-bold text-lg ${
                task.status === "completed"
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {task.title}
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
              onClick={() => deleteTask(task.id)}
              className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
```

---

## LINE-BY-LINE EXPLANATION (LIKE YOU'RE 12)

### IMPORTS

```jsx
import { useTasks } from "../context/TaskContext";
```

**What this does:** Uses our special "phone" to call the TaskContext and get task data and functions.

**The `../` path:** Goes UP one folder from `components/` to `src/`, then into `context/`.

```
src/
├── components/
│   └── TaskList.jsx    ← We are here
├── context/
│   └── TaskContext.jsx ← We need to go here
```

```jsx
import taskUtils from "../utils/task.utils";
```

**What this brings in:** Our helper functions, especially `getPriorityStyles()` which gives us colors for priority badges.

---

### GETTING TASKS FROM CONTEXT

```jsx
function TaskList() {
  const { tasks, toggleStatus, deleteTask } = useTasks();
```

**What this does:** Calls our "phone" (`useTasks`) and asks for three things:
- `tasks` — the array of all tasks
- `toggleStatus` — function to flip a task between complete and pending
- `deleteTask` — function to remove a task

**The curly braces `{}`:** We only want these three things from the context. The context also has `addTask`, but we don't need it here (TaskList doesn't add tasks, it only shows them).

---

### EMPTY STATE CHECK

```jsx
  if (tasks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center p-8">
        <p className="text-gray-500 text-lg">
          No tasks yet! Add one above to get started.
        </p>
      </div>
    );
  }
```

**What this does:** Checks if the tasks array is empty (length is 0).

**Why check first:** If there are no tasks, we show a friendly message instead of a blank page.

**`return` here means:** Stop the function early. Don't run the rest of the code. Show this message instead.

**Analogy:** Like a teacher checking if anyone raised their hand. If no one did, say "Any questions?" and move on. If someone did, call on them.

---

### MAPPING THROUGH TASKS

```jsx
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {tasks.map((task) => (
```

**`tasks.map()`:** Loops through every task in the array and creates HTML for each one.

**What is `map`:** Think of it like a factory assembly line. Each task goes through, and comes out as a card on the screen.

**The `task` variable:** Each time through the loop, `task` is one task object:
```javascript
{
  id: 1234567890,
  title: "Buy milk",
  description: "Get 2 gallons",
  priority: "high",
  dueDate: "2026-06-15",
  status: "pending"
}
```

---

### THE KEY PROP

```jsx
        <div
          key={task.id}
```

**What is `key`:** A special React prop that helps React keep track of which item is which.

**Why needed:** When you delete a task, React needs to know WHICH one to remove. Without `key`, React gets confused and might delete the wrong one or behave strangely.

**Rule:** Always use a unique ID. Never use array index (the position number) because that changes when items are added or deleted.

**Analogy:** Like nametags at a party. If everyone has a unique name, you know who left. If they just have numbers ("Person 1", "Person 2"), and someone leaves, everyone's number changes and you get confused.

---

### TASK CARD CONTAINER

```jsx
          className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
```

**Classes explained:**

| Class | What It Means | Visual Result |
|-------|-------------|-------------|
| `bg-white` | White background | Clean card |
| `p-4` | Padding: 1rem (16px) | Space inside |
| `rounded-xl` | Extra rounded corners | Smooth edges |
| `shadow-md` | Medium shadow | Floating effect |
| `border` | Add border | Thin line |
| `border-gray-200` | Very light gray border | Subtle edge |

---

### TITLE AND PRIORITY ROW

```jsx
          <div className="flex justify-between items-start mb-2">
```

**`flex`:** Makes children sit side by side (like a row).

**`justify-between`:** Pushes items to opposite sides. Title on left, badge on right.

**`items-start`:** Aligns items at the top (not centered vertically).

**`mb-2`:** Margin bottom: small space below this row.

---

### TITLE WITH STRIKETHROUGH

```jsx
            <h3
              className={`font-bold text-lg ${
                task.status === "completed"
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
```

**The backticks `` ` `` and `${}`:** This is a "template literal." It lets us put JavaScript inside our className string.

**The ternary operator `? :`:** A shortcut for if/else.

```
Is task.status === "completed"?
    YES → use "line-through text-gray-400" (gray and crossed out)
    NO  → use "text-gray-800" (dark gray, normal)
```

**`line-through`:** CSS that puts a line through text (like marking something done).

**Visual result:**
- Pending task: **Buy milk** (normal, dark)
- Completed task: ~~Buy milk~~ (crossed out, light gray)

---

### PRIORITY BADGE

```jsx
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${taskUtils.getPriorityStyles(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
```

**`<span>`:** A small inline container, perfect for badges.

**`rounded-full`:** Makes it a pill shape (completely rounded).

**`taskUtils.getPriorityStyles(task.priority)`:** Calls our helper function to get colors.

| Priority | Background | Text | Result |
|----------|-----------|------|--------|
| low | `bg-green-100` | `text-green-700` | Green pill |
| medium | `bg-yellow-100` | `text-yellow-700` | Yellow pill |
| high | `bg-red-100` | `text-red-700` | Red pill |

---

### DESCRIPTION (CONDITIONAL)

```jsx
          {task.description && (
            <p className="text-gray-600 mb-3">{task.description}</p>
          )}
```

**`{task.description && (...)}`:** Only show this if description exists.

**How `&&` works in JSX:**
- If `task.description` is truthy (has text), render the `<p>`
- If `task.description` is falsy (empty string, null, undefined), render nothing

**Why check:** Some tasks might not have descriptions. Don't show an empty paragraph.

---

### DUE DATE (CONDITIONAL)

```jsx
          {task.dueDate && (
            <p className="text-sm text-gray-500 mb-3">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
```

**`new Date(task.dueDate)`:** Converts the ISO string to a Date object.

**`.toLocaleDateString()`:** Formats the date nicely for your location.
- In USA: `"6/15/2026"`
- In UK: `"15/06/2026"`
- In Ghana: `"15/06/2026"`

---

### TOGGLE BUTTON

```jsx
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
```

**`onClick={() => toggleStatus(task.id)}`:** When clicked, call `toggleStatus` with this task's ID.

**Why arrow function `() =>`:** We need to pass the specific `task.id`. If we wrote `onClick={toggleStatus(task.id)}`, it would run immediately (not when clicked).

**Button changes based on status:**

| Status | Background | Text | Label | What It Does |
|--------|-----------|------|-------|-------------|
| pending | `bg-green-100` | `text-green-700` | "Complete" | Marks as done |
| completed | `bg-yellow-100` | `text-yellow-700` | "Undo" | Marks as not done |

---

### DELETE BUTTON

```jsx
            <button
              onClick={() => deleteTask(task.id)}
              className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
            >
              Delete
            </button>
```

**Always red:** Delete is a destructive action, so it's always red to warn the user.

**`hover:bg-red-200`:** Darker red when mouse hovers over.

---

## HOW TO TEST THE TASK LIST

### Update App.jsx

**File:** `task_manager/client/src/App.jsx`

```jsx
import Layout from "./components/Layout";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <Layout>
      <Header />
      <TaskForm />
      <TaskList />
    </Layout>
  );
}

export default App;
```

**What to expect:**

1. Empty state message: "No tasks yet! Add one above to get started."
2. Add a task using the form → task appears in the list
3. Task shows: title, priority badge (colored), description, due date
4. Click "Complete" → title gets crossed out, button changes to "Undo"
5. Click "Undo" → title goes back to normal, button changes to "Complete"
6. Click "Delete" → task disappears

---

## PROJECT STRUCTURE SO FAR

```
task_manager/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx      ← NEW
│   │   ├── context/
│   │   │   └── TaskContext.jsx
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── task.utils.js
│   │   └── App.jsx
│   └── ...
│
└── server/
```

---

## NEXT COMPONENT

The next logical piece is **TaskStats** (showing counts like "3 pending, 2 completed") or we can start the **Backend** (Node.js/Express server).

Which would you like to do next? If backend, I'll alert you about new installations needed (Express, CORS, etc.) and exact folder locations.

---

# IF YOU CHOOSE BACKEND NEXT

## ⚠️ NEW INSTALLATIONS REQUIRED

**Folder:** `task_manager/server/`

**Commands to run:**
```bash
cd task_manager/server
npm init -y
npm install express cors dotenv
npm install -D nodemon
```

| Package | Purpose | Install Location |
|---------|---------|----------------|
| `express` | Web server framework | `task_manager/server/node_modules/` |
| `cors` | Allow frontend to talk to backend | `task_manager/server/node_modules/` |
| `dotenv` | Hide secret values (like database passwords) | `task_manager/server/node_modules/` |
| `nodemon` | Auto-restart server when files change | `task_manager/server/node_modules/` (dev only) |

**New files to create:**
- `task_manager/server/package.json` (created by `npm init -y`)
- `task_manager/server/server.js` (main server file)
- `task_manager/server/.env` (secret configuration)

Let me know if you want to proceed with backend or another frontend component!
