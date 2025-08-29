import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

interface BackendStatusProps {
  onStatusChange?: (status: 'connected' | 'disconnected' | 'checking') => void;
}

const BackendStatus: React.FC<BackendStatusProps> = ({ onStatusChange }) => {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [healthData, setHealthData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      setStatus('checking');
      setError(null);
      
      const health = await apiService.healthCheck();
      setHealthData(health);
      setStatus('connected');
      onStatusChange?.('connected');
    } catch (err: any) {
      setError(err.message);
      setStatus('disconnected');
      onStatusChange?.('disconnected');
    }
  };

  const testDatabase = async () => {
    try {
      const dbTest = await apiService.testDatabase();
      console.log('Database test result:', dbTest);
      alert('Database connection successful!');
    } catch (err: any) {
      console.error('Database test failed:', err);
      alert(`Database test failed: ${err.message}`);
    }
  };

  return (
    <div className="backend-status">
      <div className="status-indicator">
        <div className={`status-dot ${status}`}></div>
        <span className="status-text">
          Backend: {status === 'connected' ? 'Connected' : status === 'disconnected' ? 'Disconnected' : 'Checking...'}
        </span>
      </div>
      
      {status === 'connected' && healthData && (
        <div className="health-info">
          <p>Status: {healthData.status}</p>
          <p>Database: {healthData.database}</p>
          <p>Users: {healthData.userCount}</p>
          <button onClick={testDatabase} className="test-db-btn">
            Test Database
          </button>
        </div>
      )}
      
      {error && (
        <div className="error-info">
          <p>Error: {error}</p>
          <button onClick={checkBackendStatus} className="retry-btn">
            Retry Connection
          </button>
        </div>
      )}
      
      <style>{`
        .backend-status {
          padding: 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin: 16px 0;
          background: #f9f9f9;
        }
        
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .status-dot.connected {
          background: #4caf50;
        }
        
        .status-dot.disconnected {
          background: #f44336;
        }
        
        .status-dot.checking {
          background: #ff9800;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        .health-info, .error-info {
          font-size: 14px;
        }
        
        .test-db-btn, .retry-btn {
          background: #447055;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 8px;
        }
        
        .test-db-btn:hover, .retry-btn:hover {
          background: #335544;
        }
      `}</style>
    </div>
  );
};

export default BackendStatus;
