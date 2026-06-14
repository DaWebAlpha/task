
# PART 2: useId (Accessibility)

## What is useId?

**useId** = Generates a unique, stable ID that works with server-side rendering.

**Why it matters:**
- Every form input needs a `label` with `htmlFor` matching the input's `id`
- Without unique IDs, labels get confused between multiple forms
- `Math.random()` doesn't work with SSR (server/client mismatch)
- `useId` is guaranteed unique and consistent

---

## File: `src/components/TaskForm.jsx` (Updated with useId)

```jsx
import { useState, useRef, useId } from "react";
// ... other imports

function TaskForm() {
  // useId generates unique IDs: :r0:, :r1:, etc.
  const titleId = useId();      // e.g., ":r0:"
  const descId = useId();       // e.g., ":r1:"
  const priorityId = useId();   // e.g., ":r2:"
  const dueDateId = useId();    // e.g., ":r3:"

  // ... rest of component

  return (
    <form onSubmit={handleSubmit} ...>
      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor={titleId} className="...">  {/* ← Links to input */}
          Title *
        </label>
        <input
          ref={titleInputRef}
          id={titleId}  // ← Matches label htmlFor
          name="title"
          // ...
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor={descId} className="...">
          Description
        </label>
        <textarea
          id={descId}
          name="description"
          // ...
        />
      </div>

      {/* Priority */}
      <div>
        <label htmlFor={priorityId} className="...">
          Priority
        </label>
        <select id={priorityId} name="priority" ...>
          {/* ... */}
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor={dueDateId} className="...">
          Due Date
        </label>
        <input id={dueDateId} type="date" ... />
      </div>
    </form>
  );
}
```

**Accessibility benefits:**
- Screen readers announce the label when focusing the input
- Clicking the label focuses the input (better UX)
- No ID collisions even with multiple forms on the page

---
