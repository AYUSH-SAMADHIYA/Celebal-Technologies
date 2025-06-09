import React, { useEffect, useState } from 'react';
import './ToastNotification.css'; // Toast-specific styles

const ToastNotification = ({ message, type, show, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast-container ${type} ${visible ? 'show' : ''}`}>
      <p>{message}</p>
      <button className="toast-close-button" onClick={() => { setVisible(false); if(onClose) onClose(); }}>
        &times;
      </button>
    </div>
  );
};

export default ToastNotification;