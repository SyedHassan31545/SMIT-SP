import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import StudentLogin from './pages/StudentLogin';
import TrainerLogin from './pages/TrainerLogin';
import AdminLogin from './pages/AdminLogin';
import CoursesPage from './pages/CoursesPage';
import CourseDashboard from './pages/CourseDashboard';
import ProgressPage from './pages/ProgressPage';
import AttendancePage from './pages/AttendancePage';
import AssignmentPage from './pages/AssignmentPage';
import PaymentPage from './pages/PaymentPage';
import QuizPage from './pages/QuizPage';

const SCREENS = {
  courses: CoursesPage,
  dashboard: CourseDashboard,
  progress: ProgressPage,
  attendance: AttendancePage,
  assignment: AssignmentPage,
  payment: PaymentPage,
  quiz: QuizPage,
};

// URL hash se screen padhta hai, is liye refresh aur browser Back button dono kaam karte hain
const readScreen = () => {
  const key = window.location.hash.replace('#', '');
  return SCREENS[key] ? key : 'courses';
};

function MainApp() {
  const { currentUser, logout } = useAuth();
  const [currentRoleView, setCurrentRoleView] = useState('student');
  // Hash badalne par sirf re-render karwate hain, screen render ke waqt hash se nikalti hai
  const [, rerender] = useReducer((n) => n + 1, 0);
  const currentScreen = readScreen();

  useEffect(() => {
    const onHash = () => rerender();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((screen) => {
    window.location.hash = screen;
    window.scrollTo({ top: 0 });
  }, []);

  const isLoggedIn = !!currentUser?.isLoggedIn;

  // Logout par hash saaf karo taake agla login Courses se shuru ho
  useEffect(() => {
    if (!isLoggedIn && window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    if (currentScreen === 'courses') {
      return <CoursesPage onViewDetails={() => navigate('dashboard')} onLogout={logout} />;
    }
    const Screen = SCREENS[currentScreen] || CourseDashboard;
    return <Screen onNavigate={navigate} onBackToCourses={() => navigate('courses')} />;
  }

  return (
    <div>
      {currentRoleView === 'student' && <StudentLogin onSwitchRole={setCurrentRoleView} />}
      {currentRoleView === 'trainer' && <TrainerLogin onSwitchRole={setCurrentRoleView} />}
      {currentRoleView === 'admin' && <AdminLogin onSwitchRole={setCurrentRoleView} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <MainApp />
      </StudentProvider>
    </AuthProvider>
  );
}
