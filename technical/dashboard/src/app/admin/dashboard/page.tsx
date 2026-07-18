'use client';

import React from 'react';
import { AdminGuard, AdminLayout, MetricCard, Panel, WaveBackdrop, WaterTank, RippleBadge, WQIGauge, PipelineMap, PredictionCard } from '@/components/admin/AdminLayout';
import { Siren, Cpu, ArrowRight, Zap } from 'lucide-react';

const overviewStats = [
  { label: 'Avg WQI', value: '84.6', detail: 'Across 14 DMA zones', tone: 'cyan' as const },
  { label: 'Active Leaks', value: '7', detail: '2 critical / 5 warning', tone: 'amber' as const },
  { label: 'Offline Devices', value: '3', detail: '2 in East DMA', tone: 'rose' as const },
  { label: 'Tank Fill', value: '76%', detail: 'Reservoir pressure stable', tone: 'emerald' as const },
];

const predictionSlots = [
  { hour: 'Now', value: 84, level: 76 },
  { hour: '+2h', value: 82, level: 74 },
  { hour: '+4h', value: 79, level: 72 },
  { hour: '+6h', value: 77, level: 70 },
];

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminLayout title="Control Room Command Center" description="Unified view of water quality, leaks, devices, and field operations.">
        <Panel title="Critical operations" subtitle="Priority events demanding immediate attention" className="relative overflow-hidden">
          <WaveBackdrop />
          <div className="relative grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 p-5">
              <div className="flex items-center gap-3 text-rose-100">
                <Siren className="h-6 w-6" />
                <div>
                  <p className="text-lg font-semibold">North DMA leak cascade detected</p>
                  <p className="text-sm text-rose-200">Pressure drop of 18% and WQI has slipped below the warning band.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Telemetry sync</p>
                  <p className="text-2xl font-semibold text-white">94.2%</p>
                </div>
                <RippleBadge />
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid gap-4 lg:grid-cols-4">
          {overviewStats.map((stat) => (
            <MetricCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel title="Live water health" subtitle="Circular WQI gauge with real-time trend" className="overflow-hidden">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <WQIGauge value={84} />
              <div className="flex-1 space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Current node state</p>
                      <p className="text-xl font-semibold text-white">Node 4 • East Loop</p>
                    </div>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">Stable</span>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                    <div className="flex items-center gap-2 text-cyan-100">
                      <Cpu className="h-4 w-4" />
                      <span className="text-sm">Model confidence</span>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">91%</p>
                  </div>
                  <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
                    <div className="flex items-center gap-2 text-amber-100">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm">Load spike</span>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">+11%</p>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Reservoir capacity" subtitle="3D tank fill simulation">
            <div className="flex items-center justify-center">
              <WaterTank level={76} />
            </div>
          </Panel>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Panel title="Interactive pipeline map" subtitle="Glowing nodes and active pulses">
            <PipelineMap />
          </Panel>
          <Panel title="Next 6 Hours" subtitle="WQI and tank level prediction cards">
            <div className="grid gap-3 md:grid-cols-2">
              {predictionSlots.map((slot) => (
                <PredictionCard key={slot.hour} {...slot} />
              ))}
            </div>
            <button className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100">
              View forecasting board <ArrowRight className="h-4 w-4" />
            </button>
          </Panel>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
