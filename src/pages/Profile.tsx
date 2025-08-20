import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  return (
    <IonPage>
      <IonContent fullscreen className="profile-screen">


        {/* Header */}
        <div className="profile-header">
          <button className="back-button" onClick={() => history.push('/home')}>
            <img src="/assets/icons/icons2/211686_back_arrow_icon.svg" alt="Back" />
          </button>
          <button className="settings-button">
            <img src="/assets/icons/icons2/settings_icon.svg" alt="Settings" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-picture-container">
            <div className="profile-picture">
              <img src="/assets/icons/icons2/7503204_user_profile_account_person_avatar_icon.svg" alt="Profile" className="profile-avatar-img" />
            </div>
            <button className="edit-profile-btn">
              <img src="/assets/icons/icons2/299068_add_sign_icon.svg" alt="Edit" />
            </button>
          </div>
                                                       <h1 className="profile-name">{user?.name || 'User'}</h1>
          <p className="profile-institution">Covenant University</p>
        </div>

        {/* User Information Form */}
        <div className="profile-form">
                     <div className="form-group">
             <label className="form-label">Your Email</label>
             <div className="input-field">
               <img src="/assets/icons/icons2/message_icon.svg" alt="Email" className="input-icon" />
                                    <input 
                       type="email" 
                       placeholder="xxx@gmail.com" 
                       className="form-input"
                       value={user?.email || ''}
                       readOnly
                     />
             </div>
           </div>

                     <div className="form-group">
             <label className="form-label">Phone Number</label>
             <div className="input-field">
               <img src="/assets/icons/icons2/phone_icon.svg" alt="Phone" className="input-icon" />
               <input 
                 type={showPhone ? "text" : "password"} 
                 placeholder="+234" 
                 className="form-input"
                 readOnly
               />
               <button 
                 className="visibility-toggle"
                 onClick={() => setShowPhone(!showPhone)}
               >
                 <img src="/assets/icons/icons2/hide_icon.svg" alt="Toggle visibility" />
               </button>
             </div>
           </div>

          <div className="form-group">
            <label className="form-label">School</label>
            <div className="input-field">
              <input 
                type="text" 
                placeholder="Covenant University" 
                className="form-input"
                readOnly
              />
            </div>
          </div>

                     <div className="form-group">
             <label className="form-label">Change Password</label>
             <div className="input-field">
               <img src="/assets/icons/icons2/lock_icon.svg" alt="Password" className="input-icon" />
               <input 
                 type={showPassword ? "text" : "password"} 
                 placeholder="xxx@gmail.com" 
                 className="form-input"
                 readOnly
               />
               <button 
                 className="visibility-toggle"
                 onClick={() => setShowPassword(!showPassword)}
               >
                 <img src="/assets/icons/icons2/hide_icon.svg" alt="Toggle visibility" />
               </button>
             </div>
           </div>
        </div>

        {/* Logout Button */}
                       <div className="logout-section">
                 <button className="logout-button" onClick={() => {
                   logout();
                   history.push('/signup');
                 }}>Logout</button>
               </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
