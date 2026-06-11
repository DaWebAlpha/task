Perfect. Let's do Exercise 5 exactly like Exercises 1–4.

---

# Exercise 5 — Complete / Undo Task

## What You Are Building

Current:

```text
Learn React          Delete
Learn Tailwind       Delete
```

After Exercise 5:

```text
Learn React          Complete   Delete
Learn Tailwind       Complete   Delete
```

Click:

```text
Complete
```

Result:

```text
✓ Learn React        Undo       Delete
Learn Tailwind       Complete   Delete
```

---

# What You Will Learn

```text
✓ Updating objects inside arrays
✓ map()
✓ Boolean values
✓ Toggling true ↔ false
✓ Passing multiple functions as props
✓ Conditional rendering
✓ Conditional Tailwind classes
```

---

# Why We Added completed Earlier

Back in Exercise 3:

```jsx
const taskObject = {
    id: Date.now(),
    text: newTask.trim(),
    completed: false
}
```

You added:

```jsx
completed: false
```

but never used it.

Now we will use it.

---

# Step 1

Understand The Data

Current task:

```js
{
    id: 123,
    text: "Learn React",
    completed: false
}
```

---

After clicking Complete:

```js
{
    id: 123,
    text: "Learn React",
    completed: true
}
```

---

Click again:

```js
{
    id: 123,
    text: "Learn React",
    completed: false
}
```

---

This is called:

```text
TOGGLING
```

---

# Step 2

Create A New Function In App.jsx

Below:

```jsx
function deleteTask(...)
```

Create:

```jsx
function toggleComplete(idTarget){

}
```

---

Purpose:

```text
Receive task id

↓

Find matching task

↓

Switch completed

false → true

or

true → false
```

---

# Step 3

Why filter() Cannot Be Used

Delete used:

```jsx
filter()
```

because we wanted:

```text
REMOVE TASK
```

---

Exercise 5 wants:

```text
KEEP TASK

but

CHANGE completed value
```

---

Therefore:

```jsx
map()
```

is required.

---

# Step 4

Think Through map()

Suppose:

```js
[
  {
    id:1,
    text:"React",
    completed:false
  },

  {
    id:2,
    text:"Tailwind",
    completed:false
  }
]
```

Click Complete on:

```text
React
```

---

map checks:

### Task 1

```text
id === idTarget

YES
```

Change:

```text
completed

false → true
```

---

### Task 2

```text
id === idTarget

NO
```

Leave unchanged.

---

Result:

```js
[
  {
    id:1,
    text:"React",
    completed:true
  },

  {
    id:2,
    text:"Tailwind",
    completed:false
  }
]
```

---

# Step 5

State Update Flow

```text
toggleComplete()

↓

map()

↓

new array

↓

setTasks()

↓

React re-renders

↓

UI updates
```

---

# Step 6

Pass Function To TaskCard

Current:

```jsx
<TaskCard
    task={task.text}
    deleteTask={...}
/>
```

---

Exercise 5 requires:

```text
task.text

task.completed

task.id
```

---

Therefore:

Pass:

```jsx
task={task}
```

instead of:

```jsx
task={task.text}
```

---

# Why?

Current:

```jsx
task={task.text}
```

TaskCard receives:

```js
"Learn React"
```

Only a string.

---

Exercise 5 needs:

```js
{
    id:123,
    text:"Learn React",
    completed:false
}
```

Full object.

---

# Step 7

TaskCard Props

Current:

```jsx
function TaskCard({
    task,
    deleteTask
})
```

---

Add:

```text
toggleComplete
```

to the props list.

---

Now TaskCard receives:

```text
task

deleteTask

toggleComplete
```

---

# Step 8

Add Complete Button

Current card:

```text
Learn React

Delete
```

Target:

```text
Learn React

Complete    Delete
```

---

Use your Button component.

Color:

```text
bg-green-500
hover:bg-green-600
```

---

# Step 9

Button Text Must Change

If:

```js
task.completed === false
```

show:

```text
Complete
```

---

If:

```js
task.completed === true
```

show:

```text
Undo
```

---

Visual:

```text
false

↓

Complete
```

---

```text
true

↓

Undo
```

---

# Step 10

Text Styling Changes

When incomplete:

```text
Learn React
```

Normal style.

---

When completed:

```text
✓ Learn React
```

with:

```text
line-through
text-gray-400
```

---

# Step 11

Conditional Tailwind

Think:

```text
completed?

YES

↓

line-through
```

---

```text
completed?

NO

↓

font-bold
```

---

# Step 12

Final Visual Goal

Before:

```text
Learn React

[Complete]
[Delete]
```

---

Click Complete

After:

```text
✓ Learn React

[Undo]
[Delete]
```

---

# Exercise 5 Checklist

Before sending code ensure:

```text
□ toggleComplete function exists

□ Uses map()

□ Uses setTasks()

□ Receives idTarget

□ Passed to TaskCard

□ TaskCard receives task object

□ Complete button exists

□ Complete button changes to Undo

□ completed toggles true/false

□ Text becomes line-through

□ Delete still works
```

---

# Exercise 5 Success Test

Create 3 tasks:

```text
Learn React

Learn Tailwind

Learn useMemo
```

Click Complete on:

```text
Learn Tailwind
```

Expected:

```text
Learn React

✓ Learn Tailwind

Learn useMemo
```

Only one task should change.

---
App.jsx
import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (!newTask.trim()) return;

    const taskObject = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };
    
    setTasks((prev) => [...prev, taskObject]);
    setNewTask("");
  }

  function deleteTask(idTarget) {
    setTasks((prev) => prev.filter((task) => task.id !== idTarget));
  }

  function toggleComplete(idTarget) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === idTarget ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <Header name="Task Dashboard" totalTasks={tasks.length} />
      
      <TaskForm 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
        onClick={addTask} 
      />

      {tasks.length === 0 ? (
        <p className="text-gray-500 mt-4">No tasks to display</p>
      ) : (
        /* Changed max-w-md to max-w-3xl to match your TaskCard styling */
        <div className="w-full max-w-3xl mt-4 space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task} /* Fixed: Passing entire object */
              deleteTask={() => deleteTask(task.id)}
              toggleComplete={() => toggleComplete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;



import Button from "./Button";

function TaskCard({ task, deleteTask, toggleComplete }) {
  return (
    <div className="px-4 py-2 shadow-md bg-white rounded-md w-full max-w-3xl flex justify-between items-center gap-4">
      <div>
        <p className={`font-bold text-xl ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
          {task.completed ? "✓ " : ""}
          {task.text}
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          buttonText={task.completed ? "Undo" : "Complete"}
          onClick={toggleComplete}
          buttonColor={task.completed ? "bg-yellow-500" : "bg-green-500"}
          buttonHoverColor={task.completed ? "hover:bg-yellow-600" : "hover:bg-green-600"}
        />
        <Button
          buttonText="Delete"
          onClick={deleteTask}
          buttonColor="bg-red-500"
          buttonHoverColor="hover:bg-red-600"
        />
      </div>
    </div>
  );
}

export default TaskCard;

