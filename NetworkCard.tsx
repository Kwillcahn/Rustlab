
import React from 'react';
import DashboardCard from './DashboardCard';
import NetworkSummary from './NetworkSummary';
import { NetworkStats } from '../types';

interface NetworkCardProps {
  stats: NetworkStats;
  theme?: 'dark' | 'light';
  delay?: number;
}

const NetworkCard: React.FC<NetworkCardProps> = ({ stats, theme = 'dark', delay = 0 }) => {
  const isLight = theme === 'light';

  return (
    <DashboardCard 
      title="Network Stats" 
      subtitle="Traffic Monitor" 
      className="lg:col-span-2 xl:col-span-1"
      theme={theme}
      style={{ animationDelay: `${delay}ms` }}
      expandedContent={
        <div className="space-y-3">
          <div className={`flex justify-between items-center p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-white/5'}`}>
            <span className="text-[10px] text-slate-500 font-bold">ISP</span>
            <span className={`text-xs ${isLight ? 'text-slate-800 font-bold' : 'text-slate-200'}`}>{stats.isp}</span>
          </div>
          <div className={`flex justify-between items-center p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-white/5'}`}>
            <span className="text-[10px] text-slate-500 font-bold">WAN IP</span>
            <span className="text-xs font-mono text-emerald-500 font-bold">{stats.wanIp}</span>
          </div>
        </div>
      }
    >
      <NetworkSummary stats={stats} theme={theme} />
    </DashboardCard>
  );
};

export default NetworkCard;