import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userType = localStorage.getItem('userType');
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');

        if (token && userType && userId && username) {
          setUser({ token, userType, userId, username });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, userType) => {
    try {
      const endpoint = userType === 'patient'
        ? `${BASE_URL}/api/auth/patient-login`
        : `${BASE_URL}/api/auth/doctor-login`;

      const response = await axios.post(endpoint, { email, password });
      
      if (!response.data?.token || !response.data?.userId || !response.data?.username) {
        throw new Error('Invalid response data from server');
      }

      const { token, userId, username } = response.data;

      // Create user data object
      const userData = { token, userType, userId, username };

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);

      // Update state
      setUser(userData);

      // Navigate to appropriate dashboard
      const from = location.state?.from?.pathname || 
        (userType === 'patient' ? '/patientpage' : '/doctorpage');
      navigate(from, { replace: true });

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');

      // Clear state
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
