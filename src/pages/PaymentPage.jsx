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
  Download,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import ProfileModal from '../components/ProfileModal';

export default function PaymentPage({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const feeRecords = student.feeRecords || [];

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
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-smit-blue bg-blue-50/70 rounded-lg transition"
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

      {/* Main Content */}
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
            <span className="text-gray-800 font-medium">Payment</span>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-smit-blue transition">
            <MessageSquare size={15} />
            <span>Feedback</span>
          </button>
        </header>

        <main className="p-6 overflow-y-auto max-w-6xl w-full space-y-6">
          {/* Top Payment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Rs. 2,000</h3>
                <p className="text-xs text-gray-400 mt-1">Total Paid</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Rs. 0</h3>
                <p className="text-xs text-gray-400 mt-1">Outstanding Due</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-smit-blue flex items-center justify-center">
                <CreditCard size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">10 Oct 2026</h3>
                <p className="text-xs text-gray-400 mt-1">Next Due Date</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                <Clock size={18} />
              </div>
            </div>
          </div>

          {/* Fee Records Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-800">Fee History & Vouchers</h4>
              <span className="text-xs text-gray-400">All fees verified by SMIT Accounts</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/60 text-gray-400 font-medium border-b border-gray-100">
                  <tr>
                    <th className="py-3 px-6">Month</th>
                    <th className="py-3 px-6">Amount</th>
                    <th className="py-3 px-6">Type</th>
                    <th className="py-3 px-6">Due Date</th>
                    <th className="py-3 px-6">Voucher ID</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {feeRecords.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition">
                      <td className="py-3.5 px-6 font-medium text-gray-800">{fee.month}</td>
                      <td className="py-3.5 px-6 font-semibold">{fee.amount}</td>
                      <td className="py-3.5 px-6">{fee.type}</td>
                      <td className="py-3.5 px-6">{fee.dueDate}</td>
                      <td className="py-3.5 px-6 text-blue-600 font-mono">{fee.voucherId}</td>
                      <td className="py-3.5 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                          {fee.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <button
                          onClick={() => alert(`Downloading voucher ${fee.voucherId}...`)}
                          className="p-1.5 text-gray-400 hover:text-smit-blue hover:bg-gray-100 rounded transition"
                          title="Download Voucher"
                        >
                          <Download size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}