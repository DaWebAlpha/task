Excellent. Now we move to one of the most important React concepts in the entire project.

---

# EXERCISE 10 — useMemo Optimization

## WHAT YOU ARE BUILDING

Current:

```text
Search Input

↓

filter()

↓

filteredTasks

↓

Render
```

Everything works.

---

The problem:

Every time React re-renders:

```text
Type Search

↓

filter()

runs
```

---

Click Complete:

```text
filter()

runs again
```

---

Delete Task:

```text
filter()

runs again
```

---

Edit Task:

```text
filter()

runs again
```

---

Even when search did not change.

---

# WHAT YOU ARE LEARNING

```text
✓ useMemo
✓ Expensive Computations
✓ Dependency Arrays
✓ Memoization
✓ Performance Optimization
✓ React Render Cycle
```

---

# WHAT IS useMemo?

Think:

Current:

```jsx
const filteredTasks = tasks.filter(...)
```

Every render:

```text
React renders

↓

filter()

runs again
```

---

Example:

```text
1000 tasks
```

Search:

```text
React
```

---

Every button click:

```text
filter 1000 tasks again
```

Not efficient.

---

# WHAT DOES useMemo DO?

It says:

```text
React

Please remember this calculation

and only run it again

when specific values change
```

---

Visual:

```text
Render

↓

useMemo checks dependencies

↓

Changed?

YES

↓

Recalculate
```

---

```text
Render

↓

useMemo checks dependencies

↓

Changed?

NO

↓

Reuse old result
```

---

# STEP 1

Import useMemo

Current:

```jsx
import { useState } from "react";
```

Change to:

```jsx
import { useState, useMemo } from "react";
```

---

# STEP 2

Current Filter

You probably have:

```jsx
const filteredTasks = tasks.filter((task) =>
  task.text
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
```

---

Remove it.

---

# STEP 3

Create useMemo Version

```jsx
const filteredTasks = useMemo(() => {

  return tasks.filter((task) =>
    task.text
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

}, [tasks, searchTerm]);
```

---

# UNDERSTANDING THE STRUCTURE

Part 1:

```jsx
useMemo(() => {

})
```

Means:

```text
Store result of calculation
```

---

Part 2:

```jsx
return tasks.filter(...)
```

Means:

```text
This is the calculation
```

---

Part 3:

```jsx
[tasks, searchTerm]
```

Means:

```text
Recalculate ONLY if:

tasks changes

OR

searchTerm changes
```

---

# WHY tasks?

Suppose:

```text
React
Tailwind
```

Search:

```text
React
```

---

Add:

```text
React Hooks
```

Tasks changed.

Need new filter.

---

# WHY searchTerm?

Suppose:

```text
search = React
```

then:

```text
search = Tailwind
```

Need new filter.

---

# WHAT HAPPENS NOW?

User clicks:

```text
Complete
```

---

tasks changes:

```text
YES
```

---

Recalculate:

```text
YES
```

Correct.

---

User types:

```text
React
```

---

searchTerm changes:

```text
YES
```

---

Recalculate:

```text
YES
```

Correct.

---

Suppose another state changes later:

```text
editingId
```

---

tasks unchanged

searchTerm unchanged

---

Result:

```text
useMemo returns cached result
```

No filtering performed.

---

# STEP 4

Add Debugging Console

Inside useMemo:

```jsx
const filteredTasks = useMemo(() => {

  console.log("Filtering tasks...");

  return tasks.filter((task) =>
    task.text
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

}, [tasks, searchTerm]);
```

---

# TEST

Search:

```text
React
```

Console:

```text
Filtering tasks...
```

---

Search:

```text
Tailwind
```

Console:

```text
Filtering tasks...
```

---

Later when we add:

```text
Statistics
```

and other UI state changes,

you will notice:

```text
Filtering tasks...
```

does NOT run unnecessarily.

---

# WHY useMemo EXISTS

Imagine:

```text
10 tasks
```

No problem.

---

Imagine:

```text
10,000 tasks
```

Now:

```text
filter()

map()

sort()

statistics()

```

can become expensive.

---

useMemo prevents wasted work.

---

# VISUAL DATA FLOW

Without useMemo:

```text
Render

↓

filter()

↓

Render

↓

filter()

↓

Render

↓

filter()
```

---

With useMemo:

```text
Render

↓

Dependencies Changed?

↓

NO

↓

Use Saved Result
```

---

# FULL CODE TO ADD

```jsx
import { useState, useMemo } from "react";

const filteredTasks = useMemo(() => {

  return tasks.filter((task) =>
    task.text
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

}, [tasks, searchTerm]);
```

---

# EXERCISE 10 CHECKLIST

```text
✓ useMemo imported

✓ filteredTasks uses useMemo

✓ filter() moved into useMemo

✓ dependency array exists

✓ tasks dependency exists

✓ searchTerm dependency exists

✓ UI still works

✓ search still works
```

---

# SUCCESS TEST

Create:

```text
Learn React
Learn Tailwind
Learn useMemo
```

Search:

```text
memo
```

Expected:

```text
Learn useMemo
```

---

After Exercise 10 you have:

```text
✓ Header
✓ Add Task
✓ Delete Task
✓ Complete Task
✓ Undo Task
✓ Edit Task
✓ Save Task
✓ Cancel Edit
✓ Search Tasks
✓ useMemo
```

Next:

```text
EXERCISE 11 — Statistics Dashboard
```

where we build:

```text
Total Tasks

Completed Tasks

Remaining Tasks
```

from the task array dynamically.
