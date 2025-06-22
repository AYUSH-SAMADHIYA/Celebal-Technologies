// src/pages/Calendar.js

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'; 

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Sync Meeting',
      start: new Date(2025, 5, 24, 10, 0, 0), 
      end: new Date(2025, 5, 24, 11, 0, 0),
    },
    {
      id: 2,
      title: 'Project Deadline',
      start: new Date(2025, 5, 26),
      end: new Date(2025, 5, 26),
      allDay: true,
    },
    {
      id: 3,
      title: 'Client Demo',
      start: new Date(2025, 6, 1, 14, 0, 0),
      end: new Date(2025, 6, 1, 15, 30, 0),
    },
    {
      id: 4,
      title: 'Sprint Planning',
      start: new Date(2025, 6, 5, 9, 0, 0),
      end: new Date(2025, 6, 5, 12, 0, 0),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Event Name:');
    if (title) {
      setEvents(prevEvents => [
        ...prevEvents,
        {
          start,
          end,
          title,
          id: prevEvents.length ? Math.max(...prevEvents.map(e => e.id)) + 1 : 1,
        },
      ]);
    }
  };

  const handleSelectEvent = (event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      setEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
    }
  };

  return (
    <div className="calendar-page" style={{ padding: '20px' }}>
      <h2>Calendar</h2>
      <div style={{
        height: '700px', 
        margin: '20px 0',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start" 
          endAccessor="end"     
          style={{ height: '100%', width: '100%', padding: '10px' }} 
          selectable 
          onSelectSlot={handleSelectSlot} 
          onSelectEvent={handleSelectEvent} 
          defaultView='month' 
          views={['month', 'week', 'day', 'agenda']} 
          popup 
        />
      </div>
    </div>
  );
};

export default CalendarPage;