import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CYBER_ASSETS, VULNERABILITIES, SECURITY_CONTROLS } from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { CyberAsset, Vulnerability, SecurityControl } from '../types';
import { Lock, ShieldAlert, Server, AlertCircle, CheckCircle } from 'lucide-react';

export const CyberRiskPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'vulnerabilities' | 'controls'>('overview');

  const assetColumns: Column<CyberAsset>[] = [
    { header: 'Asset Code', accessorKey: 'code', sortable: true, cell: (a) => <span className="font-mono font-bold text-slate-900">{a.code}</span> },
    { header: 'Asset Name', accessorKey: 'name', sortable: true, cell: (a) => <span className="font-semibold text-slate-900">{a.name}</span> },
    { header: 'Category', accessorKey: 'category', sortable: true, cell: (a) => <span className="font-mono text-slate-700">{a.category}</span> },
    { header: 'IP Address', accessorKey: 'ipAddress', cell: (a) => <span className="font-mono text-slate-600">{a.ipAddress}</span> },
    { header: 'Criticality', accessorKey: 'criticality', sortable: true, cell: (a) => <StatusBadge status={a.criticality} variant="risk" /> },
    { header: 'Status', accessorKey: 'status', cell: (a) => <StatusBadge status={a.status} /> },
  ];

  const vulnColumns: Column<Vulnerability>[] = [
    { header: 'Vuln ID', accessorKey: 'code', sortable: true, cell: (v) => <span className="font-mono font-bold text-slate-900">{v.code}</span> },
    { header: 'CVE Identifier', accessorKey: 'cveId', sortable: true, cell: (v) => <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">{v.cveId}</span> },
    { header: 'Target Asset', accessorKey: 'assetName', sortable: true, cell: (v) => <span className="font-medium text-slate-800">{v.assetName}</span> },
    { header: 'CVSS v3 Score', accessorKey: 'cvssScore', sortable: true, cell: (v) => <span className="font-mono font-bold text-slate-900">{v.cvssScore} / 10</span> },
    { header: 'Remediation Due', accessorKey: 'remediationDueDate', cell: (v) => <span className="font-mono text-slate-600">{v.remediationDueDate}</span> },
    { header: 'Status', accessorKey: 'status', cell: (v) => <StatusBadge status={v.status} variant="risk" /> },
  ];

  const controlColumns: Column<SecurityControl>[] = [
    { header: 'Control Code', accessorKey: 'code', sortable: true, cell: (c) => <span className="font-mono font-bold text-slate-900">{c.code}</span> },
    { header: 'Framework', accessorKey: 'framework', sortable: true, cell: (c) => <span className="font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{c.framework}</span> },
    { header: 'Control Name', accessorKey: 'name', sortable: true, cell: (c) => <span className="font-semibold text-slate-900">{c.name}</span> },
    { header: 'Effectiveness', accessorKey: 'effectivenessPct', sortable: true, cell: (c) => <span className="font-mono font-bold text-emerald-700">{c.effectivenessPct}%</span> },
    { header: 'Compliance Status', accessorKey: 'status', cell: (c) => <StatusBadge status={c.status} /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-600 mb-1">
            <Lock className="w-4 h-4" />
            <span>NATIONAL CYBERSECURITY AUTHORITY (NCA ECC) ALIGNMENT</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Cybersecurity Risk & Critical IT Assets
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time threat landscape, vulnerability management (CVEs), and NCA ECC / ISO 27001 security controls.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'overview' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'assets' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            Assets ({CYBER_ASSETS.length})
          </button>
          <button
            onClick={() => setActiveTab('vulnerabilities')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'vulnerabilities' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            CVE Vulnerabilities ({VULNERABILITIES.length})
          </button>
          <button
            onClick={() => setActiveTab('controls')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'controls' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            Controls ({SECURITY_CONTROLS.length})
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Critical IT Assets" value={CYBER_ASSETS.filter((a) => a.criticality === 'Critical').length} subtext="GIS & SCADA Infrastructure" badgeText="Critical" badgeColor="rose" />
        <StatCard title="Open Vulnerabilities" value={VULNERABILITIES.filter((v) => v.status !== 'Patched').length} subtext="1 Critical CVE-2024-21626" badgeText="Action Required" badgeColor="amber" />
        <StatCard title="NCA ECC Control Score" value="96.5%" subtext="110 / 114 Controls Compliant" badgeText="Grade A" badgeColor="emerald" />
        <StatCard title="Security Control Effectiveness" value="93.5%" subtext="Average across 4 Frameworks" badgeText="Sovereign" badgeColor="emerald" />
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataTable title="High-Risk Infrastructure Assets" subtitle="Critical servers, SCADA nodes & Geo-spatial databases" data={CYBER_ASSETS} columns={assetColumns} />
          <DataTable title="Vulnerability Remediation Pipeline" subtitle="CVSS v3 scores, CVE trackers and remediation deadlines" data={VULNERABILITIES} columns={vulnColumns} />
        </div>
      )}

      {activeTab === 'assets' && <DataTable title="Critical IT Asset Inventory" subtitle="Sovereign cloud compute, SCADA nodes and databases" data={CYBER_ASSETS} columns={assetColumns} />}
      {activeTab === 'vulnerabilities' && <DataTable title="Vulnerability Management (CVE Register)" subtitle="Active exploit threats and patch timelines" data={VULNERABILITIES} columns={vulnColumns} />}
      {activeTab === 'controls' && <DataTable title="NCA ECC & ISO 27001 Security Controls" subtitle="Control effectiveness ratings and implementation status" data={SECURITY_CONTROLS} columns={controlColumns} />}
    </div>
  );
};
