
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-card dark:bg-dark-card border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">UrbanGabru</h3>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70">Modern e-commerce for a modern world.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/cart" className="text-sm hover:text-primary transition-colors">My Cart</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="#" className="text-sm hover:text-primary transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-light-text/70 dark:text-dark-text/70 mb-2">Subscribe for great deals.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="w-full px-3 py-2 text-sm bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary" />
              <button className="px-4 py-2 bg-primary text-white font-semibold text-sm rounded-r-md hover:bg-opacity-90 transition-colors">
                Membership
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-light-text/60 dark:text-dark-text/60">
          <p>&copy; {new Date().getFullYear()} UrbanGabru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
