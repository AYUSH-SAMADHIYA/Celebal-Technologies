import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Kanban from './pages/Kanban';
import Calendar from './pages/Calendar';
import Users from './pages/Users'; // Renamed from 'User' to 'Users' for better pluralization
import Charts from './pages/Charts';
import './App.css'; // For basic styling
import 'react-big-calendar/lib/css/react-big-calendar.css'; // <--- THIS IS CRUCIAL!


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="sidebar"> {/* You can style this as a sidebar */}
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/kanban">Kanban</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/charts">Charts</Link></li>
          </ul>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/users" element={<Users />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;