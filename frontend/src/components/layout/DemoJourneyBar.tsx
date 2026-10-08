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
} from 'lucide-react';
import { StrategyLifecycleDiagramModal } from '../modals/StrategyLifecycleDiagramModal';

export const DEMO_JOURNEY_STEPS = [
  {
    step: 1,
    title: 'Sign in & Personal Workspace',
    titleAr: 'تسجيل الدخول ومساحة العمل الشخصية',
    path: '/workspace',
    storyCue: 'Sign in with named account. Show active role, language, organization, assigned tasks, pending approvals & overdue updates. Switch accounts.',
    storyCueAr: 'تسجيل الدخول بحساب مسمى. إبراز الدور النشط، اللغة، المنظومة، المهام المكلفة، الاعتمادات المعلقة، والتحديثات المتأخرة، مع تبديل الحسابات.',
  },
  {
    step: 2,
    title: 'User Administration',
    titleAr: 'إدارة المستخدمين والأدوار',
    path: '/users',
    storyCue: 'Create user profile with unique identity, email, language, status & effective dates. Show activation, suspension & responsibility reassignment.',
    storyCueAr: 'إنشاء ملف مستخدم بهوية فريدة، بريد، لغة، حالة، وتواريخ سريان. إظهار التفعيل والتعليق وإعادة تعيين المسؤوليات مع حفظ حقوق التأليف التاريخية.',
  },
  {
    step: 3,
    title: 'Organization Structure',
    titleAr: 'الهيكل التنظيمي والوحدات',
    path: '/org-structure',
    storyCue: 'Build authority → sector → department → team. Assign managers and users. Connect units to scorecards. Distinguish reporting vs cross-functional contribution.',
    storyCueAr: 'بناء الهيكل: هيئة ← قطاع ← إدارة ← فريق. تعيين المديرين وربط الوحدات ببطاقات الأداء والملكية، والتمييز بين التبعية الإدارية والمساهمة المشتركة.',
  },
  {
    step: 4,
    title: 'Roles & Permissions',
    titleAr: 'الأدوار ومصفوفة الصلاحيات',
    path: '/admin',
    storyCue: 'Configure view, edit, submit, approve, publish and export rights by scope. Demonstrate allowed update, cross-department denial and blocked self-approval.',
    storyCueAr: 'ضبط صلاحيات العرض، التعديل، الرفع، الاعتماد، النشر، والتصدير حسب النطاق. إثبات التحديث المسموح، وحظر الوصول لإدارة أخرى، ومنع الاعتماد الذاتي.',
  },
  {
    step: 5,
    title: 'Planning Cycle',
    titleAr: 'دورة التخطيط السنوية',
    path: '/planning-cycle',
    storyCue: 'Create strategy horizon, annual cycle, reporting periods, deadlines, owners and approval stages. Show previous approved plan alongside the new draft.',
    storyCueAr: 'تحديد المدى الاستراتيجي، دورة التخطيط السنوية، فترات التقارير، المواعيد النهائية، الملاك، ومراحل الاعتماد. مقارنة الخطة السابقة بالمسودة الجديدة.',
  },
  {
    step: 6,
    title: 'Strategic Diagnosis',
    titleAr: 'التشخيص الاستراتيجي وتتبع الأدلة',
    path: '/strategic-diagnosis',
    storyCue: 'Capture mandate references, stakeholder needs, SWOT findings, baseline performance and evidence. Trace finding to a strategic issue requiring response.',
    storyCueAr: 'حصر مراجع التكليف، احتياجات أصحاب المصلحة، نتائج SWOT، والأدلة الإثباتية. تتبع النتيجة إلى قضية استراتيجية تتطلب استجابة.',
  },
  {
    step: 7,
    title: 'Choices & Prioritization',
    titleAr: 'المفاضلة وتحديد الأولويات',
    path: '/strategic-prioritization',
    storyCue: 'Compare alternative responses using agreed criteria and weights. Recalculate ranking live, select priority, document why options were deferred/rejected.',
    storyCueAr: 'مقارنة البدائل باستخدام معايير وأوزان معتمدة. إعادة حساب الترتيب مباشرة، اختيار الأولوية، وتوثيق أسباب تأجيل أو رفض الخيارات الأخرى.',
  },
  {
    step: 8,
    title: 'Strategic Identity & Themes',
    titleAr: 'الهوية المؤسسية والركائز',
    path: '/strategy/identity',
    storyCue: 'Define vision, mission, values and strategic themes. Connect themes to selected priorities and relevant national Vision 2030 objectives.',
    storyCueAr: 'صياغة الرؤية والرسالة والقيم والركائز الاستراتيجية. ربط الركائز بالأولويات المختارة ومستهدفات رؤية السعودية 2030 الوطنية.',
  },
  {
    step: 9,
    title: 'BSC Configuration',
    titleAr: 'تهيئة بطاقة الأداء المتوازن (BSC)',
    path: '/bsc-config',
    storyCue: 'Configure four perspectives, display order and ownership. Place objectives within perspectives, link to themes. Show completeness & 100% weight validation.',
    storyCueAr: 'تهيئة المحاور الأربعة، ترتيب العرض، والملكية التنفيذية. وضع الأهداف بالمحاور وربطها بالركائز، والتحقق الصارم من توازن الأوزان بنسبة 100%.',
  },
  {
    step: 10,
    title: 'Strategy Map & Objective Cards',
    titleAr: 'خريطة الاستراتيجية وبطاقات الأهداف',
    path: '/strategy-map',
    storyCue: 'Build directional relationships between objectives. Open objective directly from map to view definition, owner, measures, initiatives and dependencies.',
    storyCueAr: 'بناء علاقات سببية موجهة بين الأهداف. فتح بطاقة الهدف مباشرة من الخريطة لمعاينة تعريفه، المالك، المؤشرات، المبادرات، والاعتماديات.',
  },
  {
    step: 11,
    title: 'KPI Dictionary & Targets',
    titleAr: 'قاموس المؤشرات والمستهدفات',
    path: '/kpis',
    storyCue: 'Define formula, unit, baseline, direction, frequency, owner, reviewer, targets, thresholds, aggregation rules. Demonstrate validation of invalid entry.',
    storyCueAr: 'تحديد معادلة المؤشر، الوحدة، خط الأساس، الاتجاه، الدورية، المالك، المراجع، المستهدفات، وقواعد التجميع. إظهار التحقق من صحة المدخلات الخاطئة.',
  },
  {
    step: 12,
    title: 'Departmental Cascading',
    titleAr: 'المواءمة الإدارية التنازلية والصاعدة',
    path: '/departmental-cascade',
    storyCue: 'Create departmental objective supporting corporate objective. Show alignment in both directions, shared KPI ownership without record duplication.',
    storyCueAr: 'إنشاء هدف إداري يدعم الهدف المؤسسي. إظهار المواءمة بالاتجاهين، والملكية المشتركة للمؤشرات ونسب المساهمة دون تكرار السجلات.',
  },
  {
    step: 13,
    title: 'Initiatives & Execution Plans',
    titleAr: 'المبادرات وخطط التنفيذ',
    path: '/initiatives',
    storyCue: 'Create initiative linked to objective & benefit KPIs. Define sponsor, owner, milestones, budget (SAR M), resources, risks. Update milestone live.',
    storyCueAr: 'إنشاء مبادرة مربوطة بالهدف ومؤشرات الأثر. تحديد الراعي، المالك، المعالم، الميزانية، الموارد، المخاطر، وتحديث معلم رئيسي مباشرة.',
  },
  {
    step: 14,
    title: 'Strategy Approval & Publication',
    titleAr: 'اعتماد ونشر خط الأساس',
    path: '/strategy/approval',
    storyCue: 'Submit draft, return item with comments, resolve and approve strategy. Publish controlled baseline and demonstrate restrictions on editing approved content.',
    storyCueAr: 'رفع المسودة، إرجاع عنصر مع ملاحظات، معالجتها واعتماد الاستراتيجية. نشر خط الأساس المحكوم وإثبات تقييد التعديل على المحتوى المعتمد.',
  },
  {
    step: 15,
    title: 'Performance Collection',
    titleAr: 'جمع الأداء واستيراد السجلات',
    path: '/performance/collection',
    storyCue: 'Open reporting period and generate collection tasks. Show due dates, reminders, missing updates. Preview import that rejects invalid/duplicate records.',
    storyCueAr: 'فتح فترة التقارير وتوليد مهام الجمع. إبراز المواعيد والتنبيهات والإدخال اليدوي، مع معاينة استيراد ترفض السجلات الخاطئة والمكررة تلقائياً.',
  },
  {
    step: 16,
    title: 'Actuals, Evidence & Validation',
    titleAr: 'القيم الفعلية والأدلة والتدقيق',
    path: '/performance/actuals',
    storyCue: 'Enter KPI actual with supporting evidence & variance explanation. Submit, return, correct, resubmit and approve through independent reviewer.',
    storyCueAr: 'إدخال القيمة الفعلية مع الأدلة وتفسير التباين. المحاكاة: رفع ➔ إرجاع للتصحيح ➔ تصحيح وإعادة رفع ➔ اعتماد من مراجع مستقل.',
  },
  {
    step: 17,
    title: 'Performance Calculation Engine',
    titleAr: 'محرك احتساب الأداء والتحليل',
    path: '/performance',
    storyCue: 'Explain how actuals become KPI scores and weighted objective scores. Show trends, variance, contributions, data freshness and missing-data treatment.',
    storyCueAr: 'شرح تحويل الفعليات لنقاط المؤشرات والأهداف الموزونة. إظهار الاتجاهات، التباين، مساهمات الإدارات، حداثة البيانات، وقاعدة معالجة القيم المفقودة.',
  },
  {
    step: 18,
    title: 'Corrective Action',
    titleAr: 'الخطط والإجراءات التصحيحية',
    path: '/actions',
    storyCue: 'Create action from underperforming result (<70%). Assign owner, deadline, expected effect and closure evidence. Link action to initiative and risk.',
    storyCueAr: 'توليد إجراء تصحيحي مباشر لمؤشر متعثر. تعيين المالك، الموعد، الأثر المتوقع، وأدلة الإغلاق، مع ربط الإجراء بالمبادرة ومخاطرها.',
  },
  {
    step: 19,
    title: 'Executive Dashboard & Reporting',
    titleAr: 'لوحة القيادة التنفيذية والتقارير',
    path: '/',
    storyCue: 'Switch to executive account. Drill from perspective → objective → KPI → evidence → initiative → action. Generate and open leadership report with Arabic RTL.',
    storyCueAr: 'التحويل للحساب التنفيذي. التعمق 6 مستويات (محور ← هدف ← مؤشر ← دليل ← مبادرة ← إجراء) وتوليد التقرير القيادي بالتنسيق العربي الرسمي.',
  },
  {
    step: 20,
    title: 'Strategy Review & Revision',
    titleAr: 'المراجعة الاستراتيجية والتعديل المحكوم',
    path: '/strategy/review',
    storyCue: 'Record review decisions, owners and deadlines. Freeze reporting snapshot, propose future target amendment, show historical approved reports remain unchanged.',
    storyCueAr: 'توثيق قرارات المراجعة وملاكها ومواعيدها. تجميد لقطة الأداء، اقتراح تعديل مستهدف مستقبلي، وضمان بقاء التقارير التاريخية المعتمدة محصنة دون تغيير.',
  },
];

export const DemoJourneyBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { demoJourneyStep, setDemoJourneyStep, isDemoJourneyActive, setIsDemoJourneyActive, lang } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDiagramModalOpen, setIsDiagramModalOpen] = useState(false);

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
          <span>{lang === 'ar' ? 'دليل دورة حياة الاستراتيجية (20 مرحلة)' : 'Strategy Lifecycle Guide (20 Stages)'}</span>
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
            {lang === 'ar' ? `المرحلة ${currentStep} من ${DEMO_JOURNEY_STEPS.length}:` : `STRATEGIC LIFECYCLE • STAGE ${currentStep}/${DEMO_JOURNEY_STEPS.length}:`}
          </span>
          <span className="font-semibold text-white truncate max-w-xs sm:max-w-md">
            {lang === 'ar' ? currentStepObj.titleAr : currentStepObj.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDiagramModalOpen(true)}
            className="px-2 py-1 bg-blue-900/60 hover:bg-blue-800 border border-blue-600/40 rounded-lg text-[11px] font-semibold flex items-center gap-1 text-blue-200 transition-colors cursor-pointer"
          >
            <Map className="w-3 h-3 text-emerald-400" />
            <span>{lang === 'ar' ? 'المخطط' : 'Flowchart'}</span>
          </button>
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={lang === 'ar' ? 'توسيع المرشد' : 'Expand Guide'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <StrategyLifecycleDiagramModal
          isOpen={isDiagramModalOpen}
          onClose={() => setIsDiagramModalOpen(false)}
          currentStep={currentStep}
          onSelectStep={(step) => goToStep(step)}
        />
      </div>
    );
  }

  return (
    <>
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
                  {lang === 'ar' ? `المرحلة ${currentStep} من ${DEMO_JOURNEY_STEPS.length}` : `STRATEGY LIFECYCLE • STAGE ${currentStep}/${DEMO_JOURNEY_STEPS.length}`}
                </span>
                <h3 className="font-bold text-xs sm:text-sm text-white">
                  {lang === 'ar' ? currentStepObj.titleAr : currentStepObj.title}
                </h3>
              </div>
              <p className="text-[11px] text-blue-200/90 mt-0.5 line-clamp-1">
                <span className="text-amber-300 font-medium">
                  {lang === 'ar' ? 'مسار العمل:' : 'Workflow Guide:'}
                </span>{' '}
                {lang === 'ar' ? currentStepObj.storyCueAr : currentStepObj.storyCue}
              </p>
            </div>
          </div>

          {/* Center/Right: Diagram Button, Stepper Selector and Next/Prev Controls */}
          <div className="flex items-center gap-2 justify-end shrink-0">
            {/* High-Level Flowchart Modal Trigger */}
            <button
              onClick={() => setIsDiagramModalOpen(true)}
              className="px-2.5 py-1.5 bg-blue-900/80 hover:bg-blue-800 border border-blue-500/40 text-blue-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer hover:border-blue-400"
              title={lang === 'ar' ? 'عرض مخطط مسار العمل المعتمد كاملاً' : 'View High-Level Authoritative Lifecycle Flowchart'}
            >
              <Map className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline font-mono text-[11px]">
                {lang === 'ar' ? 'مخطط المسار' : 'View Flowchart'}
              </span>
            </button>

            {/* Quick Step Selector Dropdown (All 20 Steps) */}
            <select
              value={currentStep}
              onChange={(e) => goToStep(Number(e.target.value))}
              className="bg-slate-900/90 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer max-w-[200px] sm:max-w-[240px] truncate"
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
              title={lang === 'ar' ? 'المرحلة السابقة' : 'Previous Step'}
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentStep === DEMO_JOURNEY_STEPS.length}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <span>{lang === 'ar' ? 'المرحلة التالية' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
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

      {/* Authoritative Diagram Modal */}
      <StrategyLifecycleDiagramModal
        isOpen={isDiagramModalOpen}
        onClose={() => setIsDiagramModalOpen(false)}
        currentStep={currentStep}
        onSelectStep={(step) => goToStep(step)}
      />
    </>
  );
};
