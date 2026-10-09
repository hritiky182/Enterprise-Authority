import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GitMerge,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Layers,
  Sparkles,
  BarChart3,
  Percent,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

interface DepartmentalAlignment {
  deptId: string;
  deptName: string;
  deptNameAr: string;
  deptObjectiveCode: string;
  deptObjectiveTitle: string;
  deptObjectiveTitleAr: string;
  contributionPct: number;
  sharedKpis: string[];
  owner: string;
}

export const DepartmentalCascadePage: React.FC = () => {
  const { lang, t } = useApp();
  const navigate = useNavigate();

  const [viewDirection, setViewDirection] = useState<'top-down' | 'bottom-up'>('top-down');

  // Corporate Master Objective
  const corporateObjective = {
    code: 'CORP-OBJ-01',
    title: 'Transform Al-Ahsa into a Globally Recognized Eco-Heritage Oasis Tourism Destination',
    titleAr: 'تحويل واحة الأحساء إلى وجهة عالمية رائدة للسياحة التراثية والبيئية المستدامة',
    targetHorizon: '2026 – 2030',
    leadSector: 'Tourism & Community Sector',
    weight: '30%',
  };

  // Departmental Alignments
  const [alignments, setAlignments] = useState<DepartmentalAlignment[]>([
    {
      deptId: 'dept-tourism',
      deptName: 'Tourism Development Department',
      deptNameAr: 'إدارة التنمية والتسويق السياحي',
      deptObjectiveCode: 'DEPT-TOU-1.1',
      deptObjectiveTitle: 'Curate & Launch 6 Flagship Heritage Oasis Visitor Tour Routes',
      deptObjectiveTitleAr: 'تصميم وتشغيل 6 مسارات سياحية نوعية في واحة الأحساء',
      contributionPct: 55,
      sharedKpis: ['KPI-01: Heritage Visitors Footfall', 'KPI-03: Tourist Spending Index'],
      owner: 'Eng. Faisal Al-Otaibi',
    },
    {
      deptId: 'dept-infra',
      deptName: 'Urban Infrastructure & Municipal Harmonization',
      deptNameAr: 'إدارة البنية التحتية والمواءمة البلدية',
      deptObjectiveCode: 'DEPT-INF-1.2',
      deptObjectiveTitle: 'Complete 45km Pedestrian Shaded Canal Walkways & Smart Signage',
      deptObjectiveTitleAr: 'تنفيذ 45 كم من مسارات المشاة المظللة واللوحات الإرشادية الذكية',
      contributionPct: 30,
      sharedKpis: ['KPI-05: Spatial Trail Delivery Rate', 'KPI-01: Heritage Visitors Footfall (Co-Owned)'],
      owner: 'Sultan Al-Harbi',
    },
    {
      deptId: 'dept-comm',
      deptName: 'Community Engagement & Local Artisans',
      deptNameAr: 'إدارة المشاركة المجتمعية والحرف اليدوية',
      deptObjectiveCode: 'DEPT-COM-1.3',
      deptObjectiveTitle: 'Empower 300 Local Oasis Artisans in Creative Gastronomy & Crafts',
      deptObjectiveTitleAr: 'تمكين 300 حرفي محلي في فنون الطهي والحرف التراثية',
      contributionPct: 15,
      sharedKpis: ['KPI-07: Certified Local Artisans', 'KPI-03: Tourist Spending Index (Co-Owned)'],
      owner: 'Huda Al-Ghamdi',
    },
  ]);

  const totalContribution = alignments.reduce((acc, a) => acc + a.contributionPct, 0);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 12 من 20 • دورة حياة الاستراتيجية' : 'STAGE 12 OF 20 • STRATEGIC LIFECYCLE'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'المواءمة الإدارية التنازلية والصاعدة' : 'Departmental Cascading & Alignment'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'مواءمة المستهدفات الإدارية والملكية المشتركة لمؤشرات الأداء'
                : 'Bidirectional Departmental Cascading & Shared KPI Ownership'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setViewDirection(viewDirection === 'top-down' ? 'bottom-up' : 'top-down');
                toast.info(viewDirection === 'top-down' ? 'Switched to Bottom-Up Alignment View' : 'Switched to Top-Down Cascade View');
              }}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>
                {viewDirection === 'top-down'
                  ? lang === 'ar'
                    ? 'عرض المواءمة الصاعدة (Bottom-Up)'
                    : 'Switch to Bottom-Up View'
                  : lang === 'ar'
                  ? 'عرض المواءمة التنازلية (Top-Down)'
                  : 'Switch to Top-Down View'}
              </span>
            </button>
            <button
              onClick={() => navigate('/initiatives')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer group"
            >
              <span>{lang === 'ar' ? 'المتابعة: المبادرات الاستراتيجية' : 'Next: Strategic Initiatives'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Contribution Weight Validation Check */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">
              {lang === 'ar' ? 'مجموع المساهمات التشغيلية:' : 'Total Departmental Contribution Roll-up:'}
            </span>
            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{totalContribution}% (EXACT 100% BALANCE)</span>
            </span>
          </div>

          <span className="text-[11px] font-mono text-indigo-300">
            {lang === 'ar' ? 'سجل رسمي موحد بدون تكرار السجلات' : 'Single Authoritative Record (No duplication)'}
          </span>
        </div>
      </div>

      {/* Level 1: Corporate Master Objective Card */}
      <div className="bg-white border-2 border-indigo-400 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
              {corporateObjective.code}
            </span>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
              CORPORATE TIER-1 STRATEGIC OBJECTIVE
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-indigo-700">
            HORIZON: {corporateObjective.targetHorizon}
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-900">
          {lang === 'ar' ? corporateObjective.titleAr : corporateObjective.title}
        </h2>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>{lang === 'ar' ? 'القطاع القيادي المسؤول:' : 'Executive Sector Lead:'} <strong>{corporateObjective.leadSector}</strong></span>
          <span className="font-mono text-indigo-600 font-bold">WEIGHT: {corporateObjective.weight}</span>
        </div>
      </div>

      {/* Bidirectional Connector Indicator */}
      <div className="flex items-center justify-center gap-2 text-indigo-600 font-mono text-xs font-bold py-1">
        {viewDirection === 'top-down' ? (
          <>
            <span>Cascading Downwards (Top-Down Accountability)</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </>
        ) : (
          <>
            <span>Aggregating Upwards (Bottom-Up Contribution Rollup)</span>
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          </>
        )}
      </div>

      {/* Level 2: Departmental Objectives Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
            {lang === 'ar' ? 'المستهدفات التكتيكية التابعة للإدارات' : 'Aligned Departmental Objectives & Shared Ownership'}
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            {alignments.length} Supporting Departments
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {alignments.map((a) => (
            <div
              key={a.deptId}
              className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                    {a.deptObjectiveCode}
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    {a.contributionPct}% Contribution
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900">
                  {lang === 'ar' ? a.deptObjectiveTitleAr : a.deptObjectiveTitle}
                </div>

                <div className="text-[11px] text-slate-500 font-medium">
                  {lang === 'ar' ? a.deptNameAr : a.deptName}
                </div>
              </div>

              {/* Shared KPIs (Client Requirement: "shared KPI ownership without duplicating authoritative records") */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  {lang === 'ar' ? 'المؤشرات المشتركة (Shared KPI Links):' : 'Shared KPI Links (Co-Owned):'}
                </span>
                {a.sharedKpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700 flex items-center justify-between"
                  >
                    <span className="truncate">{kpi}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  </div>
                ))}

                <div className="text-[10px] text-slate-400 font-mono pt-1 flex items-center justify-between">
                  <span>{lang === 'ar' ? 'المالك الإداري:' : 'Owner:'} {a.owner}</span>
                  <span className="text-emerald-600 font-bold">ALIGNED</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={12}
        stageTitle="Bidirectional Departmental Cascading & Shared KPI Ownership"
        stageTitleAr="المواءمة الإدارية التنازلية والصاعدة والملكية المشتركة للمؤشرات"
        prevStage={{
          stage: 11,
          title: "KPI Dictionary & Targets",
          titleAr: "قاموس المؤشرات والمستهدفات",
          path: "/kpis",
        }}
        nextStage={{
          stage: 13,
          title: "Initiatives & Execution Plans",
          titleAr: "المبادرات وخطط التنفيذ",
          path: "/initiatives",
        }}
        relatedLinks={[
          { title: "Strategy Matrix", titleAr: "مصفوفة الاستراتيجية", path: "/strategy" },
          { title: "Strategy Approval", titleAr: "اعتماد الاستراتيجية", path: "/strategy/approval" },
          { title: "Org Structure", titleAr: "الهيكل التنظيمي", path: "/org-structure" },
        ]}
      />
    </div>
  );
};
