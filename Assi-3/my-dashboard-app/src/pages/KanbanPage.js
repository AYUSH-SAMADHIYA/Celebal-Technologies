import React, { useState, useEffect } from 'react';
import './PageStyles.css'; // Common page container styles
import './KanbanPage.css'; // Specific Kanban board styles
import ToastNotification from '../components/toast/ToastNotification'; // Reusing Toast

// Reusable Kanban Column Component - MOVED OUTSIDE KanbanPage
const KanbanColumn = ({ title, status, columnTasks, handleMoveTask, handleDeleteTask }) => (
    <div className="kanban-column">
      <h3 className="column-title">{title}</h3>
      <div className="task-list">
        {columnTasks.map(task => (
          <div key={task.id} className="kanban-task-card">
            <span className="task-title">{task.title}</span>
            <div className="task-actions">
              {status !== 'todo' && (
                <button
                  className="move-left-button"
                  onClick={(e) => { e.stopPropagation(); handleMoveTask(task.id, 'left'); }}
                  title="Move Left"
                >
                  &#9664; {/* Left arrow */}
                </button>
              )}
              {status !== 'done' && (
                <button
                  className="move-right-button"
                  onClick={(e) => { e.stopPropagation(); handleMoveTask(task.id, 'right'); }}
                  title="Move Right"
                >
                  &#9654; {/* Right arrow */}
                </button>
              )}
              <button
                className="delete-task-button"
                onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id, task.title); }}
                title="Delete Task"
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
);


const KanbanPage = () => {
  // Load tasks from localStorage or use initial dummy data
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('kanbanTasks');
    try {
      const parsedTasks = storedTasks ? JSON.parse(storedTasks) : null;
      // Ensure parsedTasks is an array, otherwise fall back to initial data
      if (Array.isArray(parsedTasks)) {
        return parsedTasks;
      }
    } catch (e) {
      // If parsing fails (e.g., invalid JSON), log error and use initial data
      console.error("Error parsing tasks from localStorage:", e);
    }
    // Fallback to initial dummy data if localStorage is empty, invalid, or parsing failed
    return [
      { id: 'k1', title: 'Setup project repository', status: 'todo' },
      { id: 'k2', title: 'Design user interface', status: 'inprogress' },
      { id: 'k3', title: 'Implement login page', status: 'done' },
      { id: 'k4', title: 'Write API documentation', status: 'done' },
    ];
  });
  const [newTaskInput, setNewTaskInput] = useState('');

  // State for Toast Notifications
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info'); // 'success', 'error', 'info'
  const [showToast, setShowToast] = useState(false);

  // Persist tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Toast handler
  const showToastNotification = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setToastMessage('');
  };

  // --- Add Task ---
  const handleAddTask = () => {
    if (newTaskInput.trim() === '') {
      showToastNotification('Task name cannot be empty!', 'error');
      return;
    }
    const newTask = {
      id: `k${Date.now()}`, // Unique ID for the task
      title: newTaskInput.trim(),
      status: 'todo', // New tasks start in 'To Do' column
    };
    setTasks([...tasks, newTask]);
    setNewTaskInput(''); // Clear input field
    showToastNotification('Task added successfully!', 'success');
  };

  // --- Delete Task ---
  const handleDeleteTask = (taskId, taskTitle) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete task "${taskTitle}"?`);
    if (confirmDelete) {
      setTasks(tasks.filter(task => task.id !== taskId));
      showToastNotification(`Task "${taskTitle}" deleted.`, 'success');
    } else {
      showToastNotification(`Deletion of "${taskTitle}" cancelled.`, 'info');
    }
  };

  // --- Move Task (Modify Status) ---
  const handleMoveTask = (taskId, direction) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        let newStatus = task.status;
        if (direction === 'right') {
          if (task.status === 'todo') newStatus = 'inprogress';
          else if (task.status === 'inprogress') newStatus = 'done';
        } else if (direction === 'left') {
          if (task.status === 'done') newStatus = 'inprogress';
          else if (task.status === 'inprogress') newStatus = 'todo';
        }
        showToastNotification(`Task "${task.title}" moved to ${newStatus.replace('todo', 'To Do').replace('inprogress', 'In Progress').replace('done', 'Done')}.`, 'info');
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  // Filter tasks for each column
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="page-container">
      <div className="kanban-board-content">
        <h1 className="kanban-board-title">Kanban Board</h1>

        <div className="add-task-section">
          <input
            type="text"
            className="new-task-input"
            placeholder="Enter new task"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTask();
              }
            }}
          />
          <button className="add-task-button" onClick={handleAddTask}>
            Add Task
          </button>
        </div>

        <div className="kanban-columns-container">
          {/* Pass handlers as props to KanbanColumn */}
          <KanbanColumn
            title="To Do"
            status="todo"
            columnTasks={todoTasks}
            handleMoveTask={handleMoveTask}
            handleDeleteTask={handleDeleteTask}
          />
          <KanbanColumn
            title="In Progress"
            status="inprogress"
            columnTasks={inProgressTasks}
            handleMoveTask={handleMoveTask}
            handleDeleteTask={handleDeleteTask}
          />
          <KanbanColumn
            title="Done"
            status="done"
            columnTasks={doneTasks}
            handleMoveTask={handleMoveTask}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default KanbanPage;