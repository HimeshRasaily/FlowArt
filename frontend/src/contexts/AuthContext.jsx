import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aura_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('aura_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - just set logged in state
    const mockUser = {
      id: 'demo-user',
      name: 'Demo User',
      email: email,
      username: 'demo_artist',
      bio: 'Art enthusiast and creator',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
      location: 'Global',
      medium: 'Digital',
      experience: 'Emerging'
    };

    // Save to localStorage
    localStorage.setItem('aura_user', JSON.stringify(mockUser));

    // Update state
    setUser(mockUser);
    setIsAuthenticated(true);

    toast.success(`Welcome back, ${mockUser.name}!`);
    return { success: true };
  };

  const register = async (name, email, password) => {
    // Mock registration - just set logged in state
    const mockUser = {
      id: 'new-user',
      name: name,
      email: email,
      username: name.toLowerCase().replace(/\s+/g, '_'),
      bio: 'New artist on Aura',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
      location: 'Global',
      medium: 'Digital',
      experience: 'Emerging'
    };

    // Save to localStorage
    localStorage.setItem('aura_user', JSON.stringify(mockUser));

    // Update state
    setUser(mockUser);
    setIsAuthenticated(true);

    toast.success(`Welcome to Aura, ${mockUser.name}!`);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('aura_user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const updateUserData = (userData) => {
    setUser(userData);
    localStorage.setItem('aura_user', JSON.stringify(userData));
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
