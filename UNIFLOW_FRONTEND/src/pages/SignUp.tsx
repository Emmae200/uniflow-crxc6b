import { IonContent, IonPage, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './SignUp.css';

const SignUp: React.FC = () => {
  const history = useHistory();
  const { signInWithApple, signInWithGoogle, error, clearError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const handleAppleSignIn = async () => {
    try {
      setLoading(true);
      clearError();
      await signInWithApple();
      setToastMessage('Apple sign-in successful!');
      setToastColor('success');
      setShowToast(true);
      setTimeout(() => {
        history.push('/home');
      }, 1500);
    } catch (error: any) {
      setToastMessage(error.message || 'Apple sign-in failed. Please try again.');
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      clearError();
      await signInWithGoogle();
      setToastMessage('Google sign-in successful!');
      setToastColor('success');
      setShowToast(true);
      setTimeout(() => {
        history.push('/home');
      }, 1500);
    } catch (error: any) {
      setToastMessage(error.message || 'Google sign-in failed. Please try again.');
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = () => {
    // Navigate to a login page or show email login form
    history.push('/login');
  };

  const handleEmailSignUp = () => {
    // Navigate to registration page
    history.push('/register');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="signup-screen">
        {/* Background Video */}
        <div className="signup-background">
          <video 
            src="/assets/signup-bg.mp4" 
            className="signup-bg-video"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>



        {/* Skip Button Top */}
        <button className="signup-skip-button-top">Skip</button>

        {/* Sign In Card */}
        <div className="signin-card">
          <h1 className="signin-title">Sign In</h1>
          
                           {/* Sign In Buttons */}
                 <div className="signin-buttons">
                   <button className="signin-button apple-button" onClick={handleAppleSignIn} disabled={loading}>
                     <svg className="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                     </svg>
                     {loading ? 'Signing in...' : 'Continue with Apple'}
                   </button>

                   <button className="signin-button google-button" onClick={handleGoogleSignIn} disabled={loading}>
                     <img src="/assets/icons/icons2/939729_google icon_icon.svg" alt="Google" className="button-icon" />
                     {loading ? 'Signing in...' : 'Continue with Google'}
                   </button>

                   <button className="signin-button signup-button" onClick={handleEmailSignUp} disabled={loading}>
                     <svg className="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                     </svg>
                     Sign up with Email
                   </button>
                 </div>

                 {/* Sign In Link */}
                 <div className="signin-link-container">
                   <span className="signin-link-text">Already have an account? </span>
                   <button className="signin-link-button" onClick={handleEmailSignIn}>
                     Sign in
                   </button>
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
        <div className="signup-legal-text">
          By continuing, you agree to our{' '}
          <a href="#" className="signup-legal-link">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="signup-legal-link">Privacy Policy</a>
        </div>

        {/* Pagination Dots */}
        <div className="signup-pagination-dots">
          <div className="signup-dot"></div>
          <div className="signup-dot"></div>
          <div className="signup-dot active"></div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
