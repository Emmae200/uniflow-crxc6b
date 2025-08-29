import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Onboarding.css';

const Onboarding: React.FC = () => {
  const history = useHistory();

  const handleNext = () => {
    // Remove focus before navigation to prevent ARIA conflicts
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    history.push('/onboarding2');
  };

  const handleSkip = () => {
    // You can add navigation to the main app or another screen here
    console.log('Skip clicked');
  };

  return (
    <IonPage>
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
              src="/assets/onboarding1.jpg" 
              alt="Study group collaboration"
              className="onboarding-image"
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="content-card">
          <div className="card-content">
            <h1 className="card-title">Study Smarter, Not Harder</h1>
            <p className="card-subtitle">Your all-in-one student productivity hub</p>
            
            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="skip-button" onClick={handleSkip}>Skip</button>
              <button className="next-button" onClick={handleNext}>Next</button>
            </div>
            
            {/* Pagination Dots */}
            <div className="pagination-dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
