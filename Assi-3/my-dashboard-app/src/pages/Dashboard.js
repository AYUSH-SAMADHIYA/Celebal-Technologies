import React from 'react';
import KPICard from '../components/KPICard';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <h2>Dashboard Overview</h2>
      <div className="kpi-cards-container">
        <KPICard title="Total Users" value="1,234" icon="👨‍💻" />
        <KPICard title="Pending Tasks" value="78" icon="📝" />
        <KPICard title="Upcoming Events" value="12" icon="🗓️" />
      </div>
      <div style={{
        marginTop: '50px',
        padding: '20px',
        backgroundColor: 'var(--card-background)', // Use variable
        borderRadius: '8px',
        boxShadow: '0 2px 4px var(--box-shadow-medium)', // Use variable
        color: 'var(--text-color)', // Use variable
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease'
      }}>
        <h3>Welcome Back!</h3>
        <p>This is your central hub for managing tasks, users, and events. Navigate using the sidebar.</p>
      </div>
    </div>
  );
}

export default Dashboard;