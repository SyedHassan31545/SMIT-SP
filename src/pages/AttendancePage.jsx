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
  ChevronDown,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import ProfileModal from '../components/ProfileModal';

export default function AttendancePage({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Sep 2026');

  const { totalClasses, present, leave, absent } = student.attendanceStats || {
    totalClasses: 113,
    present: 92,
    leave: 0,
    absent: 21
  };

  // Calculate dynamic attendance percentage
  const percentage = Math.round((present / (totalClasses || 1)) * 100);

  // Filter attendance records by selected month
  const filteredRecords = (student.attendanceRecords || []).filter(
    (item) => item.month === selectedMonth
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-gray-800 font-sans">
      {/* Left Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Collapse button */}
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

          {/* Navigation Items */}
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
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-smit-blue bg-blue-50/70 rounded-lg transition"
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

        {/* Sidebar Footer User Info */}
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
        {/* Top Navbar */}
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
            <span className="text-gray-800 font-medium">Attendance</span>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-smit-blue transition">
            <MessageSquare size={15} />
            <span>Feedback</span>
          </button>
        </header>

        {/* Main Content Body */}
        <main className="p-6 overflow-y-auto max-w-6xl w-full space-y-6">
          {/* Top 4 Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total Classes */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{totalClasses}</h3>
                <p className="text-xs text-gray-400 mt-1">Total Classes</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-gray-50 text-gray-400 flex items-center justify-center border border-gray-100">
                <Calendar size={18} />
              </div>
            </div>

            {/* Present */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{present}</h3>
                <p className="text-xs text-gray-400 mt-1">Present</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
            </div>

            {/* Leave */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{leave}</h3>
                <p className="text-xs text-gray-400 mt-1">Leave</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                <AlertCircle size={18} />
              </div>
            </div>

            {/* Absent */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{absent}</h3>
                <p className="text-xs text-gray-400 mt-1">Absent</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-400 flex items-center justify-center">
                <XCircle size={18} />
              </div>
            </div>
          </div>

          {/* Attendance Overview Card */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-bold text-gray-900">Attendance Overview</h4>
              <span className="text-2xl font-bold text-[#22c55e]">{percentage}%</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Your attendance is good. Keep it up!</p>
            
            {/* Green Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#22c55e] h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Month Filter Dropdown */}
          <div className="flex justify-end">
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-9 text-xs font-medium text-gray-700 focus:outline-none focus:border-smit-blue shadow-2xs cursor-pointer"
              >
                <option value="Sep 2026">Sep 2026</option>
                <option value="Aug 2026">Aug 2026</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/60 text-gray-400 font-medium border-b border-gray-100">
                <tr>
                  <th className="py-3 px-6 w-28">Class</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6 text-right sm:text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition">
                      <td className="py-3.5 px-6 font-medium text-gray-800">
                        {item.classNo}
                      </td>
                      <td className="py-3.5 px-6 text-gray-600">
                        {item.date}
                      </td>
                      <td className="py-3.5 px-6 text-right sm:text-left">
                        {item.status === 'PRESENT' && (
                          <span className="text-[11px] font-semibold text-emerald-600 tracking-wide">
                            PRESENT
                          </span>
                        )}
                        {item.status === 'ABSENT' && (
                          <span className="text-[11px] font-semibold text-red-500 tracking-wide">
                            ABSENT
                          </span>
                        )}
                        {item.status === 'LEAVE' && (
                          <span className="text-[11px] font-semibold text-amber-500 tracking-wide">
                            LEAVE
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-400">
                      No attendance records found for this month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}