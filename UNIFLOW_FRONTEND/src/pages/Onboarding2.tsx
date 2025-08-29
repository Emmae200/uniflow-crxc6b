import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import './Onboarding2.css';

const Onboarding2: React.FC = () => {
  const history = useHistory();

  // Fix focus management on component mount
  useEffect(() => {
    // Remove any existing focus to prevent ARIA conflicts
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const handleNext = () => {
    // Remove focus before navigation
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    history.push('/signup');
  };

  const handleSkip = () => {
    // Remove focus before navigation
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    history.push('/signup');
  };

  return (
    <IonPage className="onboarding-page">
      <IonContent fullscreen className="onboarding-screen">
        {/* Top Icons */}
        <div className="top-icons">
          <div className="close-icon">✕</div>
          <div className="heart-icon">♥</div>
        </div>

        {/* Circular Image Section */}
        <div className="image-section">
          <div className="circular-image">
            <img 
              src="/assets/onboarding2.jpg" 
              alt="Woman with sticky notes managing deadlines"
              className="onboarding-image"
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="content-card">
          <div className="card-content">
            <h1 className="card-title">Never Miss a Deadline Again</h1>
            <p className="card-subtitle">Easily manage your assignments, reminders, and to-dos — all in one place.</p>
            
            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="skip-button" onClick={handleSkip}>Skip</button>
              <button className="next-button" onClick={handleNext}>Next</button>
            </div>
            
            {/* Pagination Dots */}
            <div className="pagination-dots">
              <div className="dot"></div>
              <div className="dot active"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding2;
