
I'll create comprehensive, documented notes covering all the essential Tailwind CSS and React patterns you'll need to build professional websites. Based on your request, I'll focus on the components shown in your code (grids, cards, badges, navbars, buttons, etc.) and expand to cover everything needed for production-grade sites.

Let me search for the latest Tailwind CSS best practices and common patterns to ensure these notes are current and comprehensive.
Here is a comprehensive, production-ready reference document covering every pattern you'll need to build professional websites with React and Tailwind CSS. These notes are organized by component category with detailed class explanations, just like your task card example.

---

# Complete Tailwind CSS + React Professional Website Reference

## Table of Contents
1. [Layout & Containers](#1-layout--containers)
2. [Grid Systems](#2-grid-systems)
3. [Navigation (Navbars)](#3-navigation-navbars)
4. [Buttons](#4-buttons)
5. [Cards](#5-cards)
6. [Badges & Status Indicators](#6-badges--status-indicators)
7. [Typography](#7-typography)
8. [Forms & Inputs](#8-forms--inputs)
9. [Tables & Data Display](#9-tables--data-display)
10. [Modals & Overlays](#10-modals--overlays)
11. [Hero Sections](#11-hero-sections)
12. [Footers](#12-footers)
13. [Responsive Patterns](#13-responsive-patterns)
14. [State & Interaction Utilities](#14-state--interaction-utilities)
15. [Color & Theme System](#15-color--theme-system)

---

## 1. Layout & Containers

### Container Pattern (Centered Content)
```jsx
{/* Standard container - centers content with max-width and auto margins */}
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content goes here */}
</div>
```
- `container`: Sets max-width at each breakpoint (640px, 768px, 1024px, 1280px, 1536px)
- `mx-auto`: Centers horizontally with `margin-left: auto; margin-right: auto`
- `px-4`: Horizontal padding (1rem) - essential for mobile breathing room
- `sm:px-6`: Increases padding at small breakpoint (1.5rem)
- `lg:px-8`: Even more padding at large breakpoint (2rem)

### Full-Width Wrapper with Constraints
```jsx
{/* Your task app pattern - full width with max constraint */}
<div className="w-full max-w-7xl mx-auto shadow-md p-4 rounded-lg bg-gray-100">
  {/* Content */}
</div>
```
- `w-full`: Width 100% of parent
- `max-w-7xl`: Maximum width 1280px - prevents stretching too wide on large screens
- `mx-auto`: Centers the container
- `shadow-md`: Medium box shadow for depth
- `p-4`: Padding 1rem all sides
- `rounded-lg`: Large border radius (0.5rem) for modern feel
- `bg-gray-100`: Light gray background for subtle contrast

### Section Spacing
```jsx
<section className="py-12 md:py-20 lg:py-24">
  {/* Vertical padding scales up on larger screens */}
</section>
```
- `py-12`: Vertical padding 3rem (mobile)
- `md:py-20`: Vertical padding 5rem at medium breakpoint
- `lg:py-24`: Vertical padding 6rem at large breakpoint

---

## 2. Grid Systems

### Responsive Grid (Your Task App Pattern)
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {items.map(item => (
    <div key={item.id} className="...">
      {/* Card content */}
    </div>
  ))}
</div>
```
- `grid`: Enables CSS Grid layout
- `grid-cols-1`: Single column on mobile (default)
- `md:grid-cols-3`: 3 columns at medium breakpoint (768px+)
- `lg:grid-cols-4`: 4 columns at large breakpoint (1024px+)
- `gap-4`: Gap between grid items (1rem)

### Auto-Fit Grid (Flexible Columns)
```jsx
{/* Automatically fits as many columns as possible, min 300px each */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map(item => (
    <div key={item.id}>
      {/* Content */}
    </div>
  ))}
</div>
```

### Grid with Sidebar Layout
```jsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  {/* Sidebar - takes 3 of 12 columns on desktop */}
  <aside className="lg:col-span-3">
    {/* Sidebar content */}
  </aside>
  
  {/* Main content - takes 9 of 12 columns on desktop */}
  <main className="lg:col-span-9">
    {/* Main content */}
  </main>
</div>
```
- `lg:grid-cols-12`: 12-column grid system on desktop
- `lg:col-span-3`: Occupies 3 columns (25%)
- `lg:col-span-9`: Occupies 9 columns (75%)

### Grid vs Flex Decision Guide
- **Use `grid`** when: 2D layouts, cards of equal height, complex layouts with rows AND columns
- **Use `flex`** when: Single row/column, alignment matters, content wrapping with varying widths
- **Use `gap-*`** instead of `space-x-*` or `space-y-*` for consistent spacing in both grid and flex

---

## 3. Navigation (Navbars)

### Basic Responsive Navbar
```jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // or any icon library

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-900">Brand</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50">
              Home
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50">
              About
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50">
              Services
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
```

**Class Breakdown:**
- `sticky top-0`: Sticks to top when scrolling (alternative: `fixed top-0` for always-fixed)
- `z-50`: High z-index ensures navbar stays above other content
- `h-16`: Fixed height (4rem) for consistent navbar sizing
- `flex-shrink-0`: Prevents logo from shrinking
- `hidden md:flex`: Hides on mobile, shows flex container on medium+
- `space-x-8`: Horizontal gap between nav items (2rem)
- `transition-colors`: Smooth color transition on hover
- `md:hidden`: Shows only on mobile (hidden on medium+)

### Dark Navbar Variant
```jsx
<<nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      <span className="text-xl font-bold">Brand</span>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
      </div>
    </div>
  </div>
</nav>
```

### Navbar with Search
```jsx
<div className="hidden md:flex items-center flex-1 max-w-md mx-8">
  <div className="relative w-full">
    <input 
      type="text" 
      placeholder="Search..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
  </div>
</div>
```
- `relative`: Positions the search icon absolutely within
- `pl-10`: Left padding to make room for icon
- `focus:ring-2`: Blue ring on focus for accessibility
- `focus:border-transparent`: Removes default border on focus
- `absolute left-3 top-1/2 transform -translate-y-1/2`: Centers icon vertically

---

## 4. Buttons

### Button Variants
```jsx
{/* Primary Button */}
<button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Primary Action
</button>

{/* Secondary Button */}
<button className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-300 active:bg-gray-400 transition-colors">
  Secondary
</button>

{/* Outline Button */}
<button className="border-2 border-blue-600 text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 active:bg-blue-100 transition-colors">
  Outline
</button>

{/* Ghost Button */}
<button className="text-gray-600 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 active:bg-gray-200 transition-colors">
  Ghost
</button>

{/* Danger Button */}
<button className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 active:bg-red-800 transition-colors">
  Delete
</button>
```

**Class Breakdown:**
- `px-6 py-2.5`: Horizontal padding 1.5rem, vertical 0.625rem - comfortable click target
- `rounded-lg`: 0.5rem border radius - modern but not too pill-shaped
- `font-medium`: 500 weight - readable without being too bold
- `hover:bg-blue-700`: Darkens on hover for feedback
- `active:bg-blue-800`: Even darker when clicked/pressed
- `transition-colors`: Smooth 150ms color transition
- `focus:outline-none`: Removes default browser outline
- `focus:ring-2`: Adds blue ring on keyboard focus (accessibility)
- `focus:ring-offset-2`: Gap between ring and button edge

### Button Sizes
```jsx
{/* Small */}
<button className="px-3 py-1.5 text-sm rounded-md">Small</button>

{/* Default */}
<button className="px-6 py-2.5 rounded-lg">Default</button>

{/* Large */}
<button className="px-8 py-3 text-lg rounded-xl">Large</button>

{/* Full Width */}
<button className="w-full py-3 rounded-lg">Full Width</button>
```

### Button with Icon
```jsx
<button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
  <Plus size={18} />
  <span>Add Item</span>
</button>
```
- `inline-flex`: Flex container that flows inline
- `items-center`: Vertically centers icon and text
- `gap-2`: Gap between icon and text (0.5rem)

### Loading Button
```jsx
<button 
  disabled 
  className="inline-flex items-center gap-2 bg-blue-400 text-white px-6 py-2.5 rounded-lg cursor-not-allowed"
>
  <Loader2 className="animate-spin" size={18} />
  <span>Loading...</span>
</button>
```
- `bg-blue-400`: Lighter color to indicate disabled state
- `cursor-not-allowed`: Shows not-allowed cursor
- `animate-spin`: Rotates the loader icon continuously

---

## 5. Cards

### Standard Card (Your Task App Enhanced)
```jsx
<div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col">
  {/* Card Header */}
  <div className="mb-4">
    <h3 className="text-lg font-bold text-gray-900 mb-1">Card Title</h3>
    <p className="text-sm text-gray-500">Subtitle or metadata</p>
  </div>
  
  {/* Card Body */}
  <div className="flex-1 mb-4">
    <p className="text-gray-700 leading-relaxed">
      Card content goes here. Use leading-relaxed for better readability.
    </p>
  </div>
  
  {/* Card Footer */}
  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
    <span className="text-sm text-gray-500">Footer info</span>
    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
      Action →
    </button>
  </div>
</div>
```

**Class Breakdown:**
- `bg-white`: White background for contrast against gray page bg
- `rounded-lg`: Consistent border radius
- `shadow-md`: Subtle elevation (0 4px 6px -1px rgba(0,0,0,0.1))
- `hover:shadow-lg`: Elevates more on hover for interactivity
- `transition-shadow`: Smooth shadow transition
- `p-6`: Comfortable padding (1.5rem)
- `flex flex-col`: Vertical flex layout
- `flex-1`: Body grows to fill available space
- `leading-relaxed`: 1.625 line height for readability
- `pt-4 border-t`: Top padding and border for footer separation

### Image Card
```jsx
<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
  <div className="relative h-48">
    <img 
      src="/image.jpg" 
      alt="Description" 
      className="w-full h-full object-cover"
    />
    <div className="absolute top-4 right-4">
      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
        Featured
      </span>
    </div>
  </div>
  <div className="p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-2">Card Title</h3>
    <p className="text-gray-600 mb-4">Description text</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        <span className="text-sm text-gray-600">Author Name</span>
      </div>
      <span className="text-sm text-gray-500">2 days ago</span>
    </div>
  </div>
</div>
```
- `overflow-hidden`: Clips image to rounded corners
- `relative h-48`: Container for image with fixed height
- `object-cover`: Covers container, cropping if needed
- `absolute top-4 right-4`: Positions badge in top-right
- `bg-white/90`: White with 90% opacity
- `backdrop-blur-sm`: Frosted glass effect behind badge
- `hover:shadow-xl transition-all duration-300`: Slower, more dramatic hover

### Pricing Card
```jsx
<div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-blue-500 transition-all">
  <div className="text-center mb-8">
    <h3 className="text-lg font-semibold text-gray-600 uppercase tracking-wide">Pro Plan</h3>
    <div className="mt-4 flex items-baseline justify-center">
      <span className="text-5xl font-extrabold text-gray-900">$29</span>
      <span className="ml-2 text-gray-500">/month</span>
    </div>
  </div>
  
  <ul className="space-y-4 mb-8">
    <li className="flex items-center gap-3">
      <Check className="text-green-500" size={20} />
      <span className="text-gray-700">Unlimited projects</span>
    </li>
    <li className="flex items-center gap-3">
      <Check className="text-green-500" size={20} />
      <span className="text-gray-700">Priority support</span>
    </li>
  </ul>
  
  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
    Get Started
  </button>
</div>
```
- `border-2 border-transparent`: Invisible border that shows on hover
- `hover:border-blue-500`: Blue border on hover
- `text-5xl font-extrabold`: Large prominent price
- `items-baseline`: Aligns $ and /month text properly
- `uppercase tracking-wide`: Styled label

---

## 6. Badges & Status Indicators

### Status Badges (Your Priority Pattern)
```jsx
{/* Your exact pattern - priority badges */}
<span className={`
  text-sm w-fit py-1.5 px-3 rounded-md text-white font-medium capitalize
  ${priority === 'low' ? 'bg-green-500' : 
    priority === 'medium' ? 'bg-yellow-500' : 
    'bg-red-500'}
`}>
  {priority}
</span>
```

### Common Badge Variants
```jsx
{/* Status Badges */}
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Active
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
  Pending
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
  Error
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
  Inactive
</span>

<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  Info
</span>
```

**Class Breakdown:**
- `inline-flex`: Inline flex for icon + text alignment
- `px-2.5 py-0.5`: Compact padding for badge size
- `rounded-full`: Pill shape (fully rounded)
- `text-xs`: Extra small text (0.75rem)
- `font-medium`: Medium weight
- `bg-green-100 text-green-800`: Light background with dark text - high contrast
- `bg-*-100 text-*-800`: Standard pattern: 100 shade bg, 800 shade text

### Badge with Dot
```jsx
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
  <span className="w-2 h-2 rounded-full bg-green-500"></span>
  Online
</span>
```

### Counter Badge (Notifications)
```jsx
<div className="relative">
  <Bell size={24} />
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
    3
  </span>
</div>
```
- `absolute -top-2 -right-2`: Negative positioning to sit on corner
- `w-5 h-5 flex items-center justify-center`: Perfect circle with centered text
- `rounded-full`: Circular shape

---

## 7. Typography

### Heading Hierarchy
```jsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
  Hero Heading
</h1>

<h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
  Section Title
</h2>

<h3 className="text-xl md:text-2xl font-semibold text-gray-900">
  Card Title
</h3>

<h4 className="text-lg font-semibold text-gray-800">
  Subsection
</h4>
```

**Class Breakdown:**
- `text-4xl md:text-5xl lg:text-6xl`: Responsive font sizing
- `font-extrabold`: 800 weight for hero
- `tracking-tight`: -0.025em letter spacing for large headings
- `leading-tight`: 1.25 line height for headings (tighter than body)

### Body Text
```jsx
<p className="text-base text-gray-600 leading-relaxed max-w-prose">
  Body text with optimal reading width. max-w-prose limits to ~65ch for readability.
</p>

<p className="text-sm text-gray-500 leading-relaxed">
  Smaller text for descriptions, metadata, captions.
</p>

<p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
  Label text - tiny, spaced, uppercase
</p>
```

### Text Utilities
```jsx
{/* Font families */}
<span className="font-sans">Default sans-serif</span>
<span className="font-mono">Monospace - great for code, IDs, data</span>
<span className="font-serif">Serif - for editorial content</span>

{/* Text styling */}
<span className="capitalize">first letter capitalized</span>
<span className="uppercase">ALL CAPS</span>
<span className="lowercase">all lowercase</span>
<span className="truncate">Text truncated with ellipsis...</span>
<span className="line-clamp-2">Text limited to 2 lines then ellipsis</span>

{/* Text alignment */}
<div className="text-left md:text-center lg:text-right">
  Responsive alignment
</div>
```

---

## 8. Forms & Inputs

### Input Field
```jsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Email Address
  </label>
  <input 
    type="email" 
    placeholder="you@example.com"
    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
  />
  <p className="text-sm text-gray-500">We'll never share your email.</p>
</div>
```

**Class Breakdown:**
- `block`: Label on its own line
- `w-full`: Full width input
- `px-4 py-2.5`: Comfortable padding
- `border border-gray-300`: Default border
- `focus:ring-2 focus:ring-blue-500`: Blue ring on focus
- `focus:border-blue-500`: Blue border on focus
- `outline-none`: Removes default outline (replaced by ring)
- `transition-all`: Smooth transition for all properties
- `placeholder:text-gray-400`: Styled placeholder

### Input with Icon
```jsx
<div className="relative">
  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  <input 
    type="email"
    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
  />
</div>
```

### Select Dropdown
```jsx
<div className="relative">
  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white pr-10">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
</div>
```
- `appearance-none`: Removes default browser styling
- `pr-10`: Right padding for custom arrow
- `pointer-events-none`: Click passes through icon to select

### Checkbox
```jsx
<label className="flex items-center gap-3 cursor-pointer">
  <input 
    type="checkbox" 
    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
  />
  <span className="text-gray-700">Remember me</span>
</label>
```

### Form Layout
```jsx
<form className="space-y-6 max-w-lg">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">First Name</label>
      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
    </div>
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Last Name</label>
      <input type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
    </div>
  </div>
  
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Message</label>
    <textarea 
      rows={4}
      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
    ></textarea>
  </div>
  
  <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
    Submit
  </button>
</form>
```

---

## 9. Tables & Data Display

### Data Table
```jsx
<div className="overflow-x-auto rounded-lg border border-gray-200">
  <table className="w-full text-left text-sm">
    <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
      <tr>
        <th className="px-6 py-4">Name</th>
        <th className="px-6 py-4">Status</th>
        <th className="px-6 py-4">Role</th>
        <th className="px-6 py-4 text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 bg-white">
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 font-medium text-gray-900">John Doe</td>
        <td className="px-6 py-4">
          <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        </td>
        <td className="px-6 py-4 text-gray-600">Admin</td>
        <td className="px-6 py-4 text-right">
          <button className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Class Breakdown:**
- `overflow-x-auto`: Horizontal scroll on mobile if table is too wide
- `rounded-lg border`: Clean container with border
- `text-left text-sm`: Default alignment and size
- `bg-gray-50`: Subtle header background
- `uppercase text-xs`: Styled header text
- `divide-y divide-gray-200`: Row dividers
- `hover:bg-gray-50`: Row hover highlight

### Stats Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
    <p className="text-3xl font-bold text-gray-900">$48,294</p>
    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
      <TrendingUp size={16} />
      <span>+12.5%</span>
    </p>
  </div>
</div>
```

---

## 10. Modals & Overlays

### Modal Overlay
```jsx
import { useState } from 'react';
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Content */}
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Class Breakdown:**
- `fixed inset-0`: Covers entire viewport
- `z-50`: Above everything else
- `overflow-y-auto`: Scroll if content is too tall
- `bg-black/50`: Black with 50% opacity (Tailwind v4 syntax)
- `backdrop-blur-sm`: Frosted glass effect on backdrop
- `min-h-full items-center justify-center`: Centers modal vertically
- `p-4`: Padding so modal doesn't touch edges on mobile
- `max-w-md`: Limits width
- `transform transition-all`: Smooth entrance animation

### Drawer (Sidebar Overlay)
```jsx
<div className="fixed inset-0 z-50">
  <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
  <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 transform transition-transform">
    {/* Drawer content */}
  </div>
</div>
```

---

## 11. Hero Sections

### Standard Hero
```jsx
<section className="relative bg-gray-900 text-white py-20 md:py-32 overflow-hidden">
  {/* Background Image with Overlay */}
  <div className="absolute inset-0">
    <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
  </div>
  
  {/* Content */}
  <div className="relative container mx-auto px-4">
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
        Build Something Amazing
      </h1>
      <p className="text-xl text-gray-300 mb-8 leading-relaxed">
        Create professional websites with modern tools and best practices.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Get Started
        </button>
        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  </div>
</section>
```

**Class Breakdown:**
- `relative`: Establishes positioning context
- `overflow-hidden`: Clips background image
- `absolute inset-0`: Background layer covers entire section
- `object-cover opacity-30`: Faded background image
- `bg-gradient-to-r from-gray-900 to-transparent`: Gradient overlay for text readability
- `max-w-2xl`: Limits text width for readability
- `flex flex-col sm:flex-row`: Stacks buttons on mobile, side-by-side on desktop

---

## 12. Footers

### Professional Footer
```jsx
<<footer className="bg-gray-900 text-gray-300 py-12">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      {/* Brand Column */}
      <div className="md:col-span-1">
        <h3 className="text-white text-lg font-bold mb-4">Brand</h3>
        <p className="text-sm leading-relaxed">
          Building professional websites with modern tools.
        </p>
      </div>
      
      {/* Link Columns */}
      <div>
        <h4 className="text-white font-semibold mb-4">Product</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="text-white font-semibold mb-4">Company</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition-colors">About</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="text-white font-semibold mb-4">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
        </ul>
      </div>
    </div>
    
    {/* Bottom Bar */}
    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm">© 2026 Brand. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href="#" className="hover:text-white transition-colors">GitHub</a>
      </div>
    </div>
  </div>
</footer>
```

---

## 13. Responsive Patterns

### Mobile-First Breakpoint Reference
| Breakpoint | Prefix | Width | Usage |
|------------|--------|-------|-------|
| Small | `sm:` | 640px | Large phones |
| Medium | `md:` | 768px | Tablets |
| Large | `lg:` | 1024px | Laptops |
| Extra Large | `xl:` | 1280px | Desktops |
| 2X Large | `2xl:` | 1536px | Large screens |

### Common Responsive Patterns
```jsx
{/* Stack on mobile, side-by-side on desktop */}
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Left</div>
  <div className="w-full md:w-1/2">Right</div>
</div>

{/* Hide on mobile, show on desktop */}
<div className="hidden md:block">
  Desktop-only content
</div>

{/* Show on mobile, hide on desktop */}
<div className="md:hidden">
  Mobile-only content
</div>

{/* Responsive padding */}
<div className="p-4 md:p-8 lg:p-12">
  Padding increases with screen size
</div>

{/* Responsive text size */}
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Scales up on larger screens
</h1>
```

---

## 14. State & Interaction Utilities

### Hover, Focus, Active States
```jsx
<button className="
  bg-blue-600 text-white px-6 py-2 rounded-lg
  hover:bg-blue-700          /* Mouse hover */
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  /* Keyboard focus */
  active:bg-blue-800         /* Mouse down */
  disabled:opacity-50 disabled:cursor-not-allowed  /* Disabled state */
  transition-all duration-200 ease-in-out
">
  Interactive Button
</button>
```

### Group Hover (Parent-Child Interaction)
```jsx
<div className="group relative bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
    Title changes color when card is hovered
  </h3>
  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
    <ArrowRight size={20} />
  </div>
</div>
```
- `group`: Marks the parent
- `group-hover:`: Applies styles when parent is hovered
- `group-hover:text-blue-600`: Child changes when parent hovered
- `opacity-0 group-hover:opacity-100`: Show element on hover

### First/Last Child Styling
```jsx
<ul className="divide-y divide-gray-200">
  {items.map(item => (
    <li key={item.id} className="py-4 first:pt-0 last:pb-0">
      {/* first:pt-0 removes top padding on first item */}
      {/* last:pb-0 removes bottom padding on last item */}
      {item.name}
    </li>
  ))}
</ul>
```

---

## 15. Color & Theme System

### Tailwind Default Color Scale
```
50  - Lightest (backgrounds)
100 - Very light
200 - Light
300 - Medium light
400 - Medium
500 - Base color (primary)
600 - Dark
700 - Darker
800 - Very dark
900 - Darkest (text)
950 - Almost black
```

### Semantic Color Usage
```jsx
{/* Backgrounds - use 50-100 shades */}
<div className="bg-gray-50">Subtle background</div>
<div className="bg-blue-50">Tinted background</div>

{/* Text - use 600-900 shades */}
<p className="text-gray-600">Secondary text</p>
<p className="text-gray-900">Primary text</p>

{/* Borders - use 200-300 shades */}
<div className="border border-gray-200">Subtle border</div>
<div className="border-2 border-blue-500">Emphasis border</div>

{/* Interactive elements - use 500-600 base, 700 hover */}
<button className="bg-blue-600 hover:bg-blue-700">Button</button>
```

### Custom Theme (Tailwind v4)
```css
/* In your main CSS file */
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

---

## Quick Reference: Common Class Combinations

| Pattern | Classes |
|---------|---------|
| Center a div | `flex items-center justify-center` |
| Perfect circle | `w-12 h-12 rounded-full` |
| Card with hover lift | `bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow` |
| Input focus ring | `focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none` |
| Truncate text | `truncate` or `line-clamp-2` |
| Sticky header | `sticky top-0 z-50 bg-white shadow-md` |
| Full-height section | `min-h-screen flex items-center` |
| Aspect ratio image | `aspect-video object-cover` |
| Glassmorphism | `bg-white/80 backdrop-blur-md border border-white/20` |

---

## File Organization Pattern

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── layout/          # Layout components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   └── Layout.jsx
│   └── sections/        # Page sections
│       ├── Hero.jsx
│       ├── Features.jsx
│       └── Pricing.jsx
├── utils/
│   └── constants/
│       └── constants.js
├── App.jsx
└── index.css
```

This reference covers the essential patterns found in your task app (grid layouts, cards, badges) and expands to everything needed for professional websites: navigation, forms, tables, modals, hero sections, footers, and responsive design patterns. Each class is documented with its purpose, giving you the knowledge to build any layout confidently.
