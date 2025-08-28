import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import './Splash.css';

const Splash: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/onboarding');
    }, 3000);

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
