
import React from 'react';
import DashboardCard from './DashboardCard';
import LogViewer from './LogViewer';
import { LogEntry } from '../types';

interface LogCardProps {
  logs: LogEntry[];
  theme?: 'dark' | 'light';
  delay?: number;
}

const LogCard: React.FC<LogCardProps> = ({ logs, theme = 'dark', delay = 0 }) => {
  return (
    <DashboardCard 
      title="Logs & Alerts" 
      subtitle="Recent Events" 
      className="lg:col-span-2 xl:col-span-2" 
      theme={theme}
      style={{ animationDelay: `${delay}ms` }}
    >
      <LogViewer logs={logs} theme={theme} />
    </DashboardCard>
  );
};

export default LogCard;