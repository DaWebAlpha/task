This `App.jsx` is basically a **Button Component Showcase / Testing Playground**. In a real application, each section demonstrates a different use case of a reusable button component.

# 1. Button Variants

```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>
<Button variant="light">Light</Button>
<Button variant="dark">Dark</Button>
<Button variant="link">Link</Button>
```

## Real World Use Cases

| Variant   | Use Case                             |
| --------- | ------------------------------------ |
| Primary   | Main action (Save, Submit, Login)    |
| Secondary | Less important action (Cancel, Back) |
| Danger    | Delete account, Remove item          |
| Success   | Confirm payment, Approve             |
| Warning   | Unsaved changes, Reset settings      |
| Info      | Learn more, View details             |
| Light     | Neutral actions                      |
| Dark      | Admin actions                        |
| Link      | Navigation                           |

Example:

```jsx
<Button variant="primary">
  Login
</Button>

<Button variant="danger">
  Delete User
</Button>
```

---

# 2. Button Sizes

```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Real World Use Cases

### Small

Used inside tables

```jsx
<Button size="sm">
  Edit
</Button>
```

### Medium

Default size

```jsx
<Button size="md">
  Save
</Button>
```

### Large

Landing page CTA

```jsx
<Button size="lg">
  Get Started
</Button>
```

---

# 3. Disabled State

```jsx
<Button disabled>
  Disabled
</Button>
```

## Real World Use Cases

Prevent actions until requirements are met.

### Registration Form

```jsx
<Button disabled={!isFormValid}>
  Register
</Button>
```

### Terms Agreement

```jsx
<Button disabled={!acceptedTerms}>
  Continue
</Button>
```

---

# 4. Loading State

```jsx
<Button isLoading>
  Login
</Button>
```

## Real World Use Cases

Prevent double submissions.

### Login

```jsx
<Button isLoading={loading}>
  Login
</Button>
```

### Payment

```jsx
<Button isLoading={processing}>
  Processing Payment...
</Button>
```

### API Request

```jsx
<Button isLoading={saving}>
  Saving
</Button>
```

---

# 5. Link Button

```jsx
<Button
  as="a"
  href="https://example.com"
  target="_blank"
>
  Visit Example
</Button>
```

## Real World Use Cases

### External Website

```jsx
<Button
  as="a"
  href="https://google.com"
  target="_blank"
>
  Open Google
</Button>
```

### Documentation

```jsx
<Button
  as="a"
  href="/docs"
>
  View Docs
</Button>
```

### Download File

```jsx
<Button
  as="a"
  href="/files/report.pdf"
>
  Download PDF
</Button>
```

---

# 6. Ref Forwarding

```jsx
const buttonRef = useRef(null);
```

```jsx
<Button ref={buttonRef}>
  Ref Button
</Button>
```

## Real World Use Cases

A parent component can directly access the DOM button.

---

### Focus Button

```jsx
buttonRef.current.focus();
```

Used in:

* Forms
* Validation
* Accessibility

Example:

```jsx
if (hasError) {
  buttonRef.current.focus();
}
```

---

### Animation

```jsx
buttonRef.current.style.transform = "scale(1.5)";
```

Used for:

* Notifications
* Highlighting actions
* User guidance

Example:

```jsx
showTutorial && highlightSubmitButton();
```

---

### Scroll To Action

```jsx
buttonRef.current.scrollIntoView();
```

Example:

```jsx
buttonRef.current.scrollIntoView({
  behavior: "smooth"
});
```

---

# 7. Accessibility

Ref forwarding helps accessibility.

Example:

```jsx
buttonRef.current.focus();
```

Used when:

* Form validation fails
* Modal opens
* Keyboard navigation

```jsx
useEffect(() => {
  buttonRef.current.focus();
}, []);
```

---

# 8. Enterprise Use Cases

This exact button system is commonly used in:

### Authentication

```jsx
<Button variant="primary">
  Login
</Button>

<Button variant="secondary">
  Register
</Button>
```

### E-Commerce

```jsx
<Button variant="success">
  Add To Cart
</Button>

<Button variant="danger">
  Remove Item
</Button>
```

### Admin Dashboard

```jsx
<Button variant="primary">
  Create User
</Button>

<Button variant="warning">
  Suspend User
</Button>

<Button variant="danger">
  Delete User
</Button>
```

### Project Management

```jsx
<Button variant="success">
  Complete Task
</Button>

<Button variant="info">
  View Details
</Button>
```

### Banking Application

```jsx
<Button variant="primary">
  Transfer Funds
</Button>

<Button variant="danger">
  Close Account
</Button>
```

# What This Demo Is Teaching

This single page demonstrates nearly all important enterprise button features:

1. Variants (different styles)
2. Sizes
3. Disabled state
4. Loading state
5. Render as link
6. Ref forwarding
7. Focus management
8. DOM manipulation
9. Accessibility
10. Reusability

This is exactly the kind of component library foundation you would build before creating larger systems such as dashboards, CRMs, banking apps, e-commerce platforms, SaaS products, and admin panels.
