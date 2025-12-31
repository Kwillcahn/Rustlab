
import React from 'react';
import { NetworkStats } from '../types';
import Sparkline from './Sparkline';

interface NetworkSummaryProps {
  stats: NetworkStats;
  theme?: 'dark' | 'light';
}

const NetworkSummary: React.FC<NetworkSummaryProps> = ({ stats, theme = 'dark' }) => {
  const isLight = theme === 'light';
  const boxStyles = `p-3 rounded-lg border flex flex-col justify-between ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-slate-800'}`;
  const labelStyles = `text-[10px] text-slate-500 font-bold uppercase mb-1`;
  const valueStyles = `text-lg font-mono ${isLight ? 'text-slate-900 font-bold' : 'text-slate-100'}`;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className={boxStyles}>
        <div>
          <p className={labelStyles}>Download</p>
          <p className={valueStyles}>{stats.download}</p>
        </div>
        <Sparkline data={stats.downloadHistory} color="#b22222" className="mt-2 opacity-80" />
      </div>
      <div className={boxStyles}>
        <div>
          <p className={labelStyles}>Upload</p>
          <p className={valueStyles}>{stats.upload}</p>
        </div>
        <Sparkline data={stats.uploadHistory} color="#991b1b" className="mt-2 opacity-80" />
      </div>
      <div className={boxStyles}>
        <p className={labelStyles}>Latency</p>
        <p className={valueStyles}>{stats.latency}</p>
      </div>
      <div className={boxStyles}>
        <p className={labelStyles}>Devices</p>
        <p className={valueStyles}>{stats.connectedDevices}</p>
      </div>
    </div>
  );
};

export default NetworkSummary;
