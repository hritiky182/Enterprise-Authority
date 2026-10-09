import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ClientStrategyMatrix } from '../components/strategy/ClientStrategyMatrix';
import { ExecutiveBriefModal } from '../components/modals/ExecutiveBriefModal';
import {
  Target,
  Plus,
  DollarSign,
  Printer,
  Compass,
  Layers,
  Flag,
  BarChart3,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

export const StrategyPage: React.FC = () => {
  const navigate = useNavigate();
  const { themes, goals, objectives, initiatives, kpis, organization, setDemoJourneyStep, lang, t } = useApp();
  const [isExecutiveBriefOpen, setIsExecutiveBriefOpen] = useState(false);

  const totalBudget = initiatives.reduce((sum, i) => sum + (i.budgetSAR || 0), 0);
  const totalSpent = initiatives.reduce((sum, i) => sum + (i.spentSAR || 0), 0);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
            <span className="font-bold uppercase">
              {lang === 'ar' ? 'المصفوفة الاستراتيجية المتكاملة' : 'STRATEGY ARCHITECTURE & CASCADE MATRIX'}
            </span>
            <span className="text-slate-300">/</span>
            <span>{t('Strategy Architecture & Cascading Matrix')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {t('Strategy Architecture & Cascading Matrix')}
          </h1>
        </div>

        {/* Action Buttons: Export PDF & Create Strategy */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsExecutiveBriefOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer group"
          >
            <Printer className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            <span>{lang === 'ar' ? 'تقرير تنفيذي (PDF/طباعة)' : 'Executive Brief (PDF)'}</span>
          </button>

          <Link
            to="/strategy/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{t('Create Strategy')}</span>
          </Link>
        </div>
      </div>

      {/* Complete Strategic Relationship Lineage Bar (Vision -> Mission -> Values -> Pillars -> Objectives -> KPIs -> Projects) */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              {lang === 'ar' ? 'سلسلة المواءمة الاستراتيجية الكاملة (Complete Strategic Lineage)' : 'Complete Strategic Relationship Lineage'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            {lang === 'ar' ? 'مواءمة معتمدة 100%' : '100% Cascaded & Aligned'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {/* 1. Vision */}
          <Link
            to="/organization/setup"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-blue-500 transition-all text-start group"
          >
            <div className="text-[9px] font-mono text-blue-400 uppercase font-semibold">1. Vision</div>
            <div className="text-xs font-bold text-white truncate mt-0.5">
              {organization.shortCode || organization.shortName || 'AHDA'} {lang === 'ar' ? 'الرؤية' : 'Vision'}
            </div>
            <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{organization.vision}</div>
          </Link>

          {/* 2. Mission */}
          <Link
            to="/organization/setup"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500 transition-all text-start group"
          >
            <div className="text-[9px] font-mono text-indigo-400 uppercase font-semibold">2. Mission</div>
            <div className="text-xs font-bold text-white truncate mt-0.5">
              {lang === 'ar' ? 'الرسالة المؤسسية' : 'Institutional Mission'}
            </div>
            <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{organization.mission}</div>
          </Link>

          {/* 3. Pillars */}
          <Link
            to="/hierarchy-tree"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500 transition-all text-start group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">3. Pillars</span>
              <span className="text-[10px] font-mono font-bold bg-emerald-900/60 text-emerald-300 px-1 rounded">{themes.length}</span>
            </div>
            <div className="text-xs font-bold text-white truncate mt-0.5">
              {lang === 'ar' ? 'الركائز الاستراتيجية' : 'Strategic Themes'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{lang === 'ar' ? '5 ركائز معتمدة' : '5 Themes / Pillars'}</div>
          </Link>

          {/* 4. Objectives */}
          <Link
            to="/objectives"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500 transition-all text-start group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-cyan-400 uppercase font-semibold">4. Objectives</span>
              <span className="text-[10px] font-mono font-bold bg-cyan-900/60 text-cyan-300 px-1 rounded">{objectives.length}</span>
            </div>
            <div className="text-xs font-bold text-white truncate mt-0.5">
              {lang === 'ar' ? 'المستهدفات الاستراتيجية' : 'Strategic OKRs'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{lang === 'ar' ? 'المواءمة والملكية' : 'Sector Ownership'}</div>
          </Link>

          {/* 5. KPIs */}
          <Link
            to="/kpis"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500 transition-all text-start group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-amber-400 uppercase font-semibold">5. KPIs</span>
              <span className="text-[10px] font-mono font-bold bg-amber-900/60 text-amber-300 px-1 rounded">{kpis.length}</span>
            </div>
            <div className="text-xs font-bold text-white truncate mt-0.5">
              {lang === 'ar' ? 'مؤشرات الأداء' : 'Telemetry KPIs'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">{lang === 'ar' ? 'المعادلات والأوزان' : 'Formulas & Weights'}</div>
          </Link>

          {/* 6. Projects */}
          <Link
            to="/initiatives"
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500 transition-all text-start group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-purple-400 uppercase font-semibold">6. Projects</span>
              <span className="text-[10px] font-mono font-bold bg-purple-900/60 text-purple-300 px-1 rounded">{initiatives.length}</span>
            </div>
            <div className="text-xs font-bold text-white truncate mt-0.5">
              {lang === 'ar' ? 'المبادرات والمشاريع' : 'Initiatives & Portfolios'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">SAR {(totalBudget / 1000000).toFixed(0)}M Capital</div>
          </Link>
        </div>
      </div>

      {/* Metrics & Strategy Architecture Overview with Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        <Link
          to="/hierarchy-tree"
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all group"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold group-hover:text-blue-600 transition-colors">
            {t('Strategic Pillars')}
          </div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">{themes.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'شجرة الركائز ↗' : 'Hierarchy Tree ↗'}
          </div>
        </Link>

        <Link
          to="/hierarchy-tree"
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all group"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold group-hover:text-blue-600 transition-colors">
            {t('Alignment Goals')}
          </div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">{goals.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'الأهداف الاستراتيجية ↗' : 'Milestones Goals ↗'}
          </div>
        </Link>

        <Link
          to="/objectives"
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all group"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold group-hover:text-emerald-600 transition-colors">
            {t('Target Objectives')}
          </div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">{objectives.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'الأهداف التفصيلية (OKRs) ↗' : 'Objectives Directory ↗'}
          </div>
        </Link>

        <Link
          to="/kpis"
          className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs hover:border-indigo-400 hover:shadow-xs transition-all group"
        >
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold group-hover:text-indigo-600 transition-colors">
            {t('Tracked KPIs')}
          </div>
          <div className="text-xl font-bold font-mono text-indigo-700 mt-1">{kpis.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {lang === 'ar' ? 'مؤشرات الأداء ↗' : 'KPIs Telemetry ↗'}
          </div>
        </Link>

        <Link
          to="/initiatives"
          className="col-span-2 sm:col-span-4 lg:col-span-1 bg-gradient-to-br from-slate-900 to-blue-950 p-4 rounded-xl text-white shadow-2xs flex flex-col justify-between hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-blue-300 uppercase font-semibold group-hover:text-white transition-colors">
              {t('Allocated Budget')}
            </span>
            <DollarSign className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white mt-1">
            {lang === 'ar' ? `${(totalBudget / 1000000).toFixed(1)} مليون ر.س` : `SAR ${(totalBudget / 1000000).toFixed(1)}M`}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {lang === 'ar' ? `${initiatives.length} مبادرات استراتيجية ↗` : `${initiatives.length} Initiatives ↗`}
          </div>
        </Link>
      </div>

      {/* Primary View: Al-Ahsa Client Strategy Matrix */}
      <ClientStrategyMatrix />

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={12}
        stageTitle="Strategy Architecture & Multi-Pillar Cascading Matrix"
        stageTitleAr="هندسة الاستراتيجية ومصفوفة المواءمة متعددة الركائز"
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
          { title: "Strategy Approval", titleAr: "اعتماد الاستراتيجية", path: "/strategy/approval" },
          { title: "Performance Engine", titleAr: "محرك الأداء", path: "/performance" },
          { title: "Strategy Map", titleAr: "خريطة الاستراتيجية", path: "/strategy-map" },
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
