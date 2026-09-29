import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import Modal from './Modal';

export default function FeedbackModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <Modal title="Send Feedback" onClose={onClose}>
      <FeedbackForm onClose={onClose} />
    </Modal>
  );
}

function FeedbackForm({ onClose }) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!rating) return setError('Pehle rating select karein.');
    if (message.trim().length < 5) return setError('Feedback thora detail mein likhein.');
    try {
      const all = JSON.parse(localStorage.getItem('smit_feedback') || '[]');
      all.push({ rating, message: message.trim(), at: new Date().toISOString() });
      localStorage.setItem('smit_feedback', JSON.stringify(all));
    } catch {
      /* storage full / blocked: ignore */
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="py-6 flex flex-col items-center text-center">
        <CheckCircle2 className="text-emerald-500" size={40} />
        <h4 className="mt-3 font-bold text-gray-800">Shukriya!</h4>
        <p className="text-sm text-gray-500 mt-1">Aap ka feedback save ho gaya hai.</p>
        <button
          onClick={onClose}
          className="mt-5 px-6 py-2 text-sm rounded-lg bg-smit-blue hover:bg-smit-blueHover text-white font-medium"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Aap ka experience kaisa raha?</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              aria-label={`${n} star`}
              className="p-1"
            >
              <Star
                size={28}
                className={n <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Feedback</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Portal ke baare mein apni raay likhein..."
          className="w-full px-3 py-2.5 bg-smit-inputBg rounded-lg text-sm outline-none border border-transparent focus:border-smit-blue focus:bg-white resize-none transition"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2">
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
          Submit
        </button>
      </div>
    </form>
  );
}
