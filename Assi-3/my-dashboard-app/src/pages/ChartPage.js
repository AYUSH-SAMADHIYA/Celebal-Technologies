import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell,
   LineChart, Line, AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './PageStyles.css'; // For basic page container styling
import './ChartPage.css'; // Specific Chart page styles

const ChartPage = () => {
  const [selectedChart, setSelectedChart] = useState('pie'); // Default chart view
  const [kanbanTasks, setKanbanTasks] = useState([]);
  const [users, setUsers] = useState([]);

  // --- Data Loading from LocalStorage ---
  useEffect(() => {
    // Load Kanban Tasks
    const storedKanbanTasks = localStorage.getItem('kanbanTasks');
    try {
      const parsedTasks = storedKanbanTasks ? JSON.parse(storedKanbanTasks) : [];
      setKanbanTasks(Array.isArray(parsedTasks) ? parsedTasks : []);
    } catch (e) {
      console.error("Error parsing kanban tasks from localStorage:", e);
      setKanbanTasks([]);
    }

    // Load Users
    const storedUsers = localStorage.getItem('dashboardUsers');
    try {
      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
      setUsers(Array.isArray(parsedUsers) ? parsedUsers : []);
    } catch (e) {
      console.error("Error parsing users from localStorage:", e);
      setUsers([]);
    }
  }, []); // Run once on component mount

  // --- Data Preparation for Charts ---

  // 1. Pie Chart Data (Task Status)
  const taskStatusData = [
    { name: 'New', value: kanbanTasks.filter(task => task.status === 'todo').length },
    { name: 'Ongoing', value: kanbanTasks.filter(task => task.status === 'inprogress').length },
    { name: 'Completed', value: kanbanTasks.filter(task => task.status === 'done').length },
  ].filter(item => item.value > 0); // Only show segments with values

  const PIE_COLORS = ['#FFBB28', '#FF8042', '#00C49F']; // Colors for New, Ongoing, Completed

  // 2. Bar Chart Data (User and Assigned Tasks)
  // This assumes your kanbanTasks have an 'assignedTo' property with user IDs.
  // If your Kanban tasks do not have 'assignedTo' after reverting changes,
  // this chart will show 0 for all users unless you update your KanbanPage.js
  // to include assignment functionality again.
  const userTaskData = users.map(user => {
    const assignedTaskCount = kanbanTasks.filter(task => Number(task.assignedTo) === user.id).length;
    return {
      name: user.name,
      tasksAssigned: assignedTaskCount,
    };
  });
  // Filter out users with 0 tasks if you prefer, or show all. Here, showing all.

  // 3. Line/Area Chart Data (Example: Monthly Progress or Feature Completion Rate)
  // Using dummy data for demonstration, as no specific data source is given.
  // You can replace this with real data over time if available.
  const monthlyProgressData = [
    { month: 'Jan', 'Tasks Completed': 30, 'New Features': 5 },
    { month: 'Feb', 'Tasks Completed': 45, 'New Features': 7 },
    { month: 'Mar', 'Tasks Completed': 60, 'New Features': 10 },
    { month: 'Apr', 'Tasks Completed': 50, 'New Features': 8 },
    { month: 'May', 'Tasks Completed': 70, 'New Features': 12 },
    { month: 'Jun', 'Tasks Completed': 85, 'New Features': 15 },
  ];

  return (
    <div className="page-container">
      <div className="chart-page-content">
        <h1 className="page-title">Charts Overview</h1>

        {/* Chart Selection Bar */}
        <div className="chart-selector-bar">
          <button
            className={selectedChart === 'pie' ? 'active' : ''}
            onClick={() => setSelectedChart('pie')}
          >
            Pie Chart
          </button>
          <button
            className={selectedChart === 'bar' ? 'active' : ''}
            onClick={() => setSelectedChart('bar')}
          >
            Bar Chart
          </button>
          <button
            className={selectedChart === 'line' ? 'active' : ''}
            onClick={() => setSelectedChart('line')}
          >
            Line Chart
          </button>
          <button
            className={selectedChart === 'area' ? 'active' : ''}
            onClick={() => setSelectedChart('area')}
          >
            Area Chart
          </button>
        </div>

        {/* Chart Display Area */}
        <div className="chart-display-area">
          {selectedChart === 'pie' && (
            <div className="chart-container">
              <h2>Task Status Distribution</h2>
              {taskStatusData.length === 0 ? (
                <div className="no-chart-data-message">No tasks to display in the Pie Chart.</div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <p className="chart-description">Shows the breakdown of tasks by their current status (New, Ongoing, Completed).</p>
            </div>
          )}

          {selectedChart === 'bar' && (
            <div className="chart-container">
              <h2>Tasks Assigned Per User</h2>
              {userTaskData.every(user => user.tasksAssigned === 0) && userTaskData.length > 0 ? (
                <div className="no-chart-data-message">No tasks assigned to users. (Requires 'assignedTo' field in Kanban tasks).</div>
              ) : userTaskData.length === 0 ? (
                 <div className="no-chart-data-message">No user data to display.</div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={userTaskData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={getComputedStyle(document.documentElement).getPropertyValue('--border-color')} />
                    <XAxis dataKey="name" stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-secondary-color')} />
                    <YAxis stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-secondary-color')} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Legend />
                    <Bar dataKey="tasksAssigned" fill="#8884d8" name="Tasks Assigned" />
                  </BarChart>
                </ResponsiveContainer>
              )}
              <p className="chart-description">Displays the number of tasks assigned to each user.</p>
            </div>
          )}

          {selectedChart === 'line' && (
            <div className="chart-container">
              <h2>Monthly Progress Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={monthlyProgressData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={getComputedStyle(document.documentElement).getPropertyValue('--border-color')} />
                  <XAxis dataKey="month" stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-secondary-color')} />
                  <YAxis stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-secondary-color')} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Tasks Completed" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="New Features" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
              <p className="chart-description"></p>
            </div>
          )}

          {selectedChart === 'area' && (
            <div className="chart-container">
              <h2>Feature Completion Rate</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={monthlyProgressData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={getComputedStyle(document.documentElement).getPropertyValue('--border-color')} />
                  <XAxis dataKey="month" stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-secondary-color')} />
                  <YAxis stroke={getComputedStyle(document.documentElement).getPropertyValue('--text-secondary-color')} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Tasks Completed" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="New Features" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
              <p className="chart-description"></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartPage;