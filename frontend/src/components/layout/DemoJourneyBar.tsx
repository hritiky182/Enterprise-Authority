import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Compass,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Layers,
  Flag,
  ArrowRight,
  Minimize2,
  Maximize2,
  ExternalLink,
} from 'lucide-react';

export const DEMO_JOURNEY_STEPS = [
  {
    step: 1,
    title: 'Login (Strategy Specialist)',
    titleAr: 'تسجيل الدخول (أخصائي الاستراتيجية)',
    path: '/login',
    storyCue: 'Dedicated Strategy Specialist persona (Dr. Sarah Al-Rashid) with single-click authentication and automated onboarding.',
    storyCueAr: 'تسجيل دخول أخصائي الاستراتيجية (د. سارة الرشيد) بنقرة واحدة مع تهيئة الصلاحيات الفورية.',
  },
  {
    step: 2,
    title: 'Entity Branding & Setup',
    titleAr: 'إعداد وهوية المنظومة',
    path: '/organization/setup',
    storyCue: 'Demonstrate white-label customization, corporate emblem, brand palette, vision, mission & core values.',
    storyCueAr: 'إظهار التخصيص الكامل لشعار المنظومة، وهوية الألوان، والرؤية، والرسالة، والقيم الاستراتيجية.',
  },
  {
    step: 3,
    title: 'Org Hierarchy & Permissions',
    titleAr: 'الهيكل التنظيمي والصلاحيات',
    path: '/org-structure',
    storyCue: 'Show live hierarchy from CEO → 5 Sectors → Units → Users with interactive editable units & RBAC matrix.',
    storyCueAr: 'استعراض الهيكل التنفيذي المتسلسل: الرئيس التنفيذي ← 5 قطاعات ← الإدارات والموظفون مع تعديل الصلاحيات.',
  },
  {
    step: 4,
    title: 'Strategy Planning & Cascade',
    titleAr: 'التخطيط الاستراتيجي والمواءمة',
    path: '/strategy/create',
    storyCue: 'Define Strategy Name, Duration Horizon & Mandate Statement, then cascade Pillars ➔ Objectives ➔ KPIs ➔ Initiatives.',
    storyCueAr: 'تحديد اسم الاستراتيجية والمدى الزمني ووثيقة التكليف، ثم ربط الركائز ← الأهداف ← المؤشرات ← المبادرات.',
  },
  {
    step: 5,
    title: 'Objectives Management',
    titleAr: 'سجل المستهدفات التكتيكية',
    path: '/objectives',
    storyCue: 'Demonstrate objective ownership, target horizons (2026/2027), department alignment, and progress tracking.',
    storyCueAr: 'إبراز ملكية المستهدفات، والمدى الزمني، ومسؤولية الإدارات، ومتابعة نسب الإنجاز الفعلي.',
  },
  {
    step: 6,
    title: 'KPIs (+ AI Copilot)',
    titleAr: 'مؤشرات الأداء (+ الذكاء الاصطناعي)',
    path: '/kpis',
    storyCue: 'Highlight KPI attributes (Leading/Lagging, Formula, Weight) + ✨ Embedded AI Copilot for KPI recommendations.',
    storyCueAr: 'إظهار خصائص المؤشرات (المعادلة الرياضية، الوزن النسبي) + ✨ مساعد الذكاء الاصطناعي لاقتراح المؤشرات.',
  },
  {
    step: 7,
    title: 'Initiatives (+ AI Copilot)',
    titleAr: 'المبادرات الاستراتيجية (+ AI)',
    path: '/initiatives',
    storyCue: 'Show project portfolios, budgets (SAR M), deliverables + ✨ AI Copilot recommending roadmap milestones.',
    storyCueAr: 'استعراض محافظ المشاريع، والميزانيات المعتمدة + ✨ مساعد الذكاء الاصطناعي لاقتراح معالم خارطة الطريق.',
  },
  {
    step: 8,
    title: 'Cascading Strategy Matrix',
    titleAr: 'مصفوفة المواءمة الاستراتيجية',
    path: '/strategy',
    storyCue: 'Show the unified Strategy Matrix connecting Pillars to Projects with live Excel & PDF export.',
    storyCueAr: 'عرض مصفوفة المواءمة الشاملة التي تربط الرؤية بالمشاريع مع التصدير المباشر لـ Excel و PDF.',
  },
  {
    step: 9,
    title: 'Performance & Export Options',
    titleAr: 'متابعة الأداء وخيارات التصدير',
    path: '/performance',
    storyCue: 'Monitor KPI targets vs actuals, export instant CSV scorecards and generate the Executive Brief PDF dossier.',
    storyCueAr: 'متابعة مستهدفات مؤشرات الأداء، وتصدير ملفات CSV التفصيلية وتوليد التقرير التنفيذي PDF.',
  },
  {
    step: 10,
    title: 'Executive Dashboard & Reports',
    titleAr: 'لوحة القيادة التنفيذية والتقارير',
    path: '/',
    storyCue: 'Deliver the final punch: CEO Strategy Health Scorecard, budget execution gauge & executive board reporting.',
    storyCueAr: 'ختام رحلة العرض: لوحة القيادة للرئيس التنفيذي، وكفاءة الصرف المالي، وتوليد التقارير التنفيذية.',
  },
];

export const DemoJourneyBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { demoJourneyStep, setDemoJourneyStep, isDemoJourneyActive, setIsDemoJourneyActive, lang } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync current step with route if route matches
  const currentStepObj =
    DEMO_JOURNEY_STEPS.find((s) => s.path === location.pathname) ||
    DEMO_JOURNEY_STEPS[demoJourneyStep - 1] ||
    DEMO_JOURNEY_STEPS[0]!;

  const currentStep = currentStepObj.step;

  const goToStep = (stepNumber: number) => {
    const target = DEMO_JOURNEY_STEPS[stepNumber - 1];
    if (target) {
      setDemoJourneyStep(stepNumber);
      navigate(target.path);
    }
  };

  const handleNext = () => {
    if (currentStep < DEMO_JOURNEY_STEPS.length) {
      goToStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  if (!isDemoJourneyActive) {
    return (
      <div className="fixed bottom-4 right-4 z-40 animate-in fade-in">
        <button
          onClick={() => setIsDemoJourneyActive(true)}
          className="px-3.5 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 cursor-pointer transition-all border border-blue-400/30 hover:scale-105"
        >
          <Compass className="w-3.5 h-3.5 animate-spin-slow" />
          <span>{lang === 'ar' ? 'تشغيل مرشد رحلة العرض التجريبي' : 'Start Demo Journey Flow'}</span>
        </button>
      </div>
    );
  }

  if (isCollapsed) {
    return (
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white border-b border-blue-800/40 px-4 py-2 flex items-center justify-between text-xs font-sans shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono font-bold text-blue-300 text-[11px]">
            {lang === 'ar' ? `المحطة ${currentStep} من ${DEMO_JOURNEY_STEPS.length}:` : `DEMO JOURNEY • STEP ${currentStep}/${DEMO_JOURNEY_STEPS.length}:`}
          </span>
          <span className="font-semibold text-white truncate max-w-xs sm:max-w-md">
            {lang === 'ar' ? currentStepObj.titleAr : currentStepObj.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={lang === 'ar' ? 'توسيع المرشد' : 'Expand Guide'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white border-b border-blue-800/40 px-4 py-2.5 shadow-md font-sans animate-in fade-in slide-in-from-top-1">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Journey Indicator & Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
            <Compass className="w-4 h-4 text-blue-400 animate-spin-slow" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">
                {lang === 'ar' ? `المحطة ${currentStep} من 10` : `CLIENT DEMO JOURNEY • ${currentStep}/10`}
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-white">
                {lang === 'ar' ? currentStepObj.titleAr : currentStepObj.title}
              </h3>
            </div>
            <p className="text-[11px] text-blue-200/90 mt-0.5 line-clamp-1">
              <span className="text-amber-300 font-medium">
                {lang === 'ar' ? 'حديث العرض:' : 'Story Cue:'}
              </span>{' '}
              {lang === 'ar' ? currentStepObj.storyCueAr : currentStepObj.storyCue}
            </p>
          </div>
        </div>

        {/* Center/Right: Stepper Selector and Next/Prev Controls */}
        <div className="flex items-center gap-2 justify-end shrink-0">
          {/* Quick Step Selector Dropdown */}
          <select
            value={currentStep}
            onChange={(e) => goToStep(Number(e.target.value))}
            className="bg-slate-900/90 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            {DEMO_JOURNEY_STEPS.map((s) => (
              <option key={s.step} value={s.step}>
                {s.step}. {lang === 'ar' ? s.titleAr : s.title}
              </option>
            ))}
          </select>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="p-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            title={lang === 'ar' ? 'المحطة السابقة' : 'Previous Step'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentStep === DEMO_JOURNEY_STEPS.length}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
          >
            <span>{lang === 'ar' ? 'المحطة التالية' : 'Next Step'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Minimize */}
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-white/10 rounded-lg transition-colors cursor-pointer ml-1"
            title={lang === 'ar' ? 'تصغير' : 'Collapse'}
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>

          {/* Close / Hide */}
          <button
            onClick={() => setIsDemoJourneyActive(false)}
            className="text-[11px] text-slate-400 hover:text-rose-400 px-1.5 py-1 transition-colors cursor-pointer"
            title={lang === 'ar' ? 'إخفاء المرشد' : 'Hide Journey Bar'}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
