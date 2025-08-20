// Mock authentication service (no backend required)
// This simulates API calls for development purposes

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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists (mock)
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      const user = JSON.parse(existingUser);
      if (user.email === data.email) {
        throw new Error('User already exists');
      }
    }
    
    // Create mock user
    const user: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      avatar: '🐸',
      streak: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const token = 'mock-token-' + Date.now();
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, token };
  }

  // Login user
  async login(data: LoginData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists (mock)
    const existingUser = localStorage.getItem('user');
    if (!existingUser) {
      throw new Error('Invalid credentials');
    }
    
    const user = JSON.parse(existingUser);
    if (user.email !== data.email) {
      throw new Error('Invalid credentials');
    }
    
    const token = 'mock-token-' + Date.now();
    
    // Store token and user data
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return { user, token };
  }

  // Get current user profile
  async getProfile(): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('User not found');
    }
    
    return JSON.parse(userStr);
  }

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('User not found');
    }
    
    const user = JSON.parse(userStr);
    const updatedUser = { ...user, ...data, updatedAt: new Date().toISOString() };
    
    // Update stored user data
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return updatedUser;
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

  // Simulate OAuth for Google (since the backend doesn't have OAuth)
  async signInWithGoogle(): Promise<AuthResponse> {
    // For now, we'll simulate this with a mock response
    // In a real implementation, you'd integrate with Google's OAuth
    const mockUser: User = {
      id: 'google-user-1',
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: '🟢',
      streak: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock-google-token-' + Date.now();
    
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return { user: mockUser, token: mockToken };
  }
}

export default new AuthService();
