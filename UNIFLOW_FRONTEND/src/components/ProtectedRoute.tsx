import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Also check localStorage directly as a fallback
  const hasToken = !!localStorage.getItem('token');
  const hasUser = !!localStorage.getItem('user');
  
  // Check if we're in the middle of OAuth processing
  const isOAuthProcessing = window.location.search.includes('token') || 
                           window.location.search.includes('code') ||
                           window.location.search.includes('state');
  
  const isActuallyAuthenticated = isAuthenticated || (hasToken && hasUser) || isOAuthProcessing;
  
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - hasToken:', hasToken);
  console.log('ProtectedRoute - hasUser:', hasUser);
  console.log('ProtectedRoute - isOAuthProcessing:', isOAuthProcessing);
  console.log('ProtectedRoute - isActuallyAuthenticated:', isActuallyAuthenticated);
  console.log('ProtectedRoute - loading:', loading);
  console.log('ProtectedRoute - path:', rest.path);

  if (loading) {
    // Show loading spinner while checking authentication
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={props => {
        console.log('ProtectedRoute render - isAuthenticated:', isAuthenticated);
        console.log('ProtectedRoute render - isActuallyAuthenticated:', isActuallyAuthenticated);
        console.log('ProtectedRoute render - path:', rest.path);
        
        // Temporarily allow courses page without authentication for testing
        if (rest.path === '/courses') {
          console.log('Allowing access to courses page');
          return <Component {...props} />;
        }
        
        // Allow access if authenticated OR if OAuth is processing (prevents redirect loops)
        return isActuallyAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signup",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
