import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  HelpCircle,
  Clock,
  MessageSquare,
  ChevronLeft,
  Eye,
  Upload,
  Pencil,
  X,
  ExternalLink
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import ProfileModal from '../components/ProfileModal';

export default function AssignmentPage({ onNavigate, onBackToCourses }) {
  const { student, submitAssignment } = useStudent();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Assignment Modal states
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [submissionLink, setSubmissionLink] = useState('');

  const assignments = student.assignments || [];

  // Dynamic stats calculation matching portal
  const totalAssigned = assignments.length;
  const totalSubmitted = assignments.filter(
    (a) => a.status === 'APPROVED' || a.status === 'SUBMITTED' || a.status === 'LATE SUBMITTED'
  ).length;
  const totalPending = totalAssigned - totalSubmitted;

  // Open Submit / Edit modal
  const handleOpenSubmit = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionLink(assignment.submissionUrl || '');
    setIsSubmitModalOpen(true);
  };

  // Open View Details modal
  const handleOpenView = (assignment) => {
    setSelectedAssignment(assignment);
    setIsViewModalOpen(true);
  };

  // Save submission
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (selectedAssignment && submissionLink) {
      submitAssignment(selectedAssignment.id, submissionLink);
      setIsSubmitModalOpen(false);
    }
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
              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-smit-blue bg-blue-50/70 rounded-lg transition"
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
          onClick={() => setIsProfileModalOpen(true)}
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
            <span className="text-gray-800 font-medium">Assignment</span>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-smit-blue transition">
            <MessageSquare size={15} />
            <span>Feedback</span>
          </button>
        </header>

        {/* Content Body */}
        <main className="p-6 overflow-y-auto max-w-6xl w-full space-y-6">
          {/* Top 3 Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Assigned */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{totalAssigned}</h3>
                <p className="text-xs text-gray-400 mt-1">Assigned</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-500 flex items-center justify-center">
                <FileText size={18} />
              </div>
            </div>

            {/* Submitted */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{totalSubmitted}</h3>
                <p className="text-xs text-gray-400 mt-1">Submitted</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <FileText size={18} />
              </div>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{totalPending}</h3>
                <p className="text-xs text-gray-400 mt-1">Pending</p>
              </div>
              <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-500 flex items-center justify-center">
                <Clock size={18} />
              </div>
            </div>
          </div>

          {/* Assignments Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50/60 text-gray-400 font-medium border-b border-gray-100">
                  <tr>
                    <th className="py-3.5 px-6">Assignment</th>
                    <th className="py-3.5 px-6">Topics</th>
                    <th className="py-3.5 px-6">Due Date</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {assignments.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                      {/* Title & Tag */}
                      <td className="py-4 px-6 font-medium text-gray-800">
                        <div className="flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.tag && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-purple-100 text-purple-700 rounded">
                              {item.tag}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Topics */}
                      <td className="py-4 px-6">
                        {item.topics === 'No topics' ? (
                          <span className="text-gray-400">{item.topics}</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-200">
                            {item.topics}
                          </span>
                        )}
                      </td>

                      {/* Due Date */}
                      <td className="py-4 px-6">
                        <span className={item.isClosed ? 'text-gray-600' : 'text-rose-500 font-medium'}>
                          {item.dueDate}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        {item.status === 'NOT SUBMITTED' && (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider bg-gray-100 text-gray-500">
                            NOT SUBMITTED
                          </span>
                        )}
                        {item.status === 'LATE SUBMITTED' && (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
                            LATE SUBMITTED
                          </span>
                        )}
                        {item.status === 'APPROVED' && (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
                            APPROVED
                          </span>
                        )}
                        {item.status === 'SUBMITTED' && (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider bg-blue-50 text-blue-600 border border-blue-200">
                            SUBMITTED
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          {/* View Button */}
                          <button
                            onClick={() => handleOpenView(item)}
                            title="View Assignment Details"
                            className="text-gray-400 hover:text-smit-blue transition"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Closed vs Open Actions */}
                          {item.isClosed ? (
                            <span className="text-red-400 italic text-[11px] font-medium select-none">
                              Submissions closed
                            </span>
                          ) : (
                            <>
                              <button
                                onClick={() => handleOpenSubmit(item)}
                                title="Submit Project Link"
                                className="text-gray-400 hover:text-emerald-600 transition"
                              >
                                <Upload size={16} />
                              </button>
                              <button
                                onClick={() => handleOpenSubmit(item)}
                                title="Edit Submission"
                                className="text-gray-400 hover:text-blue-600 transition"
                              >
                                <Pencil size={15} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                Submit Assignment: <span className="text-smit-blue">{selectedAssignment?.title}</span>
              </h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  GitHub Repository / Live Deployed Link *
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  className="w-full px-3 py-2 bg-smit-inputBg rounded-lg text-xs outline-none border border-transparent focus:border-smit-blue"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="flex-1 py-2 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs rounded-lg bg-smit-blue hover:bg-smit-blueHover text-white font-medium shadow-xs"
                >
                  Submit Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Assignment Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="font-semibold text-gray-500">Title:</span>
                <p className="text-gray-900 font-bold mt-0.5">{selectedAssignment?.title}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Due Date:</span>
                <p className="text-gray-800 mt-0.5">{selectedAssignment?.dueDate}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Status:</span>
                <p className="mt-0.5 font-bold text-smit-blue">{selectedAssignment?.status}</p>
              </div>
              {selectedAssignment?.submissionUrl && (
                <div>
                  <span className="font-semibold text-gray-500">Submitted Link:</span>
                  <a
                    href={selectedAssignment.submissionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline mt-0.5 font-mono"
                  >
                    <span>{selectedAssignment.submissionUrl}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsViewModalOpen(false)}
              className="mt-6 w-full py-2 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}