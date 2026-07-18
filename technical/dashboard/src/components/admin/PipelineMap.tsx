"use client"
import React from "react";

export default function PipelineMap() {
  const nodes = [
    { id: 1, x: 12, y: 70, status: 'ok', active: true },
    { id: 2, x: 42, y: 40, status: 'warn', active: true },
    { id: 3, x: 75, y: 20, status: 'crit', active: false },
  ];
  return (
    <div className="w-full h-64 bg-black/30 rounded-md p-2 relative glass">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
            {/* animated pulse ring */}
            {n.active && <circle r="6" className="pulse-ring" />}
            <circle r="3" className="pulse-core" fill={n.status === 'ok' ? '#34d399' : n.status === 'warn' ? '#f59e0b' : '#fb7185'} stroke="#0ff" strokeOpacity="0.4" />
            {/* occasional ripple marker */}
            {n.active && <circle r="2.5" className="ripple" stroke="#22d3ee33" strokeWidth="1" fill="none" />}
          </g>
        ))}
      </svg>
    </div>
  );
}
