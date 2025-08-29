import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BackendStatus from '../components/BackendStatus';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();
  const { user, logout } = useAuth();
  
  // UI Enhancement states
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  // Calendar states
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

  // UI Enhancement functions
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getCurrentTimeString = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getLastRefreshString = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastRefresh.getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleWeeklyScheduleClick = () => {
    console.log('Home: Weekly Schedule clicked');
    console.log('Current location:', window.location.pathname);
    
    // Remove focus from any focused element before navigation
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
    
    // Try React Router first, then fallback to window.location
    try {
      history.push('/weekly-schedule');
      console.log('Home: React Router navigation attempted');
    } catch (error) {
      console.error('Home: React Router failed, using window.location:', error);
      window.location.href = '/weekly-schedule';
    }
  };

  // Effects for UI enhancements
  useEffect(() => {
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Hide welcome animation after 3 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearTimeout(welcomeTimer);
    };
  }, []);

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

  const handleTasksCompletedClick = () => {
    history.push('/todo-list');
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

  const handleCoursesClick = () => {
    console.log('Navigating to courses...');
    console.log('Current location:', window.location.pathname);
    
    // Remove focus from any focused element before navigation
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
    
    // Try React Router first, then fallback to window.location
    try {
      history.push('/courses');
      console.log('React Router navigation attempted');
    } catch (error) {
      console.error('React Router failed, using window.location:', error);
      window.location.href = '/courses';
    }
  };



  return (
    <IonPage>
             <IonContent fullscreen className="dashboard-screen">
         {/* Header Section */}
        <div className="dashboard-header">
          <div className="greeting">
            <h1>{getGreeting()},</h1>
            <h2>{user?.name || 'User'}</h2>
            <div className="time-info">
              <span className="current-time">{getCurrentTimeString()}</span>
              <span className="last-refresh">Last updated: {getLastRefreshString()}</span>
            </div>
          </div>
          <div className="header-icons">
            <button 
              className={`refresh-btn ${isLoading ? 'loading' : ''}`}
              onClick={handleRefresh}
              title="Refresh dashboard"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
              </svg>
            </button>
            <div className="streak-icon">
              <img src="/assets/icons/fire_streak.png" alt="Streak" className="flame-icon" />
              <span>5</span>
            </div>
            <div className="profile-avatar" onClick={handleProfileClick}>
              <img src="/assets/icons/icons2/7503204_user_profile_account_person_avatar_icon.svg" alt="Profile" className="avatar-img" />
            </div>
          </div>
        </div>

        {/* Welcome Animation */}
        {showWelcomeAnimation && (
          <div className="welcome-animation">
            <div className="welcome-content">
              <h3>Welcome back! 👋</h3>
              <p>Ready to tackle today's goals?</p>
            </div>
          </div>
        )}

        {/* Backend Status */}
        <BackendStatus />

        {/* Metrics Grid */}
                 <div className="metrics-grid">
           <div className="metric-card" onClick={() => {
             console.log('Today\'s Classes card clicked!');
             console.log('About to call handleWeeklyScheduleClick');
             try {
               handleWeeklyScheduleClick();
               console.log('handleWeeklyScheduleClick completed successfully');
             } catch (error) {
               console.error('Error in handleWeeklyScheduleClick:', error);
             }
           }}>
             <div className="metric-icon">
               <img src="/assets/icons/calendar.png" alt="Calendar" />
             </div>
             <div className="metric-content">
               <h3>Today's Classes</h3>
               <p>4 scheduled</p>
             </div>
             <div className="card-arrow">→</div>
           </div>
           <div className="metric-card" onClick={handleTasksCompletedClick}>
             <div className="metric-icon clipboard-icon">
               <img src="/assets/icons/clipboard.png" alt="Tasks" />
             </div>
             <div className="metric-content">
               <h3>Tasks Completed</h3>
               <p>3/5</p>
             </div>
             <div className="card-arrow">→</div>
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



        {/* Calendar and Study Tracker Grid */}
        <div className="calendar-study-grid">
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

        {/* Spacer div to fix scrolling issue */}
        <div className="scroll-spacer"></div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <div className="nav-item active">
            <div className="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
              </svg>
            </div>
            <span>Home</span>
          </div>
          <div className="nav-item" onClick={handlePlansClick}>
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
          <div className="nav-item" onClick={handleCoursesClick}>
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
            <div className="modern-modal-overlay">
              <div className="modern-modal-content">
                <div className="modal-header">
                  <div className="modal-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                    </svg>
                  </div>
                  <h2>Add New Task</h2>
                  <p>Create a new task to stay organized</p>
                  <button className="close-btn" onClick={handleCloseTaskPopup}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="input-group">
                    <label>Task Description</label>
                    <div className="input-wrapper">
                      <textarea
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        rows={3}
                        maxLength={100}
                        className="modern-textarea"
                      />
                      <div className="input-counter">
                        {taskTitle.length}/100
                      </div>
                    </div>
                  </div>
                  
                  <div className="priority-selector">
                    <label>Priority Level</label>
                    <div className="priority-options">
                      <button
                        type="button"
                        className={`priority-option ${taskPriority === 'low' ? 'selected' : ''}`}
                        onClick={() => setTaskPriority('low')}
                      >
                        <div className="priority-indicator low"></div>
                        <span>Low</span>
                        <small>Not urgent</small>
                      </button>
                      <button
                        type="button"
                        className={`priority-option ${taskPriority === 'medium' ? 'selected' : ''}`}
                        onClick={() => setTaskPriority('medium')}
                      >
                        <div className="priority-indicator medium"></div>
                        <span>Medium</span>
                        <small>Important</small>
                      </button>
                      <button
                        type="button"
                        className={`priority-option ${taskPriority === 'critical' ? 'selected' : ''}`}
                        onClick={() => setTaskPriority('critical')}
                      >
                        <div className="priority-indicator critical"></div>
                        <span>Critical</span>
                        <small>Urgent</small>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="btn-secondary" 
                    onClick={handleCloseTaskPopup}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={handleSaveTask}
                    disabled={!taskTitle.trim()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          )}
        </IonContent>
      </IonPage>
    );
  };

export default Home;
