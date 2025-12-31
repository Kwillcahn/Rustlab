
import React from 'react';
import DashboardCard from './DashboardCard';
import StatBar from './StatBar';
import { ServerStats } from '../types';

interface ServerCardProps {
  server: ServerStats;
  theme?: 'dark' | 'light';
  delay?: number;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, theme = 'dark', delay = 0 }) => {
  const isLight = theme === 'light';

  const renderExtraMetrics = () => {
    if (!server.extraMetrics) return null;
    return (
      <div className="space-y-3">
        {server.extraMetrics.map((m, idx) => (
          <div key={idx} className={`flex justify-between items-center p-2 rounded-lg border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/40 border-white/5'}`}>
            <span className="text-[10px] text-slate-500 font-bold uppercase">{m.label}</span>
            <span className={`text-xs font-mono ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{m.displayValue}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <DashboardCard 
      title={server.name} 
      subtitle={server.type === 'host' ? 'Hardware Node' : server.type === 'hypervisor' ? 'Hypervisor' : 'Virtual Machine'} 
      status={server.status}
      theme={theme}
      style={{ animationDelay: `${delay}ms` }}
      expandedContent={renderExtraMetrics()}
    >
      {server.type === 'hypervisor' && server.vmCount !== undefined && (
        <div className={`mb-4 p-3 rounded-lg flex items-center justify-between border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/50 border-slate-800'}`}>
          <span className="text-xs text-slate-500 font-bold uppercase">Active VMs</span>
          <span className="text-xl font-bold text-[#b22222]">{server.vmCount}</span>
        </div>
      )}
      {server.metrics.map((m, idx) => (
        <StatBar key={idx} label={m.label} value={m.value} displayValue={m.displayValue} theme={theme} />
      ))}
    </DashboardCard>
  );
};

export default ServerCard;