
import React from 'react';
import DashboardCard from './DashboardCard';
import Sparkline from './Sparkline';
import { ServerStats } from '../types';

interface ActivityViewProps {
  servers: ServerStats[];
  piHoleActivity?: {
    uploadRate: string;
    downloadRate: string;
    uploadHistory: number[];
    downloadHistory: number[];
  };
  theme?: 'dark' | 'light';
}

const ActivityView: React.FC<ActivityViewProps> = ({ servers, piHoleActivity, theme = 'dark' }) => {
  const isLight = theme === 'light';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 items-start">
      {servers.map((server) => (
        <DashboardCard
          key={server.id}
          title={server.name}
          subtitle="Network Throughput"
          status={server.status}
          theme={theme}
          expandedContent={
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                <span>Total Received</span>
                <span className={`font-mono ${isLight ? 'text-slate-800 font-bold' : 'text-slate-200'}`}>{server.networkActivity?.totalReceived || '1.2 GB'}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                <span>Total Sent</span>
                <span className={`font-mono ${isLight ? 'text-slate-800 font-bold' : 'text-slate-200'}`}>{server.networkActivity?.totalSent || '450 MB'}</span>
              </div>
              <div className={`pt-2 border-t ${isLight ? 'border-slate-200' : 'border-[#b22222]/10'}`}>
                <p className="text-[9px] text-slate-500 mb-1 font-bold uppercase">MAC ADDRESS</p>
                <p className={`text-[10px] font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>00:1A:2B:3C:4D:5E</p>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Download</span>
                <span className="text-xs font-mono text-emerald-500 font-bold">{server.networkActivity?.downloadRate || '0 Kb/s'}</span>
              </div>
              <Sparkline 
                data={server.networkActivity?.downloadHistory || []} 
                color="#10b981" 
                className={isLight ? "opacity-100" : "opacity-60"}
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Upload</span>
                <span className="text-xs font-mono text-[#b22222] font-bold">{server.networkActivity?.uploadRate || '0 Kb/s'}</span>
              </div>
              <Sparkline 
                data={server.networkActivity?.uploadHistory || []} 
                color="#b22222" 
                className={isLight ? "opacity-100" : "opacity-60"}
              />
            </div>
          </div>
        </DashboardCard>
      ))}

      {/* Pi-Hole VM Network Activity */}
      <DashboardCard
        title="Pi-Hole VM"
        subtitle="Network Throughput"
        status="online"
        theme={theme}
        expandedContent={
          <div className={`text-[10px] font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Filtering DNS traffic for 34 devices.
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Download</span>
              <span className="text-xs font-mono text-emerald-500 font-bold">{piHoleActivity?.downloadRate || '12.4 Kb/s'}</span>
            </div>
            <Sparkline 
              data={piHoleActivity?.downloadHistory || []} 
              color="#10b981" 
              className={isLight ? "opacity-100" : "opacity-60"}
            />
          </div>
          
          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Upload</span>
              <span className="text-xs font-mono text-[#b22222] font-bold">{piHoleActivity?.uploadRate || '5.1 Kb/s'}</span>
            </div>
            <Sparkline 
              data={piHoleActivity?.uploadHistory || []} 
              color="#b22222" 
              className={isLight ? "opacity-100" : "opacity-60"}
            />
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default ActivityView;
