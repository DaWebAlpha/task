Perfect. We keep the exact same format as Exercise 1.

---

# EXERCISE 2

## GOAL

Build the input section of the dashboard.

At the end you should see:

```text
+--------------------------+
| Task Dashboard           |
| Tasks: 0                 |
+--------------------------+

+--------------------------+
| Add New Task             |
|                          |
| [ Enter Task Here ]      |
|                          |
| [ Add Task ]             |
+--------------------------+
```

Nothing should be added yet.

No task list yet.

No map() yet.

No useEffect yet.

No useRef yet.

Just the input system.

---

# WHAT YOU ARE LEARNING

Today you learn:

```text
✓ useState
✓ Controlled Inputs
✓ onChange
✓ Props
✓ Event Handling
✓ Tailwind Forms
```

---

# CURRENT PROJECT STRUCTURE

```text
src
│
├── components
│   ├── Header.jsx
│   └── TaskForm.jsx
│
└── App.jsx
```

---

# STEP 1

Create:

```text
components/TaskForm.jsx
```

---

# STEP 2

TaskForm receives FOUR props

```text
value
onChange
onClick
buttonText
```

Think:

```text
App owns state

↓

TaskForm displays state

↓

TaskForm tells App when user types
```

Diagram:

```text
App
 │
 │ value
 │
 │ onChange
 │
 │ onClick
 ▼

TaskForm
```

---

# STEP 3

TaskForm Layout

Visual:

```text
+------------------------+
| Add New Task           |
|                        |
| [ Input Field ]        |
|                        |
| [ Add Task ]           |
+------------------------+
```

---

# TAILWIND FOR OUTER CARD

Use:

```text
bg-white
shadow-md
rounded-md
p-4
w-full
max-w-2xl
```

---

# WHY THESE CLASSES EXIST

```text
bg-white
```

Creates card background.

---

```text
shadow-md
```

Creates card effect.

---

```text
rounded-md
```

Rounded corners.

---

```text
w-full
```

Uses available width.

---

```text
max-w-2xl
```

Stops form becoming too wide.

---

# TAILWIND FOR LAYOUT

Use:

```text
flex
flex-col
gap-4
```

---

# WHY

```text
flex-col
```

Stack title, input and button vertically.

---

```text
gap-4
```

Space between elements.

---

Without it:

```text
Title
Input
Button
```

would touch each other.

---

# INPUT REQUIREMENTS

Input should have:

```text
type="text"
placeholder="Enter Task..."
```

---

# INPUT TAILWIND

Use:

```text
border
border-gray-300
rounded-md
px-3
py-2
w-full
```

---

# WHY

```text
border
```

Makes input visible.

---

```text
px-3
py-2
```

Creates internal spacing.

---

```text
w-full
```

Input stretches across card.

---

# BUTTON REQUIREMENTS

Button text comes from props.

Example:

```text
Add Task
```

---

# BUTTON TAILWIND

Use:

```text
bg-blue-500
text-white
rounded-md
px-4
py-2
hover:bg-blue-600
```

---

# WHY

```text
bg-blue-500
```

Button color.

---

```text
hover:bg-blue-600
```

Shows user interaction.

---

# APP RESPONSIBILITY

App should create state:

```text
newTask
setNewTask
```

using:

```text
useState
```

---

# DATA FLOW

Diagram:

```text
newTask state

      │
      ▼

 value={newTask}

      │
      ▼

 input

      │
      ▼

 user types

      │
      ▼

 onChange

      │
      ▼

 setNewTask(...)
```

---

# WHAT SHOULD HAPPEN

When user types:

```text
Learn React
```

state updates immediately.

---

# TEST

Temporarily add:

```jsx
<p>{newTask}</p>
```

below TaskForm.

---

When typing:

```text
Learn React
```

you should see:

```text
Learn React
```

appear below the form instantly.

---

# YOUR EXERCISE

Create:

```text
TaskForm.jsx
```

and update:

```text
App.jsx
```

so that:

```text
✓ Header appears
✓ Form appears
✓ Typing updates state
✓ Text displays below form
✓ Button exists
```

---

# DO NOT ADD YET

```text
addTask function
Date.now()
task array
map()
delete
edit
search
statistics
```

Those belong to later exercises.

---

# SUCCESS CHECKLIST

Before sending your code:

```text
✓ useState exists
✓ newTask state exists
✓ value prop connected
✓ onChange prop connected
✓ button visible
✓ typed text appears below form
✓ Tailwind classes added
```

When finished, paste:

```text
TaskForm.jsx
App.jsx
```

and I'll review them exactly like Exercise 1 before we move to Exercise 3 (the real addTask engine).

