import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SmitLogo from '../components/SmitLogo';

export default function TrainerLogin({ onSwitchRole }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('3230375148053');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('براہ کرم ای میل اور پاس ورڈ درج کریں');
    login('trainer', email, password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* SMIT لوگو */}
      <SmitLogo portalTitle="Trainer Portal" />

      {/* مین کارڈ */}
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Login</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          Kindly provide your email and password to access the trainer portal.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trainer@saylani.com"
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
                className="w-full px-3.5 py-2.5 bg-smit-inputBg border border-transparent focus:border-smit-blue focus:bg-white rounded-lg text-sm text-gray-800 outline-none transition pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-smit-blue hover:bg-smit-blueHover text-white text-sm font-semibold rounded-lg tracking-wider transition shadow-sm"
          >
            LOGIN
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => alert('پاس ورڈ ری سیٹ کا ربط آپ کے ایڈمنسٹریٹر کو بھیجا جائے گا۔')}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>

      {/* نیچے والے سوئچ بٹنز */}
      <div className="w-full max-w-[420px] mt-4 space-y-2">
        <button
          onClick={() => onSwitchRole('student')}
          className="w-full py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition text-center shadow-xs"
        >
          Login as student
        </button>
        <button
          onClick={() => onSwitchRole('admin')}
          className="w-full py-2 text-xs text-gray-500 hover:text-smit-blue font-medium transition text-center block"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}