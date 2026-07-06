'use client';

import React from 'react';

interface WQIGaugeProps {
  value: number; // 0-100
  status?: 'good' | 'medium' | 'bad';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const WQIGauge: React.FC<WQIGaugeProps> = ({
  value,
  status = value > 70 ? 'good' : value > 40 ? 'medium' : 'bad',
  label = 'Water Quality Index',
  size = 'md',
}) => {
  const sizeConfig = {
    sm: { width: 100, height: 100, cx: 50, cy: 60, r: 40, textSize: '28px' },
    md: { width: 150, height: 150, cx: 75, cy: 90, r: 60, textSize: '36px' },
    lg: { width: 200, height: 200, cx: 100, cy: 120, r: 80, textSize: '48px' },
  };

  const config = sizeConfig[size];
  const clampedValue = Math.min(100, Math.max(0, value));
  const angle = (clampedValue / 100) * 180 - 90; // Convert to SVG angle

  const statusColors = {
    good: '#27AE60',
    medium: '#F39C12',
    bad: '#E74C3C',
  };

  // Calculate needle position
  const needleLength = config.r * 0.8;
  const needleX = config.cx + needleLength * Math.cos((angle * Math.PI) / 180);
  const needleY = config.cy + needleLength * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg">
      <h3 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-4 text-center">
        {label}
      </h3>
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="drop-shadow-lg"
      >
        {/* Background arc */}
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E74C3C" />
            <stop offset="50%" stopColor="#F39C12" />
            <stop offset="100%" stopColor="#27AE60" />
          </linearGradient>
        </defs>

        {/* Gauge background arc */}
        <path
          d={`M ${config.cx - config.r},${config.cy} A ${config.r},${config.r} 0 0,1 ${config.cx + config.r},${config.cy}`}
          fill="none"
          stroke="#333333"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Colored arc */}
        <path
          d={`M ${config.cx - config.r},${config.cy} A ${config.r},${config.r} 0 0,1 ${config.cx + config.r},${config.cy}`}
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${(clampedValue / 100) * Math.PI * config.r * 2} ${Math.PI * config.r * 2}`}
        />

        {/* Needle */}
        <line
          x1={config.cx}
          y1={config.cy}
          x2={needleX}
          y2={needleY}
          stroke={statusColors[status]}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Center circle */}
        <circle cx={config.cx} cy={config.cy} r="6" fill={statusColors[status]} />

        {/* Value text */}
        <text
          x={config.cx}
          y={config.cy + 15}
          textAnchor="middle"
          fontSize={config.textSize}
          fill="#ffffff"
          fontWeight="bold"
          fontFamily="system-ui"
        >
          {Math.round(clampedValue)}
        </text>

        {/* Percentage symbol */}
        <text
          x={config.cx + 25}
          y={config.cy - 5}
          textAnchor="middle"
          fontSize="14"
          fill="#999999"
          fontFamily="system-ui"
        >
          %
        </text>
      </svg>

      <div className="mt-3 md:mt-4 flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: statusColors[status] }}
        ></div>
        <span className="text-xs md:text-sm font-medium text-gray-300 capitalize">
          {status}
        </span>
      </div>
    </div>
  );
};

interface MultiGaugeProps {
  gauges: Array<{
    id: string;
    label: string;
    value: number;
  }>;
  size?: 'sm' | 'md';
}

export const MultiGauge: React.FC<MultiGaugeProps> = ({ gauges, size = 'sm' }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      {gauges.map((gauge) => (
        <WQIGauge
          key={gauge.id}
          value={gauge.value}
          label={gauge.label}
          size={size}
        />
      ))}
    </div>
  );
};
