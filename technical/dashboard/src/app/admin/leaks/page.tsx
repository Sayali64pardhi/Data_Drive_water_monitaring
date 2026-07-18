'use client';

import React from 'react';
import { AdminGuard, AdminLayout, Panel, PipelineMap } from '@/components/admin/AdminLayout';

const leakRows = [
  { site: 'North DMA', severity: 'Critical', loss: '18.4%', flow1: '18.2', flow2: '12.1', fault: 'Joint rupture' },
  { site: 'South DMA', severity: 'Warning', loss: '12.7%', flow1: '14.8', flow2: '11.9', fault: 'Valve drift' },
  { site: 'West Loop', severity: 'Watch', loss: '8.9%', flow1: '11.4', flow2: '10.8', fault: 'Sensor lag' },
];

export default function AdminLeaksPage() {
  return (
    <AdminGuard>
      <AdminLayout title="Leak Operations" description="Leak severity, flow loss, and zone intelligence in one view.">
        <Panel title="Flow loss overview" subtitle="Flow level comparisons per site">
          <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Flow loss curve</h3>
                <span className="rounded-full border border-rose-400/20 bg-rose-500/10 px-3 py-1 text-xs text-rose-200">Active</span>
              </div>
              <div className="flex h-52 items-end gap-3">
                {[55, 72, 64, 81, 58, 76].map((height, idx) => (
                  <div key={idx} className="flex-1 rounded-t-2xl bg-gradient-to-t from-cyan-500 to-emerald-400" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <h3 className="text-sm font-semibold text-white">Fault type breakdown</h3>
              <div className="mt-4 space-y-3">
                {['Pressure imbalance', 'Valve drift', 'Sensor anomaly'].map((label, idx) => (
                  <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">{label}</span>
                      <span className="text-sm text-cyan-200">{[42, 31, 27][idx]}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Panel title="Leak severity table" subtitle="Performance prioritization across DMA zones">
            <div className="overflow-hidden rounded-2xl border border-slate-800">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-900/80 text-slate-300">
                  <tr>
                    <th className="px-3 py-3">Site</th>
                    <th className="px-3 py-3">Severity</th>
                    <th className="px-3 py-3">Loss</th>
                    <th className="px-3 py-3">Flow 1/2</th>
                    <th className="px-3 py-3">Fault</th>
                  </tr>
                </thead>
                <tbody>
                  {leakRows.map((row) => (
                    <tr key={row.site} className="border-t border-slate-800 bg-slate-950/60 text-slate-200">
                      <td className="px-3 py-3">{row.site}</td>
                      <td className="px-3 py-3">{row.severity}</td>
                      <td className="px-3 py-3">{row.loss}</td>
                      <td className="px-3 py-3">{row.flow1}/{row.flow2}</td>
                      <td className="px-3 py-3">{row.fault}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Leak-zone map" subtitle="Overlayed flags for high-risk areas">
            <PipelineMap />
          </Panel>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
