import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Heatmap5x5 } from '../components/common/Heatmap5x5';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { RiskItem, StrategicInitiative } from '../types';
import { PERFORMANCE_MONTHLY_TRENDS } from '../data/mockData';
import { ExecutiveBriefModal } from '../components/modals/ExecutiveBriefModal';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Target,
  ShieldAlert,
  CheckCircle2,
  Activity,
  ListTodo,
  TrendingUp,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Printer,
  Download,
} from 'lucide-react';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const {
    risks,
    objectives,
    initiatives,
    kpis,
    actions,
    bcmProcesses,
    openModal,
    setSelectedFilter,
    permissions,
    lang,
    t,
  } = useApp();

  const navigate = useNavigate();
  const [isExecutiveBriefOpen, setIsExecutiveBriefOpen] = useState(false);

  const openRisks = risks.filter((r) => r.status !== 'Closed');
  const criticalRisks = risks.filter((r) => r.inherentScore >= 16);
  const onTrackObjectives = objectives.filter((o) => o.status === 'on-track' || o.status === 'achieved');
  const criticalActions = actions.filter((a) => a.priority === 'Critical');

  const riskTableColumns: Column<RiskItem>[] = [
    {
      header: 'Risk Code',
      accessorKey: 'code',
      sortable: true,
      width: '120px',
      cell: (r) => <span className="font-mono font-bold text-slate-900">{r.code}</span>,
    },
    {
      header: 'Title & Narrative',
      accessorKey: 'title',
      sortable: true,
      cell: (r) => (
        <div>
          <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
            {r.title}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">{t(r.department)}</div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
      sortable: true,
      cell: (r) => (
        <span className="text-xs px-2 py-0.5 rounded font-mono bg-slate-100 text-slate-700">
          {r.category}
        </span>
      ),
    },
    {
      header: 'Inherent',
      accessorKey: 'inherentScore',
      sortable: true,
      width: '90px',
      cell: (r) => (
        <StatusBadge
          status={`Score ${r.inherentScore}`}
          variant="risk"
        />
      ),
    },
    {
      header: 'Residual',
      accessorKey: 'residualScore',
      sortable: true,
      width: '90px',
      cell: (r) => (
        <span className="font-mono font-bold text-slate-900 text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
          {r.residualScore}
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

  const objectivePieData = [
    { name: t('Achieved'), value: objectives.filter((o) => o.status === 'achieved').length, color: '#1d4ed8' },
    { name: t('On Track'), value: objectives.filter((o) => o.status === 'on-track').length, color: '#3b82f6' },
    { name: t('At Risk'), value: objectives.filter((o) => o.status === 'at-risk').length, color: '#f59e0b' },
    { name: t('Behind'), value: objectives.filter((o) => o.status === 'behind').length, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Banner / Authority Welcome */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 rounded-2xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 19 من 20 • دورة حياة الاستراتيجية' : 'STAGE 19 OF 20 • STRATEGIC LIFECYCLE'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{t('ENTERPRISE EXECUTIVE COMMAND CENTER')}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-sans">
              {t('Strategic & Risk Governance Dashboard')}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {t('Integrated real-time oversight of Institutional Performance (88.4%), NCA ECC Compliance (96.5%), 5×5 Enterprise Risk Exposure & BCM Operational Readiness.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsExecutiveBriefOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold text-xs transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-300" />
              <span>{lang === 'ar' ? 'تقرير تنفيذي (PDF/طباعة)' : 'Executive Brief (PDF)'}</span>
            </button>

            {permissions.canCreateRisk && (
              <button
                onClick={() => openModal('create_risk')}
                className="px-3.5 py-2 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                {t('Log Risk')}
              </button>
            )}
            {permissions.canCreateAction && (
              <button
                onClick={() => openModal('create_action')}
                className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <ListTodo className="w-4 h-4" />
                {t('New Action Plan')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top 8 Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Institutional Performance"
          value="88.4%"
          subtext="Target: 85.0% (+3.4% Surplus)"
          trend={{ value: '+4.2%', direction: 'up', label: 'vs last Qtr' }}
          icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
          badgeText="EXCEEDING TARGET"
          badgeColor="blue"
          accentColor="bg-blue-600"
          onClick={() => navigate('/performance')}
        />

        <StatCard
          title="Strategic Objectives On-Track"
          value={`${onTrackObjectives.length} / ${objectives.length}`}
          subtext="12 High Impact Strategic Goals"
          trend={{ value: '83.3%', direction: 'up', label: 'Completion index' }}
          icon={<Target className="w-5 h-5 text-blue-600" />}
          badgeText="ON TRACK"
          badgeColor="blue"
          accentColor="bg-blue-600"
          onClick={() => navigate('/strategy')}
        />

        <StatCard
          title="Active Enterprise Risks"
          value={openRisks.length}
          subtext={`${criticalRisks.length} Critical (Score ≥16)`}
          trend={{ value: '-2 Risks', direction: 'down', label: 'post-mitigation' }}
          icon={<ShieldAlert className="w-5 h-5 text-rose-600" />}
          badgeText={criticalRisks.length > 0 ? 'CRITICAL EXPOSURE' : 'MODERATE'}
          badgeColor={criticalRisks.length > 0 ? 'rose' : 'amber'}
          accentColor="bg-rose-500"
          onClick={() => navigate('/enterprise-risk')}
        />

        <StatCard
          title="NCA ECC Cybersecurity Compliance"
          value="96.5%"
          subtext="108 of 112 Mandatory Controls"
          trend={{ value: '+2.1%', direction: 'up', label: 'Audit verified' }}
          icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
          badgeText="HIGH COMPLIANCE"
          badgeColor="blue"
          accentColor="bg-blue-600"
          onClick={() => navigate('/compliance')}
        />

        <StatCard
          title="Active Strategic Initiatives"
          value={initiatives.length}
          subtext="Total Allocated: SAR 385.0M"
          trend={{ value: '72% Spent', direction: 'neutral', label: 'SAR 277.2M' }}
          icon={<Layers className="w-5 h-5 text-blue-600" />}
          badgeText="IN EXECUTION"
          badgeColor="blue"
          onClick={() => navigate('/strategy')}
        />

        <StatCard
          title="Pending Action Items"
          value={actions.length}
          subtext={`${criticalActions.length} Critical Priority`}
          trend={{ value: '14 Completed', direction: 'up', label: 'this month' }}
          icon={<ListTodo className="w-5 h-5 text-amber-600" />}
          badgeText="ACTIVE EXECUTION"
          badgeColor="amber"
          onClick={() => navigate('/actions')}
        />

        <StatCard
          title="BCM Operational Readiness"
          value="91.6%"
          subtext="12 Mission Critical Processes"
          trend={{ value: '100% Tested', direction: 'up', label: 'Q3 Tabletop' }}
          icon={<Activity className="w-5 h-5 text-blue-600" />}
          badgeText="ISO 22301 READY"
          badgeColor="blue"
          onClick={() => navigate('/bcm')}
        />

        <StatCard
          title="Regulatory Audit Findings"
          value="4 Open"
          subtext="0 High Severity Findings"
          trend={{ value: '-3 Closed', direction: 'up', label: 'remediated' }}
          icon={<Shield className="w-5 h-5 text-blue-600" />}
          badgeText="AUDIT CLEAN"
          badgeColor="blue"
          onClick={() => navigate('/compliance')}
        />
      </div>

      {/* Main Center Grid: Heatmap + Strategic Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Heatmap Section */}
        <div className="lg:col-span-7 space-y-4">
          <Heatmap5x5
            risks={risks}
            onSelectCell={(lh, imp) => {
              setSelectedFilter({});
              navigate('/enterprise-risk');
            }}
          />
        </div>

        {/* Strategic Performance Trend Chart */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="panel-title text-slate-900">{t('Institutional OKR Trajectory')}</h3>
                <p className="text-xs text-slate-500">{t('2026 Monthly Strategy Execution vs Target')}</p>
              </div>
              <button
                onClick={() => navigate('/performance')}
                className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{t('Analytics')}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="h-56 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_MONTHLY_TRENDS}>
                  <defs>
                    <linearGradient id="colorStrategy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="strategy"
                    name={t('Strategy Progress %')}
                    stroke="#2563eb"
                    fillOpacity={1}
                    fill="url(#colorStrategy)"
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>{t('Target Index: 85.0%')}</span>
            <span className="text-blue-700 font-bold">{t('Current Actual: 88.4%')}</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: High Inherent Risks Table & Initiatives Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <DataTable
            data={openRisks.slice(0, 5)}
            columns={riskTableColumns}
            title="Priority Enterprise Risks (Requires Leadership Attention)"
            subtitle="Top inherent score risks monitored by ERM Risk Management Committee"
            searchPlaceholder="Search priority risks..."
            onRowClick={(r) => openModal('risk', r)}
            primaryAction={
              permissions.canCreateRisk
                ? {
                    label: 'Register Risk',
                    onClick: () => openModal('create_risk'),
                    icon: <ShieldAlert className="w-3.5 h-3.5" />,
                  }
                : undefined
            }
          />
        </div>

        {/* Objective Status Distribution */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="panel-title text-slate-900">{t('Strategic Objectives Portfolio')}</h3>
              <button
                onClick={() => navigate('/strategy')}
                className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
              >
                {t('View Tree')}
              </button>
            </div>

            <div className="h-44 mt-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={objectivePieData}
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {objectivePieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <div className="text-xl font-bold font-mono text-slate-900">{objectives.length}</div>
                <div className="text-[10px] text-slate-400 font-mono uppercase">{t('Objectives')}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2">
              {objectivePieData.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-600 text-[11px]">{d.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={19}
        stageTitle="Executive Strategic Command Dashboard & Leadership Reporting"
        stageTitleAr="لوحة القيادة الاستراتيجية التنفيذية والتقارير القيادية"
        prevStage={{
          stage: 18,
          title: "Corrective Action Plans",
          titleAr: "الخطط والإجراءات التصحيحية",
          path: "/actions",
        }}
        nextStage={{
          stage: 20,
          title: "Strategy Review & Revision",
          titleAr: "المراجعة الاستراتيجية والتعديل",
          path: "/strategy/review",
        }}
        relatedLinks={[
          { title: "Strategy Matrix", titleAr: "مصفوفة الاستراتيجية", path: "/strategy" },
          { title: "Performance Engine", titleAr: "محرك الأداء", path: "/performance" },
          { title: "Personal Workspace", titleAr: "مساحة العمل", path: "/workspace" },
        ]}
      />

      {/* Executive Strategic Dossier & PDF Modal */}
      <ExecutiveBriefModal
        isOpen={isExecutiveBriefOpen}
        onClose={() => setIsExecutiveBriefOpen(false)}
      />
    </div>
  );
};
