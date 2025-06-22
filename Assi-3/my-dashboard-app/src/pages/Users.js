// src/pages/Users.js

import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const dummyUsers = [
          { id: 101, name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Admin' },
          { id: 102, name: 'Bob Williams', email: 'bob.w@example.com', role: 'Editor' },
          { id: 103, name: 'Charlie Davis', email: 'charlie.d@example.com', role: 'Viewer' },
          { id: 104, name: 'Diana Miller', email: 'diana.m@example.com', role: 'Editor' },
          { id: 105, name: 'Eve Brown', email: 'eve.b@example.com', role: 'Viewer' },
        ];
        await new Promise(resolve => setTimeout(resolve, 500));
        setUsers(dummyUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Inline styles are generally less ideal for theming.
  // Consider moving these to a Users.css file to use CSS variables.
  const tableHeaderStyle = {
    border: '1px solid var(--border-color)', // Example: if moved to CSS
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'var(--heading-color)', // Example: if moved to CSS
  };

  const tableCellStyle = {
    border: '1px solid var(--border-color)', // Example: if moved to CSS
    padding: '10px 15px',
    textAlign: 'left',
    color: 'var(--text-color)', // Example: if moved to CSS
  };

  const actionButtonStyle = {
    padding: '6px 12px',
    marginRight: '8px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff', // Keep specific colors for actions or define variables
    color: 'white',
    transition: 'background-color 0.2s ease',
  };

  if (isLoading) {
    return <div className="users-page"><h2>Users Management</h2><p>Loading users...</p></div>;
  }

  if (error) {
    return <div className="users-page"><h2>Users Management</h2><p style={{ color: 'red' }}>Error: {error}</p></div>;
  }

  return (
    <div className="users-page" style={{ padding: '20px' }}> {/* Add padding to the page */}
      <h2>Users Management</h2>
      <div style={{
        backgroundColor: 'var(--card-background)', // Use variable
        borderRadius: '8px',
        boxShadow: '0 2px 4px var(--box-shadow-medium)', // Use variable
        overflowX: 'auto',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease' // Add transition
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--kanban-column-bg)' }}> {/* Using a relevant variable for header row */}
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Role</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}> {/* Use variable */}
                <td style={tableCellStyle}>{user.id}</td>
                <td style={tableCellStyle}>{user.name}</td>
                <td style={tableCellStyle}>{user.email}</td>
                <td style={tableCellStyle}>{user.role}</td>
                <td style={tableCellStyle}>
                  <button style={actionButtonStyle}>Edit</button>
                  <button style={{...actionButtonStyle, backgroundColor: '#e74c3c'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Add New User
      </button>
    </div>
  );
}

export default Users;