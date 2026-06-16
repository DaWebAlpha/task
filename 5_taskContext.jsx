import { useState } from "react";
import { TaskProvider, useTasks } from "./context/taskContext";

const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9);

const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high"
};

const TASK_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed"
};

// Inner component that uses the context
function TaskApp() {
  const { 
    tasks, 
    addTask, 
    editTask, 
    toggleTask, 
    deleteTask,
    bulkDelete,
    bulkToggle,
    bulkUpdatePriority,
    filter,
    setFilter,
    search,
    setSearch,
    selectedIds,
    selectTask,
    selectAll,
    deselectAll
  } = useTasks();

  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    priority: TASK_PRIORITY.MEDIUM, 
    dueDate: '' 
  });
  
  const [editingId, setEditingId] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    
    addTask({
      id: generateId(),
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate,
      status: TASK_STATUS.PENDING,
      createdAt: new Date().toISOString()
    });
    
    setForm({ title: '', description: '', priority: TASK_PRIORITY.MEDIUM, dueDate: '' });
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate || ''
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editTask(editingId, {
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate
    });
    setEditingId(null);
    setForm({ title: '', description: '', priority: TASK_PRIORITY.MEDIUM, dueDate: '' });
  };

  const getPriorityColor = (priority) => {
    if (priority === TASK_PRIORITY.LOW) return "bg-green-500";
    if (priority === TASK_PRIORITY.MEDIUM) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (status) => {
    if (status === TASK_STATUS.COMPLETED) return "bg-green-100 text-green-800";
    return "bg-blue-100 text-blue-800";
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Task Manager</h1>
        
        <div className="flex gap-4 mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select 
            value={filter.status} 
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          
          <select 
            value={filter.priority} 
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Add/Edit Form */}
      <form onSubmit={editingId ? handleUpdate : handleAdd} className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Task title"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value={TASK_PRIORITY.LOW}>Low Priority</option>
            <option value={TASK_PRIORITY.MEDIUM}>Medium Priority</option>
            <option value={TASK_PRIORITY.HIGH}>High Priority</option>
          </select>
          <div className="flex gap-2">
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => { 
                  setEditingId(null); 
                  setForm({ title: '', description: '', priority: TASK_PRIORITY.MEDIUM, dueDate: '' }); 
                }} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 flex items-center gap-3">
          <span className="text-sm font-medium text-blue-900">{selectedIds.length} selected</span>
          <button 
            onClick={() => bulkToggle(selectedIds)} 
            className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
          >
            Toggle
          </button>
          <button 
            onClick={() => bulkUpdatePriority(selectedIds, TASK_PRIORITY.HIGH)} 
            className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm hover:bg-red-100 transition-colors"
          >
            High
          </button>
          <button 
            onClick={() => bulkUpdatePriority(selectedIds, TASK_PRIORITY.MEDIUM)} 
            className="px-3 py-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md text-sm hover:bg-yellow-100 transition-colors"
          >
            Medium
          </button>
          <button 
            onClick={() => bulkUpdatePriority(selectedIds, TASK_PRIORITY.LOW)} 
            className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-md text-sm hover:bg-green-100 transition-colors"
          >
            Low
          </button>
          <button 
            onClick={() => bulkDelete(selectedIds)} 
            className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
          <button 
            onClick={deselectAll} 
            className="ml-auto text-sm text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        </div>
      )}

      {/* Select All */}
      {tasks.length > 0 && (
        <div className="flex items-center gap-3 mb-4 px-2">
          <input 
            type="checkbox" 
            onChange={selectAll} 
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Select all visible</span>
          <button 
            onClick={deselectAll} 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear
          </button>
        </div>
      )}

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className={`bg-white rounded-lg shadow-md p-4 border-2 transition-all ${
              selectedIds.includes(task.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:shadow-lg'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <input
                type="checkbox"
                checked={selectedIds.includes(task.id)}
                onChange={() => selectTask(task.id)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-lg truncate ${
                  task.status === TASK_STATUS.COMPLETED ? 'line-through text-gray-400' : 'text-gray-800'
                }`}>
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 rounded-md text-sm text-white font-medium capitalize ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className={`px-3 py-1 rounded-md text-sm font-medium capitalize ${getStatusBadge(task.status)}`}>
                {task.status}
              </span>
              {task.dueDate && (
                <span className={`px-3 py-1 rounded-md text-sm ${
                  new Date(task.dueDate) < new Date() && task.status !== TASK_STATUS.COMPLETED 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button 
                onClick={() => toggleTask(task.id)} 
                className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                {task.status === TASK_STATUS.COMPLETED ? 'Undo' : 'Complete'}
              </button>
              <button 
                onClick={() => handleEdit(task)} 
                className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteTask(task.id)} 
                className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm mt-4">
          <p className="text-lg font-medium text-gray-500">No tasks found</p>
          <p className="text-sm text-gray-400 mt-1">Add a task to get started</p>
        </div>
      )}
    </div>
  );
}

// Root component wraps with Provider
function App() {
  return (
    <TaskProvider>
      <TaskApp />
    </TaskProvider>
  );
}

export default App;
