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

