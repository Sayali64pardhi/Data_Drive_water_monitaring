"use client"
import React from "react";

export default function WaterTank({ percent = 50 }: { percent?: number }) {
  const safe = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-28 h-56 bg-black/30 border border-cyan-700 rounded-md p-2 relative glass">
      <div className="absolute inset-x-2 bottom-4 top-4 flex items-end overflow-hidden">
        <div className="w-full bg-gradient-to-t from-blue-900 to-blue-400 rounded-b-md overflow-hidden" style={{ height: `${safe}%`, transition: 'height 1s ease' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ animation: 'rise 4s linear infinite' }} className="absolute left-3 bottom-6 h-2 w-2 rounded-full bg-white/20" />
            <div style={{ animation: 'rise 5s linear infinite' }} className="absolute left-8 bottom-12 h-1.5 w-1.5 rounded-full bg-white/10" />
            <div style={{ animation: 'rise 6s linear infinite' }} className="absolute left-12 bottom-4 h-1 w-1 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
      <div className="absolute left-2 right-2 top-2 text-center text-xs text-cyan-100">{safe}%</div>
    </div>
  );
}
