
import React from 'react';
import { LogEntry } from '../types';

interface LogViewerProps {
  logs: LogEntry[];
  theme?: 'dark' | 'light';
}

const LogViewer: React.FC<LogViewerProps> = ({ logs, theme = 'dark' }) => {
  const isLight = theme === 'light';

  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-500 bg-red-500/10';
      case 'warning': return isLight ? 'text-amber-600 bg-amber-100' : 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
      {logs.map((log) => (
        <div key={log.id} className={`text-[11px] leading-relaxed border-b pb-2 last:border-0 ${isLight ? 'border-slate-100' : 'border-slate-800/50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getLevelStyles(log.level)}`}>
              {log.level}
            </span>
            <span className="text-slate-500 font-mono">{log.timestamp}</span>
            <span className="text-[#b22222] font-bold">{log.source}</span>
          </div>
          <p className={`font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'} italic`}>{log.message}</p>
        </div>
      ))}
    </div>
  );
};

export default LogViewer;
