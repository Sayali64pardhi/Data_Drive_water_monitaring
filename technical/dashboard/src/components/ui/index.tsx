'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, title, onClose }) => {
  const bgColors = {
    success: 'bg-green-900/20 border-green-700',
    error: 'bg-red-900/20 border-red-700',
    warning: 'bg-yellow-900/20 border-yellow-700',
    info: 'bg-blue-900/20 border-blue-700',
  };

  const textColors = {
    success: 'text-green-200',
    error: 'text-red-200',
    warning: 'text-yellow-200',
    info: 'text-blue-200',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  return (
    <div className={`border rounded-lg p-4 ${bgColors[type]}`}>
      <div className="flex items-start gap-3">
        <div className={`${textColors[type]} flex-shrink-0 mt-0.5`}>{icons[type]}</div>
        <div className="flex-1">
          {title && <h3 className={`font-semibold ${textColors[type]}`}>{title}</h3>}
          <p className={`text-sm ${textColors[type]}`}>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className={`${textColors[type]} hover:opacity-75 flex-shrink-0`}>
            ×
          </button>
        )}
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: '#06b6d4',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  const accent = colorClasses[color] || colorClasses.primary;

  return (
    <div
      className="kpi-card relative overflow-hidden rounded-[20px] p-5 transition duration-300 ease-out transform cursor-pointer hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_30px_90px_rgba(8,18,42,0.28)]"
      style={{
        background: 'linear-gradient(180deg, rgba(6, 12, 31, 0.92) 0%, rgba(10, 20, 42, 0.92) 55%, rgba(7, 14, 32, 0.98) 100%)',
        border: '1px solid rgba(148, 163, 184, 0.14)',
        backdropFilter: 'blur(22px) saturate(120%)',
        color: '#e2e8f0',
        boxShadow: '0 20px 48px rgba(8, 18, 42, 0.20)',
      }}
    >
      <div className="kpi-wave" />
      <span className="kpi-shine absolute inset-y-0 left-0 w-20 bg-white/10 opacity-0 pointer-events-none" />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div style={{ width: 12, height: 12, borderRadius: 6, background: accent }} />
            <p className="text-sm font-medium text-slate-200">{title}</p>
          </div>

          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-2xl font-bold text-white">{value}</span>
            {unit && <span className="text-sm text-slate-400">{unit}</span>}
          </div>

          {trend && (
            <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
              <span className="font-medium">{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>
              {trendValue !== undefined && <span>{trendValue}%</span>}
            </div>
          )}
        </div>

        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'rgba(148, 163, 184, 0.14)' }}>
            <div style={{ color: accent }}>{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
};

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'primary';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', size = 'md' }) => {
  const variantClasses = {
    success: 'bg-green-900 text-green-200',
    warning: 'bg-yellow-900 text-yellow-200',
    danger: 'bg-red-900 text-red-200',
    info: 'bg-blue-900 text-blue-200',
    primary: 'bg-purple-900 text-purple-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`inline-block rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {label}
    </span>
  );
};

interface LoadingProps {
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-400">Loading data...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-12">{content}</div>;
};

interface TabsProps {
  tabs: Array<{ label: string; value: string }>;
  activeTab: string;
  onChange: (tab: string) => void;
  variant?: 'default' | 'underline';
}

export const Tabs: React.FC<TabsProps & { children: React.ReactNode }> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  children,
}) => {
  return (
    <div>
      <div
        className={`flex gap-2 ${
          variant === 'underline'
            ? 'border-b border-gray-700'
            : 'bg-gray-900 p-1 rounded-lg w-fit'
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === tab.value
                ? variant === 'underline'
                  ? 'text-primary border-b-2 border-primary'
                  : 'bg-primary text-white rounded'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
};
