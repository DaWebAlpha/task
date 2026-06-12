I understand — you want the **"what comes next" progression** like in your original exercises. Let me rewrite all 30 drills with the **"After this drill you will see..."** format, showing exactly what the UI should look like before and after.

---

# 30 TINY REACT PRACTICE DRILLS
*Each drill = 5–15 minutes. Do them in order. Master one before moving on.*

---

## DRILL 1: Build a Greeting Card
**Time:** 5 min | **Concept:** Function component + JSX + Props

**Before:**
```
(blank page)
```

**After:**
```
Hello Alice! Welcome to React
Hello Bob! You are doing great
Hello Carol! Keep going
```

**Instruction:** Create a `Greeting` component that accepts `name` and `message` props. Render: `Hello [name]! [message]`. Test it in App with 3 different names.

**Must use:** function component, props destructuring, JSX interpolation

**Starter:** `function Greeting({ name, message }) { ... }`

---

## DRILL 2: Default Props Fallback
**Time:** 5 min | **Concept:** Default prop values

**Before:**
```
(blank or error if you remove props)
```

**After:**
```
Hello Stranger! Welcome!
```

**Instruction:** Modify Greeting from Drill 1 so `name` defaults to `'Stranger'` and `message` defaults to `'Welcome!'`. Render `<Greeting />` with NO props. Verify it still works.

**Must use:** default values in destructuring

**Starter:** `function Greeting({ name = 'Stranger', message = 'Welcome!' })`

---

## DRILL 3: Import/Export Chain
**Time:** 5 min | **Concept:** ES modules

**Before:**
```
(all code in one file)
```

**After:**
```
┌─────────────────────────┐
│       My Title          │
│     My Subtitle         │
│                         │
│  This is the body text  │
│  that lives in its own  │
│       component.        │
└─────────────────────────┘
```

**Instruction:** Create 3 files: `Title.jsx`, `Subtitle.jsx`, `Body.jsx`. Each exports a component. `App.jsx` imports all 3 and renders them. Verify the page shows all three.

**Must use:** `export default`, `import from './components/...'`

---

## DRILL 4: Tailwind Card Layout
**Time:** 5 min | **Concept:** Tailwind basics

**Before:**
```
(plain text on plain background)
```

**After:**
```
┌─────────────────────────┐
│                         │
│    This is a card       │
│    with styling         │
│                         │
└─────────────────────────┘
(white background, rounded corners, shadow, centered)
```

**Instruction:** Create a `Card` component with: white background, rounded corners, shadow, padding, max-width 400px, centered on page. Put any text inside. No props needed.

**Must use:** `bg-white`, `rounded-md`, `shadow-md`, `p-4`, `max-w-md`, `mx-auto`

---

## DRILL 5: Flexbox Stack
**Time:** 5 min | **Concept:** Tailwind flex layout

**Before:**
```
(boxes scattered or stacked weirdly)
```

**After:**
```
        🔴
        🔵
        🟢
(centered vertically with space between)
```

**Instruction:** Create a `Stack` component that renders 3 colored boxes vertically with `gap-4`. Boxes: red (`w-20 h-20`), blue (`w-20 h-20`), green (`w-20 h-20`). Center the whole stack horizontally.

**Must use:** `flex`, `flex-col`, `items-center`, `gap-4`

---

## DRILL 6: Conditional ClassName
**Time:** 5 min | **Concept:** Template literals + conditional classes

**Before:**
```
(same color for everything)
```

**After:**
```
┌─────────────────────────┐
│  ✅ Success! (green)      │
└─────────────────────────┘

┌─────────────────────────┐
│  ❌ Error! (red)        │
└─────────────────────────┘
```

**Instruction:** Create `Alert` component with `type` prop (`'success'` or `'error'`). If success: green bg, white text. If error: red bg, white text. Use template literals. Test both.

**Must use:** template literals in `className`, ternary operator

**Starter:** `` className={`${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white p-4 rounded-md`} ``

---

## DRILL 7: Parent → Child Data Flow
**Time:** 5 min | **Concept:** Props passing

**Before:**
```
(hardcoded text in child)
```

**After:**
```
┌─────────────────────────┐
│  Name: Alice            │
│  Role: Admin            │
└─────────────────────────┘
(changes when you change the user object in App)
```

**Instruction:** App has: `const user = { name: 'Alice', role: 'Admin' }`. Pass it to `ProfileCard`. `ProfileCard` displays name and role. Change the user object in App and verify child updates.

**Must use:** passing object as prop, prop destructuring

---

## DRILL 8: Reusable Button
**Time:** 5 min | **Concept:** Reusable component with multiple props

**Before:**
```
3 separate button elements
```

**After:**
```
[ Save ]  [ Delete ]  [ Cancel ]
(blue)    (red)       (green)
(click each → different console message)
```

**Instruction:** Create `Button` component accepting: `label`, `onClick`, `color` (`'blue'`, `'red'`, `'green'`). Map colors to Tailwind classes. Render 3 buttons in App with different colors that `console.log` different messages.

**Must use:** multiple props, conditional classes, `onClick` prop

---

## DRILL 9: Counter with useState
**Time:** 5 min | **Concept:** useState basics

**Before:**
```
0
(no buttons or static number)
```

**After:**
```
      5
[ -1 ]  [ +1 ]
(number changes when you click)
```

**Instruction:** Create `Counter` component. Shows a number. Two buttons: `+1` and `-1`. Number updates when clicked. Start at 0. No props needed.

**Must use:** `useState`, `setState` in `onClick`

**Starter:** `const [count, setCount] = useState(0);`

---

## DRILL 10: Text Input Mirror
**Time:** 5 min | **Concept:** Controlled input

**Before:**
```
[input field]
(nothing below it)
```

**After:**
```
[ Learn React           ]
Learn React
(updates in real-time as you type)
```

**Instruction:** Create `InputMirror`. Has an input field. Below it, display exactly what user types in real-time. Start empty. Use controlled input pattern.

**Must use:** `useState`, `value={state}`, `onChange={(e) => setState(e.target.value)}`

---

## DRILL 11: Character Counter
**Time:** 5 min | **Concept:** Derived state + validation

**Before:**
```
[textarea]
(no feedback)
```

**After:**
```
[ Learn React today because it is fun and I want to build cool stuff with hooks and components ]
Characters: 87/100

[ Clear ]
```

**After (too long):**
```
[ Learn React today because it is fun and I want to build cool stuff with hooks and components and also learn Tailwind and Next.js and TypeScript and everything else too ]
Characters: 142/100
Too long! (red text)
```

**Instruction:** Textarea + below it show `Characters: X/100`. If over 100, show `Too long!` in red. Use `trim()` to prevent empty-only submissions. Add a `Clear` button.

**Must use:** `useState`, `e.target.value.length`, `trim()`, conditional rendering

---

## DRILL 12: useRef Focus
**Time:** 5 min | **Concept:** useRef + DOM access

**Before:**
```
[           ]  [ Focus ]
(cursor not in input)
```

**After clicking Focus:**
```
[           ]  [ Focus ]
(cursor is now blinking inside input)
```

**After clicking Clear & Focus:**
```
[           ]  [ Clear & Focus ]
(text cleared, cursor blinking inside)
```

**Instruction:** Create `FocusInput`. Has an input and a `Focus` button. Clicking button focuses the input automatically. Also add a `Clear & Focus` button that clears text AND focuses.

**Must use:** `useRef`, `ref={inputRef}`, `inputRef.current.focus()`

---

## DRILL 13: Like Button Toggle
**Time:** 5 min | **Concept:** Boolean toggle in state

**Before:**
```
♡ Like
(gray heart)
```

**After click:**
```
♥ Liked
(red heart)
```

**After second click:**
```
♡ Like
(gray heart again)
```

**Instruction:** Heart button. Click once: turns red, shows `Liked`. Click again: turns gray, shows `Like`. Use a boolean state. Toggle with `!liked`. Style with Tailwind.

**Must use:** `useState(false)`, `setLiked(!liked)`, conditional text, conditional color

---

## DRILL 14: Color Theme Switcher
**Time:** 5 min | **Concept:** State-driven styling

**Before:**
```
┌─────────────────────────┐
│                         │
│    This is content      │
│    (light mode)         │
│                         │
│  [ Dark Mode ]          │
└─────────────────────────┘
(white bg, black text)
```

**After click:**
```
┌─────────────────────────┐
│                         │
│    This is content      │
│    (dark mode)         │
│                         │
│  [ Light Mode ]         │
└─────────────────────────┘
(dark bg, white text)
```

**Instruction:** Card with `Dark Mode` toggle button. Default: white bg, black text. Toggled: `gray-900` bg, white text. Use a single boolean state. Apply classes conditionally to a wrapper div.

**Must use:** `useState`, conditional `className` on wrapper, `bg-gray-900`, `text-white`, `bg-white`, `text-black`

---

## DRILL 15: Add Item to List
**Time:** 10 min | **Concept:** Array state + spread operator

**Before:**
```
[ Apple               ]  [ Add ]
(nothing below)
```

**After adding Apple, Banana, Cherry:**
```
[                     ]  [ Add ]
1. Apple
2. Banana
3. Cherry
```

**Instruction:** Input + `Add` button. Type `Apple`, click Add. Type `Banana`, click Add. Show list below: `1. Apple`, `2. Banana`. Use array state. Add with `[...prev, newItem]`.

**Must use:** `useState([])`, spread operator, immutable update

**Starter:** `setItems(prev => [...prev, newItem]);`

---

## DRILL 16: Remove Item with filter
**Time:** 10 min | **Concept:** filter() for deletion

**Before:**
```
React        [Remove]
Vue          [Remove]
Angular      [Remove]
```

**After clicking Remove on Vue:**
```
React        [Remove]
Angular      [Remove]
```

**After removing all:**
```
No items to show
```

**Instruction:** Start with: `['React', 'Vue', 'Angular']`. Each item has a `Remove` button. Clicking removes ONLY that item. Use `filter` with index or unique ID. Show `No items` when empty.

**Must use:** `filter()`, `setState`, conditional rendering

**Starter:** `setItems(prev => prev.filter((_, i) => i !== indexToRemove));`

---

## DRILL 17: Object Array: Todo List
**Time:** 10 min | **Concept:** Objects in array state

**Before:**
```
[ Learn React         ]  [ Add ]
(nothing below)
```

**After adding 3 items:**
```
[                     ]  [ Add ]
Learn React — done: false (id: 1718812345678)
Learn Tailwind — done: false (id: 1718812345689)
Learn JavaScript — done: false (id: 1718812345701)
```

**Instruction:** Input + Add button. Each item is `{ id: Date.now(), text: input, done: false }`. Render text and done status. Add 3 items. Verify IDs are unique numbers.

**Must use:** `Date.now()`, object creation, array of objects

**Starter:** `{ id: Date.now(), text: input.trim(), done: false }`

---

## DRILL 18: Toggle Object Property
**Time:** 10 min | **Concept:** map() for updating objects in arrays

**Before:**
```
Learn React        [Mark Done]
Learn Tailwind     [Mark Done]
Learn JavaScript   [Mark Done]
```

**After clicking Mark Done on Tailwind:**
```
Learn React        [Mark Done]
Learn Tailwind     [Mark Undone]  ← toggled
Learn JavaScript   [Mark Done]
```

**After clicking Mark Undone on Tailwind:**
```
Learn React        [Mark Done]
Learn Tailwind     [Mark Done]    ← toggled back
Learn JavaScript   [Mark Done]
```

**Instruction:** List of items. Each has `Mark Done` button. Clicking toggles `done` between `true`/`false` for ONLY that item. Others stay same. Use `map` with spread: `{...item, done: !item.done}`.

**Must use:** `map()`, spread operator on object, conditional update, ID matching

**Starter:** `prev.map(item => item.id === targetId ? { ...item, done: !item.done } : item)`

---

## DRILL 19: Unique ID Delete
**Time:** 10 min | **Concept:** Why IDs matter vs index

**Before:**
```
Buy milk    [Delete]  (id: 1718812345678)
Buy milk    [Delete]  (id: 1718812345890)
Buy eggs    [Delete]  (id: 1718812345901)
```

**After clicking Delete on SECOND Buy milk:**
```
Buy milk    [Delete]  ← still here! (first one)
Buy eggs    [Delete]
```

**Instruction:** Create list with 2 items having same text: `Buy milk`. Use `Date.now()` for IDs. Delete the SECOND `Buy milk` only. Verify the first remains. If you used index, both would be at risk.

**Must use:** `Date.now()`, `filter` by id, not by index

---

## DRILL 20: map() Rendering Practice
**Time:** 5 min | **Concept:** map() + key prop

**Before:**
```
(nothing)
```

**After:**
```
  🔵A    🟢B    🔵C
```

**After adding D:**
```
  🔵A    🟢B    🔵C    🟢D
```

**Instruction:** Array: `['A', 'B', 'C']`. Render as colored circles. Each circle gets a unique key (use index for now, but understand why real IDs are better). Add a 4th item and watch React handle it.

**Must use:** `array.map()`, `key` prop

---

## DRILL 21: Empty State Message
**Time:** 5 min | **Concept:** Conditional rendering (ternary)

**Before (with items):**
```
Apple
Banana
```

**After (delete all):**
```
📝 Nothing here yet
```

**After (add one back):**
```
Apple
```

**Instruction:** List component. If array empty: show `Nothing here yet 📝` with gray text. If has items: show the list. Use ternary operator. Test by adding then removing all items.

**Must use:** ternary operator, conditional rendering

**Starter:** `{items.length === 0 ? <p>Nothing here</p> : items.map(...)}`

---

## DRILL 22: Dynamic List Styling
**Time:** 5 min | **Concept:** Conditional Tailwind per item

**After:**
```
  1     2     3     4     5
 🔵    🟢    🔵    🟢    🔵
(even = blue, odd = green)
```

**Instruction:** List of numbers `[1,2,3,4,5]`. Even numbers: blue bg. Odd numbers: green bg. Use `map` + index to determine style. Each item is a rounded pill shape.

**Must use:** `map()`, conditional `className`, `index % 2`

---

## DRILL 23: Pass Function Down
**Time:** 10 min | **Concept:** Passing functions as props

**Before:**
```
React        (no delete button)
Vue
Angular
```

**After:**
```
React        [Delete]
Vue          [Delete]
Angular      [Delete]
```

**After clicking Delete on Vue:**
```
React        [Delete]
Angular      [Delete]
```

**Instruction:** App has `handleDelete(id)`. Pass it to `ListItem`. `ListItem` renders text + `Delete` button. Button `onClick` calls parent's function with the item's id. Delete 2 items to verify.

**Must use:** function as prop, arrow function closure, parent-child communication

**Starter:** `<ListItem onDelete={() => handleDelete(item.id)} />`

---

## DRILL 24: Multi-Button Card
**Time:** 10 min | **Concept:** Multiple function props

**After:**
```
┌─────────────────────────┐
│  Task: Learn React      │
│                         │
│  [Edit] [Delete] [Archive] │
└─────────────────────────┘
(click Edit → console: "editing 123")
(click Delete → console: "deleting 123")
(click Archive → console: "archiving 123")
```

**Instruction:** `Card` component with 3 buttons: `Edit` (console.log), `Delete` (console.log), `Archive` (console.log). All 3 functions come from App as props. Card receives them and wires to buttons.

**Must use:** multiple function props, `onClick` handlers

---

## DRILL 25: Lifting State Up Pattern
**Time:** 10 min | **Concept:** State ownership

**Before:**
```
CounterDisplay: 0          (stuck at 0)
[ + ]  [ - ]               (buttons don't work, no state)
```

**After:**
```
CounterDisplay: 5
[ + ]  [ - ]
(clicking + or - updates the display)
```

**Instruction:** Two sibling components: `CounterDisplay` (shows count) and `CounterControls` (+ and - buttons). BOTH need the same count. Put `useState` in PARENT (App). Pass `count` to display, `setCount` to controls.

**Must use:** state in parent, props to children, sibling communication via parent

---

## DRILL 26: Mini Task Card (Single File)
**Time:** 10 min | **Concept:** Combine: component + props + conditional + event

**Before:**
```
Learn React
(no buttons, no styling)
```

**After:**
```
┌─────────────────────────┐
│  Learn React            │
│              [Complete] [Delete] │
└─────────────────────────┘
```

**After clicking Complete:**
```
┌─────────────────────────┐
│  ✓ Learn React          │  (line-through, gray)
│              [Undo]   [Delete] │
└─────────────────────────┘
```

**After clicking Undo:**
```
┌─────────────────────────┐
│  Learn React            │  (back to normal)
│              [Complete] [Delete] │
└─────────────────────────┘
```

**Instruction:** One file: `TaskItem` component. Props: `text`, `completed`, `onToggle`, `onDelete`. If completed: line-through text, gray color, `Undo` button. If not: bold text, `Complete` button. Always show `Delete`. Style with Tailwind.

**Must use:** conditional text, conditional classes, two event handlers, visual feedback

---

## DRILL 27: Add + List + Delete (No Components)
**Time:** 10 min | **Concept:** Full CRUD in one component

**Before:**
```
[                     ]  [ Add ]
No tasks yet
```

**After adding 3 and deleting 1:**
```
[                     ]  [ Add ]
Learn React        [Delete]
Learn Tailwind     [Delete]
```

**Instruction:** Single `App.jsx`. Input + Add button. Below: list of items with Delete buttons. All in one file. Use array state, `Date.now()` IDs, `filter` for delete. No separate components. Master the logic first.

**Must use:** `useState` array, `Date.now()`, `filter()`, `map()`, `key` prop

---

## DRILL 28: Add + Toggle + Delete (With Components)
**Time:** 15 min | **Concept:** Full pattern from exercises 3–5

**Before:**
```
(all logic crammed in one file)
```

**After:**
```
┌─────────────────────────┐
│  Task Dashboard         │
│  Tasks: 3               │
├─────────────────────────┤
│  [ Enter task...    ]   │
│  [ Add Task ]           │
├─────────────────────────┤
│  ✓ Learn React     [Undo] [Delete] │
│  Learn Tailwind    [Complete] [Delete] │
│  Learn JS          [Complete] [Delete] │
└─────────────────────────┘
```

**Instruction:** Refactor Drill 27 into components: `Form` (input + add), `List` (map), `Item` (text + toggle + delete). App owns all state. Pass everything down. Add 3 items. Toggle one. Delete one. Verify all work.

**Must use:** component decomposition, lifting state up, function props, `map()`, `filter()`, object spread

---

## DRILL 29: Validation + Feedback
**Time:** 10 min | **Concept:** trim() + empty state + visual feedback

**Before:**
```
[          ]  [ Submit ]
(no feedback)
```

**After (empty submit):**
```
[          ]  [ Submit ]
Please enter something! (red)
```

**After (valid submit):**
```
[          ]  [ Submit ]
Added! (green, disappears after 2 seconds)

1. Learn React
```

**Instruction:** Form with input + submit. If empty/whitespace: show `Please enter something` in red, don't add. If valid: add item, show `Added!` in green for 2 seconds (use `setTimeout` + state). Clear input after add.

**Must use:** `trim()` validation, error state, success state, `setTimeout`

**Starter:** `if (!input.trim()) { setError('Please enter something'); return; }`

---

## DRILL 30: Final Boss: Full Mini Dashboard
**Time:** 15 min | **Concept:** Everything combined

**Final Result:**
```
┌─────────────────────────┐
│  Task Dashboard         │
│  Tasks: 3 | Done: 1     │
├─────────────────────────┤
│  Add New Task           │
│  [ Enter task...    ]   │
│  [ Add Task ]           │
├─────────────────────────┤
│  ✓ Learn React          │
│  [Undo] [Delete]        │
├─────────────────────────┤
│  Learn Tailwind         │
│  [Complete] [Delete]    │
├─────────────────────────┤
│  Learn JavaScript       │
│  [Complete] [Delete]    │
└─────────────────────────┘
```

**Empty State:**
```
┌─────────────────────────┐
│  Task Dashboard         │
│  Tasks: 0               │
├─────────────────────────┤
│  Add New Task           │
│  [ Enter task...    ]   │
│  [ Add Task ]           │
├─────────────────────────┤
│  📝 No tasks yet        │
└─────────────────────────┘
```

**Instruction:** Build: `Header` (title + count), `Form` (input + add), `List` (items with toggle + delete). Show `No tasks` when empty. Count updates. Completed items get line-through. Use ALL patterns from exercises 1–5. One file or split—your choice.

**Must use:** ALL patterns from exercises 1–5

---

## How to Use This

1. **Do them in order.** Each drill builds on the previous.
2. **Time yourself.** If a drill takes longer than 15 minutes, stop and re-read the exercise files.
3. **Don't skip.** Drills 1–14 are "muscle memory." Drills 15–25 are "the hard parts." Drills 26–30 are "integration."
4. **After Drill 30, you own the material.** Go back to your original exercises and you'll fly through them.
