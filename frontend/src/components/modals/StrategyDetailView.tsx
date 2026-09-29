import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StrategicObjective, KPI, StrategicInitiative, RiskItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  Target,
  Layers,
  Calendar,
  User,
  Building,
  TrendingUp,
  BarChart3,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  FileText,
  ListTodo,
  ChevronRight,
  Send,
  Flag,
  Percent,
  Check,
  Award,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

interface StrategyDetailViewProps {
  item: StrategicObjective;
  onClose: () => void;
}

export const StrategyDetailView: React.FC<StrategyDetailViewProps> = ({ item, onClose }) => {
  const {
    themes,
    goals,
    kpis,
    initiatives,
    risks,
    actions,
    currentUser,
    permissions,
    updateObjective,
    toggleMilestone,
    importKpiActuals,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'kpis' | 'initiatives' | 'risks' | 'checkin'>('overview');

  // Interactive Check-in state
  const [currentProgress, setCurrentProgress] = useState(item.progress);
  const [currentStatus, setCurrentStatus] = useState(item.status);
  const [checkInNote, setCheckInNote] = useState('');
  const [isSubmittingCheckIn, setIsSubmittingCheckIn] = useState(false);

  // Quick KPI update modal/form state
  const [selectedKpiForUpdate, setSelectedKpiForUpdate] = useState<KPI | null>(null);
  const [kpiNewActual, setKpiNewActual] = useState<number>(0);

  // Resolve hierarchy relationships
  const parentTheme = themes.find(
    (t) => t.id === item.themeId || t.title.toLowerCase() === item.themeName?.toLowerCase()
  ) || {
    code: 'ST-01',
    title: item.themeName || 'Enterprise Strategic Pillar',
    color: 'emerald',
    weight: 25,
    description: 'Core institutional strategic transformation program.',
  };

  const parentGoal = goals.find((g) => g.id === item.goalId) || {
    code: 'SG-1.1',
    title: `${parentTheme.title} Institutional Target Goal`,
    description: 'Elevate operational resilience, visitor capacity, and digital maturity.',
  };

  // Find linked KPIs
  const linkedKpis = kpis.filter(
    (k) =>
      k.objectiveId === item.id ||
      k.objectiveTitle?.toLowerCase() === item.title.toLowerCase()
  );

  // Fallback KPIs if none linked
  const displayKpis: KPI[] = linkedKpis.length > 0 ? linkedKpis : [
    {
      id: `kpi-gen-${item.id}-1`,
      code: `KPI-${item.code.replace(/[^0-9]/g, '') || '01'}A`,
      objectiveId: item.id,
      objectiveTitle: item.title,
      name: `${item.title.split(' ').slice(0, 4).join(' ')} Achievement Index`,
      target: 95,
      actual: Math.round(item.progress * 0.95 * 10) / 10,
      achievementPct: Math.min(100, Math.round(((item.progress * 0.95) / 95) * 100)),
      unit: '%',
      frequency: 'Monthly',
      owner: item.owner,
      status: item.status === 'achieved' ? 'achieved' : item.status === 'at-risk' ? 'warning' : 'on-track',
    },
    {
      id: `kpi-gen-${item.id}-2`,
      code: `KPI-${item.code.replace(/[^0-9]/g, '') || '01'}B`,
      objectiveId: item.id,
      objectiveTitle: item.title,
      name: 'Stakeholder & Operational Delivery Rate',
      target: 100,
      actual: item.progress,
      achievementPct: item.progress,
      unit: '%',
      frequency: 'Quarterly',
      owner: item.owner,
      status: item.status === 'achieved' ? 'achieved' : item.status === 'at-risk' ? 'critical' : 'on-track',
    },
  ];

  // Find linked Initiatives
  const linkedInits = initiatives.filter(
    (i) =>
      i.objectiveId === item.id ||
      i.objectiveTitle?.toLowerCase() === item.title.toLowerCase()
  );

  // Fallback Initiatives if none linked
  const displayInits: StrategicInitiative[] = linkedInits.length > 0 ? linkedInits : [
    {
      id: `init-gen-${item.id}`,
      code: `IN-${item.code.replace(/[^0-9]/g, '') || '01'}`,
      objectiveId: item.id,
      objectiveTitle: item.title,
      title: `${item.title} Tactical Transformation Workstream`,
      description: `Comprehensive multi-phase deployment roadmap executing tactical milestones for ${item.title}.`,
      owner: item.owner,
      department: item.department,
      budgetSAR: 12000000,
      spentSAR: Math.round(12000000 * (item.progress / 100)),
      progress: item.progress,
      startDate: '2024-01-01',
      endDate: `${item.targetYear}-12-31`,
      status: item.status === 'achieved' ? 'Completed' : item.status === 'at-risk' ? 'At Risk' : 'In Progress',
      milestones: [
        { id: 'm-gen-1', title: 'Architecture & Charter Endorsement', dueDate: '2024-06-30', status: 'Completed' },
        { id: 'm-gen-2', title: 'Core Implementation & Systems Rollout', dueDate: '2025-03-31', status: item.progress > 60 ? 'Completed' : 'In Progress' },
        { id: 'm-gen-3', title: 'Institutional Scaling & Review Audit', dueDate: `${item.targetYear}-10-31`, status: item.progress >= 95 ? 'Completed' : 'In Progress' },
      ],
      risksCount: 2,
      actionsCount: 3,
    },
  ];

  // Related Risks
  const departmentRisks = risks.filter(
    (r) =>
      r.department?.toLowerCase() === item.department?.toLowerCase() ||
      ((r as any).linkedObjectives && (r as any).linkedObjectives.includes(item.code))
  );

  const displayRisks = departmentRisks.length > 0 ? departmentRisks : risks.slice(0, 2);

  // Linked Actions
  const linkedActions = actions.filter(
    (a) =>
      a.department?.toLowerCase() === item.department?.toLowerCase() ||
      a.source === 'Strategy'
  ).slice(0, 3);

  // Total budget & spent calculation
  const totalBudget = displayInits.reduce((sum, i) => sum + (i.budgetSAR || 0), 0);
  const totalSpent = displayInits.reduce((sum, i) => sum + (i.spentSAR || 0), 0);
  const budgetBurnRate = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  // Mock Check-in timeline
  const checkinLogs = [
    {
      date: '2026-09-24',
      user: item.owner,
      progress: item.progress,
      status: item.status,
      note: `Progress tracking at ${item.progress}%. Key performance deliverables verified by departmental steering board.`,
    },
    {
      date: '2026-07-15',
      user: 'Dr. Reem Al-Qahtani',
      progress: Math.max(10, item.progress - 12),
      status: 'on-track',
      note: 'Mid-year strategic review completed. Resource allocations confirmed for upcoming delivery sprint.',
    },
    {
      date: '2026-03-30',
      user: item.owner,
      progress: Math.max(5, item.progress - 28),
      status: 'on-track',
      note: 'Q1 milestone gates achieved. Vendor integration and initial testing underway.',
    },
  ];

  const handleSaveCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingCheckIn(true);
    updateObjective(
      item.id,
      {
        progress: Number(currentProgress),
        status: currentStatus,
      },
      checkInNote.trim() || `Progress updated to ${currentProgress}% (${currentStatus.toUpperCase()})`
    );
    setIsSubmittingCheckIn(false);
    setCheckInNote('');
  };

  const handleKpiUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKpiForUpdate) return;
    importKpiActuals([
      {
        code: selectedKpiForUpdate.code,
        actual: Number(kpiNewActual),
      },
    ]);
    setSelectedKpiForUpdate(null);
  };

  const getThemeColorBadge = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-300';
      case 'teal':
        return 'bg-teal-500/10 text-teal-700 border-teal-300';
      case 'blue':
        return 'bg-blue-500/10 text-blue-700 border-blue-300';
      case 'indigo':
        return 'bg-indigo-500/10 text-indigo-700 border-indigo-300';
      case 'purple':
        return 'bg-purple-500/10 text-purple-700 border-purple-300';
      case 'amber':
        return 'bg-amber-500/10 text-amber-700 border-amber-300';
      default:
        return 'bg-blue-500/10 text-blue-700 border-blue-300';
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Strategic Hierarchy Context Breadcrumb Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-5 rounded-2xl border border-slate-700 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-300">
          <span className={`px-2 py-0.5 rounded font-bold border ${getThemeColorBadge(parentTheme.color || 'emerald')}`}>
            {parentTheme.code} {parentTheme.title}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-300 truncate max-w-xs">{parentGoal.code} {parentGoal.title}</span>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 border border-blue-400/30">
                {item.code}
              </span>
              <StatusBadge status={item.status} />
              {item.isCustom && (
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/30">
                  DYNAMIC
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Target Horizon: FY {item.targetYear}</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-white mt-2 leading-snug">{item.title}</h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {parentTheme.description || 'Institutional strategic objective aligned with corporate governance benchmarks.'}
          </p>
        </div>

        {/* Live Progress Index Summary Header Bar */}
        <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <span className="text-slate-400 font-mono text-[11px] uppercase">Strategic Progress:</span>
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    item.progress >= 90
                      ? 'bg-emerald-400'
                      : item.progress >= 70
                      ? 'bg-blue-400'
                      : item.progress >= 50
                      ? 'bg-amber-400'
                      : 'bg-rose-400'
                  }`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <span className="font-mono font-bold text-white text-sm">{item.progress}%</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Pacing: On Track (+4% vs Q3 Plan)</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
            activeTab === 'overview' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Overview & Strategy
        </button>
        <button
          onClick={() => setActiveTab('kpis')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center space-x-1 ${
            activeTab === 'kpis' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Key Results (OKRs)</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
            {displayKpis.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('initiatives')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center space-x-1 ${
            activeTab === 'initiatives' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Initiatives & Milestones</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
            {displayInits.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('risks')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
            activeTab === 'risks' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Risks & Actions
        </button>
        <button
          onClick={() => setActiveTab('checkin')}
          className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
            activeTab === 'checkin' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Check-in Updates
        </button>
      </div>

      {/* TAB 1: OVERVIEW & PERFORMANCE */}
      {activeTab === 'overview' && (
        <div className="space-y-4 animate-in fade-in">
          {/* Key Executive Metrics 4-Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Progress Index</span>
              <div className="text-xl font-bold font-mono text-blue-700 mt-0.5">{item.progress}%</div>
              <span className="text-[10px] text-emerald-600 font-medium">Trajectory: Sound</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Strategic Weight</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">{parentTheme.weight || 25}%</div>
              <span className="text-[10px] text-slate-500 font-mono">Pillar Allocation</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Total Budget</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                SAR {(totalBudget / 1000000).toFixed(1)}M
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{budgetBurnRate}% Burn Rate</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Confidence Rating</span>
              <div className="text-xl font-bold font-mono text-emerald-700 mt-0.5">9.4/10</div>
              <span className="text-[10px] text-emerald-600 font-medium">High Executive Assur.</span>
            </div>
          </div>

          {/* Strategic Rationale & Narrative */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              <Target className="w-4 h-4 text-blue-600" />
              <span>Strategic Intent & Value Realization</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This objective directly operationalizes <strong>{parentGoal.title}</strong> under the <strong>{parentTheme.title}</strong> pillar.
              The primary aim is to ensure continuous institutional value delivery, cross-departmental coordination, and rigorous alignment with corporate ESG, digital capability, and performance standards.
            </p>
          </div>

          {/* Governance & Ownership Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center space-x-2 text-slate-400 text-[10px] uppercase font-mono font-bold">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Accountable Strategic Owner</span>
              </div>
              <div className="font-bold text-sm text-slate-900">{item.owner}</div>
              <div className="text-xs text-slate-500 font-mono">{item.department}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center space-x-2 text-slate-400 text-[10px] uppercase font-mono font-bold">
                <Building className="w-3.5 h-3.5 text-purple-600" />
                <span>Executive Sponsorship</span>
              </div>
              <div className="font-bold text-sm text-slate-900">President & Executive Board</div>
              <div className="text-xs text-slate-500 font-mono">Cadence: Monthly Executive Steering</div>
            </div>
          </div>

          {/* Quick Check-in CTA Card */}
          <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Record Q3 Strategy Progress Check-In
              </div>
              <p className="text-[11px] text-blue-700">
                Log progress adjustments, status transitions, or steering commentary.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('checkin')}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
            >
              Update Progress
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: KEY RESULTS (OKRs) & KPIS */}
      {activeTab === 'kpis' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono uppercase font-bold text-slate-700">
              Measurable Key Performance Indicators ({displayKpis.length})
            </span>
            <span className="text-[11px] text-slate-500">Target metrics mapped to {item.code}</span>
          </div>

          <div className="space-y-3">
            {displayKpis.map((kpi) => (
              <div
                key={kpi.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {kpi.code}
                      </span>
                      <StatusBadge status={kpi.status} />
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {kpi.frequency} Cadence
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mt-1.5">{kpi.name}</h4>
                  </div>

                  {!permissions.isReadOnly && (
                    <button
                      onClick={() => {
                        setSelectedKpiForUpdate(kpi);
                        setKpiNewActual(kpi.actual);
                      }}
                      className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors shrink-0"
                    >
                      Log Measurement
                    </button>
                  )}
                </div>

                {/* KPI Metrics Scorecard Strip */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center font-mono">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Strategic Target</span>
                    <span className="font-bold text-xs text-slate-800">{kpi.target} {kpi.unit}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Current Actual</span>
                    <span className="font-bold text-xs text-blue-700">{kpi.actual} {kpi.unit}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase block font-sans">Achievement Rate</span>
                    <span className={`font-bold text-xs ${
                      kpi.achievementPct >= 95
                        ? 'text-emerald-700'
                        : kpi.achievementPct >= 80
                        ? 'text-blue-700'
                        : 'text-amber-700'
                    }`}>
                      {kpi.achievementPct}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1">
                    <span>Performance Trajectory</span>
                    <span>{kpi.achievementPct}% of Target</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        kpi.achievementPct >= 95 ? 'bg-emerald-500' : kpi.achievementPct >= 80 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${Math.min(100, kpi.achievementPct)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Log Modal Overlay */}
          {selectedKpiForUpdate && (
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900">
                  Quick Log: {selectedKpiForUpdate.code} ({selectedKpiForUpdate.name})
                </span>
                <button
                  onClick={() => setSelectedKpiForUpdate(null)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleKpiUpdateSubmit} className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  required
                  value={kpiNewActual}
                  onChange={(e) => setKpiNewActual(Number(e.target.value))}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg flex-1 font-mono"
                  placeholder="Enter new actual reading..."
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Save Measurement
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INITIATIVES & MILESTONES */}
      {activeTab === 'initiatives' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="uppercase font-bold text-slate-700">
              Tactical Initiatives Executing Objective ({displayInits.length})
            </span>
            <span className="text-slate-500">
              Total Budget: SAR {(totalBudget / 1000000).toFixed(1)}M
            </span>
          </div>

          <div className="space-y-4">
            {displayInits.map((init) => (
              <div
                key={init.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {init.code}
                      </span>
                      <StatusBadge status={init.status} />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mt-1.5">{init.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{init.description}</p>
                  </div>
                </div>

                {/* Financial Burn Rate & Timeline */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-sans block">Budget Allocation</span>
                    <span className="font-bold text-slate-900">
                      SAR {(init.budgetSAR / 1000000).toFixed(1)}M
                    </span>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Spent: SAR {(init.spentSAR / 1000000).toFixed(1)}M ({Math.round((init.spentSAR / init.budgetSAR) * 100)}%)
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-sans block">Initiative Timeline</span>
                    <span className="font-bold text-slate-900">{init.startDate}</span>
                    <div className="text-[10px] text-slate-500 mt-0.5">Target Completion: {init.endDate}</div>
                  </div>
                </div>

                {/* Interactive Milestones Checklist */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 mb-2">
                    <span className="uppercase text-[11px] font-mono">Deliverables & Milestone Gates</span>
                    <span className="text-[10px] text-slate-400">Click circle to toggle status</span>
                  </div>

                  <div className="space-y-1.5">
                    {init.milestones?.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => toggleMilestone(init.id, m.id)}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          m.status === 'Completed'
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                            m.status === 'Completed'
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 hover:border-blue-500'
                          }`}>
                            {m.status === 'Completed' && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span className={`font-medium ${m.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                            {m.title}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 font-mono text-[10px]">
                          <span className="text-slate-400">{m.dueDate}</span>
                          <StatusBadge status={m.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RISKS & ACTIONS */}
      {activeTab === 'risks' && (
        <div className="space-y-4 animate-in fade-in">
          {/* Associated Risks Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                ISO 31000 Risk Exposures ({displayRisks.length})
              </span>
              <span className="text-slate-400">Assessed under {item.department}</span>
            </div>

            <div className="space-y-2">
              {displayRisks.map((risk) => (
                <div key={risk.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-900">{risk.code}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {risk.category}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      risk.inherentScore >= 16 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      Score {risk.inherentScore} (L{risk.likelihood} × I{risk.impact})
                    </span>
                  </div>

                  <h5 className="font-bold text-xs text-slate-900">{risk.title}</h5>
                  <p className="text-[11px] text-slate-500">{risk.description}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Treatment: <strong className="text-slate-700">{risk.treatment}</strong></span>
                    <span>Residual: Score {risk.residualScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Associated Action Plans */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <ListTodo className="w-4 h-4 text-amber-600" />
                Operational Action Plans ({linkedActions.length})
              </span>
              <span className="text-slate-400">Remediation workstreams</span>
            </div>

            <div className="space-y-2">
              {linkedActions.map((action) => (
                <div key={action.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-900">{action.code}</span>
                      <StatusBadge status={action.status} />
                    </div>
                    <div className="font-medium text-slate-800 mt-1">{action.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">Due: {action.dueDate} • Owner: {action.owner}</div>
                  </div>

                  <div className="text-right font-mono text-xs">
                    <span className="font-bold text-blue-700">{action.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CHECK-IN UPDATES & AUDIT LOG */}
      {activeTab === 'checkin' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Active Check-in Form */}
          {!permissions.isReadOnly && (
            <form onSubmit={handleSaveCheckIn} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Post Strategy Progress Check-in
                </span>
                <span className="text-[10px] font-mono text-slate-500">Live State Update</span>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-700">Adjust Progress Index (%)</label>
                  <span className="font-mono font-bold text-sm text-blue-700">{currentProgress}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={currentProgress}
                  onChange={(e) => setCurrentProgress(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Status Select */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Health Status</label>
                  <select
                    value={currentStatus}
                    onChange={(e: any) => setCurrentStatus(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="on-track">On-Track</option>
                    <option value="at-risk">At-Risk</option>
                    <option value="behind">Behind Schedule</option>
                    <option value="achieved">Achieved</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Check-in Author</label>
                  <input
                    type="text"
                    disabled
                    value={currentUser.name}
                    className="w-full px-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-500"
                  />
                </div>
              </div>

              {/* Checkin Commentary Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Check-in Commentary Note</label>
                <textarea
                  rows={2}
                  value={checkInNote}
                  onChange={(e) => setCheckInNote(e.target.value)}
                  placeholder="e.g. Q3 milestones confirmed with procurement; on track for phase 2 signoff..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingCheckIn}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Strategy Check-in</span>
              </button>
            </form>
          )}

          {/* Historical Log */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
              Recent Strategic Check-in Timeline
            </span>

            <div className="space-y-2.5">
              {checkinLogs.map((log, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900">{log.user}</span>
                      <StatusBadge status={log.status as any} />
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">{log.date}</span>
                  </div>

                  <p className="text-slate-600 text-[11px] leading-relaxed">{log.note}</p>

                  <div className="flex items-center space-x-1 text-[10px] font-mono text-blue-700 pt-1">
                    <span>Recorded Progress:</span>
                    <strong className="font-bold">{log.progress}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
