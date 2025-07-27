
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { AppContextType, CartItem, Product, Theme, UserRole } from '../types';

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return sessionStorage.getItem('userRole') as UserRole || null;
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', String(isAuthenticated));
    if (userRole) {
      sessionStorage.setItem('userRole', userRole);
    } else {
      sessionStorage.removeItem('userRole');
    }
  }, [isAuthenticated, userRole]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const getCartItemCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const login = useCallback(async (email: string, pass: string): Promise<boolean> => {
    // Mock API call for admin login
    return new Promise(resolve => {
      setTimeout(() => {
        if (email.toLowerCase() === 'admin@elegance.com' && pass === 'admin123') {
          setIsAuthenticated(true);
          setUserRole('admin');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserRole(null);
  }, []);


  const contextValue = useMemo<AppContextType>(() => ({
    theme,
    toggleTheme,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemCount,
    isAuthenticated,
    userRole,
    login,
    logout
  }), [theme, toggleTheme, cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartItemCount, isAuthenticated, userRole, login, logout]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};