import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockAuth } from './mockAuth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Try real API first, fall back to mock if it fails
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setSession(data.session);
          setIsAuthenticated(true);

          // Check if onboarding is needed
          if (!data.user.background || !['software', 'hardware', 'student', 'other'].includes(data.user.background)) {
            setNeedsOnboarding(true);
          }
        } else {
          throw new Error('API not available');
        }
      } catch (apiError) {
        // Use mock authentication
        const mockData = await mockAuth.getSession();
        setUser(mockData.user);
        setSession(mockData.session);
        setIsAuthenticated(mockAuth.isAuthenticated);
        setNeedsOnboarding(mockAuth.needsOnboarding);
      }
    } catch (error) {
      console.log('No active session found');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email, password, name, background) => {
    setIsLoading(true);
    setError('');

    try {
      // Try real API first, fall back to mock if it fails
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, background }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Sign up failed');
        }

        setUser(data.user);
        setSession(data.session);
        setIsAuthenticated(true);
        setNeedsOnboarding(false);

        // Store session
        localStorage.setItem('session', JSON.stringify(data.session));

        return data;
      } catch (apiError) {
        // Use mock authentication
        const data = await mockAuth.signUp(email, password, name, background);
        setUser(data.user);
        setSession(data.session);
        setIsAuthenticated(true);
        setNeedsOnboarding(false);

        // Store session
        localStorage.setItem('session', JSON.stringify(data.session));

        return data;
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    setError('');

    try {
      // Try real API first, fall back to mock if it fails
      try {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Sign in failed');
        }

        setUser(data.user);
        setSession(data.session);
        setIsAuthenticated(true);

        // Check onboarding
        if (!data.user.background || !['software', 'hardware', 'student', 'other'].includes(data.user.background)) {
          setNeedsOnboarding(true);
        } else {
          setNeedsOnboarding(false);
        }

        // Store session
        localStorage.setItem('session', JSON.stringify(data.session));

        return data;
      } catch (apiError) {
        // Use mock authentication
        const data = await mockAuth.signIn(email, password);
        setUser(data.user);
        setSession(data.session);
        setIsAuthenticated(true);
        setNeedsOnboarding(mockAuth.needsOnboarding);

        // Store session
        localStorage.setItem('session', JSON.stringify(data.session));

        return data;
      }
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Try real API first, fall back to mock if it fails
      try {
        await fetch('/api/auth/signout', { method: 'POST' });
      } catch (apiError) {
        // Use mock authentication
        await mockAuth.signOut();
      }
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      setNeedsOnboarding(false);
      localStorage.removeItem('session');
    }
  };

  const updateProfile = async (updates) => {
    // Try real API first, fall back to mock if it fails
    try {
      if (!session?.token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Update failed');
      }

      setUser(data.user);
      setNeedsOnboarding(false);

      return data;
    } catch (apiError) {
      // Use mock authentication
      const data = await mockAuth.updateProfile(updates);
      setUser(data.user);
      setNeedsOnboarding(false);

      return data;
    }
  };

  const [error, setError] = useState('');

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated,
    needsOnboarding,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    checkSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
