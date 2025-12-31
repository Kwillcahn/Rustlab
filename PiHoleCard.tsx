
import React from 'react';
import DashboardCard from './DashboardCard';
import StatBar from './StatBar';
import { PiHoleStats } from '../types';

interface PiHoleCardProps {
  stats: PiHoleStats;
  theme?: 'dark' | 'light';
  delay?: number;
}

const PiHoleCard: React.FC<PiHoleCardProps> = ({ stats, theme = 'dark', delay = 0 }) => {
  const isLight = theme === 'light';

  return (
    <DashboardCard 
      title="Pi-Hole VM" 
      subtitle="DNS Filter" 
      status={stats.status === 'active' ? 'online' : 'offline'}
      theme={theme}
      style={{ animationDelay: `${delay}ms` }}
      expandedContent={
        <div className="space-y-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase">Top Blocked Domains</p>
          <div className="space-y-2">
            {stats.topBlocked?.map((domain, i) => (
              <div key={i} className={`text-xs p-2 rounded border font-mono truncate ${isLight ? 'bg-red-50 text-red-700 border-red-100' : 'bg-red-500/5 text-red-400 border-red-500/10'}`}>
                {domain}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className={`text-center p-2 rounded-lg ${isLight ? 'bg-slate-50' : 'bg-slate-900/50'}`}>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Blocked</p>
          <p className="text-lg font-bold text-red-500">{stats.percentage}%</p>
        </div>
        <div className={`text-center p-2 rounded-lg ${isLight ? 'bg-slate-50' : 'bg-slate-900/50'}`}>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Total Queries</p>
          <p className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>{stats.queries.toLocaleString()}</p>
        </div>
      </div>
      <StatBar label="Blocked Ads" value={stats.percentage} displayValue={`${stats.blocked.toLocaleString()} queries`} theme={theme} />
    </DashboardCard>
  );
};

export default PiHoleCard;