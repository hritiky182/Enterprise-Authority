import React from 'react';
import { X, ArrowRight, ArrowDown, ArrowUp, CheckCircle2, RotateCcw, Sparkles, Compass, Layers, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface LifecycleNode {
  id: string;
  label: string;
  labelAr: string;
  stepNumbers: number[];
  targetPath: string;
  decision?: boolean;
  color: string;
  borderColor: string;
  bgActive: string;
}

export const StrategyLifecycleDiagramModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  onSelectStep: (step: number) => void;
}> = ({ isOpen, onClose, currentStep, onSelectStep }) => {
  const { lang } = useApp();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNodeClick = (node: LifecycleNode) => {
    const primaryStep = node.stepNumbers[0] || 1;
    onSelectStep(primaryStep);
    navigate(node.targetPath);
    onClose();
  };

  const isNodeActive = (stepNumbers: number[]) => stepNumbers.includes(currentStep);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 font-sans">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  {lang === 'ar' ? 'مخطط سير العمل المعتمد' : 'AUTHORITATIVE LIFECYCLE FLOW'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lang === 'ar' ? 'المرحلة الحالية:' : 'Current Step:'} {currentStep} / 20
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                {lang === 'ar' ? 'مخطط رحلة الاستراتيجية والأداء المؤسسي' : 'End-to-End Strategic Management & Performance Lifecycle'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend & Instructions */}
        <div className="px-5 py-2.5 bg-blue-950/30 border-b border-blue-900/30 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-500"></span>
              {lang === 'ar' ? 'خطوة تشغيلية' : 'Activity Step'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
              {lang === 'ar' ? 'بوابة اعتماد وقرار' : 'Governance Gate (Decision)'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 animate-ping"></span>
              {lang === 'ar' ? 'المرحلة النشطة الآن' : 'Currently Active'}
            </span>
          </div>
          <span className="text-[11px] text-blue-300 font-mono">
            {lang === 'ar' ? 'انقر فوق أي مرحلة للانتقال المباشر إليها' : 'Click any box to navigate directly to that stage'}
          </span>
        </div>

        {/* Diagram Flow Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
          <div className="max-w-2xl mx-auto space-y-3 font-sans">
            
            {/* 1. Sign in & define users */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n1',
                  label: 'Sign in and define users',
                  labelAr: 'تسجيل الدخول وإدارة المستخدمين',
                  stepNumbers: [1, 2],
                  targetPath: '/workspace',
                  color: 'text-blue-200',
                  borderColor: 'border-blue-500/40',
                  bgActive: 'bg-blue-600/30 ring-2 ring-blue-400',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([1, 2])
                  ? 'bg-blue-600/20 border-blue-400 ring-2 ring-blue-500/50 shadow-blue-500/20'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  1-2
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'تسجيل الدخول وتحديد المستخدمين' : 'Sign in and define users'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'مساحة العمل الشخصية + سجل وصلاحيات المستخدمين' : 'Personal workspace • User administration & roles'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 2. Create organization and permissions */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n2',
                  label: 'Create organization and permissions',
                  labelAr: 'إنشاء الهيكل التنظيمي والصلاحيات',
                  stepNumbers: [3, 4],
                  targetPath: '/org-structure',
                  color: 'text-blue-200',
                  borderColor: 'border-blue-500/40',
                  bgActive: 'bg-blue-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([3, 4])
                  ? 'bg-blue-600/20 border-blue-400 ring-2 ring-blue-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  3-4
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'إنشاء الهيكل التنظيمي ومصفوفة الصلاحيات' : 'Create organization and permissions'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'الهيكل (هيئة ← قطاع ← إدارة ← فريق) + صلاحيات النطاق وحظر الاعتماد الذاتي' : 'Org units (CEO → Sectors → Teams) • Scope RBAC & 4-Eyes rule'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 3. Establish planning cycle */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n3',
                  label: 'Establish planning cycle',
                  labelAr: 'تأسيس دورة التخطيط السنوية',
                  stepNumbers: [5],
                  targetPath: '/planning-cycle',
                  color: 'text-indigo-200',
                  borderColor: 'border-indigo-500/40',
                  bgActive: 'bg-indigo-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([5])
                  ? 'bg-indigo-600/20 border-indigo-400 ring-2 ring-indigo-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-indigo-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  5
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'تأسيس دورة التخطيط (Establish planning cycle)' : 'Establish planning cycle'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'المدى الاستراتيجي + دورات التقارير + مقارنة الخطة السابقة بالمسودة الجديدة' : 'Horizons, cycles, periods, deadlines & approved plan vs new draft'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 4. Analyze evidence and select priorities */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n4',
                  label: 'Analyze evidence and select priorities',
                  labelAr: 'تحليل الأدلة واختيار الأولويات',
                  stepNumbers: [6, 7],
                  targetPath: '/strategic-diagnosis',
                  color: 'text-teal-200',
                  borderColor: 'border-teal-500/40',
                  bgActive: 'bg-teal-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([6, 7])
                  ? 'bg-teal-600/20 border-teal-400 ring-2 ring-teal-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-teal-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-teal-600/30 text-teal-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  6-7
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'تحليل الأدلة واختيار الأولويات (Analyze evidence & select priorities)' : 'Analyze evidence and select priorities'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'التشخيص الاستراتيجي (SWOT) + مصفوفة المفاضلة وتحديد الأولويات بالأوزان' : 'Mandate, SWOT findings, traceability & multi-criteria prioritization'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 5. Craft strategy and BSC map */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n5',
                  label: 'Craft strategy and BSC map',
                  labelAr: 'صياغة الاستراتيجية وخريطة بطاقة الأداء المتوازن (BSC)',
                  stepNumbers: [8, 9, 10],
                  targetPath: '/strategy/identity',
                  color: 'text-blue-200',
                  borderColor: 'border-blue-500/40',
                  bgActive: 'bg-blue-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([8, 9, 10])
                  ? 'bg-blue-600/20 border-blue-400 ring-2 ring-blue-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  8-10
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'صياغة الاستراتيجية وخريطة BSC' : 'Craft strategy and BSC map'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'الرؤية والرسالة والركائز + المحاور الأربعة والتحقق من الأوزان (100%) + بطاقات الأهداف' : 'Identity & Themes • BSC 4 perspectives & 100% weight check • Strategy Map'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 6. Define KPIs and cascade objectives */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n6',
                  label: 'Define KPIs and cascade objectives',
                  labelAr: 'تحديد المؤشرات ومواءمة الأهداف الإدارية',
                  stepNumbers: [11, 12],
                  targetPath: '/kpis',
                  color: 'text-emerald-200',
                  borderColor: 'border-emerald-500/40',
                  bgActive: 'bg-emerald-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([11, 12])
                  ? 'bg-emerald-600/20 border-emerald-400 ring-2 ring-emerald-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  11-12
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'تحديد المؤشرات ومواءمة الأهداف (Define KPIs & cascade)' : 'Define KPIs and cascade objectives'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'قاموس المؤشرات والتحقق من صحة المدخلات + المواءمة ثنائية الاتجاه مع الإدارات' : 'KPI dictionary & targets validation • Departmental cascading'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 7. Plan initiatives and resources */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n7',
                  label: 'Plan initiatives and resources',
                  labelAr: 'تخطيط المبادرات والموارد',
                  stepNumbers: [13],
                  targetPath: '/initiatives',
                  color: 'text-amber-200',
                  borderColor: 'border-amber-500/40',
                  bgActive: 'bg-amber-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([13])
                  ? 'bg-amber-600/20 border-amber-400 ring-2 ring-amber-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-amber-600/30 text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  13
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'تخطيط المبادرات والموارد (Plan initiatives & resources)' : 'Plan initiatives and resources'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'المعالم، الميزانية (SAR M)، الموارد، المخاطر، وتحديث معلم مباشر' : 'Milestones, budget, resources, dependencies, risks & live milestone update'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* Decision 1: Strategy approved? */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'd1',
                  label: 'Strategy approved?',
                  labelAr: 'هل تم اعتماد الاستراتيجية؟',
                  stepNumbers: [14],
                  targetPath: '/strategy/approval',
                  decision: true,
                  color: 'text-purple-200',
                  borderColor: 'border-purple-500/50',
                  bgActive: 'bg-purple-600/30',
                })
              }
              className={`p-3.5 rounded-xl border-2 border-dashed transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([14])
                  ? 'bg-purple-600/20 border-purple-400 ring-2 ring-purple-500/50'
                  : 'bg-slate-800/80 border-purple-500/50 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-purple-600/30 text-purple-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  14
                </span>
                <div>
                  <div className="font-semibold text-sm text-purple-200 flex items-center gap-2">
                    <span>{lang === 'ar' ? 'اعتماد ونشر الاستراتيجية (Strategy approved?)' : 'Strategy approved?'}</span>
                    <span className="text-[10px] bg-purple-900/80 text-purple-300 px-2 py-0.5 rounded border border-purple-700">
                      GATEWAY
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'دورة الحوكمة: إعادة للمراجعة مع الملاحظات ← الاعتماد النهائي ← قفل خط الأساس المعتمد' : 'Return for revision vs Approve & Publish controlled baseline'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 8. Collect actuals and evidence */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n8',
                  label: 'Collect actuals and evidence',
                  labelAr: 'جمع القيم الفعلية والأدلة الإثباتية',
                  stepNumbers: [15],
                  targetPath: '/performance/collection',
                  color: 'text-cyan-200',
                  borderColor: 'border-cyan-500/40',
                  bgActive: 'bg-cyan-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([15])
                  ? 'bg-cyan-600/20 border-cyan-400 ring-2 ring-cyan-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-cyan-600/30 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  15
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'جمع الفعليات والأدلة (Collect actuals and evidence)' : 'Collect actuals and evidence'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'مهام جمع البيانات وتواريخ الاستحقاق + استيراد ملف مع كشف وتصفية السجلات المكررة والخاطئة' : 'Collection tasks, due dates, manual entry & import preview error rejection'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* Decision 2: Results approved? */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'd2',
                  label: 'Results approved?',
                  labelAr: 'هل تم اعتماد النتائج والأدلة؟',
                  stepNumbers: [16],
                  targetPath: '/performance/actuals',
                  decision: true,
                  color: 'text-rose-200',
                  borderColor: 'border-rose-500/50',
                  bgActive: 'bg-rose-600/30',
                })
              }
              className={`p-3.5 rounded-xl border-2 border-dashed transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([16])
                  ? 'bg-rose-600/20 border-rose-400 ring-2 ring-rose-500/50'
                  : 'bg-slate-800/80 border-rose-500/50 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-rose-600/30 text-rose-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  16
                </span>
                <div>
                  <div className="font-semibold text-sm text-rose-200 flex items-center gap-2">
                    <span>{lang === 'ar' ? 'اعتماد النتائج (Results approved?)' : 'Results approved?'}</span>
                    <span className="text-[10px] bg-rose-900/80 text-rose-300 px-2 py-0.5 rounded border border-rose-700">
                      AUDIT GATE
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'إدخال القيمة الفعلية + إرفاق مستند الإثبات + إرجاع للتصحيح ثم اعتماد المراجع المستقل' : 'Evidence, variance explanation, return for correction & independent sign-off'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 9. Calculate performance and report */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n9',
                  label: 'Calculate performance and report',
                  labelAr: 'احتساب الأداء وإصدار التقارير',
                  stepNumbers: [17],
                  targetPath: '/performance',
                  color: 'text-blue-200',
                  borderColor: 'border-blue-500/40',
                  bgActive: 'bg-blue-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([17])
                  ? 'bg-blue-600/20 border-blue-400 ring-2 ring-blue-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  17
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'احتساب الأداء والتقارير (Calculate performance & report)' : 'Calculate performance and report'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'محرك احتساب النقاط الموزونة + حداثة البيانات + قاعدة معالجة القيم المفقودة' : 'KPI score formulas, weighted objective rollup, freshness & missing-data rules'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 10. Review exceptions and assign actions */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n10',
                  label: 'Review exceptions and assign actions',
                  labelAr: 'مراجعة الانحرافات وتعيين الخطط التصحيحية',
                  stepNumbers: [18],
                  targetPath: '/actions',
                  color: 'text-amber-200',
                  borderColor: 'border-amber-500/40',
                  bgActive: 'bg-amber-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([18])
                  ? 'bg-amber-600/20 border-amber-400 ring-2 ring-amber-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-amber-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-amber-600/30 text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  18
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'مراجعة الاستثناءات وتعيين الإجراءات التصحيحية' : 'Review exceptions and assign actions'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'توليد إجراء تصحيحي مباشر لمؤشر متأخر (<70%) وربطه بالمبادرة ومخاطر المشروع' : 'Trigger corrective action from red KPI, assign owner, expected effect & linked risk'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 11. Executive dashboard and reporting */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n11',
                  label: 'Executive dashboard and reporting',
                  labelAr: 'لوحة القيادة التنفيذية وتقارير القيادة',
                  stepNumbers: [19],
                  targetPath: '/',
                  color: 'text-blue-200',
                  borderColor: 'border-blue-500/40',
                  bgActive: 'bg-blue-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([19])
                  ? 'bg-blue-600/20 border-blue-400 ring-2 ring-blue-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-blue-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  19
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'لوحة القيادة التنفيذية (Executive dashboard & reporting)' : 'Executive dashboard and reporting'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'التعمق التفصيلي 6 مستويات (محور ← هدف ← مؤشر ← دليل ← مبادرة ← إجراء) + تقرير قيادي عربي' : '6-level drilldown + Leadership Executive Dossier in official Arabic RTL format'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </div>

            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>

            {/* 12. Record decisions and controlled revisions */}
            <div
              onClick={() =>
                handleNodeClick({
                  id: 'n12',
                  label: 'Record decisions and controlled revisions',
                  labelAr: 'تسجيل القرارات والمراجعات المحكومة',
                  stepNumbers: [20],
                  targetPath: '/strategy/review',
                  color: 'text-emerald-200',
                  borderColor: 'border-emerald-500/40',
                  bgActive: 'bg-emerald-600/30',
                })
              }
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between shadow-sm ${
                isNodeActive([20])
                  ? 'bg-emerald-600/20 border-emerald-400 ring-2 ring-emerald-500/50'
                  : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-600/30 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  20
                </span>
                <div>
                  <div className="font-semibold text-sm text-white">
                    {lang === 'ar' ? 'تسجيل القرارات والتعديلات المحكومة (Record decisions & revisions)' : 'Record decisions and controlled revisions'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'ar' ? 'تجميد لقطة الأداء الفصلي + تعديل مستهدفات مستقبلية مع ضمان حصانة التقارير التاريخية' : 'Freeze reporting snapshot, propose future target amendment, immutable audit baseline'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  {lang === 'ar' ? 'حلقة التخطيط التالية' : 'Next Planning Cycle'}
                </span>
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              {lang === 'ar'
                ? 'متوافق مع معايير مكتب الإدارة الاستراتيجية وهيئة كفاءة الإنفاق والمشروعات الحكومية'
                : 'Aligned with Center of Strategic Management & National GRC Standards'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
          >
            {lang === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
