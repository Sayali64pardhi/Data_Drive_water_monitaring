'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { AlertList, AlertSummary } from '@/components/alerts/AlertCard';
import { Tabs } from '@/components/ui';
import { useAlerts } from '@/hooks/useData';
import { Loading } from '@/components/ui';

export default function AlertsPage() {
  const { alerts, loading, acknowledgeAlert } = useAlerts();
  const [activeTab, setActiveTab] = React.useState('unacknowledged');

  if (loading) {
    return (
      <Layout title="Active Alerts - Water Quality Surveillance">
        <Loading />
      </Layout>
    );
  }

  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged);
  const acknowledgedAlerts = alerts.filter((a) => a.acknowledged);
  const criticalAlerts = alerts.filter((a) => a.type === 'critical').length;
  const warningAlerts = alerts.filter((a) => a.type === 'warning').length;
  const infoAlerts = alerts.filter((a) => a.type === 'info').length;

  return (
    <Layout title="Active Alerts - Water Quality Surveillance">
      <div className="space-y-8">
        {/* Summary */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Active Alerts</h1>
          <AlertSummary
            critical={criticalAlerts}
            warning={warningAlerts}
            info={infoAlerts}
            total={alerts.length}
          />
        </div>

        {/* Alert Tabs */}
        <div>
          <Tabs
            tabs={[
              { label: `Unacknowledged (${unacknowledgedAlerts.length})`, value: 'unacknowledged' },
              { label: `Acknowledged (${acknowledgedAlerts.length})`, value: 'acknowledged' },
              { label: 'All', value: 'all' },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="underline"
          >
            {activeTab === 'unacknowledged' && (
              <AlertList
                alerts={unacknowledgedAlerts}
                onAcknowledge={(alertId) => acknowledgeAlert(alertId, 'user123')}
                emptyMessage="No unacknowledged alerts - All systems operating normally!"
              />
            )}
            {activeTab === 'acknowledged' && (
              <AlertList
                alerts={acknowledgedAlerts}
                emptyMessage="No acknowledged alerts"
              />
            )}
            {activeTab === 'all' && (
              <AlertList
                alerts={alerts}
                onAcknowledge={(alertId) => acknowledgeAlert(alertId, 'user123')}
                emptyMessage="No alerts"
              />
            )}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
