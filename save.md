# EXERCISE 7 — SAVE EDITED TASK

This is one of the most important exercises in the entire project.

By the end you will understand:

```text
✓ Updating one object inside an array
✓ Why map() is used
✓ Why IDs matter
✓ Why we return unchanged objects
✓ Why React needs a new array
✓ How Save works in real applications
```

---

# Goal

Current behavior:

```text
Learn React

[Edit]
```

Click Edit:

```text
[ Learn React ]

[Save]
[Cancel]
```

User changes text:

```text
Learn React and Tailwind
```

Clicks:

```text
Save
```

Expected result:

```text
Learn React and Tailwind

[Edit]
```

---

# Step 1 — Create saveEdit()

Inside App.jsx

## Task

Create:

```jsx
function saveEdit(idTarget, updatedText){

}
```

---

## Answer

```jsx
function saveEdit(idTarget, updatedText){

}
```

---

# Why?

We need two things:

```text
Which task?
```

and

```text
What new text?
```

Example:

```jsx
saveEdit(
    123,
    "Learn React and Tailwind"
)
```

---

# Step 2 — Prevent Empty Saves

## Task

Don't allow:

```text
""
```

or

```text
"      "
```

to be saved.

---

## Answer

```jsx
if(!updatedText.trim()){
    return;
}
```

---

# Why?

Without this:

User can save:

```text
""
```

Result:

```text
(blank task)
```

Bad user experience.

---

# Step 3 — Update One Object

This is the most important part.

---

Current state:

```js
[
  {
    id: 1,
    text: "React"
  },

  {
    id: 2,
    text: "Tailwind"
  }
]
```

---

User edits:

```js
id = 2
```

New text:

```text
Tailwind CSS
```

---

Expected:

```js
[
  {
    id: 1,
    text: "React"
  },

  {
    id: 2,
    text: "Tailwind CSS"
  }
]
```

---

# Answer

```jsx
setTasks(prev =>
    prev.map(task =>
        task.id === idTarget
            ? {
                ...task,
                text: updatedText.trim()
              }
            : task
    )
);
```

---

# Understanding Every Line

---

### prev.map()

Loops through every task.

Example:

```text
Task 1
Task 2
Task 3
```

One by one.

---

### task.id === idTarget

Checks:

```text
Is this the task being edited?
```

---

Example:

```jsx
task.id = 1
idTarget = 2
```

Result:

```jsx
false
```

---

Example:

```jsx
task.id = 2
idTarget = 2
```

Result:

```jsx
true
```

---

### ?

If true:

Create updated object.

---

### ...task

Copies everything.

Example:

```js
{
  id: 2,
  text: "Tailwind",
  completed: true
}
```

---

### text: updatedText.trim()

Replaces only text.

Result:

```js
{
  id: 2,
  text: "Tailwind CSS",
  completed: true
}
```

Notice:

```text
id remains
completed remains
```

Only text changes.

---

### : task

Not target?

Leave unchanged.

---

# Step 4 — Exit Edit Mode

After saving:

## Answer

```jsx
setEditingId(null);
```

---

# Why?

Current:

```jsx
editingId = 123
```

After save:

```jsx
editingId = null
```

Returns to normal card.

---

# Complete saveEdit()

## Answer

```jsx
function saveEdit(idTarget, updatedText){

    if(!updatedText.trim()){
        return;
    }

    setTasks(prev =>
        prev.map(task =>
            task.id === idTarget
                ? {
                    ...task,
                    text: updatedText.trim()
                  }
                : task
        )
    );

    setEditingId(null);
}
```

---

# Step 5 — Pass saveEdit To TaskCard

## Answer

```jsx
<TaskCard
    key={task.id}
    task={task}
    editingId={editingId}
    onEditStart={() => startEdit(task.id)}
    onEditCancel={cancelEdit}
    onEditSave={saveEdit}
    deleteTask={() => deleteTask(task.id)}
    toggleComplete={() => toggleComplete(task.id)}
/>
```

---

# Why?

TaskCard must be able to tell App:

```text
Save this task.
```

---

# Step 6 — Save Button

Inside TaskCard.

---

## Answer

```jsx
<Button
    buttonText="Save"
    onClick={() =>
        onEditSave(
            task.id,
            tempText
        )
    }
    buttonColor="bg-green-500"
    buttonHoverColor="hover:bg-green-600"
/>
```

---

# What Happens?

Click:

```text
Save
```

Runs:

```jsx
onEditSave(
    task.id,
    tempText
)
```

Example:

```jsx
onEditSave(
    123,
    "Learn React and Tailwind"
)
```

---

# Final Flow

### Before

```text
Learn React

[Edit]
```

---

### Click Edit

```text
[ Learn React ]

[Save]
[Cancel]
```

---

### Type

```text
Learn React and Tailwind
```

---

### Click Save

Runs:

```jsx
saveEdit(
    123,
    "Learn React and Tailwind"
)
```

---

### After

```text
Learn React and Tailwind

[Edit]
```

---

# Knowledge Check Answers

### Why use map()?

```text
To create a brand new array while updating only one object.
```

---

### Why not modify task.text directly?

```text
React state must be treated as immutable.
```

---

### Why return task in the else case?

```text
Every item must be returned from map().
```

---

### What does ...task do?

```text
Copies every existing property from the object.
```

---

### What gets updated?

```text
Only text.
```

Everything else stays the same.

---

# Exercise 7 Challenge

After implementing Save:

Modify the project so that:

```text
If user saves text shorter than 3 characters:

Do not save.
```

Example:

```text
"Hi"
```

Should be rejected.

Hint:

Add another validation inside:

```jsx
saveEdit()
```

before:

```jsx
setTasks(...)
```

Complete Exercise 7 before moving on. Exercise 8 will add **Search with useMemo**, which introduces performance optimization and derived state.
