import React, { useState } from 'react';
import { IonButton, IonIcon, IonInput } from '@ionic/react';
import { add, checkmark, close } from 'ionicons/icons';
import './Targets.css';

const Targets: React.FC = () => {
  const [targets, setTargets] = useState<string[]>([]);
  const [isAddingTarget, setIsAddingTarget] = useState(false);
  const [newTargetName, setNewTargetName] = useState('');

  const handleAddTarget = () => {
    setIsAddingTarget(true);
  };

  const handleSaveTarget = () => {
    if (newTargetName.trim()) {
      setTargets([...targets, newTargetName.trim()]);
      setNewTargetName('');
      setIsAddingTarget(false);
    }
  };

  const handleCancelTarget = () => {
    setNewTargetName('');
    setIsAddingTarget(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTarget();
    } else if (e.key === 'Escape') {
      handleCancelTarget();
    }
  };

  return (
    <div className="targets-container">
      <p className="targets-description">
        These are your main measurable goals within the plan
      </p>
      
      <div className="targets-list">
        {targets.length === 0 && !isAddingTarget ? (
          <div className="no-targets">
            <p>No target created</p>
          </div>
        ) : (
          <>
            {targets.map((target, index) => (
              <div key={index} className="target-item">
                <div className="target-checkbox"></div>
                <span className="target-text">{target}</span>
              </div>
            ))}
            {isAddingTarget && (
              <div className="target-item new-target-input">
                <div className="target-checkbox"></div>
                <IonInput
                  value={newTargetName}
                  onIonInput={(e) => setNewTargetName(e.detail.value || '')}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter target name..."
                  className="target-input"
                  autoFocus
                />
                <div className="target-actions">
                  <IonButton fill="clear" size="small" onClick={handleSaveTarget} className="save-btn">
                    <IonIcon icon={checkmark} />
                  </IonButton>
                  <IonButton fill="clear" size="small" onClick={handleCancelTarget} className="cancel-btn">
                    <IonIcon icon={close} />
                  </IonButton>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {!isAddingTarget && (
        <div className="new-target-button">
          <IonButton fill="clear" className="add-target-btn" onClick={handleAddTarget}>
            <IonIcon icon={add} className="add-icon" />
            <span>New Target</span>
          </IonButton>
        </div>
      )}
    </div>
  );
};

export default Targets;
