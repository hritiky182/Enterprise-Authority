import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Layers,
  Target,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Search,
} from 'lucide-react';

export const HierarchyTreePage: React.FC = () => {
  const { themes, goals, objectives, initiatives, kpis, openModal, deleteStrategyTheme, resetStrategies, lang, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredThemes = themes.filter((theme) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const themeMatches =
      theme.title.toLowerCase().includes(term) ||
      (theme.titleAr && theme.titleAr.includes(term)) ||
      theme.code.toLowerCase().includes(term);

    const goalsMatch = goals
      .filter((g) => g.themeId === theme.id)
      .some((g) => g.title.toLowerCase().includes(term) || (g.titleAr && g.titleAr.includes(term)));

    const objsMatch = objectives
      .filter((o) => o.themeId === theme.id)
      .some(
        (o) =>
          o.title.toLowerCase().includes(term) ||
          (o.titleAr && o.titleAr.includes(term)) ||
          o.code.toLowerCase().includes(term)
      );

    return themeMatches || goalsMatch || objsMatch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <Layers className="w-4 h-4" />
            <span>{t('AL AHSA DEVELOPMENT AUTHORITY • CASCADING ARCHITECTURE')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'شجرة الركائز والاستراتيجية المؤسسية' : 'Strategy Hierarchy & Cascading Tree'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'ar'
              ? 'الربط التفاعلي المتسلسل بين الركائز الاستراتيجية ➔ الأهداف الرئيسية ➔ الأهداف التفصيلية (OKRs) ➔ المؤشرات والمشاريع.'
              : 'Cascading visual architecture linking Strategic Themes (Pillars) ➔ Strategic Goals ➔ Strategic Objectives (OKRs) ➔ KPIs & Initiatives.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/strategy/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{t('Create Strategy')}</span>
          </Link>

          <button
            type="button"
            onClick={resetStrategies}
            className="inline-flex items-center space-x-1.5 px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('Reset Demo Strategies')}</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{t('Strategic Pillars')}</div>
          <div className="text-xl font-bold font-mono text-slate-900 mt-1">{themes.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{lang === 'ar' ? 'الركائز المعتمدة' : 'Core organizational pillars'}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{t('Alignment Goals')}</div>
          <div className="text-xl font-bold font-mono text-blue-700 mt-1">{goals.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{lang === 'ar' ? 'الأهداف الاستراتيجية' : 'Milestone alignment goals'}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{t('Target Objectives')}</div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">{objectives.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{lang === 'ar' ? 'الأهداف التفصيلية (OKRs)' : 'Active operational OKRs'}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">{t('Tracked KPIs')}</div>
          <div className="text-xl font-bold font-mono text-indigo-700 mt-1">{kpis.length}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{lang === 'ar' ? 'مؤشرات الأداء المعتمدة' : 'Associated indicators'}</div>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className={`w-3.5 h-3.5 absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={lang === 'ar' ? 'البحث بالركيزة، الهدف، أو الرمز...' : 'Search pillar, goal, or objective...'}
            className={`w-full ${lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600`}
          />
        </div>

        <div className="text-xs font-mono text-slate-500">
          {lang === 'ar' ? `الركائز المعروضة: ${filteredThemes.length}` : `Pillars Shown: ${filteredThemes.length}`}
        </div>
      </div>

      {/* Cascading Themes List */}
      <div className="space-y-6">
        {filteredThemes.map((theme) => {
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
                    <h2 className="text-base font-bold text-slate-900">
                      {lang === 'ar' ? (theme.titleAr || theme.title) : theme.title}
                    </h2>
                    {theme.isCustom && (
                      <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1 shadow-2xs">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>{lang === 'ar' ? 'استراتيجية ديناميكية' : 'Dynamic Strategy'}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'ar' ? (theme.descriptionAr || theme.description) : theme.description}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    {lang === 'ar' ? `الوزن: ${theme.weight}%` : `Weight: ${theme.weight}%`}
                  </span>
                  {theme.isCustom && (
                    <button
                      onClick={() => deleteStrategyTheme(theme.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title={lang === 'ar' ? 'حذف هذه الاستراتيجية' : 'Delete this dynamic strategy'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Strategic Goals & Objectives nested list */}
              <div className="ps-2 sm:ps-4 space-y-4 border-s-2 border-slate-200">
                {themeGoals.length === 0 ? (
                  <div className="text-xs text-slate-400 italic py-2">
                    {lang === 'ar' ? 'لا توجد أهداف مسجلة تحت هذه الركيزة.' : 'No nested goals registered under this theme.'}
                  </div>
                ) : (
                  themeGoals.map((goal) => {
                    const goalObjs = themeObjectives.filter((o) => o.goalId === goal.id);

                    return (
                      <div key={goal.id} className="space-y-3">
                        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                          <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            {goal.code}
                          </span>
                          <span>{lang === 'ar' ? (goal.titleAr || goal.title) : goal.title}</span>
                        </div>

                        {/* Objectives under Goal */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ps-4">
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
                                    <span className="font-mono font-bold text-xs text-slate-900">{obj.code}</span>
                                    {obj.isCustom && (
                                      <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200">
                                        {lang === 'ar' ? 'جديد' : 'NEW'}
                                      </span>
                                    )}
                                  </div>
                                  <StatusBadge status={obj.status} />
                                </div>
                                <h4 className="font-semibold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors">
                                  {lang === 'ar' ? (obj.titleAr || obj.title) : obj.title}
                                </h4>

                                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 font-mono">
                                  <span>{lang === 'ar' ? `المالك: ${t(obj.owner)}` : `Owner: ${obj.owner}`}</span>
                                  <span className="font-bold text-emerald-700">
                                    {lang === 'ar' ? `الإنجاز ${obj.progress}%` : `${obj.progress}% Progress`}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1">
                                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                                    {lang === 'ar' ? `${objKpis.length} مؤشرات` : `${objKpis.length} KPIs`}
                                  </span>
                                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono">
                                    {lang === 'ar' ? `${objInits.length} مبادرات` : `${objInits.length} Initiatives`}
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
      </div>

      {/* Quick Create Prompt at Bottom of Tree */}
      <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 text-center space-y-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
          <Plus className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {lang === 'ar' ? 'إضافة ركيزة استراتيجية جديدة' : 'Add Another Strategic Pillar'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-0.5">
            {lang === 'ar'
              ? 'صياغة ونشر الاستراتيجيات المؤسسية بأهداف تفصيلية ومؤشرات أداء مخصصة.'
              : 'Formulate and deploy dynamic enterprise strategies with custom goals, target OKRs, and KPIs.'}
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-1">
          <Link
            to="/strategy/create"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('Create Strategy')}</span>
          </Link>
          <button
            type="button"
            onClick={resetStrategies}
            className="inline-flex items-center space-x-1.5 px-3 py-2 border border-slate-200 hover:bg-white text-slate-600 rounded-xl text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('Reset Demo Strategies')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
