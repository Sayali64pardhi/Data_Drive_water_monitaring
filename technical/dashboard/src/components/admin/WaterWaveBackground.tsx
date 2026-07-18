"use client"
import React from "react";

export default function WaterWaveBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg className="w-full h-full opacity-30" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#001219" d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,176C672,160,768,128,864,101.3C960,75,1056,53,1152,64C1248,75,1344,117,1392,138.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>
      <div className="wave-overlay pointer-events-none absolute inset-0" />
    </div>
  );
}
