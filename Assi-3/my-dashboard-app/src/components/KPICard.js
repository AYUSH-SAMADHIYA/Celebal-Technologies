import React from 'react';
import './KPICard.css'; // For basic styling of the card

function KPICard({ title, value, icon }) {
  return (
    <div className="kpi-card">
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default KPICard;