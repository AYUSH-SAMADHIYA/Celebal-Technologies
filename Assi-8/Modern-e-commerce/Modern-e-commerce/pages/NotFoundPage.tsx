
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 animate-fadeIn">
      <h1 className="text-9xl font-extrabold text-primary tracking-widest">404</h1>
      <div className="bg-light-card dark:bg-dark-card px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-4 text-lg text-gray-500">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link 
        to="/"
        className="mt-8 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
