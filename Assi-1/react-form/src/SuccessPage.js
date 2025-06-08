import React from 'react';
import { useLocation } from 'react-router-dom';
import './SuccessPage.css';

export default function SuccessPage() {
  const { state } = useLocation();

  return (
    <div className="success-container">
  <h2>Form Submitted Successfully!</h2>
  <p><span className="highlight">Name:</span> {state.firstName} {state.lastName}</p>
  <p><span className="highlight">Username:</span> {state.username}</p>
  <p><span className="highlight">Email:</span> {state.email}</p>
  <p><span className="highlight">Phone:</span> {state.phoneCode} {state.phoneNumber}</p>
  <p><span className="highlight">Country:</span> {state.country}</p>
  <p><span className="highlight">City:</span> {state.city}</p>
  <p><span className="highlight">PAN:</span> {state.pan}</p>
  <p><span className="highlight">Aadhar:</span> {state.aadhar}</p>
</div>

  );
}
