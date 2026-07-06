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

/**
 * Sensor Data Services
 */
export const sensorDataService = {
  // Get latest sensor readings for a node
  async getLatestReadings(nodeId: string): Promise<SensorReading | null> {
    try {
      const q = query(
        collection(db, 'sensor_readings'),
        where('nodeId', '==', nodeId),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      return snapshot.docs[0].data() as SensorReading;
    } catch (error) {
      console.error('Error fetching latest sensor readings:', error);
      return null;
    }
  },

  // Get historical sensor data
  async getHistoricalData(
    nodeId: string,
    startDate: Date,
    endDate: Date
  ): Promise<SensorReading[]> {
    try {
      const q = query(
        collection(db, 'sensor_readings'),
        where('nodeId', '==', nodeId),
        where('timestamp', '>=', startDate),
        where('timestamp', '<=', endDate),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as SensorReading);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }
  },

  // Subscribe to real-time sensor updates
  subscribeToReadings(nodeId: string, callback: (data: SensorReading) => void): Unsubscribe {
    const q = query(
      collection(db, 'sensor_readings'),
      where('nodeId', '==', nodeId),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        callback(snapshot.docs[0].data() as SensorReading);
      }
    });
  },
};

/**
 * WQI (Water Quality Index) Services
 */
export const wqiService = {
  // Get WQI for a specific node
  async getNodeWQI(nodeId: string): Promise<WQIData | null> {
    try {
      const docRef = doc(db, 'wqi_data', nodeId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as WQIData) : null;
    } catch (error) {
      console.error('Error fetching WQI data:', error);
      return null;
    }
  },

  // Get WQI for all nodes
  async getAllNodesWQI(): Promise<WQIData[]> {
    try {
      const snapshot = await getDocs(collection(db, 'wqi_data'));
      return snapshot.docs.map((doc) => doc.data() as WQIData);
    } catch (error) {
      console.error('Error fetching all WQI data:', error);
      return [];
    }
  },

  // Get global WQI
  async getGlobalWQI(): Promise<number> {
    try {
      const docRef = doc(db, 'system_stats', 'global_wqi');
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().value : 0;
    } catch (error) {
      console.error('Error fetching global WQI:', error);
      return 0;
    }
  },

  // Subscribe to real-time WQI updates
  subscribeToWQI(nodeId: string, callback: (data: WQIData) => void): Unsubscribe {
    const docRef = doc(db, 'wqi_data', nodeId);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as WQIData);
      }
    });
  },
};

/**
 * Alert Services
 */
export const alertService = {
  // Get all unacknowledged alerts
  async getUnacknowledgedAlerts(): Promise<Alert[]> {
    try {
      const q = query(
        collection(db, 'alerts'),
        where('acknowledged', '==', false),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as Alert);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      return [];
    }
  },

  // Get all alerts for a node
  async getNodeAlerts(nodeId: string): Promise<Alert[]> {
    try {
      const q = query(
        collection(db, 'alerts'),
        where('nodeId', '==', nodeId),
        orderBy('timestamp', 'desc'),
        limit(50)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as Alert);
    } catch (error) {
      console.error('Error fetching node alerts:', error);
      return [];
    }
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
    const q = query(
      collection(db, 'alerts'),
      where('acknowledged', '==', false),
      orderBy('timestamp', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const alerts = snapshot.docs.map((doc) => doc.data() as Alert);
      callback(alerts);
    });
  },
};

/**
 * Network Node Services
 */
export const networkService = {
  // Get all network nodes
  async getAllNodes(): Promise<NetworkNode[]> {
    try {
      const snapshot = await getDocs(collection(db, 'network_nodes'));
      return snapshot.docs.map((doc) => doc.data() as NetworkNode);
    } catch (error) {
      console.error('Error fetching network nodes:', error);
      return [];
    }
  },

  // Get a specific node
  async getNode(nodeId: string): Promise<NetworkNode | null> {
    try {
      const docRef = doc(db, 'network_nodes', nodeId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as NetworkNode) : null;
    } catch (error) {
      console.error('Error fetching node:', error);
      return null;
    }
  },

  // Get nodes in a zone
  async getNodesByZone(zone: string): Promise<NetworkNode[]> {
    try {
      const q = query(collection(db, 'network_nodes'), where('zone', '==', zone));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as NetworkNode);
    } catch (error) {
      console.error('Error fetching zone nodes:', error);
      return [];
    }
  },

  // Subscribe to node updates
  subscribeToNodeUpdates(callback: (nodes: NetworkNode[]) => void): Unsubscribe {
    return onSnapshot(collection(db, 'network_nodes'), (snapshot) => {
      const nodes = snapshot.docs.map((doc) => doc.data() as NetworkNode);
      callback(nodes);
    });
  },
};

/**
 * Leak Detection Services
 */
export const leakDetectionService = {
  // Get active leak detections
  async getActiveLeaks(): Promise<LeakDetection[]> {
    try {
      const q = query(
        collection(db, 'leak_detections'),
        where('status', 'in', ['detected', 'investigating']),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as LeakDetection);
    } catch (error) {
      console.error('Error fetching leak detections:', error);
      return [];
    }
  },

  // Get all leaks in a zone
  async getZoneLeaks(zone: string): Promise<LeakDetection[]> {
    try {
      const q = query(
        collection(db, 'leak_detections'),
        where('zone', '==', zone),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as LeakDetection);
    } catch (error) {
      console.error('Error fetching zone leaks:', error);
      return [];
    }
  },
};

/**
 * Compliance Report Services
 */
export const complianceService = {
  // Get compliance reports
  async getReports(limit_param: number = 10): Promise<ComplianceReport[]> {
    try {
      const q = query(
        collection(db, 'compliance_reports'),
        orderBy('generatedAt', 'desc'),
        limit(limit_param)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as ComplianceReport);
    } catch (error) {
      console.error('Error fetching compliance reports:', error);
      return [];
    }
  },

  // Get report by period
  async getReportByPeriod(period: 'weekly' | 'monthly'): Promise<ComplianceReport | null> {
    try {
      const q = query(
        collection(db, 'compliance_reports'),
        where('period', '==', period),
        orderBy('generatedAt', 'desc'),
        limit(1)
      );
      const snapshot = await getDocs(q);
      return snapshot.empty ? null : (snapshot.docs[0].data() as ComplianceReport);
    } catch (error) {
      console.error('Error fetching compliance report:', error);
      return null;
    }
  },
};

/**
 * Usage History Services
 */
export const usageHistoryService = {
  // Get usage history
  async getHistory(days: number = 30): Promise<UsageHistory[]> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const q = query(
        collection(db, 'usage_history'),
        where('date', '>=', startDate),
        orderBy('date', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data() as UsageHistory);
    } catch (error) {
      console.error('Error fetching usage history:', error);
      return [];
    }
  },
};

/**
 * Dashboard Services - Aggregated data
 */
export const dashboardService = {
  // Get complete dashboard data
  async getDashboardData(): Promise<DashboardData | null> {
    try {
      const docRef = doc(db, 'system_stats', 'dashboard');
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as DashboardData) : null;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return null;
    }
  },

  // Subscribe to dashboard updates
  subscribeToDashboard(callback: (data: DashboardData) => void): Unsubscribe {
    const docRef = doc(db, 'system_stats', 'dashboard');
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as DashboardData);
      }
    });
  },
};