import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AuthService, { User, RegisterData, LoginData } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
  updateUserState: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const currentUser = AuthService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            // Try to get fresh user data from API
            const profile = await AuthService.getProfile();
            setUser(profile);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        AuthService.logout();
      } finally {
        setLoading(false);
      }
    };

    // Listen for storage changes (when tokens are added/removed)
    const handleStorageChange = () => {
      if (AuthService.isAuthenticated()) {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
    };

    initializeAuth();
    
    // Add storage event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuthService.register(data);
      setUser(response.user);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuthService.login(data);
      setUser(response.user);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithApple = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuthService.signInWithApple();
      setUser(response.user);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuthService.signInWithGoogle();
      setUser(response.user);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      console.log('Logout function called');
      
      // Check if we're in the middle of OAuth processing
      const isOAuthProcessing = window.location.search.includes('token') || 
                               window.location.search.includes('code') ||
                               window.location.search.includes('state');
      
      console.log('Logout called - OAuth processing:', isOAuthProcessing);
      
      // Clear authentication state safely
      try {
        AuthService.logout();
        console.log('AuthService.logout() completed');
      } catch (authError) {
        console.error('Error in AuthService.logout():', authError);
      }
      
      // Clear context state
      setUser(null);
      setError(null);
      console.log('Context state cleared');
      
      // Only redirect to signup (main signin page) if it's not OAuth processing
      if (!isOAuthProcessing) {
        console.log('Redirecting to /signup after logout');
        // Use setTimeout to ensure state updates complete before redirect
        setTimeout(() => {
          window.location.href = '/signup';
        }, 100);
      } else {
        console.log('OAuth processing detected, not redirecting');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, try to redirect
      setTimeout(() => {
        window.location.href = '/signup';
      }, 100);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await AuthService.updateProfile(data);
      setUser(updatedUser);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      await AuthService.changePassword(currentPassword, newPassword);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // Manually update user state (for OAuth callbacks)
  const updateUserState = (userData: User) => {
    setUser(userData);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    signInWithApple,
    signInWithGoogle,
    logout,
    updateProfile,
    changePassword,
    clearError,
    updateUserState,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
