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
✓ Conditional Rendering
✓ First Real React Data Flow
```

---

# BIG PICTURE

Up until now:

```text
User Types

↓

State Changes

↓

Text Appears
```

Now we are upgrading to:

```text
User Types

↓

Click Add Task

↓

Task Object Created

↓

Stored In Array

↓

Array Re-renders

↓

Task Cards Appear
```

---

# STEP 1 — CREATE TASKS STATE

Previously:

```jsx
const [newTask, setNewTask] = useState("");
```

stored only the textbox value.

Now we need another state.

---

## CODE TO WRITE

```jsx
const [tasks, setTasks] = useState([]);
```

---

# WHY?

Think:

```text
tasks
```

will eventually contain:

```js
[
    {
        id: 123,
        text: "Learn React",
        completed: false
    },

    {
        id: 456,
        text: "Learn Tailwind",
        completed: false
    }
]
```

---

# WHY [] ?

```jsx
useState([])
```

means:

```text
Start with an empty array.
```

Initially:

```js
tasks = []
```

No tasks exist yet.

---

# STEP 2 — CREATE addTask()

Inside App create:

```jsx
function addTask(){

}
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

# STEP 3 — VALIDATE INPUT

## CODE TO WRITE

```jsx
if(!newTask.trim()){
    return;
}
```

---

# WHAT IS HAPPENING?

Suppose user enters:

```text
"       "
```

Looks like text.

Actually:

```jsx
newTask.trim()
```

becomes:

```text
""
```

Empty string.

---

## ! Operator

```jsx
!newTask.trim()
```

means:

```text
If nothing exists
```

---

## return

```jsx
return;
```

immediately exits the function.

---

# VISUAL

```text
User clicks Add

↓

Input = ""

↓

STOP

↓

No task created
```

---

# WHY THIS IS IMPORTANT

Without validation:

```text
Task 1 = ""

Task 2 = ""

Task 3 = ""
```

Your application becomes garbage.

---

# STEP 4 — CREATE TASK OBJECT

## CODE TO WRITE

```jsx
const taskObject = {

    id: Date.now(),

    text: newTask.trim(),

    completed: false

};
```

---

# UNDERSTANDING EVERY PROPERTY

---

## id

```jsx
id: Date.now()
```

Example:

```js
1719158812000
```

Next click:

```js
1719158815000
```

Next click:

```js
1719158820000
```

Different every time.

Perfect unique IDs.

---

# WHY WE NEED id

Later:

```text
Delete Task

Edit Task

Complete Task
```

need to know:

```text
WHICH TASK?
```

id solves that problem.

---

## text

```jsx
text: newTask.trim()
```

Stores:

```text
Learn React
```

---

## completed

```jsx
completed: false
```

Every new task starts unfinished.

Later:

```text
✓ Complete

✓ Undo
```

will use this property.

---

# STEP 5 — ADD TASK INTO ARRAY

## CODE TO WRITE

```jsx
setTasks(prev => [...prev, taskObject]);
```

---

# UNDERSTANDING THIS LINE

This is one of the most important React lines you'll ever learn.

---

## prev

```jsx
prev
```

means:

```text
Current tasks array
```

Example:

```js
[
    { text: "React" }
]
```

---

## Spread Operator

```jsx
...prev
```

copies everything.

Example:

```js
[
    { text: "React" }
]
```

becomes:

```js
[
    { text: "React" }
]
```

copy.

---

## Add New Object

```jsx
[...prev, taskObject]
```

becomes:

```js
[
    { text: "React" },

    { text: "Tailwind" }
]
```

---

# WHY NOT PUSH?

Bad:

```jsx
tasks.push(taskObject);
```

Mutates state.

React dislikes mutation.

---

Good:

```jsx
[...prev, taskObject]
```

Creates new array.

React loves immutable updates.

---

# STEP 6 — CLEAR INPUT

## CODE TO WRITE

```jsx
setNewTask("");
```

---

# WHY?

After submission:

```text
Learn React
```

should disappear.

---

Visual:

```text
Before

[ Learn React ]

After

[             ]
```

---

# COMPLETE addTask()

## FINAL CODE

```jsx
function addTask(){

    if(!newTask.trim()){
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
```

---

# STEP 7 — CONNECT BUTTON

Previously:

```jsx
onClick={() => console.log("Clicked")}
```

---

Replace with:

```jsx
onClick={addTask}
```

---

# WHY?

Now clicking the button runs:

```text
addTask()
```

instead of:

```text
console.log()
```

---

# STEP 8 — CREATE TaskCard.jsx

## FILE

```text
components/TaskCard.jsx
```

---

## CODE TO WRITE

```jsx
function TaskCard({ task }){

    return (

        <div
            className="
                px-4
                py-2
                shadow-md
                bg-white
                rounded-md
                w-full
                max-w-3xl
                flex
                flex-col
                my-2
            "
        >

            <div>

                <p
                    className="
                        font-bold
                        text-xl
                    "
                >
                    {task}
                </p>

            </div>

        </div>

    )

}

export default TaskCard;
```

---

# WHY A SEPARATE COMPONENT?

Bad:

```jsx
App.jsx

500 lines long
```

Good:

```text
App
│
├── Header
├── TaskForm
└── TaskCard
```

Each component has one job.

---

# STEP 9 — DISPLAY TASKS

Below TaskForm:

## CODE TO WRITE

```jsx
{
    tasks.length === 0

    ?

    <p>No tasks to display</p>

    :

    tasks.map((task) => (

        <TaskCard
            key={task.id}
            task={task.text}
        />

    ))
}
```

---

# UNDERSTANDING THE CONDITIONAL

## Before Any Tasks Exist

```js
tasks = []
```

Length:

```js
0
```

Screen:

```text
No tasks to display
```

---

## After First Task

```js
tasks = [
    {
        text: "Learn React"
    }
]
```

Length:

```js
1
```

Now React renders:

```jsx
<TaskCard />
```

---

# WHAT IS map()?

Suppose:

```js
[
    "React",
    "Tailwind",
    "JavaScript"
]
```

---

map loops:

```jsx
tasks.map(...)
```

Result:

```jsx
<TaskCard />
<TaskCard />
<TaskCard />
```

Automatically.

---

# WHY key={task.id} ?

React must track:

```text
Card 1

Card 2

Card 3
```

Uniquely.

Without key:

```text
React Warning:
Each child should have a unique key prop
```

---

# FINAL App.jsx

## CODE TO WRITE

```jsx
import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

function App(){

    const [tasks, setTasks] = useState([]);

    const [newTask, setNewTask] = useState("");

    function addTask(){

        if(!newTask.trim()){
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

            {
                tasks.length === 0

                ?

                <p>No tasks to display</p>

                :

                tasks.map((task) => (

                    <TaskCard
                        key={task.id}
                        task={task.text}
                    />

                ))
            }

        </div>

    )

}

export default App;
```

---

# SUCCESS CHECKLIST

Before moving on:

```text
✓ tasks state exists

✓ addTask exists

✓ validation exists

✓ trim() exists

✓ task object exists

✓ Date.now() exists

✓ completed:false exists

✓ setTasks used

✓ setNewTask("") used

✓ button calls addTask

✓ TaskCard component created

✓ tasks.map() used

✓ key={task.id}

✓ task cards visible
```

---

# PROJECT STATUS

```text
✓ Header
✓ Button
✓ TaskForm
✓ useState
✓ useRef
✓ Task Object
✓ Date.now()
✓ Task Array
✓ map()
✓ TaskCard
✓ Add Task System

NEXT EXERCISE

✓ Delete Task
✓ filter()
✓ Passing Functions As Props
✓ Arrow Functions
✓ Immutable Removal
```
