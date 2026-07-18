'use client';

import React from 'react';
import { AdminGuard, AdminLayout, Panel } from '@/components/admin/AdminLayout';

const deviceRows = [
  { site: 'North DMA', status: 'Online', rssi: '-49 dBm', uptime: '184h', alert: 'No alerts' },
  { site: 'East Loop', status: 'Offline', rssi: '-74 dBm', uptime: '88h', alert: 'Reconnect' },
  { site: 'West Loop', status: 'Degraded', rssi: '-62 dBm', uptime: '142h', alert: 'Check antenna' },
];

export default function AdminDevicesPage() {
  return (
    <AdminGuard>
      <AdminLayout title="Device Health Matrix" description="Device status, signal quality, uptime, and offline alerts.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Online', value: '11', detail: 'Across 14 sites' },
            { label: 'Degraded', value: '2', detail: 'Need attention' },
            { label: 'Offline', value: '1', detail: 'Critical outage' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-1 text-sm text-cyan-200">{item.detail}</p>
            </div>
          ))}
        </div>

        <Panel title="Health grid" subtitle="Sensor and device performance status">
          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="px-3 py-3">Site</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Wi-Fi RSSI</th>
                  <th className="px-3 py-3">Uptime</th>
                  <th className="px-3 py-3">Alert</th>
                </tr>
              </thead>
              <tbody>
                {deviceRows.map((row) => (
                  <tr key={row.site} className="border-t border-slate-800 bg-slate-950/60 text-slate-200">
                    <td className="px-3 py-3">{row.site}</td>
                    <td className="px-3 py-3">{row.status}</td>
                    <td className="px-3 py-3">{row.rssi}</td>
                    <td className="px-3 py-3">{row.uptime}</td>
                    <td className="px-3 py-3">{row.alert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </AdminLayout>
    </AdminGuard>
  );
}
