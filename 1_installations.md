# Task Manager Project Notes

## Step 1: Create Project Folder

```bash
mkdir task_manager && cd task_manager
```

### Explanation

* `mkdir` → Create a folder.
* `task_manager` → Folder name.
* `&&` → Run the next command if the first succeeds.
* `cd task_manager` → Move into the folder.

---

## Step 2: Create Client and Server Folders

```bash
mkdir client server
```

### Explanation

Creates two folders:

```text
task_manager/
├── client/
└── server/
```

* `client` → React frontend.
* `server` → Node.js/Express backend.

---

## Step 3: Verify Folder Creation

```bash
ls
```

### Explanation

Lists folders in the current directory.

Output:

```text
client/
server/
```

This confirms both folders were created successfully.

---

## Project Structure So Far

```text
task_manager/
├── client/
└── server/
```

### Purpose

* `client/` contains the user interface.
* `server/` contains APIs and database logic.


# Task Manager Project Notes

## Step 4: Move Into Client Folder

```bash
cd client
```

### Explanation

Move into the frontend folder where React will be installed.

Current location:

```text
task_manager/client
```

---

## Step 5: Create React App Using Vite

```bash
npm create vite@latest . -- --template react
```

### Explanation

* `npm create vite@latest` → Download and run the latest Vite setup.
* `.` → Create the project in the current folder.
* `--template react` → Use the React template.

Project structure created:

```text
client/
├── src/
├── public/
├── package.json
├── vite.config.js
└── index.html
```

---

## Step 6: Install Project Dependencies

```bash
npm install
```

### Explanation

Downloads all packages listed in `package.json`.

Creates:

```text
node_modules/
package-lock.json
```

---

## Step 7: Install Tailwind CSS V4

```bash
npm install tailwindcss @tailwindcss/vite
```

### Explanation

* `tailwindcss` → Utility-first CSS framework.
* `@tailwindcss/vite` → Connects Tailwind directly to Vite.

---

## Step 8: Configure Vite

Open:

```text
vite.config.js
```

Replace with:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

### Explanation

```js
import { defineConfig } from 'vite';
```

Imports Vite configuration helper.

```js
import react from '@vitejs/plugin-react';
```

Adds React support.

```js
import tailwindcss from "@tailwindcss/vite";
```

Adds Tailwind support.

```js
plugins: [
  react(),
  tailwindcss(),
]
```

Tells Vite to use both React and Tailwind.

---

## Step 9: Configure Tailwind

Open:

```text
src/index.css
```

Replace everything with:

```css
@import "tailwindcss";
```

### Explanation

Loads all Tailwind utilities into the project.

---

## Step 10: Start Development Server

```bash
npm run dev
```

### Explanation

Starts the Vite development server.

Output:

```text
Local: http://localhost:5173/
```

Open the URL in your browser to see the React application.

---

## Project Structure So Far

```text
task_manager/
│
├── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── server/
```

### Purpose

* `client/` → React + Tailwind frontend.
* `server/` → Backend (to be built later).
* Vite → Development server and build tool.
* Tailwind → Styling framework.

## Step 11: Create Source Code Folders

```bash
mkdir -p src/{components,context,features,hooks,services,styles,types,utils}
```

### Explanation

Creates multiple folders inside `src` with a single command.

* `components` → Reusable UI components.
* `context` → React Context providers.
* `features` → Feature-based modules (Tasks, Auth, etc.).
* `hooks` → Custom React hooks.
* `services` → API and external services.
* `styles` → Global styles and CSS files.
* `types` → Type definitions and interfaces.
* `utils` → Helper and utility functions.

---

### Folder Structure

```text
src/
├── components/
├── context/
├── features/
├── hooks/
├── services/
├── styles/
├── types/
└── utils/
```

### Why?

This structure keeps the project organized and scalable as it grows.


## Step 12: Create Header Component

Create a new file:

```text
src/components/Header.jsx
```

Add:

```jsx
import { memo } from "react";

function Header({
  title = "Task DashBoard Pro",
  subTitle = "Your Personal Task Manager"
}) {
  return (
    <header className="relative shadow-lg p-6 md:p-8 text-white text-center bg-gradient-to-r from-blue-500 to-blue-600 w-full max-w-4xl rounded-b-xl mx-auto">

      <h1 className="font-extrabold text-2xl md:text-3xl tracking-tight mb-1">
        {title}
      </h1>

      <p className="text-blue-100 text-sm md:text-base font-normal max-w-md mx-auto">
        {subTitle}
      </p>

    </header>
  );
}

export default memo(Header);
```

### Explanation

Import:

```jsx
import { memo } from "react";
```

* `memo` is a React optimization function.
* Prevents unnecessary re-renders.
* The component only re-renders when its props change.

---

### Component Props

```jsx
function Header({
  title = "Task DashBoard Pro",
  subTitle = "Your Personal Task Manager"
})
```

Creates two props:

| Prop     | Default Value              |
| -------- | -------------------------- |
| title    | Task DashBoard Pro         |
| subTitle | Your Personal Task Manager |

If no props are passed:

```jsx
<Header />
```

React uses the default values.

---

### Header Container

```jsx
<header className="relative shadow-lg p-6 md:p-8 text-white text-center bg-gradient-to-r from-blue-500 to-blue-600 w-full max-w-4xl rounded-b-xl mx-auto">
```

Tailwind classes:

```css
relative
```

Positioning reference.

```css
shadow-lg
```

Large shadow effect.

```css
p-6
```

24px padding.

```css
md:p-8
```

32px padding on medium screens and larger.

```css
text-white
```

White text.

```css
text-center
```

Center align text.

```css
bg-gradient-to-r
```

Creates a left-to-right gradient.

```css
from-blue-500
```

Starting gradient color.

```css
to-blue-600
```

Ending gradient color.

```css
w-full
```

Take full width.

```css
max-w-4xl
```

Maximum width constraint.

```css
rounded-b-xl
```

Round bottom corners.

```css
mx-auto
```

Center horizontally.

---

### Title

```jsx
<h1 className="font-extrabold text-2xl md:text-3xl tracking-tight mb-1">
  {title}
</h1>
```

Displays the main application title.

Tailwind classes:

```css
font-extrabold
```

Extra bold text.

```css
text-2xl
```

Large text size.

```css
md:text-3xl
```

Larger text on medium screens.

```css
tracking-tight
```

Reduces letter spacing.

```css
mb-1
```

Small margin below the title.

---

### Subtitle

```jsx
<p className="text-blue-100 text-sm md:text-base font-normal max-w-md mx-auto">
  {subTitle}
</p>
```

Displays the application description.

Tailwind classes:

```css
text-blue-100
```

Light blue text color.

```css
text-sm
```

Small text.

```css
md:text-base
```

Normal text size on medium screens.

```css
font-normal
```

Normal font weight.

```css
max-w-md
```

Maximum width.

```css
mx-auto
```

Center horizontally.

---

### Export

```jsx
export default memo(Header);
```

### Explanation

Without `memo`:

```text
App Re-renders
      |
      V
Header Re-renders
```

With `memo`:

```text
App Re-renders
      |
      V
Props Changed?
      |
   No |
      V
Skip Render
```

Since the Header rarely changes, this improves performance.

---

### Project Structure So Far

```text
src/
├── components/
│   └── Header.jsx
├── context/
├── features/
├── hooks/
├── services/
├── styles/
├── types/
└── utils/
```

### Purpose

* `Header.jsx` displays the application title and subtitle.
* Uses Tailwind for styling.
* Uses `memo()` to avoid unnecessary re-renders.


