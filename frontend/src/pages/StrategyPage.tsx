import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { DataTable, Column } from '../components/common/DataTable';
import { StrategicObjective, StrategicInitiative, KPI } from '../types';
import { ClientStrategyMatrix } from '../components/strategy/ClientStrategyMatrix';
import { OperationalStructureView } from '../components/organization/OperationalStructureView';
import {
  Target,
  Layers,
  ChevronRight,
  Calendar,
  DollarSign,
  Flag,
  CheckCircle,
  Plus,
  Sparkles,
  Trash2,
  TrendingUp,
  BarChart3,
  RotateCcw,
  FileSpreadsheet,
  Network,
} from 'lucide-react';

export const StrategyPage: React.FC = () => {
  const { themes, goals, objectives, initiatives, kpis, openModal, deleteStrategyTheme, resetStrategies } = useApp();
  const [activeTab, setActiveTab] = useState<'matrix' | 'hierarchy' | 'objectives' | 'initiatives' | 'kpis' | 'structure'>('matrix');

  const totalBudget = initiatives.reduce((sum, i) => sum + (i.budgetSAR || 0), 0);
  const totalSpent = initiatives.reduce((sum, i) => sum + (i.spentSAR || 0), 0);

  const getThemeColorClass = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-700 text-white';
      case 'teal':
        return 'bg-teal-700 text-white';
      case 'blue':
        return 'bg-blue-700 text-white';
      case 'indigo':
        return 'bg-indigo-700 text-white';
      case 'purple':
        return 'bg-purple-700 text-white';
      case 'amber':
        return 'bg-amber-600 text-white';
      case 'rose':
        return 'bg-rose-700 text-white';
      default:
        return 'bg-slate-900 text-white';
    }
  };

  const objectiveColumns: Column<StrategicObjective>[] = [
    {
      header: 'Code',
      accessorKey: 'code',
      sortable: true,
      width: '110px',
      cell: (o) => (
        <div className="flex items-center space-x-1.5">
          <span className="font-mono font-bold text-slate-900">{o.code}</span>
          {o.isCustom && (
            <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
              NEW
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Strategic Objective',
      accessorKey: 'title',
      sortable: true,
      cell: (o) => (
        <div>
          <div className="font-semibold text-slate-900">{o.title}</div>
          {o.titleAr && <div className="text-[11px] text-slate-400 font-sans mt-0.5">{o.titleAr}</div>}
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
            <div className="bg-emerald-600 h-full transition-all" style={{ width: `${o.progress}%` }} />
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
      width: '110px',
      cell: (k) => (
        <div className="flex items-center space-x-1.5">
          <span className="font-mono font-bold text-slate-900">{k.code}</span>
          {k.isCustom && (
            <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
              NEW
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Indicator Name',
      accessorKey: 'name',
      sortable: true,
      cell: (k) => (
        <div>
          <div className="font-semibold text-slate-900">{k.name}</div>
          {k.formula && (
            <div className="text-[10px] font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded mt-0.5 max-w-sm truncate border border-slate-200/60">
              fx: {k.formula}
            </div>
          )}
          <div className="text-[10px] text-slate-400 truncate max-w-sm">{k.objectiveTitle}</div>
        </div>
      ),
    },
    {
      header: 'Targets (26/27)',
      sortable: false,
      cell: (k) => (
        <div className="text-[11px] font-mono">
          <span className="text-blue-700 font-bold">{k.target2026 || `${k.target} ${k.unit}`}</span>
          {k.target2027 && <span className="text-indigo-600 ml-1">/ {k.target2027}</span>}
        </div>
      ),
    },
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
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <Target className="w-4 h-4" />
            <span>AL AHSA DEVELOPMENT AUTHORITY • STRATEGY & GOVERNANCE</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Strategy Architecture & Cascading Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Vision: A Leader in Sustainable Development in Al-Ahsa — Cascaded Objectives, KPIs & Projects
          </p>
        </div>

        {/* Right Section: Tabs & New Strategy Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Tab Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'matrix' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Al-Ahsa Matrix</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${activeTab === 'matrix' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                CLIENT
              </span>
            </button>
            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'hierarchy' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hierarchy Tree ({themes.length})
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
              KPIs ({kpis.length})
            </button>
            <button
              onClick={() => setActiveTab('initiatives')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'initiatives' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Initiatives ({initiatives.length})
            </button>
            <button
              onClick={() => setActiveTab('structure')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1 ${
                activeTab === 'structure' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Org Structure</span>
            </button>
          </div>

          {/* Action Button: Create Strategy */}
          <Link
            to="/strategy/create"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Create Strategy</span>
          </Link>
        </div>
      </div>

      {/* Metrics & Strategy Architecture Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Strategic Pillars</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">{themes.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Core organizational themes</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Alignment Goals</div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">{goals.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">High-level milestones</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Target Objectives</div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">{objectives.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Active OKRs in flight</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Tracked KPIs</div>
          <div className="text-xl font-bold font-mono text-indigo-700 mt-1">{kpis.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Telemetry indicators</div>
        </div>

        <div className="col-span-2 sm:col-span-4 lg:col-span-1 bg-gradient-to-br from-slate-900 to-blue-950 p-4 rounded-xl text-white shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-blue-300 uppercase font-semibold">Allocated Budget</span>
            <DollarSign className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white mt-1">
            SAR {(totalBudget / 1000000).toFixed(1)}M
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Spent: SAR {(totalSpent / 1000000).toFixed(1)}M
          </div>
        </div>
      </div>

      {/* TAB 0: CLIENT AL-AHSA STRATEGY MATRIX */}
      {activeTab === 'matrix' && <ClientStrategyMatrix />}

      {/* TAB 1: STRATEGY HIERARCHY TREE */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6">
          {themes.map((theme) => {
            const themeGoals = goals.filter((g) => g.themeId === theme.id);
            const themeObjectives = objectives.filter((o) => o.themeId === theme.id);
            const colorClass = getThemeColorClass(theme.color);

            return (
              <div
                key={theme.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4 transition-all hover:border-slate-300"
              >
                {/* Theme Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded shadow-2xs ${colorClass}`}>
                        {theme.code}
                      </span>
                      <h2 className="text-base font-bold text-slate-900">{theme.title}</h2>
                      {theme.isCustom && (
                        <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1 shadow-2xs">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>Dynamic Strategy</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{theme.description}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      Weight: {theme.weight}%
                    </span>
                    {theme.isCustom && (
                      <button
                        onClick={() => deleteStrategyTheme(theme.id)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete this dynamic strategy"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Strategic Goals & Objectives nested list */}
                <div className="pl-2 sm:pl-4 space-y-4 border-l-2 border-slate-200">
                  {themeGoals.length === 0 ? (
                    <div className="text-xs text-slate-400 italic py-2">No nested goals registered under this theme.</div>
                  ) : (
                    themeGoals.map((goal) => {
                      const goalObjs = themeObjectives.filter((o) => o.goalId === goal.id);

                      return (
                        <div key={goal.id} className="space-y-3">
                          <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                            <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
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
                                    <div className="flex items-center space-x-1.5">
                                      <span className="font-mono font-bold text-xs text-slate-900">
                                        {obj.code}
                                      </span>
                                      {obj.isCustom && (
                                        <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                                          NEW
                                        </span>
                                      )}
                                    </div>
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
                    })
                  )}
                </div>
              </div>
            );
          })}

          {/* Quick Create Prompt at Bottom of Tree */}
          <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Add Another Strategic Pillar</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-0.5">
                Formulate and deploy dynamic enterprise strategies with custom goals, target OKRs, and KPIs.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-1">
              <Link
                to="/strategy/create"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Strategy</span>
              </Link>
              <button
                type="button"
                onClick={resetStrategies}
                className="inline-flex items-center space-x-1.5 px-3 py-2 border border-slate-200 hover:bg-white text-slate-600 rounded-xl text-xs font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Strategies</span>
              </button>
            </div>
          </div>
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
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {init.code}
                    </span>
                    <StatusBadge status={init.status} />
                    {init.isCustom && (
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        NEW INITIATIVE
                      </span>
                    )}
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
                  {init.milestones?.map((m) => (
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

      {/* TAB 5: AUTHORITY OPERATIONAL STRUCTURE VIEW */}
      {activeTab === 'structure' && <OperationalStructureView />}
    </div>
  );
};
