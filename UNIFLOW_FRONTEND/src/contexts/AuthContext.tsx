import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  streak?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock authentication service - local storage only
class MockAuthService {
  private static readonly STORAGE_KEY = 'uniflow_user';
  private static readonly TOKEN_KEY = 'uniflow_token';

  // Register new user
  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUsers = this.getStoredUsers();
    if (existingUsers.find(u => u.email === data.email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: data.name,
      email: data.email,
      avatar: '👤',
      streak: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const token = 'mock-token-' + Date.now();
    
    // Store user and token
    this.setCurrentUser(newUser);
    this.setToken(token);
    
    // Add to users list
    existingUsers.push(newUser);
    localStorage.setItem('uniflow_users', JSON.stringify(existingUsers));
    
    return { user: newUser, token };
  }

  // Login user
  async login(data: LoginData): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === data.email);
    
    if (!user) {
      throw new Error('User not found');
    }

    const token = 'mock-token-' + Date.now();
    
    // Store current user and token
    this.setCurrentUser(user);
    this.setToken(token);
    
    return { user, token };
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('No user logged in');
    }
    return user;
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    const updatedUser = { ...currentUser, ...data, updatedAt: new Date().toISOString() };
    
    // Update stored user
    this.setCurrentUser(updatedUser);
    
    // Update in users list
    const users = this.getStoredUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('uniflow_users', JSON.stringify(users));
    }
    
    return updatedUser;
  }

  // Change password (mock implementation)
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock implementation - always succeeds
    console.log('Password changed successfully');
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.STORAGE_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Apple OAuth (mock)
  async signInWithApple(): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'apple-user-' + Date.now(),
      name: 'Apple User',
      email: 'user@apple.com',
      avatar: '🍎',
      streak: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const token = 'mock-apple-token-' + Date.now();
    
    this.setCurrentUser(mockUser);
    this.setToken(token);
    
    return { user: mockUser, token };
  }

  // Google OAuth (mock)
  async signInWithGoogle(): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 'google-user-' + Date.now(),
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: '🔍',
      streak: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const token = 'mock-google-token-' + Date.now();
    
    this.setCurrentUser(mockUser);
    this.setToken(token);
    
    return { user: mockUser, token };
  }

  // Helper methods
  private setCurrentUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private getStoredUsers(): User[] {
    const usersStr = localStorage.getItem('uniflow_users');
    return usersStr ? JSON.parse(usersStr) : [];
  }
}

const mockAuthService = new MockAuthService();

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (mockAuthService.isAuthenticated()) {
          const currentUser = mockAuthService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            // Try to get fresh user data
            const profile = await mockAuthService.getProfile();
            setUser(profile);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        mockAuthService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockAuthService.register(data);
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
      const response = await mockAuthService.login(data);
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
      const response = await mockAuthService.signInWithApple();
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
      const response = await mockAuthService.signInWithGoogle();
      setUser(response.user);
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    mockAuthService.logout();
    setUser(null);
    setError(null);
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await mockAuthService.updateProfile(data);
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
      await mockAuthService.changePassword(currentPassword, newPassword);
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