import React, { useState, useEffect } from 'react';
import { IonButton, IonIcon, IonPage, IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButtons } from '@ionic/react';
import { search, add, close } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Plans.css';

const Plans: React.FC = () => {
  const history = useHistory();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [customPlans, setCustomPlans] = useState<any[]>([]);
  
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
      setShowCreateModal(true);
    }
  };

  const handleCreatePlan = () => {
    if (newPlanName.trim()) {
      const planId = Date.now(); // Use timestamp as unique ID
      const newPlan = {
        id: planId,
        title: newPlanName.trim(),
        icon: '/assets/icons/custom-plan.png', // Default icon for custom plans
        progress: 0,
        pinned: false,
        type: 'custom',
        route: `/custom-plan-${planId}`
      };
      
      setCustomPlans([...customPlans, newPlan]);
      setNewPlanName('');
      setShowCreateModal(false);
      setActiveFilter('all');
    }
  };

  const handleDeletePlan = (planId: number) => {
    setCustomPlans(customPlans.filter(plan => plan.id !== planId));
  };

  const handlePlanClick = (plan: any) => {
    console.log('Plan clicked:', plan.title);
    
    // Remove focus from any focused element before navigation
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
    
    if (plan.type === 'custom') {
      // Navigate to custom plan page
      history.push(plan.route);
      return;
    }
    
    switch (plan.title) {
      case 'Academic Plans':
        console.log('Navigating to academic plans...');
        history.push('/academic-plans');
        break;
      case 'Financial Plans':
        console.log('Navigating to financial plans...');
        history.push('/financial-plans');
        break;
      case 'Fitness Plans':
        console.log('Navigating to health plans...');
        history.push('/health-plans');
        break;
      case 'Personal Growth Plans':
        console.log('Navigating to personal growth plans...');
        history.push('/personal-growth-plans');
        break;
      case 'Daily To-do list':
        console.log('Navigating to daily todo list...');
        history.push('/daily-todo-list');
        break;
      default:
        console.log('Unknown plan:', plan.title);
    }
  };

  return (
    <IonPage>
      <div className="plans-page">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-bar-left">9:41</div>
        <div className="status-bar-right">
          <div className="signal-bars"></div>
          <div className="wifi-icon"></div>
          <div className="battery-icon"></div>
        </div>
      </div>

      {/* Header */}
      <div className="plans-header">
        <h1 className="plans-title">Plans</h1>
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
      </div>

      {/* Plans List */}
      <div className="plans-container">
        <div className="plans-list">
          {allPlans.map((plan) => (
            <div key={plan.id} className="plan-card" onClick={() => handlePlanClick(plan)}>
              <div className="plan-icon">
                <img src={plan.icon} alt={plan.title} />
              </div>
              <div className="plan-content">
                <h3 className="plan-title">{plan.title}</h3>
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
              {plan.type === 'custom' && (
                <div 
                  className="delete-plan-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlan(plan.id);
                  }}
                >
                  ×
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create Plan Modal */}
      <IonModal isOpen={showCreateModal} onDidDismiss={() => setShowCreateModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Create New Plan</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowCreateModal(false)}>
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Plan Name</IonLabel>
            <IonInput
              value={newPlanName}
              onIonChange={(e) => setNewPlanName(e.detail.value || '')}
              placeholder="Enter plan name..."
              clearInput={true}
            />
          </IonItem>
          <div style={{ marginTop: '20px' }}>
            <IonButton 
              expand="block" 
              onClick={handleCreatePlan}
              disabled={!newPlanName.trim()}
            >
              Create Plan
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

             {/* Bottom Navigation */}
       <div className="bottom-nav">
         <div className="nav-item" onClick={() => {
           // Remove focus from any focused element before navigation
           const focusedElement = document.activeElement as HTMLElement;
           if (focusedElement) {
             focusedElement.blur();
           }
           history.push('/home');
         }}>
          <div className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
            </svg>
          </div>
          <span>Home</span>
        </div>
        <div className="nav-item active">
          <div className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
              <path d="M7,7H17V9H7V7M7,11H17V13H7V11M7,15H14V17H7V15Z"/>
            </svg>
          </div>
          <span>Plans</span>
        </div>
        <div className="nav-item central">
          <div className="nav-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
            </svg>
          </div>
        </div>
        <div className="nav-item" onClick={() => {
          console.log('Plans: Navigating to courses...');
          console.log('Current location:', window.location.pathname);
          
          // Remove focus from any focused element before navigation
          const focusedElement = document.activeElement as HTMLElement;
          if (focusedElement) {
            focusedElement.blur();
          }
          
          // Try React Router first, then fallback to window.location
          try {
            history.push('/courses');
            console.log('Plans: React Router navigation attempted');
          } catch (error) {
            console.error('Plans: React Router failed, using window.location:', error);
            window.location.href = '/courses';
          }
        }}>
          <div className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
              <path d="M7,7H17V9H7V7M7,11H17V13H7V11M7,15H14V17H7V15Z"/>
            </svg>
          </div>
          <span>Courses</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
            </svg>
          </div>
          <span>More</span>
                 </div>
       </div>
     </div>
    </IonPage>
   );
 };

export default Plans;
