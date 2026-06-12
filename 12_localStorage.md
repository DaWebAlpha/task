# EXERCISE 12 — localStorage Persistence

## WHAT YOU ARE BUILDING

Current behavior:

```text
Create Task

↓

Refresh Page

↓

Everything disappears ❌
```

---

After Exercise 12:

```text
Create Task

↓

Refresh Page

↓

Everything still exists ✅
```

---

# WHY THIS EXERCISE MATTERS

Right now your tasks live only inside React memory.

```jsx
const [tasks, setTasks] = useState([]);
```

---

When page refreshes:

```text
React restarts

↓

tasks = []

↓

All data gone
```

---

Real applications cannot behave like this.

Users expect:

```text
Refresh page

↓

Data still exists
```

---

# WHAT YOU ARE LEARNING

```text
✓ localStorage

✓ useEffect

✓ Side Effects

✓ Data Persistence

✓ JSON.stringify()

✓ JSON.parse()

✓ React Lifecycle
```

---

# WHAT IS localStorage?

Browser storage.

Think:

```text
RAM
```

vs

```text
Hard Drive
```

---

React State

```text
Temporary
```

---

localStorage

```text
Permanent
```

until user clears browser data.

---

# VISUAL

Current:

```text
React State

tasks

↓

Refresh

↓

Lost
```

---

After Exercise 12:

```text
tasks

↓

localStorage

↓

Refresh

↓

Reload tasks
```

---

# STEP 1

Import:

```jsx
useEffect
```

---

Current:

```jsx
import { useState } from "react";
```

---

Change to:

```jsx
import { useState, useEffect } from "react";
```

---

# WHAT IS useEffect?

React runs it:

```text
AFTER rendering
```

---

Example:

```jsx
useEffect(() => {
  console.log("Hello");
}, []);
```

Runs:

```text
Once
```

when component loads.

---

# STEP 2

SAVE TASKS TO localStorage

Whenever tasks change:

```text
Add

Delete

Complete

Edit

Save
```

---

we want:

```text
localStorage updated
```

---

Create:

```jsx
useEffect(() => {

}, [tasks]);
```

---

# WHY [tasks]?

Means:

```text
Watch tasks
```

---

Whenever tasks changes:

```text
Run effect again
```

---

# STEP 3

STORE DATA

Inside effect:

```jsx
localStorage.setItem(
  "tasks",
  JSON.stringify(tasks)
);
```

---

# WHAT DOES THIS DO?

Current:

```jsx
[
  {
    id:1,
    text:"React",
    completed:false
  }
]
```

---

localStorage only stores:

```text
Strings
```

---

Convert array:

```jsx
JSON.stringify(tasks)
```

---

Becomes:

```text
"[{"id":1,"text":"React","completed":false}]"
```

---

Store:

```jsx
localStorage.setItem(
  "tasks",
  string
);
```

---

# STEP 4

LOAD DATA ON PAGE START

Currently:

```jsx
const [tasks, setTasks] = useState([]);
```

---

Always starts empty.

Bad.

---

We need:

```text
Check localStorage

↓

If tasks exist

↓

Load them
```

---

# STEP 5

CREATE SECOND useEffect

```jsx
useEffect(() => {

}, []);
```

---

# WHY EMPTY ARRAY?

```jsx
[]
```

means:

```text
Run only once
```

when App loads.

---

# STEP 6

GET SAVED DATA

Inside effect:

```jsx
const savedTasks =
  localStorage.getItem("tasks");
```

---

If tasks exist:

```text
savedTasks contains data
```

---

If none exist:

```text
savedTasks = null
```

---

# STEP 7

CHECK DATA EXISTS

```jsx
if(savedTasks){
    
}
```

---

WHY?

Without check:

```jsx
JSON.parse(null)
```

can cause problems.

---

# STEP 8

CONVERT STRING BACK TO ARRAY

Inside:

```jsx
setTasks(
  JSON.parse(savedTasks)
);
```

---

# VISUAL

Saved:

```text
"[{"id":1}]"
```

---

Parse:

```jsx
JSON.parse(...)
```

---

Becomes:

```jsx
[
  {
    id:1
  }
]
```

---

Real array again.

---

# COMPLETE CODE TO ADD

## LOAD TASKS

```jsx
useEffect(() => {

  const savedTasks =
    localStorage.getItem("tasks");

  if(savedTasks){

    setTasks(
      JSON.parse(savedTasks)
    );

  }

}, []);
```

---

## SAVE TASKS

```jsx
useEffect(() => {

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}, [tasks]);
```

---

# WHERE TO PLACE THEM?

Inside App

Below:

```jsx
const [tasks, setTasks]
const [newTask, setNewTask]
```

---

Before:

```jsx
function addTask()
```

---

Example:

```jsx
const [tasks, setTasks] = useState([]);
const [newTask, setNewTask] = useState("");

useEffect(() => {

}, []);

useEffect(() => {

}, [tasks]);

function addTask(){

}
```

---

# HOW IT WORKS

First Visit:

```text
tasks = []

localStorage empty
```

---

Add:

```text
Learn React
```

---

Effect Runs:

```jsx
localStorage.setItem(...)
```

---

Browser Stores:

```text
Learn React
```

---

Refresh

---

Load Effect Runs:

```jsx
localStorage.getItem(...)
```

---

Tasks Restored

---

UI Appears Exactly Same

---

# TEST

Create:

```text
Learn React

Learn Tailwind

Learn useMemo
```

---

Refresh page.

---

Expected:

```text
Learn React

Learn Tailwind

Learn useMemo
```

still visible.

---

Complete:

```text
Learn Tailwind
```

---

Refresh.

---

Expected:

```text
✓ Learn Tailwind
```

still completed.

---

Delete:

```text
Learn React
```

---

Refresh.

---

Expected:

```text
React still deleted
```

---

# IMPORTANT REACT LESSON

Notice:

```text
No save button.
```

---

Why?

Because:

```jsx
useEffect(
  ...
  [tasks]
)
```

automatically saves.

---

Every change:

```text
Add

Delete

Edit

Complete

Undo
```

---

Triggers:

```jsx
localStorage.setItem(...)
```

---

Automatically.

---

# EXERCISE 12 CHECKLIST

```text
✓ useEffect imported

✓ Load effect created

✓ Save effect created

✓ localStorage.getItem used

✓ localStorage.setItem used

✓ JSON.parse used

✓ JSON.stringify used

✓ Tasks survive refresh

✓ Completed survives refresh

✓ Deleted tasks stay deleted

✓ No save button needed
```

---

After Exercise 12 you have:

```text
✓ Header

✓ Add Task

✓ Delete Task

✓ Complete Task

✓ Undo Task

✓ Edit Task

✓ Save Task

✓ Cancel Task

✓ Search

✓ useMemo

✓ Statistics

✓ localStorage

✓ Refresh Persistence
```

Next:

```text
EXERCISE 13 — Priority System
```

where each task can be:

```text
Low

Medium

High
```

and gets colored badges automatically.
