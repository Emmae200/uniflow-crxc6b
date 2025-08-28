import React, { useState, useRef } from 'react';
import { IonButton, IonIcon, IonInput, IonActionSheet } from '@ionic/react';
import { add, checkmark, close, trash, create } from 'ionicons/icons';
import './Targets.css';

interface Target {
  id: string;
  name: string;
  completed: boolean;
}

const Targets: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [isAddingTarget, setIsAddingTarget] = useState(false);
  const [newTargetName, setNewTargetName] = useState('');
  const [editingTarget, setEditingTarget] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressDelay = 500; // 0.5 seconds

  const handleAddTarget = () => {
    setIsAddingTarget(true);
  };

  const handleSaveTarget = () => {
    if (newTargetName.trim()) {
      const newTarget: Target = {
        id: Date.now().toString(),
        name: newTargetName.trim(),
        completed: false
      };
      setTargets([...targets, newTarget]);
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

  const handleTargetToggle = (targetId: string) => {
    setTargets(targets.map(target => 
      target.id === targetId 
        ? { ...target, completed: !target.completed }
        : target
    ));
  };

  const handleTouchStart = (targetId: string) => {
    longPressTimer.current = setTimeout(() => {
      setSelectedTargetId(targetId);
      setShowActionSheet(true);
    }, longPressDelay);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleEditTarget = () => {
    if (selectedTargetId) {
      const target = targets.find(t => t.id === selectedTargetId);
      if (target) {
        setEditingTarget(selectedTargetId);
        setEditingName(target.name);
      }
    }
    setShowActionSheet(false);
  };

  const handleDeleteTarget = () => {
    if (selectedTargetId) {
      setTargets(targets.filter(target => target.id !== selectedTargetId));
    }
    setShowActionSheet(false);
  };

  const handleSaveEdit = () => {
    if (editingTarget && editingName.trim()) {
      setTargets(targets.map(target => 
        target.id === editingTarget 
          ? { ...target, name: editingName.trim() }
          : target
      ));
      setEditingTarget(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingTarget(null);
    setEditingName('');
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
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
            {targets.map((target) => (
              <div 
                key={target.id} 
                className={`target-item ${target.completed ? 'completed' : ''}`}
                onTouchStart={() => handleTouchStart(target.id)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={() => handleTouchStart(target.id)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
              >
                <div 
                  className={`target-checkbox ${target.completed ? 'checked' : ''}`}
                  onClick={() => handleTargetToggle(target.id)}
                >
                  {target.completed && <IonIcon icon={checkmark} className="check-icon" />}
                </div>
                {editingTarget === target.id ? (
                  <IonInput
                    value={editingName}
                    onIonInput={(e) => setEditingName(e.detail.value || '')}
                    onKeyDown={handleEditKeyPress}
                    className="target-input"
                    autoFocus
                  />
                ) : (
                  <span className="target-text">{target.name}</span>
                )}
                {editingTarget === target.id && (
                  <div className="target-actions">
                    <IonButton fill="clear" size="small" onClick={handleSaveEdit} className="save-btn">
                      <IonIcon icon={checkmark} />
                    </IonButton>
                    <IonButton fill="clear" size="small" onClick={handleCancelEdit} className="cancel-btn">
                      <IonIcon icon={close} />
                    </IonButton>
                  </div>
                )}
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

      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={[
          {
            text: 'Edit',
            icon: create,
            handler: handleEditTarget
          },
          {
            text: 'Delete',
            icon: trash,
            role: 'destructive',
            handler: handleDeleteTarget
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]}
      />
    </div>
  );
};

export default Targets;
