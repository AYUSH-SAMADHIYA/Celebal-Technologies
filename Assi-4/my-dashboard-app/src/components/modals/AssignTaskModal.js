import React, { useState } from 'react';
import './Modal.css'; // Common modal styles

const AssignTaskModal = ({ isOpen, onClose, onAssignTask, user }) => {
  const [taskName, setTaskName] = useState('');
  const [taskProject, setTaskProject] = useState('General'); // Default project

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAssignTask(user.id, taskName.trim(), taskProject);
      setTaskName(''); // Clear input
      setTaskProject('General'); // Reset project
      onClose(); // Close modal
    } else {
      alert('Task name cannot be empty!'); // Fallback alert for empty input
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Assign Task to {user ? user.name : 'User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <input
              type="text"
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskProject">Project:</label>
            <input
              type="text"
              id="taskProject"
              value={taskProject}
              onChange={(e) => setTaskProject(e.target.value)}
              placeholder="e.g., Marketing, Development"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button-primary">
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTaskModal;