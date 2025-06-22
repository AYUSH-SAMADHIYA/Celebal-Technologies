import React, { useState } from 'react';
import './Kanban.css'; // We'll create this CSS file

const Kanban = () => {
  const [tasks, setTasks] = useState([
    { id: '1', column: 'todo', title: 'Design Landing Page', description: 'Create mockups for the new website landing page.' },
    { id: '2', column: 'inprogress', title: 'Develop User Authentication', description: 'Implement JWT-based authentication for user login.' },
    { id: '3', column: 'todo', title: 'Set up Database', description: 'Configure PostgreSQL database and initial schemas.' },
    { id: '4', column: 'done', title: 'Write API Documentation', description: 'Document all REST API endpoints with examples.' },
    { id: '5', column: 'inprogress', title: 'Refactor old code', description: 'Improve performance of legacy components.' },
  ]);

  const columns = {
    todo: {
      name: 'To Do',
      color: '#e74c3c', // Red
    },
    inprogress: {
      name: 'In Progress',
      color: '#f39c12', // Orange
    },
    done: {
      name: 'Done',
      color: '#27ae60', // Green
    },
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('taskId', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allows drop
  };

  const handleDrop = (e, targetColumn) => {
    const taskId = e.dataTransfer.getData('taskId');
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, column: targetColumn } : task
      )
    );
  };

  return (
    <div className="kanban-page">
      <h2>Kanban Board</h2>
      <div className="kanban-board-container">
        {Object.keys(columns).map(columnKey => (
          <div
            key={columnKey}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnKey)}
          >
            <h3 style={{ backgroundColor: columns[columnKey].color }}>
              {columns[columnKey].name} ({tasks.filter(task => task.column === columnKey).length})
            </h3>
            <div className="kanban-tasks">
              {tasks
                .filter(task => task.column === columnKey)
                .map(task => (
                  <div
                    key={task.id}
                    className="kanban-card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                  </div>
                ))}
              {tasks.filter(task => task.column === columnKey).length === 0 && (
                <div className="kanban-empty-slot">Drop tasks here</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;