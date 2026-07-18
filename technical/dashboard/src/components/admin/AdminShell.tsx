"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WaterWaveBackground from "./WaterWaveBackground";
import { useAuth } from '@/hooks/useAuth';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#05060a] text-cyan-200">
      <WaterWaveBackground />
      <nav className="p-4 flex items-center justify-between border-b border-cyan-800/20">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-cyan-400">Control Room</div>
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/admin/dashboard" className="px-3 py-2 rounded bg-cyan-800/20 hover:bg-cyan-800/30">Dashboard</Link>
          <Link href="/admin/leaks" className="px-3 py-2 rounded">Leaks</Link>
          <Link href="/admin/forecast" className="px-3 py-2 rounded">Forecast</Link>
          <Link href="/admin/devices" className="px-3 py-2 rounded">Devices</Link>
          <Link href="/admin/users" className="px-3 py-2 rounded">Users</Link>
          <Link href="/admin/settings" className="px-3 py-2 rounded">Settings</Link>
          <button onClick={async () => { await logout(); router.push('/login'); }} className="px-3 py-2 rounded bg-red-600/20">Sign out</button>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
