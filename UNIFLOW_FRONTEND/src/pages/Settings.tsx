import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import LogoutConfirmationModal from '../components/LogoutConfirmationModal';
import './Settings.css';

const Settings: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleMyProfile = () => {
    history.push('/profile');
  };

  const handleNotificationPreferences = () => {
    history.push('/notification-preferences');
  };

  const handleAppPreferences = () => {
    history.push('/app-preferences');
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    // Call logout function from auth context
    logout();
    // Redirect to login page
    history.push('/login');
  };

  return (
    <>
      <style>
        {`
          .settings-screen {
            background-color: #E7E8E3 !important;
            --background: #E7E8E3 !important;
          }
          ion-content {
            background-color: #E7E8E3 !important;
            --background: #E7E8E3 !important;
          }
          ion-page {
            background-color: #E7E8E3 !important;
            --background: #E7E8E3 !important;
          }
          body {
            background-color: #E7E8E3 !important;
          }
        `}
      </style>
      <IonPage style={{ backgroundColor: '#E7E8E3' }}>
        <IonContent 
          fullscreen 
          className="settings-screen"
          style={{ 
            backgroundColor: '#E7E8E3',
            '--background': '#E7E8E3'
          } as React.CSSProperties}
        >
          {/* Status Bar Spacer */}
          <div className="status-bar-spacer"></div>

          {/* Header */}
          <div className="settings-header">
            <button className="back-button" onClick={() => history.goBack()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
              </svg>
            </button>
            <h1 className="settings-title">Settings</h1>
          </div>

          {/* User Profile Information */}
          <div className="user-profile-section">
            <div className="profile-picture">
              <div className="profile-avatar">
                <img src="/assets/icons/Avatars/default.jpg" alt="Profile" />
              </div>
            </div>
            <h2 className="user-name">{user?.name || 'Afolabi Emmanuel'}</h2>
            <p className="user-email">{user?.email || 'eafolabi.2201207@stu.cu.edu.ng'}</p>
          </div>

          {/* Account Settings Section */}
          <div className="settings-section">
            <h3 className="section-title">Account Settings</h3>
            <div className="settings-card">
              <div className="setting-item" onClick={handleMyProfile}>
                <div className="setting-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <h4 className="setting-title">My Profile</h4>
                  <p className="setting-description">Make changes to your account.</p>
                </div>
                <div className="setting-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
                </div>
              </div>

              <div className="setting-item" onClick={handleNotificationPreferences}>
                <div className="setting-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50">
                    <path d="M12,22A2,2 0 0,1 10,20A2,2 0 0,1 12,18A2,2 0 0,1 14,20A2,2 0 0,1 12,22M13,2V4.47L14,4.82A8,8 0 0,1 12,2M13,16.5V19H12A8,8 0 0,1 13,16.5M16.82,10H19.5A8,8 0 0,1 16.82,12L16.47,13L16.82,10M4.47,13L4.18,12A8,8 0 0,1 4.47,13H7.18L7.53,12L4.47,13M4.18,11A8,8 0 0,1 4.47,10H7.18L7.53,11L4.18,11M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <h4 className="setting-title">Notification & Reminders</h4>
                  <p className="setting-description">Control the notifications you receive.</p>
                </div>
                <div className="setting-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
                </div>
              </div>

              <div className="setting-item" onClick={handleAppPreferences}>
                <div className="setting-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50">
                    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <h4 className="setting-title">App Preferences</h4>
                  <p className="setting-description">Select your preferences.</p>
                </div>
                <div className="setting-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
                </div>
              </div>

              <div className="setting-item" onClick={handleLogout}>
                <div className="setting-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <h4 className="setting-title">Log out</h4>
                  <p className="setting-description">Sign out from this account.</p>
                </div>
                <div className="setting-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* More Section */}
          <div className="settings-section">
            <h3 className="section-title">More</h3>
            <div className="settings-card">
              <div className="setting-item">
                <div className="setting-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <h4 className="setting-title">Help & Support</h4>
                  <p className="setting-description">Get help and support.</p>
                </div>
                <div className="setting-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4CAF50">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                  </svg>
                </div>
                <div className="setting-content">
                  <h4 className="setting-title">About App</h4>
                  <p className="setting-description">Learn more about the app.</p>
                </div>
                <div className="setting-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </IonContent>

        {/* Logout Confirmation Modal */}
        <LogoutConfirmationModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirmLogout={handleConfirmLogout}
          userName={user?.name || 'Afolabi Emmanuel'}
          userEmail={user?.email || 'eafolabi.2201207@stu.cu.edu.ng'}
        />
      </IonPage>
    </>
  );
};

export default Settings;
