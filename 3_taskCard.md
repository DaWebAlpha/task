Perfect. I'll keep the same teaching style as Exercise 1 and 2.

---

# EXERCISE 3

## GOAL

Build the real task creation engine.

At the end you should be able to:

```text
Type: Learn React

Click: Add Task

↓

Task appears below

↓

Input becomes empty
```

---

# CURRENT UI

You currently have:

```text
+------------------------+
| Task Dashboard         |
| Tasks: 0               |
+------------------------+

+------------------------+
| Add New Task           |
|                        |
| [ Enter Task ]         |
|                        |
| [ Add Task ]           |
+------------------------+

Learn React
```

The text updates because of state.

Good.

---

# AFTER EXERCISE 3

You should have:

```text
+------------------------+
| Task Dashboard         |
| Tasks: 1               |
+------------------------+

+------------------------+
| Add New Task           |
|                        |
| [ Enter Task ]         |
|                        |
| [ Add Task ]           |
+------------------------+

+------------------------+
| Learn React            |
+------------------------+
```

---

# WHAT YOU ARE LEARNING

Today:

```text
✓ Arrays in State
✓ Object Creation
✓ Date.now()
✓ Immutable Updates
✓ map()
✓ Validation
```

---

# STEP 1

Create a function inside App.

Name:

```text
addTask
```

---

# RESPONSIBILITY OF addTask

This function must:

```text
1. Check input

2. Stop empty submissions

3. Create task object

4. Add task object into tasks array

5. Clear input
```

---

# WHY CHECK INPUT?

Imagine user clicks:

```text
Add Task
```

without typing.

Without validation:

```text
Task 1 = ""

Task 2 = ""

Task 3 = ""
```

You would fill your application with junk.

---

# VALIDATION RULE

Check:

```text
newTask.trim()
```

---

# WHY trim()?

User types:

```text
"       "
```

which looks empty.

trim() converts:

```text
"       "
```

into:

```text
""
```

Now you can stop it.

---

# STEP 2

Create a task object.

Every task in the entire project will follow ONE structure.

```text
Task
│
├── id
├── text
└── completed
```

---

# OBJECT VISUAL

```js
{
    id: 123456,
    text: "Learn React",
    completed: false
}
```

---

# WHY id EXISTS

Later:

```text
Delete Task
Edit Task
Complete Task
```

need to know:

```text
WHICH task?
```

id solves that.

---

# WHY text EXISTS

Stores:

```text
Learn React
```

---

# WHY completed EXISTS

Later:

```text
✓ Completed
✗ Not Completed
```

will use it.

---

# STEP 3

Generate id

Use:

```text
Date.now()
```

---

# WHAT DOES Date.now() RETURN?

Example:

```js
1719158812000
```

---

Every click creates:

```text
1719158812000

1719158815000

1719158820000
```

Different numbers.

Perfect IDs.

---

# STEP 4

Add Task Into State

Current:

```text
tasks
```

might be:

```js
[
  {
    id: 1,
    text: "React",
    completed: false
  }
]
```

---

After adding:

```text
Tailwind
```

it becomes:

```js
[
  {
    id: 1,
    text: "React",
    completed: false
  },

  {
    id: 2,
    text: "Tailwind",
    completed: false
  }
]
```

---

# WHY USE SPREAD?

Use:

```text
prev => [...prev, taskObject]
```

---

Visual:

```text
Old Array

[React]

+

New Task

[Tailwind]

=

[React, Tailwind]
```

---

# STEP 5

Clear Input

After task creation:

```text
Learn React
```

should disappear from input.

---

Why?

Because user already submitted it.

---

# STEP 6

Connect Button

Current:

```text
Button Click

↓

Console Log
```

---

Replace with:

```text
Button Click

↓

addTask()
```

---

# STEP 7

Display Tasks

Below TaskForm.

---

Use:

```text
tasks.map(...)
```

---

# WHY map()?

Suppose:

```js
tasks = [
  "React",
  "Tailwind",
  "JavaScript"
]
```

---

Without map:

```jsx
<p>React</p>
<p>Tailwind</p>
<p>JavaScript</p>
```

Manual.

---

With map:

```text
React automatically loops.

1 task
10 tasks
100 tasks
```

same code.

---

# TASK DISPLAY DESIGN

Each task should look like:

```text
+------------------------+
| Learn React            |
+------------------------+
```

---

# TAILWIND FOR TASK CARD

Use:

```text
bg-white
shadow-md
rounded-md
p-3
my-2
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
my-2
```

space between cards

---

# APP STRUCTURE AFTER EXERCISE

```text
App

│

├── tasks state

├── newTask state

├── addTask()

│

├── Header

├── TaskForm

│

└── tasks.map(...)
```

---

# SUCCESS CHECKLIST

Before sending code:

```text
✓ addTask exists

✓ validation exists

✓ trim() exists

✓ task object exists

✓ Date.now() exists

✓ completed:false exists

✓ setTasks used

✓ setNewTask("") used

✓ button calls addTask

✓ tasks.map() used

✓ task cards visible
```

---

# DO NOT ADD YET

```text
delete
edit
save
cancel
search
statistics
useMemo
useRef
localStorage
```

---

# VISUAL TARGET

After adding 3 tasks:

```text
Task Dashboard
Tasks: 3

[Input]

[Add Task]

+------------------+
| Learn React      |
+------------------+

+------------------+
| Learn Tailwind   |
+------------------+

+------------------+
| Learn useState   |
+------------------+
```

---

When finished, paste **only App.jsx**, and I'll review it line-by-line before we move to **Exercise 4 (extracting TaskCard into its own component).**
