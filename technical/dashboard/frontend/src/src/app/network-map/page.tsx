'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { NetworkMap } from '@/components/maps/NetworkMap';
import { Loading, Tabs } from '@/components/ui';
import { useNetworkNodes } from '@/hooks/useData';
import type { NetworkNode } from '@/types';

export default function NetworkMapPage() {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [activeTab, setActiveTab] = useState('map');
  const { nodes, loading } = useNetworkNodes();

  if (loading) {
    return (
      <Layout title="Network Map - Water Quality Surveillance">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title="Network Map - Water Quality Surveillance">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">Network Distribution Map</h1>
          <p className="text-gray-400">
            Geographic distribution of water quality monitoring nodes with real-time WQI status
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { label: 'Map View', value: 'map' },
            { label: 'List View', value: 'list' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
        >
          {activeTab === 'map' && (
            <div className="space-y-6">
              {/* Legend */}
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                <h3 className="font-semibold text-white mb-3">Legend</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-600"></div>
                    <span className="text-sm text-gray-300">Good (WQI &gt; 70)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-600"></div>
                    <span className="text-sm text-gray-300">Medium (WQI 40-70)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-600"></div>
                    <span className="text-sm text-gray-300">Bad (WQI &lt; 40)</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-4 border-green-600 rounded-full"></div>
                    <span>Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-4 border-yellow-600 rounded-full"></div>
                    <span>Maintenance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-4 border-gray-500 rounded-full"></div>
                    <span>Inactive</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 overflow-hidden">
                <NetworkMap
                  nodes={nodes}
                  selectedNode={selectedNode}
                  onNodeSelect={setSelectedNode}
                  height="600px"
                />
              </div>

              {/* Selected Node Details */}
              {selectedNode && (
                <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">{selectedNode.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Zone</p>
                      <p className="text-white font-semibold mt-1">{selectedNode.zone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">WQI</p>
                      <p className="text-white font-semibold mt-1">{selectedNode.wqi}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status</p>
                      <p className={`mt-1 font-semibold capitalize ${
                        selectedNode.status === 'active'
                          ? 'text-green-400'
                          : selectedNode.status === 'maintenance'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                      }`}>
                        {selectedNode.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Latitude</p>
                      <p className="text-white font-semibold mt-1">{selectedNode.latitude.toFixed(6)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Longitude</p>
                      <p className="text-white font-semibold mt-1">{selectedNode.longitude.toFixed(6)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Last Update</p>
                      <p className="text-white font-semibold mt-1">
                        {new Date(selectedNode.lastUpdate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'list' && (
            <div>
              <div className="space-y-3">
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="bg-gray-900 rounded-lg border border-gray-700 p-4 cursor-pointer hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{node.name}</h4>
                        <p className="text-sm text-gray-400 mt-1">Zone: {node.zone}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {node.latitude.toFixed(6)}, {node.longitude.toFixed(6)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            node.wqi > 70
                              ? 'text-green-400'
                              : node.wqi > 40
                                ? 'text-yellow-400'
                                : 'text-red-400'
                          }`}
                        >
                          {node.wqi}
                        </div>
                        <p className={`text-xs mt-1 capitalize ${
                          node.status === 'active'
                            ? 'text-green-400'
                            : node.status === 'maintenance'
                              ? 'text-yellow-400'
                              : 'text-red-400'
                        }`}>
                          {node.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
