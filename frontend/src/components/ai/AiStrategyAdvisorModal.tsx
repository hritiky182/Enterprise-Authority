import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StrategicObjective } from '../../types';
import {
  Sparkles,
  X,
  Plus,
  Check,
  TrendingUp,
  Target,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Calculator,
  Calendar,
  DollarSign,
  Lightbulb,
} from 'lucide-react';
import { toast } from 'sonner';

interface AiStrategyAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedObjective?: StrategicObjective | null;
  onApplyWording?: (refinedTitle: string, refinedDesc: string) => void;
}

export const AiStrategyAdvisorModal: React.FC<AiStrategyAdvisorModalProps> = ({
  isOpen,
  onClose,
  selectedObjective,
  onApplyWording,
}) => {
  const { lang, objectives, addInitiative, addKPI, initiatives, kpis } = useApp();

  const [activeTab, setActiveTab] = useState<'initiatives' | 'kpis' | 'refinement'>('initiatives');
  const [activeObjectiveId, setActiveObjectiveId] = useState<string>(
    selectedObjective?.id || objectives[0]?.id || 'obj-1'
  );
  const [adoptedInitiatives, setAdoptedInitiatives] = useState<string[]>([]);
  const [adoptedKpis, setAdoptedKpis] = useState<string[]>([]);

  if (!isOpen) return null;

  const currentObj =
    objectives.find((o) => o.id === activeObjectiveId) ||
    selectedObjective ||
    objectives[0];

  // AI Generated Recommendations Tailored to Objective
  const AI_INITIATIVE_RECOMMENDATIONS = [
    {
      id: 'ai-init-1',
      code: `INIT-AI-${initiatives.length + 1}`,
      title: 'UNESCO Oasis Living Landscape Conservation & Heritage Footprint Activation',
      titleAr: 'تفعيل المبادرة الشاملة لصون المشهد الثقافي لواحة اليونسكو والتراث العمراني',
      description:
        'Comprehensive spatial rehabilitation program restoring historical date palm groves, ancestral water distribution falaj networks, and introducing low-impact eco-tourism visitor corridors.',
      descriptionAr:
        'برنامج مكاني متكامل لإعادة تأهيل بساتين النخيل التراثية وشبكات قنوات الري التقليدية مع مسارات سياحية بيئية.',
      budgetSAR: 14500000,
      spentSAR: 2200000,
      owner: 'Eng. Fahad Al-Subaie',
      department: 'Spatial & Urban Development Sector',
      expectedImpact: '+18% Heritage Preservation Coverage & +220k Eco-Visitors annually',
      milestones: [
        'Spatial GIS inventory of historical irrigation channels (Q2 2026)',
        'Civil works on primary eco-heritage trail network (Q4 2026)',
        'Launch community steward eco-tourism operator permits (Q2 2027)',
      ],
    },
    {
      id: 'ai-init-2',
      code: `INIT-AI-${initiatives.length + 2}`,
      title: 'Digital Civic Dialogue & Community Co-Creation Spatial Platform',
      titleAr: 'المنصة الرقمية التفاعلية للحوار المجتمعي والمشاركة في التخطيط المكاني',
      description:
        'Interactive civic platform allowing Al-Ahsa citizens to submit urban enhancement proposals, vote on neighborhood park designs, and monitor municipal service delivery.',
      descriptionAr:
        'منصة تفاعلية تتيح لسكان الأحساء تقديم مقترحات التحسين الحضري والتصويت على مشاريع الحدائق ومتابعة جودة الخدمات.',
      budgetSAR: 8200000,
      spentSAR: 1400000,
      owner: 'Sarah Al-Mansoor',
      department: 'Strategy & Sector Development Sector',
      expectedImpact: '+35% Citizen Engagement & 90% Public Service Feedback Loop Resolution',
      milestones: [
        'Civic engagement architectural blueprint & UX testing (Q3 2026)',
        'Integration with National Unified Portal & Absher verification (Q4 2026)',
        'Regional civic innovation hackathon & idea incubator (Q1 2027)',
      ],
    },
    {
      id: 'ai-init-3',
      code: `INIT-AI-${initiatives.length + 3}`,
      title: 'Creative Gastronomy & High-Yield Agritourism Infrastructure',
      titleAr: 'تطوير البنية التحتية لسياحة الطهي الإبداعي والنزل الزراعية المستدامة',
      description:
        'Strategic partnership enablement project building 15 premium farm-stay lodges, artisan palm craftsmanship studios, and culinary heritage culinary discovery routes.',
      descriptionAr:
        'مشروع تمكين الشراكات الاستثمارية لإنشاء نزل سياحية زراعية ومشاغل للحرف اليدوية ومسارات استكشاف فنون الطهي.',
      budgetSAR: 19000000,
      spentSAR: 3800000,
      owner: 'Dr. Tariq Al-Ghamdi',
      department: 'Tourism Destination Management Office',
      expectedImpact: '+SAR 45M Annual Tourism Spend & 650 Direct Local Jobs Created',
      milestones: [
        'Zoning bylaws release for agricultural tourism concessions (Q2 2026)',
        'Private investment co-financing matching fund launch (Q3 2026)',
        'Opening of first 8 heritage agritourism farm stays (Q1 2027)',
      ],
    },
  ];

  const AI_KPI_RECOMMENDATIONS = [
    {
      id: 'ai-kpi-1',
      code: `KPI-AI-${kpis.length + 1}`,
      name: 'Oasis Cultural Visitor Experience Quality Index',
      nameAr: 'مؤشر جودة تجربة زوار المعالم الثقافية والتراثية بالواحة',
      formula: 'Standardized Visitor Satisfaction Survey (NPS + Experience Criteria / 100)',
      unit: 'Score / 100',
      target: 88,
      actual: 82,
      baseline: '74',
      frequency: 'Quarterly' as const,
      type: 'Lagging' as const,
      weight: 25,
      rationale:
        'Directly measures perception of heritage sites and service hospitality quality across Al-Ahsa.',
    },
    {
      id: 'ai-kpi-2',
      code: `KPI-AI-${kpis.length + 2}`,
      name: 'Heritage Canal Restoration & Water Flow Rate',
      nameAr: 'نسبة إنجاز ترميم قنوات المياه التراثية وكفاءة الجريان',
      formula: '(Kilometers of Restored Operational Canals / Total Planned Kilometers) * 100%',
      unit: '%',
      target: 85,
      actual: 62,
      baseline: '30%',
      frequency: 'Monthly' as const,
      type: 'Leading' as const,
      weight: 30,
      rationale:
        'Leading execution indicator reflecting water conservation infrastructure readiness.',
    },
    {
      id: 'ai-kpi-3',
      code: `KPI-AI-${kpis.length + 3}`,
      name: 'Community Satisfaction with Spatial Urban Living',
      nameAr: 'معدل رضا المجتمع المحلي عن جودة الحياة والمرافق الحضرية',
      formula: 'Annual Al-Ahsa Urban Quality of Life Comprehensive Survey Result',
      unit: '%',
      target: 90,
      actual: 84,
      baseline: '76%',
      frequency: 'Annual' as const,
      type: 'Lagging' as const,
      weight: 25,
      rationale:
        'Core strategic outcome metric evaluating alignment with Saudi Vision 2030 Quality of Life.',
    },
  ];

  const handleAdoptInitiative = (init: typeof AI_INITIATIVE_RECOMMENDATIONS[0]) => {
    addInitiative({
      code: init.code,
      title: init.title,
      titleAr: init.titleAr,
      description: init.description,
      objectiveId: currentObj?.id || 'obj-1',
      objectiveTitle: currentObj?.title || 'Elevate Sustainable Heritage & Agri-Tourism Capacity',
      owner: init.owner,
      department: init.department,
      budgetSAR: init.budgetSAR,
      spentSAR: init.spentSAR,
      progress: 15,
      status: 'In Progress',
      risksCount: 0,
      actionsCount: 0,
      startDate: '2026-03-01',
      endDate: '2027-12-31',
      milestones: init.milestones.map((m, idx) => ({
        id: `ms-${Date.now()}-${idx}`,
        title: m,
        dueDate: '2026-12-31',
        completed: idx === 0,
        status: (idx === 0 ? 'Completed' : 'In Progress') as 'Completed' | 'In Progress' | 'Pending',
      })),
    });

    setAdoptedInitiatives([...adoptedInitiatives, init.id]);
    toast.success(
      lang === 'ar' ? 'تم اعتماد وإضافة المبادرة إلى الخطة الاستراتيجية بنجاح!' : 'AI Initiative Adopted & Added to Strategy!',
      {
        description: `${init.code}: ${lang === 'ar' ? init.titleAr : init.title}`,
      }
    );
  };

  const handleAdoptKpi = (kpi: typeof AI_KPI_RECOMMENDATIONS[0]) => {
    addKPI({
      code: kpi.code,
      name: kpi.name,
      nameAr: kpi.nameAr,
      objectiveId: currentObj?.id || 'obj-1',
      objectiveTitle: currentObj?.title || 'Elevate Sustainable Heritage & Agri-Tourism Capacity',
      owner: currentObj?.owner || 'Eng. Fahad Al-Subaie',
      achievementPct: Math.round((kpi.actual / kpi.target) * 100),
      formula: kpi.formula,
      unit: kpi.unit,
      target: kpi.target,
      actual: kpi.actual,
      frequency: kpi.frequency,
      status: 'on-track',
      baseline: kpi.baseline,
      target2026: `${kpi.target}${kpi.unit === '%' ? '%' : ''}`,
      target2027: `${kpi.target + 5}${kpi.unit === '%' ? '%' : ''}`,
      type: kpi.type,
      weight: kpi.weight,
    });

    setAdoptedKpis([...adoptedKpis, kpi.id]);
    toast.success(
      lang === 'ar' ? 'تم اعتماد وإضافة مؤشر الأداء إلى النظام بنجاح!' : 'AI KPI Adopted & Added to Metrics Register!',
      {
        description: `${kpi.code}: ${lang === 'ar' ? kpi.nameAr : kpi.name}`,
      }
    );
  };

  const refinedTitle = currentObj
    ? `Elevate ${currentObj.title} via Sustainable Regional Excellence & Spatial Alignment`
    : 'Elevate Sustainable Heritage & Agri-Tourism Capacity Across Al-Ahsa';
  const refinedTitleAr = currentObj?.titleAr
    ? `تعزيز ${currentObj.titleAr} عبر التميز التنموي المستدام والمواءمة المكانية`
    : 'الارتقاء بالطاقة الاستيعابية للسياحة التراثية والزراعية المستدامة في واحة الأحساء';
  const refinedDescription =
    'Systematically coordinate cross-sector investments, municipal spatial planning, and community participation to achieve measurable economic resilience in full alignment with Saudi Vision 2030.';
  const refinedDescriptionAr =
    'تنسيق الاستثمارات المشتركة والتخطيط المكاني والمشاركة المجتمعية لتحقيق أثر اقتصادي مستدام بمواءمة تامة مع مستهدفات رؤية 2030.';

  const handleApplyWording = () => {
    if (onApplyWording) {
      onApplyWording(
        lang === 'ar' ? refinedTitleAr : refinedTitle,
        lang === 'ar' ? refinedDescriptionAr : refinedDescription
      );
    }
    toast.success(
      lang === 'ar' ? 'تم تطبيق الصياغة الذكية المعززة بنجاح!' : 'Refined SMART Wording Applied to Objective!'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="p-5 border-b border-slate-200/80 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {lang === 'ar' ? 'مساعد الذكاء الاصطناعي التوليدي' : 'AI STRATEGY COPILOT'}
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {lang === 'ar' ? 'المواءمة التلقائية' : 'Strategic Cascade Assist'}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                {lang === 'ar'
                  ? 'مستشار التخطيط الاستراتيجي بالذكاء الاصطناعي'
                  : 'AI Strategy Advisor & Cascading Recommendations'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Objective Context Strip */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Target className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="text-xs">
              <span className="text-slate-500 font-medium">
                {lang === 'ar' ? 'الهدف الاستراتيجي النشط:' : 'Target Objective:'}
              </span>{' '}
              <strong className="text-slate-900 font-bold">
                {currentObj ? (lang === 'ar' ? currentObj.titleAr || currentObj.title : currentObj.title) : 'Active Plan'}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-medium">
              {lang === 'ar' ? 'تبديل الهدف:' : 'Switch Objective:'}
            </span>
            <select
              value={activeObjectiveId}
              onChange={(e) => setActiveObjectiveId(e.target.value)}
              className="text-xs py-1 px-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {objectives.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.code} - {lang === 'ar' ? o.titleAr || o.title : o.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1 p-2 bg-slate-100/80 border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('initiatives')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'initiatives'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'ar' ? 'المبادرات المقترحة' : 'Suggested Initiatives'}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-50 text-blue-700">
              {AI_INITIATIVE_RECOMMENDATIONS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('kpis')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'kpis'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>{lang === 'ar' ? 'مؤشرات الأداء المقترحة' : 'Suggested KPIs & Formulas'}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-50 text-indigo-700">
              {AI_KPI_RECOMMENDATIONS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('refinement')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'refinement'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'ar' ? 'صياغة SMART والمواءمة' : 'SMART Wording & Vision 2030'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: SUGGESTED INITIATIVES */}
          {activeTab === 'initiatives' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 leading-relaxed">
                {lang === 'ar'
                  ? 'يقترح الذكاء الاصطناعي مبادرات استراتيجية مدروسة لتحقيق مستهدفات هذا الهدف مباشرة، مع خطة المعالم الرئيسية والميزانيات التقديرية:'
                  : 'AI has analyzed the strategic objective scope and identified high-impact initiatives to operationalize the goal. Click "+ Adopt Initiative" to insert directly into your live register.'}
              </div>

              <div className="space-y-3">
                {AI_INITIATIVE_RECOMMENDATIONS.map((init) => {
                  const isAdopted = adoptedInitiatives.includes(init.id);
                  return (
                    <div
                      key={init.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isAdopted
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : 'bg-white border-slate-200/90 hover:border-blue-300 shadow-xs'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                              {init.code}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              {init.department}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {lang === 'ar' ? init.titleAr : init.title}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {lang === 'ar' ? init.descriptionAr : init.description}
                          </p>
                        </div>

                        <div className="shrink-0 sm:text-end space-y-2">
                          <div className="text-xs font-mono font-bold text-slate-900">
                            {(init.budgetSAR / 1000000).toFixed(1)}M SAR
                          </div>
                          <button
                            disabled={isAdopted}
                            onClick={() => handleAdoptInitiative(init)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isAdopted
                                ? 'bg-emerald-600 text-white cursor-default'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                            }`}
                          >
                            {isAdopted ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>{lang === 'ar' ? 'تم الاعتماد' : 'Adopted'}</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>{lang === 'ar' ? 'اعتماد المبادرة' : 'Adopt Initiative'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expected Impact Strip */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <span className="text-emerald-700 font-medium">
                          ✦ {lang === 'ar' ? 'الأثر المتوقع:' : 'Estimated Impact:'} {init.expectedImpact}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {init.milestones.length} {lang === 'ar' ? 'معالم رئيسية مبرمجة' : 'milestones attached'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SUGGESTED KPIS */}
          {activeTab === 'kpis' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 leading-relaxed">
                {lang === 'ar'
                  ? 'مؤشرات أداء مقاسة وموصى بها لقياس تقدم الهدف الاستراتيجي بدقة مع معادلات الاحتساب ومستهدفات الأداء المعتمدة:'
                  : 'AI-formulated KPI definitions with standard formulas, baselines, and multi-year targets. Click "+ Adopt KPI" to insert directly into your KPI dictionary.'}
              </div>

              <div className="space-y-3">
                {AI_KPI_RECOMMENDATIONS.map((kpi) => {
                  const isAdopted = adoptedKpis.includes(kpi.id);
                  return (
                    <div
                      key={kpi.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isAdopted
                          ? 'bg-emerald-50/50 border-emerald-300'
                          : 'bg-white border-slate-200/90 hover:border-indigo-300 shadow-xs'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                              {kpi.code}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                              {kpi.type} Indicator • {kpi.frequency}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {lang === 'ar' ? kpi.nameAr : kpi.name}
                          </h4>
                          <div className="p-2 rounded bg-slate-50 border border-slate-200/60 font-mono text-[11px] text-slate-700">
                            <span className="text-slate-400 font-semibold">{lang === 'ar' ? 'المعادلة: ' : 'Formula: '}</span>
                            {kpi.formula}
                          </div>
                          <p className="text-xs text-slate-500">{kpi.rationale}</p>
                        </div>

                        <div className="shrink-0 sm:text-end space-y-2">
                          <div className="text-xs font-mono">
                            <span className="text-slate-400">{lang === 'ar' ? 'المستهدف: ' : 'Target: '}</span>
                            <strong className="text-slate-900 font-bold text-sm">
                              {kpi.target} {kpi.unit}
                            </strong>
                          </div>
                          <button
                            disabled={isAdopted}
                            onClick={() => handleAdoptKpi(kpi)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isAdopted
                                ? 'bg-emerald-600 text-white cursor-default'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                            }`}
                          >
                            {isAdopted ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>{lang === 'ar' ? 'تم الاعتماد' : 'Adopted'}</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>{lang === 'ar' ? 'اعتماد المؤشر' : 'Adopt KPI'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SMART REFINEMENT */}
          {activeTab === 'refinement' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500 leading-relaxed">
                {lang === 'ar'
                  ? 'يقوم الذكاء الاصطناعي بمراجعة صياغة الهدف وفقاً لمعايير SMART ومواءمته مع أهداف رؤية السعودية 2030 التنموية:'
                  : 'AI analyzes the wording against standard SMART criteria (Specific, Measurable, Achievable, Relevant, Time-Bound) and tightens alignment with Saudi Vision 2030.'}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                    {lang === 'ar' ? 'الصياغة الحالية' : 'Current Draft'}
                  </span>
                  <div className="font-bold text-slate-800 text-sm">
                    {currentObj ? (lang === 'ar' ? currentObj.titleAr || currentObj.title : currentObj.title) : '—'}
                  </div>
                  <p className="text-xs text-slate-500">
                    {currentObj?.description || (lang === 'ar' ? 'لا يوجد وصف مفصل' : 'No description provided')}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {lang === 'ar' ? 'الصياغة الذكية المقترحة (SMART)' : 'AI-Optimized SMART Wording'}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      98% Fit Score
                    </span>
                  </div>
                  <div className="font-bold text-emerald-950 text-sm">
                    {lang === 'ar' ? refinedTitleAr : refinedTitle}
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {lang === 'ar' ? refinedDescriptionAr : refinedDescription}
                  </p>
                </div>
              </div>

              {/* SMART Analysis Breakdown */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <h5 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wide">
                  {lang === 'ar' ? 'تحليل معايير SMART والمواءمة الوطنية' : 'SMART & Vision 2030 Assessment'}
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-medium">
                    <div className="text-[10px] font-mono text-blue-600 font-bold">Specific</div>
                    <div>100% Clear</div>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 font-medium">
                    <div className="text-[10px] font-mono text-indigo-600 font-bold">Measurable</div>
                    <div>KPI Linked</div>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
                    <div className="text-[10px] font-mono text-emerald-600 font-bold">Achievable</div>
                    <div>Budgeted</div>
                  </div>
                  <div className="p-2 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 font-medium">
                    <div className="text-[10px] font-mono text-teal-600 font-bold">Relevant</div>
                    <div>Vision 2030</div>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 font-medium">
                    <div className="text-[10px] font-mono text-purple-600 font-bold">Time-Bound</div>
                    <div>Target 2026-30</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleApplyWording}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {lang === 'ar' ? 'اعتماد وتطبيق الصياغة المحسنة' : 'Apply Refined Wording to Objective'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>
              {lang === 'ar'
                ? 'مبني وفق معايير مركز قياس الأداء الحكومي (أداء) ورؤية 2030'
                : 'Formulated per National Adaa & Saudi Vision 2030 Framework'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
          >
            {lang === 'ar' ? 'إغلاق المساعد' : 'Close Copilot'}
          </button>
        </div>
      </div>
    </div>
  );
};
