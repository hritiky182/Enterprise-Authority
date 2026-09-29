import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { ActionItem } from '../types';
import { ListTodo, Plus, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const ActionsPage: React.FC = () => {
  const { actions, openModal, updateActionStatus, permissions } = useApp();
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const filteredActions = actions.filter((a) => {
    if (sourceFilter !== 'all' && a.source.toLowerCase() !== sourceFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  const criticalCount = actions.filter((a) => a.priority === 'Critical').length;
  const inProgressCount = actions.filter((a) => a.status === 'In Progress').length;
  const completedCount = actions.filter((a) => a.status === 'Completed').length;

  const actionColumns: Column<ActionItem>[] = [
    { header: 'Action Code', accessorKey: 'code', sortable: true, width: '110px', cell: (a) => <span className="font-mono font-bold text-slate-900">{a.code}</span> },
    {
      header: 'Action Plan Title & Source',
      accessorKey: 'title',
      sortable: true,
      cell: (a) => (
        <div>
          <div className="font-semibold text-slate-900">{a.title}</div>
          <div className="text-[10px] text-slate-400 font-mono">
            Source: <span className="font-bold text-slate-700">{a.source}</span> • {a.sourceRefTitle}
          </div>
        </div>
      ),
    },
    { header: 'Owner', accessorKey: 'owner', sortable: true, cell: (a) => <span className="font-medium text-slate-800">{a.owner}</span> },
    { header: 'Priority', accessorKey: 'priority', sortable: true, cell: (a) => <StatusBadge status={a.priority} variant="priority" /> },
    { header: 'Due Date', accessorKey: 'dueDate', sortable: true, cell: (a) => <span className="font-mono text-slate-600">{a.dueDate}</span> },
    {
      header: 'Progress',
      accessorKey: 'progress',
      sortable: true,
      width: '120px',
      cell: (a) => (
        <div className="flex items-center gap-2">
          <div className="w-14 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full" style={{ width: `${a.progress}%` }} />
          </div>
          <span className="font-mono font-bold text-slate-900">{a.progress}%</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (a) => (
        <select
          disabled={permissions.isReadOnly}
          value={a.status}
          onChange={(e) => updateActionStatus(a.id, e.target.value as any, a.progress)}
          className="px-2 py-1 rounded border border-slate-200 text-xs font-medium bg-white text-slate-800 disabled:bg-slate-100 disabled:cursor-not-allowed cursor-pointer"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Completed">Completed</option>
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <Breadcrumbs />
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-600 mb-1 mt-2">
            <ListTodo className="w-4 h-4" />
            <span>CENTRALIZED ACTION ITEM GOVERNANCE</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Cross-Domain Action Plans & Corrective Measures
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Single-pane-of-glass execution tracking across Strategy, ERM Risk, Cyber, Governance, Compliance & BCM.
          </p>
        </div>

        {permissions.canCreateAction && (
          <button
            onClick={() => openModal('create_action')}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-xs hover:bg-blue-700 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            New Action Plan
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Action Plans" value={actions.length} subtext="Across 6 Enterprise Domains" badgeText="Central" badgeColor="blue" />
        <StatCard title="Critical Priority" value={criticalCount} subtext="Immediate Oversight" badgeText="Critical" badgeColor="rose" />
        <StatCard title="In Progress" value={inProgressCount} subtext="Active Operational Execution" badgeText="Active" badgeColor="amber" />
        <StatCard title="Completed" value={completedCount} subtext="Verified & Closed" badgeText="Completed" badgeColor="blue" />
      </div>

      {/* Filter Options */}
      <div className="flex items-center space-x-2 bg-white p-3 rounded-xl border border-slate-200 text-xs font-mono">
        <span className="font-semibold text-slate-700 mr-2">Filter Source:</span>
        {['all', 'Strategy', 'ERM', 'Cyber', 'Governance', 'Compliance', 'BCM'].map((src) => (
          <button
            key={src}
            onClick={() => setSourceFilter(src)}
            className={`px-3 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
              sourceFilter.toLowerCase() === src.toLowerCase()
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {src}
          </button>
        ))}
      </div>

      <DataTable
        title="Central Action Plans Register"
        subtitle="Real-time execution status and target due dates"
        data={filteredActions}
        columns={actionColumns}
        onRowClick={(action) => openModal('action', action)}
      />
    </div>
  );
};
