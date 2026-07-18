'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { TimeSeriesLineChart, TimeSeriesAreaChart } from '@/components/charts/TimeSeriesCharts';
import { StatsCard } from '@/components/ui';

const generateUsageData = () => {
  const data = [];
  for (let i = 30; i > 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    const dayStr = day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    data.push({
      time: dayStr,
      alerts: Math.floor(Math.random() * 10) + 2,
      avgWQI: 60 + Math.random() * 30,
      systemUptime: 95 + Math.random() * 5,
      sensorCount: 12,
    });
  }
  return data;
};

export default function UsageHistoryPage() {
  const usageData = generateUsageData();

  // Calculate statistics
  const totalAlerts = usageData.reduce((sum, d) => sum + d.alerts, 0);
  const avgWQI = (usageData.reduce((sum, d) => sum + d.avgWQI, 0) / usageData.length).toFixed(1);
  const avgUptime = (usageData.reduce((sum, d) => sum + d.systemUptime, 0) / usageData.length).toFixed(1);

  return (
    <Layout title="Usage History - Water Quality Surveillance">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Usage History</h1>
          <p className="text-gray-400">System performance metrics and historical trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Alerts (30d)"
            value={totalAlerts}
            color="warning"
            icon="🚨"
          />
          <StatsCard
            title="Average WQI"
            value={avgWQI}
            unit="/100"
            color="primary"
            icon="💧"
          />
          <StatsCard
            title="System Uptime"
            value={avgUptime}
            unit="%"
            color="success"
            icon="✅"
          />
          <StatsCard
            title="Active Sensors"
            value="12"
            color="primary"
            icon="📡"
          />
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <TimeSeriesLineChart
            data={usageData}
            lines={[
              { key: 'alerts', color: '#E74C3C', name: 'Alerts' },
            ]}
            title="Alert Frequency (Last 30 Days)"
            height={300}
          />

          <TimeSeriesAreaChart
            data={usageData}
            areaKey="avgWQI"
            areaColor="#16A085"
            title="Average WQI Trend (Last 30 Days)"
            height={300}
            yLabel="WQI Value"
          />

          <TimeSeriesAreaChart
            data={usageData}
            areaKey="systemUptime"
            areaColor="#27AE60"
            title="System Uptime (Last 30 Days)"
            height={300}
            yLabel="Uptime %"
          />
        </div>

        {/* Detailed Stats */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Peak Alerts (Daily)</p>
              <p className="text-2xl font-bold text-red-400 mt-2">
                {Math.max(...usageData.map((d) => d.alerts))}
              </p>
              <p className="text-xs text-gray-500 mt-1">alerts per day</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Best WQI Reading</p>
              <p className="text-2xl font-bold text-green-400 mt-2">
                {Math.max(...usageData.map((d) => d.avgWQI)).toFixed(1)}
              </p>
              <p className="text-xs text-gray-500 mt-1">out of 100</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">System Reliability</p>
              <p className="text-2xl font-bold text-blue-400 mt-2">
                {avgUptime}%
              </p>
              <p className="text-xs text-gray-500 mt-1">average uptime</p>
            </div>
          </div>
        </div>

        {/* Data Details Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Daily Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-3 font-semibold text-gray-300">Date</th>
                  <th className="px-4 py-3 font-semibold text-gray-300">Alerts</th>
                  <th className="px-4 py-3 font-semibold text-gray-300">Avg WQI</th>
                  <th className="px-4 py-3 font-semibold text-gray-300">Uptime</th>
                  <th className="px-4 py-3 font-semibold text-gray-300">Active Sensors</th>
                </tr>
              </thead>
              <tbody>
                {usageData.slice(-7).reverse().map((data, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="px-4 py-3 text-white font-medium">{data.time}</td>
                    <td className="px-4 py-3 text-gray-300">{data.alerts}</td>
                    <td className="px-4 py-3 text-gray-300">{data.avgWQI.toFixed(1)}</td>
                    <td className="px-4 py-3 text-gray-300">{data.systemUptime.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-gray-300">{data.sensorCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
