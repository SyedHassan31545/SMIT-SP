import React from 'react';
import logo from '../assets/logo-trimmed.png';

// size: 'lg' (login pages) | 'md' | 'sm' (navbar / sidebar)
const SIZES = {
  lg: 'h-24 sm:h-28',
  md: 'h-14',
  sm: 'h-12',
};

export function LogoImage({ size = 'sm', className = '' }) {
  return (
    <img
      src={logo}
      alt="SMIT - Saylani Mass IT Training"
      className={`${SIZES[size]} w-auto object-contain select-none ${className}`}
      draggable={false}
    />
  );
}

export default function SmitLogo({ portalTitle }) {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <LogoImage size="lg" />
      {portalTitle && (
        <h2 className="text-lg font-medium text-gray-800 mt-2">{portalTitle}</h2>
      )}
    </div>
  );
}
