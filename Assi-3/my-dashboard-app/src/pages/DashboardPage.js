import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isFuture } from 'date-fns'; // For calendar event handling
import './PageStyles.css'; // Common page container styles
import './DashboardPage.css'; // Specific Dashboard styles

const DashboardPage = () => {
  const navigate = useNavigate();

  // State to hold data from localStorage
  const [userData, setUserData] = useState([]);
  const [kanbanData, setKanbanData] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  // --- Load data from localStorage on component mount ---
  useEffect(() => {
    // Load Users Data
    const storedUsers = localStorage.getItem('dashboardUsers');
    try {
      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
      setUserData(Array.isArray(parsedUsers) ? parsedUsers : []);
    } catch (e) {
      console.error("Error parsing users from localStorage:", e);
      setUserData([]);
    }

    // Load Kanban Tasks Data
    const storedKanbanTasks = localStorage.getItem('kanbanTasks');
    try {
      const parsedTasks = storedKanbanTasks ? JSON.parse(storedKanbanTasks) : [];
      setKanbanData(Array.isArray(parsedTasks) ? parsedTasks : []);
    } catch (e) {
      console.error("Error parsing kanban tasks from localStorage:", e);
      setKanbanData([]);
    }

    // Load Calendar Events Data
    const storedEvents = localStorage.getItem('dashboardEvents');
    try {
      let parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];
      if (Array.isArray(parsedEvents)) {
        // Convert event 'start' string back to Date objects
        parsedEvents = parsedEvents.map(event => ({
          ...event,
          start: new Date(event.start) // Assuming 'start' is ISO string from calendar page
        }));
        setCalendarEvents(parsedEvents);
      } else {
        setCalendarEvents([]);
      }
    } catch (e) {
      console.error("Error parsing calendar events from localStorage:", e);
      setCalendarEvents([]);
    }
  }, []); // Empty dependency array means this runs once on mount

  // --- Process Kanban Data ---
  const todoCount = kanbanData.filter(task => task.status === 'todo').length;
  const inProgressCount = kanbanData.filter(task => task.status === 'inprogress').length;
  const doneCount = kanbanData.filter(task => task.status === 'done').length;
  const totalTaskCount = kanbanData.length;

  // --- Process Calendar Events ---
  const now = new Date();
  const upcomingEvents = calendarEvents
    .filter(event => isFuture(event.start)) // Filter events in the future
    .sort((a, b) => a.start.getTime() - b.start.getTime()) // Sort by earliest date
    .slice(0, 4); // Get top 4

  return (
    <div className="page-container">
      <div className="dashboard-content">
        {/* Greeting Section */}
        <div className="greeting-section">
          <h1>Hello, Admin!</h1>
          <p>Welcome to your central hub. Here's a quick overview of your activities.</p>
        </div>

        {/* KPI Cards Section */}
        <div className="kpi-cards-container">

          {/* Card 1: Users */}
          <div className="kpi-card user-card" onClick={() => navigate('/users')}>
            <h2 className="card-title">👥 Total Users</h2>
            <p className="card-main-metric">{userData.length}</p>
            <div className="card-details">
              <h3>User Names:</h3>
              <ul className="user-list">
                {userData.length > 0 ? (
                  userData.map(user => <li key={user.id}>{user.name}</li>)
                ) : (
                  <li>No users found.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Card 2: Tasks from Kanban */}
          <div className="kpi-card task-card" onClick={() => navigate('/kanban')}>
            <h2 className="card-title">✅ Total Tasks</h2>
            <p className="card-main-metric">{totalTaskCount}</p>
            <div className="card-details">
              <h3>Task Breakdown:</h3>
              <ul>
                <li>New Tasks: <span>{todoCount}</span></li>
                <li>Ongoing Tasks: <span>{inProgressCount}</span></li>
                <li>Completed Tasks: <span>{doneCount}</span></li>
              </ul>
            </div>
          </div>

          {/* Card 3: Upcoming Events from Calendar */}
          <div className="kpi-card event-card" onClick={() => navigate('/calendar')}>
            <h2 className="card-title">🗓️ Upcoming Events</h2>
            <div className="card-details">
              {upcomingEvents.length > 0 ? (
                <ul className="event-list">
                  {upcomingEvents.map(event => (
                    <li key={event.id}>
                      <strong>{event.title}</strong>
                      <br />
                      <span className="event-date">
                        {format(event.start, 'MMM dd, yyyy @ p')}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming events.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;