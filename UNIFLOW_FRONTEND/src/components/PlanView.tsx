import React, { useState } from 'react';
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Targets from '../pages/Targets';
import Tasks from '../pages/Tasks';
import Progress from '../pages/Progress';
import './PlanView.css';

interface PlanViewProps {
  plan: {
    title: string;
    icon?: string;
    backgroundImage?: string;
    progress?: number;
    type?: string;
  };
  onClose?: () => void;
}

const PlanView: React.FC<PlanViewProps> = ({ plan, onClose }) => {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState<'targets' | 'tasks' | 'progress'>('targets');

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedTab(event.detail.value as 'targets' | 'tasks' | 'progress');
  };

  const handleBackClick = () => {
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
    
    if (onClose) {
      // For custom plans, use the onClose function
      onClose();
    } else {
      // For default plans, navigate back to plans page
      history.push('/plans-page');
    }
  };



  const renderContent = () => {
    switch (selectedTab) {
      case 'targets':
        return <div className="targets-container"><Targets /></div>;
      case 'tasks':
        return <div className="tasks-container"><Tasks /></div>;
      case 'progress':
        return <div className="progress-container"><Progress /></div>;
      default:
        return <div className="targets-container"><Targets /></div>;
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="plan-view-screen">
          {/* Status Bar Spacer */}
          <div className="status-bar-spacer"></div>
          
          {/* Header */}
          <div className="plan-header">
            <button className="back-button" onClick={handleBackClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
            <h1 className="plan-title">{plan.title}</h1>
            <button className="back-button-right" onClick={handleBackClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
          </div>

          {/* Plan Mini Banner */}
          <div className="plan-mini-banner">
            <img 
              src={plan.backgroundImage || "/assets/icons/plans_minibg.jpeg"} 
              alt={plan.title} 
              className="plan-mini-bg" 
            />
          </div>

          {/* Segment Control */}
          <div className="segment-container">
            <IonSegment 
              value={selectedTab} 
              onIonChange={handleSegmentChange}
              className="plan-segment"
            >
              <IonSegmentButton value="targets">
                <IonLabel>Targets</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="tasks">
                <IonLabel>Tasks</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="progress">
                <IonLabel>Progress</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Content */}
          <div className={`plan-content ${selectedTab}-active`}>
            {renderContent()}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PlanView;
