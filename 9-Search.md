Good. We have completed:

```text
✓ Exercise 1 → Header
✓ Exercise 2 → Input + useState
✓ Exercise 3 → Add Task
✓ Exercise 4 → Delete Task
✓ Exercise 5 → Complete / Undo
✓ Exercise 6 → Edit Task
✓ Exercise 7 → Save Edit
✓ Exercise 8 → Cancel Edit
```

Now we continue exactly the same way.

---

# EXERCISE 9 — SEARCH TASKS

## WHAT YOU ARE BUILDING

Current:

```text
Learn React
Learn Tailwind
Learn JavaScript
Learn useMemo
```

You can only see all tasks.

---

After Exercise 9:

```text
Search: React

↓

Learn React
```

Only matching tasks appear.

---

Search:

```text
tail
```

↓

```text
Learn Tailwind
```

---

Search:

```text
xyz
```

↓

```text
No matching tasks found
```

---

# WHAT YOU ARE LEARNING

```text
✓ Search State
✓ Controlled Inputs
✓ filter()
✓ includes()
✓ toLowerCase()
✓ Dynamic Rendering
```

---

# WHY SEARCH EXISTS

Imagine:

```text
10 Tasks
```

Easy.

---

Imagine:

```text
100 Tasks
```

Hard.

---

Imagine:

```text
1000 Tasks
```

Very hard.

---

Search lets users find tasks instantly.

---

# STEP 1

Create New State

Inside App.jsx

Current:

```jsx
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState("");
```

Add:

```jsx
const [searchTerm, setSearchTerm] = useState("");
```

---

# WHAT DOES searchTerm STORE?

Example:

User types:

```text
React
```

State becomes:

```jsx
searchTerm = "React"
```

---

User types:

```text
Tailwind
```

State becomes:

```jsx
searchTerm = "Tailwind"
```

---

# STEP 2

Create Search Input

Above Task List.

Visual:

```text
+------------------------+
| Search Tasks           |
|                        |
| [ Search Here ]        |
+------------------------+
```

---

Code:

```jsx
<input
  type="text"
  placeholder="Search tasks..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

---

# WHY value={searchTerm}

Without:

```jsx
value={searchTerm}
```

React does not control input.

---

With:

```jsx
value={searchTerm}
```

React becomes source of truth.

---

# STEP 3

Create Filtered Tasks

Current:

```jsx
tasks.map(...)
```

directly renders all tasks.

---

Instead create:

```jsx
const filteredTasks = tasks.filter(...)
```

---

# FULL CODE

```jsx
const filteredTasks = tasks.filter((task) =>
  task.text.toLowerCase().includes(
    searchTerm.toLowerCase()
  )
);
```

---

# UNDERSTANDING THIS CODE

Suppose:

```jsx
task.text = "Learn React"
```

---

User searches:

```jsx
"react"
```

---

Convert both:

```jsx
"Learn React"
↓

"learn react"
```

and

```jsx
"react"
↓

"react"
```

---

Now compare:

```jsx
"learn react".includes("react")
```

Result:

```jsx
true
```

Task stays.

---

# WHY toLowerCase()

Without:

```jsx
React
```

and

```jsx
react
```

would be different.

---

Users should not care about capitals.

---

# STEP 4

Replace tasks.map()

Current:

```jsx
tasks.map(...)
```

---

New:

```jsx
filteredTasks.map(...)
```

---

Now only matching tasks appear.

---

# STEP 5

Handle No Results

Current:

```jsx
tasks.length === 0
```

checks if no tasks exist.

---

Now we need:

```jsx
filteredTasks.length === 0
```

---

Example:

Tasks:

```text
React
Tailwind
JavaScript
```

---

Search:

```text
Python
```

---

Result:

```jsx
filteredTasks = []
```

---

Show:

```text
No matching tasks found
```

---

# FULL SEARCH INPUT STYLING

```jsx
<input
  type="text"
  placeholder="Search tasks..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="
    w-full
    max-w-3xl
    p-3
    border
    border-gray-300
    rounded-md
    bg-white
    shadow-md
    mb-4
  "
/>
```

---

# VISUAL TARGET

```text
Task Dashboard
Tasks: 4

[ Add Task Form ]

[ Search Tasks ]

React

↓

Learn React
```

---

# WHY THIS IS IMPORTANT

This exercise introduces:

```text
Transform Data

↓

Display Result
```

which is one of the most important React skills.

---

# EXERCISE 9 CHECKLIST

Before moving on:

```text
✓ searchTerm state exists

✓ Search input exists

✓ Controlled input

✓ filteredTasks created

✓ filter() used

✓ includes() used

✓ toLowerCase() used

✓ filteredTasks.map() used

✓ No matching tasks message works
```

---

# SUCCESS TEST

Create:

```text
Learn React
Learn Tailwind
Learn JavaScript
Learn useMemo
```

Search:

```text
react
```

Expected:

```text
Learn React
```

Only.

---

After you build Exercise 9, we move to:

```text
Exercise 10 — useMemo Optimization
```

where you will learn **why filtering on every render can become expensive and how useMemo solves it.**
