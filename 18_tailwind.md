# Comprehensive Tailwind CSS Component Documentation Guide

---

## Table of Contents

1. [Typography & Content Hierarchy](#1-typography--content-hierarchy)
   - [Display Title (Hero Heading)](#display-title-hero-heading)
   - [Section Header](#section-header)
   - [Subheading](#subheading)
   - [Body Text (Paragraph)](#body-text-paragraph)
   - [Blockquote](#blockquote)
2. [Form Elements](#2-form-elements)
   - [Text Input (Default State)](#text-input-default-state)
   - [Text Input (Error State)](#text-input-error-state)
   - [Text Input (Success State)](#text-input-success-state)
   - [Text Input (Disabled State)](#text-input-disabled-state)
   - [Textarea](#textarea)
   - [Select Dropdown](#select-dropdown)
   - [Checkbox](#checkbox)
   - [Radio Button](#radio-button)
   - [Toggle Switch](#toggle-switch)
   - [Input Group with Icon](#input-group-with-icon)
3. [Buttons & Interactive Elements](#3-buttons--interactive-elements)
   - [Primary Button](#primary-button)
   - [Secondary Button](#secondary-button)
   - [Tertiary / Ghost Button](#tertiary--ghost-button)
   - [Icon-Only Button](#icon-only-button)
   - [Button with Icon and Text](#button-with-icon-and-text)
   - [Loading / Spinner Button](#loading--spinner-button)
   - [Button Group](#button-group)
4. [Layout & Containers](#4-layout--containers)
   - [Main Page Wrapper](#main-page-wrapper)
   - [Content Card](#content-card)
   - [Responsive Grid (2 Columns)](#responsive-grid-2-columns)
   - [Responsive Grid (3 Columns)](#responsive-grid-3-columns)
   - [Responsive Grid (4 Columns)](#responsive-grid-4-columns)
   - [Flexbox Alignment Wrapper (Center)](#flexbox-alignment-wrapper-center)
   - [Flexbox Alignment Wrapper (Space Between)](#flexbox-alignment-wrapper-space-between)
   - [Divider (Horizontal)](#divider-horizontal)
   - [Divider with Text](#divider-with-text)
5. [Navigation Components](#5-navigation-components)
   - [Responsive Navbar](#responsive-navbar)
   - [Sidebar Navigation](#sidebar-navigation)
   - [Breadcrumbs](#breadcrumbs)
   - [Pagination](#pagination)
   - [Tabs](#tabs)
6. [Feedback & Overlays](#6-feedback--overlays)
   - [Alert Banner (Info)](#alert-banner-info)
   - [Alert Banner (Success)](#alert-banner-success)
   - [Alert Banner (Warning)](#alert-banner-warning)
   - [Alert Banner (Error)](#alert-banner-error)
   - [Modal / Dialog](#modal--dialog)
   - [Tooltip](#tooltip)
   - [Badge / Tag](#badge--tag)
7. [Structural Headers & Footers](#7-structural-headers--footers)
   - [Main Application Header](#main-application-header)
   - [Multi-Column Site Footer](#multi-column-site-footer)

---

## 1. Typography & Content Hierarchy

---

### Display Title (Hero Heading)

**Visual Appearance:**
A massive, bold heading that dominates the viewport—typically 48px to 96px depending on breakpoints. Uses a very dark slate color (near-black) with tight letter spacing for impact. On mobile, it scales down gracefully while maintaining visual weight. The text feels authoritative and immediately draws the eye to the center or top of the page.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|     Build Faster with                                    |
|     Tailwind                                             |
|                                                          |
|     [Subtext below...]                                   |
+----------------------------------------------------------+
```

**HTML:**
```html
<h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
  Build Faster with Tailwind
</h1>
```

**React JSX:**
```jsx
export const DisplayTitle = ({ children }) => (
  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
    {children}
  </h1>
);
```

**Class Explanations:**
* `text-4xl`: Sets base font size to 2.25rem (36px) on mobile.
* `md:text-5xl`: At medium breakpoint (768px), increases to 3rem (48px).
* `lg:text-6xl`: At large breakpoint (1024px), increases to 3.75rem (60px).
* `xl:text-7xl`: At extra-large breakpoint (1280px), increases to 4.5rem (72px).
* `font-extrabold`: Sets font weight to 800, creating maximum visual impact.
* `tracking-tight`: Reduces letter spacing to -0.025em, making large text feel cohesive.
* `text-slate-900`: Applies the darkest slate color (#0f172a) for maximum contrast.
* `leading-tight`: Sets line height to 1.25, preventing excessive vertical spacing in large headings.

---

### Section Header

**Visual Appearance:**
A medium-large heading (24-36px) with semibold weight, slightly muted color compared to the display title, and moderate letter spacing. It creates clear visual separation between content sections without overpowering the display title above it. Often paired with a subtle top margin to create breathing room.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|     Previous Section Content...                          |
|                                                          |
|     ────────────────────────────────────────               |
|                                                          |
|     Component Architecture                               |
|                                                          |
|     This section describes the architecture...             |
+----------------------------------------------------------+
```

**HTML:**
```html
<h2 class="text-2xl md:text-3xl font-semibold text-slate-800 tracking-normal leading-snug mt-12 mb-4">
  Component Architecture
</h2>
```

**React JSX:**
```jsx
export const SectionHeader = ({ children, className = "" }) => (
  <h2 className={`text-2xl md:text-3xl font-semibold text-slate-800 tracking-normal leading-snug mt-12 mb-4 ${className}`}>
    {children}
  </h2>
);
```

**Class Explanations:**
* `text-2xl`: Base size 1.5rem (24px).
* `md:text-3xl`: At medium breakpoint, 1.875rem (30px).
* `font-semibold`: Weight 600—prominent but not as heavy as the display title.
* `text-slate-800`: Slightly lighter than 900 (#1e293b), creating hierarchy.
* `tracking-normal`: Default letter spacing (0), readable at this size.
* `leading-snug`: Line height 1.375, comfortable for medium headings.
* `mt-12`: Margin top 3rem (48px), creates section separation.
* `mb-4`: Margin bottom 1rem (16px), tight coupling with following content.

---

### Subheading

**Visual Appearance:**
A smaller, uppercase heading with wide letter spacing, typically in a muted slate or brand color. It acts as a label or category indicator above a section header. The uppercase treatment and spacing make it feel like a metadata tag rather than primary content.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|     G E T T I N G   S T A R T E D                        |
|     Component Architecture                               |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<h3 class="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">
  Getting Started
</h3>
```

**React JSX:**
```jsx
export const Subheading = ({ children }) => (
  <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-600 mb-2">
    {children}
  </h3>
);
```

**Class Explanations:**
* `text-sm`: Small font size 0.875rem (14px).
* `font-bold`: Weight 700, compensates for small size.
* `uppercase`: Transforms text to uppercase letters.
* `tracking-widest`: Widest letter spacing (0.1em), creates airy, label-like appearance.
* `text-indigo-600`: Brand accent color (#4f46e5), draws subtle attention.
* `mb-2`: Margin bottom 0.5rem (8px), tight spacing before main heading.

---

### Body Text (Paragraph)

**Visual Appearance:**
Standard readable paragraph text in a comfortable size (16-18px) with slate-600 color for reduced eye strain compared to pure black. Line height is generous (1.75) for readability. On larger screens, the text size subtly increases for better proportional balance with wider containers.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  Tailwind CSS is a utility-first CSS framework packed     |
|  with classes like flex, pt-4, text-center and rotate-90  |
|  that can be composed to build any design, directly in    |
|  your markup.                                             |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<p class="text-base md:text-lg text-slate-600 leading-relaxed max-w-prose">
  Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.
</p>
```

**React JSX:**
```jsx
export const BodyText = ({ children }) => (
  <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-prose">
    {children}
  </p>
);
```

**Class Explanations:**
* `text-base`: Default font size 1rem (16px).
* `md:text-lg`: At medium breakpoint, 1.125rem (18px).
* `text-slate-600`: Medium-dark slate (#475569), softer than pure black for long reading.
* `leading-relaxed`: Line height 1.625, generous spacing for readability.
* `max-w-prose`: Maximum width 65ch (character units), optimal reading line length.

---

### Blockquote

**Visual Appearance:**
A distinguished quote block with a prominent left border (4px, brand color), light background tint, and italicized text. The left border creates a visual "pull" effect, drawing the eye. Padding creates a comfortable reading area within the tinted container. The citation below is smaller and in a muted color.

**ASCII Layout:**
```
+----------------------------------------------------------+
|  |                                                       |
|  |  "The best way to predict the future is to invent it." |
|  |                                                       |
|  |                                          — Alan Kay   |
|  |                                                       |
+----------------------------------------------------------+
```

**HTML:**
```html
<blockquote class="border-l-4 border-indigo-500 bg-indigo-50 pl-6 pr-4 py-4 my-8 rounded-r-lg">
  <p class="text-lg italic text-slate-700 leading-relaxed">
    "The best way to predict the future is to invent it."
  </p>
  <footer class="mt-2 text-sm font-medium text-slate-500">
    — Alan Kay
  </footer>
</blockquote>
```

**React JSX:**
```jsx
export const Blockquote = ({ quote, author }) => (
  <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 pl-6 pr-4 py-4 my-8 rounded-r-lg">
    <p className="text-lg italic text-slate-700 leading-relaxed">
      "{quote}"
    </p>
    <footer className="mt-2 text-sm font-medium text-slate-500">
      — {author}
    </footer>
  </blockquote>
);
```

**Class Explanations:**
* `border-l-4`: Left border width 4px.
* `border-indigo-500`: Left border color #6366f1, brand accent.
* `bg-indigo-50`: Very light indigo background (#eef2ff), subtle tint.
* `pl-6`: Padding left 1.5rem (24px), space between border and text.
* `pr-4`: Padding right 1rem (16px).
* `py-4`: Padding top/bottom 1rem (16px).
* `my-8`: Margin top/bottom 2rem (32px), vertical separation.
* `rounded-r-lg`: Rounded right corners only (0.5rem), softens the right edge.
* `text-lg`: Quote text slightly larger than body.
* `italic`: Italic font style for quotation convention.
* `text-slate-700`: Darker than body text for emphasis within the quote.
* `mt-2`: Small margin above citation.
* `text-sm`: Citation smaller than quote.
* `font-medium`: Weight 500 for citation.
* `text-slate-500`: Muted color (#64748b) for attribution.

---

## 2. Form Elements

---

### Text Input (Default State)

**Visual Appearance:**
A clean, rectangular input field with a light gray border (1px), rounded corners (medium radius), and comfortable internal padding. On focus, the border transitions to a brand color (indigo) with a subtle ring glow effect. The background is white, creating clear separation from the page. Placeholder text is light gray.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  Email Address                                           |
|  +----------------------------------------------------+  |
|  | you@example.com                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="space-y-2">
  <label for="email" class="block text-sm font-medium text-slate-700">
    Email Address
  </label>
  <input 
    type="email" 
    id="email" 
    placeholder="you@example.com"
    class="block w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
  />
</div>
```

**React JSX:**
```jsx
export const TextInput = ({ label, id, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <input 
      type={type}
      id={id}
      placeholder={placeholder}
      className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
    />
  </div>
);
```

**Class Explanations:**
* `space-y-2`: Vertical space between label and input (0.5rem).
* `block`: Label displays as block element.
* `text-sm`: Label font size 0.875rem (14px).
* `font-medium`: Label weight 500.
* `text-slate-700`: Label color #334155.
* `block`: Input as block element.
* `w-full`: Input spans full width of container.
* `rounded-lg`: Border radius 0.5rem (8px), friendly corners.
* `border`: Base border 1px.
* `border-slate-300`: Default border color #cbd5e1, light gray.
* `bg-white`: White background #ffffff.
* `px-4`: Horizontal padding 1rem (16px).
* `py-2.5`: Vertical padding 0.625rem (10px), comfortable touch target.
* `text-slate-900`: Input text color #0f172a, near-black.
* `placeholder-slate-400`: Placeholder color #94a3b8, clearly distinct.
* `shadow-sm`: Very subtle shadow (0 1px 2px 0 rgb(0 0 0 / 0.05)).
* `transition-colors`: Smooth color transition on state changes.
* `focus:border-indigo-500`: On focus, border becomes #6366f1.
* `focus:outline-none`: Removes default browser focus outline.
* `focus:ring-2`: On focus, adds 2px ring.
* `focus:ring-indigo-500/20`: Ring color with 20% opacity, subtle glow.

---

### Text Input (Error State)

**Visual Appearance:**
Identical structure to default input but with a red border and background tint. A red error message appears below. On focus, the ring glow is red instead of brand color. The left border may be slightly thicker to emphasize the error state.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  Email Address                                           |
|  +----------------------------------------------------+  |
|  | invalid-email                                      |  |
|  +----------------------------------------------------+  |
|  ⚠ Please enter a valid email address.                   |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="space-y-2">
  <label for="email-error" class="block text-sm font-medium text-slate-700">
    Email Address
  </label>
  <input 
    type="email" 
    id="email-error" 
    value="invalid-email"
    class="block w-full rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-red-900 placeholder-red-300 shadow-sm transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
  />
  <p class="text-sm text-red-600 flex items-center gap-1.5">
    <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    Please enter a valid email address.
  </p>
</div>
```

**React JSX:**
```jsx
export const TextInputError = ({ label, id, value, errorMessage }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <input 
      type="email"
      id={id}
      defaultValue={value}
      className="block w-full rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-red-900 placeholder-red-300 shadow-sm transition-colors focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
    />
    <p className="text-sm text-red-600 flex items-center gap-1.5">
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {errorMessage}
    </p>
  </div>
);
```

**Class Explanations:**
* `border-red-300`: Error border color #fca5a5, light red.
* `bg-red-50`: Error background #fef2f2, very light red tint.
* `text-red-900`: Input text color #7f1d1d, dark red.
* `placeholder-red-300`: Placeholder #fca5a5.
* `focus:border-red-500`: Focus border #ef4444.
* `focus:ring-red-500/20`: Red focus ring with 20% opacity.
* `text-sm`: Error message size.
* `text-red-600`: Error text #dc2626.
* `flex`: Enables flex layout for icon + text alignment.
* `items-center`: Vertically centers icon with text.
* `gap-1.5`: Gap between icon and text 0.375rem.
* `h-4 w-4`: Icon dimensions 16px.
* `shrink-0`: Prevents icon from shrinking.

---

### Text Input (Success State)

**Visual Appearance:**
Green border and subtle green background tint. A green checkmark icon appears inside the input (right-aligned) or below. Focus ring is green. The visual feedback immediately communicates valid input.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  Email Address                                           |
|  +----------------------------------------------------+  |
|  | user@example.com                              ✓    |  |
|  +----------------------------------------------------+  |
|  Looks good!                                             |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="space-y-2">
  <label for="email-success" class="block text-sm font-medium text-slate-700">
    Email Address
  </label>
  <div class="relative">
    <input 
      type="email" 
      id="email-success" 
      value="user@example.com"
      class="block w-full rounded-lg border border-green-300 bg-green-50 px-4 py-2.5 pr-10 text-green-900 placeholder-green-300 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
    />
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <svg class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
  <p class="text-sm text-green-600">Looks good!</p>
</div>
```

**React JSX:**
```jsx
export const TextInputSuccess = ({ label, id, value, successMessage }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <div className="relative">
      <input 
        type="email"
        id={id}
        defaultValue={value}
        className="block w-full rounded-lg border border-green-300 bg-green-50 px-4 py-2.5 pr-10 text-green-900 placeholder-green-300 shadow-sm transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
    <p className="text-sm text-green-600">{successMessage}</p>
  </div>
);
```

**Class Explanations:**
* `relative`: Positions parent for absolute child (checkmark).
* `border-green-300`: Success border #86efac.
* `bg-green-50`: Success background #f0fdf4.
* `pr-10`: Extra right padding 2.5rem, makes room for checkmark icon.
* `text-green-900`: Success text color #14532d.
* `focus:border-green-500`: Focus border #22c55e.
* `focus:ring-green-500/20`: Green focus ring.
* `pointer-events-none`: Allows clicks to pass through to input.
* `absolute`: Positions checkmark container.
* `inset-y-0`: Stretches container full height.
* `right-0`: Aligns to right edge.
* `flex items-center`: Centers icon vertically.
* `pr-3`: Right padding for icon 0.75rem.
* `h-5 w-5`: Icon size 20px.
* `text-green-500`: Icon color #22c55e.
* `text-green-600`: Success message #16a34a.

---

### Text Input (Disabled State)

**Visual Appearance:**
Grayed-out appearance with lighter background, muted text, and no focus interactions. Cursor changes to "not-allowed". The input appears "locked" and non-interactive.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  Email Address                                           |
|  +----------------------------------------------------+  |
|  | user@example.com                                   |  |
|  +----------------------------------------------------+  |
|  [Grayed out, non-interactive]                           |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="space-y-2">
  <label for="email-disabled" class="block text-sm font-medium text-slate-500">
    Email Address
  </label>
  <input 
    type="email" 
    id="email-disabled" 
    value="user@example.com"
    disabled
    class="block w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-slate-500 shadow-none cursor-not-allowed"
  />
</div>
```

**React JSX:**
```jsx
export const TextInputDisabled = ({ label, id, value }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-slate-500">
      {label}
    </label>
    <input 
      type="email"
      id={id}
      defaultValue={value}
      disabled
      className="block w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-2.5 text-slate-500 shadow-none cursor-not-allowed"
    />
  </div>
);
```

**Class Explanations:**
* `text-slate-500`: Muted label color.
* `border-slate-200`: Very light border #e2e8f0.
* `bg-slate-100`: Light gray background #f1f5f9, indicates disabled.
* `text-slate-500`: Muted text #64748b.
* `shadow-none`: Removes shadow, flattens appearance.
* `cursor-not-allowed`: Shows forbidden cursor on hover.

---

### Textarea

**Visual Appearance:**
A multi-line input resembling the text input but taller with vertical resize capability. Same border, focus, and state treatments as text inputs. Minimum height ensures it is clearly a multi-line field.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  Message                                                 |
|  +----------------------------------------------------+  |
|  | Type your message here...                            |  |
|  |                                                    |  |
|  |                                                    |  |
|  |                                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="space-y-2">
  <label for="message" class="block text-sm font-medium text-slate-700">
    Message
  </label>
  <textarea 
    id="message" 
    rows="4"
    placeholder="Type your message here..."
    class="block w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-y"
  ></textarea>
</div>
```

**React JSX:**
```jsx
export const Textarea = ({ label, id, placeholder, rows = 4 }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <textarea 
      id={id}
      rows={rows}
      placeholder={placeholder}
      className="block w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-y"
    />
  </div>
);
```

**Class Explanations:**
* `rows="4"`: Default visible height of 4 text lines.
* `resize-y`: Allows vertical resizing only, prevents horizontal layout breaking.
* All other classes identical to text input for consistency.

---

### Select Dropdown

**Visual Appearance:**
A dropdown input with a custom chevron icon on the right. The native select arrow is hidden and replaced with a custom SVG for cross-browser consistency. Same border and focus treatments as text inputs.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  Country                                                 |
|  +----------------------------------------------------+  |
|  | Select a country                            ▼      |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="space-y-2">
  <label for="country" class="block text-sm font-medium text-slate-700">
    Country
  </label>
  <div class="relative">
    <select 
      id="country"
      class="block w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
    >
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>
```

**React JSX:**
```jsx
export const SelectDropdown = ({ label, id, options, placeholder }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <div className="relative">
      <select 
        id={id}
        className="block w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-slate-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);
```

**Class Explanations:**
* `relative`: Container for absolute positioned chevron.
* `appearance-none`: Removes native browser select styling.
* `pr-10`: Extra right padding 2.5rem for chevron space.
* `pointer-events-none`: Click-through to select element.
* `absolute inset-y-0 right-0`: Positions chevron container.
* `px-3`: Horizontal padding for chevron icon.
* `text-slate-500`: Chevron color.

---

### Checkbox

**Visual Appearance:**
A custom-styled square checkbox with rounded corners. When checked, it fills with brand color and shows a white checkmark. The label sits to the right with comfortable spacing. Focus state shows a ring around the checkbox.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  [☑] I agree to the Terms and Privacy Policy             |
|      You must agree before submitting.                    |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="flex items-start gap-3">
  <div class="flex h-5 items-center">
    <input 
      id="terms" 
      type="checkbox"
      class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0"
    />
  </div>
  <div class="text-sm leading-6">
    <label for="terms" class="font-medium text-slate-900">
      I agree to the Terms and Privacy Policy
    </label>
    <p class="text-slate-500">You must agree before submitting.</p>
  </div>
</div>
```

**React JSX:**
```jsx
export const Checkbox = ({ id, label, helperText }) => (
  <div className="flex items-start gap-3">
    <div className="flex h-5 items-center">
      <input 
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0"
      />
    </div>
    <div className="text-sm leading-6">
      <label htmlFor={id} className="font-medium text-slate-900">
        {label}
      </label>
      {helperText && <p className="text-slate-500">{helperText}</p>}
    </div>
  </div>
);
```

**Class Explanations:**
* `flex items-start`: Aligns checkbox to top of multi-line label.
* `gap-3`: Space between checkbox and label 0.75rem.
* `flex h-5 items-center`: Centers checkbox vertically in its container.
* `h-4 w-4`: Checkbox size 16px.
* `rounded`: Slight rounding 0.25rem, modern feel.
* `border-slate-300`: Default border color.
* `text-indigo-600`: Checked state fill color #4f46e5.
* `focus:ring-indigo-500/20`: Focus ring with opacity.
* `focus:ring-offset-0`: No gap between checkbox and ring.
* `text-sm`: Label size.
* `leading-6`: Line height 1.5rem, aligns with checkbox height.
* `font-medium`: Label weight.
* `text-slate-900`: Label color.
* `text-slate-500`: Helper text color.

---

### Radio Button

**Visual Appearance:**
A circular radio button with a filled dot when selected. Same color scheme and focus behavior as checkboxes but perfectly round. Grouped radios share the same name attribute.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  (•) Basic Plan                              $9/month     |
|  ( ) Pro Plan                               $29/month     |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="space-y-3">
  <label class="flex items-center gap-3">
    <input 
      type="radio" 
      name="plan" 
      value="basic"
      class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0"
    />
    <span class="text-sm font-medium text-slate-900">Basic Plan</span>
    <span class="text-sm text-slate-500">$9/month</span>
  </label>
  <label class="flex items-center gap-3">
    <input 
      type="radio" 
      name="plan" 
      value="pro"
      checked
      class="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0"
    />
    <span class="text-sm font-medium text-slate-900">Pro Plan</span>
    <span class="text-sm text-slate-500">$29/month</span>
  </label>
</div>
```

**React JSX:**
```jsx
export const RadioGroup = ({ name, options, selectedValue, onChange }) => (
  <div className="space-y-3">
    {options.map(option => (
      <label key={option.value} className="flex items-center gap-3 cursor-pointer">
        <input 
          type="radio"
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={() => onChange(option.value)}
          className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0"
        />
        <span className="text-sm font-medium text-slate-900">{option.label}</span>
        <span className="text-sm text-slate-500">{option.price}</span>
      </label>
    ))}
  </div>
);
```

**Class Explanations:**
* `space-y-3`: Vertical gap between options 0.75rem.
* `flex items-center`: Horizontal alignment of radio + text.
* `gap-3`: Consistent spacing.
* `h-4 w-4`: Radio size 16px.
* `border-slate-300`: Default border.
* `text-indigo-600`: Selected fill color.
* `focus:ring-indigo-500/20`: Focus ring.
* `focus:ring-offset-0`: Tight focus ring.

---

### Toggle Switch

**Visual Appearance:**
A pill-shaped sliding switch. In the off state, the track is gray with the knob on the left. In the on state, the track fills with brand color and the knob slides to the right with a subtle shadow. The transition is smooth and satisfying.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  [Off]  O------                                          |
|  [On]   ------O    Enable notifications                  |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<label class="flex items-center gap-3 cursor-pointer">
  <div class="relative inline-flex h-6 w-11 items-center">
    <input type="checkbox" class="peer sr-only" />
    <span class="peer h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500/20"></span>
    <span class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"></span>
  </div>
  <span class="text-sm font-medium text-slate-900">Enable notifications</span>
</label>
```

**React JSX:**
```jsx
export const ToggleSwitch = ({ id, label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <div className="relative inline-flex h-6 w-11 items-center">
      <input 
        type="checkbox" 
        id={id}
        checked={checked}
        onChange={onChange}
        className="peer sr-only" 
      />
      <span className="peer h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500/20"></span>
      <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"></span>
    </div>
    <span className="text-sm font-medium text-slate-900">{label}</span>
  </label>
);
```

**Class Explanations:**
* `flex items-center gap-3`: Layout for switch + label.
* `cursor-pointer`: Indicates interactivity on entire label.
* `relative`: Container for absolute knob positioning.
* `inline-flex`: Inline-level flex container.
* `h-6 w-11`: Track dimensions 24px × 44px, 2:1 ratio.
* `peer`: Establishes peer relationship for sibling styling.
* `sr-only`: Visually hides the native checkbox but keeps it accessible.
* `peer` (on track): Target for peer-checked states.
* `h-6 w-11`: Track size.
* `rounded-full`: Fully rounded, pill shape.
* `bg-slate-200`: Off state track color #e2e8f0.
* `transition-colors`: Smooth color transition.
* `peer-checked:bg-indigo-600`: On state track color #4f46e5.
* `peer-focus:ring-2`: Focus ring via peer.
* `peer-focus:ring-indigo-500/20`: Focus ring color.
* `absolute`: Knob positioning.
* `left-0.5 top-0.5`: Slight inset from track edge.
* `h-5 w-5`: Knob size 20px.
* `rounded-full`: Circular knob.
* `bg-white`: Knob color.
* `shadow-sm`: Knob shadow for depth.
* `transition-transform`: Smooth sliding animation.
* `peer-checked:translate-x-5`: Slides knob 1.25rem (20px) to right.

---

### Input Group with Icon

**Visual Appearance:**
An input with an icon embedded inside the left border area. The icon is gray and sits within the input's padding area. The input text starts after the icon, creating a cohesive "search bar" or "login field" aesthetic.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  Search                                                  |
|  +----------------------------------------------------+  |
|  | 🔍  Search...                                    |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="space-y-2">
  <label for="search" class="block text-sm font-medium text-slate-700">
    Search
  </label>
  <div class="relative">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input 
      type="text" 
      id="search" 
      placeholder="Search..."
      class="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
    />
  </div>
</div>
```

**React JSX:**
```jsx
export const InputWithIcon = ({ label, id, placeholder, icon, type = "text" }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon || (
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>
      <input 
        type={type}
        id={id}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
    </div>
  </div>
);
```

**Class Explanations:**
* `relative`: Container for absolute icon.
* `pointer-events-none`: Click-through to input.
* `absolute inset-y-0 left-0`: Positions icon container left, full height.
* `flex items-center`: Centers icon vertically.
* `pl-3`: Left padding 0.75rem, positions icon.
* `h-5 w-5`: Icon size 20px.
* `text-slate-400`: Icon color #94a3b8.
* `pl-10`: Input left padding 2.5rem, makes room for icon.
* `pr-4`: Right padding 1rem.

</div>
```

**React JSX:**
```jsx
export const AlertSuccess = ({ title, message }) => (
  <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
    <div className="flex items-start gap-3">
      <svg className="h-5 w-5 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <h3 className="text-sm font-medium text-green-800">{title}</h3>
        <p className="mt-1 text-sm text-green-700">{message}</p>
      </div>
    </div>
  </div>
);
```

**Class Explanations:**
* `border-green-500`: Green accent #22c55e.
* `bg-green-50`: Light green #f0fdf4.
* `text-green-400`: Icon.
* `text-green-800`: Heading #166534.
* `text-green-700`: Body #15803d.

---

### Alert Banner (Warning)

**Visual Appearance:**
Yellow/amber banner with warning triangle. Cautionary messages.

**ASCII Layout:**
```
+----------------------------------------------------------+
|  |                                                       |
|  |  ⚠ Warning                                            |
|  |  Please review your settings before continuing.         |
|  |                                                       |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
  <div class="flex items-start gap-3">
    <svg class="h-5 w-5 shrink-0 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
      <h3 class="text-sm font-medium text-yellow-800">Warning</h3>
      <p class="mt-1 text-sm text-yellow-700">Please review your settings before continuing.</p>
    </div>
  </div>
</div>
```

**React JSX:**
```jsx
export const AlertWarning = ({ title, message }) => (
  <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
    <div className="flex items-start gap-3">
      <svg className="h-5 w-5 shrink-0 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
        <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
        <p className="mt-1 text-sm text-yellow-700">{message}</p>
      </div>
    </div>
  </div>
);
```

**Class Explanations:**
* `border-yellow-500`: Yellow accent #eab308.
* `bg-yellow-50`: Light yellow #fefce8.
* `text-yellow-400`: Icon.
* `text-yellow-800`: Heading #854d0e.
* `text-yellow-700`: Body #a16207.

---

### Alert Banner (Error)

**Visual Appearance:**
Red banner with X-circle icon. Critical failure or error messages.

**ASCII Layout:**
```
+----------------------------------------------------------+
|  |                                                       |
|  |  ✕ Error                                              |
|  |  There was a problem processing your request.         |
|  |                                                       |
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
  <div class="flex items-start gap-3">
    <svg class="h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
      <h3 class="text-sm font-medium text-red-800">Error</h3>
      <p class="mt-1 text-sm text-red-700">There was a problem processing your request.</p>
    </div>
  </div>
</div>
```

**React JSX:**
```jsx
export const AlertError = ({ title, message }) => (
  <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
    <div className="flex items-start gap-3">
      <svg className="h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <h3 className="text-sm font-medium text-red-800">{title}</h3>
        <p className="mt-1 text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);
```

**Class Explanations:**
* `border-red-500`: Red accent #ef4444.
* `bg-red-50`: Light red #fef2f2.
* `text-red-400`: Icon.
* `text-red-800`: Heading #991b1b.
* `text-red-700`: Body #b91c1c.

---

### Modal / Dialog

**Visual Appearance:**
A centered overlay dialog with a semi-transparent dark backdrop. The modal has white background, rounded corners, shadow, and a close button in the top-right. The backdrop prevents interaction with the page behind it.

**ASCII Layout:**
```
+----------------------------------------------------------+
|████████████████████████████████████████████████████████|
|██                                                    ███|
|██  +----------------------------------------------+  ███|
|██  |  ⚠ Deactivate account                    [×] |  ███|
|██  |                                              |  ███|
|██  |  Are you sure you want to deactivate your    |  ███|
|██  |  account? All of your data will be permanently|  ███|
|██  |  removed.                                    |  ███|
|██  |                                              |  ███|
|██  |  [Cancel]        [Deactivate]                |  ███|
|██  +----------------------------------------------+  ███|
|██                                                    ███|
|████████████████████████████████████████████████████████|
+----------------------------------------------------------+
```

**HTML:**
```html
<div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <!-- Backdrop -->
  <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    <div class="fixed inset-0 bg-slate-900/50 transition-opacity" aria-hidden="true"></div>

    <!-- Modal panel -->
    <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
      <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 class="text-base font-semibold leading-6 text-slate-900" id="modal-title">Deactivate account</h3>
            <div class="mt-2">
              <p class="text-sm text-slate-500">Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button type="button" class="inline-flex w-full justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto">Cancel</button>
      </div>
    </div>
  </div>
</div>
```

**React JSX:**
```jsx
export const Modal = ({ isOpen, onClose, title, message, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-slate-900/50 transition-opacity" aria-hidden="true" onClick={onClose} />
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-slate-900" id="modal-title">{title}</h3>
                <div className="mt-2">
                  <p className="text-sm text-slate-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button 
              type="button" 
              onClick={onConfirm}
              className="inline-flex w-full justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              {confirmText}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

**Class Explanations:**
* `fixed inset-0`: Full viewport coverage.
* `z-50`: Above all content.
* `overflow-y-auto`: Scrollable if content overflows.
* `flex min-h-full items-end justify-center`: Mobile bottom-aligned.
* `p-4`: Padding around modal.
* `text-center`: Centered text mobile.
* `sm:items-center`: Desktop vertical center.
* `sm:p-0`: No padding desktop.
* `bg-slate-900/50`: Semi-transparent dark backdrop.
* `transition-opacity`: Smooth opacity transition.
* `relative`: Modal panel positioning.
* `transform`: Enables transform animations.
* `overflow-hidden`: Clips content to rounded corners.
* `rounded-lg`: Modal corners.
* `bg-white`: White panel background.
* `text-left`: Left-aligned text.
* `shadow-xl`: Heavy shadow for elevation.
* `transition-all`: Smooth transitions.
* `sm:my-8`: Desktop vertical margin.
* `sm:w-full sm:max-w-lg`: Desktop width constraint.
* `px-4 pb-4 pt-5`: Mobile padding.
* `sm:p-6 sm:pb-4`: Desktop padding.
* `sm:flex sm:items-start`: Desktop horizontal layout.
* `mx-auto`: Centered icon mobile.
* `h-12 w-12`: Icon container size.
* `flex-shrink-0`: Doesn't shrink.
* `rounded-full bg-red-100`: Red circle background.
* `sm:mx-0 sm:h-10 sm:w-10`: Desktop icon size.
* `h-6 w-6 text-red-600`: Icon styling.
* `mt-3 text-center`: Mobile text center.
* `sm:ml-4 sm:mt-0 sm:text-left`: Desktop text left.
* `text-base font-semibold leading-6`: Title styling.
* `text-slate-900`: Title color.
* `mt-2`: Spacing below title.
* `text-sm text-slate-500`: Message text.
* `bg-slate-50`: Footer background.
* `px-4 py-3`: Footer padding.
* `sm:flex sm:flex-row-reverse`: Desktop button layout.
* `sm:px-6`: Desktop footer padding.
* `inline-flex w-full justify-center`: Full-width mobile button.
* `rounded-lg bg-red-600`: Confirm button styling.
* `px-3 py-2`: Button padding.
* `text-sm font-semibold text-white`: Button text.
* `shadow-sm hover:bg-red-500`: Button hover.
* `sm:ml-3 sm:w-auto`: Desktop button sizing.
* `mt-3`: Mobile cancel margin.
* `bg-white ring-1 ring-inset ring-slate-300`: Cancel button border.
* `hover:bg-slate-50`: Cancel hover.
* `sm:mt-0`: Desktop cancel margin.

---

### Tooltip

**Visual Appearance:**
A small popup that appears above or below an element when hovered or focused. Has a dark background with white text, small rounded corners, and an arrow pointing to the trigger element. Often used for icon buttons or abbreviations.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|              [Button]                                    |
|                 ▲                                        |
|              +------+                                    |
|              | Text |                                    |
|              +------+                                    |
|                                                          |
+----------------------------------------------------------+
```

**HTML (CSS-only approach using group hover):**
```html
<div class="group relative inline-block">
  <button class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
    Hover me
  </button>
  <div class="invisible absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
    This is a tooltip
    <div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
  </div>
</div>
```

**React JSX:**
```jsx
export const Tooltip = ({ children, text, position = "top" }) => {
  const positionClasses = {
    top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
    bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
    left: "right-full top-1/2 mr-2 -translate-y-1/2",
    right: "left-full top-1/2 ml-2 -translate-y-1/2"
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-slate-900",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-900",
    left: "left-full top-1/2 -translate-y-1/2 border-l-slate-900",
    right: "right-full top-1/2 -translate-y-1/2 border-r-slate-900"
  };

  return (
    <div className="group relative inline-block">
      {children}
      <div className={`invisible absolute ${positionClasses[position]} whitespace-nowrap rounded bg-slate-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100`}>
        {text}
        <div className={`absolute ${arrowClasses[position]} border-4 border-transparent`} />
      </div>
    </div>
  );
};
```

**Class Explanations:**
* `group`: Establishes group context for hover states.
* `relative inline-block`: Container positioning.
* `invisible`: Hidden by default.
* `absolute`: Tooltip positioning.
* `bottom-full left-1/2`: Top-center positioning.
* `mb-2`: Margin below tooltip (space for arrow).
* `-translate-x-1/2`: Centers horizontally.
* `whitespace-nowrap`: Prevents text wrapping.
* `rounded`: Small border radius.
* `bg-slate-900`: Dark background #0f172a.
* `px-3 py-1.5`: Compact padding.
* `text-xs text-white`: Small white text.
* `opacity-0`: Fully transparent initially.
* `shadow-lg`: Elevation shadow.
* `transition-all`: Smooth appearance.
* `group-hover:visible`: Shows on parent hover.
* `group-hover:opacity-100`: Fades in on hover.
* `absolute`: Arrow positioning.
* `top-full left-1/2`: Arrow below tooltip.
* `-translate-x-1/2`: Centers arrow.
* `border-4 border-transparent`: Creates arrow shape.
* `border-t-slate-900`: Colored arrow tip.

---

### Badge / Tag

**Visual Appearance:**
A small inline label, often used for status indicators, categories, or counts. Rounded pill shape with small padding. Multiple color variants for different semantic meanings.

**ASCII Layout:**
```
+----------------------------------------------------------+
|                                                          |
|  [New] [Active] [Beta] [Pro] [99+]                      |
|  [Small rounded labels with various colors]              |
|                                                          |
+----------------------------------------------------------+
```

**HTML (Default Badge):**
```html
<span class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
  New
</span>
```

**HTML (Success Badge):**
```html
<span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
  Active
</span>
```

**HTML (Warning Badge):**
```html
<span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
  Beta
</span>
```

**HTML (Error Badge):**
```html
<span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
  Error
</span>
```

**HTML (Gray Badge):**
```html
<span class="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
  Draft
</span>
```

**React JSX:**
```jsx
export const Badge = ({ children, variant = "default", size = "sm" }) => {
  const variants = {
    default: "bg-indigo-100 text-indigo-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    gray: "bg-slate-100 text-slate-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800"
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-0.5 text-sm",
    lg: "px-3.5 py-1 text-sm"
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};
```

**Class Explanations:**
* `inline-flex items-center`: Inline flex container, vertically centered.
* `rounded-full`: Fully rounded, pill shape.
* `bg-indigo-100`: Light background tint.
* `px-2.5 py-0.5`: Small horizontal padding, minimal vertical.
* `text-xs`: Extra small text.
* `font-medium`: Medium weight for readability at small size.
* `text-indigo-800`: Dark text color for contrast.

---

## 7. Structural Headers & Footers

---

### Main Application Header

**Visual Appearance:**
A full-width header bar at the top of an application, typically containing a logo/branding on the left, navigation or search in the center, and user actions (avatar, notifications) on the right. Often has a bottom border and subtle shadow. Sticky positioning keeps it visible during scroll.

**ASCII Layout:**
```
+----------------------------------------------------------+
| Logo    Search...              [🔔] [👤]                |
|──────────────────────────────────────────────────────────|
|                                                          |
|              Main Application Content                    |
|                                                          |
+----------------------------------------------------------+
```

**HTML:**
```html
<header class="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between gap-4">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <div class="h-8 w-8 rounded-lg bg-indigo-600"></div>
        <span class="text-lg font-bold text-slate-900">AppName</span>
      </div>

      <!-- Search -->
      <div class="hidden flex-1 max-w-md md:block">
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search..."
            class="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <button class="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
          <span class="sr-only">Notifications</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div class="flex items-center gap-3 border-l border-slate-200 pl-3">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-slate-900">John Doe</p>
            <p class="text-xs text-slate-500">Admin</p>
          </div>
          <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700">
            JD
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
```

**React JSX:**
```jsx
export const AppHeader = ({ brand, user, onSearch, notificationCount = 0 }) => (
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600" />
          <span className="text-lg font-bold text-slate-900">{brand}</span>
        </div>

        <div className="hidden flex-1 max-w-md md:block">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
            <span className="sr-only">Notifications</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notificationCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>

          <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700">
              {user.initials}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);
```

**Class Explanations:**
* `sticky top-0 z-40`: Sticks to top, high z-index.
* `border-b border-slate-200`: Bottom border.
* `bg-white`: White background.
* `shadow-sm`: Subtle shadow.
* `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`: Centered container.
* `flex h-16 items-center justify-between gap-4`: Flex row, 64px height.
* `flex items-center gap-2`: Logo group.
* `h-8 w-8 rounded-lg bg-indigo-600`: Logo placeholder.
* `text-lg font-bold text-slate-900`: Brand text.
* `hidden flex-1 max-w-md md:block`: Search container, hidden mobile.
* `relative`: Search positioning.
* `pointer-events-none absolute inset-y-0 left-0`: Search icon.
* `pl-3`: Icon left padding.
* `block w-full rounded-lg border border-slate-300 bg-slate-50`: Search input.
* `py-2 pl-10 pr-4`: Search padding.
* `text-sm text-slate-900 placeholder-slate-400`: Search text.
* `focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`: Search focus.
* `flex items-center gap-3`: Actions group.
* `relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700`: Notification button.
* `sr-only`: Hidden label.
* `absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white`: Notification dot.
* `flex items-center gap-3 border-l border-slate-200 pl-3`: User section.
* `text-right hidden sm:block`: User info, hidden mobile.
* `text-sm font-medium text-slate-900`: User name.
* `text-xs text-slate-500`: User role.
* `h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700`: Avatar.

---

### Multi-Column Site Footer

**Visual Appearance:**
A full-width footer at the bottom of a page, typically with a dark background (slate-900). Contains multiple columns of links organized by category, a newsletter signup, social media icons, and a copyright bar at the very bottom. Creates a professional, comprehensive site ending.

**ASCII Layout:**
```
+----------------------------------------------------------+
|████████████████████████████████████████████████████████|
|██                                                    ███|
|██  Product        Company        Support        Legal ███|
|██  ─────────      ────────       ────────       ───── ███|
|██  Features       About          Help Center      Terms ███|
|██  Pricing        Careers        API Docs         Privacy██|
|██  Integrations   Blog           Status           Cookies██|
|██                                                    ███|
|██  ─────────────────────────────────────────────────── ███|
|██  © 2024 Company Name    [Twitter] [GitHub] [LinkedIn]██|
|██                                                    ███|
|████████████████████████████████████████████████████████|
+----------------------------------------------------------+
```

**HTML:**
```html
<footer class="bg-slate-900 text-slate-300">
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
      <!-- Column 1 -->
      <div>
        <h3 class="text-sm font-semibold text-white">Product</h3>
        <ul class="mt-4 space-y-3">
          <li><a href="#" class="text-sm hover:text-white transition-colors">Features</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Pricing</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Integrations</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Changelog</a></li>
        </ul>
      </div>

      <!-- Column 2 -->
      <div>
        <h3 class="text-sm font-semibold text-white">Company</h3>
        <ul class="mt-4 space-y-3">
          <li><a href="#" class="text-sm hover:text-white transition-colors">About</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Careers</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Blog</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Press</a></li>
        </ul>
      </div>

      <!-- Column 3 -->
      <div>
        <h3 class="text-sm font-semibold text-white">Support</h3>
        <ul class="mt-4 space-y-3">
          <li><a href="#" class="text-sm hover:text-white transition-colors">Help Center</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">API Documentation</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">System Status</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>

      <!-- Column 4 -->
      <div>
        <h3 class="text-sm font-semibold text-white">Legal</h3>
        <ul class="mt-4 space-y-3">
          <li><a href="#" class="text-sm hover:text-white transition-colors">Terms of Service</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Cookie Policy</a></li>
          <li><a href="#" class="text-sm hover:text-white transition-colors">Licenses</a></li>
        </ul>
      </div>
    </div>

    <!-- Newsletter -->
    <div class="mt-12 border-t border-slate-800 pt-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="md:w-1/2">
          <h3 class="text-sm font-semibold text-white">Subscribe to our newsletter</h3>
          <p class="mt-1 text-sm text-slate-400">Get the latest updates and news directly to your inbox.</p>
        </div>
        <div class="mt-4 md:mt-0 md:w-1/2">
          <form class="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button type="submit" class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="mt-8 border-t border-slate-800 pt-8 md:flex md:items-center md:justify-between">
      <p class="text-sm text-slate-400">© 2024 Company Name. All rights reserved.</p>
      <div class="mt-4 flex gap-4 md:mt-0">
        <a href="#" class="text-slate-400 hover:text-white transition-colors">
          <span class="sr-only">Twitter</span>
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
        <a href="#" class="text-slate-400 hover:text-white transition-colors">
          <span class="sr-only">GitHub</span>
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" class="text-slate-400 hover:text-white transition-colors">
          <span class="sr-only">LinkedIn</span>
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>
```

**React JSX:**
```jsx
export const SiteFooter = ({ columns, newsletter, socialLinks, copyright }) => (
  <footer className="bg-slate-900 text-slate-300">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {columns.map(column => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-white">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {newsletter && (
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h3 className="text-sm font-semibold text-white">{newsletter.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{newsletter.description}</p>
            </div>
            <div className="mt-4 md:mt-0 md:w-1/2">
              <form className="flex gap-2" onSubmit={newsletter.onSubmit}>
                <input 
                  type="email"
                  placeholder={newsletter.placeholder}
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">
                  {newsletter.buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-slate-800 pt-8 md:flex md:items-center md:justify-between">
        <p className="text-sm text-slate-400">{copyright}</p>
        <div className="mt-4 flex gap-4 md:mt-0">
          {socialLinks.map(link => (
            <a key={link.name} href={link.href} className="text-slate-400 hover:text-white transition-colors">
              <span className="sr-only">{link.name}</span>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
```

**Class Explanations:**
* `bg-slate-900`: Dark footer background #0f172a.
* `text-slate-300`: Light gray text for contrast.
* `mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8`: Centered container with vertical padding.
* `grid grid-cols-2 gap-8 md:grid-cols-4`: 2-column mobile, 4-column desktop.
* `text-sm font-semibold text-white`: Column heading.
* `mt-4 space-y-3`: Vertical spacing between links.
* `text-sm hover:text-white transition-colors`: Link styling with hover.
* `mt-12 border-t border-slate-800 pt-8`: Newsletter section separator.
* `md:flex md:items-center md:justify-between`: Desktop horizontal layout.
* `md:w-1/2`: Half-width columns desktop.
* `mt-1 text-sm text-slate-400`: Description text.
* `flex gap-2`: Horizontal form layout.
* `flex-1 rounded-lg border border-slate-700 bg-slate-800`: Email input.
* `px-4 py-2 text-sm text-white placeholder-slate-500`: Input text styling.
* `focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`: Input focus.
* `rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white`: Subscribe button.
* `hover:bg-indigo-700 transition-colors`: Button hover.
* `mt-8 border-t border-slate-800 pt-8`: Bottom bar separator.
* `md:flex md:items-center md:justify-between`: Bottom bar layout.
* `text-sm text-slate-400`: Copyright text.
* `mt-4 flex gap-4 md:mt-0`: Social icons.
* `text-slate-400 hover:text-white transition-colors`: Social icon hover.
* `sr-only`: Hidden accessibility labels.
* `h-5 w-5`: Icon size.

---

## Appendix: Quick Reference

### Color Palette Used
- **Primary (Indigo)**: 50 (#eef2ff), 100 (#e0e7ff), 500 (#6366f1), 600 (#4f46e5), 700 (#4338ca), 800 (#3730a3)
- **Slate (Grays)**: 50 (#f8fafc), 100 (#f1f5f9), 200 (#e2e8f0), 300 (#cbd5e1), 400 (#94a3b8), 500 (#64748b), 600 (#475569), 700 (#334155), 800 (#1e293b), 900 (#0f172a)
- **Semantic**: Blue (info), Green (success), Yellow (warning), Red (error)

### Breakpoint Reference
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Spacing Scale (rem)
- `0.5`: 0.125rem (2px)
- `1`: 0.25rem (4px)
- `2`: 0.5rem (8px)
- `3`: 0.75rem (12px)
- `4`: 1rem (16px)
- `5`: 1.25rem (20px)
- `6`: 1.5rem (24px)
- `8`: 2rem (32px)
- `10`: 2.5rem (40px)
- `12`: 3rem (48px)
- `16`: 4rem (64px)

### Font Size Scale
- `xs`: 0.75rem (12px)
- `sm`: 0.875rem (14px)
- `base`: 1rem (16px)
- `lg`: 1.125rem (18px)
- `xl`: 1.25rem (20px)
- `2xl`: 1.5rem (24px)
- `3xl`: 1.875rem (30px)
- `4xl`: 2.25rem (36px)
- `5xl`: 3rem (48px)
- `6xl`: 3.75rem (60px)
- `7xl`: 4.5rem (72px)

---

*End of Comprehensive Tailwind CSS Component Documentation Guide*
