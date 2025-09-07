import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Splash.css';

const Splash: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    console.log('Splash useEffect triggered, setting timer...');
    const timer = setTimeout(() => {
      console.log('Timer completed, navigating to onboarding...');
      try {
        history.push('/onboarding');
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback: try window.location
        window.location.href = '/onboarding';
      }
    }, 3000);

    return () => {
      console.log('Cleaning up timer...');
      clearTimeout(timer);
    };

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen className="splash-screen">
        {/* Main Logo */}
        <div className="logo-container">
          <div className="logo">
            <span className="uni">Uni</span>
            <span className="flow">Flow</span>
          </div>
          {/* Loading Circle */}
          <div className="loading-circle">
            <div className="spinner"></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
