This is a much better format for learning. Instead of giving hints and then answers later, each exercise should show the **exact code you are expected to write**, then explain every line, then give exercises that build the next part of the project.

---

# EXERCISE 1 — BUILD THE HEADER COMPONENT

## FINAL PROJECT WE ARE BUILDING

By Exercise 50 you will have:

```text
Task Dashboard

✓ Header
✓ Add Task
✓ Task List
✓ Task Card
✓ Delete Task
✓ Edit Task
✓ Save Task
✓ Cancel Edit
✓ Search Tasks
✓ Statistics
✓ Completed Tasks
✓ Remaining Tasks
✓ Priority
✓ Due Date
✓ useMemo
✓ useRef
✓ useEffect
✓ localStorage
✓ Tailwind
```

---

# GOAL

Create the application shell.

At the end you should see:

```text
+------------------------+
| Task Dashboard         |
| Tasks: 0              |
+------------------------+
```

---

# WHAT YOU ARE LEARNING

```text
✓ Components
✓ Props
✓ JSX
✓ Import / Export
✓ Tailwind Basics
```

---

# PROJECT STRUCTURE

```text
src
|
├── components
│     └── Header.jsx
│
└── App.jsx
```

---

# STEP 1 — CREATE Header.jsx

## CODE TO WRITE

### components/Header.jsx

```jsx
function Header({name = "Tasks Dashboard", totalTasks = 0}){

    return (

        <div
            className="
                flex
                flex-col
                shadow-md
                p-4
                bg-white
                justify-center
                items-center
                gap-2
                w-full
                max-w-3xl
                rounded-md
            "
        >

            <h1
                className="
                    font-bold
                    capitalize
                    text-2xl
                "
            >
                {name}
            </h1>

            <p
                className="
                    font-semibold
                "
            >
                Tasks: {totalTasks}
            </p>

        </div>

    )

}

export default Header;
```

---

# UNDERSTANDING EVERY LINE

## Function Declaration

```jsx
function Header()
```

Creates a React component.

Think:

```text
Header = reusable piece of UI
```

---

## Props

```jsx
function Header({name, totalTasks})
```

Allows App to send data into Header.

Example:

```jsx
<Header
    name="Task Dashboard"
    totalTasks={0}
/>
```

---

## Default Values

```jsx
function Header({
    name = "Tasks Dashboard",
    totalTasks = 0
})
```

If App forgets to pass props:

```jsx
<Header />
```

You still get:

```text
Tasks Dashboard
Tasks: 0
```

instead of:

```text
undefined
undefined
```

---

## Return

```jsx
return (
```

Everything inside gets rendered on screen.

---

## Main Container

```jsx
<div>
```

Acts as the card.

---

## Tailwind Classes

### flex

```jsx
flex
```

Turns on Flexbox.

Without it:

```text
normal block layout
```

---

### flex-col

```jsx
flex-col
```

Stacks children vertically.

Result:

```text
Task Dashboard

Tasks: 0
```

Without it:

```text
Task Dashboard Tasks: 0
```

---

### shadow-md

```jsx
shadow-md
```

Adds shadow.

Without it:

```text
flat card
```

---

### p-4

```jsx
p-4
```

Adds padding.

Without it:

```text
text touches edges
```

---

### bg-white

```jsx
bg-white
```

Makes card white.

---

### items-center

```jsx
items-center
```

Centers content horizontally.

Without it:

```text
everything starts left
```

---

### gap-2

```jsx
gap-2
```

Space between title and count.

---

### max-w-3xl

```jsx
max-w-3xl
```

Stops card becoming too wide.

---

### rounded-md

```jsx
rounded-md
```

Rounds corners.

---

## Title

```jsx
<h1>{name}</h1>
```

Displays:

```text
Task Dashboard
```

---

## Count

```jsx
<p>Tasks: {totalTasks}</p>
```

Displays:

```text
Tasks: 0
```

---

# STEP 2 — CREATE App.jsx

## CODE TO WRITE

### App.jsx

```jsx
import Header from "./components/Header";

function App(){

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
                totalTasks={0}
            />

        </div>

    )

}

export default App;
```

---

# UNDERSTANDING EVERY LINE

## Import

```jsx
import Header from "./components/Header";
```

Makes Header available inside App.

Think:

```text
App
  ↓
imports
  ↓
Header
```

---

## App Component

```jsx
function App()
```

Root component.

Everything starts here.

---

## Wrapper Div

```jsx
<div>
```

Acts as the page container.

---

### min-h-screen

```jsx
min-h-screen
```

Makes page fill entire browser height.

---

### bg-gray-100

```jsx
bg-gray-100
```

Light gray page background.

---

### p-4

```jsx
p-4
```

Padding around edges.

---

### flex flex-col

```jsx
flex
flex-col
```

Allows stacking components vertically.

Later:

```text
Header
SearchBar
TaskForm
TaskList
Statistics
```

will all stack nicely.

---

### items-center

```jsx
items-center
```

Centers everything horizontally.

---

## Render Header

```jsx
<Header
    name="Task Dashboard"
    totalTasks={0}
/>
```

Sends data to Header.

---

# RESULT

Screen should show:

```text
┌─────────────────────────┐
│     Task Dashboard      │
│        Tasks: 0         │
└─────────────────────────┘
```

---

# EXERCISE CHALLENGE

Modify Header so that App renders:

```jsx
<Header
    name="Personal Productivity Dashboard"
    totalTasks={15}
/>
```

Expected result:

```text
Personal Productivity Dashboard

Tasks: 15
```

---

# WHY THIS EXERCISE EXISTS

This teaches the foundation of the entire project:

```text
App
   ↓ props
Header

App
   ↓ props
TaskForm

App
   ↓ props
TaskCard

App
   ↓ props
Statistics
```

Every other component you build from Exercise 2 onward follows this same pattern.
