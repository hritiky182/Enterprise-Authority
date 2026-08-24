import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STRATEGIC_THEMES, STRATEGIC_GOALS } from '../data/mockData';
import { StatusBadge } from '../components/common/StatusBadge';
import { DataTable, Column } from '../components/common/DataTable';
import { StrategicObjective, StrategicInitiative, KPI } from '../types';
import { Target, Layers, ChevronRight, Calendar, DollarSign, Flag, CheckCircle } from 'lucide-react';

export const StrategyPage: React.FC = () => {
  const { objectives, initiatives, kpis, openModal } = useApp();
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'objectives' | 'initiatives' | 'kpis'>('hierarchy');

  const objectiveColumns: Column<StrategicObjective>[] = [
    {
      header: 'Code',
      accessorKey: 'code',
      sortable: true,
      width: '90px',
      cell: (o) => <span className="font-mono font-bold text-slate-900">{o.code}</span>,
    },
    {
      header: 'Strategic Objective',
      accessorKey: 'title',
      sortable: true,
      cell: (o) => (
        <div>
          <div className="font-semibold text-slate-900">{o.title}</div>
          <div className="text-[10px] text-slate-400">{o.themeName}</div>
        </div>
      ),
    },
    {
      header: 'Owner',
      accessorKey: 'owner',
      sortable: true,
      cell: (o) => (
        <div>
          <div className="font-medium text-slate-800">{o.owner}</div>
          <div className="text-[10px] text-slate-400">{o.department}</div>
        </div>
      ),
    },
    {
      header: 'Target Year',
      accessorKey: 'targetYear',
      sortable: true,
      width: '100px',
      cell: (o) => <span className="font-mono">{o.targetYear}</span>,
    },
    {
      header: 'Progress',
      accessorKey: 'progress',
      sortable: true,
      width: '120px',
      cell: (o) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full" style={{ width: `${o.progress}%` }} />
          </div>
          <span className="font-mono font-bold text-slate-900">{o.progress}%</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      width: '110px',
      cell: (o) => <StatusBadge status={o.status} />,
    },
  ];

  const kpiColumns: Column<KPI>[] = [
    {
      header: 'KPI Code',
      accessorKey: 'code',
      sortable: true,
      width: '100px',
      cell: (k) => <span className="font-mono font-bold text-slate-900">{k.code}</span>,
    },
    {
      header: 'Indicator Name',
      accessorKey: 'name',
      sortable: true,
      cell: (k) => (
        <div>
          <div className="font-semibold text-slate-900">{k.name}</div>
          <div className="text-[10px] text-slate-400 truncate max-w-sm">{k.objectiveTitle}</div>
        </div>
      ),
    },
    { header: 'Target', accessorKey: 'target', cell: (k) => <span className="font-mono">{k.target} {k.unit}</span> },
    { header: 'Actual', accessorKey: 'actual', cell: (k) => <span className="font-mono font-bold">{k.actual} {k.unit}</span> },
    {
      header: 'Achievement %',
      accessorKey: 'achievementPct',
      sortable: true,
      cell: (k) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {k.achievementPct}%
        </span>
      ),
    },
    { header: 'Frequency', accessorKey: 'frequency', cell: (k) => <span className="text-slate-600">{k.frequency}</span> },
    { header: 'Status', accessorKey: 'status', cell: (k) => <StatusBadge status={k.status} /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <Target className="w-4 h-4" />
            <span>ENTERPRISE DEVELOPMENT AUTHORITY STRATEGY MANAGEMENT</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Strategy Architecture & Initiative Execution
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hierarchy: Strategy → Themes → Goals → Objectives → KPIs → Strategic Initiatives
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'hierarchy' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hierarchy Tree
          </button>
          <button
            onClick={() => setActiveTab('objectives')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'objectives' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Objectives ({objectives.length})
          </button>
          <button
            onClick={() => setActiveTab('kpis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'kpis' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            KPI Indicators ({kpis.length})
          </button>
          <button
            onClick={() => setActiveTab('initiatives')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'initiatives' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Initiatives ({initiatives.length})
          </button>
        </div>
      </div>

      {/* TAB 1: STRATEGY HIERARCHY TREE */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6">
          {STRATEGIC_THEMES.map((theme) => {
            const themeGoals = STRATEGIC_GOALS.filter((g) => g.themeId === theme.id);
            const themeObjectives = objectives.filter((o) => o.themeId === theme.id);

            return (
              <div
                key={theme.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4"
              >
                {/* Theme Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded">
                        {theme.code}
                      </span>
                      <h2 className="text-base font-bold text-slate-900">{theme.title}</h2>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{theme.description}</p>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    Weight: {theme.weight}%
                  </span>
                </div>

                {/* Strategic Goals & Objectives nested list */}
                <div className="pl-2 sm:pl-4 space-y-4 border-l-2 border-slate-200">
                  {themeGoals.map((goal) => {
                    const goalObjs = themeObjectives.filter((o) => o.goalId === goal.id);

                    return (
                      <div key={goal.id} className="space-y-3">
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {goal.code}
                          </span>
                          <span>{goal.title}</span>
                        </div>

                        {/* Objectives under Goal */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4">
                          {goalObjs.map((obj) => {
                            const objKpis = kpis.filter((k) => k.objectiveId === obj.id);
                            const objInits = initiatives.filter((i) => i.objectiveId === obj.id);

                            return (
                              <div
                                key={obj.id}
                                onClick={() => openModal('objective', obj)}
                                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer space-y-2 group"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-mono font-bold text-xs text-slate-900">
                                    {obj.code}
                                  </span>
                                  <StatusBadge status={obj.status} />
                                </div>
                                <h4 className="font-semibold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                                  {obj.title}
                                </h4>

                                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 font-mono">
                                  <span>Owner: {obj.owner}</span>
                                  <span className="font-bold text-emerald-700">{obj.progress}% Progress</span>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1">
                                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                                    {objKpis.length} KPIs
                                  </span>
                                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                                    {objInits.length} Initiatives
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: OBJECTIVES TABLE */}
      {activeTab === 'objectives' && (
        <DataTable
          title="Strategic Objectives Performance Matrix"
          subtitle="Owner, Theme alignment, target deadlines and overall achievement progress"
          data={objectives}
          columns={objectiveColumns}
          onRowClick={(obj) => openModal('objective', obj)}
        />
      )}

      {/* TAB 3: KPIS TABLE */}
      {activeTab === 'kpis' && (
        <DataTable
          title="Key Performance Indicator (KPI) Management"
          subtitle="Real-time actual measurements vs strategic target metrics"
          data={kpis}
          columns={kpiColumns}
        />
      )}

      {/* TAB 4: INITIATIVES CARDS & MILESTONES */}
      {activeTab === 'initiatives' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {initiatives.map((init) => (
            <div
              key={init.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {init.code}
                    </span>
                    <StatusBadge status={init.status} />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 mt-2">{init.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{init.description}</p>
                </div>
              </div>

              {/* Budget & Progress stats */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="panel-label">Budget Allocation</span>
                  <div className="font-mono font-bold text-sm text-slate-900 mt-0.5">
                    SAR {(init.budgetSAR / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Spent: SAR {(init.spentSAR / 1000000).toFixed(1)}M
                  </div>
                </div>

                <div>
                  <span className="panel-label">Overall Completion</span>
                  <div className="font-mono font-bold text-sm text-emerald-700 mt-0.5">
                    {init.progress}%
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-emerald-600 h-full" style={{ width: `${init.progress}%` }} />
                  </div>
                </div>
              </div>

              {/* Milestones list */}
              <div>
                <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-2">
                  Key Deliverables & Milestones
                </h4>
                <div className="space-y-1.5">
                  {init.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-2 rounded-lg border border-slate-100 bg-white flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={`w-3.5 h-3.5 ${m.status === 'Completed' ? 'text-emerald-600' : 'text-slate-300'}`} />
                        <span className="font-medium text-slate-800">{m.title}</span>
                      </div>
                      <div className="flex items-center space-x-2 font-mono text-[10px]">
                        <span className="text-slate-400">{m.dueDate}</span>
                        <StatusBadge status={m.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 font-mono">
                <span>Owner: {init.owner}</span>
                <span>{init.startDate} → {init.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
