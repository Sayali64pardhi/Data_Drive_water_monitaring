'use client';

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  time: string;
  [key: string]: string | number;
}

interface LineChartProps {
  data: ChartData[];
  lines: Array<{
    key: string;
    color: string;
    name: string;
  }>;
  title?: string;
  height?: number;
}

export const TimeSeriesLineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  title,
  height = 300,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #444',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              dot={false}
              name={line.name}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

interface AreaChartProps {
  data: ChartData[];
  areaKey: string;
  areaColor?: string;
  title?: string;
  height?: number;
  yLabel?: string;
}

export const TimeSeriesAreaChart: React.FC<AreaChartProps> = ({
  data,
  areaKey,
  areaColor = '#16A085',
  title,
  height = 300,
  yLabel,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={areaColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={areaColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#999" />
          <YAxis stroke="#999" label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #444',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Area
            type="monotone"
            dataKey={areaKey}
            stroke={areaColor}
            fillOpacity={1}
            fill="url(#colorArea)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface BarChartProps {
  data: ChartData[];
  bars: Array<{
    key: string;
    color: string;
    name: string;
  }>;
  title?: string;
  height?: number;
  xLabel?: string;
  yLabel?: string;
}

export const ParameterBarChart: React.FC<BarChartProps> = ({
  data,
  bars,
  title,
  height = 300,
  xLabel,
  yLabel,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#999" label={{ value: xLabel, position: 'insideBottom', offset: -5 }} />
          <YAxis stroke="#999" label={{ value: yLabel, angle: -90, position: 'insideLeft' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #444',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Legend />
          {bars.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              fill={bar.color}
              name={bar.name}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
