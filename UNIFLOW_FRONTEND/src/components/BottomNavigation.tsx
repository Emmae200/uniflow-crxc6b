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
      
      <div 
        className="nav-item central"
      >
        <div className="nav-icon">
          <img 
            src="/assets/icons/icons2/orb_icon.png" 
            alt="AI Assistant"
          />
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
        className={`nav-item ${isActive('/settings') ? 'active' : ''}`}
        onClick={() => handleNavigation('/settings')}
      >
        <div className="nav-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
          </svg>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default BottomNavigation;

