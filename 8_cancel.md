Excellent. If Save is completed, then the next logical step is:

# EXERCISE 7 — CANCEL EDIT

## GOAL

You already have:

```text
✓ Edit
✓ Save
```

Now build:

```text
✓ Cancel
```

---

# WHY CANCEL EXISTS

Imagine:

```text
Learn React
```

You click Edit.

You type:

```text
Learn React and Redux and TypeScript
```

Then decide:

```text
I don't want this change.
```

You need a way to abandon the edit.

---

# BEFORE CANCEL

Current flow:

```text
Edit

↓

Change text

↓

Save
```

Only one path.

---

# AFTER CANCEL

```text
Edit

↓

Change text

↓

Save
```

OR

```text
Edit

↓

Change text

↓

Cancel
```

---

# WHAT SHOULD HAPPEN?

Current task:

```text
Learn React
```

Click Edit:

```text
[ Learn React ]
```

Type:

```text
Learn React Advanced
```

Click Cancel.

Result:

```text
Learn React
```

The original text remains.

---

# STEP 1

Create function:

```js
function cancelEdit() {

}
```

---

# STEP 2

What state must be reset?

Currently:

```js
editingId
```

contains:

```js
123456
```

meaning:

```text
Task 123456 is being edited
```

---

To stop editing:

```js
setEditingId(null);
```

---

# WHY?

Because:

```js
null
```

means:

```text
No task is being edited
```

---

# STEP 3

Reset editText

Current:

```js
editText = "Learn React Advanced"
```

After cancel:

```js
editText = ""
```

---

Code:

```js
setEditText("");
```

---

# COMPLETE FUNCTION

```js
function cancelEdit() {

  setEditingId(null);

  setEditText("");

}
```

---

# STEP 4

Pass cancelEdit To TaskCard

Current:

```jsx
<TaskCard
  ...
/>
```

Add:

```jsx
cancelEdit={cancelEdit}
```

---

# STEP 5

TaskCard Receives New Prop

Current:

```js
function TaskCard({
  task,
  deleteTask,
  toggleComplete,
  startEdit,
  saveEdit
})
```

Add:

```js
cancelEdit
```

---

# STEP 6

Create Cancel Button

Only show it in:

```text
Editing Mode
```

---

Button:

```jsx
<Button
  buttonText="Cancel"
  onClick={cancelEdit}
  buttonColor="bg-gray-500"
  buttonHoverColor="hover:bg-gray-600"
/>
```

---

# WHY GRAY?

Convention:

```text
Green = Positive Action

Red = Dangerous Action

Gray = Neutral Action
```

Cancel is neutral.

---

# CONDITIONAL VIEW

## Normal Mode

Show:

```text
Edit
Complete
Delete
```

---

## Editing Mode

Show:

```text
Save
Cancel
```

---

# VISUAL TARGET

Before Edit:

```text
Learn React

[Edit]
[Complete]
[Delete]
```

---

After Edit:

```text
[ Learn React ]

[Save]
[Cancel]
```

---

After Cancel:

```text
Learn React

[Edit]
[Complete]
[Delete]
```

---

# SUCCESS CHECKLIST

```text
✓ cancelEdit exists

✓ setEditingId(null)

✓ setEditText("")

✓ passed to TaskCard

✓ Cancel button exists

✓ Cancel leaves original text unchanged

✓ Save still works

✓ Delete still works

✓ Complete still works
```

---

# REACT THINKING EXERCISE

Complete these from memory before coding:

### Delete

```js
setTasks(prev =>
  prev.________(...)
)
```

Answer:

```js
filter
```

---

### Complete

```js
setTasks(prev =>
  prev.________(...)
)
```

Answer:

```js
map
```

---

### Edit Save

```js
setTasks(prev =>
  prev.________(...)
)
```

Answer:

```js
map
```

---

### Cancel

```js
setTasks(...)
```

Answer:

```text
No setTasks needed
```

Because Cancel does not change any task.

It only resets:

```js
editingId
editText
```

After you finish Exercise 7, the next exercise will be **Search Tasks with useMemo**, which introduces one of the most important React optimization patterns in the project.
