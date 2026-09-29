import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import Modal from './Modal';
import Avatar from './Avatar';

// Bari image localStorage bhar deti hai, isliye 256px tak chhota kar dete hain
function resizeImage(file, max = 256) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function ProfileForm({ onClose }) {
  const { student, updateProfile } = useStudent();
  const [name, setName] = useState(student.name);
  const [rollNumber, setRollNumber] = useState(student.rollNumber);
  const [avatarPreview, setAvatarPreview] = useState(student.avatar);
  const [error, setError] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Sirf image file select karein.');
    try {
      setError('');
      setAvatarPreview(await resizeImage(file));
    } catch {
      setError('Image load nahi ho saki, dobara try karein.');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim() || !rollNumber.trim()) return setError('Name aur Roll Number zaroori hain.');
    updateProfile({ name: name.trim(), rollNumber: rollNumber.trim(), avatar: avatarPreview });
    onClose();
  };

  const inputCls =
    'w-full px-3 py-2.5 bg-smit-inputBg rounded-lg text-sm outline-none border border-transparent focus:border-smit-blue focus:bg-white transition';

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="flex flex-col items-center">
        <div className="relative group">
          <Avatar src={avatarPreview} name={name} className="w-24 h-24 !border-2 !border-smit-blue" />
          <label className="absolute inset-0 bg-black/40 text-white rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 cursor-pointer transition">
            <Camera size={22} />
            <span className="text-[10px] mt-1 font-medium">Change</span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
          </label>
        </div>
        <p className="text-xs text-gray-400 mt-2">Photo badalne ke liye click karein</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Roll Number</label>
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className={inputCls}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2 pt-2">
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
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  // Form sirf open hone par mount hota hai, is liye har baar fresh values milti hain
  return (
    <Modal title="Edit Profile" onClose={onClose}>
      <ProfileForm onClose={onClose} />
    </Modal>
  );
}
