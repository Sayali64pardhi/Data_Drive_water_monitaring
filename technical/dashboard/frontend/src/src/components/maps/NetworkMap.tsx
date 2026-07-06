'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { NetworkNode } from '@/types';

interface NetworkMapProps {
  nodes: NetworkNode[];
  selectedNode?: NetworkNode | null;
  onNodeSelect?: (node: NetworkNode) => void;
  height?: string;
  center?: [number, number]; // [lat, lng]
  zoom?: number;
}

export const NetworkMap: React.FC<NetworkMapProps> = ({
  nodes,
  selectedNode,
  onNodeSelect,
  height = '500px',
  center = [28.6139, 77.2090], // Default: Delhi coordinates
  zoom = 12,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView(center, zoom);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map.current);
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => map.current?.removeLayer(marker));
    markersRef.current.clear();

    // Add markers for each node
    nodes.forEach((node) => {
      const statusColor = {
        active: '#27AE60',
        inactive: '#95A5A6',
        maintenance: '#F39C12',
      };

      const wqiColor = node.wqi > 70 ? '#27AE60' : node.wqi > 40 ? '#F39C12' : '#E74C3C';

      const customIcon = L.divIcon({
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background: ${wqiColor};
            border: 3px solid ${statusColor[node.status]};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
            ${Math.round(node.wqi)}
          </div>
        `,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([node.latitude, node.longitude], { icon: customIcon })
        .addTo(map.current!)
        .bindPopup(`
          <div style="color: #333;">
            <strong>${node.name}</strong><br/>
            WQI: ${node.wqi}<br/>
            Zone: ${node.zone}<br/>
            Status: ${node.status}
          </div>
        `);

      marker.on('click', () => onNodeSelect?.(node));
      markersRef.current.set(node.id, marker);

      // Highlight selected node
      if (selectedNode?.id === node.id) {
        marker.openPopup();
      }
    });

    return () => {
      // Cleanup
    };
  }, [nodes, selectedNode, center, zoom, onNodeSelect]);

  return (
    <div
      ref={mapContainer}
      style={{
        height,
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
      }}
    />
  );
};
