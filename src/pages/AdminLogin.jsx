import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SmitLogo from '../components/SmitLogo';

export default function AdminLogin({ onSwitchRole }) {
  const { login } = useAuth();
  const [adminEmail, setAdminEmail] = useState('admin@saylani.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adminEmail || !password) {
      alert('براہ کرم ایڈمن ای میل اور پاس ورڈ درج کریں');
      return;
    }
    // AuthContext میں لاگ ان فنکشن کال ہو گا
    login('admin', adminEmail, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* آفیشل SMIT ہیڈر */}
      <SmitLogo portalTitle="Administration Portal" />

      {/* ایڈمن لاگ ان کارڈ */}
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="text-smit-blue w-6 h-6" />
          <h3 className="text-xl font-bold text-gray-900">Admin Login</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          Provide your administrative credentials to manage trainers, batches, and student admissions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Admin Email / Username *
            </label>
            <input
              type="text"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@saylanimit.com"
              className="w-full px-3.5 py-2.5 bg-smit-inputBg border border-transparent focus:border-smit-blue focus:bg-white rounded-lg text-sm text-gray-800 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-smit-inputBg border border-transparent focus:border-smit-blue focus:bg-white rounded-lg text-sm text-gray-800 outline-none transition pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-smit-blue hover:bg-smit-blueHover text-white text-sm font-semibold rounded-lg tracking-wider transition shadow-sm"
          >
            LOGIN AS ADMIN
          </button>
        </form>
      </div>

      {/* دوسرے پورٹلز پر سوئچ کرنے کے بٹنز */}
      <div className="w-full max-w-[420px] mt-4 flex gap-2">
        <button
          onClick={() => onSwitchRole('student')}
          className="flex-1 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition text-center shadow-xs"
        >
          Login as Student
        </button>
        <button
          onClick={() => onSwitchRole('trainer')}
          className="flex-1 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition text-center shadow-xs"
        >
          Login as Teacher
        </button>
      </div>
    </div>
  );
}