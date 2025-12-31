
import React from 'react';
import DashboardCard from './DashboardCard';
import StatBar from './StatBar';
import { ServerStats } from '../types';

interface StorageViewProps {
  servers: ServerStats[];
  piHoleStorage?: { value: number; displayValue: string };
  theme?: 'dark' | 'light';
}

const StorageView: React.FC<StorageViewProps> = ({ servers, piHoleStorage, theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500 items-start">
      {servers.map((server) => {
        const storageMetric = server.metrics.find(m => m.label === 'Storage') || 
                            server.metrics.find(m => m.label.toLowerCase().includes('storage')) ||
                            // Cluster-wide storage fallback if PVE
                            (server.type === 'hypervisor' ? { value: 68, displayValue: '4.2TB / 6TB' } : null);

        if (!storageMetric) return null;

        return (
          <DashboardCard
            key={server.id}
            title={server.name}
            subtitle={`${server.type.toUpperCase()} Storage`}
            status={server.status}
            theme={theme}
            expandedContent={
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                  <span>FILESYSTEM</span>
                  <span className={isLight ? 'text-slate-700 font-bold' : 'text-slate-300'}>ZFS / EXT4</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                  <span>MOUNT POINT</span>
                  <span className={isLight ? 'text-slate-700 font-bold' : 'text-slate-300'}>/mnt/data</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                  <span>HEALTH</span>
                  <span className="text-emerald-500 font-bold uppercase">Optimal</span>
                </div>
              </div>
            }
          >
            <div className="mb-6">
              <StatBar 
                label="Usage Capacity" 
                value={storageMetric.value} 
                displayValue={storageMetric.displayValue} 
                theme={theme}
              />
              <div className="mt-4 flex gap-4 text-center">
                <div className={`flex-1 p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-white/5'}`}>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Allocated</p>
                  <p className={`text-sm font-mono ${isLight ? 'text-slate-800 font-bold' : 'text-slate-200'}`}>
                    {storageMetric.displayValue?.split('/')[0].trim() || 'N/A'}
                  </p>
                </div>
                <div className={`flex-1 p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-white/5'}`}>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Free Space</p>
                  <p className="text-sm font-mono text-emerald-500 font-bold">
                    {/* Crude logic to estimate free space for mock display */}
                    {storageMetric.displayValue?.includes('TB') ? '0.8 TB' : '18 GB'}
                  </p>
                </div>
              </div>
            </div>
          </DashboardCard>
        );
      })}

      {/* Pi-Hole VM Storage */}
      <DashboardCard
        title="Pi-Hole VM"
        subtitle="VM STORAGE"
        status="online"
        theme={theme}
        expandedContent={
          <div className={`text-xs italic ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Pi-Hole database logs are rotated every 365 days. Storage usage is stable.
          </div>
        }
      >
        <StatBar 
          label="Disk Usage" 
          value={piHoleStorage?.value || 12} 
          displayValue={piHoleStorage?.displayValue || '2.4GB / 20GB'} 
          theme={theme}
        />
        <div className="mt-4 flex gap-4 text-center">
          <div className={`flex-1 p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-white/5'}`}>
            <p className="text-[9px] text-slate-500 font-bold uppercase">DB Size</p>
            <p className={`text-sm font-mono ${isLight ? 'text-slate-800 font-bold' : 'text-slate-200'}`}>842 MB</p>
          </div>
          <div className={`flex-1 p-2 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-white/5'}`}>
            <p className="text-[9px] text-slate-500 font-bold uppercase">Logs</p>
            <p className={`text-sm font-mono ${isLight ? 'text-slate-800 font-bold' : 'text-slate-200'}`}>124 MB</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default StorageView;
