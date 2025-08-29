import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { search, add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
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
  
  // ✅ Move useState BEFORE useEffect
  const [courses] = useState<Course[]>([
    {
      id: '1',
      code: 'BUS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
      iconColor: '#0066CC',
      fileIcon: '/assets/icons/Blue_File.png'
    },
    {
      id: '2',
      code: 'BUS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, #90EE90 0%, #228B22 100%)',
      iconColor: '#006400',
      fileIcon: '/assets/icons/Green_File.png'
    },
    {
      id: '3',
      code: 'BUS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, #FFB6C1 0%, #DC143C 100%)',
      iconColor: '#FF4500',
      fileIcon: '/assets/icons/Red_File.png'
    },
    {
      id: '4',
      code: 'BUS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, #DDA0DD 0%, #8A2BE2 100%)',
      iconColor: '#8A2BE2',
      fileIcon: '/assets/icons/purple_file.png'
    },
    {
      id: '5',
      code: 'BUS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
      iconColor: '#0066CC',
      fileIcon: '/assets/icons/Blue_File.png'
    },
    {
      id: '6',
      code: 'BUS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, #90EE90 0%, #228B22 100%)',
      iconColor: '#006400',
      fileIcon: '/assets/icons/Green_File.png'
    },
    {
      id: '7',
      code: 'BUS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, #FFB6C1 0%, #DC143C 100%)',
      iconColor: '#FF4500',
      fileIcon: '/assets/icons/Red_File.png'
    },
    {
      id: '8',
      code: 'BUS 101',
      week: 5,
      lastOpened: '12-05-25',
      color: 'linear-gradient(135deg, #DDA0DD 0%, #8A2BE2 100%)',
      iconColor: '#8A2BE2',
      fileIcon: '/assets/icons/purple_file.png'
    }
  ]);
  
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
    // TODO: Implement add course functionality
    console.log('Add course clicked');
  };

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search clicked');
  };

  const handleCourseClick = (courseId: string) => {
    // TODO: Navigate to course details
    console.log('Course clicked:', courseId);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="courses-screen">
          <PageHeader
            title="Courses"
            backgroundColor="#E7E8E3"
            textColor="#447055"
            showBackButton={false}
            rightContent={
              <div className="header-actions">
                <IonButton fill="clear" className="search-btn" onClick={handleSearch}>
                  <IonIcon icon={search} />
                </IonButton>
                <IonButton fill="clear" className="add-course-btn" onClick={handleAddCourse}>
                  <IonIcon icon={add} />
                </IonButton>
              </div>
            }
          />

                     {/* Course Cards */}
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

          {/* Bottom Navigation */}
          <div className="bottom-nav">
            <div className="nav-item" onClick={() => {
              console.log('Courses: Navigating to home...');
              // Remove focus from any focused element before navigation
              const focusedElement = document.activeElement as HTMLElement;
              if (focusedElement) {
                focusedElement.blur();
              }
              try {
                history.push('/home');
              } catch (error) {
                console.error('Navigation error:', error);
                window.location.href = '/home';
              }
            }}>
              <div className="nav-icon">🏠</div>
              <span>Home</span>
            </div>
            <div className="nav-item" onClick={() => {
              console.log('Courses: Navigating to plans...');
              // Remove focus from any focused element before navigation
              const focusedElement = document.activeElement as HTMLElement;
              if (focusedElement) {
                focusedElement.blur();
              }
              try {
                history.push('/plans-page');
              } catch (error) {
                console.error('Navigation error:', error);
                window.location.href = '/plans-page';
              }
            }}>
              <div className="nav-icon">📋</div>
              <span>Plans</span>
            </div>
            <div className="nav-item central">
              <div className="nav-icon">🌿</div>
            </div>
            <div className="nav-item active">
              <div className="nav-icon">📚</div>
              <span>Courses</span>
            </div>
            <div className="nav-item">
              <div className="nav-icon">
                <img src="/assets/icons/icons2/1814109_hamburger_menu_icon.svg" alt="Menu" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Courses;
