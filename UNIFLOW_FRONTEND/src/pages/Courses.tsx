import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { search, add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

import BottomNavigation from '../components/BottomNavigation';
import './Courses.css';

interface Course {
  id: string;
  code: string;
  week: number;
  lastOpened: string;
  color: string;
  iconColor: string;
  fileIcon: string;
}

const Courses: React.FC = () => {
  const history = useHistory();
  
  // State to track if school is linked
  const [isSchoolLinked, setIsSchoolLinked] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  
  // Sample courses data for when school is linked
  const sampleCourses: Course[] = [
    {
      id: '1',
      code: 'TMC 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, rgba(173, 216, 230, 0.8) 0%, rgba(135, 206, 235, 0.9) 100%)',
      iconColor: '#0066CC',
      fileIcon: '/assets/icons/Blue_File.png'
    },
    {
      id: '2',
      code: 'BUS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, rgba(144, 238, 144, 0.8) 0%, rgba(152, 251, 152, 0.9) 100%)',
      iconColor: '#006400',
      fileIcon: '/assets/icons/Green_File.png'
    },
    {
      id: '3',
      code: 'PHY 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, rgba(255, 182, 193, 0.8) 0%, rgba(255, 192, 203, 0.9) 100%)',
      iconColor: '#DC143C',
      fileIcon: '/assets/icons/Red_File.png'
    },
    {
      id: '4',
      code: 'FIN 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, rgba(221, 160, 221, 0.8) 0%, rgba(230, 190, 255, 0.9) 100%)',
      iconColor: '#8A2BE2',
      fileIcon: '/assets/icons/purple_file.png'
    },
    {
      id: '5',
      code: 'MIS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, rgba(173, 216, 230, 0.8) 0%, rgba(135, 206, 235, 0.9) 100%)',
      iconColor: '#0066CC',
      fileIcon: '/assets/icons/Blue_File.png'
    },
    {
      id: '6',
      code: 'MAT 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, rgba(144, 238, 144, 0.8) 0%, rgba(152, 251, 152, 0.9) 100%)',
      iconColor: '#006400',
      fileIcon: '/assets/icons/Green_File.png'
    },
    {
      id: '7',
      code: 'ENG 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, rgba(255, 182, 193, 0.8) 0%, rgba(255, 192, 203, 0.9) 100%)',
      iconColor: '#DC143C',
      fileIcon: '/assets/icons/Red_File.png'
    },
    {
      id: '8',
      code: 'HIS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, rgba(221, 160, 221, 0.8) 0%, rgba(230, 190, 255, 0.9) 100%)',
      iconColor: '#8A2BE2',
      fileIcon: '/assets/icons/purple_file.png'
    }
  ];
  
  console.log('Courses component rendered');
  

  
  useEffect(() => {
    console.log('Courses component mounted');
    console.log('Current URL:', window.location.href);
    console.log('Courses data:', courses);
    
    // Debug: Check if elements are visible
    setTimeout(() => {
      const screen = document.querySelector('.courses-screen');
      const header = document.querySelector('.header-content');
      const container = document.querySelector('.courses-container');
      
      console.log('Screen element:', screen);
      console.log('Header element:', header);
      console.log('Container element:', container);
      
      if (screen) {
        console.log('Screen styles:', window.getComputedStyle(screen));
      }
    }, 100);
  }, [courses]);

  const handleAddCourse = () => {
    // Navigate to jotting page when green add button is clicked
    console.log('Add course clicked - navigating to jotting page');
    history.push('/jotting');
  };

  const handleSearch = () => {
    // Navigate to home page for search functionality
    console.log('Search clicked');
    history.push('/home');
  };

  const handleCourseClick = (courseId: string) => {
    // Course cards are now non-clickable
    console.log('Course clicked:', courseId);
    // No navigation - cards are just for display
  };

  const handleLinkSchool = () => {
    // This would open a modal or navigate to a link page
    // For now, we'll simulate linking by setting the state
    console.log('Link school clicked');
    setIsSchoolLinked(true);
    setCourses(sampleCourses);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="courses-screen">
          {/* Status Bar Spacer */}
          <div className="status-bar-spacer"></div>
          
          {/* Header */}
          <div className="courses-header">
            <button className="back-button" onClick={() => history.goBack()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
            <div className="header-content">
              <h1 className="courses-title">Courses</h1>
            </div>
            <div className="header-actions">
              <button className="search-btn" onClick={handleSearch}>
                <img src="/assets/icons/icons2/search_icon.svg" alt="Search" />
              </button>
              <button className="jotting-label-right" onClick={handleAddCourse}>
                + Jotting
              </button>
            </div>
          </div>

          {/* Main Content */}
          {!isSchoolLinked ? (
            /* Blank State - School Not Linked */
            <div className="courses-blank-state">
              <div className="blank-state-content">
                <p className="blank-state-text">
                  To access your courses, please link UniFlow with your school's e-learning site. 
                  Tap 'Link' to enter your school's URL and connect your account. 
                  Once linked, your courses will appear here automatically.
                </p>
                <button className="link-school-btn" onClick={handleLinkSchool}>
                  Link
                </button>
              </div>
            </div>
          ) : (
            /* Dynamic State - School Linked, Show Courses */
            <div className="courses-container">
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className="course-card"
                  style={{ background: course.color }}
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="course-content">
                    <div className="course-info">
                      <h2 className="course-code">{course.code}</h2>
                      <p className="course-week">Week {course.week}</p>
                      <p className="course-last-opened">Last opened {course.lastOpened}</p>
                    </div>
                    <div className="course-icon">
                      <img 
                        src={course.fileIcon} 
                        alt="Course File" 
                        width="40" 
                        height="40"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* Invisible spacer card for better scrolling */}
              <div className="course-card-spacer"></div>
            </div>
          )}

          {/* Bottom Navigation */}
          <BottomNavigation />
        </div>


      </IonContent>
    </IonPage>
  );
};

export default Courses;
