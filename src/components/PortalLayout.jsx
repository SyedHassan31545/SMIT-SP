import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  HelpCircle,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useAuth } from '../context/AuthContext';
import ProfileModal from './ProfileModal';
import FeedbackModal from './FeedbackModal';
import Avatar from './Avatar';
import { LogoImage } from './SmitLogo';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'progress', label: 'Progress', icon: BookOpen },
  { key: 'attendance', label: 'Attendance', icon: Calendar },
  { key: 'payment', label: 'Payment', icon: CreditCard },
  { key: 'assignment', label: 'Assignment', icon: FileText },
  { key: 'quiz', label: 'Quiz', icon: HelpCircle },
];

function SidebarContent({ active, onNavigate, onBackToCourses, onOpenProfile, onLogout, closeDrawer }) {
  const { student } = useStudent();

  const go = (key) => {
    onNavigate(key);
    closeDrawer?.();
  };

  return (
    <div className="h-full flex flex-col justify-between bg-white">
      <div>
        {/* Logo - top left */}
        <div className="px-4 h-16 flex items-center justify-between border-b border-gray-100">
          <button onClick={onBackToCourses} title="Back to Courses" className="flex items-center">
            <LogoImage size="sm" />
          </button>
          {closeDrawer ? (
            <button
              onClick={closeDrawer}
              aria-label="Close menu"
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          ) : (
            <button
              onClick={onBackToCourses}
              title="Back to Courses"
              aria-label="Back to Courses"
              className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 transition"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        <nav className="p-3 space-y-1" aria-label="Main">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = key === active;
            return (
              <button
                key={key}
                onClick={() => go(key)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition ${
                  isActive
                    ? 'font-semibold text-smit-blue bg-blue-50'
                    : 'font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={17} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-100">
        <button
          onClick={() => {
            onOpenProfile();
            closeDrawer?.();
          }}
          className="w-full p-3 flex items-center gap-2.5 text-left hover:bg-gray-50 transition"
          title="Edit profile"
        >
          <Avatar src={student.avatar} name={student.name} className="w-9 h-9" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{student.name}</p>
            <p className="text-[11px] text-gray-400 truncate">Roll # {student.rollNumber}</p>
          </div>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-6 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Sab logged-in pages ka shared layout (sidebar + header + mobile drawer).
 * active: sidebar mein highlight hone wali screen key
 * crumb:  breadcrumb ka aakhri naam (jaise "Progress"); dashboard par khali chhor dein
 */
export default function PortalLayout({ active, crumb, onNavigate, onBackToCourses, children }) {
  const { student } = useStudent();
  const { logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const sidebarProps = {
    active,
    onNavigate,
    onBackToCourses,
    onOpenProfile: () => setProfileOpen(true),
    onLogout: logout,
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-gray-800">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200 sticky top-0 h-screen">
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85%] shadow-xl animate-slide-in">
            <SidebarContent {...sidebarProps} closeDrawer={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200 px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {/* Mobile: hamburger + logo (top-left) */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 -ml-1 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <button onClick={onBackToCourses} className="lg:hidden shrink-0" aria-label="Home">
              <LogoImage size="sm" className="!h-9" />
            </button>

            <nav
              aria-label="Breadcrumb"
              className="hidden sm:flex items-center gap-1.5 text-xs sm:text-[13px] text-gray-500 min-w-0 lg:ml-0 ml-2"
            >
              <button onClick={onBackToCourses} className="hover:text-smit-blue hover:underline shrink-0">
                Home
              </button>
              <ChevronRight size={14} className="shrink-0" />
              {crumb ? (
                <>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="hover:text-smit-blue hover:underline truncate max-w-[14rem]"
                  >
                    {student.courseName}
                  </button>
                  <ChevronRight size={14} className="shrink-0" />
                  <span className="text-gray-800 font-medium shrink-0">{crumb}</span>
                </>
              ) : (
                <span className="text-gray-800 font-medium truncate">{student.courseName}</span>
              )}
            </nav>
            {/* Mobile: sirf current page ka naam */}
            <span className="sm:hidden text-sm font-semibold text-gray-800 truncate">
              {crumb || 'Dashboard'}
            </span>
          </div>

          <button
            onClick={() => setFeedbackOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-smit-blue hover:bg-blue-50 rounded-lg transition shrink-0"
          >
            <MessageSquare size={16} />
            <span className="hidden sm:inline">Feedback</span>
          </button>
        </header>

        <main className="p-3 sm:p-6 w-full max-w-6xl">{children}</main>
      </div>

      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
