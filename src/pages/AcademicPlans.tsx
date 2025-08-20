import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonLabel, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Targets from './Targets';
import Tasks from './Tasks';
import Progress from './Progress';
import './AcademicPlans.css';

const AcademicPlans: React.FC = () => {
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState<'targets' | 'tasks' | 'progress'>('targets');

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedTab(event.detail.value as 'targets' | 'tasks' | 'progress');
  };

  const handleBackClick = () => {
    // Remove focus from the button before navigation
    const backButton = document.querySelector('.back-button') as HTMLElement;
    if (backButton) {
      backButton.blur();
    }
    history.push('/plans-page');
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'targets':
        return <Targets />;
      case 'tasks':
        return <Tasks />;
      case 'progress':
        return <Progress />;
      default:
        return <Targets />;
    }
  };

  return (
    <IonPage className="academic-plans-page">
      <IonHeader className="academic-plans-header">
        <div className="header-content">
          <IonButton fill="clear" className="back-button" onClick={handleBackClick}>
            ←
          </IonButton>
          <h1 className="academic-plans-title">Academic Plans</h1>
        </div>
      </IonHeader>

      <IonContent className="academic-plans-content">
        <div className="plan-mini-banner">
          <img src="/assets/icons/plans_minibg.jpeg" alt="Academic Plans Background" className="plan-mini-bg" />
        </div>

        <IonSegment 
          value={selectedTab} 
          onIonChange={handleSegmentChange}
          className="academic-segment"
        >
          <IonSegmentButton value="targets" className="segment-button">
            <IonLabel>Targets</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="tasks" className="segment-button">
            <IonLabel>Tasks</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="progress" className="segment-button">
            <IonLabel>Progress</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <div className="content-container">
          {renderContent()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AcademicPlans;
