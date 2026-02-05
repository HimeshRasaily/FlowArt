import React from 'react';

const Logo = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Two overlapping circles creating a minimalist geometric mark */}
      <circle
        cx="16"
        cy="20"
        r="12"
        stroke="#000000"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="24"
        cy="20"
        r="12"
        stroke="#8A2BE2"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Center intersection accent */}
      <circle
        cx="20"
        cy="20"
        r="2"
        fill="#8A2BE2"
      />
    </svg>
  );
};

export default Logo;
