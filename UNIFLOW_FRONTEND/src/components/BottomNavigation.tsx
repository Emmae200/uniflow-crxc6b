import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

const BottomNavigation: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    console.log('Navigation clicked:', path);
    console.log('Current location:', location.pathname);
    
    // Remove focus from any focused element before navigation
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
    
    // Try React Router first, then fallback to window.location
    try {
      history.push(path);
      console.log('React Router navigation attempted to:', path);
    } catch (error) {
      console.error('React Router failed, using window.location:', error);
      window.location.href = path;
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bottom-nav">
      <div 
        className={`nav-item ${isActive('/home') ? 'active' : ''}`}
        onClick={() => handleNavigation('/home')}
      >
        <div className="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
          </svg>
        </div>
        <span>Home</span>
      </div>
      
      <div 
        className={`nav-item ${isActive('/plans-page') ? 'active' : ''}`}
        onClick={() => handleNavigation('/plans-page')}
      >
        <div className="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
            <path d="M7,7H17V9H7V7M7,11H17V13H7V11M7,15H14V17H7V15Z"/>
          </svg>
        </div>
        <span>Plans</span>
      </div>
      
      <div className="nav-item central">
        <div className="nav-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
          </svg>
        </div>
      </div>
      
      <div 
        className={`nav-item ${isActive('/courses') ? 'active' : ''}`}
        onClick={() => {
          console.log('COURSES NAV BUTTON CLICKED');
          handleNavigation('/courses');
        }}
      >
        <div className="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
            <path d="M7,7H17V9H7V7M7,11H17V13H7V11M7,15H14V17H7V15Z"/>
          </svg>
        </div>
        <span>Courses</span>
      </div>
      
      <div 
        className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
        onClick={() => handleNavigation('/profile')}
      >
        <div className="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
          </svg>
        </div>
        <span>Profile</span>
      </div>
    </div>
  );
};

export default BottomNavigation;

