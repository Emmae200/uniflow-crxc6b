import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import LanguageSelectionModal from '../components/LanguageSelectionModal';
import StartPageSelectionModal from '../components/StartPageSelectionModal';
import SortTaskBarModal from '../components/SortTaskBarModal';
import WeekStartModal from '../components/WeekStartModal';
import './AppPreferences.css';

const AppPreferences: React.FC = () => {
  const history = useHistory();
  const [streakCount, setStreakCount] = useState(true);
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [defaultStartPage, setDefaultStartPage] = useState('Home');
  const [sortTaskBar, setSortTaskBar] = useState('Due date');
  const [weekStart, setWeekStart] = useState('Monday');
  
  // Modal states
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isStartPageModalOpen, setIsStartPageModalOpen] = useState(false);
  const [isSortTaskModalOpen, setIsSortTaskModalOpen] = useState(false);
  const [isWeekStartModalOpen, setIsWeekStartModalOpen] = useState(false);

  const handleUpdate = () => {
    // Handle update logic here
    console.log('Preferences updated');
  };

  // Modal handlers
  const handleLanguageSelect = (language: string) => {
    setDefaultLanguage(language);
  };

  const handleStartPageSelect = (startPage: string) => {
    setDefaultStartPage(startPage);
  };

  const handleSortTaskSelect = (sortOption: string) => {
    setSortTaskBar(sortOption);
  };

  const handleWeekStartSelect = (weekStart: string) => {
    setWeekStart(weekStart);
  };

  return (
    <>
      <style>
        {`
          .app-preferences-screen {
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
          className="app-preferences-screen"
          style={{ 
            backgroundColor: '#E7E8E3',
            '--background': '#E7E8E3'
          } as React.CSSProperties}
        >
          {/* Status Bar Spacer */}
          <div className="status-bar-spacer"></div>

          {/* Header */}
          <div className="app-preferences-header">
            <button className="back-button" onClick={() => history.goBack()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"/>
              </svg>
            </button>
            <h1 className="app-preferences-title">App Preferences</h1>
          </div>

          {/* User Profile Information */}
          <div className="user-profile-section">
            <div className="profile-picture">
              <div className="profile-avatar">
                <img src="/assets/icons/Avatars/default.jpg" alt="Profile" />
              </div>
            </div>
            <h2 className="user-name">Afolabi Emmanuel</h2>
            <p className="user-email">eafolabi.2201207@stu.cu.edu.ng</p>
          </div>

          {/* App Preferences Section */}
          <div className="preferences-section">
            <div className="preferences-card">
              <div className="preference-item" onClick={() => setIsLanguageModalOpen(true)}>
                <div className="preference-content">
                  <h4 className="preference-title">Default Language</h4>
                </div>
                <div className="preference-control">
                  <span className="preference-value">{defaultLanguage}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                  </svg>
                </div>
              </div>

              <div className="preference-item" onClick={() => setIsStartPageModalOpen(true)}>
                <div className="preference-content">
                  <h4 className="preference-title">Default Start Page</h4>
                </div>
                <div className="preference-control">
                  <span className="preference-value">{defaultStartPage}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                  </svg>
                </div>
              </div>

              <div className="preference-item" onClick={() => setIsSortTaskModalOpen(true)}>
                <div className="preference-content">
                  <h4 className="preference-title">Sort task bar</h4>
                </div>
                <div className="preference-control">
                  <span className="preference-value">{sortTaskBar}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                  </svg>
                </div>
              </div>

              <div className="preference-item" onClick={() => setIsWeekStartModalOpen(true)}>
                <div className="preference-content">
                  <h4 className="preference-title">week start</h4>
                </div>
                <div className="preference-control">
                  <span className="preference-value">{weekStart}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#666">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                  </svg>
                </div>
              </div>

              <div className="preference-item">
                <div className="preference-content">
                  <h4 className="preference-title">Streak Count</h4>
                </div>
                <div className="preference-control">
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={streakCount}
                      onChange={(e) => setStreakCount(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
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

        {/* Modal Components */}
        <LanguageSelectionModal
          isOpen={isLanguageModalOpen}
          onClose={() => setIsLanguageModalOpen(false)}
          onSelectLanguage={handleLanguageSelect}
          currentLanguage={defaultLanguage}
        />

        <StartPageSelectionModal
          isOpen={isStartPageModalOpen}
          onClose={() => setIsStartPageModalOpen(false)}
          onSelectStartPage={handleStartPageSelect}
          currentStartPage={defaultStartPage}
        />

        <SortTaskBarModal
          isOpen={isSortTaskModalOpen}
          onClose={() => setIsSortTaskModalOpen(false)}
          onSelectSortOption={handleSortTaskSelect}
          currentSortOption={sortTaskBar}
        />

        <WeekStartModal
          isOpen={isWeekStartModalOpen}
          onClose={() => setIsWeekStartModalOpen(false)}
          onSelectWeekStart={handleWeekStartSelect}
          currentWeekStart={weekStart}
        />
      </IonPage>
    </>
  );
};

export default AppPreferences;
