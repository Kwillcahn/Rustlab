
export interface ResourceMetric {
  label: string;
  value: number; // 0 to 100
  suffix?: string;
  displayValue?: string;
}

export interface NetworkActivity {
  uploadRate: string;
  downloadRate: string;
  uploadHistory: number[];
  downloadHistory: number[];
  totalSent: string;
  totalReceived: string;
}

export interface ServerStats {
  id: string;
  name: string;
  type: 'host' | 'hypervisor' | 'vm';
  status: 'online' | 'offline' | 'warning';
  metrics: ResourceMetric[];
  extraMetrics?: ResourceMetric[];
  vmCount?: number;
  networkActivity?: NetworkActivity;
}

export interface NetworkStats {
  upload: string;
  download: string;
  latency: string;
  connectedDevices: number;
  isp?: string;
  wanIp?: string;
  uploadHistory: number[]; // Trend data for sparkline
  downloadHistory: number[]; // Trend data for sparkline
}

export interface PiHoleStats {
  queries: number;
  blocked: number;
  percentage: number;
  status: 'active' | 'inactive';
  topBlocked?: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  source: string;
  message: string;
}
