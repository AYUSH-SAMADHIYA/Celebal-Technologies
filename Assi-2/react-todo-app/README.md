Task Manager: A React To-Do List Application
📄 Overview
This is a modern and interactive To-Do List application built with React. It allows users to efficiently manage their tasks by adding new items, tracking their progress through distinct "New," "Ongoing," and "Completed" statuses, and removing them once done. The application features a clean, green and cream aesthetic, smooth animations, and data persistence using Local Storage.

✨ Features
Task Addition: Easily add new tasks with input validation to prevent empty or duplicate entries.

Three-Stage Workflow: Categorize tasks into "New," "Ongoing," and "Completed" statuses.

Task Removal: Delete tasks from the list with a simple click.

Dynamic Status Updates: Change a task's status via an intuitive dropdown, with visual cues reflecting its current state.

Real-time Display: Tasks update dynamically as they are added, modified, or removed.

Filtering Options: View tasks based on their status (All, New, Ongoing, Completed).

Sorting Options: Organize tasks by creation date (Newest First, Oldest First) or alphabetically.

Local Storage Persistence: All tasks and their statuses are saved automatically to your browser's local storage, ensuring your data is retained even after closing and reopening the browser.

Responsive Design: Optimized for a seamless experience across various device sizes.
Modern Design & Animations: Features a calming green and cream color theme, a centered layout, and subtle entry/exit animations for a polished user experience.

📸 Screenshot
Here's a glimpse of the application in action:

🚀 How to Run Locally
Follow these steps to set up and run the Task Manager on your local machine:

Prerequisites
Make sure you have Node.js and npm installed on your system.

Installation
Clone the repository:

git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER_NAME>

(Replace <YOUR_REPOSITORY_URL> with the actual URL of your Git repository and <YOUR_PROJECT_FOLDER_NAME> with the name you chose for your project folder, e.g., react-modern-todo.)

Install dependencies:
Navigate into the project directory and install the necessary Node.js packages:

npm install

This will install react, react-dom, react-scripts, and react-transition-group.

Running the Application
After installation, you can start the development server:

npm start

This command will:

Start the development server.

Open the application in your default web browser (usually at http://localhost:3000).

Automatically reload the page if you make any code changes.

🛠️ Technologies Used
React.js: A JavaScript library for building user interfaces.

react-transition-group: For handling CSS transitions and animations.

HTML5 & CSS3: For structuring and styling the web content.

JavaScript (ES6+): For application logic.

Local Storage: For client-side data persistence.

📂 Project Structure
.
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── TodoList.js       # Main To-Do List component logic
│   │   ├── TodoList.css      # Styling for TodoList component
│   │   └── TodoItem.js       # Individual task item component logic
│   ├── App.js                # Main application component
│   ├── App.css               # Styling for App component
│   ├── index.js              # Entry point of the React application
│   └── index.css             # Global styles and body/root centering
├── .gitignore
├── package.json
├── README.md                 
