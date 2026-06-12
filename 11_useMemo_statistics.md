# EXERCISE 11 — Statistics Dashboard

## WHAT YOU ARE BUILDING

Current:

```text
Task Dashboard

[ Search ]

Learn React

✓ Learn Tailwind

Learn useMemo
```

---

After Exercise 11:

```text
+--------------------------------+
| Statistics                     |
|                                |
| Total Tasks: 3                |
| Completed: 1                  |
| Remaining: 2                  |
+--------------------------------+

Learn React

✓ Learn Tailwind

Learn useMemo
```

---

# WHY THIS EXERCISE MATTERS

This exercise teaches one of the most important skills in React:

```text
Derived State
```

Meaning:

```text
Do NOT store data

that can be calculated.
```

---

Wrong:

```jsx
const [totalTasks, setTotalTasks] = useState(0);
const [completedTasks, setCompletedTasks] = useState(0);
const [remainingTasks, setRemainingTasks] = useState(0);
```

---

Why wrong?

Because:

```text
tasks already contains everything.
```

---

Example:

```jsx
[
  {
    id: 1,
    text: "React",
    completed: true
  },

  {
    id: 2,
    text: "Tailwind",
    completed: false
  }
]
```

---

From this single array we can calculate:

```text
Total = 2

Completed = 1

Remaining = 1
```

No extra state needed.

---

# WHAT YOU ARE LEARNING

```text
✓ Derived State

✓ Array Calculations

✓ filter()

✓ length

✓ Props

✓ Statistics Components

✓ Dashboard Design

✓ Data Flow
```

---

# STEP 1

Create:

```text
components/Statistics.jsx
```

---

# RESPONSIBILITY

Statistics receives:

```text
totalTasks

completedTasks

remainingTasks
```

and displays them.

---

# COMPONENT STRUCTURE

```text
App

↓

Statistics

↓

Displays Numbers
```

---

# STEP 2

CREATE Statistics Component

```jsx
function Statistics({
  totalTasks,
  completedTasks,
  remainingTasks
}){

}
```

---

# VISUAL DESIGN

```text
+--------------------------+
| Statistics               |
|                          |
| Total Tasks: 3           |
| Completed: 1             |
| Remaining: 2             |
+--------------------------+
```

---

# TAILWIND CARD

Use:

```text
bg-white
shadow-md
rounded-md
p-5
w-full
max-w-3xl
mb-4
```

---

# WHY

```text
bg-white
```

card color

---

```text
shadow-md
```

card effect

---

```text
rounded-md
```

rounded corners

---

```text
max-w-3xl
```

same width as TaskCard

---

# STEP 3

CALCULATE TOTAL TASKS

Inside App.jsx

You already have:

```jsx
const [tasks, setTasks] = useState([]);
```

---

Total tasks:

```jsx
const totalTasks = tasks.length;
```

---

WHY?

Suppose:

```jsx
[
  {},
  {},
  {}
]
```

---

length:

```text
3
```

---

# STEP 4

CALCULATE COMPLETED TASKS

Current tasks:

```jsx
[
  {
    text:"React",
    completed:true
  },

  {
    text:"Tailwind",
    completed:false
  }
]
```

---

We only want:

```text
completed:true
```

---

Use:

```jsx
const completedTasks =
  tasks.filter(
    task => task.completed
  ).length;
```

---

HOW IT WORKS

Step 1

```jsx
tasks.filter(
  task => task.completed
)
```

returns:

```jsx
[
  {
    text:"React",
    completed:true
  }
]
```

---

Step 2

```jsx
.length
```

returns:

```text
1
```

---

# STEP 5

CALCULATE REMAINING TASKS

Current:

```text
Total = 5

Completed = 2
```

---

Remaining:

```text
3
```

---

Formula:

```jsx
const remainingTasks =
  totalTasks - completedTasks;
```

---

# WHY THIS IS BETTER

Instead of:

```jsx
filter(task => !task.completed)
```

you already know:

```text
Total

and

Completed
```

---

Simple math:

```text
Remaining =
Total - Completed
```

---

# STEP 6

IMPORT Statistics

```jsx
import Statistics from "./components/Statistics";
```

---

# STEP 7

RENDER Statistics

Place:

```jsx
<Statistics
  totalTasks={totalTasks}
  completedTasks={completedTasks}
  remainingTasks={remainingTasks}
/>
```

---

Between:

```text
Header

↓

Statistics

↓

TaskForm

↓

Task List
```

---

# COMPLETE Statistics.jsx

```jsx
function Statistics({
  totalTasks,
  completedTasks,
  remainingTasks
}){

  return (
    <div
      className="
        bg-white
        shadow-md
        rounded-md
        p-5
        w-full
        max-w-3xl
        mb-4
      "
    >
      <h2
        className="
          text-xl
          font-bold
          mb-3
        "
      >
        Statistics
      </h2>

      <p>
        Total Tasks: {totalTasks}
      </p>

      <p>
        Completed: {completedTasks}
      </p>

      <p>
        Remaining: {remainingTasks}
      </p>

    </div>
  )
}

export default Statistics;
```

---

# CODE TO ADD IN App.jsx

```jsx
const totalTasks =
  tasks.length;

const completedTasks =
  tasks.filter(
    task => task.completed
  ).length;

const remainingTasks =
  totalTasks - completedTasks;
```

---

Render:

```jsx
<Statistics
  totalTasks={totalTasks}
  completedTasks={completedTasks}
  remainingTasks={remainingTasks}
/>
```

---

# VISUAL TEST

Create:

```text
Learn React

Learn Tailwind

Learn useMemo
```

---

Statistics:

```text
Total Tasks: 3

Completed: 0

Remaining: 3
```

---

Click Complete on:

```text
Learn Tailwind
```

---

Statistics should instantly become:

```text
Total Tasks: 3

Completed: 1

Remaining: 2
```

---

Click Undo:

```text
Total Tasks: 3

Completed: 0

Remaining: 3
```

---

# REACT LESSON

Notice:

```text
You never called:

setCompletedTasks()

setRemainingTasks()

setTotalTasks()
```

---

Why?

Because React recalculates:

```jsx
tasks.length

tasks.filter(...)

total - completed
```

every render.

---

This is called:

```text
DERIVED STATE
```

and it is how professional React applications are built.

---

# EXERCISE 11 CHECKLIST

```text
✓ Statistics.jsx created

✓ Imported into App

✓ totalTasks calculated

✓ completedTasks calculated

✓ remainingTasks calculated

✓ Props passed correctly

✓ Numbers update automatically

✓ No extra useState used

✓ Complete / Undo updates stats

✓ Delete updates stats
```

---

After Exercise 11 you have:

```text
✓ Header

✓ TaskForm

✓ Add Task

✓ Task List

✓ Delete Task

✓ Complete Task

✓ Undo Task

✓ Edit Task

✓ Save Task

✓ Cancel Task

✓ Search

✓ useMemo

✓ Statistics Dashboard
```

Next:

```text
EXERCISE 12 — localStorage Persistence
```

where page refresh will no longer delete your tasks.
