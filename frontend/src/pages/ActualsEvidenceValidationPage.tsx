import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Upload,
  FileText,
  RotateCcw,
  Send,
  Lock,
  ArrowRight,
  Shield,
  MessageSquare,
  Paperclip,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

type ActualValidationState =
  | 'draft'
  | 'submitted'
  | 'returned_for_correction'
  | 'corrected_and_resubmitted'
  | 'approved_and_locked';

export const ActualsEvidenceValidationPage: React.FC = () => {
  const { lang, t } = useApp();
  const navigate = useNavigate();

  const [state, setState] = useState<ActualValidationState>('draft');
  const [actualValue, setActualValue] = useState<number>(410000);
  const [varianceExplanation, setVarianceExplanation] = useState(
    'Actual footfall was 8.8% below initial projection due to unseasonal rainstorms across the Eastern Province in February; recovered by +14% during Ramadan weekend heritage markets.'
  );
  const [attachedFiles, setAttachedFiles] = useState([
    'Q1_2026_Tourism_Gate_Audit_Certified.pdf (2.4 MB)',
  ]);
  const [reviewerComment, setReviewerComment] = useState(
    'Please attach the certified electronic turnstile counter logs from Hofuf Heritage Gate 3 and Al-Qara Hill station to corroborate the March recovery figures.'
  );
  const [specialistCorrectionNote, setSpecialistCorrectionNote] = useState(
    'Attached certified turnstile station logs (Hofuf Gate 3 & Al-Qara). Total audited counts match the 410,000 declared entry.'
  );

  const isLocked = state === 'approved_and_locked';

  const handleStateTransition = (nextState: ActualValidationState, toastMsg: string) => {
    setState(nextState);
    toast.success(toastMsg);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 16 من 20 • دورة حياة الاستراتيجية' : 'STAGE 16 OF 20 • STRATEGIC LIFECYCLE'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'اعتماد النتائج والأدلة الإثباتية' : 'Actuals, Evidence & Independent Validation'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'إدخال الفعليات، إرفاق الأدلة، ودورة المراجعة والاعتماد المستقلة'
                : 'KPI Actual Submission, Evidence Dossier & Independent Review Loop'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'إدخال القيمة الفعلية للمؤشر، وإرفاق الأدلة الإثباتية، وتفسير التباين، مع محاكاة دورة الحوكمة الكاملة: رفع ➔ إعادة للتصحيح ➔ تصحيح وإعادة رفع ➔ اعتماد رسمي من مراجع مستقل.'
                : 'Enter KPI actual value with supporting documentary evidence and variance explanation. Simulate: Submit ➔ Return for correction ➔ Resubmit with verified logs ➔ Independent auditor sign-off & lock.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate('/performance')}
              className="px-4 py-2 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer group"
            >
              <span>{lang === 'ar' ? 'المتابعة: احتساب وتحليل الأداء' : 'Next: Performance Engine'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* State Banner */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">
              {lang === 'ar' ? 'حالة الاعتماد التدقيقي:' : 'Audit Sign-off Status:'}
            </span>
            <span
              className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                isLocked
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : state === 'returned_for_correction'
                  ? 'bg-amber-950 text-amber-300 border border-amber-700'
                  : 'bg-blue-950 text-blue-300 border border-blue-700'
              }`}
            >
              {isLocked ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>INDEPENDENT REVIEW COMPLETE (AUDITED & LOCKED)</span>
                </>
              ) : state === 'returned_for_correction' ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>RETURNED FOR CORRECTION (MORE EVIDENCE REQUIRED)</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{state.toUpperCase()}</span>
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => setState('draft')}
            className="text-[11px] font-mono text-rose-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'ar' ? 'إعادة ضبط المحاكاة' : 'Restart Audit Loop'}</span>
          </button>
        </div>
      </div>

      {/* Main Form: Actual Value, Evidence & Variance Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: KPI Entry Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                KPI-01 • Q1 2026
              </span>
              <h2 className="text-sm font-bold text-slate-900 mt-1">
                {lang === 'ar' ? 'إجمالي زوار المواقع التراثية بالواحة' : 'Total Heritage Oasis Visitor Footfall'}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Target Benchmark</span>
              <span className="text-xs font-mono font-bold text-blue-700">450,000 Visitors</span>
            </div>
          </div>

          {/* Actual Value Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">
              {lang === 'ar' ? 'القيمة الفعلية المحققة (Actual Value):' : 'Declared Actual Value:'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                disabled={isLocked}
                value={actualValue}
                onChange={(e) => setActualValue(Number(e.target.value))}
                className={`w-full p-2.5 rounded-xl border text-sm font-mono font-bold ${
                  isLocked ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
              <span className="text-xs font-mono text-slate-500 shrink-0">Visitors</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Achievement: {Math.round((actualValue / 450000) * 1000) / 10}% of Q1 Target (Variance: -8.8%)
            </span>
          </div>

          {/* Supporting Evidence File Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>{lang === 'ar' ? 'المستندات والأدلة الإثباتية المرفقة (Evidence):' : 'Supporting Evidence Dossier:'}</span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">MANDATORY COMPLIANCE</span>
            </label>

            <div className="space-y-1.5">
              {attachedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Paperclip className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate font-semibold text-slate-700">{file}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold shrink-0">VERIFIED</span>
                </div>
              ))}
            </div>

            {!isLocked && (
              <button
                onClick={() => {
                  setAttachedFiles((prev) => [
                    ...prev,
                    'Gate3_Electronic_Turnstile_Counter_Logs.xlsx (840 KB)',
                  ]);
                  toast.success('Attached electronic turnstile logs');
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors border border-dashed border-slate-300"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? '+ إرفاق دليل إضافي (Turnstile Logs)' : '+ Attach Additional Evidence File'}</span>
              </button>
            )}
          </div>

          {/* Variance Explanation Narrative */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">
              {lang === 'ar' ? 'تفسير التباين والمبررات التشغيلية (Variance Explanation):' : 'Variance Justification & Narrative Analysis:'}
            </label>
            <textarea
              disabled={isLocked}
              value={varianceExplanation}
              onChange={(e) => setVarianceExplanation(e.target.value)}
              rows={3}
              className={`w-full p-2.5 rounded-xl border text-xs leading-relaxed font-sans ${
                isLocked ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            />
          </div>
        </div>

        {/* Right: 4-Stage Governance & Independent Review Workflow (Client Requirement) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">
                {lang === 'ar' ? 'مسار الاعتماد والتدقيق المستقل (Review Workflow)' : 'Independent Audit & Sign-off Loop'}
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
              FOUR-EYES GOVERNANCE
            </span>
          </div>

          {/* Current Action based on stage */}
          {state === 'draft' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'البيانات والأدلة جاهزة. انقر لرفع القيمة الفعلية إلى المراجع المستقل.'
                  : 'KPI actual and initial evidence dossier prepared. Submit to the independent auditor for validation.'}
              </p>
              <button
                onClick={() =>
                  handleStateTransition(
                    'submitted',
                    'KPI actual and evidence submitted for independent audit'
                  )
                }
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'رفع للمراجعة والتدقيق (Submit for Review)' : 'Submit for Independent Review'}</span>
              </button>
            </div>
          )}

          {state === 'submitted' && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-3">
              <p className="text-xs text-slate-700 leading-relaxed">
                {lang === 'ar'
                  ? 'المعاملة لدى المراجع المستقل. يمكنك محاكاة إرجاع القيمة للتصحيح أو الاعتماد المباشر.'
                  : 'Under review by Independent Auditor. Demonstrate returning for correction (requesting more logs) or direct approval.'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleStateTransition(
                      'returned_for_correction',
                      'Returned for correction with Turnstile Log request'
                    )
                  }
                  className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'إرجاع للتصحيح (Return)' : 'Return for Correction'}</span>
                </button>
                <button
                  onClick={() =>
                    handleStateTransition('approved_and_locked', 'Auditor approved & locked KPI actual')
                  }
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'اعتماد فوري' : 'Direct Approve'}</span>
                </button>
              </div>
            </div>
          )}

          {state === 'returned_for_correction' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>{lang === 'ar' ? 'ملاحظة المراجع المستقل:' : 'Auditor Return Request:'}</span>
              </div>
              <p className="text-xs text-amber-950 bg-white p-2.5 rounded-lg border border-amber-200">
                "{reviewerComment}"
              </p>
              <button
                onClick={() => {
                  setAttachedFiles((prev) => [
                    ...prev,
                    'Gate3_Electronic_Turnstile_Counter_Logs.xlsx (840 KB)',
                  ]);
                  handleStateTransition(
                    'corrected_and_resubmitted',
                    'Turnstile logs attached & resubmitted to Auditor'
                  );
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Check className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إرفاق السجلات وإعادة الرفع (Correct & Resubmit)' : 'Attach Required Logs & Resubmit'}</span>
              </button>
            </div>
          )}

          {state === 'corrected_and_resubmitted' && (
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-3">
              <p className="text-xs text-indigo-900">
                <strong>{lang === 'ar' ? 'إفادة التصحيح:' : 'Resolution:'}</strong> {specialistCorrectionNote}
              </p>
              <button
                onClick={() =>
                  handleStateTransition(
                    'approved_and_locked',
                    'Independent Auditor approved and locked actual entry'
                  )
                }
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'اعتماد المراجع المستقل وقفل النتيجة (Approve & Lock)' : 'Independent Reviewer Final Approval & Lock'}</span>
              </button>
            </div>
          )}

          {state === 'approved_and_locked' && (
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 border border-slate-700">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Lock className="w-4 h-4" />
                <span>{lang === 'ar' ? 'النتيجة معتمدة ومقفلة ضد أي تعديل لاحق' : 'Audited Result Locked & Immutable'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                SIGN-OFF: Certified by Internal Audit & GRC Reviewer (Emp ID #941). Hash: a89f2c...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={16}
        stageTitle="KPI Actual Submission, Evidence Dossier & Independent Audit"
        stageTitleAr="إدخال الفعليات وإرفاق الأدلة وتدقيق المراجع المستقل"
        prevStage={{
          stage: 15,
          title: "Performance Data Collection",
          titleAr: "جمع واستيراد بيانات الأداء",
          path: "/performance/collection",
        }}
        nextStage={{
          stage: 17,
          title: "Performance Calculation Engine",
          titleAr: "محرك احتساب الأداء والتحليل",
          path: "/performance",
        }}
        relatedLinks={[
          { title: "Corrective Actions", titleAr: "الخطط التصحيحية", path: "/actions" },
          { title: "Executive Dashboard", titleAr: "لوحة القيادة التنفيذية", path: "/" },
          { title: "Data Collection Hub", titleAr: "مركز جمع البيانات", path: "/performance/collection" },
        ]}
      />
    </div>
  );
};
