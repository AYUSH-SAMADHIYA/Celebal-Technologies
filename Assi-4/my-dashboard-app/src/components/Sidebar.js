import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import './Sidebar.css'; // We'll create this CSS file next

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sidebar">
      <div className="sidebar-header">ADMIN</div>
      <nav className="sidebar-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/kanban">Kanban</Link>
        <Link to="/charts">Charts</Link>
      </nav>
      <div className="sidebar-footer">
        <button className="theme-toggle-button" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </div>
  );
};

export default Sidebar;