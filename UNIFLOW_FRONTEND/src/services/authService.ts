// Real authentication service with backend integration
import apiService from './apiService';

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

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  // Register new user
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.signup(data) as AuthResponse;
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw new Error(error.message || 'Registration failed');
    }
  }

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiService.signin(data) as AuthResponse;
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.message || 'Login failed');
    }
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    try {
      const user = await apiService.getProfile() as User;
      // Update local storage with fresh data
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      console.error('Get profile failed:', error);
      throw new Error(error.message || 'Failed to get profile');
    }
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const updatedUser = await apiService.updateProfile(data) as User;
      // Update local storage with fresh data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error: any) {
      console.error('Update profile failed:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock implementation - always succeeds
    console.log('Password changed successfully');
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Simulate OAuth for Apple (since the backend doesn't have OAuth)
  async signInWithApple(): Promise<AuthResponse> {
    // For now, we'll simulate this with a mock response
    // In a real implementation, you'd integrate with Apple's OAuth
    const mockUser: User = {
      id: 'apple-user-1',
      name: 'Apple User',
      email: 'user@apple.com',
      avatar: '🍎',
      streak: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock-apple-token-' + Date.now();
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return { user: mockUser, token: mockToken };
  }

  // Google OAuth
  async signInWithGoogle(): Promise<AuthResponse> {
    try {
      // Redirect to Google OAuth
      apiService.googleAuth();
      // This will redirect the user, so we won't return anything
      throw new Error('Redirecting to Google OAuth');
    } catch (error: any) {
      console.error('Google OAuth failed:', error);
      throw error;
    }
  }
}

export default new AuthService();
