
import React, { useState } from 'react';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  status?: 'online' | 'offline' | 'warning';
  children: React.ReactNode;
  expandedContent?: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light';
  style?: React.CSSProperties;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  subtitle, 
  status, 
  children, 
  expandedContent,
  className = "",
  theme = 'dark',
  style = {}
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]';
      case 'warning': return 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]';
      case 'offline': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
      default: return 'bg-slate-400';
    }
  };

  const isLight = theme === 'light';

  return (
    <div 
      onClick={() => expandedContent && setIsExpanded(!isExpanded)}
      style={{ ...style, perspective: '1200px' }}
      className={`
        relative group cursor-pointer animate-card-entry
        ${isLight ? 'bg-white/70 shadow-xl shadow-slate-200/50' : 'bg-slate-950/40'}
        backdrop-blur-md 
        border ${isLight ? 'border-slate-200' : 'border-[#b22222]/20'} 
        rounded-xl p-5 
        transition-all duration-500 ease-out
        hover:border-[#b22222]/80 
        hover:shadow-[0_0_40px_rgba(178,34,34,0.35)]
        [transform-style:preserve-3d]
        ${isExpanded 
          ? `scale-[1.02] shadow-[0_0_50px_rgba(178,34,34,0.4)] border-[#b22222] ${isLight ? 'bg-white' : 'bg-[#4a0e0e]/30'}` 
          : `hover:-translate-y-3 hover:scale-[1.04] hover:[transform:rotateY(8deg)_rotateX(2deg)] ${isLight ? 'hover:bg-white' : 'hover:bg-[#4a0e0e]/20'}`
        }
        flex flex-col
        overflow-hidden
        ${className}
      `}
    >
      {/* Dynamic Rust Glow Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#b22222]/10 via-transparent to-transparent rounded-xl pointer-events-none transition-opacity duration-700 ${isLight ? 'opacity-20' : 'opacity-40'} group-hover:opacity-100`} />
      
      {/* Background Deep Rust Shift */}
      <div className="absolute inset-0 bg-[#8b1a1a]/0 group-hover:bg-[#8b1a1a]/5 transition-colors duration-700 pointer-events-none" />

      <div className="flex justify-between items-start mb-4 relative z-10 [transform:translateZ(30px)]">
        <div>
          <h3 className={`font-semibold text-lg tracking-tight flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
            {title}
            {expandedContent && (
              <svg 
                className={`w-4 h-4 transition-transform duration-500 ${isLight ? 'text-slate-400' : 'text-slate-500'} ${isExpanded ? 'rotate-180 text-[#b22222]' : 'group-hover:text-[#b22222]'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </h3>
          {subtitle && <p className={`${isLight ? 'text-slate-500' : 'text-slate-400'} text-xs font-medium uppercase tracking-wider`}>{subtitle}</p>}
        </div>
        {status && (
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{status}</span>
            <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor()}`} />
          </div>
        )}
      </div>

      <div className="relative z-10 flex-1 [transform:translateZ(15px)]">
        {children}
      </div>

      {/* Expanded Content Section */}
      <div className={`
        relative z-10 overflow-hidden transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
        ${isExpanded ? 'max-h-[800px] mt-6 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className={`pt-4 border-t ${isLight ? 'border-slate-200' : 'border-[#b22222]/30'}`}>
          {expandedContent}
        </div>
      </div>

      {/* Interactive Edge Glow */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent transition-all duration-700 ${isExpanded ? 'via-[#b22222]' : 'group-hover:via-[#b22222]'}`} />
      
      {/* Premium Sweep Effect on Hover */}
      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] transition-all duration-1000 group-hover:translate-x-full pointer-events-none opacity-0 group-hover:opacity-100" />
    </div>
  );
};

export default DashboardCard;