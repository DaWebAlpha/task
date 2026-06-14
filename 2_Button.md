## Step 15: Test the Button Component

Open:

```text
src/App.jsx
```

Replace the code with:

```jsx
import Button from "./components/Button";

function App() {
  return (
    <div className="p-8 space-y-4">

      {/* 1. Test all variants */}
      <h2 className="font-bold">Variants</h2>

      <div className="flex gap-2 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
        <Button variant="light">Light</Button>
        <Button variant="dark">Dark</Button>
        <Button variant="link">Link</Button>
      </div>

      {/* 2. Test all sizes */}
      <h2 className="font-bold">Sizes</h2>

      <div className="flex gap-2 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* 3. Test disabled state */}
      <h2 className="font-bold">Disabled</h2>

      <div className="flex gap-2">
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Disabled Secondary
        </Button>
      </div>

      {/* 4. Test loading state */}
      <h2 className="font-bold">Loading</h2>

      <div className="flex gap-2">
        <Button isLoading>Loading</Button>
        <Button variant="danger" isLoading>
          Deleting
        </Button>
      </div>

      {/* 5. Test as prop */}
      <h2 className="font-bold">As Link</h2>

      <Button
        as="a"
        href="https://example.com"
        variant="link"
      >
        Go to Example
      </Button>

      {/* 6. Test className override */}
      <h2 className="font-bold">Custom Class</h2>

      <Button className="w-full">
        Full Width Button
      </Button>

      {/* 7. Test ref forwarding */}
      <h2 className="font-bold">Ref Test</h2>

      <RefTest />

    </div>
  );
}

function RefTest() {
  const buttonRef = { current: null };

  return (
    <>
      <Button ref={buttonRef}>
        Ref Button
      </Button>

      <button
        className="ml-2 px-3 py-1 bg-gray-200 rounded"
        onClick={() => {
          if (buttonRef.current) {
            buttonRef.current.focus();
            alert("Ref works! Button focused.");
          } else {
            alert("Ref is NOT working");
          }
        }}
      >
        Test Ref
      </button>
    </>
  );
}

export default App;
```

### Explanation

This App component is being used as a **testing playground** for the Button component.

Instead of building the Task Manager immediately, we first verify that the Button works correctly in different situations.

---

### Variant Testing

```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
```

Tests the different button styles.

Expected result:

```text
Primary
Secondary
Danger
Success
Warning
Info
Light
Dark
Link
```

Each should display its own color scheme.

---

### Size Testing

```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

Tests the button sizing system.

Expected result:

```text
Small   Medium   Large
```

Each button should have different padding and font sizes.

---

### Disabled State Testing

```jsx
<Button disabled>
  Disabled
</Button>
```

Tests whether the button can be disabled.

Expected result:

```text
Button visible
Cannot be clicked
Reduced opacity
```

---

### Loading State Testing

```jsx
<Button isLoading>
  Loading
</Button>
```

Tests loading behavior.

Expected result:

```text
Loading Spinner
or
Loading Text
```

depending on Button implementation.

---

### Link Testing

```jsx
<Button
  as="a"
  href="https://example.com"
>
  Go to Example
</Button>
```

Tests polymorphic rendering.

Expected result:

```html
<a href="https://example.com">
  Go to Example
</a>
```

instead of:

```html
<button>
  Go to Example
</button>
```

---

### className Override Testing

```jsx
<Button className="w-full">
```

Tests whether parent components can extend styling.

Expected result:

```text
Button stretches across container width
```

---

### Ref Testing

```jsx
<Button ref={buttonRef}>
```

Tests React ref forwarding.

Purpose:

```text
Parent Component
      |
      V
Access Button DOM Element
```

---

### RefTest Component

```jsx
function RefTest()
```

A helper component used only for testing refs.

---

### buttonRef

```jsx
const buttonRef = { current: null };
```

Stores a reference to the button element.

After rendering:

```text
buttonRef
    |
    V
Actual Button Element
```

---

### Test Button

```jsx
buttonRef.current.focus();
```

When clicked:

1. Accesses the button element.
2. Calls focus().
3. Moves keyboard focus to the button.

Expected result:

```text
Ref works! Button focused.
```

If ref forwarding is not implemented:

```text
Ref is NOT working
```

appears instead.

---

### Tailwind Classes Used

```css
p-8
```

Adds padding.

```css
space-y-4
```

Adds spacing between sections.

```css
flex
```

Creates flex layout.

```css
gap-2
```

Adds spacing between buttons.

```css
flex-wrap
```

Allows buttons to move onto the next line.

```css
font-bold
```

Bold section headings.

```css
items-center
```

Vertically aligns items.

---

### Purpose

This file serves as a complete Button component test suite.

Before using Button in the Task Manager, we verify:

* Variants work
* Sizes work
* Disabled state works
* Loading state works
* Link rendering works
* Custom styling works
* Ref forwarding works

This is a common professional practice before integrating reusable UI components into larger applications.
