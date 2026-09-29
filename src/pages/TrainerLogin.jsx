import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SmitLogo from '../components/SmitLogo';
import { TextField, PasswordField, FormMessage, primaryBtn, switchBtn } from '../components/FormFields';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function TrainerLogin({ onSwitchRole }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo('');
    const errs = {};
    if (!EMAIL_RE.test(email.trim())) errs.email = 'Sahi email address likhein.';
    if (password.length < 6) errs.password = 'Password kam az kam 6 characters ka ho.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    login('trainer', email.trim(), password);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8">
      <SmitLogo portalTitle="Trainer Portal" />

      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Login</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          Kindly provide your email and password to access the trainer portal.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <FormMessage type="info">{info}</FormMessage>

          <TextField
            label="Email *"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            autoComplete="username"
            placeholder="trainer@saylani.com"
          />
          <PasswordField
            value={password}
            onChange={setPassword}
            error={errors.password}
            autoComplete="current-password"
          />

          <button type="submit" className={primaryBtn}>
            LOGIN
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setInfo('Password reset ka link aap ke administrator ko bhej diya jayega.')}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-[420px] mt-4 space-y-2">
        <button onClick={() => onSwitchRole('student')} className={switchBtn}>
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
