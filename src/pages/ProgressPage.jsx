import React, { useState } from 'react';
import { BookOpen, Clock, GraduationCap, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import PortalLayout from '../components/PortalLayout';
import StatCard from '../components/StatCard';

export default function ProgressPage({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const [expandedModuleId, setExpandedModuleId] = useState(null);

  const modules = student.modules || [];
  const totalTopics = modules.reduce((acc, m) => acc + m.total, 0);
  const completedTopics = modules.reduce((acc, m) => acc + m.completed, 0);
  const pendingTopics = totalTopics - completedTopics;
  const overall = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <PortalLayout active="progress" crumb="Progress" onNavigate={onNavigate} onBackToCourses={onBackToCourses}>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <StatCard value={totalTopics} label="Total Topics" icon={BookOpen} tone="green" />
          <StatCard value={completedTopics} label="Completed Topics" icon={GraduationCap} tone="purple" />
          <StatCard value={pendingTopics} label="Pending Topics" icon={Clock} tone="red" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-2xs">
          <div className="flex justify-between text-sm font-semibold text-gray-800 mb-2">
            <span>Overall Progress</span>
            <span className="text-[#22c55e]">{overall}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#22c55e] h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${overall}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {modules.map((mod) => {
            const isCompleted = mod.percentage === 100;
            const isExpanded = expandedModuleId === mod.id;

            return (
              <div
                key={mod.id}
                className="bg-white rounded-xl border border-gray-100 shadow-2xs overflow-hidden"
              >
                <button
                  onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-gray-50/70"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-50 text-amber-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-gray-800 tracking-tight">{mod.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Topics: {mod.completed}/{mod.total}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="min-w-[3rem] h-6 px-2 rounded-full bg-blue-50 text-smit-blue border border-blue-200 flex items-center justify-center text-[11px] font-bold">
                      {mod.percentage}%
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                {/* Progress bar under header */}
                <div className="h-1 bg-gray-100">
                  <div
                    className={`h-1 ${isCompleted ? 'bg-emerald-500' : 'bg-smit-blue'} transition-all duration-500`}
                    style={{ width: `${mod.percentage}%` }}
                  />
                </div>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-3 bg-gray-50/40">
                    <p className="text-xs font-semibold text-gray-600 mb-2">
                      Covered Topics & Syllabus Breakdown:
                    </p>
                    <ul className="space-y-1.5 pl-1">
                      {mod.subTopics?.map((topic) => (
                        <li key={topic} className="text-xs sm:text-[13px] text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}
