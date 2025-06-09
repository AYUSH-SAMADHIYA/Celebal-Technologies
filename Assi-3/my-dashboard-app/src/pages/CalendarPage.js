import React, { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
} from 'date-fns';
import './PageStyles.css'; // For basic page container styling
import './CalendarPage.css'; // Specific calendar styles
import AddEventModal from '../components/modals/AddEventModal';
import ToastNotification from '../components/toast/ToastNotification';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('dashboardEvents');
    // Parse stored events and convert 'start' string back to Date objects
    return storedEvents ? JSON.parse(storedEvents).map(event => ({
      ...event,
      start: new Date(event.start)
    })) : [];
  });

  // State for Add Event Modal
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedDateForEvent, setSelectedDateForEvent] = useState(null);

  // State for Toast Notifications
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [showToast, setShowToast] = useState(false);

  // Persist events to local storage
  useEffect(() => {
    localStorage.setItem('dashboardEvents', JSON.stringify(events));
  }, [events]);

  // Toast handler
  const showToastNotification = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setToastMessage('');
  };

  // --- Calendar Navigation ---
  const goToPrevious = () => {
    if (viewMode === 'month') setCurrentDate(subMonths(currentDate, 1));
    else if (viewMode === 'week') setCurrentDate(subWeeks(currentDate, 1));
    else if (viewMode === 'day') setCurrentDate(subDays(currentDate, 1));
  };

  const goToNext = () => {
    if (viewMode === 'month') setCurrentDate(addMonths(currentDate, 1));
    else if (viewMode === 'week') setCurrentDate(addWeeks(currentDate, 1));
    else if (viewMode === 'day') setCurrentDate(addDays(currentDate, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // --- Event Management ---
  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: `e${Date.now()}` }]);
    showToastNotification(`Event "${newEvent.title}" added!`, 'success');
  };

  const deleteEvent = (eventId, eventTitle, e) => {
    e.stopPropagation(); // Prevent modal from opening if clicked on 'x'
    const confirmDelete = window.confirm(`Are you sure you want to delete event "${eventTitle}"?`);
    if (confirmDelete) {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        showToastNotification(`Event "${eventTitle}" deleted.`, 'success');
    } else {
        showToastNotification('Event deletion cancelled.', 'info');
    }
  };

  // --- Calendar Rendering Logic ---
  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <div className="calendar-nav-buttons">
          <button onClick={goToPrevious} className="calendar-button nav-button">&lt;</button>
          <button onClick={goToNext} className="calendar-button nav-button">&gt;</button>
          <button onClick={goToToday} className="calendar-button today-button">today</button>
        </div>
        <h2 className="calendar-title">
          {viewMode === 'month' && format(currentDate, 'MMMM yyyy')}
          {viewMode === 'week' && `Week of ${format(startOfWeek(currentDate, { weekStartsOn: 0 }), 'MMM dd')}`}
          {viewMode === 'day' && format(currentDate, 'EEEE, MMM dd, yyyy')}
        </h2>
        <div className="calendar-view-buttons">
          <button
            onClick={() => setViewMode('month')}
            className={`calendar-button ${viewMode === 'month' ? 'active' : ''}`}
          >
            month
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`calendar-button ${viewMode === 'week' ? 'active' : ''}`}
          >
            week
          </button>
          <button
            onClick={() => setViewMode('day')}
            className={`calendar-button ${viewMode === 'day' ? 'active' : ''}`}
          >
            day
          </button>
        </div>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="days-of-week-header">
        {days.map(day => <div key={day} className="day-name">{day}</div>)}
      </div>
    );
  };

  const renderMonthCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Start on Sunday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 }); // End on Saturday

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    const rows = [];
    let days = [];
    allDays.forEach((day, index) => {
      const dayEvents = events.filter(event => isSameDay(event.start, day));
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isTodayDay = isToday(day);

      days.push(
        <div
          key={day.toISOString()}
          className={`calendar-day-cell ${!isCurrentMonth ? 'other-month' : ''} ${isTodayDay ? 'today-cell' : ''}`}
          onClick={() => { // Open modal to add event on cell click
            setSelectedDateForEvent(day);
            setShowAddEventModal(true);
          }}
        >
          <span className="day-number">{format(day, 'd')}</span>
          <div className="day-events">
            {dayEvents.map(event => (
              <div key={event.id} className="event-item">
                <span className="event-title">{event.title}</span>
                <button
                  className="event-delete-button"
                  onClick={(e) => deleteEvent(event.id, event.title, e)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      );

      if ((index + 1) % 7 === 0) {
        rows.push(<div className="calendar-week-row" key={`row-${index}`}>{days}</div>);
        days = [];
      }
    });

    return <div className="calendar-grid">{rows}</div>;
  };

  // Basic Week View (simplified, only current week's events)
  const renderWeekCells = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="calendar-week-view">
        {weekDays.map(day => {
          const dayEvents = events.filter(event => isSameDay(event.start, day));
          const isTodayDay = isToday(day);
          return (
            <div
              key={day.toISOString()}
              className={`week-day-column ${isTodayDay ? 'today-column' : ''}`}
              onClick={() => {
                setSelectedDateForEvent(day);
                setShowAddEventModal(true);
              }}
            >
              <div className="week-day-header">
                <div className="day-name">{format(day, 'EEE')}</div>
                <div className="day-number">{format(day, 'd')}</div>
              </div>
              <div className="day-events">
                {dayEvents.map(event => (
                  <div key={event.id} className="event-item">
                    <span className="event-title">{event.title}</span>
                    <button
                      className="event-delete-button"
                      onClick={(e) => deleteEvent(event.id, event.title, e)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Basic Day View (simplified)
  const renderDayCells = () => {
    const dayEvents = events.filter(event => isSameDay(event.start, currentDate));
    const isTodayDay = isToday(currentDate);

    return (
      <div className="calendar-day-view">
        <div
          className={`day-column ${isTodayDay ? 'today-column' : ''}`}
          onClick={() => {
            setSelectedDateForEvent(currentDate);
            setShowAddEventModal(true);
          }}
        >
          <div className="day-column-header">
            <div className="day-name">{format(currentDate, 'EEEE')}</div>
            <div className="day-number">{format(currentDate, 'd')}</div>
          </div>
          <div className="day-events">
            {dayEvents.length > 0 ? (
              dayEvents.map(event => (
                <div key={event.id} className="event-item">
                  <span className="event-time">{format(event.start, 'p')}</span>
                  <span className="event-title">{event.title}</span>
                  <button
                    className="event-delete-button"
                    onClick={(e) => deleteEvent(event.id, event.title, e)}
                  >
                    &times;
                  </button>
                </div>
              ))
            ) : (
              <p>No events today.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="calendar-page-content">
        <h1 className="page-title">Calendar Page</h1>
        {renderHeader()}
        {viewMode === 'month' && renderDaysOfWeek()}
        {viewMode === 'month' && renderMonthCells()}
        {viewMode === 'week' && renderWeekCells()}
        {viewMode === 'day' && renderDayCells()}
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        onAddEvent={addEvent}
        initialDate={selectedDateForEvent}
      />

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default CalendarPage;