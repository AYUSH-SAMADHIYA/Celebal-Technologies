import React, { useState, useEffect } from 'react';
import './PageStyles.css'; // Common page styles
import './UserPage.css'; // User specific styles
import AddUserModal from '../components/modals/AddUserModal';
import AssignTaskModal from '../components/modals/AssignTaskModal';
import ToastNotification from '../components/toast/ToastNotification';

// Dummy Data (no change here)
const initialUsers = [
  { id: 1, name: 'Alice', tasks: [] },
  { id: 2, name: 'Bob', tasks: [] },
  { id: 3, name: 'Charlie', tasks: [] },
  { id: 4, name: 'Diana', tasks: [] },
];

const UserPage = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('dashboardUsers');
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // State for Modals (no change here)
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [userToAssignTask, setUserToAssignTask] = useState(null);

  // State for Toast Notifications (no change here)
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [showToast, setShowToast] = useState(false);

  // Effect to save users to local storage (no change here)
  useEffect(() => {
    localStorage.setItem('dashboardUsers', JSON.stringify(users));
  }, [users]);

  // Effect to keep selectedUser up-to-date with latest `users` state (no change here)
  useEffect(() => {
    if (selectedUser) {
      const updatedSelectedUser = users.find(user => user.id === selectedUser.id);
      if (updatedSelectedUser) {
        setSelectedUser(updatedSelectedUser);
      } else {
        // If the selected user was deleted, clear selection
        setSelectedUser(null);
      }
    }
  }, [users, selectedUser]);

  // Effect to sync tasks assigned in KanbanPage from localStorage
  useEffect(() => {
    const storedKanbanTasks = localStorage.getItem('kanbanTasks');
    if (storedKanbanTasks) {
      try {
        const kanbanTasks = JSON.parse(storedKanbanTasks);
        if (Array.isArray(kanbanTasks)) {
          // Map userId to tasks assigned
          const userTaskMap = {};
          kanbanTasks.forEach(task => {
            if (task.assignedTo) {
              if (!userTaskMap[task.assignedTo]) {
                userTaskMap[task.assignedTo] = [];
              }
              userTaskMap[task.assignedTo].push({
                id: task.id,
                project: 'Kanban',
                status: task.status === 'todo' ? 'new' : task.status === 'inprogress' ? 'ongoing' : 'completed',
                name: task.title,
              });
            }
          });
          // Update users with assigned tasks from Kanban
          setUsers(prevUsers => {
            return prevUsers.map(user => {
              const kanbanAssignedTasks = userTaskMap[user.id] || [];
              // Filter out Kanban tasks from existing tasks to avoid duplicates
              const nonKanbanTasks = user.tasks.filter(t => t.project !== 'Kanban');
              return {
                ...user,
                tasks: [...nonKanbanTasks, ...kanbanAssignedTasks],
              };
            });
          });
        }
      } catch (e) {
        console.error('Error parsing kanbanTasks in UserPage:', e);
      }
    }
  }, []);

  // Toast handler (no change here)
  const showToastNotification = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setToastMessage('');
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleBackToUserList = () => {
    setSelectedUser(null);
    setSearchTerm('');
  };

  const addNewUser = (userName) => {
    const newUserId = Math.max(...users.map(u => u.id), 0) + 1;
    const newUser = { id: newUserId, name: userName, tasks: [] };
    setUsers([...users, newUser]);
    showToastNotification(`User "${userName}" added successfully!`, 'success');
  };

  // Remove assignNewTask as KanbanPage is source of truth for tasks

  const handleTaskStatusChange = (userId, taskId, newStatus) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            tasks: user.tasks.map(task =>
              task.id === taskId ? { ...task, status: newStatus } : task
            )
          };
        }
        return user;
      });
    });
    showToastNotification('Task status updated!', 'info');
  };

  // --- NEW: Handle User Deletion ---
  const handleDeleteUser = (userId, userName, event) => {
    event.stopPropagation(); // Prevent row click from navigating to profile

    const confirmDelete = window.confirm(`Are you sure you want to delete user "${userName}"?`);
    if (confirmDelete) {
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.filter(user => user.id !== userId);
        // If the deleted user was currently selected, clear selection
        if (selectedUser && selectedUser.id === userId) {
          setSelectedUser(null);
        }
        return updatedUsers;
      });
      showToastNotification(`User "${userName}" deleted successfully!`, 'success');
    } else {
      showToastNotification(`Deletion of "${userName}" cancelled.`, 'info');
    }
  };
  // --- END NEW ---

  // --- NEW: Handle Task Deletion ---
  const handleDeleteTask = (userId, taskId) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          const updatedTasks = user.tasks.filter(task => task.id !== taskId);
          return { ...user, tasks: updatedTasks };
        }
        return user;
      });
    });
    // If the selected user is the one whose task was deleted, update selectedUser state
    if (selectedUser && selectedUser.id === userId) {
      const updatedSelectedUser = users.find(user => user.id === userId);
      if (updatedSelectedUser) {
        setSelectedUser(updatedSelectedUser);
      }
    }
    showToastNotification('Task deleted successfully!', 'success');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderUserProfile = () => {
    if (!selectedUser) return null;

    const tasksCompleted = selectedUser.tasks.filter(task => task.status === 'completed').length;
    const tasksOngoing = selectedUser.tasks.filter(task => task.status === 'ongoing').length;
    const tasksNew = selectedUser.tasks.filter(task => task.status === 'new').length;

    return (
      <div className="user-profile-card">
        <button className="back-button" onClick={handleBackToUserList}>&larr; Back to Users</button>
        <div className="profile-header">
          <div className="avatar">{selectedUser.name.charAt(0)}</div>
          <div className="profile-info">
            <h2>{selectedUser.name}</h2>
            <p className="user-id">User ID: {selectedUser.id}</p>
          </div>
        </div>
        <div className="task-summary-grid">
          <div className="summary-item completed">
            <span className="icon-completed">✔</span>
            <span className="count">{tasksCompleted}</span>
            <span className="label">Completed</span>
          </div>
          <div className="summary-item ongoing">
            <span className="icon-ongoing">↻</span>
            <span className="count">{tasksOngoing}</span>
            <span className="label">Ongoing</span>
          </div>
          <div className="summary-item new-tasks">
            <span className="icon-new">➕</span>
            <span className="count">{tasksNew}</span>
            <span className="label">New</span>
          </div>
        </div>

        <div className="assigned-tasks-section">
          <h3>Assigned Tasks</h3>
          <div className="task-list">
            {selectedUser.tasks.length > 0 ? (
              selectedUser.tasks.map(task => (
                <div key={task.id} className={`task-item status-${task.status}`}>
                  <div className="task-info">
                    <div className="task-name">{task.name}</div>
                    <div className="task-details">Project: {task.project}</div>
                  </div>
                  <div className="task-actions">
                    <select
                      value={task.status}
                      onChange={(e) => handleTaskStatusChange(selectedUser.id, task.id, e.target.value)}
                      className="task-status-select"
                    >
                      <option value="new">New</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      className="delete-task-button"
                      onClick={() => handleDeleteTask(selectedUser.id, task.id)}
                      title="Delete Task"
                      aria-label="Delete Task"
                      type="button"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No tasks assigned yet.</p>
            )}
          </div>
        </div>
        <p className="assign-task-message" style={{ marginTop: '1rem', fontStyle: 'italic', color: 'var(--text-secondary-color)' }}>
          If you want to assign task, assign on kanban page
        </p>
      </div>
    );
  };

  const renderUserList = () => {
    return (
      <div className="user-list-card">
        <div className="user-list-header">
          <h2>Users</h2>
          <p>Manage Your Team</p>
        </div>
        <div className="user-actions">
          <input
            type="text"
            placeholder="Search users..."
            className="user-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-user-button" onClick={() => setShowAddUserModal(true)}>
            + ADD USER
          </button>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id} onClick={() => handleSelectUser(user)} className="user-row">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={(event) => handleDeleteUser(user.id, user.name, event)}
                      title={`Delete ${user.name}`}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-secondary-color)' }}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="page-container">
      {selectedUser ? renderUserProfile() : renderUserList()}

      {/* Modals */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onAddUser={addNewUser}
      />
      {userToAssignTask && (
        <AssignTaskModal
          isOpen={showAssignTaskModal}
          onClose={() => setShowAssignTaskModal(false)}
          onAssignTask={() => {}}
          user={userToAssignTask}
        />
      )}

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

export default UserPage;
