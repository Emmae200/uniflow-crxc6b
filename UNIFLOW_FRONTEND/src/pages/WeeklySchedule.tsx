import React, { useState } from 'react';
import { IonPage, IonContent, IonModal, IonHeader, IonToolbar, IonTitle, IonContent as IonModalContent, IonItem, IonLabel, IonInput, IonButtons, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './WeeklySchedule.css';

const WeeklySchedule: React.FC = () => {
  const history = useHistory();
  const [isEditMode, setIsEditMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCell, setEditingCell] = useState<{day: string, timeIndex: number} | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleBackClick = () => {
    history.goBack();
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
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
    'Mon': ['TMC', 'TMC', 'TMC', 'TMC', 'TMC', 'TMC'],
    'Tue': ['PHY', 'PHY', 'PHY', 'PHY', 'PHY', 'PHY'],
    'Wed': ['FIN', 'FIN', 'FIN', 'FIN', 'FIN', 'FIN'],
    'Thur': ['MIS', 'MIS', 'MIS', 'MIS', 'MIS', 'MIS'],
    'Fri': ['MAT', 'MAT', 'MAT', 'MAT', 'MAT', 'MAT']
  });

  const handleCellClick = (day: string, timeIndex: number) => {
    if (isEditMode) {
      setEditingCell({ day, timeIndex });
      setEditValue(scheduleData[day as keyof typeof scheduleData][timeIndex]);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = () => {
    console.log('handleSaveEdit called');
    console.log('editingCell:', editingCell);
    console.log('editValue:', editValue);
    
    if (editingCell) {
      const newScheduleData = { ...scheduleData };
      console.log('Before update:', newScheduleData[editingCell.day as keyof typeof scheduleData]);
      
      newScheduleData[editingCell.day as keyof typeof scheduleData][editingCell.timeIndex] = editValue;
      
      console.log('After update:', newScheduleData[editingCell.day as keyof typeof scheduleData]);
      console.log('Full new data:', newScheduleData);
      
      setScheduleData(newScheduleData);
      localStorage.setItem('weeklySchedule', JSON.stringify(newScheduleData));
      
      // Force a re-render
      setTimeout(() => {
        setScheduleData({...newScheduleData});
      }, 100);
    }
    
    setShowEditModal(false);
    setEditingCell(null);
    setEditValue('');
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
        <div className="schedule-header">
          <button className="back-button" onClick={handleBackClick}>
            <img src="/assets/icons/icons2/211686_back_arrow_icon.svg" alt="Back" />
          </button>
          <h1 className="page-title">Weekly Schedule</h1>
          <button className={`edit-button ${isEditMode ? 'active' : ''}`} onClick={handleEditClick}>
            <img src="/assets/icons/icons2/edit-icon.svg" alt="Edit" />
          </button>
        </div>

        {/* Schedule Grid */}
        <div className="schedule-container">
          <div className="schedule-grid">
            {/* Time slots and schedule cells */}
            {timeSlots.map((timeSlot, timeIndex) => (
              <React.Fragment key={timeSlot}>
                {/* Time slot header */}
                <div className="time-header">
                  <span className="time-text">{timeSlot}</span>
                </div>

                {/* Schedule cells for each day */}
                {days.map((day) => (
                  <div 
                    key={`${day}-${timeIndex}-${scheduleData[day as keyof typeof scheduleData][timeIndex]}`} 
                    className={`schedule-cell ${isEditMode ? 'editable' : ''}`}
                    onClick={() => handleCellClick(day, timeIndex)}
                  >
                    <span className="course-code">{scheduleData[day as keyof typeof scheduleData][timeIndex]}</span>
                  </div>
                ))}
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
              <div key={day} className="day-header">
                <span className="day-text">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="edit-modal-overlay">
            <div className="edit-modal">
              <div className="edit-modal-header">
                <h3>Edit Schedule</h3>
                <div className="edit-modal-buttons">
                  <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                  <button onClick={handleSaveEdit} className="save-btn">Save</button>
                </div>
              </div>
              <div className="edit-modal-content">
                <label>Course/Activity</label>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Enter course code or activity"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default WeeklySchedule;
