
import React, { useState } from 'react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  theme?: 'dark' | 'light';
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, theme = 'dark' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isLight = theme === 'light';

  const menuItems = [
    { id: 'dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Dashboard' },
    { id: 'storage', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2', label: 'Storage' },
    { id: 'activity', icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Activity' },
    { id: 'settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', label: 'Settings' },
  ];

  return (
    <aside className={`
      h-screen sticky top-0
      ${isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-950/80 border-[#b22222]/20'}
      backdrop-blur-xl
      border-r
      transition-all duration-500 ease-in-out
      flex flex-col z-50
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <span className="text-[#b22222] font-black text-2xl tracking-tighter">RUST<span className={isLight ? 'text-slate-900' : 'text-slate-100'}>LAB</span></span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg transition-colors ${isLight ? 'text-slate-400 hover:bg-slate-100 hover:text-[#b22222]' : 'text-slate-400 hover:bg-[#b22222]/10 hover:text-[#b22222]'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`
              w-full flex items-center p-3 rounded-xl transition-all duration-300 group
              ${activeView === item.id 
                ? `${isLight ? 'bg-[#b22222]/10 text-[#b22222] border-slate-200' : 'bg-[#b22222]/20 text-[#b22222] border-[#b22222]/30 shadow-[0_0_20px_rgba(178,34,34,0.15)]'} border` 
                : `${isLight ? 'text-slate-500 hover:bg-slate-50 hover:text-[#b22222]' : 'text-slate-400 hover:bg-[#b22222]/10 hover:text-[#b22222]'} border border-transparent`}
            `}
          >
            <svg 
              className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${activeView === item.id ? 'scale-110 text-[#b22222]' : 'group-hover:scale-110'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {!isCollapsed && (
              <span className="ml-4 font-medium tracking-wide transition-colors duration-300">
                {item.label}
              </span>
            )}
            {activeView === item.id && !isCollapsed && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#b22222] animate-pulse" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4">
        <div className={`
          flex items-center gap-3 p-3 rounded-xl border
          transition-all duration-300
          ${isLight ? 'bg-slate-50 border-slate-200 hover:border-[#b22222]/40' : 'bg-slate-900/50 border-slate-800 hover:border-[#b22222]/40'}
          ${isCollapsed ? 'justify-center' : ''}
        `}>
          <div className="w-8 h-8 rounded-full bg-[#b22222] flex items-center justify-center text-white font-bold text-xs shadow-[0_0_10px_rgba(178,34,34,0.4)]">
            KC
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className={`text-xs font-bold truncate ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>Admin User</p>
              <p className="text-[10px] text-slate-500 truncate">192.168.1.50</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
