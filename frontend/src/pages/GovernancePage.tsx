import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GOVERNANCE_POLICIES, GOVERNANCE_COMMITTEES } from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { GovernancePolicy, GovernanceCommittee } from '../types';
import { Landmark, Users, FileCheck, Calendar, ShieldCheck } from 'lucide-react';

export const GovernancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'policies' | 'committees'>('policies');

  const policyColumns: Column<GovernancePolicy>[] = [
    { header: 'Policy Code', accessorKey: 'code', sortable: true, cell: (p) => <span className="font-mono font-bold text-slate-900">{p.code}</span> },
    {
      header: 'Policy Title',
      accessorKey: 'title',
      sortable: true,
      cell: (p) => (
        <div>
          <div className="font-semibold text-slate-900">{p.title}</div>
          <div className="text-[10px] text-slate-400 font-mono">{p.category} • {p.department}</div>
        </div>
      ),
    },
    { header: 'Owner', accessorKey: 'owner', sortable: true },
    { header: 'Version', accessorKey: 'version', cell: (p) => <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">{p.version}</span> },
    { header: 'Effective Date', accessorKey: 'effectiveDate', cell: (p) => <span className="font-mono text-slate-600">{p.effectiveDate}</span> },
    { header: 'Next Review', accessorKey: 'reviewDate', cell: (p) => <span className="font-mono text-slate-600">{p.reviewDate}</span> },
    { header: 'Status', accessorKey: 'status', cell: (p) => <StatusBadge status={p.status} /> },
  ];

  const committeeColumns: Column<GovernanceCommittee>[] = [
    { header: 'Committee ID', accessorKey: 'code', sortable: true, cell: (c) => <span className="font-mono font-bold text-slate-900">{c.code}</span> },
    { header: 'Committee Name', accessorKey: 'name', sortable: true, cell: (c) => <span className="font-semibold text-slate-900">{c.name}</span> },
    { header: 'Chairperson', accessorKey: 'chair', sortable: true },
    { header: 'Secretary', accessorKey: 'secretary' },
    { header: 'Members', accessorKey: 'membersCount', cell: (c) => <span className="font-mono font-bold">{c.membersCount} Executive Members</span> },
    { header: 'Frequency', accessorKey: 'frequency', cell: (c) => <span className="text-slate-600">{c.frequency}</span> },
    { header: 'Next Meeting', accessorKey: 'nextMeetingDate', cell: (c) => <span className="font-mono font-bold text-emerald-700">{c.nextMeetingDate}</span> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <Landmark className="w-4 h-4" />
            <span>INSTITUTIONAL GOVERNANCE & CHARTERS</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Corporate Governance, Committees & Policies
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Executive steering committees, board meeting schedules, and institutional policy governance registers.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('policies')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'policies' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            Policies Register ({GOVERNANCE_POLICIES.length})
          </button>
          <button
            onClick={() => setActiveTab('committees')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'committees' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            Committees ({GOVERNANCE_COMMITTEES.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Policies" value={GOVERNANCE_POLICIES.filter((p) => p.status === 'Approved').length} subtext="1 Under Review" badgeText="Approved" badgeColor="emerald" />
        <StatCard title="Executive Committees" value={GOVERNANCE_COMMITTEES.length} subtext="Board & Steering Level" badgeText="Active" badgeColor="blue" />
        <StatCard title="Upcoming Meetings" value="3 Meetings" subtext="Scheduled for Sept 2026" badgeText="Q3 Schedule" badgeColor="emerald" />
        <StatCard title="Policy Compliance Rate" value="98.2%" subtext="Annual Policy Audit" badgeText="Grade A" badgeColor="emerald" />
      </div>

      {activeTab === 'policies' && (
        <DataTable
          title="Institutional Policy Management Register"
          subtitle="Governing charters, data security guidelines, and procurement policies"
          data={GOVERNANCE_POLICIES}
          columns={policyColumns}
        />
      )}

      {activeTab === 'committees' && (
        <DataTable
          title="Executive Steering Committees & Councils"
          subtitle="Committee charters, chairperson delegations and meeting calendars"
          data={GOVERNANCE_COMMITTEES}
          columns={committeeColumns}
        />
      )}
    </div>
  );
};
