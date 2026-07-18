import { create } from 'zustand';
import type { User, Alert, DashboardData, WQIData, NetworkNode } from '@/types';

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null }),
}));

interface DashboardStore {
  dashboardData: DashboardData | null;
  selectedNode: NetworkNode | null;
  timeWindow: '24h' | '7d' | '30d';
  setDashboardData: (data: DashboardData) => void;
  setSelectedNode: (node: NetworkNode | null) => void;
  setTimeWindow: (window: '24h' | '7d' | '30d') => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardData: null,
  selectedNode: null,
  timeWindow: '24h',
  setDashboardData: (data) => set({ dashboardData: data }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  setTimeWindow: (window) => set({ timeWindow: window }),
}));

interface AlertStore {
  alerts: Alert[];
  unacknowledgedCount: number;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string) => void;
  setUnacknowledgedCount: (count: number) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  unacknowledgedCount: 0,
  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  acknowledgeAlert: (alertId) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === alertId ? { ...a, acknowledged: true, acknowledgedAt: new Date() } : a
      ),
    })),
  setUnacknowledgedCount: (count) => set({ unacknowledgedCount: count }),
}));

interface WQIStore {
  wqiData: Map<string, WQIData>;
  globalWQI: number;
  setWQIData: (nodeId: string, data: WQIData) => void;
  setGlobalWQI: (value: number) => void;
  getWQIData: (nodeId: string) => WQIData | undefined;
}

export const useWQIStore = create<WQIStore>((set, get) => ({
  wqiData: new Map(),
  globalWQI: 0,
  setWQIData: (nodeId, data) =>
    set((state) => {
      const newMap = new Map(state.wqiData);
      newMap.set(nodeId, data);
      return { wqiData: newMap };
    }),
  setGlobalWQI: (value) => set({ globalWQI: value }),
  getWQIData: (nodeId) => get().wqiData.get(nodeId),
}));

interface UIStore {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  theme: 'dark',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
}));
