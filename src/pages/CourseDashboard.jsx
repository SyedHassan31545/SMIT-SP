import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  HelpCircle,
  Clock,
  Sparkles,
  MessageSquare,
  ChevronLeft,
  User,
  MapPin
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import ProfileModal from '../components/ProfileModal';

export default function CourseDashboard({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const [activeTab, setActiveTab] = useState('Quizzes');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Safe dynamic calculations (no undefined errors)
  const attendedCount = student?.attendanceStats?.present ?? student?.attendance?.attended ?? 92;
  const totalAttendanceCount = student?.attendanceStats?.totalClasses ?? student?.attendance?.total ?? 113;

  const totalAssignmentsCount = student?.assignments?.length ?? student?.assignment?.total ?? 18;
  const completedAssignmentsCount = student?.assignments
    ? student.assignments.filter(
        (a) => a.status === 'APPROVED' || a.status === 'SUBMITTED' || a.status === 'LATE SUBMITTED'
      ).length
    : (student?.assignment?.completed ?? 14);

  const feeList = student?.feeRecords || [];

  // Calendar dates matching SMIT UI
  const calendarDays = [
    { day: 'Sun', date: 20, active: false },
    { day: 'Mon', date: 21, active: true },
    { day: 'Tue', date: 22, active: false },
    { day: 'Wed', date: 23, active: true },
    { day: 'Thu', date: 24, active: false },
    { day: 'Fri', date: 25, active: true },
    { day: 'Sat', date: 26, active: false },
  ];

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
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-smit-blue bg-blue-50/70 rounded-lg transition"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('progress')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <BookOpen size={16} />
              <span>Progress</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('attendance')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <Calendar size={16} />
              <span>Attendance</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('payment')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <CreditCard size={16} />
              <span>Payment</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('assignment')}
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            >
              <FileText size={16} />
              <span>Assignment</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('quiz')}
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
            src={student?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={student?.name || 'User'}
            className="w-8 h-8 rounded-full object-cover border"
          />
          <span className="text-xs font-semibold text-gray-700 truncate">
            {student?.name || 'Muhammad Hassan'}
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
            <span className="text-gray-800 font-medium truncate">
              {student?.courseName || 'Modern Web Application Development'}
            </span>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-smit-blue transition">
            <MessageSquare size={15} />
            <span>Feedback</span>
          </button>
        </header>

        {/* Main Grid Body */}
        <main className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stat Cards: Attendance & Assignment */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {attendedCount}/{totalAttendanceCount}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Attendance</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <Clock size={18} />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {completedAssignmentsCount}/{totalAssignmentsCount}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Assignment</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                    <Sparkles size={18} />
                  </div>
                </div>
              </div>

              {/* Active Course Card */}
              <div>
                <h4 className="text-xs font-bold text-gray-800 mb-3">Active Course</h4>
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-2xs">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                      {student?.courseName || 'Modern Web Application Development'}
                    </h2>
                    <span className="px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-md">
                      ENROLLED
                    </span>
                  </div>

                  {/* Timing Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 text-[11px] bg-gray-50 border border-gray-200 text-gray-600 rounded-md">
                      Mon 01:00 PM - 03:00 PM
                    </span>
                    <span className="px-2.5 py-1 text-[11px] bg-gray-50 border border-gray-200 text-gray-600 rounded-md">
                      Wed 01:00 PM - 03:00 PM
                    </span>
                    <span className="px-2.5 py-1 text-[11px] bg-gray-50 border border-gray-200 text-gray-600 rounded-md">
                      Fri 01:00 PM - 03:00 PM
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span>Progress</span>
                      <span>{student?.progress || 75}% Completed</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#22c55e] h-2 rounded-full"
                        style={{ width: `${student?.progress || 75}%` }}
                      />
                    </div>
                  </div>

                  {/* Meta details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-xs text-gray-600">
                    <div><span className="font-semibold"># Batch:</span> {student?.batch || '20'}</div>
                    <div><span className="font-semibold">Roll:</span> {student?.rollNumber || '770860'}</div>
                    <div><span className="font-semibold">Campus:</span> {student?.campus || 'Zaitoon Ashraf IT Park'}</div>
                    <div><span className="font-semibold">City:</span> {student?.city || 'Karachi'}</div>
                  </div>
                </div>
              </div>

              {/* Fee Table */}
              <div>
                <h4 className="text-xs font-bold text-gray-800 mb-3">Fee</h4>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50/70 text-gray-400 font-medium border-b border-gray-100">
                      <tr>
                        <th className="py-2.5 px-4">Month</th>
                        <th className="py-2.5 px-4">Amount</th>
                        <th className="py-2.5 px-4">Type</th>
                        <th className="py-2.5 px-4">Due date</th>
                        <th className="py-2.5 px-4">Voucher ID</th>
                        <th className="py-2.5 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                      {feeList.map((fee, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50">
                          <td className="py-2.5 px-4 font-medium text-gray-800">{fee.month}</td>
                          <td className="py-2.5 px-4">{fee.amount}</td>
                          <td className="py-2.5 px-4">{fee.type}</td>
                          <td className="py-2.5 px-4">{fee.dueDate}</td>
                          <td className="py-2.5 px-4 text-blue-600">{fee.voucherId}</td>
                          <td className="py-2.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600">
                              {fee.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-2xs">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-gray-500" />
                  <h4 className="text-xs font-bold text-gray-800">Class Schedule</h4>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarDays.map((item, idx) => (
                    <div
                      key={idx}
                      className={`py-2 px-1 rounded-lg text-[11px] font-medium transition ${
                        item.active
                          ? 'bg-[#22c55e] text-white font-bold shadow-xs'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-[10px]">{item.day}</div>
                      <div className="mt-1">{item.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-2xs">
                <div className="flex border-b border-gray-100 mb-6">
                  {['Assignments', 'Quizzes', 'Events'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 pb-2 text-xs font-semibold transition ${
                        activeTab === tab
                          ? 'text-gray-900 border-b-2 border-smit-blue'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="py-8 text-center text-xs text-gray-400">
                  No upcoming {activeTab.toLowerCase()}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}