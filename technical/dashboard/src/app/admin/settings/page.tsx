'use client';

import React from 'react';
import { AdminGuard, AdminLayout, Panel } from '@/components/admin/AdminLayout';

export default function AdminSettingsPage() {
  return (
    <AdminGuard>
      <AdminLayout title="Threshold & Notification Configuration" description="Tune WQI bands, leak thresholds, and dispatch rules.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Water quality thresholds" subtitle="Warning and critical cutoffs">
            <div className="space-y-3">
              {[
                { label: 'WQI warning cutoff', value: '74' },
                { label: 'WQI critical cutoff', value: '62' },
                { label: 'Leak severity threshold', value: '12%' },
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
          <Panel title="Notification rules" subtitle="Push and SMS toggles">
            <div className="space-y-3">
              {[
                { label: 'Push alerts', value: 'Enabled' },
                { label: 'SMS escalation', value: 'Enabled' },
                { label: 'Critical siren', value: 'Active' },
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
