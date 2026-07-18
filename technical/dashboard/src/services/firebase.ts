// import type {
//   SensorReading,
//   WQIData,
//   Alert,
//   NetworkNode,
//   LeakDetection,
//   ComplianceReport,
//   UsageHistory,
//   DashboardData,
// } from '@/types';

// // Central Backend Base URL - Update this string to your actual backend domain/port
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// /**
//  * Helper utility to handle API fetching and response parsing safely
//  */
// async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...options?.headers,
//     },
//     ...options,
//   });

//   if (!response.ok) {
//     throw new Error(`API Error: ${response.status} ${response.statusText} at ${endpoint}`);
//   }

//   return response.json();
// }

// /**
//  * Sensor Data Services
//  */
// export const sensorDataService = {
//   // Get latest sensor readings for a node
//   async getLatestReadings(nodeId: string): Promise<SensorReading | null> {
//     try {
//       return await apiFetch<SensorReading>(`/sensors/latest/${nodeId}`);
//     } catch (error) {
//       console.error('Error fetching latest sensor readings:', error);
//       return null;
//     }
//   },

// async getHistoricalData(
//     nodeId: string,
//     startDate: Date,
//     endDate: Date
//   ): Promise<SensorReading[]> {
//     try {
//       const params = new URLSearchParams({
//         nodeId,
//         startDate: startDate.toISOString(),
//         endDate: endDate.toISOString(),
//       });
//       return await apiFetch<SensorReading[]>(`/sensors/history?${params}`);
//     } catch (error) {
//       console.error('Error fetching historical data:', error);
//       return [];
//     }
//   },

//   // Real-time alternate for APIs (Uses short-polling fallback since SSE/WebSockets are API-dependent)
//  subscribeToReadings(nodeId: string, callback: (data: SensorReading) => void) {
//     const interval = setInterval(async () => {
//       const data = await this.getLatestReadings(nodeId);
//       if (data) callback(data);
//     }, 5000); // Polls every 5 seconds

//     return () => clearInterval(interval); // Returns cleanup function
//   },
// };
// /**
//  * WQI (Water Quality Index) Services
//  */
// export const wqiService = {
//   // Get WQI for a specific node
//   async getNodeWQI(nodeId: string): Promise<WQIData | null> {
//     try {
//       return await apiFetch<WQIData>(`/wqi/node/${nodeId}`);
//     } catch (error) {
//       console.error('Error fetching WQI data:', error);
//       return null;
//     }
//   },

//   // Get WQI for all nodes
//   async getAllNodesWQI(): Promise<WQIData[]> {
//     try {
//       return await apiFetch<WQIData[]>('/wqi/nodes');
//     } catch (error) {
//       console.error('Error fetching all WQI data:', error);
//       return [];
//     }
//   },

//   // Get global WQI
//   async getGlobalWQI(): Promise<number> {
//     try {
//       const data = await apiFetch<{ value: number }>('/wqi/global');
//       return data.value;
//     } catch (error) {
//       console.error('Error fetching global WQI:', error);
//       return 0;
//     }
//   },

//   // Real-time alternate for WQI polling
//   subscribeToWQI(nodeId: string, callback: (data: WQIData) => void) {
//     const interval = setInterval(async () => {
//       const data = await this.getNodeWQI(nodeId);
//       if (data) callback(data);
//     }, 10000); // Polls every 10 seconds

//     return () => clearInterval(interval);
//   },
// };

// /**
//  * Alert Services
//  */
// export const alertService = {
//   // Get all unacknowledged alerts
//   async getUnacknowledgedAlerts(): Promise<Alert[]> {
//     try {
//       return await apiFetch<Alert[]>('/alerts/unacknowledged');
//     } catch (error) {
//       console.error('Error fetching alerts:', error);
//       return [];
//     }
//   },

//   // Get all alerts for a node
//   async getNodeAlerts(nodeId: string): Promise<Alert[]> {
//     try {
//       return await apiFetch<Alert[]>(`/alerts/node/${nodeId}?limit=50`);
//     } catch (error) {
//       console.error('Error fetching node alerts:', error);
//       return [];
//     }
//   },

//   // Acknowledge an alert
//   async acknowledgeAlert(alertId: string, userId: string): Promise<void> {
//     try {
//       await apiFetch(`/alerts/acknowledge/${alertId}`, {
//         method: 'POST',
//         body: JSON.stringify({ userId }),
//       });
//     } catch (error) {
//       console.error('Error acknowledging alert:', error);
//     }
//   },

//   // Real-time alternate for Alert polling
//   subscribeToAlerts(callback: (alerts: Alert[]) => void) {
//     const interval = setInterval(async () => {
//       const data = await this.getUnacknowledgedAlerts();
//       callback(data);
//     }, 5000);

//     return () => clearInterval(interval);
//   },
// };

// /**
//  * Network Node Services
//  */
// export const networkService = {
//   // Get all network nodes
//   async getAllNodes(): Promise<NetworkNode[]> {
//     try {
//       return await apiFetch<NetworkNode[]>('/network/nodes');
//     } catch (error) {
//       console.error('Error fetching network nodes:', error);
//       return [];
//     }
//   },

//   // Get a specific node
//   async getNode(nodeId: string): Promise<NetworkNode | null> {
//     try {
//       return await apiFetch<NetworkNode>(`/network/node/${nodeId}`);
//     } catch (error) {
//       console.error('Error fetching node:', error);
//       return null;
//     }
//   },

//   // Get nodes in a zone
//   async getNodesByZone(zone: string): Promise<NetworkNode[]> {
//     try {
//       return await apiFetch<NetworkNode[]>(`/network/zone/${zone}`);
//     } catch (error) {
//       console.error('Error fetching zone nodes:', error);
//       return [];
//     }
//   },

//   // Real-time alternate for network nodes updates
//   subscribeToNodeUpdates(callback: (nodes: NetworkNode[]) => void) {
//     const interval = setInterval(async () => {
//       const data = await this.getAllNodes();
//       callback(data);
//     }, 15000);

//     return () => clearInterval(interval);
//   },
// };

// /**
//  * Leak Detection Services
//  */
// export const leakDetectionService = {
//   // Get active leak detections
//   async getActiveLeaks(): Promise<LeakDetection[]> {
//     try {
//       return await apiFetch<LeakDetection[]>('/leaks/active');
//     } catch (error) {
//       console.error('Error fetching leak detections:', error);
//       return [];
//     }
//   },

//   // Get all leaks in a zone
//   async getZoneLeaks(zone: string): Promise<LeakDetection[]> {
//     try {
//       return await apiFetch<LeakDetection[]>(`/leaks/zone/${zone}`);
//     } catch (error) {
//       console.error('Error fetching zone leaks:', error);
//       return [];
//     }
//   },
// };

// /**
//  * Compliance Report Services
//  */
// export const complianceService = {
//   // Get compliance reports
//   async getReports(limit_param: number = 10): Promise<ComplianceReport[]> {
//     try {
//       return await apiFetch<ComplianceReport[]>(`/compliance/reports?limit=${limit_param}`);
//     } catch (error) {
//       console.error('Error fetching compliance reports:', error);
//       return [];
//     }
//   },

//   // Get report by period
//   async getReportByPeriod(period: 'weekly' | 'monthly'): Promise<ComplianceReport | null> {
//     try {
//       return await apiFetch<ComplianceReport>(`/compliance/reports/period/${period}`);
//     } catch (error) {
//       console.error('Error fetching compliance report:', error);
//       return null;
//     }
//   },
// };

// /**
//  * Usage History Services
//  */
// export const usageHistoryService = {
//   // Get usage history
//   async getHistory(days: number = 30): Promise<UsageHistory[]> {
//     try {
//       return await apiFetch<UsageHistory[]>(`/usage/history?days=${days}`);
//     } catch (error) {
//       console.error('Error fetching usage history:', error);
//       return [];
//     }
//   },
// };

// /**
//  * Dashboard Services - Aggregated data
//  */
// export const dashboardService = {
//   // Get complete dashboard data
//   async getDashboardData(): Promise<DashboardData | null> {
//     try {
//       return await apiFetch<DashboardData>('/dashboard/stats');
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       return null;
//     }
//   },

//   // Real-time alternate for aggregated dashboard data
//   subscribeToDashboard(callback: (data: DashboardData) => void) {
//     const interval = setInterval(async () => {
//       const data = await this.getDashboardData();
//       if (data) callback(data);
//     }, 10000);

//     return () => clearInterval(interval);
//   },
// };









import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  Unsubscribe,
  getDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type {
  SensorReading,
  WQIData,
  Alert,
  NetworkNode,
  LeakDetection,
  ComplianceReport,
  UsageHistory,
  DashboardData,
} from '@/types';

// ==========================================
// 1. Mock Data Fallbacks
// ==========================================

const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    nodeId: 'node-1',
    nodeName: 'Main Inlet (Zone A)',
    type: 'critical',
    parameter: 'pH',
    value: 5.2,
    threshold: 6.5,
    timestamp: new Date(),
    message: 'pH levels dropped significantly below standard limit',
    acknowledged: false,
  },
  {
    id: 'alert-2',
    nodeId: 'node-2',
    nodeName: 'Secondary Pump (Zone B)',
    type: 'warning',
    parameter: 'turbidity',
    value: 4.8,
    threshold: 5.0,
    timestamp: new Date(Date.now() - 3600000),
    message: 'Turbidity is approaching critical levels',
    acknowledged: false,
  },
  {
    id: 'alert-3',
    nodeId: 'node-3',
    nodeName: 'Reservoir C Output',
    type: 'info',
    parameter: 'pressure',
    value: 12.4,
    threshold: 10.0,
    timestamp: new Date(Date.now() - 7200000),
    message: 'Pressure variation detected',
    acknowledged: false,
  }
];

const mockNodes: NetworkNode[] = [
  {
    id: 'node-1',
    name: 'Main Inlet (Zone A)',
    latitude: 19.0760,
    longitude: 72.8777,
    wqi: 78,
    status: 'active',
    lastUpdate: new Date(),
    zone: 'Zone A',
  },
  {
    id: 'node-2',
    name: 'Secondary Pump (Zone B)',
    latitude: 19.1200,
    longitude: 72.9000,
    wqi: 65,
    status: 'active',
    lastUpdate: new Date(),
    zone: 'Zone B',
  },
  {
    id: 'node-3',
    name: 'Reservoir C Output',
    latitude: 19.0500,
    longitude: 72.8500,
    wqi: 82,
    status: 'active',
    lastUpdate: new Date(),
    zone: 'Zone C',
  },
  {
    id: 'node-4',
    name: 'Distribution Node D',
    latitude: 19.1500,
    longitude: 72.8200,
    wqi: 35,
    status: 'maintenance',
    lastUpdate: new Date(),
    zone: 'Zone D',
  }
];

const mockWqiData: Record<string, WQIData> = {
  'node-1': {
    nodeId: 'node-1',
    value: 78,
    status: 'good',
    timestamp: new Date(),
    parameters: { pH: 7.2, turbidity: 2.1, tds: 260, dissolvedOxygen: 7.5 }
  },
  'node-2': {
    nodeId: 'node-2',
    value: 65,
    status: 'medium',
    timestamp: new Date(),
    parameters: { pH: 6.8, turbidity: 3.2, tds: 310, dissolvedOxygen: 6.2 }
  },
  'node-3': {
    nodeId: 'node-3',
    value: 82,
    status: 'good',
    timestamp: new Date(),
    parameters: { pH: 7.4, turbidity: 1.5, tds: 210, dissolvedOxygen: 8.1 }
  },
  'node-4': {
    nodeId: 'node-4',
    value: 35,
    status: 'bad',
    timestamp: new Date(),
    parameters: { pH: 5.5, turbidity: 6.8, tds: 420, dissolvedOxygen: 3.4 }
  }
};

const mockLeaks: LeakDetection[] = [
  {
    id: 'leak-1',
    zone: 'Zone B',
    confidence: 88,
    flowDeficit: 15.2,
    pressureDifference: 2.4,
    affectedNodes: ['node-2'],
    timestamp: new Date(),
    status: 'detected',
  },
  {
    id: 'leak-2',
    zone: 'Zone D',
    confidence: 65,
    flowDeficit: 5.4,
    pressureDifference: 1.1,
    affectedNodes: ['node-4'],
    timestamp: new Date(Date.now() - 1800000),
    status: 'investigating',
  }
];

const mockDashboardData: DashboardData = {
  globalHealth: 88,
  activeAlerts: 3,
  criticalAlerts: 1,
  leaksDetected: 2,
  nodes: mockNodes,
  recentAlerts: mockAlerts,
  leakDetections: mockLeaks,
};

const mockSensorReadings: Record<string, SensorReading> = {
  'node-1': {
    id: 'reading-1',
    nodeId: 'node-1',
    timestamp: new Date(),
    pH: 7.2,
    turbidity: 2.1,
    tds: 260,
    dissolvedOxygen: 7.5,
    flowRate: 45.2,
    pressure: 15.6,
  },
  'node-2': {
    id: 'reading-2',
    nodeId: 'node-2',
    timestamp: new Date(),
    pH: 6.8,
    turbidity: 3.2,
    tds: 310,
    dissolvedOxygen: 6.2,
    flowRate: 38.4,
    pressure: 14.1,
  },
  'node-3': {
    id: 'reading-3',
    nodeId: 'node-3',
    timestamp: new Date(),
    pH: 7.4,
    turbidity: 1.5,
    tds: 210,
    dissolvedOxygen: 8.1,
    flowRate: 50.1,
    pressure: 16.2,
  },
  'node-4': {
    id: 'reading-4',
    nodeId: 'node-4',
    timestamp: new Date(),
    pH: 5.5,
    turbidity: 6.8,
    tds: 420,
    dissolvedOxygen: 3.4,
    flowRate: 12.5,
    pressure: 8.4,
  }
};

const mockComplianceReports: ComplianceReport[] = [
  {
    id: 'report-1',
    period: 'weekly',
    generatedAt: new Date(),
    whoExceedances: 2,
    exceedanceDetails: [
      {
        nodeId: 'node-1',
        parameter: 'pH',
        exceedanceCount: 1,
        duration: '2 hours',
      },
      {
        nodeId: 'node-2',
        parameter: 'turbidity',
        exceedanceCount: 1,
        duration: '1 hour',
      }
    ],
    wqiTrend: [75, 76, 78, 77, 75, 78, 79],
    pdfUrl: '/reports/weekly-1.pdf',
  },
  {
    id: 'report-2',
    period: 'monthly',
    generatedAt: new Date(Date.now() - 86400000 * 15),
    whoExceedances: 8,
    exceedanceDetails: [
      {
        nodeId: 'node-4',
        parameter: 'WQI',
        exceedanceCount: 5,
        duration: '12 hours',
      }
    ],
    wqiTrend: [72, 70, 74, 75, 68, 66, 68, 70, 72, 74, 73, 75, 78, 80],
    pdfUrl: '/reports/monthly-1.pdf',
  }
];

const mockUsageHistory: UsageHistory[] = Array.from({ length: 30 }).map((_, index) => {
  const date = new Date();
  date.setDate(date.getDate() - index);
  return {
    id: `usage-${index}`,
    date,
    globalHealth: Math.round(85 + Math.random() * 10),
    alertsActive: Math.floor(Math.random() * 4),
    parameters: {
      avgPH: parseFloat((7.0 + (Math.random() - 0.5) * 0.4).toFixed(2)),
      avgTurbidity: parseFloat((2.0 + (Math.random() - 0.5) * 0.8).toFixed(2)),
      avgTDS: Math.round(250 + (Math.random() - 0.5) * 40),
      avgDO: parseFloat((7.5 + (Math.random() - 0.5) * 0.6).toFixed(2)),
    }
  };
});

// ==========================================
// 2. Fallback Helpers
// ==========================================

async function withFallback<T>(
  promise: Promise<T>,
  fallbackValue: T,
  timeoutMs: number = 1500,
  contextName: string = 'Firebase'
): Promise<T> {
  let resolved = false;
  const timeoutPromise = new Promise<T>((resolve) => {
    setTimeout(() => {
      if (!resolved) {
        console.warn(`${contextName} fetch timed out, falling back to mock data.`);
        resolve(fallbackValue);
      }
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([
      promise.then((res) => {
        resolved = true;
        return res;
      }),
      timeoutPromise
    ]);
    if (result === null || result === undefined || (Array.isArray(result) && result.length === 0)) {
      console.warn(`${contextName} returned empty, using mock data.`);
      return fallbackValue;
    }
    return result;
  } catch (error) {
    console.error(`${contextName} fetch failed, falling back to mock data:`, error);
    return fallbackValue;
  }
}

function subscribeWithFallback<T>(
  subscribeFn: (onNext: (data: T) => void, onError: (err: Error) => void) => Unsubscribe,
  callback: (data: T) => void,
  fallbackValue: T,
  timeoutMs: number = 1500,
  contextName: string = 'Firebase'
): Unsubscribe {
  let active = true;
  let receivedSnapshot = false;

  const timeoutId = setTimeout(() => {
    if (active && !receivedSnapshot) {
      console.warn(`${contextName} subscription timed out, using mock data.`);
      callback(fallbackValue);
    }
  }, timeoutMs);

  let unsubscribe: Unsubscribe = () => {};
  try {
    unsubscribe = subscribeFn(
      (data) => {
        receivedSnapshot = true;
        clearTimeout(timeoutId);
        if (data === null || data === undefined || (Array.isArray(data) && data.length === 0)) {
          console.warn(`${contextName} subscription yielded empty/null data, using mock data.`);
          callback(fallbackValue);
        } else {
          callback(data);
        }
      },
      (error) => {
        console.error(`${contextName} subscription error, using mock data:`, error);
        clearTimeout(timeoutId);
        callback(fallbackValue);
      }
    );
  } catch (error) {
    console.error(`${contextName} subscription registration failed, using mock data:`, error);
    clearTimeout(timeoutId);
    callback(fallbackValue);
  }

  return () => {
    active = false;
    clearTimeout(timeoutId);
    if (unsubscribe) {
      try {
        unsubscribe();
      } catch (e) {
        console.error('Error during unsubscribe:', e);
      }
    }
  };
}

// ==========================================
// 3. Active Services with Fallbacks
// ==========================================

/**
 * Sensor Data Services
 */
export const sensorDataService = {
  // Get latest sensor readings for a node
  async getLatestReadings(nodeId: string): Promise<SensorReading | null> {
    const fetchPromise = (async () => {
      const q = query(
        collection(db, 'sensor_readings'),
        where('nodeId', '==', nodeId),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      return snapshot.docs[0].data() as SensorReading;
    })();

    return withFallback(
      fetchPromise,
      mockSensorReadings[nodeId] || mockSensorReadings['node-1'],
      1500,
      `sensorDataService.getLatestReadings(${nodeId})`
    );
  },

  // Get historical sensor data
  async getHistoricalData(
    nodeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<SensorReading[]> {
    const fetchPromise = (async () => {
      const q = query(
        collection(db, 'sensor_readings'),
        where('nodeId', '==', nodeId),
        where('timestamp', '>=', startDate),
        where('timestamp', '<=', endDate),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as SensorReading);
    })();

    const base = mockSensorReadings[nodeId] || mockSensorReadings['node-1'];
    const mockHistory: SensorReading[] = Array.from({ length: 24 }).map((_, i) => {
      const date = new Date();
      date.setHours(date.getHours() - i);
      return {
        ...base,
        id: `reading-hist-${i}`,
        timestamp: date,
        pH: parseFloat((base.pH + (Math.random() - 0.5) * 0.4).toFixed(2)),
        turbidity: parseFloat((base.turbidity + (Math.random() - 0.5) * 0.8).toFixed(2)),
        tds: Math.round(base.tds + (Math.random() - 0.5) * 30),
        dissolvedOxygen: parseFloat((base.dissolvedOxygen + (Math.random() - 0.5) * 0.6).toFixed(2)),
        flowRate: parseFloat((base.flowRate + (Math.random() - 0.5) * 5.0).toFixed(1)),
        pressure: parseFloat((base.pressure + (Math.random() - 0.5) * 2.0).toFixed(1)),
      };
    });

    return withFallback(
      fetchPromise,
      mockHistory,
      1500,
      `sensorDataService.getHistoricalData(${nodeId})`
    );
  },

  // Subscribe to real-time sensor updates
  subscribeToReadings(nodeId: string, callback: (data: SensorReading) => void): Unsubscribe {
    const subFn = (onNext: (data: SensorReading) => void, onError: (err: Error) => void) => {
      const q = query(
        collection(db, 'sensor_readings'),
        where('nodeId', '==', nodeId),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      return onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          onNext(snapshot.docs[0].data() as SensorReading);
        } else {
          onNext(null as any);
        }
      }, onError);
    };

    return subscribeWithFallback(
      subFn,
      callback,
      mockSensorReadings[nodeId] || mockSensorReadings['node-1'],
      1500,
      `sensorDataService.subscribeToReadings(${nodeId})`
    );
  },
};

/**
 * WQI (Water Quality Index) Services
 */
export const wqiService = {
  // Get WQI for a specific node
  async getNodeWQI(nodeId: string): Promise<WQIData | null> {
    const fetchPromise = (async () => {
      const docRef = doc(db, 'wqi_data', nodeId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as WQIData) : null;
    })();

    return withFallback(
      fetchPromise,
      mockWqiData[nodeId] || mockWqiData['node-1'],
      1500,
      `wqiService.getNodeWQI(${nodeId})`
    );
  },

  // Get WQI for all nodes
  async getAllNodesWQI(): Promise<WQIData[]> {
    const fetchPromise = (async () => {
      const snapshot = await getDocs(collection(db, 'wqi_data'));
      return snapshot.docs.map((doc) => doc.data() as WQIData);
    })();

    return withFallback(
      fetchPromise,
      Object.values(mockWqiData),
      1500,
      'wqiService.getAllNodesWQI'
    );
  },

  // Get global WQI
  async getGlobalWQI(): Promise<number> {
    const fetchPromise = (async () => {
      const docRef = doc(db, 'system_stats', 'global_wqi');
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().value : 0;
    })();

    return withFallback(
      fetchPromise,
      82,
      1500,
      'wqiService.getGlobalWQI'
    );
  },

  // Subscribe to real-time WQI updates
  subscribeToWQI(nodeId: string, callback: (data: WQIData) => void): Unsubscribe {
    const subFn = (onNext: (data: WQIData) => void, onError: (err: Error) => void) => {
      const docRef = doc(db, 'wqi_data', nodeId);
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          onNext(docSnap.data() as WQIData);
        } else {
          onNext(null as any);
        }
      }, onError);
    };

    return subscribeWithFallback(
      subFn,
      callback,
      mockWqiData[nodeId] || mockWqiData['node-1'],
      1500,
      `wqiService.subscribeToWQI(${nodeId})`
    );
  },
};

/**
 * Alert Services
 */
export const alertService = {
  // Get all unacknowledged alerts
  async getUnacknowledgedAlerts(): Promise<Alert[]> {
    const fetchPromise = (async () => {
      const q = query(
        collection(db, 'alerts'),
        where('acknowledged', '==', false),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as Alert);
    })();

    return withFallback(
      fetchPromise,
      mockAlerts,
      1500,
      'alertService.getUnacknowledgedAlerts'
    );
  },

  // Get all alerts for a node
  async getNodeAlerts(nodeId: string): Promise<Alert[]> {
    const fetchPromise = (async () => {
      const q = query(
        collection(db, 'alerts'),
        where('nodeId', '==', nodeId),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as Alert);
    })();

    return withFallback(
      fetchPromise,
      mockAlerts.filter((a) => a.nodeId === nodeId),
      1500,
      `alertService.getNodeAlerts(${nodeId})`
    );
  },

  // Acknowledge an alert
  async acknowledgeAlert(alertId: string, userId: string): Promise<void> {
    try {
      const alertRef = doc(db, 'alerts', alertId);
      await updateDoc(alertRef, {
        acknowledged: true,
        acknowledgedBy: userId,
        acknowledgedAt: new Date(),
      });
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  },

  // Subscribe to real-time alerts
  subscribeToAlerts(callback: (alerts: Alert[]) => void): Unsubscribe {
    const subFn = (onNext: (alerts: Alert[]) => void, onError: (err: Error) => void) => {
      const q = query(
        collection(db, 'alerts'),
        where('acknowledged', '==', false),
        orderBy('timestamp', 'desc')
      );
      return onSnapshot(q, (snapshot) => {
        const alerts = snapshot.docs.map((doc) => doc.data() as Alert);
        onNext(alerts);
      }, onError);
    };

    return subscribeWithFallback(
      subFn,
      callback,
      mockAlerts,
      1500,
      'alertService.subscribeToAlerts'
    );
  },
};

/**
 * Network Node Services
 */
export const networkService = {
  // Get all network nodes
  async getAllNodes(): Promise<NetworkNode[]> {
    const fetchPromise = (async () => {
      const snapshot = await getDocs(collection(db, 'network_nodes'));
      return snapshot.docs.map((doc) => doc.data() as NetworkNode);
    })();

    return withFallback(
      fetchPromise,
      mockNodes,
      1500,
      'networkService.getAllNodes'
    );
  },

  // Get a specific node
  async getNode(nodeId: string): Promise<NetworkNode | null> {
    const fetchPromise = (async () => {
      const docRef = doc(db, 'network_nodes', nodeId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as NetworkNode) : null;
    })();

    return withFallback(
      fetchPromise,
      mockNodes.find((n) => n.id === nodeId) || null,
      1500,
      `networkService.getNode(${nodeId})`
    );
  },

  // Get nodes in a zone
  async getNodesByZone(zone: string): Promise<NetworkNode[]> {
    const fetchPromise = (async () => {
      const q = query(collection(db, 'network_nodes'), where('zone', '==', zone));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as NetworkNode);
    })();

    return withFallback(
      fetchPromise,
      mockNodes.filter((n) => n.zone === zone),
      1500,
      `networkService.getNodesByZone(${zone})`
    );
  },

  // Subscribe to node updates
  subscribeToNodeUpdates(callback: (nodes: NetworkNode[]) => void): Unsubscribe {
    const subFn = (onNext: (nodes: NetworkNode[]) => void, onError: (err: Error) => void) => {
      return onSnapshot(collection(db, 'network_nodes'), (snapshot) => {
        const nodes = snapshot.docs.map((doc) => doc.data() as NetworkNode);
        onNext(nodes);
      }, onError);
    };

    return subscribeWithFallback(
      subFn,
      callback,
      mockNodes,
      1500,
      'networkService.subscribeToNodeUpdates'
    );
  },
};

/**
 * Leak Detection Services
 */
export const leakDetectionService = {
  // Get active leak detections
  async getActiveLeaks(): Promise<LeakDetection[]> {
    const fetchPromise = (async () => {
      const q = query(
        collection(db, 'leak_detections'),
        where('status', 'in', ['detected', 'investigating']),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as LeakDetection);
    })();

    return withFallback(
      fetchPromise,
      mockLeaks,
      1500,
      'leakDetectionService.getActiveLeaks'
    );
  },

  // Get all leaks in a zone
  async getZoneLeaks(zone: string): Promise<LeakDetection[]> {
    const fetchPromise = (async () => {
      const q = query(
        collection(db, 'leak_detections'),
        where('zone', '==', zone),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as LeakDetection);
    })();

    return withFallback(
      fetchPromise,
      mockLeaks.filter((l) => l.zone === zone),
      1500,
      `leakDetectionService.getZoneLeaks(${zone})`
    );
  },
};

/**
 * Compliance Report Services
 */
export const complianceService = {
  // Get compliance reports
  async getReports(limit_param: number = 10): Promise<ComplianceReport[]> {
    const fetchPromise = (async () => {
      const q = query(
        collection(db, 'compliance_reports'),
        orderBy('generatedAt', 'desc'),
        limit(limit_param)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as ComplianceReport);
    })();

    return withFallback(
      fetchPromise,
      mockComplianceReports,
      1500,
      'complianceService.getReports'
    );
  },

  // Get report by period
  async getReportByPeriod(period: 'weekly' | 'monthly'): Promise<ComplianceReport | null> {
    const fetchPromise = (async () => {
      const q = query(
        collection(db, 'compliance_reports'),
        where('period', '==', period),
        orderBy('generatedAt', 'desc'),
        limit(1)
      );
      const snapshot = await getDocs(q);
      return snapshot.empty ? null : (snapshot.docs[0].data() as ComplianceReport);
    })();

    return withFallback(
      fetchPromise,
      mockComplianceReports.find((r) => r.period === period) || null,
      1500,
      `complianceService.getReportByPeriod(${period})`
    );
  },
};

/**
 * Usage History Services
 */
export const usageHistoryService = {
  // Get usage history
  async getHistory(days: number = 30): Promise<UsageHistory[]> {
    const fetchPromise = (async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const q = query(
        collection(db, 'usage_history'),
        where('date', '>=', startDate),
        orderBy('date', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as UsageHistory);
    })();

    return withFallback(
      fetchPromise,
      mockUsageHistory.slice(0, days),
      1500,
      'usageHistoryService.getHistory'
    );
  },
};

/**
 * Dashboard Services - Aggregated data
 */
export const dashboardService = {
  // Get complete dashboard data
  async getDashboardData(): Promise<DashboardData | null> {
    const fetchPromise = (async () => {
      const docRef = doc(db, 'system_stats', 'dashboard');
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as DashboardData) : null;
    })();

    return withFallback(
      fetchPromise,
      mockDashboardData,
      1500,
      'dashboardService.getDashboardData'
    );
  },

  // Subscribe to dashboard updates
  subscribeToDashboard(callback: (data: DashboardData) => void): Unsubscribe {
    const subFn = (onNext: (data: DashboardData) => void, onError: (err: Error) => void) => {
      const docRef = doc(db, 'system_stats', 'dashboard');
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          onNext(docSnap.data() as DashboardData);
        } else {
          onNext(null as any);
        }
      }, onError);
    };

    return subscribeWithFallback(
      subFn,
      callback,
      mockDashboardData,
      1500,
      'dashboardService.subscribeToDashboard'
    );
  },
};