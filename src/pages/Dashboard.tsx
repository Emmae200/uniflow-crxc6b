import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAllEventsPopup, setShowAllEventsPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventPriority, setEventPriority] = useState<'low' | 'medium' | 'critical'>('low');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [events, setEvents] = useState<Array<{
    id: string;
    title: string;
    time: string;
    date: string;
    priority: 'low' | 'medium' | 'critical';
  }>>([]);

  // Task states
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'critical'>('low');
  const [tasks, setTasks] = useState<Array<{
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'critical';
    completed: boolean;
  }>>([]);

  const toggleCalendarDropdown = () => {
    setShowCalendarDropdown(!showCalendarDropdown);
  };

  const handleAddEvent = () => {
    setShowCalendarDropdown(false);
    setShowCalendarPopup(true);
  };

  const handleDeleteEvent = () => {
    setShowCalendarDropdown(false);
    if (events.length === 0) {
      alert('No events to delete');
      return;
    }
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter(event => event.id !== eventToDelete));
      setEventToDelete(null);
    } else {
      // Delete all events if no specific event is selected
      setEvents([]);
    }
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setEventToDelete(null);
  };

  const handleSelectEventToDelete = (eventId: string) => {
    setEventToDelete(eventId);
  };

  const handleShowAllEvents = () => {
    setShowAllEventsPopup(true);
  };

  const handleCloseAllEvents = () => {
    setShowAllEventsPopup(false);
  };

  // Sort events by date and get the closest 2
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const closestEvents = sortedEvents.slice(0, 2);
  const remainingEvents = sortedEvents.slice(2);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSaveEvent = () => {
    if (selectedDate && eventTitle && eventTime) {
      const newEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        time: eventTime,
        date: selectedDate.toLocaleDateString(),
        priority: eventPriority
      };
      setEvents([...events, newEvent]);
      setShowCalendarPopup(false);
      setSelectedDate(null);
      setEventTitle('');
      setEventTime('');
      setEventPriority('low');
    }
  };

  const handleClosePopup = () => {
    setShowCalendarPopup(false);
    setSelectedDate(null);
    setEventTitle('');
    setEventTime('');
    setEventPriority('low');
  };

  // Task functions
  const handleAddTask = () => {
    setShowTaskPopup(true);
  };

  const handleSaveTask = () => {
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        description: '',
        priority: taskPriority,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setShowTaskPopup(false);
      setTaskTitle('');
      setTaskPriority('low');
    }
  };

  const handleCloseTaskPopup = () => {
    setShowTaskPopup(false);
    setTaskTitle('');
    setTaskPriority('low');
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long' });
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handlePlansClick = () => {
    console.log('Navigating to plans...');
    console.log('Current location:', window.location.pathname);
    
    // Check if already on plans page
    if (window.location.pathname === '/plans-page') {
      console.log('Already on plans page');
      return;
    }
    
    // Remove focus from any focused element before navigation
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
    history.push('/plans-page');
  };

  const handleLogout = () => {
    logout();
    history.push('/signup');
  };

  return (
    <IonPage>
             <IonContent fullscreen className="dashboard-screen">
         {/* Header Section */}
                 <div className="dashboard-header">
                            <div className="greeting">
                   <h1>Good Morning,</h1>
                                       <h2>{user?.name || 'User'}</h2>
                 </div>
                     <div className="header-icons">
             <div className="streak-icon">
               <img src="/assets/icons/fire_streak.png" alt="Streak" className="flame-icon" />
               <span>5</span>
             </div>
                           <div className="profile-avatar">
                <img src="/assets/icons/icons2/7503204_user_profile_account_person_avatar_icon.svg" alt="Profile" className="avatar-img" />
              </div>
           </div>
        </div>

        {/* Metrics Grid */}
                 <div className="metrics-grid">
           <div className="metric-card">
             <div className="metric-icon">
               <img src="/assets/icons/calendar.png" alt="Calendar" />
             </div>
             <div className="metric-content">
               <h3>Today's Classes</h3>
               <p>4 scheduled</p>
             </div>
           </div>
           <div className="metric-card">
             <div className="metric-icon clipboard-icon">
               <img src="/assets/icons/clipboard.png" alt="Tasks" />
             </div>
             <div className="metric-content">
               <h3>Tasks Completed</h3>
               <p>3/5</p>
             </div>
           </div>
           <div className="metric-card">
             <div className="metric-icon">
               <img src="/assets/icons/books.png" alt="Study" />
             </div>
             <div className="metric-content">
               <h3>Study Session</h3>
               <p>1 hr 30 mins</p>
             </div>
           </div>
           <div className="metric-card">
             <div className="metric-icon">
               <img src="/assets/icons/bar_chart.png" alt="Productivity" />
             </div>
             <div className="metric-content">
               <h3>Productivity Score</h3>
               <p>85%</p>
             </div>
           </div>
         </div>

        {/* Calendar Section */}
        <div className="section-card calendar-section">
          <div className="section-header">
                       <div className="section-title">
             <img src="/assets/icons/icons2/calendar_icon.svg" alt="Calendar" className="section-icon" />
             <h2>Calendar</h2>
           </div>
                         <div className="section-options">
               <button className="dropdown-toggle" onClick={toggleCalendarDropdown}>⋯</button>
                               {showCalendarDropdown && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleAddEvent}>Add Event</button>
                    <button className="dropdown-item" onClick={handleDeleteEvent}>Delete Event</button>
                  </div>
                )}
             </div>
          </div>
                               <div className="section-content">
            {events.length === 0 ? (
              <div className="no-events">
                <p>No events</p>
              </div>
            ) : (
              <div className="events-container">
                <div className="events-list">
                  {closestEvents.map((event) => (
                    <div key={event.id} className="event-item">
                      <div className={`event-dot ${event.priority}-priority`}></div>
                      <div className="event-details">
                        <h4>{event.title}</h4>
                        <p>{event.time}</p>
                      </div>
                      <button 
                        className="delete-event-btn"
                        onClick={() => handleSelectEventToDelete(event.id)}
                        title="Delete this event"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {remainingEvents.length > 0 && (
                  <div className="more-events-section">
                    <button 
                      className="more-events-btn"
                      onClick={handleShowAllEvents}
                    >
                      +{remainingEvents.length} more
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Study Tracker Section */}
        <div className="section-card study-tracker-section">
          <div className="section-header">
                       <div className="section-title">
             <img src="/assets/icons/icons2/473800_clipboard_document_file_notepad_plan_icon.svg" alt="Study Tracker" className="section-icon" />
             <h2>Study Tracker</h2>
           </div>
          </div>
          <div className="section-content">
            <div className="study-progress">
              <div className="course-info">
                <h3>GEC104</h3>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '33%' }}></div>
                  </div>
                  <span className="progress-text">Week 4 of 12 completed</span>
                </div>
              </div>
              <button className="resume-button">Resume Study</button>
            </div>
          </div>
        </div>

        {/* Today's Tasks Section */}
        <div className="section-card tasks-section">
          <div className="section-header">
                       <div className="section-title">
             <img src="/assets/icons/icons2/473800_clipboard_document_file_notepad_plan_icon.svg" alt="Tasks" className="section-icon" />
             <h2>Today's Tasks</h2>
           </div>
          </div>
          <div className="section-content">
            {tasks.length === 0 ? (
              <div className="no-tasks">
                <p>No tasks yet</p>
              </div>
            ) : (
              <div className="task-list">
                {tasks.map((task) => (
                  <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div 
                      className={`checkbox ${task.completed ? 'checked' : 'unchecked'}`}
                      onClick={() => handleToggleTask(task.id)}
                    >
                      {task.completed && '✓'}
                    </div>
                                         <div className="task-content">
                       <span className="task-title">{task.title}</span>
                     </div>
                    <div className={`task-priority-dot ${task.priority}-priority`}></div>
                    <button 
                      className="delete-task-btn"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Delete this task"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button className="add-task-button" onClick={handleAddTask}>+</button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <div className="nav-item active">
            <div className="nav-icon">🏠</div>
            <span>Home</span>
          </div>
          <div className="nav-item" onClick={handlePlansClick}>
            <div className="nav-icon">📋</div>
            <span>Plans</span>
          </div>
          <div className="nav-item central">
            <div className="nav-icon">🌿</div>
          </div>
          <div className="nav-item">
            <div className="nav-icon">📚</div>
            <span>Courses</span>
          </div>
                                                                                                               <div className="nav-item" onClick={handleProfileClick}>
                     <div className="nav-icon">
                       <img src="/assets/icons/icons2/1814109_hamburger_menu_icon.svg" alt="Menu" />
                     </div>
                     <span>More</span>
                   </div>
                   <div className="nav-item" onClick={handleLogout}>
                     <div className="nav-icon">
                       <img src="/assets/icons/icons2/logout_icon.svg" alt="Logout" />
                     </div>
                     <span>Logout</span>
                   </div>
                 </div>

         {/* Calendar Popup */}
         {showCalendarPopup && (
           <div className="calendar-popup-overlay">
             <div className="calendar-popup">
               <div className="popup-header">
                 <h3>Add New Event</h3>
                 <button className="close-button" onClick={handleClosePopup}>×</button>
               </div>
               
                               <div className="popup-content">
                  {/* Calendar Header */}
                  <div className="calendar-header">
                    <button className="month-nav-button" onClick={handlePreviousMonth}>
                      ‹
                    </button>
                    <div className="month-year-display">
                      <h4>{getMonthName(currentMonth)} {currentMonth.getFullYear()}</h4>
                    </div>
                    <button className="month-nav-button" onClick={handleNextMonth}>
                      ›
                    </button>
                  </div>

                  {/* Day Headers */}
                  <div className="day-headers">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="day-header">{day}</div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="calendar-grid">
                    {/* Empty cells for days before the first day of the month */}
                    {Array.from({ length: getFirstDayOfMonth(currentMonth) }, (_, i) => (
                      <div key={`empty-${i}`} className="calendar-day empty"></div>
                    ))}
                    
                    {/* Days of the month */}
                    {Array.from({ length: getDaysInMonth(currentMonth) }, (_, i) => {
                      const day = i + 1;
                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                      const isSelected = selectedDate && 
                        selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentMonth.getMonth() && 
                        selectedDate.getFullYear() === currentMonth.getFullYear();
                      
                      return (
                        <button
                          key={day}
                          className={`calendar-day ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleDateSelect(date)}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="event-form">
                                         <input
                       type="text"
                       placeholder="Event title"
                       value={eventTitle}
                       onChange={(e) => setEventTitle(e.target.value)}
                       className="event-input"
                       maxLength={100}
                     />
                    <input
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="event-input"
                    />
                    
                    {/* Priority Selector */}
                    <div className="priority-selector">
                      <label>Priority:</label>
                      <div className="priority-options">
                        <button
                          type="button"
                          className={`priority-option ${eventPriority === 'low' ? 'selected' : ''}`}
                          onClick={() => setEventPriority('low')}
                        >
                          <span className="priority-dot low"></span>
                          Low
                        </button>
                        <button
                          type="button"
                          className={`priority-option ${eventPriority === 'medium' ? 'selected' : ''}`}
                          onClick={() => setEventPriority('medium')}
                        >
                          <span className="priority-dot medium"></span>
                          Medium
                        </button>
                        <button
                          type="button"
                          className={`priority-option ${eventPriority === 'critical' ? 'selected' : ''}`}
                          onClick={() => setEventPriority('critical')}
                        >
                          <span className="priority-dot critical"></span>
                          Critical
                        </button>
                      </div>
                    </div>
                  </div>
                 
                 <div className="popup-actions">
                   <button className="cancel-button" onClick={handleClosePopup}>
                     Cancel
                   </button>
                   <button className="save-button" onClick={handleSaveEvent}>
                     Save Event
                   </button>
                 </div>
               </div>
             </div>
           </div>
                   )}

          {/* Delete Event Popup */}
          {showDeletePopup && (
            <div className="calendar-popup-overlay">
              <div className="calendar-popup delete-popup">
                <div className="popup-header">
                  <h3>Delete Event</h3>
                  <button className="close-button" onClick={handleCancelDelete}>×</button>
                </div>
                
                <div className="popup-content">
                  <div className="delete-options">
                    <h4>Choose what to delete:</h4>
                    
                    {events.length > 0 && (
                      <div className="delete-option">
                        <button 
                          className={`delete-option-btn ${eventToDelete === null ? 'selected' : ''}`}
                          onClick={() => setEventToDelete(null)}
                        >
                          <span className="delete-icon">🗑️</span>
                          Delete All Events ({events.length})
                        </button>
                      </div>
                    )}
                    
                    {events.map((event) => (
                      <div key={event.id} className="delete-option">
                        <button 
                          className={`delete-option-btn ${eventToDelete === event.id ? 'selected' : ''}`}
                          onClick={() => setEventToDelete(event.id)}
                        >
                          <div className={`event-dot ${event.priority}-priority`}></div>
                          <div className="event-info">
                            <span className="event-title">{event.title}</span>
                            <span className="event-time">{event.time}</span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="popup-actions">
                    <button className="cancel-button" onClick={handleCancelDelete}>
                      Cancel
                    </button>
                    <button className="delete-button" onClick={handleConfirmDelete}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Events Popup */}
          {showAllEventsPopup && (
            <div className="calendar-popup-overlay">
              <div className="calendar-popup all-events-popup">
                <div className="popup-header">
                  <h3>All Events</h3>
                  <button className="close-button" onClick={handleCloseAllEvents}>×</button>
                </div>
                
                <div className="popup-content">
                  <div className="all-events-list">
                    {sortedEvents.map((event) => (
                      <div key={event.id} className="all-event-item">
                        <div className={`event-dot ${event.priority}-priority`}></div>
                        <div className="event-details">
                          <h4>{event.title}</h4>
                          <div className="event-meta">
                            <span className="event-date">{event.date}</span>
                            <span className="event-time">{event.time}</span>
                          </div>
                        </div>
                        <button 
                          className="delete-event-btn"
                          onClick={() => handleSelectEventToDelete(event.id)}
                          title="Delete this event"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="popup-actions">
                    <button className="cancel-button" onClick={handleCloseAllEvents}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Task Popup */}
          {showTaskPopup && (
            <div className="calendar-popup-overlay">
              <div className="calendar-popup">
                <div className="popup-header">
                  <h3>Add Task Detail</h3>
                  <button className="close-button" onClick={handleCloseTaskPopup}>×</button>
                </div>
                
                                 <div className="popup-content">
                   <div className="event-form">
                     <div>
                       <label>Task Detail:</label>
                                               <textarea
                          className="event-input"
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          placeholder="Enter task detail"
                          rows={3}
                          maxLength={100}
                        />
                     </div>

                    {/* Priority Selector */}
                    <div className="priority-selector">
                      <label>Priority:</label>
                      <div className="priority-options">
                        <button
                          type="button"
                          className={`priority-option ${taskPriority === 'low' ? 'selected' : ''}`}
                          onClick={() => setTaskPriority('low')}
                        >
                          <span className="priority-dot low"></span>
                          Low
                        </button>
                        <button
                          type="button"
                          className={`priority-option ${taskPriority === 'medium' ? 'selected' : ''}`}
                          onClick={() => setTaskPriority('medium')}
                        >
                          <span className="priority-dot medium"></span>
                          Medium
                        </button>
                        <button
                          type="button"
                          className={`priority-option ${taskPriority === 'critical' ? 'selected' : ''}`}
                          onClick={() => setTaskPriority('critical')}
                        >
                          <span className="priority-dot critical"></span>
                          Critical
                        </button>
                      </div>
                    </div>
                  </div>
                 
                  <div className="popup-actions">
                    <button className="cancel-button" onClick={handleCloseTaskPopup}>
                      Cancel
                    </button>
                    <button className="save-button" onClick={handleSaveTask}>
                      Save Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </IonContent>
      </IonPage>
    );
  };

export default Dashboard;
