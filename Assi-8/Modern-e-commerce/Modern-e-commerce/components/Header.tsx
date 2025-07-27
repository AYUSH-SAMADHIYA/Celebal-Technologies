
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { ICONS } from '../constants';

const Header: React.FC = () => {
  const { theme, toggleTheme, getCartItemCount, isAuthenticated, userRole, logout } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItemCount = getCartItemCount();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-light-text/80 dark:text-dark-text/80'}`;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-primary">
            UrbanGabru
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/products" className={navLinkClass}>Products</NavLink>
            {isAuthenticated && userRole === 'admin' && (
              <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <ICONS.moon className="h-5 w-5" /> : <ICONS.sun className="h-5 w-5" />}
            </button>
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-light-bg dark:hover:bg-dark-bg transition-colors" aria-label="Shopping cart">
              <ICONS.cart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
               <button onClick={handleLogout} className="p-2 rounded-full hover:bg-light-bg dark:hover:bg-dark-bg transition-colors" aria-label="Logout">
                  <ICONS.user className="h-6 w-6 text-primary" />
               </button>
            ) : (
               <Link to="/login" className="p-2 rounded-full hover:bg-light-bg dark:hover:bg-dark-bg transition-colors" aria-label="Login">
                  <ICONS.user className="h-6 w-6" />
               </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;