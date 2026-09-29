import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import PortalLayout from '../components/PortalLayout';
import StatCard from '../components/StatCard';

const CLASS_DAYS = [1, 3, 5]; // Mon, Wed, Fri
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TIMINGS = ['Mon 01:00 PM - 03:00 PM', 'Wed 01:00 PM - 03:00 PM', 'Fri 01:00 PM - 03:00 PM'];

// Is hafte (Sun-Sat) ki dates, aaj ke hisab se
function getCurrentWeek() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      day: DAY_NAMES[i],
      date: d.getDate(),
      active: CLASS_DAYS.includes(i),
      isToday: d.toDateString() === today.toDateString(),
    };
  });
}

export default function CourseDashboard({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const [activeTab, setActiveTab] = useState('Assignments');

  const attendedCount = student.attendanceStats?.present ?? 0;
  const totalAttendanceCount = student.attendanceStats?.totalClasses ?? 0;

  const assignments = student.assignments || [];
  const doneStatuses = ['APPROVED', 'SUBMITTED', 'LATE SUBMITTED'];
  const completedAssignmentsCount = assignments.filter((a) => doneStatuses.includes(a.status)).length;
  const pendingAssignments = assignments.filter((a) => !doneStatuses.includes(a.status) && !a.isClosed);

  const upcomingQuizzes = student.quizzes?.upcoming || [];
  const feeList = student.feeRecords || [];
  const week = useMemo(() => getCurrentWeek(), []);

  const tabContent = {
    Assignments: pendingAssignments.slice(0, 4).map((a) => ({
      id: a.id,
      title: a.title,
      meta: `Due: ${a.dueDate}`,
    })),
    Quizzes: upcomingQuizzes.map((q) => ({ id: q.id, title: q.title, meta: q.date })),
    Events: [],
  };
  const items = tabContent[activeTab];

  return (
    <PortalLayout active="dashboard" onNavigate={onNavigate} onBackToCourses={onBackToCourses}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left 2 columns */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <StatCard
              value={`${attendedCount}/${totalAttendanceCount}`}
              label="Attendance"
              icon={Clock}
              tone="green"
            />
            <StatCard
              value={`${completedAssignmentsCount}/${assignments.length}`}
              label="Assignment"
              icon={Sparkles}
              tone="purple"
            />
          </div>

          <section>
            <h4 className="text-sm font-bold text-gray-800 mb-3">Active Course</h4>
            <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 shadow-2xs">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">{student.courseName}</h2>
                <span className="px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-md shrink-0">
                  ENROLLED
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {TIMINGS.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs bg-gray-50 border border-gray-200 text-gray-600 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span>Progress</span>
                  <span>{student.progress}% Completed</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#22c55e] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[13px] text-gray-600">
                <div><span className="font-semibold"># Batch:</span> {student.batch}</div>
                <div><span className="font-semibold">Roll:</span> {student.rollNumber}</div>
                <div><span className="font-semibold">Campus:</span> {student.campus}</div>
                <div><span className="font-semibold">City:</span> {student.city}</div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-gray-800">Fee</h4>
              <button
                onClick={() => onNavigate('payment')}
                className="text-xs font-medium text-smit-blue hover:underline"
              >
                View all
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[560px]">
                  <thead className="bg-gray-50/70 text-gray-400 font-medium border-b border-gray-100">
                    <tr>
                      {['Month', 'Amount', 'Type', 'Due date', 'Voucher ID', 'Status'].map((h) => (
                        <th key={h} className="py-2.5 px-4 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-600">
                    {feeList.map((fee) => (
                      <tr key={fee.voucherId} className="hover:bg-gray-50/50">
                        <td className="py-2.5 px-4 font-medium text-gray-800 whitespace-nowrap">{fee.month}</td>
                        <td className="py-2.5 px-4 whitespace-nowrap">{fee.amount}</td>
                        <td className="py-2.5 px-4 whitespace-nowrap">{fee.type}</td>
                        <td className="py-2.5 px-4 whitespace-nowrap">{fee.dueDate}</td>
                        <td className="py-2.5 px-4 text-blue-600 whitespace-nowrap">{fee.voucherId}</td>
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
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-gray-500" />
              <h4 className="text-sm font-bold text-gray-800">Class Schedule</h4>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {week.map((item) => (
                <div
                  key={item.day}
                  className={`py-2 px-0.5 rounded-lg text-[11px] font-medium transition ${
                    item.active ? 'bg-[#22c55e] text-white font-bold shadow-xs' : 'text-gray-500'
                  } ${item.isToday ? 'ring-2 ring-smit-blue ring-offset-1' : ''}`}
                >
                  <div className="text-[10px]">{item.day}</div>
                  <div className="mt-1">{item.date}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-3">Green = class day. Blue outline = aaj.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-2xs">
            <div className="flex border-b border-gray-100 mb-4">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-2 text-xs sm:text-[13px] font-semibold transition ${
                    activeTab === tab
                      ? 'text-gray-900 border-b-2 border-smit-blue'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {items.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400">
                No upcoming {activeTab.toLowerCase()}
              </div>
            ) : (
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <p className="text-xs font-semibold text-gray-800">{item.title}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{item.meta}</p>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 'Assignments' && items.length > 0 && (
              <button
                onClick={() => onNavigate('assignment')}
                className="mt-3 text-xs font-medium text-smit-blue hover:underline"
              >
                Sab assignments dekhein
              </button>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
