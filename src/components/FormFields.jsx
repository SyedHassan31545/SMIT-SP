import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const inputCls =
  'w-full px-3.5 py-2.5 bg-smit-inputBg border border-transparent focus:border-smit-blue focus:bg-white rounded-lg text-sm text-gray-800 outline-none transition';

export function TextField({ label, value, onChange, error, ...rest }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`${inputCls} ${error ? '!border-red-400' : ''}`}
        {...rest}
      />
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function PasswordField({ label = 'Password *', value, onChange, error, ...rest }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={`${inputCls} pr-10 ${error ? '!border-red-400' : ''}`}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function FormMessage({ type = 'error', children }) {
  if (!children) return null;
  const tone =
    type === 'success'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : type === 'info'
      ? 'bg-blue-50 text-blue-700 border-blue-200'
      : 'bg-red-50 text-red-600 border-red-200';
  return <div className={`text-xs px-3 py-2 rounded-lg border ${tone}`}>{children}</div>;
}

export const primaryBtn =
  'w-full py-2.5 bg-smit-blue hover:bg-smit-blueHover text-white text-sm font-semibold rounded-lg tracking-wider transition shadow-sm';
export const switchBtn =
  'w-full py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition text-center shadow-xs';
