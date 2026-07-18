// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'operator' | 'admin' | 'inspector';
  createdAt: Date;
}

// Sensor Data Types
export interface SensorReading {
  id: string;
  nodeId: string;
  timestamp: Date;
  pH: number;
  turbidity: number;
  tds: number;
  dissolvedOxygen: number;
  flowRate: number;
  pressure: number;
}

// WQI (Water Quality Index) Types
export interface WQIData {
  nodeId: string;
  value: number; // 0-100 scale
  status: 'good' | 'medium' | 'bad';
  timestamp: Date;
  parameters: {
    pH: number;
    turbidity: number;
    tds: number;
    dissolvedOxygen: number;
  };
}

// Network Node Types
export interface NetworkNode {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  wqi: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: Date;
  zone: string;
}

// Alert Types
export interface Alert {
  id: string;
  nodeId: string;
  nodeName: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  parameter: string;
  value: number;
  threshold: number;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

// Leak Detection Types
export interface LeakDetection {
  id: string;
  zone: string;
  confidence: number; // 0-100
  flowDeficit: number;
  pressureDifference: number;
  affectedNodes: string[];
  timestamp: Date;
  status: 'detected' | 'investigating' | 'resolved';
}

// Compliance Report Types
export interface ComplianceReport {
  id: string;
  period: 'weekly' | 'monthly';
  generatedAt: Date;
  whoExceedances: number;
  exceedanceDetails: Array<{
    nodeId: string;
    parameter: string;
    exceedanceCount: number;
    duration: string;
  }>;
  wqiTrend: number[];
  pdfUrl?: string;
}

// Usage History Types
export interface UsageHistory {
  id: string;
  date: Date;
  globalHealth: number;
  alertsActive: number;
  parameters: {
    avgPH: number;
    avgTurbidity: number;
    avgTDS: number;
    avgDO: number;
  };
}

// Dashboard Types
export interface DashboardData {
  globalHealth: number;
  activeAlerts: number;
  criticalAlerts: number;
  leaksDetected: number;
  nodes: NetworkNode[];
  recentAlerts: Alert[];
  leakDetections: LeakDetection[];
}
