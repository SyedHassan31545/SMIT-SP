import React, { useEffect } from 'react';
import { X } from 'lucide-react';

// Shared modal: Esc se band, bahar click se band, background scroll lock
export default function Modal({ title, onClose, children, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`bg-white w-full ${maxWidth} rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto animate-pop-in`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 gap-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 min-w-0">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 shrink-0"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
