import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  Unlock,
  AlertCircle,
  Clock,
  ArrowRight,
  Shield,
  FileCheck,
  RotateCcw,
  Plus,
  BadgeAlert,
  History,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

interface ReviewDecision {
  id: string;
  decision: string;
  decisionAr: string;
  owner: string;
  deadline: string;
  status: 'In Execution' | 'Completed' | 'Pending';
}

export const StrategyReviewRevisionPage: React.FC = () => {
  const { lang, t } = useApp();
  const navigate = useNavigate();

  const [isSnapshotFrozen, setIsSnapshotFrozen] = useState(true);
  const [targetAmendmentProposed, setTargetAmendmentProposed] = useState(false);

  // Review Decisions Recorded
  const [decisions, setDecisions] = useState<ReviewDecision[]>([
    {
      id: 'dec-1',
      decision: 'Reallocate SAR 2.5M capital expenditure savings from INIT-04 into INIT-01 Eco-Luxury Hospitality Fund.',
      decisionAr: 'إعادة تخصيص وفر مالي قدره 2.5 مليون ريال من المبادرة 04 لصالح صندوق الضيافة الفاخرة.',
      owner: 'VP Finance & Investments',
      deadline: '2026-05-15',
      status: 'In Execution',
    },
    {
      id: 'dec-2',
      decision: 'Form Joint Spatial Taskforce with Municipality to accelerate Hofuf UNESCO buffer zoning approvals.',
      decisionAr: 'تشكيل فريق عمل مكاني مشترك مع أمانة الأحساء لتسريع اعتمادات النطاق العازل لليونسكو في الهفوف.',
      owner: 'Director Spatial Planning',
      deadline: '2026-05-30',
      status: 'In Execution',
    },
    {
      id: 'dec-3',
      decision: 'Elevate Q3 and Q4 2026 targets for Heritage Visitors (+10%) in response to newly gazetted national holidays.',
      decisionAr: 'رفع مستهدفات زوار التراث للربعين الثالث والرابع بنسبة 10% مواكبةً للفعاليات الوطنية المستحدثة.',
      owner: 'Strategy & PMO Lead',
      deadline: '2026-06-01',
      status: 'Pending',
    },
  ]);

  const handleFreezeToggle = () => {
    setIsSnapshotFrozen(!isSnapshotFrozen);
    toast.success(
      isSnapshotFrozen
        ? 'Reporting snapshot unfrozen for administrative adjustments'
        : 'Reporting snapshot frozen with SHA-256 cryptographic checksum'
    );
  };

  const handleProposeAmendment = () => {
    setTargetAmendmentProposed(true);
    toast.success(
      lang === 'ar'
        ? 'تم تسجيل مقترح تعديل المستهدف للفترات المستقبلية (مع بقاء التقارير التاريخية دون تغيير)'
        : 'Future target amendment logged. Historical approved baseline remains immutable.'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 20 من 20 • دورة حياة الاستراتيجية' : 'STAGE 20 OF 20 • STRATEGIC LIFECYCLE FINALE'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'المراجعة الاستراتيجية والتعديل المحكوم' : 'Strategy Review & Controlled Revisions'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'قرارات المراجعة الدورية، تجميد اللقطة، والتعديل المستقبلي المحكوم'
                : 'Quarterly Strategy Review Decisions, Snapshot Freezing & Target Amendments'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate('/planning-cycle')}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer group"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'ar' ? 'دورة التخطيط السنوية التالية' : 'Next Planning Cycle'}</span>
            </button>
          </div>
        </div>

        {/* Snapshot Integrity Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">
              {lang === 'ar' ? 'حالة لقطة أداء الربع الأول (Q1 2026):' : 'Q1 2026 Reporting Snapshot Lock:'}
            </span>
            <span
              className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                isSnapshotFrozen
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : 'bg-amber-950 text-amber-300 border border-amber-700'
              }`}
            >
              {isSnapshotFrozen ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>SNAPSHOT FROZEN & HASH-LOCKED (IMMUTABLE AUDIT RECORD)</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>UNFROZEN (ADMIN DRAFT)</span>
                </>
              )}
            </span>
          </div>

          <button
            onClick={handleFreezeToggle}
            className="text-[11px] font-mono text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            {isSnapshotFrozen ? (
              <>
                <Unlock className="w-3 h-3" />
                <span>{lang === 'ar' ? 'فك تجميد اللقطة' : 'Unfreeze Snapshot'}</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3" />
                <span>{lang === 'ar' ? 'تجميد اللقطة الرسمية' : 'Freeze Snapshot'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid: Review Decisions & Controlled Target Amendments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Recorded Review Decisions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">
                {lang === 'ar' ? 'محضر وقرارات المراجعة الاستراتيجية الربع سنوية' : 'Quarterly Strategy Review Decisions & Deadlines'}
              </h2>
            </div>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-200">
              Q1-2026 RATIFIED
            </span>
          </div>

          <div className="space-y-3">
            {decisions.map((dec) => (
              <div
                key={dec.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">
                    {lang === 'ar' ? dec.decisionAr : dec.decision}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px] text-slate-500 font-mono">
                  <span>Owner: <strong>{dec.owner}</strong></span>
                  <span className="text-rose-600 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Due: {dec.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Controlled Future Target Amendment Simulator (Client Requirement: "show that historical approved reports remain unchanged") */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">
                {lang === 'ar' ? 'اقتراح تعديل مستهدف مستقبلي وحصانة السجلات التاريخية' : 'Future Target Amendment & Historical Immutability Guard'}
              </h2>
            </div>
            <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-200">
              AUDIT TRAIL SECURED
            </span>
          </div>

          {/* Historical vs Future Target Table */}
          <div className="space-y-3 text-xs">
            {/* Historical Q1 (Locked) */}
            <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">
                  KPI-01 (Heritage Visitors) • Q1 2026 Target
                </span>
                <span className="text-[10px] font-mono bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  HISTORICAL APPROVED BASELINE (IMMUTABLE)
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-mono text-[11px]">
                <span>Approved Target: 450,000 Visitors</span>
                <span>Actual: 410,000 (Locked in Q1 Dossier)</span>
              </div>
            </div>

            {/* Historical Q2 (Locked) */}
            <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">
                  KPI-01 (Heritage Visitors) • Q2 2026 Target
                </span>
                <span className="text-[10px] font-mono bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  HISTORICAL APPROVED BASELINE (IMMUTABLE)
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-mono text-[11px]">
                <span>Approved Target: 520,000 Visitors</span>
                <span>Status: Locked in Council Resolution</span>
              </div>
            </div>

            {/* Future Q3 Target (Target Amendment Proposed) */}
            <div className="p-3 rounded-xl border-2 border-blue-400 bg-blue-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">
                  KPI-01 (Heritage Visitors) • Q3 2026 Target (Forward-Looking)
                </span>
                <span className="text-[10px] font-mono bg-blue-600 text-white px-2 py-0.5 rounded font-bold">
                  {targetAmendmentProposed ? 'AMENDMENT PROPOSED (v1.1)' : 'ORIGINAL BASELINE'}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-700 text-xs">
                <span>Original Baseline: <strong>600,000</strong></span>
                <span>Proposed Target: <strong className="text-blue-700">660,000 (+10% Boost)</strong></span>
              </div>

              {!targetAmendmentProposed ? (
                <button
                  onClick={handleProposeAmendment}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
                >
                  {lang === 'ar' ? 'اقتراح تعديل مستهدف الربع الثالث (+10%)' : 'Propose Target Amendment for Q3 2026'}
                </button>
              ) : (
                <div className="p-2 bg-emerald-100/70 border border-emerald-300 rounded text-emerald-900 text-[11px] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'تم تسجيل مقترح التعديل المستقبلي بنجاح. تظل التقارير التاريخية (Q1 و Q2) محصنة وغير قابلة للتغيير.'
                      : 'Future target amendment registered. Historical approved reports remain completely unchanged.'}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 font-mono">
            LEGAL IMMUTABILITY GUARANTEE: Historical snapshots are protected by cryptographic append-only logs conforming to National Internal Audit standards.
          </div>
        </div>
      </div>

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={20}
        stageTitle="Quarterly Strategy Review Decisions, Snapshot Freezing & Target Amendments"
        stageTitleAr="المراجعة الدورية للاستراتيجية وتجميد اللقطة وتعديل المستهدفات المحكوم"
        prevStage={{
          stage: 19,
          title: "Executive Command Dashboard",
          titleAr: "لوحة القيادة التنفيذية",
          path: "/",
        }}
        nextStage={{
          stage: 5,
          title: "Next Annual Planning Cycle",
          titleAr: "دورة التخطيط السنوية التالية",
          path: "/planning-cycle",
        }}
        relatedLinks={[
          { title: "Personal Workspace", titleAr: "مساحة العمل الشخصية", path: "/workspace" },
          { title: "Strategy Matrix", titleAr: "مصفوفة الاستراتيجية", path: "/strategy" },
          { title: "Performance Engine", titleAr: "محرك احتساب الأداء", path: "/performance" },
        ]}
      />
    </div>
  );
};
