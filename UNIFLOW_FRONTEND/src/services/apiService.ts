// API Service for backend communication
import config from '../config/environment';

const API_BASE_URL = config.API_BASE_URL;

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    console.log('🌐 API Request:', {
      url,
      method: options.method || 'GET',
      headers: options.headers,
      body: options.body
    });
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      console.log('📡 API Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      console.error('❌ API request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }

  // Test database connection
  async testDatabase() {
    return this.request('/test-db');
  }

  // Email authentication
  async signup(data: { name: string; email: string; password: string }) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async signin(data: { email: string; password: string }) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Google OAuth
  async googleAuth() {
    // Redirect to Google OAuth
    window.location.href = `${this.baseURL}/auth/google`;
  }

  // Handle Google OAuth callback
  async handleGoogleCallback(code: string) {
    return this.request(`/auth/google/callback?code=${code}`, {
      method: 'GET',
    });
  }

  // Profile management - Fixed endpoints to match backend
  async getProfile() {
    return this.request('/profile/me');
  }

  async updateProfile(data: any) {
    return this.request('/profile/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export default new ApiService();
