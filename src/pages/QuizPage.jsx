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
  Award,
  AlertCircle
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import ProfileModal from '../components/ProfileModal';

export default function QuizPage({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed'

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-gray-800 font-sans">
      {/* Left Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-4 flex items-center justify-between border-b border-gray-100">
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-[#0ea5e9]">S</span>
                <span className="text-[#1e4886]">M</span>
                <span className="text-[#84cc16]">I</span>
                <span className="text-[#0ea5e9]">T</span>
              </span>
              <span className="text-[7px] font-bold text-gray-500">SAYLANI MASS IT TRAINING</span>
            </div>
            <button
              onClick={onBackToCourses}
              title="Back to Courses"
              className="p-1 rounded-md text-gray-400 hover:bg-gray-100 transition"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <nav className="p-3 space-y-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate('progress')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <BookOpen size={16} />
              <span>Progress</span>
            </button>
            <button
              onClick={() => onNavigate('attendance')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <Calendar size={16} />
              <span>Attendance</span>
            </button>
            <button
              onClick={() => onNavigate('payment')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <CreditCard size={16} />
              <span>Payment</span>
            </button>
            <button
              onClick={() => onNavigate('assignment')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <FileText size={16} />
              <span>Assignment</span>
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-smit-blue bg-blue-50/70 rounded-lg transition"
            >
              <HelpCircle size={16} />
              <span>Quiz</span>
            </button>
          </nav>
        </div>

        <div
          onClick={() => setIsModalOpen(true)}
          className="p-3 border-t border-gray-100 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition"
        >
          <img
            src={student.avatar}
            alt={student.name}
            className="w-8 h-8 rounded-full object-cover border"
          />
          <span className="text-xs font-semibold text-gray-700 truncate">
            {student.name}
          </span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span
              onClick={onBackToCourses}
              className="cursor-pointer hover:text-smit-blue hover:underline"
            >
              Home
            </span>
            <span>&gt;</span>
            <span
              onClick={() => onNavigate('dashboard')}
              className="cursor-pointer hover:text-smit-blue hover:underline truncate"
            >
              {student.courseName}
            </span>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">Quiz</span>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-smit-blue transition">
            <MessageSquare size={15} />
            <span>Feedback</span>
          </button>
        </header>

        <main className="p-6 overflow-y-auto max-w-6xl w-full space-y-6">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">0</h3>
                <p className="text-xs text-gray-400 mt-1">Upcoming Quizzes</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center">
                <HelpCircle size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">2</h3>
                <p className="text-xs text-gray-400 mt-1">Completed Quizzes</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <Award size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">85%</h3>
                <p className="text-xs text-gray-400 mt-1">Average Score</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-500 flex items-center justify-center">
                <Award size={18} />
              </div>
            </div>
          </div>

          {/* Main Card with Tabs */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-2xs p-6">
            <div className="flex border-b border-gray-100 mb-6">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`pb-3 px-4 text-xs font-semibold transition ${
                  activeTab === 'upcoming'
                    ? 'text-smit-blue border-b-2 border-smit-blue'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Upcoming Quizzes
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`pb-3 px-4 text-xs font-semibold transition ${
                  activeTab === 'completed'
                    ? 'text-smit-blue border-b-2 border-smit-blue'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Completed Quizzes
              </button>
            </div>

            {activeTab === 'upcoming' ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-3 border border-gray-100">
                  <AlertCircle size={22} />
                </div>
                <h4 className="text-sm font-bold text-gray-700">No Upcoming Quizzes</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-sm">
                  You do not have any scheduled quizzes for this course at the moment. Your instructor will announce future test dates.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                  <div>
                    <h5 className="text-xs font-bold text-gray-800">Quiz 1: HTML & CSS Core</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">Attempted on: July 20, 2026</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-700">
                    90 / 100
                  </span>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
                  <div>
                    <h5 className="text-xs font-bold text-gray-800">Quiz 2: JavaScript ES6 & DOM</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">Attempted on: August 14, 2026</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-700">
                    80 / 100
                  </span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}