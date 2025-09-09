import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AvatarSelectionModal from '../components/AvatarSelectionModal';
import AvatarUpdateConfirmation from '../components/AvatarUpdateConfirmation';
import './Profile.css';

const Profile: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const [currentAvatar, setCurrentAvatar] = useState('/assets/icons/Avatars/default.jpg');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('/assets/icons/Avatars/default.jpg');
  
  // Form field states
  const [phoneNumber, setPhoneNumber] = useState('+234 123 456 7890');
  const [school, setSchool] = useState('Covenant University');
  const [newPassword, setNewPassword] = useState('');
  
  // Edit states
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingSchool, setIsEditingSchool] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handleEditAvatar = () => {
    setIsAvatarModalOpen(true);
  };

  const handleSelectAvatar = (avatarPath: string) => {
    setSelectedAvatar(avatarPath);
  };

  const handleUpdateAvatar = () => {
    setCurrentAvatar(selectedAvatar);
    setIsAvatarModalOpen(false);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationModalOpen(false);
  };

  // Edit handlers
  const handleEditPhone = () => {
    setIsEditingPhone(true);
  };

  const handleEditSchool = () => {
    setIsEditingSchool(true);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleSavePhone = () => {
    setIsEditingPhone(false);
    // Save to local storage
    console.log('Phone number updated:', phoneNumber);
  };

  const handleSaveSchool = () => {
    setIsEditingSchool(false);
    // Save to local storage
    console.log('School updated:', school);
  };

  const handleSavePassword = () => {
    setIsEditingPassword(false);
    // Save to local storage
    console.log('Password updated');
    setNewPassword(''); // Clear password field after saving
  };

  const handleUpdateProfile = () => {
    // Handle profile update logic here
    console.log('Profile updated');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="profile-screen">

        {/* Status Bar Spacer */}
        <div className="status-bar-spacer"></div>

        {/* Header */}
        <div className="profile-header">
          <button className="back-button" onClick={() => history.goBack()}>
            <img src="/assets/icons/icons2/211686_back_arrow_icon.svg" alt="Back" />
          </button>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-picture-container">
            <div className="profile-picture">
              <img src={currentAvatar} alt="Profile" className="profile-avatar-img" />
            </div>
            <button className="edit-profile-btn" onClick={handleEditAvatar}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.98804 14.6743L15.2322 3.71295L16.4406 3.39223L19.7292 6.16564L19.617 7.41082L10.3728 18.3721L5.53923 19.655L5.98804 14.6743Z" stroke="black"/>
                <path d="M13.5 5.50003L18 9.50003" stroke="black"/>
              </svg>
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
                  placeholder="user@apple.com" 
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
                  type="text" 
                  placeholder="+234 123 456 7890" 
                  className="form-input"
                  value={phoneNumber}
                  readOnly={!isEditingPhone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {isEditingPhone ? (
                  <button className="save-field-btn" onClick={handleSavePhone}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" stroke="#4CAF50" strokeWidth="2"/>
                    </svg>
                  </button>
                ) : (
                  <button className="edit-field-btn" onClick={handleEditPhone}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.98804 14.6743L15.2322 3.71295L16.4406 3.39223L19.7292 6.16564L19.617 7.41082L10.3728 18.3721L5.53923 19.655L5.98804 14.6743Z" stroke="black"/>
                      <path d="M13.5 5.50003L18 9.50003" stroke="black"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

          <div className="form-group">
            <label className="form-label">School</label>
            <div className="input-field">
              <input 
                type="text" 
                placeholder="Covenant University" 
                className="form-input"
                value={school}
                readOnly={!isEditingSchool}
                onChange={(e) => setSchool(e.target.value)}
              />
              {isEditingSchool ? (
                <button className="save-field-btn" onClick={handleSaveSchool}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" stroke="#4CAF50" strokeWidth="2"/>
                  </svg>
                </button>
              ) : (
                <button className="edit-field-btn" onClick={handleEditSchool}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.98804 14.6743L15.2322 3.71295L16.4406 3.39223L19.7292 6.16564L19.617 7.41082L10.3728 18.3721L5.53923 19.655L5.98804 14.6743Z" stroke="black"/>
                    <path d="M13.5 5.50003L18 9.50003" stroke="black"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

                     <div className="form-group">
             <label className="form-label">Change Password</label>
             <div className="input-field">
               <input 
                 type="password" 
                 placeholder="Enter new password" 
                 className="form-input"
                 value={newPassword}
                 readOnly={!isEditingPassword}
                 onChange={(e) => setNewPassword(e.target.value)}
               />
               {isEditingPassword ? (
                 <button className="save-field-btn" onClick={handleSavePassword}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" stroke="#4CAF50" strokeWidth="2"/>
                   </svg>
                 </button>
               ) : (
                 <button className="edit-field-btn" onClick={handleEditPassword}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M5.98804 14.6743L15.2322 3.71295L16.4406 3.39223L19.7292 6.16564L19.617 7.41082L10.3728 18.3721L5.53923 19.655L5.98804 14.6743Z" stroke="black"/>
                     <path d="M13.5 5.50003L18 9.50003" stroke="black"/>
                   </svg>
                 </button>
               )}
             </div>
           </div>
        </div>

        {/* Update Button */}
                       <div className="update-section">
                 <button className="update-button" onClick={handleUpdateProfile}>Update</button>
               </div>

        {/* Avatar Selection Modal */}
        <AvatarSelectionModal
          isOpen={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
          onSelectAvatar={handleSelectAvatar}
          onUpdate={handleUpdateAvatar}
          currentAvatar={currentAvatar}
        />

        {/* Avatar Update Confirmation Modal */}
        <AvatarUpdateConfirmation
          isOpen={isConfirmationModalOpen}
          onClose={handleCloseConfirmation}
          newAvatar={currentAvatar}
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
