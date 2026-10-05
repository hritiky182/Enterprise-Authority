import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ClientStrategyMatrix } from '../components/strategy/ClientStrategyMatrix';
import {
  Target,
  Plus,
  DollarSign,
} from 'lucide-react';

export const StrategyPage: React.FC = () => {
  const { themes, goals, objectives, initiatives, kpis, lang, t } = useApp();

  const totalBudget = initiatives.reduce((sum, i) => sum + (i.budgetSAR || 0), 0);
  const totalSpent = initiatives.reduce((sum, i) => sum + (i.spentSAR || 0), 0);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <Target className="w-4 h-4" />
            <span>{t('AL AHSA DEVELOPMENT AUTHORITY • STRATEGY & GOVERNANCE')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {t('Strategy Architecture & Cascading Matrix')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('Vision: A Leader in Sustainable Development in Al-Ahsa — Cascaded Objectives, KPIs & Projects')}
          </p>
        </div>

        {/* Action Button: Create Strategy */}
        <Link
          to="/strategy/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>{t('Create Strategy')}</span>
        </Link>
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
    </div>
  );
};
