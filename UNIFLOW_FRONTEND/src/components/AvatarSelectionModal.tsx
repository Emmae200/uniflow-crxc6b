import React from 'react';
import './AvatarSelectionModal.css';

interface AvatarSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAvatar: (avatarPath: string) => void;
  onUpdate: () => void;
  currentAvatar: string;
}

const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectAvatar,
  onUpdate,
  currentAvatar
}) => {
  const avatars = [
    { id: 'default', name: 'Default', path: '/assets/icons/Avatars/default.jpg' },
    { id: 'gamepfp', name: 'Gaming', path: '/assets/icons/Avatars/gamepfp.jpg' },
    { id: 'girl1', name: 'Girl 1', path: '/assets/icons/Avatars/girl1.jpg' },
    { id: 'girl2', name: 'Girl 2', path: '/assets/icons/Avatars/girl2.jpg' },
    { id: 'guy1', name: 'Guy 1', path: '/assets/icons/Avatars/guy1.jpg' },
    { id: 'guy2', name: 'Guy 2', path: '/assets/icons/Avatars/guy2.jpg' }
  ];

  if (!isOpen) return null;

  return (
    <div className="avatar-modal-overlay" onClick={onClose}>
      <div className="avatar-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="avatar-modal-title">select an avatar for your profile</h3>
        
        <div className="avatar-grid">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`avatar-option ${currentAvatar === avatar.path ? 'selected' : ''}`}
              onClick={() => onSelectAvatar(avatar.path)}
            >
              <img src={avatar.path} alt={avatar.name} />
            </div>
          ))}
        </div>
        
        <button className="avatar-update-btn" onClick={onUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default AvatarSelectionModal;
