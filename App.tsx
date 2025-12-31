
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SettingsView from './components/SettingsView';
import StorageView from './components/StorageView';
import ActivityView from './components/ActivityView';
import ServerCard from './components/ServerCard';
import PiHoleCard from './components/PiHoleCard';
import NetworkCard from './components/NetworkCard';
import LogCard from './components/LogCard';
import { ServerStats, NetworkStats, PiHoleStats, LogEntry } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const generateMockHistory = (count: number, base: number, variance: number) => 
    Array.from({ length: count }, () => Math.max(0, base + (Math.random() * variance - variance/2)));

  // Mock Data States
  const [servers, setServers] = useState<ServerStats[]>([
    {
      id: 'x360',
      name: 'X360',
      type: 'host',
      status: 'online',
      metrics: [
        { label: 'CPU', value: 34 },
        { label: 'RAM', value: 62, displayValue: '19.8GB / 32GB' },
        { label: 'Storage', value: 45, displayValue: '1.2TB / 2TB' }
      ],
      extraMetrics: [
        { label: 'Core Temp', value: 42, displayValue: '42°C' },
        { label: 'Fan Speed', value: 30, displayValue: '1200 RPM' },
        { label: 'Power Draw', value: 15, displayValue: '125W' }
      ],
      networkActivity: {
        uploadRate: '1.2 Mb/s',
        downloadRate: '15.4 Mb/s',
        uploadHistory: generateMockHistory(20, 1.2, 0.5),
        downloadHistory: generateMockHistory(20, 15, 5),
        totalSent: '12.4 GB',
        totalReceived: '154.1 GB'
      }
    },
    {
      id: 'optiplex',
      name: 'OptiPlex',
      type: 'host',
      status: 'online',
      metrics: [
        { label: 'CPU', value: 12 },
        { label: 'RAM', value: 28, displayValue: '4.5GB / 16GB' },
        { label: 'Storage', value: 82, displayValue: '410GB / 500GB' }
      ],
      extraMetrics: [
        { label: 'Core Temp', value: 38, displayValue: '38°C' },
        { label: 'Uptime', value: 98, displayValue: '45 Days' },
        { label: 'Net IO', value: 5, displayValue: '1.2MB/s' }
      ],
      networkActivity: {
        uploadRate: '450 Kb/s',
        downloadRate: '1.1 Mb/s',
        uploadHistory: generateMockHistory(20, 0.4, 0.2),
        downloadHistory: generateMockHistory(20, 1.1, 0.4),
        totalSent: '1.1 GB',
        totalReceived: '5.6 GB'
      }
    },
    {
      id: 'proxmox',
      name: 'PVE Cluster',
      type: 'hypervisor',
      status: 'online',
      vmCount: 8,
      metrics: [
        { label: 'Cluster CPU', value: 24 },
        { label: 'Cluster RAM', value: 41, displayValue: '26GB / 64GB' },
        { label: 'Storage', value: 68, displayValue: '4.2TB / 6TB' }
      ],
      extraMetrics: [
        { label: 'ZFS Health', value: 100, displayValue: 'Healthy' },
        { label: 'IO Wait', value: 2, displayValue: '0.4ms' },
        { label: 'Node Load', value: 1.5, displayValue: '1.5/16' }
      ],
      networkActivity: {
        uploadRate: '5.6 Mb/s',
        downloadRate: '24.1 Mb/s',
        uploadHistory: generateMockHistory(20, 5, 2),
        downloadHistory: generateMockHistory(20, 24, 8),
        totalSent: '45.1 GB',
        totalReceived: '120.5 GB'
      }
    },
    {
      id: 'ubuntu-vm',
      name: 'Ubuntu Server VM',
      type: 'vm',
      status: 'online',
      metrics: [
        { label: 'CPU', value: 8 },
        { label: 'RAM', value: 40, displayValue: '1.6GB / 4GB' },
        { label: 'Storage', value: 55, displayValue: '22GB / 40GB' }
      ],
      extraMetrics: [
        { label: 'IP Address', value: 0, displayValue: '192.168.1.101' },
        { label: 'Kernel', value: 0, displayValue: '6.5.0-generic' },
        { label: 'Last Backup', value: 0, displayValue: '2h ago' }
      ],
      networkActivity: {
        uploadRate: '120 Kb/s',
        downloadRate: '840 Kb/s',
        uploadHistory: generateMockHistory(20, 0.1, 0.05),
        downloadHistory: generateMockHistory(20, 0.8, 0.3),
        totalSent: '512 MB',
        totalReceived: '2.4 GB'
      }
    },
    {
      id: 'kali-vm',
      name: 'Kali Linux VM',
      type: 'vm',
      status: 'warning',
      metrics: [
        { label: 'CPU', value: 89 },
        { label: 'RAM', value: 75, displayValue: '6GB / 8GB' },
        { label: 'Storage', value: 92, displayValue: '18GB / 20GB' }
      ],
      extraMetrics: [
        { label: 'IP Address', value: 0, displayValue: '192.168.1.105' },
        { label: 'Processes', value: 142, displayValue: '142 running' },
        { label: 'Session', value: 0, displayValue: 'Active Root' }
      ],
      networkActivity: {
        uploadRate: '8.4 Mb/s',
        downloadRate: '2.1 Mb/s',
        uploadHistory: generateMockHistory(20, 8, 4),
        downloadHistory: generateMockHistory(20, 2, 1),
        totalSent: '15.6 GB',
        totalReceived: '4.2 GB'
      }
    }
  ]);

  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    upload: '45.2 Mb/s',
    download: '942.8 Mb/s',
    latency: '14 ms',
    connectedDevices: 34,
    isp: 'Gigabit Fiber Corp',
    wanIp: '72.14.213.98',
    uploadHistory: generateMockHistory(20, 45, 10),
    downloadHistory: generateMockHistory(20, 940, 50)
  });

  const [piholeStats, setPiholeStats] = useState<PiHoleStats & { networkActivity: any }>({
    queries: 42109,
    blocked: 12450,
    percentage: 29.6,
    status: 'active',
    topBlocked: ['analytics.google.com', 'doubleclick.net', 'trackers.io'],
    networkActivity: {
      uploadRate: '12 Kb/s',
      downloadRate: '45 Kb/s',
      uploadHistory: generateMockHistory(20, 0.012, 0.005),
      downloadHistory: generateMockHistory(20, 0.045, 0.01)
    }
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '10:45:01', level: 'info', source: 'PVE-01', message: 'VM 101 backup completed successfully.' },
    { id: '2', timestamp: '10:42:33', level: 'warning', source: 'Kali-VM', message: 'CPU usage exceeded 85% for 5 minutes.' },
    { id: '3', timestamp: '10:30:12', level: 'error', source: 'Pi-Hole', message: 'API connection lost briefly; auto-reconnected.' },
    { id: '4', timestamp: '10:15:45', level: 'info', source: 'OptiPlex', message: 'UPS status: On line, Battery 100%' },
    { id: '5', timestamp: '09:55:20', level: 'info', source: 'Ubuntu-VM', message: 'System update available: 12 packages.' },
    { id: '6', timestamp: '09:40:11', level: 'warning', source: 'Storage', message: 'Disk array 2 parity check at 45%.' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setServers(prev => prev.map(s => {
        const nextUpValue = (parseFloat(s.networkActivity?.uploadRate || '0') || 1) + (Math.random() * 2 - 1);
        const nextDownValue = (parseFloat(s.networkActivity?.downloadRate || '0') || 5) + (Math.random() * 4 - 2);

        return {
          ...s,
          metrics: s.metrics.map(m => ({
            ...m,
            value: m.label === 'Storage' ? m.value : Math.max(5, Math.min(95, m.value + (Math.random() * 4 - 2)))
          })),
          networkActivity: s.networkActivity ? {
            ...s.networkActivity,
            uploadRate: `${Math.max(0.1, nextUpValue).toFixed(1)} Mb/s`,
            downloadRate: `${Math.max(0.1, nextDownValue).toFixed(1)} Mb/s`,
            uploadHistory: [...s.networkActivity.uploadHistory.slice(1), nextUpValue],
            downloadHistory: [...s.networkActivity.downloadHistory.slice(1), nextDownValue],
          } : undefined
        };
      }));

      setPiholeStats(prev => {
        const nextUp = (parseFloat(prev.networkActivity.uploadRate) || 10) + (Math.random() * 2 - 1);
        const nextDown = (parseFloat(prev.networkActivity.downloadRate) || 40) + (Math.random() * 4 - 2);
        return {
          ...prev,
          networkActivity: {
            ...prev.networkActivity,
            uploadRate: `${Math.max(1, nextUp).toFixed(1)} Kb/s`,
            downloadRate: `${Math.max(1, nextDown).toFixed(1)} Kb/s`,
            uploadHistory: [...prev.networkActivity.uploadHistory.slice(1), nextUp],
            downloadHistory: [...prev.networkActivity.downloadHistory.slice(1), nextDown],
          }
        };
      });

      setNetworkStats(prev => {
        const nextUpload = Math.max(10, Math.min(100, (parseFloat(prev.upload) || 45) + (Math.random() * 10 - 5)));
        const nextDownload = Math.max(500, Math.min(1000, (parseFloat(prev.download) || 940) + (Math.random() * 40 - 20)));
        return {
          ...prev,
          upload: `${nextUpload.toFixed(1)} Mb/s`,
          download: `${nextDownload.toFixed(1)} Mb/s`,
          uploadHistory: [...prev.uploadHistory.slice(1), nextUpload],
          downloadHistory: [...prev.downloadHistory.slice(1), nextDownload]
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isLight = theme === 'light';

  const getHeadingText = () => {
    switch(currentView) {
      case 'dashboard': return 'Monitor';
      case 'storage': return 'Storage';
      case 'activity': return 'Activity';
      case 'settings': return 'Settings';
      default: return 'Overview';
    }
  };

  return (
    <div className={`flex min-h-screen relative transition-colors duration-500 ${isLight ? 'text-slate-900 selection:bg-[#b22222]/10' : 'text-slate-100 selection:bg-[#b22222]/30'}`}>
      <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=2000" 
          alt="Dark Green Foliage" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className={`absolute inset-0 transition-colors duration-700 mix-blend-multiply ${isLight ? 'bg-white/80' : 'bg-slate-950/40'}`} />
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-10" />
        <div className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-t ${isLight ? 'from-white via-white/40 to-white/90' : 'from-slate-950 via-slate-950/20 to-slate-950/60'}`} />
      </div>

      <Sidebar activeView={currentView} onViewChange={setCurrentView} theme={theme} />

      <main className="flex-1 p-8 relative z-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#b22222] to-[#801b1b] flex items-center justify-center border border-white/20 shadow-[0_0_25px_rgba(178,34,34,0.4)] transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_35px_rgba(178,34,34,0.6)]">
                <span className="text-white text-3xl font-black tracking-tighter drop-shadow-md select-none">RL</span>
                <div className="absolute inset-0.5 rounded-[10px] border border-white/10 pointer-events-none" />
              </div>
              <div className="absolute -inset-2 bg-[#b22222]/10 rounded-2xl blur-xl -z-10 animate-pulse" />
            </div>
            <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex flex-col">
              <h1 className={`text-3xl font-bold tracking-tight drop-shadow-lg transition-colors duration-500 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {getHeadingText()}
              </h1>
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-mono mt-0.5">
                Status: <span className="text-emerald-500 font-bold">Synchronized</span>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className={`px-4 py-2 backdrop-blur-md rounded-lg border text-xs font-mono transition-colors duration-500 ${isLight ? 'bg-white/60 border-slate-200' : 'bg-slate-950/60 border-white/10'}`}>
              <span className="text-[#b22222] font-bold mr-2">UPTIME:</span> 12d 4h 31m
            </div>
            <div className={`px-4 py-2 backdrop-blur-md rounded-lg border text-xs font-mono transition-colors duration-500 ${isLight ? 'bg-white/60 border-slate-200' : 'bg-slate-950/60 border-white/10'}`}>
              <span className="text-emerald-500 font-bold mr-2">SECURE</span>
            </div>
          </div>
        </header>

        {currentView === 'dashboard' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {servers.map((server, idx) => (
              <ServerCard key={server.id} server={server} theme={theme} delay={idx * 100} />
            ))}

            <PiHoleCard stats={piholeStats} theme={theme} delay={servers.length * 100} />
            <NetworkCard stats={networkStats} theme={theme} delay={(servers.length + 1) * 100} />
            <LogCard logs={logs} theme={theme} delay={(servers.length + 2) * 100} />
          </div>
        ) : currentView === 'storage' ? (
          <StorageView 
            servers={servers} 
            piHoleStorage={{ value: 12, displayValue: '2.4GB / 20GB' }}
            theme={theme}
          />
        ) : currentView === 'activity' ? (
          <ActivityView 
            servers={servers} 
            piHoleActivity={piholeStats.networkActivity}
            theme={theme}
          />
        ) : currentView === 'settings' ? (
          <SettingsView theme={theme} onThemeChange={setTheme} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-mono text-sm tracking-widest uppercase">Module In Development</p>
          </div>
        )}

        <footer className={`mt-12 text-[10px] font-mono flex justify-between items-center border-t border-white/5 pt-6 backdrop-blur-sm rounded-t-lg px-4 ${isLight ? 'text-slate-400 bg-white/40' : 'text-slate-500 bg-slate-950/20'}`}>
          <p>© 2024 RUSTLAB MONITORING SYSTEM V2.4</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> API CONNECTED
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-500" /> CLOUD SYNC ACTIVE
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
