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
    primary: 'from-blue-600 to-blue-700',
    success: 'from-green-600 to-green-700',
    warning: 'from-yellow-600 to-yellow-700',
    danger: 'from-red-600 to-red-700',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg p-6 text-white`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold">{value}</span>
            {unit && <span className="text-lg opacity-75">{unit}</span>}
          </div>
          {trend && (
            <div className="flex items-center gap-1 mt-2 text-sm">
              <span className={trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}>
                {trendValue && `${trendValue}%`}
              </span>
            </div>
          )}
        </div>
        {icon && <div className="text-3xl opacity-50">{icon}</div>}
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
