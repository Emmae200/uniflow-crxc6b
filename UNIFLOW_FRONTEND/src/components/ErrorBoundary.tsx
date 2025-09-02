import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Don't show error boundary for logout-related errors
    if (error.message.includes('logout') || 
        error.message.includes('redirect') || 
        error.message.includes('navigation')) {
      console.log('Suppressing error boundary for logout/redirect error:', error.message);
      return { hasError: false, error: undefined };
    }
    
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log additional context
    console.log('Error occurred at:', new Date().toISOString());
    console.log('Current URL:', window.location.href);
    console.log('User agent:', navigator.userAgent);
    
    // Try to recover gracefully for certain errors
    if (error.message.includes('logout') || error.message.includes('redirect')) {
      console.log('Attempting to recover from logout/redirect error');
      try {
        // Clear any problematic state
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to signup page
        window.location.href = '/signup';
      } catch (recoveryError) {
        console.error('Recovery failed:', recoveryError);
      }
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          color: '#6c757d'
        }}>
          <h2>Something went wrong</h2>
          <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '20px', textAlign: 'left' }}>
              <summary>Error Details (Development)</summary>
              <pre style={{ 
                backgroundColor: '#f1f3f4', 
                padding: '10px', 
                borderRadius: '5px',
                overflow: 'auto',
                maxWidth: '100%'
              }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


