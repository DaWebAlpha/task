# Exercise 4 — Delete Task

You have successfully completed:

```text
✓ Header
✓ TaskForm
✓ addTask()
✓ Date.now()
✓ Object Structure
✓ map()
✓ TaskCard
```

Now we build the first CRUD operation:

```text
Create  ✅
Read    ✅
Update  ❌
Delete  ← TODAY
```

---

# Goal

Current:

```text
Learn React

Learn Tailwind

Learn JavaScript
```

After Exercise 4:

```text
Learn React       [Delete]

Learn Tailwind    [Delete]

Learn JavaScript  [Delete]
```

Click:

```text
Delete
```

and task disappears.

---

# What You Are Learning

```text
✓ filter()
✓ State Removal
✓ Passing Functions as Props
✓ Event Handling
✓ Parent → Child Communication
✓ Child → Parent Communication
```

---

# Step 1

Create a new function inside App.

Name:

```text
deleteTask
```

---

# Responsibility

This function receives:

```text
idTarget
```

Example:

```js
deleteTask(171234567)
```

and removes that task.

---

# Understanding filter()

Imagine:

```js
tasks = [
  { id: 1, text: "React" },
  { id: 2, text: "Tailwind" },
  { id: 3, text: "JavaScript" }
]
```

---

You click delete on:

```text
Tailwind
```

which has:

```js
id = 2
```

---

filter checks every task:

```text
Task 1 → Keep

Task 2 → Remove

Task 3 → Keep
```

---

Result:

```js
[
  { id: 1, text: "React" },
  { id: 3, text: "JavaScript" }
]
```

---

# Visual

```text
Before

React
Tailwind
JavaScript
```

↓

```text
Delete Tailwind
```

↓

```text
After

React
JavaScript
```

---

# Step 2

Pass deleteTask to TaskCard.

Current:

```jsx
<TaskCard
    key={task.id}
    task={task.text}
/>
```

---

New flow:

```text
App

↓

TaskCard

↓

Button

↓

deleteTask()
```

---

# Step 3

TaskCard Needs a Button

Layout target:

```text
+----------------------------------+
| Learn React                      |
|                                  |
| [Delete]                         |
+----------------------------------+
```

---

Use your existing Button component.

Pass:

```text
buttonText
onClick
buttonColor
buttonHoverColor
```

---

# Step 4

TaskCard Must Know Which Task

Currently:

```jsx
task={task.text}
```

works.

But Delete needs:

```jsx
task.id
```

too.

---

So start thinking:

```text
TaskCard should know the entire task object.
```

---

Example:

```js
{
  id: 123,
  text: "Learn React",
  completed: false
}
```

---

# Data Flow Diagram

```text
User Clicks Delete

↓

Button

↓

TaskCard

↓

deleteTask(task.id)

↓

App

↓

setTasks()

↓

tasks updated

↓

React re-renders

↓

Card disappears
```

---

# Tailwind Practice

Task Card:

```text
bg-white
shadow-md
rounded-md
p-4
my-2
```

---

Button:

```text
bg-red-500
hover:bg-red-600
text-white
```

---

Container:

```text
flex
justify-between
items-center
```

---

Visual Target

```text
+-------------------------------------+
| Learn React             [Delete]    |
+-------------------------------------+

+-------------------------------------+
| Learn Tailwind          [Delete]    |
+-------------------------------------+
```

---

# Why Delete Happens in App

Wrong:

```text
TaskCard deletes itself
```

---

Correct:

```text
App owns tasks state

↓

Only App can modify tasks
```

---

# Exercise 4 Checklist

Before sending code:

```text
✓ deleteTask function exists

✓ filter() used

✓ setTasks() used

✓ deleteTask passed as prop

✓ TaskCard receives deleteTask

✓ Delete button exists

✓ Clicking button removes task

✓ Uses task.id

✓ No page refresh required
```

---

# Important Thought Question

Suppose:

```js
tasks = [
  {id:1,text:"React"},
  {id:2,text:"React"}
]
```

If you delete by:

```js
text === "React"
```

what happens?

Why is:

```js
id === 2
```

safer?

Answer that before coding. That understanding is one of the biggest reasons we introduced:

```js
id: Date.now()
```

in Exercise 3.
