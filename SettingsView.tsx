
import React from 'react';

interface SettingsViewProps {
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ theme, onThemeChange }) => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
          Appearance Settings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dark Theme Option */}
          <button 
            onClick={() => onThemeChange('dark')}
            className={`
              relative flex flex-col items-start p-6 rounded-xl border-2 transition-all duration-300
              ${theme === 'dark' 
                ? 'border-[#b22222] bg-[#b22222]/10 ring-4 ring-[#b22222]/5' 
                : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'}
            `}
          >
            <div className="flex items-center justify-between w-full mb-4">
              <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-400'}`}>Dark Theme</span>
              {theme === 'dark' && <div className="w-4 h-4 rounded-full bg-[#b22222] shadow-[0_0_10px_#b22222]" />}
            </div>
            <div className="w-full h-32 rounded-lg bg-slate-950 border border-white/10 overflow-hidden flex flex-col p-3 gap-2">
              <div className="w-1/2 h-2 bg-[#b22222]/40 rounded" />
              <div className="w-3/4 h-2 bg-slate-800 rounded" />
              <div className="mt-auto flex gap-2">
                <div className="w-6 h-6 rounded bg-[#b22222]/20" />
                <div className="w-6 h-6 rounded bg-[#b22222]/20" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 text-left">
              The classic RustLab experience. Optimized for low-light environments and server rooms.
            </p>
          </button>

          {/* Light Theme Option */}
          <button 
            onClick={() => onThemeChange('light')}
            className={`
              relative flex flex-col items-start p-6 rounded-xl border-2 transition-all duration-300
              ${theme === 'light' 
                ? 'border-[#b22222] bg-white ring-4 ring-[#b22222]/10' 
                : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'}
            `}
          >
            <div className="flex items-center justify-between w-full mb-4">
              <span className={`font-bold ${theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`}>Light Theme</span>
              {theme === 'light' && <div className="w-4 h-4 rounded-full bg-[#b22222] shadow-[0_0_10px_#b22222]" />}
            </div>
            <div className="w-full h-32 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden flex flex-col p-3 gap-2">
              <div className="w-1/2 h-2 bg-[#b22222]/40 rounded" />
              <div className="w-3/4 h-2 bg-slate-200 rounded" />
              <div className="mt-auto flex gap-2">
                <div className="w-6 h-6 rounded bg-[#b22222]/20" />
                <div className="w-6 h-6 rounded bg-[#b22222]/20" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500 text-left">
              High contrast and clean aesthetics. Perfect for daytime monitoring and detailed analysis.
            </p>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-slate-100 text-[#b22222]' : 'bg-white/5 text-[#b22222]'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className={`text-sm font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Persistent Storage</p>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-widest">Local Session Active</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">APP VERSION 2.4.0-STABLE</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
