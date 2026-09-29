import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SmitLogo from '../components/SmitLogo';
import { TextField, PasswordField, FormMessage, primaryBtn, switchBtn } from '../components/FormFields';

// 3230375148053 -> 32303-7514805-3
const formatCnic = (raw) => {
  const d = raw.replace(/\D/g, '').slice(0, 13);
  if (d.length <= 5) return d;
  if (d.length <= 12) return `${d.slice(0, 5)}-${d.slice(5)}`;
  return `${d.slice(0, 5)}-${d.slice(5, 12)}-${d.slice(12)}`;
};

export default function StudentLogin({ onSwitchRole }) {
  const { login, createPassword } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'create'
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); // { type, text }

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setMessage(null);
    setPassword('');
    setConfirm('');
  };

  const validate = (isCreate) => {
    const e = {};
    if (cnic.replace(/\D/g, '').length !== 13) e.cnic = 'CNIC 13 digits ka hona chahiye.';
    if (password.length < 6) e.password = 'Password kam az kam 6 characters ka ho.';
    if (isCreate && confirm !== password) e.confirm = 'Dono password match nahi karte.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = (ev) => {
    ev.preventDefault();
    setMessage(null);
    if (!validate(false)) return;
    const res = login('student', cnic, password);
    if (!res.ok) setMessage({ type: 'error', text: res.error });
  };

  const handleCreate = (ev) => {
    ev.preventDefault();
    setMessage(null);
    if (!validate(true)) return;
    if (createPassword(cnic, password)) {
      setActiveTab('login');
      setPassword('');
      setConfirm('');
      setMessage({ type: 'success', text: 'Password ban gaya. Ab login karein.' });
    } else {
      setMessage({ type: 'error', text: 'Password save nahi ho saka.' });
    }
  };

  const isCreate = activeTab === 'create';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8">
      <SmitLogo portalTitle="Student Portal" />

      <div className="w-full max-w-[420px] bg-gray-100 p-1 rounded-lg flex mb-4 border border-gray-200">
        {[
          ['login', 'Login'],
          ['create', 'Create Password'],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => switchTab(key)}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === key ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{isCreate ? 'Create Password' : 'Login'}</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          {isCreate
            ? 'Apna CNIC number darj karein aur portal ke liye naya password set karein.'
            : 'Kindly provide the CNIC number and password used during SMIT course registration.'}
        </p>

        <form onSubmit={isCreate ? handleCreate : handleLogin} className="space-y-4" noValidate>
          <FormMessage type={message?.type}>{message?.text}</FormMessage>

          <TextField
            label="CNIC *"
            value={cnic}
            onChange={(v) => setCnic(formatCnic(v))}
            error={errors.cnic}
            inputMode="numeric"
            autoComplete="username"
            placeholder="e.g. 42101-1234567-1"
          />

          <PasswordField
            label={isCreate ? 'New Password *' : 'Password *'}
            value={password}
            onChange={setPassword}
            error={errors.password}
            autoComplete={isCreate ? 'new-password' : 'current-password'}
          />

          {isCreate && (
            <PasswordField
              label="Confirm Password *"
              value={confirm}
              onChange={setConfirm}
              error={errors.confirm}
              autoComplete="new-password"
            />
          )}

          <button type="submit" className={primaryBtn}>
            {isCreate ? 'CREATE PASSWORD' : 'LOGIN'}
          </button>
        </form>
      </div>

      <div className="w-full max-w-[420px] mt-4 space-y-2">
        <button onClick={() => onSwitchRole('trainer')} className={switchBtn}>
          Login as teacher
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
