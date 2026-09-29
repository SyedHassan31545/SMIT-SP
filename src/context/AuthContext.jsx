import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const PASSWORDS_KEY = 'smit_passwords';

const readPasswords = () => {
  try {
    return JSON.parse(localStorage.getItem(PASSWORDS_KEY) || '{}');
  } catch {
    return {};
  }
};

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

  // Student ne "Create Password" se jo password banaya usay save karta hai (demo only, localStorage)
  const createPassword = (identifier, password) => {
    const all = readPasswords();
    all[identifier] = password;
    try {
      localStorage.setItem(PASSWORDS_KEY, JSON.stringify(all));
      return true;
    } catch {
      return false;
    }
  };

  // Returns { ok: boolean, error?: string }
  const login = (role, identifier, password) => {
    const saved = readPasswords()[identifier];
    if (role === 'student' && saved && saved !== password) {
      return { ok: false, error: 'Password ghalat hai. Dobara try karein.' };
    }
    setCurrentUser({
      role, // 'student' | 'trainer' | 'admin'
      identifier,
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    });
    return { ok: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, createPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
