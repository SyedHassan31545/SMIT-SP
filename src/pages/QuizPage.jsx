import React, { useState } from 'react';
import { HelpCircle, Award, AlertCircle } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import PortalLayout from '../components/PortalLayout';
import StatCard from '../components/StatCard';

export default function QuizPage({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'completed'

  const upcoming = student.quizzes?.upcoming || [];
  const completed = student.quizzes?.completed || [];
  const average = completed.length
    ? Math.round(
        (completed.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) / completed.length) * 10
      ) / 10
    : 0;

  const tabs = [
    ['upcoming', 'Upcoming Quizzes'],
    ['completed', 'Completed Quizzes'],
  ];

  return (
    <PortalLayout active="quiz" crumb="Quiz" onNavigate={onNavigate} onBackToCourses={onBackToCourses}>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <StatCard value={upcoming.length} label="Upcoming Quizzes" icon={HelpCircle} tone="blue" />
          <StatCard value={completed.length} label="Completed Quizzes" icon={Award} tone="green" />
          <StatCard value={`${average}%`} label="Average Score" icon={Award} tone="purple" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-2xs p-4 sm:p-6">
          <div className="flex border-b border-gray-100 mb-6 overflow-x-auto">
            {tabs.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`pb-3 px-4 text-xs sm:text-[13px] font-semibold whitespace-nowrap transition ${
                  activeTab === key
                    ? 'text-smit-blue border-b-2 border-smit-blue'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'upcoming' ? (
            upcoming.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-3 border border-gray-100">
                  <AlertCircle size={22} />
                </div>
                <h4 className="text-sm font-bold text-gray-700">No Upcoming Quizzes</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-sm">
                  You do not have any scheduled quizzes for this course at the moment. Your instructor will
                  announce future test dates.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map((q) => (
                  <div key={q.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <h5 className="text-sm font-bold text-gray-800">{q.title}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">{q.date}</p>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-3">
              {completed.map((q) => {
                const pct = (q.score / q.total) * 100;
                const tone =
                  pct >= 80 ? 'bg-emerald-100 text-emerald-700' : pct >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600';
                return (
                  <div
                    key={q.id}
                    className="p-4 bg-gray-50 rounded-xl flex items-center justify-between gap-3 border border-gray-100"
                  >
                    <div className="min-w-0">
                      <h5 className="text-sm font-bold text-gray-800">{q.title}</h5>
                      <p className="text-xs text-gray-400 mt-0.5">Attempted on: {q.date}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-lg shrink-0 ${tone}`}>
                      {q.score} / {q.total}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
