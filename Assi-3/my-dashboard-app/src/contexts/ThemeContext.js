import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Theme Context
export const ThemeContext = createContext();

// 2. Create a custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// 3. Create the Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Get initial theme from local storage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Effect to update local storage whenever the theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Apply the theme class to the body element
    document.body.className = theme;
  }, [theme]);

  // Function to toggle between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme state and toggle function to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};