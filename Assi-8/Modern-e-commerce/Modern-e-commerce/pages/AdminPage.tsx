import React from 'react';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  return (
    <div className="p-6 bg-light-card/30 dark:bg-dark-card/30 rounded-2xl backdrop-blur-md animate-fadeIn">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-8 text-light-text/80 dark:text-dark-text/80">Welcome, Admin! From here you can manage products, orders, and users.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards for admin actions */}
        <Link to="#" className="block p-6 bg-light-card dark:bg-dark-card rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
          <h2 className="text-xl font-semibold text-primary">Manage Products</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Add, edit, or remove products from the store.</p>
        </Link>
        <Link to="#" className="block p-6 bg-light-card dark:bg-dark-card rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
          <h2 className="text-xl font-semibold text-primary">View Orders</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Review and update the status of customer orders.</p>
        </Link>
        <Link to="#" className="block p-6 bg-light-card dark:bg-dark-card rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
          <h2 className="text-xl font-semibold text-primary">Customer Management</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">View and manage registered customer accounts.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
