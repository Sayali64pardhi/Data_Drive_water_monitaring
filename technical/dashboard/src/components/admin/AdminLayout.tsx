"use client"
import React from "react";
import Link from "next/link";
import WaterWaveBackground from "./WaterWaveBackground";
import WaterTankRaw from "./WaterTank";
import WQIGaugeRaw from "./WQIGauge";
import PipelineMapRaw from "./PipelineMap";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function AdminLayout({ title, description, children }: { title?: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.06),_transparent_30%),linear-gradient(135deg,#03050a_0%,#07111f_60%)] text-cyan-100">
      <WaterWaveBackground />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <header className="mb-4 rounded-2xl p-4">
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          {description && <p className="text-sm text-cyan-300">{description}</p>}
        </header>
        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-cyan-400/10 bg-slate-900/60 p-4">
            <nav className="space-y-2">
              <Link href="/admin/dashboard" className="block px-3 py-2 rounded hover:bg-slate-800/60">Dashboard</Link>
              <Link href="/admin/leaks" className="block px-3 py-2 rounded hover:bg-slate-800/60">Leaks</Link>
              <Link href="/admin/forecast" className="block px-3 py-2 rounded hover:bg-slate-800/60">Forecast</Link>
              <Link href="/admin/devices" className="block px-3 py-2 rounded hover:bg-slate-800/60">Devices</Link>
              <Link href="/admin/users" className="block px-3 py-2 rounded hover:bg-slate-800/60">Users</Link>
              <Link href="/admin/settings" className="block px-3 py-2 rounded hover:bg-slate-800/60">Settings</Link>
            </nav>
          </aside>
          <main className="space-y-4">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function MetricCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {detail && <p className="mt-1 text-sm text-cyan-300">{detail}</p>}
    </div>
  );
}

export function Panel({ title, subtitle, children, className = "" }: { title?: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
      {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

export const WaveBackdrop = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
    <div className="water-wave absolute inset-x-0 bottom-0 h-32" />
    <div className="water-wave water-wave-delay absolute inset-x-0 bottom-0 h-24" />
  </div>
);

export const WaterTank = ({ level }: { level: number }) => <WaterTankRaw percent={level ?? 0} />;

export const RippleBadge = () => <div className="relative inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-10"/>Telemetry</div>;

export const WQIGauge = ({ value }: { value: number }) => <WQIGaugeRaw value={value ?? 0} />;

export const PipelineMap = () => <PipelineMapRaw />;

export const PredictionCard = ({ hour, value, level }: { hour: string; value: number; level: number }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
    <p className="text-sm text-slate-400">{hour}</p>
    <p className="mt-2 text-xl font-semibold text-white">WQI {value}</p>
    <p className="mt-1 text-sm text-cyan-300">Tank {level}%</p>
  </div>
);

export default AdminLayout;
