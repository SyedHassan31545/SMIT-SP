import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('smit_auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error loading auth from localStorage:', error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('smit_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('smit_auth_user');
      }
    } catch (error) {
      console.error('Error saving auth to localStorage:', error);
    }
  }, [currentUser]);

  // Login handler
  const login = (role, identifier, password) => {
    const userData = {
      role, // 'student' | 'trainer' | 'admin'
      identifier,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    setCurrentUser(userData);
    return true;
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('smit_auth_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};