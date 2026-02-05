import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('flowart_token');
      const savedUser = localStorage.getItem('flowart_user');

      if (token && savedUser) {
        try {
          // Verify token is still valid by fetching current user
          const currentUser = await authAPI.getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        } catch (error) {
          // Token invalid, clear storage
          localStorage.removeItem('flowart_token');
          localStorage.removeItem('flowart_user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { user: userData, access_token } = response;

      // Save to localStorage
      localStorage.setItem('flowart_token', access_token);
      localStorage.setItem('flowart_user', JSON.stringify(userData));

      // Update state
      setUser(userData);
      setIsAuthenticated(true);

      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.detail || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      const { user: userData, access_token } = response;

      // Save to localStorage
      localStorage.setItem('flowart_token', access_token);
      localStorage.setItem('flowart_user', JSON.stringify(userData));

      // Update state
      setUser(userData);
      setIsAuthenticated(true);

      toast.success(`Welcome to FlowArt, ${userData.name}!`);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.detail || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('flowart_token');
    localStorage.removeItem('flowart_user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const updateUserData = (userData) => {
    setUser(userData);
    localStorage.setItem('flowart_user', JSON.stringify(userData));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
