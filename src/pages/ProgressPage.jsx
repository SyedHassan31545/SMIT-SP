import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  HelpCircle,
  Clock,
  GraduationCap,
  MessageSquare,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle2
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import ProfileModal from '../components/ProfileModal';

export default function ProgressPage({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedModuleId, setExpandedModuleId] = useState(null);

  const totalTopics = student.modules?.reduce((acc, m) => acc + m.total, 0) || 81;
  const completedTopics = student.modules?.reduce((acc, m) => acc + m.completed, 0) || 58;
  const pendingTopics = totalTopics - completedTopics;

  const toggleAccordion = (id) => {
    setExpandedModuleId(expandedModuleId === id ? null : id);
  };

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
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-smit-blue bg-blue-50/70 rounded-lg transition"
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
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
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
            <span className="text-gray-800 font-medium">Progress</span>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-smit-blue transition">
            <MessageSquare size={15} />
            <span>Feedback</span>
          </button>
        </header>

        <main className="p-6 overflow-y-auto max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{totalTopics}</h3>
                <p className="text-xs text-gray-400 mt-1">Total Topics</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <BookOpen size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{completedTopics}</h3>
                <p className="text-xs text-gray-400 mt-1">Completed Topics</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-purple-50 text-purple-500 flex items-center justify-center">
                <GraduationCap size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{pendingTopics}</h3>
                <p className="text-xs text-gray-400 mt-1">Pending Topics</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-red-50 text-red-400 flex items-center justify-center">
                <Clock size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {student.modules?.map((mod) => {
              const isCompleted = mod.percentage === 100;
              const isExpanded = expandedModuleId === mod.id;

              return (
                <div
                  key={mod.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-2xs overflow-hidden transition"
                >
                  <div
                    onClick={() => toggleAccordion(mod.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 select-none"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-amber-50 text-amber-500'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-gray-800 tracking-tight">
                          {mod.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Topics: {mod.completed}/{mod.total}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-6 rounded-full bg-blue-50 text-smit-blue border border-blue-200 flex items-center justify-center text-[11px] font-bold">
                        {mod.percentage}%
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-gray-50 bg-gray-50/40">
                      <p className="text-xs font-semibold text-gray-600 mb-2 mt-2">
                        Covered Topics & Syllabus Breakdown:
                      </p>
                      <ul className="space-y-1.5 pl-2">
                        {mod.subTopics?.map((topic, i) => (
                          <li
                            key={i}
                            className="text-xs text-gray-600 flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}