import React from 'react';

interface NikkeIconProps {
  className?: string;
  size?: number;
}

export const NikkeIcon: React.FC<NikkeIconProps> = ({ className = 'w-3.5 h-3.5', size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Main NIKKE 'N' stencil body */}
      <path
        d="M4 7.2H5.8V3.5H9.2L16 14.8V3.5H20V16.8H18.2V20.5H14.8L8 9.2V20.5H4V7.2Z"
        fill="currentColor"
      />
      {/* Top-left upward-facing faded tech stencil lines (Nikke logo aesthetic) */}
      <rect x="4" y="3.5" width="1.2" height="2.8" fill="currentColor" opacity="0.4" />
      <rect x="4" y="1.2" width="1.2" height="1.5" fill="currentColor" opacity="0.6" />
      {/* Bottom-right downward-facing faded tech stencil lines (Nikke logo aesthetic) */}
      <rect x="18.8" y="17.7" width="1.2" height="2.8" fill="currentColor" opacity="0.4" />
      <rect x="18.8" y="21.3" width="1.2" height="1.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
};
