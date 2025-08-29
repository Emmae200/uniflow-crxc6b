// Environment configuration
export const config = {
  // Backend API URL
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // Frontend URL
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  
  // Environment
  NODE_ENV: import.meta.env.MODE || 'development',
  
  // Feature flags
  ENABLE_GOOGLE_OAUTH: true,
  ENABLE_APPLE_OAUTH: false,
  
  // API endpoints
  ENDPOINTS: {
    HEALTH: '/health',
    AUTH: {
      SIGNUP: '/auth/signup',
      SIGNIN: '/auth/signin',
      GOOGLE: '/auth/google',
      GOOGLE_CALLBACK: '/auth/google/callback',
    },
    PROFILE: {
      GET: '/profile',
      UPDATE: '/profile',
    },
  },
};

export default config;
