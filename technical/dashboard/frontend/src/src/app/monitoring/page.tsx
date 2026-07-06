'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { TimeSeriesLineChart, TimeSeriesAreaChart } from '@/components/charts/TimeSeriesCharts';
import { Tabs } from '@/components/ui';
import { useNetworkNodes } from '@/hooks/useData';
import { Loading, Alert } from '@/components/ui';

const generateNodeData = () => {
  const data = [];
  for (let i = 24; i > 0; i--) {
    const hour = new Date();
    hour.setHours(hour.getHours() - i);
    data.push({
      time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      pH: (7 + Math.random() * 0.5).toFixed(2),
      turbidity: (2 + Math.random() * 0.5).toFixed(2),
      tds: (250 + Math.random() * 50).toFixed(0),
      dissolvedOxygen: (7 + Math.random() * 1).toFixed(2),
      flowRate: (150 + Math.random() * 30).toFixed(1),
      pressure: (60 + Math.random() * 10).toFixed(1),
    });
  }
  return data;
};

export default function MonitoringPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [timeWindow, setTimeWindow] = useState('24h');
  const { nodes, loading } = useNetworkNodes();

  if (loading) {
    return (
      <Layout title="Sensor Monitoring - Water Quality Surveillance">
        <Loading />
      </Layout>
    );
  }

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) : nodes[0];
  const nodeData = generateNodeData();

  return (
    <Layout title="Sensor Monitoring - Water Quality Surveillance">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Sensor Monitoring</h1>
          <p className="text-gray-400">Real-time sensor data and historical trends</p>
        </div>

        {/* Node Selection */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Select Node</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedNode?.id === node.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                }`}
              >
                <p className="font-semibold text-sm">{node.name}</p>
                <p className="text-xs mt-1">{node.zone}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Time Window Selection */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Time Window</h2>
          <div className="flex gap-2">
            {['24h', '7d', '30d'].map((window) => (
              <button
                key={window}
                onClick={() => setTimeWindow(window)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  timeWindow === window
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {window === '24h' ? 'Last 24 Hours' : window === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Charts */}
        {selectedNode && (
          <div className="space-y-6">
            {/* Current Reading */}
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Current Reading - {selectedNode.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">pH</p>
                  <p className="text-2xl font-bold text-blue-400 mt-2">{(7 + Math.random() * 0.5).toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Turbidity (NTU)</p>
                  <p className="text-2xl font-bold text-yellow-400 mt-2">{(2 + Math.random() * 0.5).toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">TDS (ppm)</p>
                  <p className="text-2xl font-bold text-red-400 mt-2">{(250 + Math.random() * 50).toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">DO (mg/L)</p>
                  <p className="text-2xl font-bold text-green-400 mt-2">{(7 + Math.random() * 1).toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Flow (L/min)</p>
                  <p className="text-2xl font-bold text-purple-400 mt-2">{(150 + Math.random() * 30).toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Pressure (kPa)</p>
                  <p className="text-2xl font-bold text-cyan-400 mt-2">{(60 + Math.random() * 10).toFixed(1)}</p>
                </div>
              </div>
            </div>

            {/* Trend Charts */}
            <TimeSeriesLineChart
              data={nodeData}
              lines={[
                { key: 'pH', color: '#3498DB', name: 'pH' },
                { key: 'turbidity', color: '#F39C12', name: 'Turbidity (NTU)' },
              ]}
              title={`Water Chemistry - ${selectedNode.name}`}
              height={350}
            />

            <TimeSeriesLineChart
              data={nodeData}
              lines={[
                { key: 'tds', color: '#E74C3C', name: 'TDS (ppm)' },
                { key: 'dissolvedOxygen', color: '#27AE60', name: 'DO (mg/L)' },
              ]}
              title={`Water Quality Parameters - ${selectedNode.name}`}
              height={350}
            />

            <TimeSeriesAreaChart
              data={nodeData}
              areaKey="flowRate"
              areaColor="#9B59B6"
              title={`Flow Rate - ${selectedNode.name}`}
              height={300}
              yLabel="Flow Rate (L/min)"
            />

            <TimeSeriesAreaChart
              data={nodeData}
              areaKey="pressure"
              areaColor="#E67E22"
              title={`Pressure - ${selectedNode.name}`}
              height={300}
              yLabel="Pressure (kPa)"
            />
          </div>
        )}

        {/* API Integration Info */}
        <Alert
          type="info"
          title="Data Source"
          message="PLACEHOLDER: Sensor data is fetched from Firebase. When IoT team provides MQTT/API endpoints, replace Firebase calls with live sensor data streams."
        />
      </div>
    </Layout>
  );
}
