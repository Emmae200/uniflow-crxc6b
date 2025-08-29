import React, { useState } from 'react';
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Targets from './Targets';
import Tasks from './Tasks';
import Progress from './Progress';
import './FinancialPlans.css';

const FinancialPlans: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'targets' | 'tasks' | 'progress'>('targets');
  const history = useHistory();

  const handleBackClick = () => {
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
    history.push('/plans-page');
  };

  const handleTabChange = (value: 'targets' | 'tasks' | 'progress') => {
    setSelectedTab(value);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="financial-plans-screen">
          <PageHeader
            title="Financial Plans"
            backgroundColor="#447055"
            textColor="white"
            onBackClick={handleBackClick}
          />

          {/* Plan Mini Banner */}
          <div className="plan-mini-banner">
            <img src="/assets/icons/plans_minibg.jpeg" alt="Financial Plans" className="plan-mini-bg" />
          </div>

          {/* Segment Control */}
          <div className="segment-container">
            <IonSegment 
              value={selectedTab} 
              onIonChange={(e) => handleTabChange(e.detail.value as 'targets' | 'tasks' | 'progress')}
              className="financial-segment"
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
          <div className="financial-plans-content">
            {selectedTab === 'targets' && <Targets />}
            {selectedTab === 'tasks' && <Tasks />}
            {selectedTab === 'progress' && <Progress />}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FinancialPlans;
