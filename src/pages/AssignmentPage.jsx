import React, { useState, useMemo } from 'react';
import { Clock, Eye, Upload, Pencil, ExternalLink, FileText, Search, SearchX } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import PortalLayout from '../components/PortalLayout';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';

const DONE = ['APPROVED', 'SUBMITTED', 'LATE SUBMITTED'];

const STATUS_STYLE = {
  'NOT SUBMITTED': 'bg-gray-100 text-gray-500',
  'LATE SUBMITTED': 'bg-amber-50 text-amber-600 border border-amber-200',
  APPROVED: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
  SUBMITTED: 'bg-blue-50 text-blue-600 border border-blue-200',
};

const FILTERS = [
  ['ALL', 'All'],
  ['PENDING', 'Pending'],
  ['SUBMITTED', 'Submitted'],
  ['APPROVED', 'Approved'],
];

function SubmitForm({ assignment, onClose, onSubmit }) {
  const [link, setLink] = useState(assignment.submissionUrl || '');
  const [error, setError] = useState('');

  const handle = (e) => {
    e.preventDefault();
    let url;
    try {
      url = new URL(link.trim());
    } catch {
      return setError('Sahi link likhein (https://... se shuru).');
    }
    if (!['http:', 'https:'].includes(url.protocol)) return setError('Sirf http/https link allowed hai.');
    onSubmit(assignment.id, url.href);
    onClose();
  };

  return (
    <form onSubmit={handle} className="space-y-4" noValidate>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          GitHub Repository / Live Deployed Link *
        </label>
        <input
          type="url"
          placeholder="https://github.com/username/project"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          autoFocus
          className="w-full px-3 py-2.5 bg-smit-inputBg rounded-lg text-sm outline-none border border-transparent focus:border-smit-blue focus:bg-white transition"
        />
        {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2.5 text-sm rounded-lg bg-smit-blue hover:bg-smit-blueHover text-white font-medium"
        >
          {assignment.submissionUrl ? 'Update Submission' : 'Submit Assignment'}
        </button>
      </div>
    </form>
  );
}

export default function AssignmentPage({ onNavigate, onBackToCourses }) {
  const { student, submitAssignment } = useStudent();
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null); // 'submit' | 'view'
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');

  const assignments = useMemo(() => student.assignments || [], [student.assignments]);
  const totalAssigned = assignments.length;
  const totalSubmitted = assignments.filter((a) => DONE.includes(a.status)).length;
  const totalPending = totalAssigned - totalSubmitted;

  const visible = useMemo(
    () =>
      assignments.filter((a) => {
        if (search && !a.title.toLowerCase().includes(search.trim().toLowerCase())) return false;
        if (filter === 'PENDING') return !DONE.includes(a.status);
        if (filter === 'SUBMITTED') return a.status === 'SUBMITTED' || a.status === 'LATE SUBMITTED';
        if (filter === 'APPROVED') return a.status === 'APPROVED';
        return true;
      }),
    [assignments, search, filter]
  );

  const open = (item, type) => {
    setSelected(item);
    setModal(type);
  };
  const close = () => setModal(null);

  // Modal mein hamesha latest data dikhane ke liye id se dobara dhoondte hain
  const current = selected && assignments.find((a) => a.id === selected.id);

  return (
    <PortalLayout active="assignment" crumb="Assignment" onNavigate={onNavigate} onBackToCourses={onBackToCourses}>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <StatCard value={totalAssigned} label="Assigned" icon={FileText} tone="blue" />
          <StatCard value={totalSubmitted} label="Submitted" icon={FileText} tone="green" />
          <StatCard value={totalPending} label="Pending" icon={Clock} tone="amber" />
        </div>

        {/* Search + filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative md:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assignment"
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-smit-blue"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {FILTERS.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
                  filter === key
                    ? 'bg-smit-blue text-white border-smit-blue'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[720px]">
              <thead className="bg-gray-50/60 text-gray-400 font-medium border-b border-gray-100">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Assignment</th>
                  <th className="py-3.5 px-4 sm:px-6">Topics</th>
                  <th className="py-3.5 px-4 sm:px-6">Due Date</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {visible.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-4 sm:px-6 font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.tag && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-purple-100 text-purple-700 rounded">
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      {item.topics === 'No topics' ? (
                        <span className="text-gray-400">{item.topics}</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-200">
                          {item.topics}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className={item.isClosed ? 'text-gray-600' : 'text-rose-500 font-medium'}>
                        {item.dueDate}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${STATUS_STYLE[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => open(item, 'view')}
                          title="View Assignment Details"
                          aria-label="View details"
                          className="text-gray-400 hover:text-smit-blue transition"
                        >
                          <Eye size={16} />
                        </button>

                        {item.isClosed ? (
                          <span className="text-red-400 italic text-[11px] font-medium select-none whitespace-nowrap">
                            Submissions closed
                          </span>
                        ) : item.status === 'APPROVED' ? (
                          <span className="text-emerald-500 text-[11px] font-medium select-none whitespace-nowrap">
                            Approved
                          </span>
                        ) : item.submissionUrl ? (
                          <button
                            onClick={() => open(item, 'submit')}
                            title="Edit Submission"
                            aria-label="Edit submission"
                            className="text-gray-400 hover:text-blue-600 transition"
                          >
                            <Pencil size={15} />
                          </button>
                        ) : (
                          <button
                            onClick={() => open(item, 'submit')}
                            title="Submit Project Link"
                            aria-label="Submit assignment"
                            className="text-gray-400 hover:text-emerald-600 transition"
                          >
                            <Upload size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visible.length === 0 && (
            <div className="py-12 flex flex-col items-center text-center text-gray-400">
              <SearchX size={32} className="text-gray-300" />
              <p className="text-sm mt-2">Koi assignment nahi mila.</p>
            </div>
          )}
        </div>
      </div>

      {modal === 'submit' && current && (
        <Modal
          title={current.submissionUrl ? 'Edit Submission' : 'Submit Assignment'}
          onClose={close}
        >
          <p className="text-sm text-gray-500 -mt-1 mb-4">
            <span className="font-semibold text-smit-blue">{current.title}</span>
          </p>
          <SubmitForm assignment={current} onClose={close} onSubmit={submitAssignment} />
        </Modal>
      )}

      {modal === 'view' && current && (
        <Modal title="Assignment Details" onClose={close}>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-xs font-semibold text-gray-500">Title</span>
              <p className="text-gray-900 font-bold mt-0.5">{current.title}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Due Date</span>
              <p className="text-gray-800 mt-0.5">{current.dueDate}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-500">Status</span>
              <p className="mt-0.5 font-bold text-smit-blue">{current.status}</p>
            </div>
            {current.submissionUrl && (
              <div>
                <span className="text-xs font-semibold text-gray-500">Submitted Link</span>
                <a
                  href={current.submissionUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1 text-blue-600 hover:underline mt-0.5 font-mono text-xs break-all"
                >
                  <span>{current.submissionUrl}</span>
                  <ExternalLink size={12} className="shrink-0" />
                </a>
              </div>
            )}
          </div>
          <button
            onClick={close}
            className="mt-6 w-full py-2.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
          >
            Close
          </button>
        </Modal>
      )}
    </PortalLayout>
  );
}
