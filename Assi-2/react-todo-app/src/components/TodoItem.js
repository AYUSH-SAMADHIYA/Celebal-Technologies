import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const TodoItem = ({ task, updateTaskStatus, removeTask }) => { // Removed toggleComplete
  const nodeRef = useRef(null);

  const handleStatusChange = (e) => {
    updateTaskStatus(task.id, e.target.value);
  };

  // Determine class based on status for styling
  const statusClass = `task-status-${task.status}`;

  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={300}
      classNames="task-item-anim"
    >
      <li ref={nodeRef} className={`task-item ${statusClass}`}>
        <span
          className="task-text"
          // Tooltip to indicate current status
          title={`Status: ${task.status.charAt(0).toUpperCase() + task.status.slice(1)}`}
        >
          {task.text}
        </span>

        <div className="task-actions">
          <select value={task.status} onChange={handleStatusChange} className="status-select">
            <option value="new">New</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={() => removeTask(task.id)} className="remove-task-btn" title="Remove Task">
            &times;
          </button>
        </div>
      </li>
    </CSSTransition>
  );
};

export default TodoItem;