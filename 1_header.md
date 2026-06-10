

# FINAL PROJECT WE ARE BUILDING

By Exercise 50 you will have:

```text
Task Dashboard

✓ Header
✓ Add Task
✓ Task List
✓ Task Card
✓ Delete Task
✓ Edit Task
✓ Save Task
✓ Cancel Edit
✓ Search Tasks
✓ Statistics
✓ Completed Tasks
✓ Remaining Tasks
✓ Priority
✓ Due Date
✓ useMemo
✓ useRef
✓ useEffect
✓ localStorage
✓ Tailwind
```

---

# EXERCISE 1

## GOAL

Create the application shell.

At the end you should see:

```text
+------------------------+
| Task Dashboard         |
| Tasks: 0              |
+------------------------+
```

Nothing else.

---

# WHAT YOU ARE LEARNING

Today you learn:

```text
✓ Component
✓ Props
✓ Tailwind basics
✓ Export / Import
✓ JSX
```

No useState yet.

No useEffect yet.

No useMemo yet.

---

# STEP 1

Create folder:

```text
src
|
├── components
|
└── App.jsx
```

Inside components create:

```text
Header.jsx
```

---

# STEP 2

Header component receives TWO props

```text
name
totalTasks
```

Think:

```text
Header

needs information

↓

App sends information

↓

Header displays information
```

Diagram:

```text
App

 |
 | name="Task Dashboard"
 |
 | totalTasks={0}
 |
 V

Header
```

---

# STEP 3

Header Layout

Visual design:

```text
+----------------------+
| Task Dashboard       |
| Tasks: 0             |
+----------------------+
```

---

# TAILWIND YOU MUST USE

Container:

```text
shadow-md
p-4
bg-white
```

---

For layout:

```text
flex
flex-col
items-center
gap-2
```

---

For title:

```text
font-bold
text-2xl
```

---

For task count:

```text
font-semibold
```

---

# WHY THESE CLASSES EXIST

```text
flex
→ activates flexbox
```

```text
flex-col
→ stack children vertically
```

Without it:

```text
Task Dashboard Tasks:0
```

becomes one line.

---

```text
items-center
```

Centers horizontally.

Without it:

```text
everything sticks left
```

---

```text
gap-2
```

Space between title and count.

Without it:

```text
text touches each other
```

---

```text
shadow-md
```

Adds card effect.

Without it:

```text
looks flat
```

---

# APP RESPONSIBILITY

App should:

```text
Import Header

Render Header

Pass props
```

---

Diagram:

```text
App
 |
 |
 |---- Header
          |
          |---- name
          |
          |---- totalTasks
```

---

# YOUR EXERCISE

Write:

```text
Header.jsx
```

and

```text
App.jsx
```

so that:

```text
Task Dashboard
Tasks: 0
```

appears.

---

# RULES

You MUST:

```text
✓ create Header component
✓ use props
✓ import Header into App
✓ pass name prop
✓ pass totalTasks prop
✓ use all Tailwind classes listed
```

---

# DO NOT ADD

```text
useState
input
button
task list
```

yet.

Those belong to later exercises.


