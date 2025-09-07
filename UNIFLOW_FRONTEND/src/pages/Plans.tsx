import React, { useState, useEffect, useRef } from 'react';
import { IonIcon, IonPage, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButtons, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { search, add, close, trash, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import PlanView from '../components/PlanView';
import './Plans.css';

const Plans: React.FC = () => {
  const history = useHistory();
  const [activeFilter, setActiveFilter] = useState('all');
  const [customPlans, setCustomPlans] = useState<any[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [showCustomPlan, setShowCustomPlan] = useState(false);
  const [selectedCustomPlan, setSelectedCustomPlan] = useState<any>(null);
  const [showDeleteOption, setShowDeleteOption] = useState<number | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  console.log('Plans component rendered');

  // Load custom plans from localStorage on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('customPlans');
    if (savedPlans) {
      setCustomPlans(JSON.parse(savedPlans));
    }
  }, []);

  // Save custom plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customPlans', JSON.stringify(customPlans));
  }, [customPlans]);

  // Force view update when component mounts
  useEffect(() => {
    console.log('Plans component mounted');
  }, []);

  // Ionic lifecycle hook for better navigation
  const ionViewWillEnter = () => {
    console.log('Plans page will enter');
  };

  const ionViewDidEnter = () => {
    console.log('Plans page did enter');
  };

  const defaultPlans = [
    {
      id: 1,
      title: 'Daily To-do list',
      icon: '/assets/icons/daily-to-do.png',
      progress: 35,
      pinned: true,
      type: 'default'
    },
    {
      id: 2,
      title: 'Academic Plans',
      icon: '/assets/icons/academic-plans.png',
      progress: 40,
      pinned: false,
      type: 'default'
    },
    {
      id: 3,
      title: 'Personal Growth Plans',
      icon: '/assets/icons/personal-growth.png',
      progress: 30,
      pinned: false,
      type: 'default'
    },
    {
      id: 4,
      title: 'Fitness Plans',
      icon: '/assets/icons/health.png',
      progress: 25,
      pinned: false,
      type: 'default'
    },
    {
      id: 5,
      title: 'Financial Plans',
      icon: '/assets/icons/finance.png',
      progress: 45,
      pinned: false,
      type: 'default'
    }
  ];

  // Combine default and custom plans
  const allPlans = [...defaultPlans, ...customPlans];

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'create') {
      console.log('Opening create modal');
      setShowCreateModal(true);
    }
  };

  const handleCreatePlan = () => {
    console.log('handleCreatePlan called, newPlanName:', newPlanName);
    if (newPlanName.trim()) {
      const planId = Date.now();
      const newPlan = {
        id: planId,
        title: newPlanName.trim(),
        icon: '/assets/icons/clover.png',
        progress: 0,
        pinned: false,
        type: 'custom',
        route: `/custom-plan-${planId}`,
        createdAt: new Date().toISOString(),
        description: `Custom plan created on ${new Date().toLocaleDateString()}`
      };
      
      console.log('Creating new plan:', newPlan);
      setCustomPlans([...customPlans, newPlan]);
      setNewPlanName('');
      setShowCreateModal(false);
      setActiveFilter('all');
      console.log('Plan created successfully!');
    } else {
      console.log('Plan name is empty or only whitespace');
    }
  };

  const handleCancelCreate = () => {
    setNewPlanName('');
    setShowCreateModal(false);
    setActiveFilter('all');
  };



  const handleDeletePlan = (planId: number) => {
    setCustomPlans(customPlans.filter(plan => plan.id !== planId));
    setShowDeleteOption(null);
  };

  const handleLongPress = (planId: number) => {
    longPressTimerRef.current = setTimeout(() => {
      setShowDeleteOption(planId);
    }, 1000);
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handlePlanClick = (plan: any) => {
    console.log('Plan clicked:', plan.title);
    
    // Remove focus from any focused element before navigation
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
    
    // Set the selected plan and show the universal plan view
    setSelectedCustomPlan(plan);
    setShowCustomPlan(true);
  };

  return (
    <IonPage>
      <div className="plans-page">
        {/* Status Bar Spacer */}
        <div className="status-bar-spacer"></div>

        {/* Plan Header */}
        <div className="plans-header">
          <h1 className="plans-title">Plans</h1>
        </div>

        {/* Filter Div */}
        <div className="plans-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All plans
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'create' ? 'active' : ''}`}
            onClick={() => handleFilterChange('create')}
          >
            Create +
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'search' ? 'active' : ''}`}
            onClick={() => handleFilterChange('search')}
          >
            <IonIcon icon={search} />
            Search
          </button>
        </div>

        {/* Plans List */}
        <div className="plans-container">
          <div className="plans-list">
            {allPlans.map((plan) => (
              <div 
                key={plan.id} 
                className="plan-card" 
                onClick={() => handlePlanClick(plan)}
                onTouchStart={() => plan.type === 'custom' && handleLongPress(plan.id)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={() => plan.type === 'custom' && handleLongPress(plan.id)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
              >
                <img className="plan-icon" src={plan.icon} alt={plan.title} />
                <div className="plan-content">
                  <div className="plan-title-wrapper">
                    <h3 className="plan-title">{plan.title}</h3>
                  </div>
                  <div className="plan-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                {plan.pinned && (
                  <div className="pin-icon">
                    <img src="/assets/icons/pin-3d.png" alt="Pin" width="16" height="16" />
                  </div>
                )}
                {showDeleteOption === plan.id && plan.type === 'custom' && (
                  <div className="delete-option">
                    <button 
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePlan(plan.id);
                      }}
                    >
                      <IonIcon icon={trash} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>

      {/* Create Plan Modal */}
      {showCreateModal && (
        <div className="modern-modal-overlay">
          <div className="modern-modal-content">
            <div className="modal-header">
              <div className="modal-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                </svg>
              </div>
              <h2>Create New Plan</h2>
              <p>Start building your personalized plan</p>
              <button className="close-btn" onClick={handleCancelCreate}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="input-group">
                <label>Plan Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                    placeholder="Enter plan name..."
                    autoFocus
                    maxLength={50}
                    className="modern-input"
                  />
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
                    </svg>
                  </div>
                </div>
                <div className="input-counter">
                  {newPlanName.length}/50
                </div>
              </div>
              
              <div className="plan-preview">
                <div className="preview-card">
                  <img className="preview-icon" src="/assets/icons/clover.png" alt="Custom Plan" />
                  <div className="preview-content">
                    <h4>{newPlanName || 'Your Plan Name'}</h4>
                    <p>Custom Plan • 0% Complete</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={handleCancelCreate}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={handleCreatePlan}
                disabled={!newPlanName.trim()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                </svg>
                Create Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal Plan View */}
      {showCustomPlan && selectedCustomPlan && (
        <PlanView 
          plan={selectedCustomPlan} 
          onClose={() => setShowCustomPlan(false)} 
        />
      )}
    </IonPage>
  );
};

export default Plans;
