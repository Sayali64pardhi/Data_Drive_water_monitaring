'use client';

import { useEffect, useState, useCallback } from 'react';
import { dashboardService, alertService, wqiService, networkService, leakDetectionService } from '@/services/firebase';
import type { DashboardData, Alert, WQIData, NetworkNode, LeakDetection } from '@/types';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = dashboardService.subscribeToDashboard((dashboardData) => {
      setData(dashboardData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { data, loading, error };
};

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = alertService.subscribeToAlerts((alertList) => {
      setAlerts(alertList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const acknowledgeAlert = useCallback(
    async (alertId: string, userId: string) => {
      await alertService.acknowledgeAlert(alertId, userId);
    },
    []
  );

  return { alerts, loading, error, acknowledgeAlert };
};

export const useNodeWQI = (nodeId: string) => {
  const [wqi, setWqi] = useState<WQIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = wqiService.subscribeToWQI(nodeId, (wqiData) => {
      setWqi(wqiData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [nodeId]);

  return { wqi, loading, error };
};

export const useNetworkNodes = () => {
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = networkService.subscribeToNodeUpdates((nodeList) => {
      setNodes(nodeList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { nodes, loading, error };
};

export const useLeakDetections = () => {
  const [leaks, setLeaks] = useState<LeakDetection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaks = async () => {
      try {
        const leakList = await leakDetectionService.getActiveLeaks();
        setLeaks(leakList);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaks();
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchLeaks, 30000);

    return () => clearInterval(interval);
  }, []);

  return { leaks, loading, error };
};
