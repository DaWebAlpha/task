# EXERCISE 4 — DELETE TASK (WITH FULL CODE)

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

# GOAL

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

# WHAT YOU ARE LEARNING

```text
✓ filter()
✓ State Removal
✓ Passing Functions as Props
✓ Event Handling
✓ Parent → Child Communication
✓ Child → Parent Communication
```

---

# STEP 1

Create a new function inside App.

Name:

```text
deleteTask
```

---

# RESPONSIBILITY

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

# UNDERSTANDING filter()

Imagine:

```js
tasks = [
  { id: 1, text: "React" },
  { id: 2, text: "Tailwind" },
  { id: 3, text: "JavaScript" }
]
```

You click delete on:

```text
Tailwind
```

which has:

```js
id = 2
```

filter checks every task:

```text
Task 1 → Keep

Task 2 → Remove

Task 3 → Keep
```

Result:

```js
[
  { id: 1, text: "React" },
  { id: 3, text: "JavaScript" }
]
```

---

# VISUAL

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

# WHY FILTER WORKS

This line:

```js
task.id !== idTarget
```

means:

```text
Keep every task

EXCEPT

the one whose id matches idTarget
```

---

# FULL APP.JSX

```jsx
import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (!newTask.trim()) {
      return;
    }

    const taskObject = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false
    };

    setTasks(prev => [...prev, taskObject]);

    setNewTask("");
  }

  function deleteTask(idTarget) {
    const result = tasks.filter(
      task => task.id !== idTarget
    );

    setTasks(result);
  }

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        p-4
        flex
        flex-col
        items-center
      "
    >
      <Header
        name="Task Dashboard"
        totalTasks={tasks.length}
      />

      <TaskForm
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onClick={addTask}
      />

      {tasks.length === 0 ? (
        <p>No tasks to display</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={() => deleteTask(task.id)}
          />
        ))
      )}
    </div>
  );
}

export default App;
```

---

# IMPORTANT CHANGE

Before:

```jsx
<TaskCard
  key={task.id}
  task={task.text}
/>
```

After:

```jsx
<TaskCard
  key={task.id}
  task={task}
  deleteTask={() => deleteTask(task.id)}
/>
```

---

# WHY?

Before TaskCard only knew:

```js
"Learn React"
```

Now TaskCard knows:

```js
{
  id: 171234567,
  text: "Learn React",
  completed: false
}
```

Much more useful.

---

# FULL TASKCARD.JSX

```jsx
import Button from "./Button";

function TaskCard({ task, deleteTask }) {
  return (
    <div
      className="
        bg-white
        shadow-md
        rounded-md
        p-4
        my-2
        w-full
        max-w-3xl
        flex
        justify-between
        items-center
      "
    >
      <p className="font-bold text-xl">
        {task.text}
      </p>

      <Button
        buttonText="Delete"
        onClick={deleteTask}
        buttonColor="bg-red-500"
        buttonHoverColor="hover:bg-red-600"
      />
    </div>
  );
}

export default TaskCard;
```

---

# DATA FLOW DIAGRAM

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

filter()

↓

setTasks()

↓

State Changes

↓

React Re-renders

↓

Card Disappears
```

---

# WHY DELETE HAPPENS IN APP

Wrong:

```text
TaskCard deletes itself
```

Reason:

```text
TaskCard does NOT own tasks state
```

---

Correct:

```text
App owns tasks state

↓

App modifies tasks state

↓

TaskCard requests deletion
```

---

# THOUGHT QUESTION ANSWER

Suppose:

```js
[
  {id:1,text:"React"},
  {id:2,text:"React"}
]
```

Delete using:

```js
text === "React"
```

Result:

```text
Both tasks may be deleted
```

because they have the same text.

---

Delete using:

```js
id === 2
```

Result:

```text
Only task 2 is deleted
```

because ids are unique.

That is exactly why we created:

```js
id: Date.now()
```

back in Exercise 3.

---

# SUCCESS CHECKLIST

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

# PROJECT STATUS

```text
✓ Header
✓ TaskForm
✓ Add Task
✓ Date.now()
✓ TaskCard
✓ map()
✓ Delete Task

NEXT:

Exercise 5 → Complete / Undo Task
```

This is where the `completed: false` property you created in Exercise 3 finally starts being used.
