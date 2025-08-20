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
        history.push('/dashboard');
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
        history.push('/dashboard');
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
                     <svg className="button-icon" width="20" height="20" viewBox="0 0 24 24">
                       <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                       <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                       <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                       <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                     </svg>
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
