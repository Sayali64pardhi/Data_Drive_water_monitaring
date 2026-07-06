'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, Alert } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Layout title="Settings - Water Quality Surveillance">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account and system preferences</p>
        </div>

        {saved && (
          <Alert type="success" title="Saved" message="Your settings have been saved successfully." />
        )}

        <Tabs
          tabs={[
            { label: 'Profile', value: 'profile' },
            { label: 'Notifications', value: 'notifications' },
            { label: 'System', value: 'system' },
            { label: 'API Keys', value: 'api' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name || ''}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <select className="w-full" defaultValue={user?.role || 'operator'}>
                      <option value="operator">Operator</option>
                      <option value="admin">Administrator</option>
                      <option value="inspector">Inspector</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-gray-300">Email notifications for critical alerts</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-gray-300">SMS notifications for critical alerts</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-gray-300">Daily summary reports</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-gray-300">Browser notifications</span>
                  </label>

                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Alert Thresholds</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">pH Threshold</label>
                        <input type="number" placeholder="6.5-8.5" className="w-full" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Turbidity Threshold (NTU)</label>
                        <input type="number" placeholder="0.5" className="w-full" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <Alert
                type="info"
                title="System Configuration"
                message="System-wide settings can only be modified by administrators."
              />
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">System Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                    <select className="w-full" defaultValue="dark">
                      <option value="dark">Dark</option>
                      <option value="light">Light (Beta)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time Zone</label>
                    <select className="w-full">
                      <option value="UTC">UTC</option>
                      <option value="IST">IST (India Standard Time)</option>
                      <option value="EST">EST (Eastern Standard Time)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data Retention (days)
                    </label>
                    <input type="number" defaultValue="90" className="w-full" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <Alert
                type="warning"
                title="API Configuration"
                message="These settings are for system administrators. API keys should be configured in environment variables."
              />
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">API Integration Status</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <span className="text-gray-300">Firebase Firestore</span>
                    <span className="text-green-400 text-sm font-medium">✓ Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <span className="text-gray-300">IoT API (Placeholder)</span>
                    <span className="text-yellow-400 text-sm font-medium">⊘ Pending</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <span className="text-gray-300">DS API (Placeholder)</span>
                    <span className="text-yellow-400 text-sm font-medium">⊘ Pending</span>
                  </div>
                </div>

                <Alert
                  type="info"
                  title="Integration Guide"
                  message="See API_INTEGRATION_GUIDE.md in the project root for detailed instructions on integrating IoT and DS team APIs."
                />
              </div>
            </div>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
