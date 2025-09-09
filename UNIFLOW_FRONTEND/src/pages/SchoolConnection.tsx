import React, { useState } from 'react';
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './SchoolConnection.css';

const SchoolConnection: React.FC = () => {
  const history = useHistory();
  const [schoolUrl, setSchoolUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    if (!schoolUrl.trim()) {
      setError('Please enter a valid school URL');
      return;
    }

    // Validate URL format
    try {
      new URL(schoolUrl);
    } catch {
      setError('Please enter a valid URL (e.g., https://example.edu)');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, just navigate back to courses with success
      // In a real implementation, this would handle the OAuth flow
      history.push('/courses?connected=true');
    } catch (err) {
      setError('Failed to connect to school. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonContent fullscreen className="school-connection-screen">
        {/* Status Bar Spacer */}
        <div className="status-bar-spacer"></div>
        
        {/* Header */}
        <div className="school-connection-header">
          <button className="back-button" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <h1 className="school-connection-title">Connect School</h1>
          <div className="header-spacer"></div>
        </div>

        {/* Main Content */}
        <div className="school-connection-content">
          <div className="connection-card">
            <div className="connection-header">
              <h2>Link Your School</h2>
              <p>Connect to your school's learning management system to automatically sync your courses and materials.</p>
            </div>

            <div className="input-section">
              <label htmlFor="schoolUrl" className="input-label">
                School URL
              </label>
              <div className="input-container">
                <input
                  id="schoolUrl"
                  type="url"
                  value={schoolUrl}
                  onChange={(e) => setSchoolUrl(e.target.value)}
                  placeholder="https://your-school.edu"
                  className="url-input"
                  disabled={isConnecting}
                />
              </div>
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
            </div>

            <div className="connection-info">
              <h3>What happens next?</h3>
              <ul>
                <li>You'll be redirected to your school's login page</li>
                <li>Sign in with your school credentials</li>
                <li>Grant permission to access your course data</li>
                <li>Your courses and materials will be synced automatically</li>
              </ul>
            </div>

            <div className="button-section">
              <button
                className="connect-button"
                onClick={handleConnect}
                disabled={isConnecting || !schoolUrl.trim()}
              >
                {isConnecting ? (
                  <>
                    <div className="spinner"></div>
                    Connecting...
                  </>
                ) : (
                  'Connect'
                )}
              </button>
            </div>
          </div>

          {/* Supported Platforms */}
          <div className="supported-platforms">
            <h3>Supported Platforms</h3>
            <div className="platforms-grid">
              <div className="platform-item">
                <div className="platform-icon">🎓</div>
                <span>Moodle</span>
              </div>
              <div className="platform-item">
                <div className="platform-icon">📚</div>
                <span>Canvas</span>
              </div>
              <div className="platform-item">
                <div className="platform-icon">📖</div>
                <span>Blackboard</span>
              </div>
              <div className="platform-item">
                <div className="platform-icon">🔗</div>
                <span>Custom LMS</span>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SchoolConnection;
