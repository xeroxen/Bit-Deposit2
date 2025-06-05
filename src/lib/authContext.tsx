'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAuthToken, logout as logoutUser } from './authentication';
import { useRouter } from 'next/navigation';

// Create authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  redirectToLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  // Redirect to login page function using Next.js router
  const redirectToLogin = () => {
    router.push('/login');
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setAuthenticated(false);
    router.push('/login');
  };

  useEffect(() => {
    // Check authentication status on mount
    const token = getAuthToken();
    setAuthenticated(!!token);
    setLoading(false);

    // Listen for auth status changes
    const handleAuthChange = () => {
      const updatedToken = getAuthToken();
      setAuthenticated(!!updatedToken);
    };
    
    // Listen for the custom event
    window.addEventListener('auth_status_changed', handleAuthChange);
    
    // Also check for changes in localStorage (for cross-tab synchronization)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'auth_status_changed') {
        handleAuthChange();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('auth_status_changed', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const value = { 
    isAuthenticated: authenticated, 
    loading,
    redirectToLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}