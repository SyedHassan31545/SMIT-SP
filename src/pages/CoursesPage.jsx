import React, { useState, useMemo } from 'react';
import { Search, Sparkles, MessageSquare, ChevronDown, User, MapPin, LogOut, Pencil, SearchX } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import ProfileModal from '../components/ProfileModal';
import FeedbackModal from '../components/FeedbackModal';
import Avatar from '../components/Avatar';
import { LogoImage } from '../components/SmitLogo';

export default function CoursesPage({ onViewDetails, onLogout }) {
  const { student } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ENROLLED');
  const [profileOpen, setProfileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const courses = useMemo(
    () => [{ id: 1, name: student.courseName, status: 'ENROLLED', progress: student.progress }],
    [student.courseName, student.progress]
  );

  const visible = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) &&
      (filter === 'ALL' || c.status === filter)
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800">
      {/* Top Navbar: logo left, controls right */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3 max-w-6xl mx-auto">
          <LogoImage size="sm" />

          <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
            <div className="relative w-64 lg:w-80">
              <input
                type="text"
                placeholder="Search Course"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-smit-blue transition"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filter courses"
                className="appearance-none pl-3 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <option value="ENROLLED">ENROLLED</option>
                <option value="ALL">ALL</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={() => setFeedbackOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-smit-blue hover:bg-blue-50 rounded-lg transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Feedback</span>
            </button>
          </div>

          {/* Profile menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2.5 p-1 pr-2 rounded-lg hover:bg-gray-50 transition"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <Avatar src={student.avatar} name={student.name} className="w-9 h-9" />
              <span className="hidden sm:block font-semibold text-sm text-gray-800 max-w-[10rem] truncate">
                {student.name}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-52 z-20 bg-white rounded-xl border border-gray-100 shadow-lg py-1 animate-pop-in">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setProfileOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Pencil size={15} /> Edit profile
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setFeedbackOpen(true);
                    }}
                    className="md:hidden w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <MessageSquare size={15} /> Feedback
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile: search + filter neeche */}
        <div className="md:hidden flex gap-2 mt-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Course"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-smit-blue"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter courses"
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
          >
            <option value="ENROLLED">ENROLLED</option>
            <option value="ALL">ALL</option>
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-3 sm:p-6 md:p-8">
        {visible.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200/80 p-10 max-w-2xl flex flex-col items-center text-center">
            <SearchX className="text-gray-300" size={36} />
            <h3 className="mt-3 text-sm font-bold text-gray-700">Koi course nahi mila</h3>
            <p className="text-xs text-gray-400 mt-1">Search ya filter change kar ke dobara dekhein.</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {visible.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-5 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">{course.name}</h2>
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-blue-600 bg-blue-50 border border-blue-200 rounded-md shrink-0">
                    {course.status}
                  </span>
                </div>

                <div className="space-y-1.5 mb-5">
                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>Progress</span>
                    <span>{course.progress}% Completed</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#22c55e] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[13px] text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700"># Batch:</span> {student.batch}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span className="font-semibold text-gray-700">Roll:</span> {student.rollNumber}
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="font-semibold text-gray-700">Campus:</span> {student.campus}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">City:</span> {student.city}
                  </div>
                </div>

                <button
                  onClick={onViewDetails}
                  className="w-full py-2.5 border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition"
                >
                  <Sparkles className="w-4 h-4 text-gray-700" />
                  <span>View Details</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
