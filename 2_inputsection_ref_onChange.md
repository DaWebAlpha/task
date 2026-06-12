# EXERCISE 2

## GOAL

Build the input section of the dashboard.

At the end you should see:

```text
+--------------------------+
| Task Dashboard           |
| Tasks: 0                 |
+--------------------------+

+--------------------------+
| Add New Task             |
|                          |
| [ Enter Task Here ]      |
|                          |
| [ Add Task ]             |
+--------------------------+
```

Nothing should be added yet.

No task list yet.

No map() yet.

No useEffect yet.

No task creation yet.

We WILL introduce `useRef` now because it will be used later to automatically focus the input field.

---

# WHAT YOU ARE LEARNING

Today you learn:

```text
✓ useState
✓ useRef
✓ Controlled Inputs
✓ onChange
✓ Props
✓ Event Handling
✓ Tailwind Forms
```

---

# CURRENT PROJECT STRUCTURE

```text
src
│
├── components
│   ├── Header.jsx
│   ├── Button.jsx
│   └── TaskForm.jsx
│
└── App.jsx
```

---

# WHAT IS useRef?

Imagine this input:

```html
<input />
```

Normally React manages data.

But sometimes we need direct access to the actual HTML element.

Example:

```text
Focus input
Clear selection
Scroll into view
Measure width
```

For that we use:

```jsx
const inputRef = useRef();
```

Think:

```text
inputRef

↓

points to

↓

<input />
```

Diagram:

```text
inputRef

    │

    ▼

<input />
```

---

# WHAT WILL useRef DO TODAY?

Nothing fancy yet.

We are simply preparing the project structure.

Later:

```jsx
inputRef.current.focus();
```

will automatically place the cursor inside the textbox.

---

# STEP 1 — CREATE Button.jsx

## CODE TO WRITE

### components/Button.jsx

```jsx
function Button({
    buttonText,
    onClick,
    buttonColor,
    buttonHoverColor
}){

    return(

        <button
            onClick={onClick}
            className={`
                ${buttonColor}
                ${buttonHoverColor}
                px-4
                py-2
                rounded-md
                text-white
            `}
        >
            {buttonText}
        </button>

    )

}

export default Button;
```

---

# UNDERSTANDING THE CODE

## buttonText

```jsx
buttonText="Add Task"
```

becomes:

```text
Add Task
```

on the screen.

---

## onClick

```jsx
onClick={onClick}
```

allows App to decide what happens when button is clicked.

---

## buttonColor

```jsx
bg-blue-500
```

controls button color.

---

## buttonHoverColor

```jsx
hover:bg-blue-600
```

changes color when mouse moves over button.

---

# STEP 2 — CREATE TaskForm.jsx

## CODE TO WRITE

### components/TaskForm.jsx

```jsx
import Button from "./Button"

function TaskForm({value, onChange, onClick, inputRef}){
    return (
        // Cleaned up duplicate rounded utility class
        <div className="mt-4 shadow-md  p-4 w-full max-w-3xl rounded-xl border border-gray-200">
            <p className="font-bold text-xl mb-3">Add New Task</p>
            <input 
                type="text"
                placeholder="Enter task ..."
                value={value}
                onChange={onChange}
                ref={inputRef}
                className="
                    border
                    border-gray-100
                    rounded-md
                    w-full
                    max-w-2xl
                    px-4
                    py-2
                    focus:ring-2
                    mb-3
                "
            />
            <Button 
                buttonText="Add Task"
                onClick={onClick}
                buttonColor="bg-blue-500"
                buttonHoverColor="hover:bg-blue-600"
            />
        </div>
    )
}

export default TaskForm;

```

---

# UNDERSTANDING EVERY NEW LINE

## value={value}

```jsx
value={value}
```

makes this a Controlled Input.

React owns the value.

Not the browser.

---

## onChange={onChange}

```jsx
onChange={onChange}
```

fires every time user types.

---

## ref={inputRef}

```jsx
ref={inputRef}
```

connects the input element to useRef.

Think:

```text
inputRef

↓

this input
```

---

# STEP 3 — UPDATE App.jsx

## CODE TO WRITE

### App.jsx

```jsx
import Button from "./Button"

function TaskForm({value, onChange, onClick, inputRef}){
    return (
        // Cleaned up duplicate rounded utility class
        <div className="mt-4 shadow-md  p-4 w-full max-w-3xl rounded-xl border border-gray-200">
            <p className="font-bold text-xl mb-3">Add New Task</p>
            <input 
                type="text"
                placeholder="Enter task ..."
                value={value}
                onChange={onChange}
                ref={inputRef}
                className="
                    border
                    border-gray-100
                    rounded-md
                    w-full
                    max-w-2xl
                    px-4
                    py-2
                    focus:ring-2
                    mb-3
                "
            />
            <Button 
                buttonText="Add Task"
                onClick={onClick}
                buttonColor="bg-blue-500"
                buttonHoverColor="hover:bg-blue-600"
            />
        </div>
    )
}

export default TaskForm;

```

---

# UNDERSTANDING THE NEW CODE

## useState

```jsx
const [newTask, setNewTask] = useState("");
```

Stores textbox contents.

Initially:

```text
""
```

---

## useRef

```jsx
const inputRef = useRef();
```

Creates a reference object.

Current value:

```jsx
inputRef.current
```

Later it becomes:

```jsx
<input />
```

---

## Passing the Ref

```jsx
inputRef={inputRef}
```

App sends the ref to TaskForm.

---

## Connecting Ref

```jsx
ref={inputRef}
```

TaskForm connects the ref to the input.

Now:

```jsx
inputRef.current
```

points to the actual textbox.

---

## Controlled Input Flow

```text
User types

↓

onChange

↓

setNewTask()

↓

state updates

↓

input re-renders

↓

screen updates
```

---

# TEST

Type:

```text
Learn React
```

Expected:

```text
Learn React
```

appears immediately below the form.

---

# SUCCESS CHECKLIST

Before moving on:

```text
✓ Header appears
✓ TaskForm appears
✓ Button appears
✓ Input appears
✓ useState exists
✓ useRef exists
✓ inputRef passed to TaskForm
✓ ref attached to input
✓ Typing updates state
✓ Typed text appears below form
✓ Tailwind styles applied
```

---

# PROJECT STATUS

```text
✓ Header
✓ Button Component
✓ TaskForm
✓ useState
✓ useRef
✓ Controlled Input

Next Exercise:

✓ addTask()
✓ Validation
✓ Date.now()
✓ Task Objects
✓ First TaskCard
```
