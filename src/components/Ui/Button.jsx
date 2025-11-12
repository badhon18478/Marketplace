// src/components/ui/button.jsx
import React from 'react';

export const Button = ({ children, onClick, className, size, variant }) => {
  let baseClasses = `rounded transition-all duration-200 `;

  if (size === 'lg') baseClasses += `px-6 py-3 text-lg `;
  if (size === 'icon') baseClasses += `p-2 `;

  if (variant === 'ghost') baseClasses += `bg-transparent hover:bg-white/20 `;

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
};
