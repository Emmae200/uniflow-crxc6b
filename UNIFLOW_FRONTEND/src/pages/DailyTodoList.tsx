import React, { useState } from 'react';
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router';
import Targets from './Targets';
import Tasks from './Tasks';
import Progress from './Progress';
import './DailyTodoList.css';

const DailyTodoList: React.FC = () => {
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
        <div className="daily-todo-list-screen">
          {/* Status Bar Spacer */}
          <div className="status-bar-spacer"></div>
          
          {/* Header */}
          <div className="header-content">
            <button className="back-button" onClick={handleBackClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
            <h1 className="page-title">Daily To-do List</h1>
          </div>

          {/* Plan Mini Banner */}
          <div className="plan-mini-banner">
            <img src="/assets/icons/plans_minibg.jpeg" alt="Daily To-do List" className="plan-mini-bg" />
          </div>

          {/* Segment Control */}
          <div className="segment-container">
            <IonSegment 
              value={selectedTab} 
              onIonChange={(e) => handleTabChange(e.detail.value as 'targets' | 'tasks' | 'progress')}
              className="daily-todo-segment"
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
          <div className="daily-todo-list-content">
            {selectedTab === 'targets' && <Targets />}
            {selectedTab === 'tasks' && <Tasks />}
            {selectedTab === 'progress' && <Progress />}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DailyTodoList;
