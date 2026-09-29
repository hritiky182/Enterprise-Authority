import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Heatmap5x5 } from '../components/common/Heatmap5x5';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { RiskItem } from '../types';
import { ShieldAlert, Plus, AlertTriangle, CheckCircle2, RefreshCw, FileSpreadsheet, Upload } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ImportRiskModal } from '../components/modals/ImportRiskModal';

export const EnterpriseRiskPage: React.FC = () => {
  const { risks, openModal, permissions } = useApp();
  const [selectedCell, setSelectedCell] = useState<{ likelihood: number; impact: number } | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredRisks = useMemo(() => {
    return risks.filter((r) => {
      if (selectedCell) {
        if (r.likelihood !== selectedCell.likelihood || r.impact !== selectedCell.impact) {
          return false;
        }
      }
      if (categoryFilter !== 'all') {
        if (r.category.toLowerCase() !== categoryFilter.toLowerCase()) {
          return false;
        }
      }
      return true;
    });
  }, [risks, selectedCell, categoryFilter]);

  const criticalCount = risks.filter((r) => r.inherentScore >= 16).length;
  const highCount = risks.filter((r) => r.inherentScore >= 10 && r.inherentScore < 16).length;
  const moderateCount = risks.filter((r) => r.inherentScore >= 5 && r.inherentScore < 10).length;

  const riskColumns: Column<RiskItem>[] = [
    {
      header: 'Risk Code',
      accessorKey: 'code',
      sortable: true,
      width: '110px',
      cell: (r) => <span className="font-mono font-bold text-slate-900">{r.code}</span>,
    },
    {
      header: 'Risk Title & Description',
      accessorKey: 'title',
      sortable: true,
      cell: (r) => (
        <div>
          <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
            {r.title}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {r.category} • {r.department}
          </div>
        </div>
      ),
    },
    {
      header: 'Owner',
      accessorKey: 'owner',
      sortable: true,
    },
    {
      header: 'Inherent',
      accessorKey: 'inherentScore',
      sortable: true,
      width: '90px',
      cell: (r) => (
        <span
          className={`font-mono font-bold text-xs px-2 py-0.5 rounded border ${
            r.inherentScore >= 16
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : r.inherentScore >= 10
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-blue-50 text-blue-700 border-blue-200'
          }`}
        >
          Score {r.inherentScore}
        </span>
      ),
    },
    {
      header: 'Residual',
      accessorKey: 'residualScore',
      sortable: true,
      width: '90px',
      cell: (r) => (
        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
          Score {r.residualScore}
        </span>
      ),
    },
    {
      header: 'Treatment',
      accessorKey: 'treatment',
      sortable: true,
      cell: (r) => (
        <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
          {r.treatment}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (r) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <Breadcrumbs />
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1 mt-2">
            <ShieldAlert className="w-4 h-4" />
            <span>ENTERPRISE RISK MANAGEMENT (ISO 31000)</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Enterprise Risk Register & Heatmap</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify, assess, and treat strategic, operational, financial, and compliance risk exposures across all organizational departments.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-rose-600" />
            <span>Import Risk Register</span>
          </button>

          {permissions.canCreateRisk && (
            <button
              onClick={() => openModal('create_risk')}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl font-semibold text-xs hover:bg-rose-700 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Register New Risk
            </button>
          )}
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Risks"
          value={risks.length}
          subtext="Active Enterprise Scope"
          badgeText="ISO 31000"
          badgeColor="blue"
        />
        <StatCard
          title="Critical Risks (Score ≥ 16)"
          value={criticalCount}
          subtext="Immediate Escalation"
          badgeText="Critical"
          badgeColor="rose"
          accentColor="bg-rose-500"
        />
        <StatCard
          title="High Exposure Risks (10-15)"
          value={highCount}
          subtext="Mitigation in Progress"
          badgeText="High"
          badgeColor="amber"
          accentColor="bg-amber-500"
        />
        <StatCard
          title="Moderate / Low Risks (< 10)"
          value={moderateCount}
          subtext="Monitored Controls"
          badgeText="Monitored"
          badgeColor="blue"
        />
      </div>

      {/* Interactive 5x5 Heatmap */}
      <div>
        <div className="flex items-center justify-between mb-2">
          {selectedCell && (
            <div className="flex items-center gap-2 text-xs bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-lg">
              <span>
                Filtered by Matrix Cell: Likelihood <strong>{selectedCell.likelihood}</strong> × Impact{' '}
                <strong>{selectedCell.impact}</strong> ({filteredRisks.length} Risks)
              </span>
              <button
                onClick={() => setSelectedCell(null)}
                className="text-amber-700 hover:text-amber-900 font-bold ml-2 cursor-pointer"
              >
                Clear Filter ✕
              </button>
            </div>
          )}
        </div>
        <Heatmap5x5
          risks={risks}
          selectedCell={selectedCell}
          onSelectCell={(l, i) => {
            if (selectedCell?.likelihood === l && selectedCell?.impact === i) {
              setSelectedCell(null);
            } else {
              setSelectedCell({ likelihood: l, impact: i });
            }
          }}
        />
      </div>

      {/* Risk Register Data Table */}
      <DataTable
        data={filteredRisks}
        columns={riskColumns}
        title="Enterprise Risk Register"
        subtitle={`Showing ${filteredRisks.length} active risk items in ISO 31000 inventory`}
        searchPlaceholder="Search risks by code, title, owner, category..."
        onRowClick={(r) => openModal('risk', r)}
        primaryAction={
          permissions.canCreateRisk
            ? {
                label: 'Register Risk',
                onClick: () => openModal('create_risk'),
                icon: <Plus className="w-3.5 h-3.5" />,
              }
            : undefined
        }
        filterOptions={[
          {
            key: 'category',
            label: 'Category',
            options: [
              { label: 'Operational', value: 'operational' },
              { label: 'Strategic', value: 'strategic' },
              { label: 'Financial', value: 'financial' },
              { label: 'Compliance', value: 'compliance' },
              { label: 'Cyber', value: 'cyber' },
              { label: 'Reputational', value: 'reputational' },
            ],
          },
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Open', value: 'open' },
              { label: 'Mitigating', value: 'mitigating' },
              { label: 'Accepted', value: 'accepted' },
              { label: 'Closed', value: 'closed' },
            ],
          },
        ]}
      />

      {/* Import Risk Modal */}
      <ImportRiskModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
};
