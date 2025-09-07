import React, { useState, useEffect } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonChip } from '@ionic/react';
import { checkmarkCircle, closeCircle, time } from 'ionicons/icons';
import './BackendStatus.css';

const BackendStatus: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/health');
        if (response.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } catch (error) {
        setStatus('offline');
      }
      setLastChecked(new Date());
    };

    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'online':
        return <IonIcon icon={checkmarkCircle} color="success" />;
      case 'offline':
        return <IonIcon icon={closeCircle} color="danger" />;
      case 'checking':
        return <IonIcon icon={time} color="warning" />;
      default:
        return <IonIcon icon={time} color="medium" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'success';
      case 'offline':
        return 'danger';
      case 'checking':
        return 'warning';
      default:
        return 'medium';
    }
  };

  return (
    <IonCard className="backend-status-card">
      <IonCardHeader>
        <IonCardTitle>
          Backend Status
          {getStatusIcon()}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="status-info">
          <IonChip color={getStatusColor()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </IonChip>
          <p>Last checked: {lastChecked.toLocaleTimeString()}</p>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default BackendStatus;
