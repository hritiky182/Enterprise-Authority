import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Layers,
  ArrowRight,
  Shield,
  FileCheck,
  History,
  GitCompare,
  Plus,
  AlertCircle,
  TrendingUp,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

export const PlanningCyclePage: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t, strategyPlan, setDemoJourneyStep } = useApp();

  const [horizonYears, setHorizonYears] = useState({ start: 2026, end: 2030 });
  const [selectedCycle, setSelectedCycle] = useState<'FY2026' | 'FY2025'>('FY2026');
  const [compareMode, setCompareMode] = useState(true);

  // Reporting Periods
  const [periods, setPeriods] = useState([
    {
      code: 'Q1-2026',
      name: 'First Quarter (Q1)',
      nameAr: 'الربع الأول (Q1)',
      window: 'Jan 1, 2026 – Mar 31, 2026',
      deadline: '2026-04-15',
      status: 'Open for Collection',
      statusAr: 'مفتوح لجمع البيانات',
      owner: 'Strategy & PMO Office',
      progress: 68,
    },
    {
      code: 'Q2-2026',
      name: 'Second Quarter (Q2)',
      nameAr: 'الربع الثاني (Q2)',
      window: 'Apr 1, 2026 – Jun 30, 2026',
      deadline: '2026-07-15',
      status: 'Scheduled',
      statusAr: 'مجدول',
      owner: 'Strategy & PMO Office',
      progress: 0,
    },
    {
      code: 'Q3-2026',
      name: 'Third Quarter (Q3)',
      nameAr: 'الربع الثالث (Q3)',
      window: 'Jul 1, 2026 – Sep 30, 2026',
      deadline: '2026-10-15',
      status: 'Scheduled',
      statusAr: 'مجدول',
      owner: 'Strategy & PMO Office',
      progress: 0,
    },
    {
      code: 'Q4-2026',
      name: 'Fourth Quarter (Q4) & Annual Close',
      nameAr: 'الربع الرابع (Q4) والإغلاق السنوي',
      window: 'Oct 1, 2026 – Dec 31, 2026',
      deadline: '2027-01-20',
      status: 'Scheduled',
      statusAr: 'مجدول',
      owner: 'Strategy & PMO Office',
      progress: 0,
    },
  ]);

  // Approval Stages
  const approvalStages = [
    {
      stage: 1,
      title: 'Strategy Formulation & Drafting',
      titleAr: 'صياغة المسودة الاستراتيجية',
      responsible: 'Strategy Specialist Team',
      status: 'Completed',
      date: 'Feb 15, 2026',
    },
    {
      stage: 2,
      title: 'Sector Leadership & Cascading Review',
      titleAr: 'مراجعة قيادات القطاعات والمواءمة',
      responsible: 'Sector Directors General',
      status: 'Completed',
      date: 'Mar 01, 2026',
    },
    {
      stage: 3,
      title: 'PMO Quality Gate & BSC Balance Check',
      titleAr: 'بوابة جودة مكتب إدارة المشاريع وتوازن BSC',
      responsible: 'Enterprise PMO & GRC Office',
      status: 'Active Review',
      date: 'Mar 25, 2026',
    },
    {
      stage: 4,
      title: 'Executive Council & Board Ratification',
      titleAr: 'اعتماد مجلس الإدارة والمجلس التنفيذي',
      responsible: 'Authority Board & CEO',
      status: 'Pending Gate 3',
      date: 'Apr 10, 2026',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 5 من 20 • دورة حياة الاستراتيجية' : 'STAGE 5 OF 20 • STRATEGIC LIFECYCLE'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'دورة التخطيط السنوية' : 'Annual Strategy Planning Cycle'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'إدارة المدى الاستراتيجي ودورات التقارير والاعتماد'
                : 'Strategic Horizon, Planning Cycle & Reporting Governance'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'تحديد المدى الزمني للاستراتيجية (2026-2030)، ودورة التخطيط السنوية، وفترات التقرير، ومراحل الاعتماد مع مقارنة الخطة السابقة المعتمدة بالمسودة الجديدة.'
                : 'Configure the 5-year strategy horizon, annual planning cycles, reporting deadlines, and approval stages, comparing the previous approved baseline with the new draft plan.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setCompareMode(!compareMode);
                toast.info(compareMode ? 'Switched to Single Plan View' : 'Side-by-Side Comparison Enabled');
              }}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <GitCompare className="w-4 h-4" />
              <span>
                {compareMode
                  ? lang === 'ar'
                    ? 'إخفاء المقارنة الثنائية'
                    : 'Hide Plan Comparison'
                  : lang === 'ar'
                  ? 'عرض مقارنة الخطتين'
                  : 'Compare Approved vs Draft'}
              </span>
            </button>

            <button
              onClick={() => {
                setDemoJourneyStep(6);
                navigate('/strategic-diagnosis');
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer group"
            >
              <span>{lang === 'ar' ? 'الانتقال: التشخيص الاستراتيجي' : 'Next: Strategic Diagnosis'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Horizon Overview Cards */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'المدى الاستراتيجي' : 'Strategy Horizon'}
            </span>
            <span className="font-bold text-white font-mono text-sm">
              {horizonYears.start} – {horizonYears.end} (5-Year)
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'دورة التخطيط النشطة' : 'Active Annual Cycle'}
            </span>
            <span className="font-bold text-indigo-300 font-mono text-sm">
              FY 2026 (Operational)
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'فترات التقارير الدورية' : 'Reporting Frequency'}
            </span>
            <span className="font-bold text-emerald-400">
              {lang === 'ar' ? 'ربع سنوي (Q1-Q4) + إغلاق سنوي' : 'Quarterly (Q1-Q4) + Year-End'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'بوابة الاعتماد الحالية' : 'Current Approval Gate'}
            </span>
            <span className="font-bold text-amber-300">
              Gate 3: PMO Quality Audit
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-Side: Previous Approved Plan vs New Draft (Client Requirement: "Show a previous approved plan alongside the new draft") */}
      {compareMode && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold text-slate-900">
                {lang === 'ar'
                  ? 'مقارنة الخطة الاستراتيجية السابقة المعتمدة بالمسودة الجديدة'
                  : 'Authoritative Comparison: Previous Approved Baseline vs New Draft Plan'}
              </h2>
            </div>
            <span className="text-[11px] font-mono bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200 font-semibold">
              DIFFERENTIAL AUDIT v1.2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Previous Approved Plan */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? 'الخطة الاستراتيجية السابقة (معتمدة ومقفلة)' : 'Previous Approved Baseline (2021–2025)'}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  RATIFIED BASELINE
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-2 font-sans">
                <p className="leading-relaxed">
                  <strong>{lang === 'ar' ? 'الاسم:' : 'Plan Name:'}</strong> Al-Ahsa Regional Infrastructure & Foundation Strategy
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Strategic Pillars</span>
                    <span className="font-bold text-slate-800">3 Pillars</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Total Objectives</span>
                    <span className="font-bold text-slate-800">14 Objectives</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">KPI Metrics</span>
                    <span className="font-bold text-slate-800">22 KPIs</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Budget Ceiling</span>
                    <span className="font-bold text-slate-800">SAR 1.25 B</span>
                  </div>
                </div>
              </div>
            </div>

            {/* New Draft Plan */}
            <div className="p-4 rounded-xl border-2 border-indigo-500 bg-indigo-50/30 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? 'مسودة الخطة الاستراتيجية الجديدة (2026-2030)' : 'New Strategic Transformation Plan (2026–2030)'}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-indigo-600 text-white font-bold px-2 py-0.5 rounded">
                  ACTIVE DRAFT v1.2
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-2 font-sans">
                <p className="leading-relaxed">
                  <strong>{lang === 'ar' ? 'الاسم:' : 'Plan Name:'}</strong> {strategyPlan?.name || 'Al-Ahsa Regional Sustainable Transformation Strategy'}
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                  <div className="p-2 bg-white rounded-lg border border-indigo-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Strategic Pillars</span>
                    <span className="font-bold text-indigo-700">4 Pillars (+1 New Oasis Theme)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-indigo-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Total Objectives</span>
                    <span className="font-bold text-indigo-700">18 Objectives (+4 Aligned)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-indigo-200">
                    <span className="text-slate-400 block text-[10px] uppercase">KPI Metrics</span>
                    <span className="font-bold text-indigo-700">34 KPIs (BSC Calibrated)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-indigo-200">
                    <span className="text-slate-400 block text-[10px] uppercase">Budget Ceiling</span>
                    <span className="font-bold text-indigo-700">SAR 2.40 B (+92% Scope)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reporting Periods Schedule */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'جدول فترات التقارير والمواعيد النهائية (FY 2026)' : 'Annual Reporting Periods & Submission Deadlines (FY 2026)'}
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {lang === 'ar' ? 'مواعيد الاستحقاق ملزمة ومربوطة بالتنبيهات' : 'Deadlines trigger automated escalations'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {periods.map((p) => {
            const isOpen = p.status === 'Open for Collection';
            return (
              <div
                key={p.code}
                className={`p-4 rounded-xl border transition-all ${
                  isOpen
                    ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-300/30'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white text-slate-700 border border-slate-200">
                    {p.code}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {lang === 'ar' ? p.statusAr : p.status}
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-900 mt-2">
                  {lang === 'ar' ? p.nameAr : p.name}
                </div>

                <div className="text-[11px] text-slate-500 mt-1 font-mono">
                  {p.window}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{lang === 'ar' ? 'الموعد النهائي:' : 'Deadline:'}</span>
                    <span className="font-mono font-bold text-rose-600">{p.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{lang === 'ar' ? 'الجهة المسؤولة:' : 'Owner:'}</span>
                    <span className="font-semibold text-slate-700 truncate">{p.owner}</span>
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-slate-500">{lang === 'ar' ? 'اكتمال جمع البيانات:' : 'Collection Progress:'}</span>
                      <span className="font-bold text-blue-700">{p.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: `${p.progress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Approval Stages Workflow */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'مراحل وبوابات اعتماد الخطة الاستراتيجية' : 'Strategy Governance & Approval Gates Workflow'}
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {lang === 'ar' ? 'مراحل المواءمة المتسلسلة' : 'Sequential Gate Enforcement'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {approvalStages.map((stage) => {
            const isCompleted = stage.status === 'Completed';
            const isActive = stage.status === 'Active Review';
            return (
              <div
                key={stage.stage}
                className={`p-3.5 rounded-xl border relative transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : isActive
                    ? 'bg-purple-50/70 border-purple-400 ring-2 ring-purple-300/30'
                    : 'bg-slate-50 border-slate-200 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                    isCompleted ? 'bg-emerald-600 text-white' : isActive ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {stage.stage}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isCompleted ? 'bg-emerald-100 text-emerald-800' : isActive ? 'bg-purple-100 text-purple-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {stage.status}
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-900 mt-2">
                  {lang === 'ar' ? stage.titleAr : stage.title}
                </div>

                <div className="text-[10px] text-slate-500 mt-1">
                  {stage.responsible}
                </div>

                <div className="text-[10px] text-slate-400 font-mono mt-2 pt-1 border-t border-slate-200/60">
                  {stage.date}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={5}
        stageTitle="Strategic Horizon, Planning Cycle & Reporting Governance"
        stageTitleAr="المدى الاستراتيجي ودورات التخطيط وحوكمة التقارير"
        prevStage={{
          stage: 4,
          title: "Roles & Permissions Matrix",
          titleAr: "مصفوفة الأدوار والصلاحيات",
          path: "/admin",
        }}
        nextStage={{
          stage: 6,
          title: "Strategic Diagnosis & Traceability",
          titleAr: "التشخيص الاستراتيجي وتتبع الأدلة",
          path: "/strategic-diagnosis",
        }}
        relatedLinks={[
          { title: "Strategic Identity & Themes", titleAr: "الهوية المؤسسية والركائز", path: "/strategy/identity" },
          { title: "BSC Perspectives Config", titleAr: "تهيئة محاور بطاقة الأداء", path: "/bsc-config" },
          { title: "Organization Structure", titleAr: "الهيكل التنظيمي", path: "/org-structure" },
        ]}
      />
    </div>
  );
};
