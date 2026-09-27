import React from 'react';

export default function SmitLogo({ portalTitle }) {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      {/* آفیشل انداز کا گریجویشن کیپ و SMIT لوگو مارک اپ */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* Graduation Cap Icon */}
          <div className="absolute -top-3 left-[46px] w-6 h-6 text-[#1e4886]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 19.39 8.13 21.18 12 21.18C15.87 21.18 19 19.39 19 17.18V13.18L12 17L5 13.18Z" />
            </svg>
          </div>
          
          <span className="text-4xl font-extrabold tracking-tight">
            <span className="text-[#0ea5e9]">S</span>
            <span className="text-[#1e4886]">M</span>
            <span className="text-[#84cc16]">I</span>
            <span className="text-[#0ea5e9]">T</span>
          </span>
        </div>
        
        <span className="text-[9px] font-bold tracking-widest text-[#1e4886] mt-0.5">
          SAYLANI MASS IT TRAINING
        </span>
      </div>

      {/* پورٹل کا عنوان */}
      <h2 className="text-lg font-medium text-gray-800 mt-2">
        {portalTitle}
      </h2>
    </div>
  );
}