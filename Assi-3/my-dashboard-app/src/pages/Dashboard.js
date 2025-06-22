import React from 'react';
import KPICard from '../components/KPICard'; // You'll create this component

function Dashboard() {
  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <div className="kpi-cards-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '50px' }}>
        <KPICard title="Total Users" value="1,234" icon="📊" /> {/* Example icon */}
        <KPICard title="Pending Tasks" value="78" icon="✅" />
        <KPICard title="Upcoming Events" value="12" icon="📅" />
      </div>
      {/* You can add more dashboard elements here, like recent activities, quick links etc. */}
    </div>
  );
}

export default Dashboard;