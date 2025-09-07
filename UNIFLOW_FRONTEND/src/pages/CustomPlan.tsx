import React, { useState, useEffect } from 'react';
import { IonSegment, IonSegmentButton, IonPage } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import Targets from './Targets';
import Tasks from './Tasks';
import './CustomPlan.css';

const CustomPlan: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState('targets');
  const [planTitle, setPlanTitle] = useState('Custom Plan');

  useEffect(() => {
    // Load plan details from localStorage
    console.log('CustomPlan: Loading plan with ID:', planId);
    const savedPlans = localStorage.getItem('customPlans');
    if (savedPlans) {
      const plans = JSON.parse(savedPlans);
      console.log('CustomPlan: All saved plans:', plans);
      const plan = plans.find((p: any) => p.id.toString() === planId);
      console.log('CustomPlan: Found plan:', plan);
      if (plan) {
        setPlanTitle(plan.title);
      }
    }
  }, [planId]);



  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedTab(event.detail.value);
  };

  return (
    <IonPage>
      <div className="custom-plan-screen">
        {/* Status Bar Spacer */}
        <div className="status-bar-spacer"></div>
        
        {/* Header */}
        <div className="custom-plan-header">
          <h1 className="custom-plan-title">{planTitle}</h1>
        </div>

        {/* Plan Mini Banner */}
        <div className="plan-mini-banner">
          <img src="/assets/icons/custom-plan-bg.jpg" alt="Plan Background" className="plan-mini-bg" />
        </div>

        {/* Segment Control */}
        <div className="segment-container">
          <IonSegment value={selectedTab} onIonChange={handleSegmentChange} className="custom-segment">
            <IonSegmentButton value="targets">
              <span>Targets</span>
            </IonSegmentButton>
            <IonSegmentButton value="tasks">
              <span>Tasks</span>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Content */}
        <div className={`custom-plan-content ${selectedTab}-active`}>
          {selectedTab === 'targets' && (
            <div className="targets-container">
              <Targets />
            </div>
          )}
          {selectedTab === 'tasks' && (
            <div className="tasks-container">
              <Tasks />
            </div>
          )}
        </div>
      </div>
    </IonPage>
  );
};

export default CustomPlan;
