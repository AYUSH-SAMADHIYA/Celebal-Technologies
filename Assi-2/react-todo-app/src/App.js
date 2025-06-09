import React from 'react';
import TodoList from './components/TodoList';
import './App.css'; 
function App() {
  return (
    <div className="App">
      <h1 className="app-title">Task Organizer!</h1>
      <TodoList />
    </div>
  );
}

export default App;