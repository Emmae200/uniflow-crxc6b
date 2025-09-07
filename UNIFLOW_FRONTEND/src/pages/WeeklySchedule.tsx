import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonModal, IonHeader, IonToolbar, IonTitle, IonContent as IonModalContent, IonItem, IonLabel, IonInput, IonButtons, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import './WeeklySchedule.css';

const WeeklySchedule: React.FC = () => {
  const history = useHistory();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCell, setEditingCell] = useState<{day: string, timeIndex: number} | null>(null);
  const [editValue, setEditValue] = useState('');
  
  // UI Enhancement states
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showWeekSelector, setShowWeekSelector] = useState(false);
  const [selectedView, setSelectedView] = useState<'week' | 'day'>('week');
  const [currentDay, setCurrentDay] = useState<string>('Mon');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleBackClick = () => {
    history.goBack();
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      setShowSuccessMessage(false);
    }
  };

  // UI Enhancement functions
  const getWeekRange = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4);
    
    return {
      start: startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const handlePreviousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(newWeek);
  };

  const handleNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(newWeek);
  };

  const handleToday = () => {
    setCurrentWeek(new Date());
    // Set current day based on actual day of week
    const today = new Date().getDay();
    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    setCurrentDay(dayMap[today]);
  };

  const getDiagonalColor = (dayIndex: number, timeIndex: number) => {
    // Calculate diagonal position (top-left to bottom-right)
    const diagonalPosition = dayIndex + timeIndex;
    
    // Use the original gradient colors from the previous weekly schedule
    const diagonalGradients = [
      'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',      // TMC Red
      'linear-gradient(135deg, #4ECDC4 0%, #6EDDD5 100%)',      // PHY Teal
      'linear-gradient(135deg, #45B7D1 0%, #67C9E1 100%)',      // FIN Blue
      'linear-gradient(135deg, #96CEB4 0%, #B8DEC4 100%)',      // MIS Green
      'linear-gradient(135deg, #FFEAA7 0%, #FFF2C7 100%)',      // MAT Yellow
      'linear-gradient(135deg, #DDA0DD 0%, #E5B8E5 100%)',      // ENG Purple
      'linear-gradient(135deg, #98D8C8 0%, #BAE8DE 100%)',      // HIS Mint
      'linear-gradient(135deg, #F7DC6F 0%, #F9E699 100%)'       // BIO Gold
    ];
    
    // Map diagonal position to gradient colors (cycling through the array)
    const colorIndex = diagonalPosition % diagonalGradients.length;
    return diagonalGradients[colorIndex];
  };

  const timeSlots = [
    '5:00 - 7:00',
    '3:00 - 5:00', 
    '2:00 - 3:00',
    '12:00 - 2:00',
    '10:00 - 12:00',
    '8:00 - 10:00'
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'];
  
  const [scheduleData, setScheduleData] = useState({
    'Mon': ['TMC', 'PHY', 'FIN', 'MIS', 'MAT', 'ENG'],
    'Tue': ['PHY', 'FIN', 'MIS', 'MAT', 'ENG', 'HIS'],
    'Wed': ['FIN', 'MIS', 'MAT', 'ENG', 'HIS', 'BIO'],
    'Thur': ['MIS', 'MAT', 'ENG', 'HIS', 'BIO', 'TMC'],
    'Fri': ['MAT', 'ENG', 'HIS', 'BIO', 'TMC', 'PHY']
  });



  const handleCellClick = (day: string, timeIndex: number) => {
    if (isEditMode) {
      setEditingCell({ day, timeIndex });
      setEditValue(scheduleData[day as keyof typeof scheduleData][timeIndex]);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingCell) {
      setIsLoading(true);
      
      const newScheduleData = { ...scheduleData };
      newScheduleData[editingCell.day as keyof typeof scheduleData][editingCell.timeIndex] = editValue;
      
      setScheduleData(newScheduleData);
      localStorage.setItem('weeklySchedule', JSON.stringify(newScheduleData));
      
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
      
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
        setShowEditModal(false);
        setEditingCell(null);
        setEditValue('');
      }, 500);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingCell(null);
    setEditValue('');
  };

  // Load saved schedule on component mount
  React.useEffect(() => {
    const savedSchedule = localStorage.getItem('weeklySchedule');
    if (savedSchedule) {
      try {
        setScheduleData(JSON.parse(savedSchedule));
      } catch (error) {
        console.error('Error loading saved schedule:', error);
      }
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="weekly-schedule-screen">
        {/* Status Bar Spacer */}
        <div className="status-bar-spacer"></div>
        
        {/* Header */}
        <div className="weekly-schedule-header">
          <div className="header-left">
            <button className="back-button" onClick={() => history.goBack()}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
            <h1 className="weekly-schedule-title">Weekly Schedule</h1>
          </div>
          <div className="header-actions">
            <button className={`view-toggle ${selectedView === 'day' ? 'active' : ''}`} onClick={() => {
              if (selectedView === 'week') {
                setSelectedView('day');
                // Set current day when switching to day view
                const today = new Date().getDay();
                const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
                setCurrentDay(dayMap[today]);
              } else {
                setSelectedView('week');
              }
            }}>
              {selectedView === 'week' ? 'Week' : 'Day'}
            </button>
            <button className={`edit-button ${isEditMode ? 'active' : ''}`} onClick={handleEditClick}>
              <img src="/assets/icons/icons2/edit-icon.svg" alt="Edit" />
            </button>
          </div>
        </div>
        
        {/* Week Navigation */}
        <div className="week-navigation">
          <button className="nav-btn" onClick={handlePreviousWeek}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
            </svg>
          </button>
          <div className="week-display" onClick={() => setShowWeekSelector(!showWeekSelector)}>
            <span className="week-range">{getWeekRange().start} - {getWeekRange().end}</span>
            <button className="today-btn" onClick={handleToday}>Today</button>
          </div>
          <button className="nav-btn" onClick={handleNextWeek}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
            </svg>
          </button>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
            </svg>
            <span>Schedule updated successfully!</span>
          </div>
        )}

        {/* Schedule Grid */}
        <div className="schedule-container">
          <div className={`schedule-grid ${selectedView === 'day' ? 'day-view' : ''}`}>
            {/* Time slots and schedule cells */}
            {timeSlots.map((timeSlot, timeIndex) => (
              <React.Fragment key={timeSlot}>
                {/* Time slot header */}
                <div className="time-header">
                  <span className="time-text">{timeSlot}</span>
                </div>

                {/* Schedule cells for each day */}
                {days.map((day) => {
                  const courseCode = scheduleData[day as keyof typeof scheduleData][timeIndex];
                  const isCurrentTime = new Date().getDay() === days.indexOf(day) + 1 && 
                    new Date().getHours() >= parseInt(timeSlots[timeIndex].split(':')[0]) &&
                    new Date().getHours() < parseInt(timeSlots[timeIndex].split(':')[1]);
                  const isCurrentDay = selectedView === 'day' && day === currentDay;
                  
                  return (
                    <div 
                      key={`${day}-${timeIndex}-${courseCode}`} 
                      className={`schedule-cell ${isEditMode ? 'editable' : ''} ${isCurrentTime ? 'current-time' : ''} ${isCurrentDay ? 'current-day' : ''}`}
                      onClick={() => handleCellClick(day, timeIndex)}
                      style={{
                        background: getDiagonalColor(days.indexOf(day), timeIndex),
                        borderLeft: isCurrentTime ? '4px solid #2c5f2c' : undefined,
                        border: selectedView === 'day' && day === currentDay ? '3px solid #2c5f2c' : undefined
                      }}
                    >
                      <span className="course-code">{courseCode}</span>
                      {isCurrentTime && <div className="current-indicator"></div>}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}

            {/* Bottom-left corner cell */}
            <div className="corner-cell">
              <div className="corner-content">
                <span className="corner-text-vertical">Time</span>
                <span className="corner-text-horizontal">Days</span>
              </div>
            </div>

            {/* Day headers at bottom */}
            {days.map((day) => (
              <div 
                key={day} 
                className={`day-header ${selectedView === 'day' && day === currentDay ? 'current-day-header' : ''}`}
              >
                <span className="day-text">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="modern-modal-overlay">
            <div className="modern-modal-content">
              <div className="modal-header">
                <div className="modal-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z"/>
                  </svg>
                </div>
                <h2>Edit Schedule</h2>
                <p>Update your course or activity</p>
                <button className="close-btn" onClick={handleCancelEdit}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                  </svg>
                </button>
              </div>
              
              <div className="modal-body">
                <div className="input-group">
                  <label>Course/Activity</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder="Enter course code or activity..."
                      autoFocus
                      disabled={isLoading}
                      className="modern-input"
                    />
                    <div className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="quick-select">
                  <label>Quick Select</label>
                  <div className="quick-options">
                    {['TMC', 'PHY', 'FIN', 'MIS', 'MAT', 'ENG', 'HIS', 'BIO'].map((course) => (
                      <button
                        key={course}
                        className="quick-option"
                        onClick={() => setEditValue(course)}
                        style={{ 
                          background: getDiagonalColor(0, 0),
                          border: editValue === course ? '3px solid #2c5f2c' : 'none'
                        }}
                      >
                        {course}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn-secondary" 
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}


      </IonContent>
    </IonPage>
  );
};

export default WeeklySchedule;
