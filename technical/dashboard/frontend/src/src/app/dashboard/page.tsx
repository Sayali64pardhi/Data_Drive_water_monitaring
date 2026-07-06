'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StatsCard, Alert, Tabs } from '@/components/ui';
import { TimeSeriesLineChart, TimeSeriesAreaChart } from '@/components/charts/TimeSeriesCharts';
import { WQIGauge, MultiGauge } from '@/components/charts/WQIGauge';
import { AlertList, AlertSummary } from '@/components/alerts/AlertCard';
import { useDashboardData, useAlerts, useNetworkNodes } from '@/hooks/useData';
import { useUIStore } from '@/stores';
import { Loading } from '@/components/ui';

// Sample data for charts
const generateChartData = () => {
  const data = [];
  for (let i = 24; i > 0; i--) {
    const hour = new Date();
    hour.setHours(hour.getHours() - i);
    data.push({
      time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      pH: (7 + Math.random() * 0.5).toFixed(2),
      turbidity: (2 + Math.random() * 0.5).toFixed(2),
      tds: (250 + Math.random() * 50).toFixed(0),
      do: (7 + Math.random() * 1).toFixed(2),
    });
  }
  return data;
};

const generateWQIData = () => {
  return [
    { time: '12:00 AM', WQI: 75, anomaly: false },
    { time: '02:00 AM', WQI: 74, anomaly: false },
    { time: '04:00 AM', WQI: 76, anomaly: false },
    { time: '06:00 AM', WQI: 72, anomaly: true },
    { time: '08:00 AM', WQI: 70, anomaly: false },
    { time: '10:00 AM', WQI: 68, anomaly: false },
    { time: '12:00 PM', WQI: 65, anomaly: true },
    { time: '02:00 PM', WQI: 66, anomaly: false },
    { time: '04:00 PM', WQI: 68, anomaly: false },
    { time: '06:00 PM', WQI: 70, anomaly: false },
  ];
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: dashboardData, loading: dashboardLoading } = useDashboardData();
  const { alerts, loading: alertsLoading, acknowledgeAlert } = useAlerts();
  const { nodes, loading: nodesLoading } = useNetworkNodes();

  if (dashboardLoading || alertsLoading || nodesLoading) {
    return (
      <Layout title="Dashboard - Water Quality Surveillance">
        <Loading />
      </Layout>
    );
  }

  const chartData = generateChartData();
  const wqiData = generateWQIData();

  // Calculate alert counts
  const criticalAlerts = alerts.filter((a) => a.type === 'critical').length;
  const warningAlerts = alerts.filter((a) => a.type === 'warning').length;
  const infoAlerts = alerts.filter((a) => a.type === 'info').length;

  return (
    <Layout title="Dashboard - Water Quality Surveillance">
      {/* Header Alert */}
      {criticalAlerts > 0 && (
        <div className="mb-6">
          <Alert
            type="error"
            title={`${criticalAlerts} Critical Alert${criticalAlerts > 1 ? 's' : ''}`}
            message="Immediate action required. Check the Active Alerts section for details."
          />
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Global Health"
          value={dashboardData?.globalHealth || 92}
          unit="%"
          color="success"
          trend="stable"
          icon="💧"
        />
        <StatsCard
          title="Active Alerts"
          value={dashboardData?.activeAlerts || alerts.length}
          color={dashboardData?.activeAlerts || alerts.length > 0 ? 'warning' : 'success'}
          trend={dashboardData?.activeAlerts ? 'up' : 'stable'}
          icon="🚨"
        />
        <StatsCard
          title="Critical Issues"
          value={dashboardData?.criticalAlerts || criticalAlerts}
          color={dashboardData?.criticalAlerts ? 'danger' : 'success'}
          icon="⚠️"
        />
        <StatsCard
          title="Leaks Detected"
          value={dashboardData?.leaksDetected || 0}
          color="danger"
          icon="💧"
        />
      </div>

      {/* Alert Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Alert Summary</h2>
        <AlertSummary
          critical={criticalAlerts}
          warning={warningAlerts}
          info={infoAlerts}
          total={alerts.length}
        />
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <Tabs
          tabs={[
            { label: 'Overview', value: 'overview' },
            { label: 'Parameters', value: 'parameters' },
            { label: 'Predictions', value: 'predictions' },
            { label: 'Active Alerts', value: 'alerts' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* WQI Overview */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Water Quality Index - All Zones</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {nodes.slice(0, 4).map((node) => (
                    <div
                      key={node.id}
                      className="bg-gray-900 rounded-lg p-4 border border-gray-700"
                    >
                      <h4 className="font-semibold text-white mb-2">{node.name}</h4>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-bold text-primary">{node.wqi}</div>
                          <p className="text-xs text-gray-400 mt-1">
                            Status: <span className="capitalize">{node.status}</span>
                          </p>
                        </div>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            node.wqi > 70
                              ? 'bg-green-600'
                              : node.wqi > 40
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                          }`}
                        >
                          {Math.round((node.wqi / 100) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WQI Trend */}
              <div>
                <TimeSeriesAreaChart
                  data={wqiData}
                  areaKey="WQI"
                  title="WQI Trend (Last 24 Hours)"
                  height={300}
                  areaColor="#16A085"
                  yLabel="WQI Value"
                />
              </div>

              {/* System Health */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Active Nodes</p>
                    <p className="text-2xl font-bold text-green-400 mt-2">
                      {nodes.filter((n) => n.status === 'active').length}/{nodes.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Maintenance</p>
                    <p className="text-2xl font-bold text-yellow-400 mt-2">
                      {nodes.filter((n) => n.status === 'maintenance').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Inactive</p>
                    <p className="text-2xl font-bold text-red-400 mt-2">
                      {nodes.filter((n) => n.status === 'inactive').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Last Updated</p>
                    <p className="text-sm font-semibold text-white mt-2">
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Parameters Tab */}
          {activeTab === 'parameters' && (
            <div className="space-y-8">
              <TimeSeriesLineChart
                data={chartData}
                lines={[
                  { key: 'pH', color: '#3498DB', name: 'pH Level' },
                  { key: 'tds', color: '#E74C3C', name: 'TDS (ppm)' },
                ]}
                title="Water Parameters - Last 24 Hours"
                height={350}
              />
              <TimeSeriesLineChart
                data={chartData}
                lines={[
                  { key: 'turbidity', color: '#F39C12', name: 'Turbidity (NTU)' },
                  { key: 'do', color: '#27AE60', name: 'Dissolved Oxygen (mg/L)' },
                ]}
                title="Water Quality Parameters - Last 24 Hours"
                height={350}
              />
            </div>
          )}

          {/* Predictions Tab */}
          {activeTab === 'predictions' && (
            <div className="space-y-8">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">6-Hour WQI Forecast</h3>
                <p className="text-gray-400 mb-4">
                  PLACEHOLDER: Data Science team ML model predictions for next 6 hours
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map((time, idx) => (
                    <div key={time} className="bg-gray-800 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-400 mb-2">{time}</p>
                      <p className="text-2xl font-bold text-primary">{72 + Math.random() * 5}</p>
                      <p className="text-xs text-gray-500 mt-2">Predicted</p>
                    </div>
                  ))}
                </div>
              </div>
              <Alert
                type="info"
                title="API Integration"
                message="When DS team provides ML forecast API, replace PLACEHOLDER data with actual API calls"
              />
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div>
              <AlertList
                alerts={alerts}
                onAcknowledge={(alertId) => acknowledgeAlert(alertId, 'user123')}
                maxHeight="600px"
              />
            </div>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
