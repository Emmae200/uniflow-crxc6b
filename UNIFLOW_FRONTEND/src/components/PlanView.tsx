import React, { useState } from 'react';
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons';
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
            <button className="back-button" onClick={() => onClose ? onClose() : history.goBack()}>
              <IonIcon icon={arrowBack} />
            </button>
            <h1 className="plan-title">{plan.title}</h1>
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
