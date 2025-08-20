import { IonContent, IonPage, IonToast, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const { login, error, clearError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setToastMessage('Please fill in all fields');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    try {
      setLoading(true);
      clearError();
      await login(formData);
      setToastMessage('Login successful!');
      setToastColor('success');
      setShowToast(true);
      setTimeout(() => {
        history.push('/dashboard');
      }, 1500);
    } catch (error: any) {
      setToastMessage(error.message || 'Login failed. Please try again.');
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSignUp = () => {
    history.push('/signup');
  };

  const handleGoToRegister = () => {
    history.push('/register');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-screen">
        {/* Background Video */}
        <div className="login-background">
          <video 
            src="/assets/signup-bg.mp4" 
            className="login-bg-video"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Back Button */}
        <button className="login-back-button" onClick={handleBackToSignUp}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>

        {/* Login Card */}
        <div className="login-card">
          <h1 className="login-title">Sign In</h1>
          
          {/* Login Form */}
          <div className="login-form">
            <IonItem className="login-input-item">
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={formData.email}
                onIonChange={(e) => handleInputChange('email', e.detail.value || '')}
                placeholder="Enter your email"
                className="login-input"
              />
            </IonItem>

            <IonItem className="login-input-item">
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={formData.password}
                onIonChange={(e) => handleInputChange('password', e.detail.value || '')}
                placeholder="Enter your password"
                className="login-input"
              />
            </IonItem>

            <IonButton
              expand="block"
              className="login-submit-button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </IonButton>
          </div>

          {/* Toast for error messages */}
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={3000}
            color={toastColor}
            position="top"
          />
        </div>

        {/* Legal Text */}
        <div className="login-legal-text">
          Don't have an account?{' '}
          <button className="login-legal-link" onClick={handleGoToRegister}>
            Sign up
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
