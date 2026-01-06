import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is required');
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');

        if (storedToken && storedUser) {
          setAuth({
            isAuthenticated: true,
            user: JSON.parse(storedUser),
            token: storedToken,
            loading: false,
            error: null,
          });
        } else {
          setAuth((prev) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuth((prev) => ({ ...prev, loading: false }));
      }
    };

    checkAuth();
  }, []);

  /**
   * Signup with email, password, name, and role
   */
  const signup = async (name, email, password, role) => {
    try {
      setAuth((prev) => ({ ...prev, loading: true, error: null }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password, role }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Store token and user in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));

      setAuth({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        loading: false,
        error: null,
      });

      return { success: true, user: data.user };
    } catch (error) {
      let errorMsg = 'Signup failed';
      
      if (error.name === 'AbortError') {
        errorMsg = 'Request timeout - backend server may be unreachable';
      } else if (error instanceof TypeError) {
        errorMsg = `Network error: ${error.message}. Make sure the backend server is running.`;
      } else {
        errorMsg = error.message || 'Signup failed';
      }
      
      console.error('Signup error:', error);
      setAuth((prev) => ({ ...prev, loading: false, error: errorMsg }));
      return { success: false, error: errorMsg };
    }
  };

  /**
   * Login with email and password
   */
  const login = async (email, password) => {
    try {
      setAuth((prev) => ({ ...prev, loading: true, error: null }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and user in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));

      setAuth({
        isAuthenticated: true,
        user: data.user,
        token: data.token,
        loading: false,
        error: null,
      });

      return { success: true, user: data.user };
    } catch (error) {
      let errorMsg = 'Login failed';
      
      if (error.name === 'AbortError') {
        errorMsg = 'Request timeout - backend server may be unreachable';
      } else if (error instanceof TypeError) {
        errorMsg = `Network error: ${error.message}. Make sure the backend server is running.`;
      } else {
        errorMsg = error.message || 'Login failed';
      }
      
      console.error('Login error:', error);
      setAuth((prev) => ({ ...prev, loading: false, error: errorMsg }));
      return { success: false, error: errorMsg };
    }
  };

  /**
   * Logout and clear auth state
   */
  const logout = async () => {
    try {
      // Call backend logout endpoint
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');

      setAuth({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      });
    }
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (roles) => {
    if (!auth.user) return false;
    if (!Array.isArray(roles)) {
      return auth.user.role === roles;
    }
    return roles.includes(auth.user.role);
  };

  /**
   * Get auth headers for API requests
   */
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.token}`,
    };
  };

  const value = {
    ...auth,
    signup,
    login,
    logout,
    hasRole,
    getAuthHeaders,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
