Good point. For the earlier exercises I gave the instructions and made you think through the answers. For this learning track, it makes more sense to include the answers so you can self-check immediately.

---

# EXERCISE 6 — EDIT TASKS (WITH ANSWERS)

## Goal

Transform:

```text
Learn React

[Complete]
[Delete]
[Edit]
```

Into:

```text
[ Learn React ]

[Save]
[Cancel]
```

---

# Step 1 — Create Editing State

## Task

Add state that tracks which task is currently being edited.

### Answer

```jsx
const [editingId, setEditingId] = useState(null);
```

---

## Why?

Initially:

```jsx
editingId = null
```

No task is being edited.

If user clicks Edit on:

```js
{
  id: 123,
  text: "Learn React"
}
```

Then:

```jsx
editingId = 123
```

Now React knows which card should show the input box.

---

# Step 2 — Create startEdit()

## Task

Create a function that activates edit mode.

### Answer

```jsx
function startEdit(id){
    setEditingId(id);
}
```

---

## Why?

Suppose:

```jsx
startEdit(123);
```

Then:

```jsx
editingId = 123
```

React re-renders.

---

# Step 3 — Pass Props to TaskCard

## Task

Give TaskCard access to editing information.

### Answer

```jsx
<TaskCard
    key={task.id}
    task={task}
    editingId={editingId}
    onEditStart={() => startEdit(task.id)}
    deleteTask={() => deleteTask(task.id)}
    toggleComplete={() => toggleComplete(task.id)}
/>
```

---

## Why?

TaskCard needs to know:

```text
Am I being edited?
```

Without:

```jsx
editingId={editingId}
```

it cannot know.

---

# Step 4 — Determine Whether Current Card Is Editing

## Task

Inside TaskCard create:

### Answer

```jsx
const isEditing = editingId === task.id;
```

---

## Why?

Suppose:

```jsx
editingId = 5
```

Current task:

```jsx
task.id = 5
```

Result:

```jsx
true
```

This card enters edit mode.

---

Another task:

```jsx
task.id = 8
```

Result:

```jsx
false
```

This card remains normal.

---

# Step 5 — Create Temporary State

## Task

Create local state for typing.

### Answer

```jsx
const [tempText, setTempText] = useState(task.text);
```

---

## Why?

User types:

```text
Learn React and Tailwind
```

We don't want to change:

```jsx
task.text
```

yet.

Only after Save.

---

# Step 6 — Create Edit Button

## Task

Add Edit button.

### Answer

```jsx
<Button
    buttonText="Edit"
    onClick={() => {
        setTempText(task.text);
        onEditStart();
    }}
    buttonColor="bg-blue-500"
    buttonHoverColor="hover:bg-blue-600"
/>
```

---

## Why?

Before editing:

```text
Learn React
```

Click Edit.

Input should already contain:

```text
Learn React
```

not:

```text
empty
```

---

# Step 7 — Create Cancel Function

## Task

Inside App.jsx:

### Answer

```jsx
function cancelEdit(){
    setEditingId(null);
}
```

---

Pass it:

```jsx
onEditCancel={cancelEdit}
```

---

## Why?

User decides:

```text
I don't want to edit anymore
```

Cancel returns:

```jsx
editingId = null
```

Edit mode closes.

---

# Step 8 — Create Cancel Button

## Task

Inside TaskCard.

### Answer

```jsx
<Button
    buttonText="Cancel"
    onClick={onEditCancel}
    buttonColor="bg-gray-500"
    buttonHoverColor="hover:bg-gray-600"
/>
```

---

# Step 9 — Conditional Rendering

## Task

Switch between:

### Normal View

```text
Task Text

Edit
Delete
Complete
```

and

### Edit View

```text
Input

Save
Cancel
```

---

### Answer

```jsx
if(isEditing){
    return (
        EDIT VIEW
    );
}

return (
    NORMAL VIEW
);
```

---

# What Your App Should Do After Exercise 6

### Before

```text
Learn React

[Edit]
[Delete]
[Complete]
```

---

### Click Edit

```text
[ Learn React ]

[Save]
[Cancel]
```

---

### Click Cancel

```text
Learn React

[Edit]
[Delete]
[Complete]
```

---

# Knowledge Check Answers

### Why do we need editingId?

```text
To know exactly which task is currently being edited.
```

---

### Why compare IDs?

```text
IDs are unique.

Task text may be duplicated.
```

Example:

```text
Study React
Study React
```

Texts are same.

IDs are different.

---

### Why tempText?

```text
Allows typing without modifying the real task.
```

---

### Why not edit task.text directly?

```text
React state should not be mutated directly.
```

---

### Why conditional rendering?

```text
To show different UI depending on application state.
```

Next, Exercise 7 will implement the **Save button**, which is where you'll learn the most important React pattern in this project:

```jsx
tasks.map(task =>
    task.id === idTarget
        ? { ...task, text: updatedText }
        : task
)
```

That pattern is used constantly in real React applications.
