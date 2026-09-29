import React, { useState } from 'react';

function initials(name = '') {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join('') || 'S'
  );
}

// Agar image load na ho (offline / broken link) to initials dikhata hai
export default function Avatar({ src, name, className = 'w-9 h-9' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`${className} rounded-full bg-smit-blue text-white flex items-center justify-center text-xs font-bold shrink-0`}
        aria-label={name}
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className={`${className} rounded-full object-cover border border-gray-200 shrink-0`}
    />
  );
}
