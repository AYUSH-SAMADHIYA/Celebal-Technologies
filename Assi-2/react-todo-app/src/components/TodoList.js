import React, { useState, useEffect } from 'react';
import { TransitionGroup } from 'react-transition-group';
import TodoItem from './TodoItem'; 
import './TodoList.css'; 

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest'); 

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('workflowTasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('workflowTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') {
      setError('Task cannot be empty.');
      return;
    }
    if (tasks.some(task => task.text.toLowerCase() === newTask.trim().toLowerCase())) {
        setError('This task already exists.');
        return;
    }

    const newTodo = {
      id: Date.now(),
      text: newTask.trim(),
      status: 'new', 
      createdAt: new Date().toISOString(), 
    };
    setTasks([...tasks, newTodo]);
    setNewTask('');
    setError('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
    setError(''); 
  };

  const getFilteredAndSortedTasks = () => {
    let filteredTasks = tasks;

    // Filtering based on status
    if (filter !== 'all') {
      filteredTasks = tasks.filter(task => task.status === filter);
    }

    return filteredTasks.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOrder === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOrder === 'alphabetical') {
        return a.text.localeCompare(b.text);
      }
      return 0;
    });
  };

  const displayedTasks = getFilteredAndSortedTasks();

  const showNoTasksMessage = tasks.length === 0 && !error;
  const showNoMatchingFilterMessage = displayedTasks.length === 0 && tasks.length > 0 && !error;


  return (
    <div className="todo-list-container">
      <form onSubmit={addTask} className="task-input-form">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      <div className="controls">
        <div className="filter-controls">
          <label htmlFor="filter" className="control-label">Show: </label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="select-control">
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="sort-controls">
          <label htmlFor="sort" className="control-label">Sort by: </label>
          <select id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="select-control">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      <TransitionGroup component="ul" className="task-list">
        {showNoTasksMessage ? (
          <p className="no-tasks-message"></p>
        ) : showNoMatchingFilterMessage ? (
          <p className="no-tasks-message">No tasks matching current filter.</p>
        ) : (
          displayedTasks.map(task => (
            <TodoItem
              key={task.id} 
              task={task}
              updateTaskStatus={updateTaskStatus} 
              removeTask={removeTask}
            />
          ))
        )}
      </TransitionGroup>
    </div>
  );
}

export default TodoList;