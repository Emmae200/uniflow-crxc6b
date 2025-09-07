import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './NotificationPreferences.css';

const NotificationPreferences: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [dndDuringFocus, setDndDuringFocus] = useState(true);
  const [summaryFrequency, setSummaryFrequency] = useState('Daily');
  const [streakNotification, setStreakNotification] = useState(true);
  const [dailyTaskBriefing, setDailyTaskBriefing] = useState(true);

  const handleUpdate = () => {
    // Handle update logic here
    console.log('Notification preferences updated');
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent fullscreen className="notification-preferences-screen">
        {/* Status Bar Spacer */}
        <div className="status-bar-spacer"></div>

        {/* Header */}
        <div className="notification-header">
          <button className="back-button" onClick={() => history.goBack()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
            </svg>
          </button>
          <h1 className="notification-title">Setttings</h1>
        </div>

        {/* User Profile Section */}
        <div className="user-profile-section">
          <div className="profile-picture">
            <div className="profile-avatar">
              <img src="/assets/icons/Avatars/default.jpg" alt="Profile" />
            </div>
          </div>
          <h2 className="user-name">{user?.name || 'Afolabi Emmanuel'}</h2>
          <p className="user-email">{user?.email || 'eafolabi.2201207@stu.cu.edu.ng'}</p>
        </div>

        {/* Notification Settings Section */}
        <div className="notification-settings-section">
          <div className="settings-card">
            <div className="setting-item">
              <span className="setting-label">Push notifications</span>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="push-notifications"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                />
                <label htmlFor="push-notifications" className="toggle-label"></label>
              </div>
            </div>

            <div className="setting-item">
              <span className="setting-label">DND during Focus sessions</span>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="dnd-focus"
                  checked={dndDuringFocus}
                  onChange={(e) => setDndDuringFocus(e.target.checked)}
                />
                <label htmlFor="dnd-focus" className="toggle-label"></label>
              </div>
            </div>

            <div className="setting-item">
              <span className="setting-label">Daily/weekly Summary</span>
              <button 
                className="summary-button"
                onClick={() => setSummaryFrequency(summaryFrequency === 'Daily' ? 'Weekly' : 'Daily')}
              >
                {summaryFrequency}
              </button>
            </div>

            <div className="setting-item">
              <span className="setting-label">Notify when streak is about to end</span>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="streak-notification"
                  checked={streakNotification}
                  onChange={(e) => setStreakNotification(e.target.checked)}
                />
                <label htmlFor="streak-notification" className="toggle-label"></label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-label-container">
                <span className="setting-label">Daily task briefing</span>
                <span className="setting-description">(briefs you on the task for the day)</span>
              </div>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="daily-briefing"
                  checked={dailyTaskBriefing}
                  onChange={(e) => setDailyTaskBriefing(e.target.checked)}
                />
                <label htmlFor="daily-briefing" className="toggle-label"></label>
              </div>
            </div>
          </div>
        </div>

        {/* Update Button */}
        <div className="update-section">
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificationPreferences;
