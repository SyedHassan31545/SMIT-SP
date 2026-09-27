import React, { useState } from 'react';
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

function MainApp() {
  const { currentUser, logout } = useAuth();
  const [currentRoleView, setCurrentRoleView] = useState('student');
  // Available screens: 'courses' | 'dashboard' | 'progress' | 'attendance' | 'assignment' | 'payment' | 'quiz'
  const [currentScreen, setCurrentScreen] = useState('courses');

  // If user is logged in
  if (currentUser?.isLoggedIn) {
    if (currentScreen === 'courses') {
      return (
        <CoursesPage
          onViewDetails={() => setCurrentScreen('dashboard')}
          onLogout={logout}
        />
      );
    }

    if (currentScreen === 'dashboard') {
      return (
        <CourseDashboard
          onNavigate={(screen) => setCurrentScreen(screen)}
          onBackToCourses={() => setCurrentScreen('courses')}
        />
      );
    }

    if (currentScreen === 'progress') {
      return (
        <ProgressPage
          onNavigate={(screen) => setCurrentScreen(screen)}
          onBackToCourses={() => setCurrentScreen('courses')}
        />
      );
    }

    if (currentScreen === 'attendance') {
      return (
        <AttendancePage
          onNavigate={(screen) => setCurrentScreen(screen)}
          onBackToCourses={() => setCurrentScreen('courses')}
        />
      );
    }

    if (currentScreen === 'assignment') {
      return (
        <AssignmentPage
          onNavigate={(screen) => setCurrentScreen(screen)}
          onBackToCourses={() => setCurrentScreen('courses')}
        />
      );
    }

    if (currentScreen === 'payment') {
      return (
        <PaymentPage
          onNavigate={(screen) => setCurrentScreen(screen)}
          onBackToCourses={() => setCurrentScreen('courses')}
        />
      );
    }

    if (currentScreen === 'quiz') {
      return (
        <QuizPage
          onNavigate={(screen) => setCurrentScreen(screen)}
          onBackToCourses={() => setCurrentScreen('courses')}
        />
      );
    }

    // Safe fallback: Agar koi screen match na ho tab bhi logged in Dashboard hi dikhayega, login page par nahi jayega
    return (
      <CourseDashboard
        onNavigate={(screen) => setCurrentScreen(screen)}
        onBackToCourses={() => setCurrentScreen('courses')}
      />
    );
  }

  // If logged out, show portals
  return (
    <div>
      {currentRoleView === 'student' && (
        <StudentLogin onSwitchRole={setCurrentRoleView} />
      )}
      {currentRoleView === 'trainer' && (
        <TrainerLogin onSwitchRole={setCurrentRoleView} />
      )}
      {currentRoleView === 'admin' && (
        <AdminLogin onSwitchRole={setCurrentRoleView} />
      )}
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