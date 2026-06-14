// Before: status uses "pending" and "completed"
// After: business wants "todo" and "done"

// Without constants: find-replace in 50 files, hope nothing breaks
// With constants: change in one place

const TASK_STATUS = {
  PENDING: "todo",      // changed from "pending"
  COMPLETED: "done",    // changed from "completed"
};
// All code using TASK_STATUS.PENDING now uses "todo" automatically
