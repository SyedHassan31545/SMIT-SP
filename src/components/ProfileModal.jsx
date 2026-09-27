import React, { useState } from 'react';
import { X, Upload, Camera } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function ProfileModal({ isOpen, onClose }) {
  const { student, updateProfile } = useStudent();
  const [name, setName] = useState(student.name);
  const [rollNumber, setRollNumber] = useState(student.rollNumber);
  const [avatarPreview, setAvatarPreview] = useState(student.avatar);

  if (!isOpen) return null;

  // Handle local image file upload and convert to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      rollNumber,
      avatar: avatarPreview
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 mt-4">
          {/* Avatar Preview & Upload */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-smit-blue shadow"
              />
              <label className="absolute inset-0 bg-black/40 text-white rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition">
                <Camera size={22} />
                <span className="text-[10px] mt-1 font-medium">Change</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-2">Click to upload your photo</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-smit-inputBg rounded-lg text-sm outline-none border border-transparent focus:border-smit-blue"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full px-3 py-2 bg-smit-inputBg rounded-lg text-sm outline-none border border-transparent focus:border-smit-blue"
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-sm rounded-lg bg-smit-blue hover:bg-smit-blueHover text-white font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}