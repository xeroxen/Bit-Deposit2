'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAuthToken, isAuthenticated } from './authentication';

// Create authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  redirectToLogin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Redirect to login page function
const redirectToLogin = (): void => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status on mount
    const token = getAuthToken();
    setAuthenticated(!!token);
    setLoading(false);
  }, []);

  const value = { 
    isAuthenticated: authenticated, 
    loading,
    redirectToLogin 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 