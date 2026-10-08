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
  Map,
  Building2,
  Network,
  Target,
  TrendingUp,
} from 'lucide-react';

export const MOM_JOURNEY_STAGES = [
  {
    stage: 1,
    chapter: 1,
    title: 'Chapter 1: Organization & Entity Setup',
    titleAr: 'الفصل 1: تأسيس وهوية المنظومة',
    path: '/organization/setup',
    cue: 'Configure organization name, emblem logo, colors, branding theme, mission, vision, and executive mandate.',
    cueAr: 'إعداد اسم المنظومة، الشعار الرسمي، الألوان، الرؤية والرسالة، وبيان التكليف القيادي.',
  },
  {
    stage: 2,
    chapter: 2,
    title: 'Chapter 2: Organization Hierarchy & Permissions',
    titleAr: 'الفصل 2: الهيكل التنظيمي ومصفوفة الصلاحيات',
    path: '/org-structure',
    cue: 'Establish organizational hierarchy: CEO level → Sectors → Departments → Users, with enforced RBAC permissions matrix.',
    cueAr: 'بناء الهيكل التنظيمي: القيادة ← القطاعات ← الإدارات ← الموظفين، وضبط مصفوفة الصلاحيات المؤسسية.',
  },
  {
    stage: 3,
    chapter: 3,
    title: 'Chapter 3.1: Strategic Foundation & Pillars',
    titleAr: 'الفصل 3.1: أسس الاستراتيجية والركائز',
    path: '/strategy/identity',
    cue: 'Define strategy name, duration, executive statement, vision, mission, and the 4 strategic pillars/themes.',
    cueAr: 'صياغة اسم الاستراتيجية ومداها الزمني والركائز الأربعة المعتمدة لهيئة تطوير الأحساء.',
  },
  {
    stage: 4,
    chapter: 3,
    title: 'Chapter 3.2: Strategic Objectives & AI Assist',
    titleAr: 'الفصل 3.2: الأهداف الاستراتيجية ومساعد الذكاء الاصطناعي',
    path: '/objectives',
    cue: 'Formulate objectives associated with pillars, owners, and target years. Leverage AI SMART wording and recommendations.',
    cueAr: 'صياغة الأهداف الاستراتيجية التابعة للركائز وتحديد الملاك وسنوات الاستهداف بمساعدة الذكاء الاصطناعي.',
  },
  {
    stage: 5,
    chapter: 3,
    title: 'Chapter 3.3: KPI Definitions & Measurement Rules',
    titleAr: 'الفصل 3.3: تعريف المؤشرات وقواعد الاحتساب',
    path: '/kpis',
    cue: 'Define KPIs against objectives: Objective → KPI → Formula → Baseline → Target → Actual.',
    cueAr: 'تعريف المؤشرات ضد الأهداف: الهدف ← المؤشر ← معادلة الاحتساب ← خط الأساس ← المستهدف ← الفعلي.',
  },
  {
    stage: 6,
    chapter: 3,
    title: 'Chapter 3.4: Strategic Initiatives & Projects',
    titleAr: 'الفصل 3.4: المبادرات الاستراتيجية والمشاريع',
    path: '/initiatives',
    cue: 'Operationalize strategy through budgeted initiatives, milestone roadmaps, and project dependencies.',
    cueAr: 'تحويل الاستراتيجية إلى تنفيذ عبر مبادرات مرصودة الميزانيات ومعالم الإنجاز المرحلية.',
  },
  {
    stage: 7,
    chapter: 4,
    title: 'Chapter 4.1: Performance Scorecards Monitoring',
    titleAr: 'الفصل 4.1: متابعة الأداء وبطاقات القياس',
    path: '/performance',
    cue: 'Monitor performance summary, periodic trend charts, quick 2x2 statistics, and related objective/KPI health.',
    cueAr: 'متابعة ملخص الأداء المؤسسي، ورسوم الاتجاه الزمني، وإحصائيات المستهدفات والفعليات.',
  },
  {
    stage: 8,
    chapter: 4,
    title: 'Chapter 4.2: Executive Dashboard',
    titleAr: 'الفصل 4.2: لوحة القيادة التنفيذية',
    path: '/',
    cue: 'High-level bird-eye view with role-tailored dashboards for CEO, Strategy Specialist, and Department Heads.',
    cueAr: 'لوحة قيادة تنفيذية شاملة ومخصصة حسب الدور (الرئيس التنفيذي، أخصائي الاستراتيجية، مدراء الإدارات).',
  },
  {
    stage: 9,
    chapter: 4,
    title: 'Chapter 4.3: Reporting & Official Exports',
    titleAr: 'الفصل 4.3: التقارير والتصدير الرسمي (PDF و Excel)',
    path: '/reports',
    cue: 'Generate and download official PDF Executive Dossiers and comprehensive Excel KPI matrices.',
    cueAr: 'توليد وتصدير ملفات التقارير الرسمية التنفيذية بصيغتي PDF و Excel مع جداول البيانات الكاملة.',
  },
];

export const DemoJourneyBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Sync current stage with active route
  const currentStageObj =
    MOM_JOURNEY_STAGES.find((s) => s.path === location.pathname) ||
    MOM_JOURNEY_STAGES[0]!;

  const currentStage = currentStageObj.stage;

  const goToStage = (targetStage: number) => {
    const target = MOM_JOURNEY_STAGES.find((s) => s.stage === targetStage);
    if (target) {
      navigate(target.path);
    }
  };

  const handleNext = () => {
    if (currentStage < MOM_JOURNEY_STAGES.length) {
      goToStage(currentStage + 1);
    }
  };

  const handlePrev = () => {
    if (currentStage > 1) {
      goToStage(currentStage - 1);
    }
  };

  // If collapsed: show super-clean, minimalist 1-line top banner (zero clutter!)
  if (isCollapsed) {
    return (
      <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs font-sans shadow-xs transition-all">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono font-bold text-blue-300 text-[11px]">
            {lang === 'ar' ? `رحلة العرض • ${currentStageObj.titleAr}` : `MOM DEMO JOURNEY • ${currentStageObj.title}`}
          </span>
          <span className="hidden md:inline text-slate-400 text-[11px] truncate max-w-md">
            {lang === 'ar' ? currentStageObj.cueAr : currentStageObj.cue}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct link to Launch Step Form Setup Wizard */}
          <button
            onClick={() => navigate('/setup-wizard')}
            className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
          >
            <Sparkles className="w-3 h-3 text-blue-200" />
            <span>{lang === 'ar' ? 'معالج التأسيس (Step Form)' : 'Step Form Wizard'}</span>
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStage === 1}
            className={`p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer ${
              currentStage === 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            title="Previous Stage"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentStage === MOM_JOURNEY_STAGES.length}
            className={`p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer ${
              currentStage === MOM_JOURNEY_STAGES.length ? 'opacity-30 cursor-not-allowed' : ''
            }`}
            title="Next Stage"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer ml-1"
            title="Expand Journey Details"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Expanded View: Structured cleanly into the 4 MOM Chapters
  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800 p-4 shadow-md space-y-3 transition-all animate-in fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center font-bold text-xs text-blue-300 font-mono">
            {currentStage}
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-blue-400 font-bold tracking-wider">
              {lang === 'ar' ? 'رحلة العرض المعتمدة (Minutes of Meeting)' : 'MOM REQUIRED DEMO JOURNEY'}
            </div>
            <h3 className="text-sm font-bold text-white">
              {lang === 'ar' ? currentStageObj.titleAr : currentStageObj.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/setup-wizard')}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>{lang === 'ar' ? 'فتح معالج التأسيس المتدرج' : 'Open Setup Wizard Step Form'}</span>
          </button>

          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            title="Minimize Bar"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Chapter Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {[
          { chapter: 1, title: 'Ch 1: Entity Setup', titleAr: '1. تأسيس المنظومة', path: '/organization/setup' },
          { chapter: 2, title: 'Ch 2: Org Structure', titleAr: '2. الهيكل والصلاحيات', path: '/org-structure' },
          { chapter: 3, title: 'Ch 3: Strategy Flow', titleAr: '3. إدارة الاستراتيجية', path: '/objectives' },
          { chapter: 4, title: 'Ch 4: Monitoring & Reports', titleAr: '4. المتابعة والتقارير', path: '/performance' },
        ].map((ch) => {
          const isActiveChapter = currentStageObj.chapter === ch.chapter;
          return (
            <button
              key={ch.chapter}
              onClick={() => navigate(ch.path)}
              className={`p-2 rounded-xl border text-start transition-all cursor-pointer flex items-center justify-between ${
                isActiveChapter
                  ? 'bg-blue-900/60 border-blue-500/80 shadow-xs ring-1 ring-blue-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 text-slate-400'
              }`}
            >
              <span className={`text-xs font-bold ${isActiveChapter ? 'text-white' : 'text-slate-300'}`}>
                {lang === 'ar' ? ch.titleAr : ch.title}
              </span>
              <span className="text-[10px] font-mono text-slate-400">CH {ch.chapter}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
        <p className="text-[11px] font-sans truncate max-w-2xl">
          <strong className="text-slate-300">{lang === 'ar' ? 'سرد المرحلة: ' : 'Story Narrative: '}</strong>
          {lang === 'ar' ? currentStageObj.cueAr : currentStageObj.cue}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentStage === 1}
            className={`px-3 py-1 rounded-lg border border-slate-700 bg-slate-800 text-xs text-slate-200 hover:bg-slate-700 cursor-pointer ${
              currentStage === 1 ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            {lang === 'ar' ? 'السابق' : 'Previous'}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStage === MOM_JOURNEY_STAGES.length}
            className={`px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs cursor-pointer ${
              currentStage === MOM_JOURNEY_STAGES.length ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            {lang === 'ar' ? 'المرحلة التالية' : 'Next Stage'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default DemoJourneyBar;
