import React from 'react';

const TONES = {
  green: 'bg-emerald-50 text-emerald-500',
  purple: 'bg-purple-50 text-purple-500',
  blue: 'bg-blue-50 text-blue-500',
  amber: 'bg-amber-50 text-amber-500',
  red: 'bg-red-50 text-red-400',
  gray: 'bg-gray-50 text-gray-400 border border-gray-100',
};

export default function StatCard({ value, label, icon: Icon, tone = 'blue' }) {
  return (
    <div className="bg-white rounded-xl p-3 sm:p-5 border border-gray-100 shadow-2xs flex justify-between items-start gap-3">
      <div className="min-w-0">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{value}</h3>
        <p className="text-xs sm:text-[13px] text-gray-500 mt-1">{label}</p>
      </div>
      {Icon && (
        <div className={`hidden sm:flex w-9 h-9 rounded-lg items-center justify-center shrink-0 ${TONES[tone]}`}>
          <Icon size={18} />
        </div>
      )}
    </div>
  );
}
