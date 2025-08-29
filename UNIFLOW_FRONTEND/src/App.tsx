import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Onboarding2 from './pages/Onboarding2';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Plans from './pages/Plans';
import Courses from './pages/Courses';
import CustomPlan from './pages/CustomPlan';
import WeeklySchedule from './pages/WeeklySchedule';
import TodoList from './pages/TodoList';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* Global transition styles */
import './theme/transitions.css';

setupIonicReact();

const App: React.FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Public Routes */}
            <Route exact path="/splash">
              <Splash />
            </Route>
            <Route exact path="/onboarding">
              <Onboarding />
            </Route>
            <Route exact path="/onboarding2">
              <Onboarding2 />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            
            {/* Protected Routes - Now properly secured */}
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/plans-page" component={Plans} />
            <ProtectedRoute exact path="/courses" component={Courses} />
            <ProtectedRoute exact path="/custom-plan-:planId" component={CustomPlan} />
            <ProtectedRoute exact path="/weekly-schedule" component={WeeklySchedule} />
            <ProtectedRoute exact path="/todo-list" component={TodoList} />
            
            {/* Default redirect */}
            <Route exact path="/">
              <Redirect to="/splash" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthProvider>
  </ErrorBoundary>
);

export default App;
