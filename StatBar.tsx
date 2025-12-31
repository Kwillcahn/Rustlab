
import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  displayValue?: string;
  theme?: 'dark' | 'light';
}

const StatBar: React.FC<StatBarProps> = ({ label, value, displayValue, theme = 'dark' }) => {
  const isLight = theme === 'light';
  
  const getBarColor = (val: number) => {
    if (val > 90) return 'bg-red-500';
    if (val > 75) return 'bg-orange-500';
    return 'bg-[#b22222]'; // Rust color
  };

  return (
    <div className="mb-3">
      <div className={`flex justify-between text-xs mb-1 font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
        <span>{label}</span>
        <span className={isLight ? 'font-bold' : ''}>{displayValue || `${value}%`}</span>
      </div>
      <div className={`w-full rounded-full h-1.5 overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-slate-900/50'}`}>
        <div
          className={`h-full transition-all duration-1000 ease-out ${getBarColor(value)} shadow-[0_0_5px_rgba(178,34,34,0.3)]`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;
