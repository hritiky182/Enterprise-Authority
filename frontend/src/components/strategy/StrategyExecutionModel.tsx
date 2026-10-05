import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Target,
  Layers,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Sparkles,
  Building2,
  Users,
  Compass,
  Briefcase,
  Flag,
  FolderGit2,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const StrategyExecutionModel: React.FC = () => {
  const { themes, objectives, kpis, initiatives, lang, t } = useApp();
  const [selectedPillarId, setSelectedPillarId] = useState<string>('all');

  const filteredThemes = selectedPillarId === 'all'
    ? themes
    : themes.filter((t) => t.id === selectedPillarId);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* SECTION 2 HEADER: STRATEGY MODEL - WHAT MUST BE ACHIEVED */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Top Title Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                2
              </span>
              <h2 className="text-base sm:text-lg font-bold tracking-tight font-sans">
                {t('Strategy Model - What must be achieved')}
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              {lang === 'ar'
                ? 'يحدد هذا النموذج ما تسعى الهيئة لتحقيقه، وكيف يتم قياس النجاح، والمبادرات والمشاريع التي تقود التنفيذ الفعلي.'
                : 'This model defines what AHDA wants to achieve, how success is measured, and which initiatives/projects drive delivery.'}
            </p>
          </div>

          {/* Pillar Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedPillarId('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedPillarId === 'all'
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {lang === 'ar' ? 'جميع الركائز' : 'All Pillars'} ({themes.length})
            </button>
            {themes.map((th) => (
              <button
                key={th.id}
                onClick={() => setSelectedPillarId(th.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedPillarId === th.id
                    ? 'bg-blue-600 text-white shadow-2xs font-bold'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {th.code} {lang === 'ar' ? (th.titleAr || th.title) : th.title.split(' ').slice(1, 4).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Stage Strategy Model Chevron Process Bar (Exact from Diagram) */}
        <div className="p-3 bg-slate-100/90 border-b border-slate-200 overflow-x-auto">
          <div className="flex items-center min-w-[780px] gap-2">
            {[
              { step: '1', title: t('Strategic Pillar'), bg: 'bg-emerald-900 text-white border-emerald-800' },
              { step: '2', title: t('Strategic Objective'), bg: 'bg-teal-900 text-white border-teal-800' },
              { step: '3', title: t('KPI / Target'), bg: 'bg-blue-900 text-white border-blue-800' },
              { step: '4', title: t('Initiative'), bg: 'bg-cyan-900 text-white border-cyan-800' },
              { step: '5', title: t('Milestone'), bg: 'bg-slate-800 text-white border-slate-700' },
              { step: '6', title: t('Project'), bg: 'bg-amber-900 text-white border-amber-800' },
            ].map((st, idx, arr) => (
              <React.Fragment key={st.step}>
                <div
                  className={`flex-1 py-2 px-3 rounded-xl border text-center text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 ${st.bg}`}
                >
                  <span className="font-mono text-[11px] opacity-75">{st.step}.</span>
                  <span className="truncate">{st.title}</span>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content: Pillars cascading to Multiple Objectives, KPIs, Initiatives, Milestones, Projects */}
        <div className="p-5 sm:p-6 space-y-8 bg-slate-50/50">
          {filteredThemes.map((theme) => {
            const themeObjectives = objectives.filter((o) => o.themeId === theme.id);

            return (
              <div
                key={theme.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden"
              >
                {/* Pillar Header Strip */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-white shrink-0">
                      <Compass className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                          {theme.code}
                        </span>
                        <h3 className="text-base font-bold text-white font-sans">
                          {lang === 'ar' ? (theme.titleAr || theme.title) : theme.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
                        {theme.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 border border-white/10">
                      {lang === 'ar' ? `الوزن: ${theme.weight}%` : `Weight: ${theme.weight}%`}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {themeObjectives.length} {lang === 'ar' ? 'أهداف استراتيجية' : 'Objectives'}
                    </span>
                  </div>
                </div>

                {/* Multiple Objectives Container */}
                <div className="divide-y divide-slate-200/80">
                  {themeObjectives.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs italic">
                      {lang === 'ar'
                        ? 'لا توجد أهداف استراتيجية مسجلة تحت هذه الركيزة حالياً.'
                        : 'No strategic objectives currently formulated under this pillar.'}
                    </div>
                  ) : (
                    themeObjectives.map((obj) => {
                      const objKpis = kpis.filter(
                        (k) => k.objectiveId === obj.id || k.code.startsWith(obj.code)
                      );
                      const objInitiatives = initiatives.filter(
                        (i) => i.objectiveId === obj.id || i.code.includes(obj.code)
                      );

                      return (
                        <div key={obj.id} className="p-5 sm:p-6 space-y-5">
                          {/* Objective Identifier & Title */}
                          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold font-mono text-xs shadow-2xs shrink-0">
                                {obj.code}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                                  {lang === 'ar' ? (obj.titleAr || obj.title) : obj.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                                  <span>{t('Owner')}: <strong className="text-slate-700">{obj.owner}</strong></span>
                                  <span>•</span>
                                  <span>{t('Department')}: <strong className="text-slate-700">{obj.department}</strong></span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <StatusBadge status={obj.status} />
                              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                                {obj.progress}%
                              </span>
                            </div>
                          </div>

                          {/* Two-Column Execution Grid: KPIs Table + Initiatives Flow */}
                          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
                            {/* LEFT: MULTIPLE KPIS & MULTI-YEAR TARGETS (5 cols) */}
                            <div className="xl:col-span-5 bg-slate-50/80 rounded-xl border border-slate-200/90 p-3.5 space-y-2.5">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-2 border-b border-slate-200">
                                <div className="flex items-center gap-1.5">
                                  <Target className="w-4 h-4 text-blue-600" />
                                  <span>{t('KPI / Target')}</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                                  {objKpis.length} {lang === 'ar' ? 'مؤشرات' : 'KPIs'}
                                </span>
                              </div>

                              <div className="overflow-x-auto">
                                <table className="w-full text-start text-xs border-collapse">
                                  <thead>
                                    <tr className="bg-slate-200/70 text-slate-700 font-mono text-[10px] uppercase">
                                      <th className="p-2 text-start">{t('KPI')}</th>
                                      <th className="p-2 text-center w-16">{t('Baseline')}</th>
                                      <th className="p-2 text-center w-16 bg-blue-100/70 text-blue-900 font-bold">2026</th>
                                      <th className="p-2 text-center w-16 bg-blue-200/70 text-blue-950 font-bold">2027</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-200/70 text-slate-800">
                                    {objKpis.length === 0 ? (
                                      <tr>
                                        <td colSpan={4} className="p-3 text-center text-slate-400 italic text-[11px]">
                                          {lang === 'ar' ? 'لا توجد مؤشرات مسجلة لهذا الهدف' : 'No KPIs assigned'}
                                        </td>
                                      </tr>
                                    ) : (
                                      objKpis.map((k) => (
                                        <tr key={k.id} className="hover:bg-white transition-colors">
                                          <td className="p-2">
                                            <div className="font-semibold text-slate-900 line-clamp-1">
                                              {lang === 'ar' ? (k.nameAr || k.name) : k.name}
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-500">
                                              {k.code} • {lang === 'ar' ? 'الفعلي:' : 'Actual:'} {k.actual} {k.unit}
                                            </span>
                                          </td>
                                          <td className="p-2 text-center font-mono text-[11px] text-slate-600">
                                            {k.baseline || '-'}
                                          </td>
                                          <td className="p-2 text-center font-mono text-[11px] font-bold text-blue-800 bg-blue-50/50">
                                            {k.target2026 || '-'}
                                          </td>
                                          <td className="p-2 text-center font-mono text-[11px] font-bold text-blue-950 bg-blue-100/50">
                                            {k.target2027 || '-'}
                                          </td>
                                        </tr>
                                      ))
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* RIGHT: INITIATIVES ➔ MILESTONES ➔ PROJECTS (7 cols) */}
                            <div className="xl:col-span-7 bg-slate-50/80 rounded-xl border border-slate-200/90 p-3.5 space-y-3">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-2 border-b border-slate-200">
                                <div className="flex items-center gap-1.5">
                                  <Briefcase className="w-4 h-4 text-amber-600" />
                                  <span>{t('Initiatives and Milestones')} ➔ {t('Projects and Programs')}</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                                  {objInitiatives.length} {lang === 'ar' ? 'مبادرات' : 'Initiatives'}
                                </span>
                              </div>

                              <div className="space-y-3">
                                {objInitiatives.length === 0 ? (
                                  <div className="p-4 text-center text-slate-400 text-xs italic">
                                    {lang === 'ar' ? 'لا توجد مبادرات مسجلة لهذا الهدف' : 'No initiatives assigned'}
                                  </div>
                                ) : (
                                  objInitiatives.map((init) => (
                                    <div
                                      key={init.id}
                                      className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2.5"
                                    >
                                      {/* Initiative Card */}
                                      <div className="flex items-start justify-between gap-3">
                                        <div>
                                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200">
                                            {init.code}
                                          </span>
                                          <h5 className="text-xs font-bold text-slate-900 mt-1">
                                            {init.title}
                                          </h5>
                                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                            {init.description}
                                          </p>
                                        </div>
                                        <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap">
                                          SAR {(init.budgetSAR / 1000000).toFixed(1)}M
                                        </span>
                                      </div>

                                      {/* Arrow Flow: Milestones ➔ Projects */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                                        {/* Milestones Column */}
                                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                                          <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-slate-600 mb-1">
                                            <Flag className="w-3 h-3 text-slate-500" />
                                            <span>{t('Milestone')}</span>
                                          </div>
                                          {init.milestones && init.milestones.length > 0 ? (
                                            <ul className="space-y-1">
                                              {init.milestones.map((m) => (
                                                <li key={m.id} className="text-[11px] text-slate-800 flex items-start gap-1.5">
                                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5 shrink-0" />
                                                  <span className="line-clamp-2">{m.title}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          ) : (
                                            <span className="text-[10px] text-slate-400 italic">No milestones</span>
                                          )}
                                        </div>

                                        {/* Projects Column */}
                                        <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/80">
                                          <div className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-amber-800 mb-1">
                                            <FolderGit2 className="w-3 h-3 text-amber-600" />
                                            <span>{t('Project')}</span>
                                          </div>
                                          {init.keyProjects && init.keyProjects.length > 0 ? (
                                            <ul className="space-y-1">
                                              {init.keyProjects.map((p, pIdx) => (
                                                <li key={pIdx} className="text-[11px] font-semibold text-slate-900 flex items-start gap-1.5">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                  <span className="line-clamp-2">{p}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          ) : (
                                            <span className="text-[10px] text-slate-400 italic">No projects assigned</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
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
      </div>

      {/* SECTION 3: INTEGRATED UNDERSTANDING - HOW BOTH CONNECT (Exact matching diagram) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold font-mono">
            3
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans">
            {t('Integrated Understanding - How both connect')}
          </h2>
        </div>

        {/* 7-Node Operational to Strategy Value Chain */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-stretch min-w-[900px] gap-2">
            {[
              {
                title: t('Board / CEO'),
                caption: t('Leadership and Governance'),
                icon: <Users className="w-4 h-4 text-emerald-300" />,
                bg: 'bg-emerald-950 text-white border-emerald-800',
              },
              {
                title: t('Sectors and Departments'),
                caption: t('Execution Ownership'),
                icon: <Building2 className="w-4 h-4 text-teal-300" />,
                bg: 'bg-teal-950 text-white border-teal-800',
              },
              {
                title: t('Strategic Pillars and Objectives'),
                caption: t('What to achieve'),
                icon: <Compass className="w-4 h-4 text-blue-300" />,
                bg: 'bg-blue-950 text-white border-blue-800',
              },
              {
                title: t('KPIs and Targets'),
                caption: t('How success is measured'),
                icon: <BarChart3 className="w-4 h-4 text-indigo-300" />,
                bg: 'bg-indigo-950 text-white border-indigo-800',
              },
              {
                title: t('Initiatives and Milestones'),
                caption: t('What drives delivery'),
                icon: <Briefcase className="w-4 h-4 text-slate-300" />,
                bg: 'bg-slate-900 text-white border-slate-700',
              },
              {
                title: t('Projects and Programs'),
                caption: t('Implementation in action'),
                icon: <FolderGit2 className="w-4 h-4 text-amber-300" />,
                bg: 'bg-amber-950 text-white border-amber-800',
              },
              {
                title: t('Monitoring, Dashboards and Reporting'),
                caption: t('Track progress and inform decisions'),
                icon: <TrendingUp className="w-4 h-4 text-teal-300" />,
                bg: 'bg-teal-900 text-white border-teal-700',
              },
            ].map((node, nIdx, nArr) => (
              <React.Fragment key={nIdx}>
                <div
                  className={`flex-1 p-3 rounded-xl border flex flex-col justify-between shadow-2xs ${node.bg}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] opacity-70">0{nIdx + 1}</span>
                    {node.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold leading-tight">{node.title}</h5>
                    <p className="text-[10px] opacity-80 mt-1 leading-snug">{node.caption}</p>
                  </div>
                </div>
                {nIdx < nArr.length - 1 && (
                  <div className="flex items-center">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3 Alignment Dimensions (Who / What / How) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
            <Building2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <div className="text-xs font-bold text-emerald-950">{t('Organization Structure = Who')}</div>
              <div className="text-[11px] text-emerald-800">Board, CEO, 5 Sectors, 15 Departments</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center gap-3">
            <Compass className="w-5 h-5 text-blue-700 shrink-0" />
            <div>
              <div className="text-xs font-bold text-blue-950">{t('Strategy Framework = What')}</div>
              <div className="text-[11px] text-blue-800">4 Pillars, Strategic Alignment Goals, OKRs</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <div className="text-xs font-bold text-amber-950">{t('KPIs / Initiatives / Projects = How')}</div>
              <div className="text-[11px] text-amber-800">Telemetry KPIs, Delivery Roadmaps, Flagships</div>
            </div>
          </div>
        </div>

        {/* Takeaway Insight Callout */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-start gap-3 text-xs leading-relaxed">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-amber-300 font-semibold block mb-0.5">
              {lang === 'ar' ? 'الفهم المؤسسي الموحد للنموذج الاستراتيجي:' : 'Our Integrated Understanding:'}
            </strong>
            <span className="text-slate-300">
              {lang === 'ar'
                ? 'يحدد الهيكل التشغيلي لهيئة تطوير الأحساء المسؤول عن تنفيذ وإدارة الأعمال، بينما يحدد الإطار الاستراتيجي ما يجب تحقيقه وكيفية قياس التقدم والنتائج. معاً يشكلان نموذج حوكمة وتنفيذ متكامل يربط بين القيادة والقطاعات والأهداف ومؤشرات الأداء والمبادرات والمشاريع.'
                : "AHDA's operational structure defines who owns and executes the work, while the strategy framework defines what must be achieved and how progress is measured. Together they form a governance-to-execution model that links leadership, sectors, objectives, KPIs, initiatives, projects, and monitoring."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
