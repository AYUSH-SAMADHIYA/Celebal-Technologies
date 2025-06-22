import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import CalendarPage from './pages/Calendar';
import Users from './pages/Users';
import Charts from './pages/Charts';
import { ThemeProvider, useTheme } from './contexts/ThemeContext'; // Import ThemeProvider and useTheme
import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Global Calendar styles

// ThemeToggle component for the sidebar
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-toggle-container">
      <label className="switch">
        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
      <span className="theme-label">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
      <Router>
        <div className="App">
          <nav className="sidebar">
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/kanban">Kanban</Link></li>
              <li><Link to="/calendar">Calendar</Link></li>
              <li><Link to="/users">Users</Link></li>
              <li><Link to="/charts">Charts</Link></li>
            </ul>
            {/* Add the theme toggle to the sidebar */}
            <ThemeToggle />
          </nav>

          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/users" element={<Users />} />
              <Route path="/charts" element={<Charts />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;