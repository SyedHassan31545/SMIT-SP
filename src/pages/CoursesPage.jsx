import React, { useState } from 'react';
import { Search, Sparkles, MessageSquare, ChevronDown, User, MapPin } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import ProfileModal from '../components/ProfileModal';

export default function CoursesPage({ onViewDetails, onLogout }) {
  const { student } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        {/* Profile on left */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition"
          title="Click to change profile picture & details"
        >
          <img
            src={student.avatar}
            alt={student.name}
            className="w-9 h-9 rounded-full object-cover border border-blue-400"
          />
          <span className="font-semibold text-sm text-gray-800">
            {student.name}
          </span>
        </div>

        {/* Center & Right Controls */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative w-64 md:w-80">
            <input
              type="text"
              placeholder="Search Course"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs placeholder-gray-400 focus:outline-none focus:bg-white focus:border-smit-blue transition"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100">
              <span>ENROLLED</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>

          {/* Feedback */}
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 hover:text-smit-blue">
            <MessageSquare className="w-4 h-4" />
            <span>Feedback</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto p-6 md:p-8">
        {/* Course Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 md:p-7 max-w-2xl">
          {/* Card Title & Enrolled Badge */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              {student.courseName}
            </h2>
            <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-blue-600 bg-blue-50 border border-blue-200 rounded-md">
              ENROLLED
            </span>
          </div>

          {/* Progress */}
          <div className="space-y-1.5 mb-5">
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

          {/* Course Details Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-xs text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700"># Batch:</span> {student.batch}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-semibold text-gray-700">Roll:</span> {student.rollNumber}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-semibold text-gray-700">Campus:</span> {student.campus}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">City:</span> {student.city}
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={onViewDetails}
            className="w-full py-2.5 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-gray-700" />
            <span>View Details</span>
          </button>
        </div>
      </main>

      {/* Profile Settings Modal */}
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}