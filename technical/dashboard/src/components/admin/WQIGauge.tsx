"use client"
import React from "react";

export default function WQIGauge({ value = 70 }: { value?: number }) {
  const v = Math.max(0, Math.min(100, value));
  const angle = (v / 100) * 180 - 90; // -90..90
  return (
    <div className="w-40 h-24 flex items-end justify-center">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#00f" />
            <stop offset="100%" stopColor="#0ff" />
          </linearGradient>
        </defs>
        <path d="M10 90 A80 80 0 0 1 190 90" fill="none" stroke="#062" strokeWidth="10" strokeOpacity="0.15" />
        <path d="M10 90 A80 80 0 0 1 190 90" fill="none" stroke="url(#g1)" strokeWidth="8" strokeLinecap="round" strokeDasharray="0 1000" />
        <g transform={`translate(100,90) rotate(${angle})`}>
          <rect x="-2" y="-60" width="4" height="60" rx="2" fill="#0ff" />
        </g>
        <text x="100" y="85" fill="#9ff" fontSize="14" textAnchor="middle">WQI {v}</text>
      </svg>
    </div>
  );
}
