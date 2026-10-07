import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  RotateCcw,
  MessageSquare,
  FileCheck,
  ArrowRight,
  Send,
  Eye,
  FileText,
  BadgeAlert,
  Edit3,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

type WorkflowStepState =
  | '1_draft'
  | '2_submitted'
  | '3_returned_with_comments'
  | '4_resolved_and_resubmitted'
  | '5_approved'
  | '6_published_baseline_locked';

export const StrategyApprovalPage: React.FC = () => {
  const { lang, t, strategyPlan } = useApp();
  const navigate = useNavigate();

  const [workflowState, setWorkflowState] = useState<WorkflowStepState>('1_draft');
  const [commentText, setCommentText] = useState(
    'Please recalibrate the Q2 milestone for INIT-03 with the municipal irrigation schedule and verify KPI-02 baseline source before board presentation.'
  );
  const [resolutionText, setResolutionText] = useState(
    'Resolved: Q2 milestone aligned with Municipal Irrigation Board calendar; verified KPI-02 baseline with Ministry of Tourism official report.'
  );

  const isLocked = workflowState === '6_published_baseline_locked';

  const handleAction = (nextState: WorkflowStepState, msg: string) => {
    setWorkflowState(nextState);
    toast.success(msg);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 14 من 20 • مسار العرض' : 'STEP 14 OF 20 • DEMO JOURNEY'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'حوكمة الاعتماد ونشر خط الأساس' : 'Strategy Approval & Baseline Publication'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'دورة اعتماد الاستراتيجية ونشر خط الأساس المحكوم (Controlled Baseline)'
                : 'Strategy Approval Governance, Return Loop & Controlled Baseline Locking'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'رفع المسودة للاعتماد، وإرجاع المعاملة مع الملاحظات، وحل الملاحظات، واعتماد الاستراتيجية، ثم نشر خط الأساس المحكوم مع إثبات تقييد التعديل على المحتوى المعتمد.'
                : 'Simulate full governance lifecycle: submit draft ➔ return with review comments ➔ resolve & resubmit ➔ formal approval ➔ publish controlled baseline, strictly locking approved content against unauthorized edits.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/performance/collection')}
              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>{lang === 'ar' ? 'الانتقال إلى جمع الأداء (Step 15) ➔' : 'Next: Performance Collection (Step 15) ➔'}</span>
            </button>
          </div>
        </div>

        {/* Current State Indicator */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">
              {lang === 'ar' ? 'حالة الاعتماد الحالية:' : 'Current Governance Status:'}
            </span>
            <span
              className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                isLocked
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : workflowState === '3_returned_with_comments'
                  ? 'bg-amber-950 text-amber-300 border border-amber-700'
                  : 'bg-blue-950 text-blue-300 border border-blue-700'
              }`}
            >
              {isLocked ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>PUBLISHED CONTROLLED BASELINE v1.0 (IMMUTABLE)</span>
                </>
              ) : workflowState === '3_returned_with_comments' ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>RETURNED FOR REVISION WITH COMMENTS</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>{workflowState.toUpperCase()}</span>
                </>
              )}
            </span>
          </div>

          <button
            onClick={() => setWorkflowState('1_draft')}
            className="text-[11px] font-mono text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{lang === 'ar' ? 'إعادة ضبط الدورة للبداية' : 'Restart Workflow Demo'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Lifecycle Stages Stepper */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono mb-4">
          {lang === 'ar' ? 'خطوات دورة المراجعة والاعتماد' : 'Interactive Approval & Return Governance Stages'}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {[
            { key: '1_draft', label: '1. Draft Strategy', labelAr: '1. مسودة الاستراتيجية' },
            { key: '2_submitted', label: '2. Submitted', labelAr: '2. رُفعت للاعتماد' },
            { key: '3_returned_with_comments', label: '3. Return with Notes', labelAr: '3. إعادة مع ملاحظات' },
            { key: '4_resolved_and_resubmitted', label: '4. Resolved & Resubmitted', labelAr: '4. حُلّت وأعيد رفعها' },
            { key: '5_approved', label: '5. Council Approved', labelAr: '5. معتمدة من المجلس' },
            { key: '6_published_baseline_locked', label: '6. Controlled Lock', labelAr: '6. قفل خط الأساس' },
          ].map((st, idx) => {
            const isCurrent = workflowState === st.key;
            return (
              <div
                key={st.key}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-300/40 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <span className="text-[10px] font-mono text-slate-400 block">Step {idx + 1}</span>
                <span className={`text-xs font-bold mt-1 block ${isCurrent ? 'text-purple-900' : 'text-slate-700'}`}>
                  {lang === 'ar' ? st.labelAr : st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Controls & Interactive Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Interactive Workflow Action Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'لوحة تحكم قرارات الحوكمة' : 'Governance Action Dispatcher'}
            </h3>
          </div>

          {workflowState === '1_draft' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar'
                  ? 'تم استكمال مسودة الخطة الاستراتيجية وجاهزة للرفع إلى المجلس التنفيذي.'
                  : 'Draft strategy formulation is complete and ready to be formally submitted to Executive Leadership for review.'}
              </p>
              <button
                onClick={() =>
                  handleAction('2_submitted', 'Strategy submitted for Executive Council review')
                }
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'رفع الاستراتيجية للاعتماد (Submit Draft)' : 'Submit Strategy for Leadership Review'}</span>
              </button>
            </div>
          )}

          {workflowState === '2_submitted' && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-3">
              <p className="text-xs text-slate-700 leading-relaxed">
                {lang === 'ar'
                  ? 'المعاملة قيد نظر المراجع التنفيذي. يمكنك محاكاة إرجاع عنصر مع ملاحظات أو الموافقة المباشرة.'
                  : 'Under Executive Council review. You can simulate returning an item with revision comments or immediate approval.'}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleAction('3_returned_with_comments', 'Returned for revision with auditor comments')
                  }
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إعادة مع ملاحظات (Return Item)' : 'Return Item with Comments'}</span>
                </button>
                <button
                  onClick={() => handleAction('5_approved', 'Strategy directly approved')}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'اعتماد فوري' : 'Direct Approve'}</span>
                </button>
              </div>
            </div>
          )}

          {workflowState === '3_returned_with_comments' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <BadgeAlert className="w-4 h-4 text-amber-700" />
                <span>{lang === 'ar' ? 'ملاحظات المراجع التنفيذي:' : 'Executive Reviewer Feedback:'}</span>
              </div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-2.5 bg-white border border-amber-300 rounded-lg text-xs text-slate-800 font-sans"
                rows={3}
              />
              <button
                onClick={() =>
                  handleAction('4_resolved_and_resubmitted', 'Comments addressed & resubmitted for final approval')
                }
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'حل الملاحظات وإعادة الرفع (Resolve & Resubmit)' : 'Resolve Comments & Resubmit'}</span>
              </button>
            </div>
          )}

          {workflowState === '4_resolved_and_resubmitted' && (
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-3">
              <div className="text-xs text-slate-700">
                <strong>{lang === 'ar' ? 'إفادة المعالجة:' : 'Resolution Report:'}</strong> {resolutionText}
              </div>
              <button
                onClick={() =>
                  handleAction('5_approved', 'Strategy officially approved by Authority Board')
                }
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'اعتماد الاستراتيجية نهائياً (Approve Strategy)' : 'Final Board Approval & Ratification'}</span>
              </button>
            </div>
          )}

          {workflowState === '5_approved' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-3">
              <p className="text-xs text-emerald-900 font-medium">
                {lang === 'ar'
                  ? 'تم اعتماد الاستراتيجية. الخطوة التالية هي نشر خط الأساس المحكوم (Controlled Baseline) وتقييد التعديلات.'
                  : 'Strategy approved! The final step is to publish the official controlled baseline and enforce immutable editing restrictions.'}
              </p>
              <button
                onClick={() =>
                  handleAction('6_published_baseline_locked', 'Controlled baseline published & editing locked')
                }
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Lock className="w-4 h-4" />
                <span>{lang === 'ar' ? 'نشر خط الأساس المحكوم وقفل التعديل (Publish Baseline)' : 'Publish Controlled Baseline & Enforce Edit Lock'}</span>
              </button>
            </div>
          )}

          {workflowState === '6_published_baseline_locked' && (
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 border border-slate-700">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Lock className="w-4 h-4" />
                <span>{lang === 'ar' ? 'خط الأساس الرسمي مقفل ومحمي من التعديل' : 'Official Baseline Locked (Controlled State)'}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {lang === 'ar'
                  ? 'أي تعديل لاحق يتطلب رفع طلب تغيير رسمي (Change Request) وموافقة مجلس الإدارة.'
                  : 'All strategy contents are now frozen. Any further target or scope changes require a formal Strategy Change Request (SCR) workflow.'}
              </p>
            </div>
          )}
        </div>

        {/* Right: Restriction Demonstration Callout (Client Requirement: "demonstrate restrictions on editing approved content") */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Lock className={`w-4 h-4 ${isLocked ? 'text-rose-600' : 'text-slate-400'}`} />
              <span>{lang === 'ar' ? 'محاكي تقييد التعديل على المحتوى المعتمد' : 'Edit Restriction Compliance Enforcer'}</span>
            </h3>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
              isLocked ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {isLocked ? 'READ-ONLY (LOCKED)' : 'EDITABLE (DRAFT)'}
            </span>
          </div>

          {/* Simulated Strategy Objective Edit Box */}
          <div className={`p-4 rounded-xl border transition-all space-y-3 ${
            isLocked ? 'bg-slate-50 border-slate-300 opacity-80' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                OBJ-01 (Sample Approved Item)
              </span>
              {isLocked && (
                <span className="text-[10px] font-mono text-rose-600 flex items-center gap-1 font-bold">
                  <Lock className="w-3 h-3" />
                  RESTRICTED BY GRC POLICY
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                Objective Title (Arabic / English)
              </label>
              <input
                type="text"
                disabled={isLocked}
                defaultValue="Maximize High-Yield Tourism & Agritech Economic Contribution"
                className={`w-full p-2 rounded-lg text-xs border ${
                  isLocked
                    ? 'bg-slate-100 border-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                disabled={isLocked}
                onClick={() => toast.success('Changes saved (Draft state)')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isLocked
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}</span>
              </button>

              {isLocked && (
                <span className="text-[11px] text-rose-600 font-semibold">
                  {lang === 'ar' ? '🔒 التعديل معطل: تم نشر خط الأساس' : '🔒 Editing disabled: Baseline is published'}
                </span>
              )}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1 font-mono">
            <div>AUDIT LOG: Baseline published with SHA-256 Checksum: e4d98...</div>
            <div>STATUS: Controlled Baseline v1.0 • Archival Author: Strategy Lead</div>
          </div>
        </div>
      </div>
    </div>
  );
};
