import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SmitLogo from '../components/SmitLogo';
import { TextField, PasswordField, primaryBtn } from '../components/FormFields';

export default function AdminLogin({ onSwitchRole }) {
  const { login } = useAuth();
  const [adminEmail, setAdminEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!adminEmail.trim()) errs.email = 'Admin email ya username likhein.';
    if (password.length < 6) errs.password = 'Password kam az kam 6 characters ka ho.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    login('admin', adminEmail.trim(), password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8">
      <SmitLogo portalTitle="Administration Portal" />

      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="text-smit-blue w-6 h-6" />
          <h3 className="text-xl font-bold text-gray-900">Admin Login</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          Provide your administrative credentials to manage trainers, batches, and student admissions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <TextField
            label="Admin Email / Username *"
            value={adminEmail}
            onChange={setAdminEmail}
            error={errors.email}
            autoComplete="username"
            placeholder="admin@saylani.com"
          />
          <PasswordField
            value={password}
            onChange={setPassword}
            error={errors.password}
            autoComplete="current-password"
            placeholder="••••••••"
          />
          <button type="submit" className={primaryBtn}>
            LOGIN AS ADMIN
          </button>
        </form>
      </div>

      <div className="w-full max-w-[420px] mt-4 flex gap-2">
        <button
          onClick={() => onSwitchRole('student')}
          className="flex-1 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-lg transition text-center shadow-xs"
        >
          Login as Student
        </button>
        <button
          onClick={() => onSwitchRole('trainer')}
          className="flex-1 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium rounded-lg transition text-center shadow-xs"
        >
          Login as Teacher
        </button>
      </div>
    </div>
  );
}
