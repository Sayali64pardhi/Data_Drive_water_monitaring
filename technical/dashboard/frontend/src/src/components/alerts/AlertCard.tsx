'use client';

import React from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui';
import type { Alert as AlertType } from '@/types';

interface AlertCardProps {
  alert: AlertType;
  onAcknowledge?: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onAcknowledge }) => {
  const iconMap = {
    critical: <AlertTriangle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const colorMap = {
    critical: 'border-red-700 bg-red-950',
    warning: 'border-yellow-700 bg-yellow-950',
    info: 'border-blue-700 bg-blue-950',
  };

  const typeColors = {
    critical: 'danger' as const,
    warning: 'warning' as const,
    info: 'info' as const,
  };

  return (
    <div className={`border rounded-lg p-4 ${colorMap[alert.type]} ${alert.acknowledged ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className={`mt-1 ${alert.type === 'critical' ? 'text-red-400' : alert.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`}>
            {iconMap[alert.type]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-white">{alert.nodeName}</h4>
              <Badge label={alert.type.toUpperCase()} variant={typeColors[alert.type]} size="sm" />
              {alert.acknowledged && <Badge label="Acknowledged" variant="success" size="sm" />}
            </div>
            <p className="text-sm text-gray-300 mt-1">{alert.message}</p>
            <p className="text-xs text-gray-400 mt-2">
              {alert.parameter}: {alert.value.toFixed(2)} (threshold: {alert.threshold.toFixed(2)})
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(alert.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        {!alert.acknowledged && onAcknowledge && (
          <button
            onClick={onAcknowledge}
            className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded font-medium text-sm whitespace-nowrap"
          >
            Acknowledge
          </button>
        )}
        {alert.acknowledged && (
          <div className="text-xs text-green-400 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

interface AlertListProps {
  alerts: AlertType[];
  onAcknowledge?: (alertId: string) => void;
  maxHeight?: string;
  emptyMessage?: string;
}

export const AlertList: React.FC<AlertListProps> = ({
  alerts,
  onAcknowledge,
  maxHeight = '600px',
  emptyMessage = 'No alerts at this time',
}) => {
  return (
    <div className={`space-y-3 overflow-y-auto`} style={{ maxHeight }}>
      {alerts.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-gray-400">
          <CheckCircle className="w-5 h-5 mr-2" />
          {emptyMessage}
        </div>
      ) : (
        alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onAcknowledge={() => onAcknowledge?.(alert.id)}
          />
        ))
      )}
    </div>
  );
};

interface AlertSummaryProps {
  critical: number;
  warning: number;
  info: number;
  total: number;
}

export const AlertSummary: React.FC<AlertSummaryProps> = ({ critical, warning, info, total }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-red-950 border border-red-700 rounded-lg p-4">
        <p className="text-red-200 text-sm font-medium">Critical</p>
        <p className="text-2xl font-bold text-red-400 mt-2">{critical}</p>
      </div>
      <div className="bg-yellow-950 border border-yellow-700 rounded-lg p-4">
        <p className="text-yellow-200 text-sm font-medium">Warning</p>
        <p className="text-2xl font-bold text-yellow-400 mt-2">{warning}</p>
      </div>
      <div className="bg-blue-950 border border-blue-700 rounded-lg p-4">
        <p className="text-blue-200 text-sm font-medium">Info</p>
        <p className="text-2xl font-bold text-blue-400 mt-2">{info}</p>
      </div>
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <p className="text-gray-300 text-sm font-medium">Total</p>
        <p className="text-2xl font-bold text-white mt-2">{total}</p>
      </div>
    </div>
  );
};
