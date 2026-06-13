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
