import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { Heatmap5x5 } from '../components/common/Heatmap5x5';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { RiskItem, StrategicInitiative, KPI, ActionItem } from '../types';
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
  LineChart,
  Line,
  BarChart,
  Bar,
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
  Building,
  Users,
  Compass,
  Crown,
  FileCheck2,
  Clock,
  Gauge,
  Briefcase,
  AlertTriangle,
} from 'lucide-react';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';
import { useNavigate } from 'react-router-dom';

type DashboardLevel = 'executive' | 'strategy' | 'grc' | 'bcm' | 'department';

export const DashboardPage: React.FC = () => {
  const {
    risks,
    objectives,
    initiatives,
    kpis,
    actions,
    bcmProcesses,
    openModal,
    currentUser,
    permissions,
    lang,
    t,
  } = useApp();

  const navigate = useNavigate();
  const [isExecutiveBriefOpen, setIsExecutiveBriefOpen] = useState(false);

  // Auto-detect dashboard level based on user role, or let them switch
  const initialLevel: DashboardLevel = useMemo(() => {
    const role = currentUser.role;
    if (role === 'Strategy Specialist' || role === 'Strategy Manager') return 'strategy';
    if (role === 'GRC & Enterprise Risk' || role === 'Risk Manager' || role === 'Compliance Manager') return 'grc';
    if (role === 'BCM Manager') return 'bcm';
    if (role === 'Sector Director General' || role === 'Department Manager') return 'department';
    return 'executive';
  }, [currentUser.role]);

  const [activeLevel, setActiveLevel] = useState<DashboardLevel>(initialLevel);

  // KPIs & Objectives calculations
  const onTrackObjectives = objectives.filter((o) => o.status === 'on-track' || o.status === 'achieved');
  const criticalRisks = risks.filter((r) => r.inherentScore >= 16);
  const criticalActions = actions.filter((a) => a.priority === 'Critical');

  // BSC 4 Perspectives calculation for Corporate Scorecard (Corporater Style Image 2)
  const bscPerspectives = [
    {
      id: 'financial',
      name: 'Financial & Investment',
      nameAr: 'المنظور المالي والاستثماري',
      score: 84,
      trend: 'up',
      color: 'blue',
      objectives: [
        { name: 'Maximize Regional Tourism GDP Contribution', nameAr: 'تعظيم مساهمة الناتج السياحي في الاقتصاد الإقليمي', status: 'on-track' },
        { name: 'Attract SAR 12B+ in Private Sector Capital', nameAr: 'جذب أكثر من 12 مليار ريال استثمارات للقطاع الخاص', status: 'on-track' },
        { name: 'Accelerate Municipal Revenue Diversification', nameAr: 'تنويع الإيرادات الذاتية للبلديات والمرافق', status: 'critical' },
      ],
    },
    {
      id: 'customer',
      name: 'Stakeholders & Residents',
      nameAr: 'منظور أصحاب المصلحة والمستفيدين',
      score: 89,
      trend: 'up',
      color: 'teal',
      objectives: [
        { name: 'Enhance Regional Quality of Life Index', nameAr: 'رفع مؤشر جودة الحياة ومستوى رضا سكان الواحة', status: 'on-track' },
        { name: 'Deliver World-Class Heritage Visitor Experience', nameAr: 'تقديم تجربة زيارة تراثية وسياحية بمعايير عالمية', status: 'on-track' },
        { name: 'Foster Community Artisan Co-Ops', nameAr: 'تمكين الحرفيين والجمعيات التعاونية المحلية', status: 'warning' },
      ],
    },
    {
      id: 'internal',
      name: 'Internal Spatial & Processes',
      nameAr: 'منظور العمليات والتخطيط المكاني',
      score: 76,
      trend: 'down',
      color: 'indigo',
      objectives: [
        { name: 'Consolidate Unified Spatial Planning Permitting', nameAr: 'توحيد ضوابط التخطيط المكاني وتصاريح البناء', status: 'warning' },
        { name: 'Rehabilitate Historic Canal Networks', nameAr: 'إعادة تأهيل وصيانة قنوات الري التراثية', status: 'critical' },
        { name: 'Deploy Regional GIS Digital Twin', nameAr: 'تشغيل التوأم الرقمي الإقليمي ونظم المعلومات الجغرافية', status: 'on-track' },
      ],
    },
    {
      id: 'capacity',
      name: 'Organizational Capacity & Innovation',
      nameAr: 'منظور القدرات المؤسسية والابتكار',
      score: 92,
      trend: 'up',
      color: 'purple',
      objectives: [
        { name: 'Recruit & Retain High-Caliber Saudi Talent', nameAr: 'استقطاب وتمكين الكفاءات الوطنية المتخصصة', status: 'on-track' },
        { name: 'Attain ISO 9001 & 22301 Certifications', nameAr: 'الحصول على شهادات الجودة واستمرارية الأعمال الدولية', status: 'on-track' },
        { name: 'Institutionalize Continuous Strategy Governance', nameAr: 'مأسسة حوكمة ودورات مراجعة وتحديث الاستراتيجية', status: 'on-track' },
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Top Welcome Banner with Level Identifier */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 rounded-2xl p-6 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 19 من 20 • دورة حياة الاستراتيجية' : 'STAGE 19 OF 20 • STRATEGIC LIFECYCLE'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{t('ENTERPRISE EXECUTIVE COMMAND CENTER')}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {activeLevel === 'strategy'
                ? (lang === 'ar' ? 'لوحة تحكم إدارة الاستراتيجية والأداء' : 'Strategy Specialist & Performance Command')
                : activeLevel === 'grc'
                ? (lang === 'ar' ? 'لوحة تحكم الحوكمة والمخاطر والالتزام (GRC)' : 'GRC & Enterprise Risk Governance Dashboard')
                : activeLevel === 'bcm'
                ? (lang === 'ar' ? 'لوحة تحكم استمرارية الأعمال والجاهزية (BCM)' : 'Business Continuity & Disaster Resilience Dashboard')
                : activeLevel === 'department'
                ? (lang === 'ar' ? 'لوحة تحكم الإدارات التشغيلية' : 'Departmental Operations & Scorecard Dashboard')
                : (lang === 'ar' ? 'مركز القيادة الاستراتيجية والتنفيذية للهيئة' : 'Executive Leadership & Strategy Governance Dashboard')}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {activeLevel === 'strategy'
                ? (lang === 'ar'
                  ? 'رؤية مركزة على صياغة ومتابعة الأهداف والمؤشرات والمبادرات ومواءمة بطاقة الأداء دون تداخل مع بيانات المخاطر أو استمرارية الأعمال.'
                  : 'Isolated, uncluttered oversight of Strategic Objectives, KPIs, Initiatives, and Balanced Scorecards for strategy practitioners.')
                : activeLevel === 'grc'
                ? (lang === 'ar'
                  ? 'رصد وإدارة سجل المخاطر المؤسسية ومصفوفة 5×5 ونسب معالجة المخاطر ومستوى الالتزام بضوابط الأمن والأنظمة الوطنية.'
                  : 'Enterprise Risk Management (ERM), 5x5 heatmap, mitigation treatment, and regulatory compliance audit oversight.')
                : activeLevel === 'bcm'
                ? (lang === 'ar'
                  ? 'تحليل الأثر على الأعمال (BIA) ومؤشرات RTO/RPO واختبارات الجاهزية التشغيلية للطوارئ واستمرارية الخدمات.'
                  : 'Business Impact Analysis (BIA), critical process recovery, RTO/RPO metrics, and emergency response readiness.')
                : (lang === 'ar'
                  ? 'لوحة القيادة الموحدة: استعراض شامل للأداء المؤسسي (88.4%)، والالتزام التنظيمي (96.5%)، ومصفوفة المخاطر، والخطط التصحيحية.'
                  : 'Unified executive oversight of Institutional Performance (88.4%), Compliance (96.5%), Enterprise Risk & BCM readiness.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsExecutiveBriefOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'الموجز التنفيذي الذكي' : 'Executive AI Brief'}</span>
            </button>
            <button
              onClick={() => navigate('/performance')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <span>{lang === 'ar' ? 'تحليل الأداء التفصيلي' : 'Deep Performance View'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Persona / Level Switcher Navigation Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
            <span>{lang === 'ar' ? 'تخصيص العرض حسب المستوى:' : 'Role-Tailored View Level:'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'executive', label: 'CEO / Board', labelAr: 'الرئيس التنفيذي / القيادة', icon: Crown },
              { id: 'strategy', label: 'Strategy Specialist', labelAr: 'أخصائي الاستراتيجية', icon: Target },
              { id: 'grc', label: 'GRC Specialist', labelAr: 'أخصائي الحوكمة والمخاطر', icon: ShieldAlert },
              { id: 'bcm', label: 'BCM Specialist', labelAr: 'أخصائي استمرارية الأعمال', icon: Activity },
              { id: 'department', label: 'Department Lead', labelAr: 'مدراء الإدارات', icon: Building },
            ].map((lvl) => {
              const Icon = lvl.icon;
              const isSelected = activeLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevel(lvl.id as DashboardLevel)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? lvl.labelAr : lvl.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. STRATEGY SPECIALIST & MANAGER LEVEL DASHBOARD (UNCROWDED)   */}
      {/* ============================================================== */}
      {activeLevel === 'strategy' && (
        <div className="space-y-6">
          {/* Quick Statistics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border-l-4 border-l-blue-600 border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                {lang === 'ar' ? 'الأهداف الاستراتيجية' : 'Overall Objectives'}
              </span>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1">
                {Math.round((onTrackObjectives.length / Math.max(1, objectives.length)) * 100)}%
              </div>
              <span className="text-xs text-slate-500">{objectives.length} Objectives Defined</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border-l-4 border-l-amber-500 border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                {lang === 'ar' ? 'مؤشرات الأداء (KPIs)' : 'Overall KPIs'}
              </span>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1">74%</div>
              <span className="text-xs text-slate-500">{kpis.length} Indicators Monitored</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border-l-4 border-l-emerald-600 border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                {lang === 'ar' ? 'المبادرات النشطة' : 'Overall Initiatives'}
              </span>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1">52%</div>
              <span className="text-xs text-slate-500">{initiatives.length} Strategic Programs</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border-l-4 border-l-purple-600 border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                {lang === 'ar' ? 'المواءمة المؤسسية' : 'Strategy Alignment'}
              </span>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1">88.4%</div>
              <span className="text-xs text-slate-500">Cascade Realization Rate</span>
            </div>
          </div>

          {/* Corporater-style Corporate Scorecard: 4 Perspectives Side-by-Side (Image 2) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === 'ar' ? 'بطاقة الأداء المؤسسي المتوازن (Corporate Scorecard)' : 'Corporate Balanced Scorecard'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ar'
                    ? 'الأداء المحقق ومؤشرات الأهداف عبر المحاور الأربعة لبطاقة الأداء المتوازن (BSC).'
                    : 'Performance achievement and objectives status across the 4 Balanced Scorecard perspectives.'}
                </p>
              </div>
              <button
                onClick={() => navigate('/strategy-map')}
                className="px-3.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'خريطة الاستراتيجية' : 'Strategy Map View'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {bscPerspectives.map((p) => (
                <div key={p.id} className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:shadow-xs transition-shadow">
                  <div>
                    {/* Perspective Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                          {lang === 'ar' ? p.nameAr : p.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">BSC Perspective</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shadow-2xs font-mono">
                        {p.score}%
                      </div>
                    </div>

                    {/* Objectives List with Status Dots */}
                    <div className="space-y-2.5 mt-3">
                      {p.objectives.map((obj, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs">
                          <span
                            className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                              obj.status === 'on-track'
                                ? 'bg-emerald-500'
                                : obj.status === 'warning'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                          />
                          <span className="text-slate-800 font-medium leading-snug">
                            {lang === 'ar' ? obj.nameAr : obj.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Target: 100%</span>
                    <span className="font-bold text-blue-700">Variance: -{100 - p.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Initiatives & KPI Variance Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strategic Initiatives Progression */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'ar' ? 'المبادرات الاستراتيجية ذات الأولوية' : 'Priority Strategic Initiatives'}</span>
                </div>
                <button
                  onClick={() => navigate('/initiatives')}
                  className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'عرض الكل' : 'View all'}
                </button>
              </div>

              <div className="space-y-3">
                {initiatives.slice(0, 4).map((init) => (
                  <div key={init.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-slate-900">{lang === 'ar' && init.titleAr ? init.titleAr : init.title}</div>
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {init.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full" style={{ width: `${init.progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{t(init.department)}</span>
                      <span>SAR {((init.budgetSAR || 0) / 1000000).toFixed(1)}M Budget</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic KPI Variance Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>{lang === 'ar' ? 'انحراف مؤشرات الأداء الرئيسية' : 'Key Strategic KPI Variances'}</span>
                </div>
                <button
                  onClick={() => navigate('/kpis')}
                  className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'عرض الكل' : 'View all'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                    <tr>
                      <th className="py-2 px-3">{lang === 'ar' ? 'المؤشر' : 'Indicator'}</th>
                      <th className="py-2 px-3 text-center">{lang === 'ar' ? 'الفعلي' : 'Actual'}</th>
                      <th className="py-2 px-3 text-center">{lang === 'ar' ? 'المستهدف' : 'Target'}</th>
                      <th className="py-2 px-3 text-center">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {kpis.slice(0, 5).map((k) => (
                      <tr key={k.id} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-900">{lang === 'ar' && k.nameAr ? k.nameAr : k.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{k.code}</div>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900">{k.actual} {k.unit}</td>
                        <td className="py-2.5 px-3 text-center font-mono text-slate-500">{k.target} {k.unit}</td>
                        <td className="py-2.5 px-3 text-center">
                          <StatusBadge status={k.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. GRC SPECIALIST LEVEL DASHBOARD                              */}
      {/* ============================================================== */}
      {activeLevel === 'grc' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title={lang === 'ar' ? 'إجمالي المخاطر المسجلة' : 'Total Identified Risks'}
              value={risks.length}
              icon={<ShieldAlert className="w-5 h-5 text-amber-600" />}
            />
            <StatCard
              title={lang === 'ar' ? 'المخاطر الحرجة' : 'Critical Exposure Risks'}
              value={criticalRisks.length}
              icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
            />
            <StatCard
              title={lang === 'ar' ? 'نسبة معالجة المخاطر' : 'Risks Treated Rate'}
              value="34%"
              icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
            />
            <StatCard
              title={lang === 'ar' ? 'الالتزام بضوابط NCA' : 'NCA ECC Compliance'}
              value="96.5%"
              icon={<Shield className="w-5 h-5 text-emerald-600" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <Heatmap5x5 risks={risks} />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">{lang === 'ar' ? 'سجل المخاطر المؤسسية الحرجة' : 'Critical Enterprise Risks'}</h3>
                <button onClick={() => navigate('/risk')} className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer">
                  {lang === 'ar' ? 'سجل المخاطر الكامل' : 'Open Risk Register'}
                </button>
              </div>
              <div className="space-y-2.5">
                {risks.slice(0, 5).map((r) => (
                  <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{r.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{r.code} • {t(r.department)}</div>
                    </div>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                      Score {r.inherentScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. BCM SPECIALIST LEVEL DASHBOARD                              */}
      {/* ============================================================== */}
      {activeLevel === 'bcm' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title={lang === 'ar' ? 'العمليات الحيوية (BIA)' : 'Critical BIA Processes'}
              value={bcmProcesses.length}
              icon={<Activity className="w-5 h-5 text-blue-600" />}
            />
            <StatCard
              title={lang === 'ar' ? 'متوسط زمن التعافي (RTO)' : 'Average Recovery RTO'}
              value="4.2 hrs"
              icon={<Clock className="w-5 h-5 text-indigo-600" />}
            />
            <StatCard
              title={lang === 'ar' ? 'قنوات الطوارئ البديلة' : 'Failover Systems Active'}
              value="100%"
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            />
            <StatCard
              title={lang === 'ar' ? 'تمارين الجاهزية المنفذة' : 'ISO 22301 Drills'}
              value="3 / 4"
              icon={<Shield className="w-5 h-5 text-purple-600" />}
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">{lang === 'ar' ? 'سجل العمليات الحيوية وتحليل الأثر على الأعمال (BIA)' : 'Critical BIA Processes & Recovery Targets'}</h3>
              <button onClick={() => navigate('/bcm')} className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer">
                {lang === 'ar' ? 'مركز استمرارية الأعمال الكامل' : 'Open BCM Center'}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Process Name</th>
                    <th className="py-2.5 px-3">RTO Target</th>
                    <th className="py-2.5 px-3">RPO Target</th>
                    <th className="py-2.5 px-3">Criticality</th>
                    <th className="py-2.5 px-3">Readiness</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {bcmProcesses.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-3 font-semibold text-slate-900">{p.processName}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{p.rtoHours} hrs</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{p.rpoHours} hrs</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          {p.criticality}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Verified ISO
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. EXECUTIVE / CEO LEVEL DASHBOARD (IMAGE 3 STRUCTURE)         */}
      {/* ============================================================== */}
      {(activeLevel === 'executive' || activeLevel === 'department') && (
        <div className="space-y-6">
          {/* Quick Statistics Strip (Image 3 Direct Alignment) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border-l-4 border-l-rose-600 border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                {lang === 'ar' ? 'الأهداف الاستراتيجية' : 'Overall Objectives'}
              </span>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1">74%</div>
              <span className="text-xs text-slate-500">Corporate Scorecard</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border-l-4 border-l-amber-500 border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                {lang === 'ar' ? 'مؤشرات الأداء المؤسسية' : 'Overall KPIs'}
              </span>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1">74%</div>
              <span className="text-xs text-slate-500">Authority Health Score</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border-l-4 border-l-rose-600 border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                {lang === 'ar' ? 'المبادرات الاستراتيجية' : 'Overall Initiatives'}
              </span>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1">52%</div>
              <span className="text-xs text-slate-500">Pace of Execution</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border-l-4 border-l-rose-600 border border-slate-200/80 shadow-xs">
              <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                {lang === 'ar' ? 'المخاطر المعالجة' : 'Risks Treated'}
              </span>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1">34%</div>
              <span className="text-xs text-slate-500">ERM Mitigation Rate</span>
            </div>
          </div>

          {/* Performance Monthly Trends Chart */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  {lang === 'ar' ? 'تحقيق مؤشرات الأداء عبر الأشهر (KPIs Achievement Over Period)' : 'KPIs Achievement Over The Period'}
                </h3>
                <span className="text-xs text-slate-500">June – December 2026 Trend Analysis</span>
              </div>
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                Current: 88.4%
              </span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_MONTHLY_TRENDS}>
                  <defs>
                    <linearGradient id="execPerformance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[70, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#1d4ed8"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#execPerformance)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Lifecycle Flow Progression */}
      <StrategicLifecycleProgression
        currentStage={19}
        stageTitle="Executive Dashboard"
        stageTitleAr="لوحة القيادة التنفيذية"
        prevStage={{ stage: 18, title: 'Corrective Actions', titleAr: 'الخطط التصحيحية', path: '/actions' }}
        nextStage={{ stage: 20, title: 'Strategic Review & Revision', titleAr: 'المراجعة وتحديث الاستراتيجية', path: '/strategy/review' }}
        relatedLinks={[
          { title: "Performance Scorecard", titleAr: "بطاقة الأداء", path: "/performance" },
          { title: "Strategy Map", titleAr: "خريطة الاستراتيجية", path: "/strategy-map" },
          { title: "Strategic Review", titleAr: "المراجعة الاستراتيجية", path: "/strategy/review" },
        ]}
      />

      <ExecutiveBriefModal
        isOpen={isExecutiveBriefOpen}
        onClose={() => setIsExecutiveBriefOpen(false)}
      />
    </div>
  );
};
