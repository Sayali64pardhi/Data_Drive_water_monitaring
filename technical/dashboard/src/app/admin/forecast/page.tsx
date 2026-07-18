'use client';

import React from 'react';
import { AdminGuard, AdminLayout, Panel } from '@/components/admin/AdminLayout';

const forecastSeries = [
  { hour: 'Now', wqi: 83, band: 74 },
  { hour: '+1h', wqi: 81, band: 72 },
  { hour: '+2h', wqi: 79, band: 70 },
  { hour: '+3h', wqi: 78, band: 69 },
  { hour: '+4h', wqi: 76, band: 68 },
  { hour: '+5h', wqi: 74, band: 66 },
];

export default function AdminForecastPage() {
  return (
    <AdminGuard>
      <AdminLayout title="Forecasting Engine" description="6-hour-ahead WQI predictions with confidence bands.">
        <Panel title="Prediction window" subtitle="Confidence-aware trend forecasting">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <div className="flex h-64 items-end gap-3">
              {forecastSeries.map((point) => (
                <div key={point.hour} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-500 to-emerald-400" style={{ height: `${Math.max(24, point.wqi)}px` }} />
                  <div className="h-10 w-full rounded-b-2xl border border-cyan-400/20 bg-cyan-500/10" />
                  <p className="text-xs text-slate-400">{point.hour}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Node forecast - East Loop" subtitle="WQI forecast per node">
            <div className="space-y-3">
              {forecastSeries.map((point) => (
                <div key={point.hour} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{point.hour}</span>
                    <span className="text-sm text-cyan-200">{point.wqi} / {point.band} band</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Confidence summary" subtitle="Model reliability indicators">
            <div className="space-y-3">
              {[
                { label: 'Sensor drift', value: 'Low' },
                { label: 'Prediction confidence', value: '91%' },
                { label: 'Risk window', value: '2 hours' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{item.label}</span>
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
