'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ParameterBarChart } from '@/components/charts/TimeSeriesCharts';
import { Tabs, Alert } from '@/components/ui';
import { Download } from 'lucide-react';

const generateComplianceData = () => {
  return [
    { time: 'Zone A', 'WHO Limit': 0, 'Exceedance': 2, 'Avg Value': 8.2 },
    { time: 'Zone B', 'WHO Limit': 0, 'Exceedance': 1, 'Avg Value': 7.9 },
    { time: 'Zone C', 'WHO Limit': 0, 'Exceedance': 3, 'Avg Value': 8.5 },
    { time: 'Zone D', 'WHO Limit': 0, 'Exceedance': 0, 'Avg Value': 7.1 },
  ];
};

const exampleReports = [
  {
    id: 1,
    period: 'Weekly',
    date: 'Jul 1, 2024',
    whoExceedances: 6,
    zoneData: [
      { zone: 'Zone A', parameter: 'pH', exceedances: 2, duration: '6 hours' },
      { zone: 'Zone B', parameter: 'Turbidity', exceedances: 1, duration: '2 hours' },
      { zone: 'Zone C', parameter: 'TDS', exceedances: 3, duration: '8 hours' },
    ],
  },
  {
    id: 2,
    period: 'Monthly',
    date: 'Jun 30, 2024',
    whoExceedances: 24,
    zoneData: [
      { zone: 'Zone A', parameter: 'pH', exceedances: 8, duration: '20 hours' },
      { zone: 'Zone B', parameter: 'Turbidity', exceedances: 6, duration: '15 hours' },
      { zone: 'Zone C', parameter: 'TDS', exceedances: 10, duration: '30 hours' },
    ],
  },
];

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedReport, setSelectedReport] = useState(exampleReports[0]);

  const complianceData = generateComplianceData();

  const handleExportPDF = (reportId: number) => {
    alert(`Exporting PDF report ${reportId}... This will integrate with jsPDF library`);
    // When ready, integrate with jsPDF:
    // const doc = new jsPDF();
    // doc.text('Compliance Report', 10, 10);
    // ... add content ...
    // doc.save(`compliance-report-${reportId}.pdf`);
  };

  return (
    <Layout title="Compliance Reports - Water Quality Surveillance">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Compliance Reports</h1>
          <p className="text-gray-400">
            WHO Water Quality Standards Compliance and Regulatory Reporting
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { label: 'Current Report', value: 'current' },
            { label: 'Report History', value: 'history' },
            { label: 'WHO Standards', value: 'standards' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
        >
          {activeTab === 'current' && (
            <div className="space-y-6">
              {/* Report Overview */}
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedReport.period} Report</h2>
                    <p className="text-gray-400 text-sm mt-1">Generated: {selectedReport.date}</p>
                  </div>
                  <button
                    onClick={() => handleExportPDF(selectedReport.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Export PDF
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">WHO Exceedances</p>
                    <p className="text-3xl font-bold text-red-400 mt-2">{selectedReport.whoExceedances}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Compliance Rate</p>
                    <p className="text-3xl font-bold text-green-400 mt-2">
                      {(100 - selectedReport.whoExceedances * 2).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Zones Affected</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-2">
                      {new Set(selectedReport.zoneData.map((z) => z.zone)).size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Exceedance Details */}
              <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Exceedance Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="px-4 py-3 text-sm font-semibold text-gray-300">Zone</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-300">Parameter</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-300">Exceedances</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-300">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReport.zoneData.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-800 hover:bg-gray-800/50">
                          <td className="px-4 py-3 text-sm text-white font-medium">{item.zone}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{item.parameter}</td>
                          <td className="px-4 py-3 text-sm text-red-400 font-semibold">{item.exceedances}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{item.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Compliance Chart */}
              <ParameterBarChart
                data={complianceData}
                bars={[
                  { key: 'Exceedance', color: '#E74C3C', name: 'Exceedances' },
                ]}
                title="WHO Standard Exceedances by Zone"
                height={300}
                xLabel="Zone"
                yLabel="Number of Exceedances"
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {exampleReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`bg-gray-900 rounded-lg border p-4 cursor-pointer transition-all ${
                    selectedReport.id === report.id
                      ? 'border-primary bg-gray-800'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{report.period} Report</h3>
                      <p className="text-sm text-gray-400 mt-1">{report.date}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        WHO Exceedances: {report.whoExceedances}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExportPDF(report.id);
                      }}
                      className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'standards' && (
            <div className="space-y-4">
              <Alert
                type="info"
                title="WHO Water Quality Guidelines"
                message="The system tracks compliance with WHO guidelines for drinking water quality standards."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                  <h3 className="font-semibold text-white mb-3">pH</h3>
                  <p className="text-gray-300 text-sm">
                    <strong>WHO Guideline:</strong> 6.5-8.5
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Maintains neutrality and prevents corrosion
                  </p>
                </div>
                <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                  <h3 className="font-semibold text-white mb-3">Turbidity</h3>
                  <p className="text-gray-300 text-sm">
                    <strong>WHO Guideline:</strong> &lt; 0.5 NTU
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Indicates presence of particles and microorganisms
                  </p>
                </div>
                <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                  <h3 className="font-semibold text-white mb-3">TDS (Total Dissolved Solids)</h3>
                  <p className="text-gray-300 text-sm">
                    <strong>WHO Guideline:</strong> &lt; 1000 mg/L
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Measure of mineral content and salinity
                  </p>
                </div>
                <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
                  <h3 className="font-semibold text-white mb-3">Dissolved Oxygen</h3>
                  <p className="text-gray-300 text-sm">
                    <strong>Target:</strong> &gt; 5 mg/L
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Essential for aquatic life and water quality
                  </p>
                </div>
              </div>
            </div>
          )}
        </Tabs>
      </div>
    </Layout>
  );
}
