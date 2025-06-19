import React, { useState } from 'react';
import { format } from 'date-fns'; // Import format from date-fns
import './Modal.css';

const AddEventModal = ({ isOpen, onClose, onAddEvent, initialDate }) => {
  const [eventName, setEventName] = useState('');
  // Format initialDate to 'YYYY-MM-DD' for input type="date"
  const [eventDate, setEventDate] = useState(initialDate ? format(initialDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'));
  const [eventTime, setEventTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName.trim() && eventDate) {
      // Combine date and time if time is provided
      const fullDateTime = eventTime ? `${eventDate}T${eventTime}` : eventDate;
      onAddEvent({
        title: eventName.trim(),
        start: new Date(fullDateTime), // Create Date object from string
      });
      setEventName('');
      setEventDate(format(new Date(), 'yyyy-MM-dd')); // Reset to current date
      setEventTime('');
      onClose();
    } else {
      alert('Event name and date cannot be empty!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., Team Meeting"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">Date:</label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventTime">Time (Optional):</label>
            <input
              type="time"
              id="eventTime"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button-primary">
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;