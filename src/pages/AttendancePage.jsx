import React, { useState, useMemo } from 'react';
import { Calendar, CheckCircle2, XCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import PortalLayout from '../components/PortalLayout';
import StatCard from '../components/StatCard';

const STATUS_STYLE = {
  PRESENT: 'text-emerald-600',
  ABSENT: 'text-red-500',
  LEAVE: 'text-amber-500',
};

export default function AttendancePage({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const records = useMemo(() => student.attendanceRecords || [], [student.attendanceRecords]);

  // Months records se nikalte hain, latest month default
  const months = useMemo(() => [...new Set(records.map((r) => r.month))], [records]);
  const [selectedMonth, setSelectedMonth] = useState(months[months.length - 1] || '');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const { totalClasses, present, leave, absent } = student.attendanceStats || {
    totalClasses: 0,
    present: 0,
    leave: 0,
    absent: 0,
  };
  const percentage = Math.round((present / (totalClasses || 1)) * 100);
  const message =
    percentage >= 85
      ? 'Your attendance is good. Keep it up!'
      : percentage >= 75
      ? 'Attendance theek hai, lekin behtar karne ki koshish karein.'
      : 'Attendance kam hai. Aglay classes zaroor attend karein.';
  const barColor = percentage >= 75 ? 'bg-[#22c55e]' : 'bg-red-500';

  const filteredRecords = records.filter(
    (r) => r.month === selectedMonth && (statusFilter === 'ALL' || r.status === statusFilter)
  );

  return (
    <PortalLayout active="attendance" crumb="Attendance" onNavigate={onNavigate} onBackToCourses={onBackToCourses}>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StatCard value={totalClasses} label="Total Classes" icon={Calendar} tone="gray" />
          <StatCard value={present} label="Present" icon={CheckCircle2} tone="green" />
          <StatCard value={leave} label="Leave" icon={AlertCircle} tone="amber" />
          <StatCard value={absent} label="Absent" icon={XCircle} tone="red" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-bold text-gray-900">Attendance Overview</h4>
            <span className={`text-2xl font-bold ${percentage >= 75 ? 'text-[#22c55e]' : 'text-red-500'}`}>
              {percentage}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-4">{message}</p>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`${barColor} h-2.5 rounded-full transition-all duration-700`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex gap-1.5 flex-wrap">
            {['ALL', 'PRESENT', 'ABSENT', 'LEAVE'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
                  statusFilter === s
                    ? 'bg-smit-blue text-white border-smit-blue'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div className="relative self-end sm:self-auto">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              aria-label="Select month"
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-9 text-sm font-medium text-gray-700 focus:outline-none focus:border-smit-blue shadow-2xs cursor-pointer"
            >
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-[13px]">
              <thead className="bg-gray-50/60 text-gray-400 font-medium border-b border-gray-100">
                <tr>
                  <th className="py-3 px-4 sm:px-6 w-20 sm:w-28">Class</th>
                  <th className="py-3 px-4 sm:px-6">Date</th>
                  <th className="py-3 px-4 sm:px-6 text-right sm:text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((item) => (
                    <tr key={item.classNo} className="hover:bg-gray-50/50 transition">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-800">{item.classNo}</td>
                      <td className="py-3.5 px-4 sm:px-6">{item.date}</td>
                      <td className="py-3.5 px-4 sm:px-6 text-right sm:text-left">
                        <span className={`text-[11px] font-semibold tracking-wide ${STATUS_STYLE[item.status]}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-gray-400">
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
