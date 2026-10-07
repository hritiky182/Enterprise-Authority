import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  ArrowRight,
  Upload,
  Calendar,
  Send,
  Bell,
  Plus,
  RefreshCw,
  FileCheck,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ImportRecord {
  kpiCode: string;
  name: string;
  period: string;
  actualValue: string;
  status: 'valid' | 'duplicate' | 'invalid_format';
  errorNote?: string;
  errorNoteAr?: string;
}

export const PerformanceCollectionPage: React.FC = () => {
  const { lang, t } = useApp();
  const navigate = useNavigate();

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [collectionTasks, setCollectionTasks] = useState([
    {
      id: 'ct-1',
      kpiCode: 'KPI-01',
      title: 'Number of Heritage Oasis Visitors',
      titleAr: 'إجمالي زوار واحة الأحساء التراثية',
      responsible: 'Faisal Al-Otaibi',
      department: 'Tourism Development',
      dueDate: '2026-04-15',
      status: 'Submitted',
      statusAr: 'تم الإدخال',
      period: 'Q1-2026',
    },
    {
      id: 'ct-2',
      kpiCode: 'KPI-02',
      title: 'Oasis Resident Quality of Life Score',
      titleAr: 'مؤشر جودة حياة سكان الواحة',
      responsible: 'Huda Al-Ghamdi',
      department: 'Community Engagement',
      dueDate: '2026-04-10',
      status: 'Missing Update',
      statusAr: 'تحديث مفقود',
      period: 'Q1-2026',
    },
    {
      id: 'ct-3',
      kpiCode: 'KPI-03',
      title: 'UNESCO Buffer Zone Compliance Rate',
      titleAr: 'نسبة الالتزام بالنطاق العازل لليونسكو',
      responsible: 'Tariq Al-Ghamdi',
      department: 'Spatial Governance',
      dueDate: '2026-04-15',
      status: 'Pending Review',
      statusAr: 'بانتظار المراجعة',
      period: 'Q1-2026',
    },
    {
      id: 'ct-4',
      kpiCode: 'KPI-04',
      title: 'Date Palm Value-Add Agritech Revenue (SAR M)',
      titleAr: 'عائدات الصناعات التحويلية للتمور (مليون ريال)',
      responsible: 'Sultan Al-Harbi',
      department: 'Investment Sector',
      dueDate: '2026-04-05',
      status: 'Missing Update',
      statusAr: 'تحديث مفقود (متأخر)',
      period: 'Q1-2026',
    },
  ]);

  // Simulated Dirty Import Records (Client Requirement: "Demonstrate an import preview that rejects invalid or duplicate records")
  const [importRecords, setImportRecords] = useState<ImportRecord[]>([
    {
      kpiCode: 'KPI-01',
      name: 'Heritage Visitors Footfall',
      period: 'Q1-2026',
      actualValue: '410,000',
      status: 'duplicate',
      errorNote: 'Duplicate record: Actual for KPI-01 in Q1-2026 already submitted.',
      errorNoteAr: 'سجل مكرر: القيمة الفعلية للمؤشر KPI-01 للربع الأول تم إدخالها مسبقاً.',
    },
    {
      kpiCode: 'KPI-02',
      name: 'Resident Satisfaction Index',
      period: 'Q1-2026',
      actualValue: '86.4',
      status: 'valid',
    },
    {
      kpiCode: 'KPI-03',
      name: 'Buffer Zone Compliance Rate',
      period: 'Q1-2026',
      actualValue: 'INVALID_TEXT',
      status: 'invalid_format',
      errorNote: 'Format error: Numeric value expected, found string "INVALID_TEXT".',
      errorNoteAr: 'خطأ في التنسيق: يتطلب قيمة رقمية، تم العثور على نص غير صالح.',
    },
    {
      kpiCode: 'KPI-04',
      name: 'Agritech Revenue SAR M',
      period: 'Q1-2026',
      actualValue: '14.8',
      status: 'valid',
    },
  ]);

  const handleSendReminder = (id: string, name: string) => {
    toast.success(
      lang === 'ar'
        ? `تم إرسال تنبيه آلي للمسؤول: ${name}`
        : `Automated reminder notification sent to: ${name}`
    );
  };

  const handleAcceptValidOnly = () => {
    const validCount = importRecords.filter((r) => r.status === 'valid').length;
    setIsImportModalOpen(false);
    toast.success(
      lang === 'ar'
        ? `تم استيراد ${validCount} سجل صالح بنجاح، ورفض السجلات المكررة والخاطئة.`
        : `Successfully imported ${validCount} valid records. Invalid & duplicate records rejected.`
    );
  };

  const missingCount = collectionTasks.filter((t) => t.status.includes('Missing')).length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 15 من 20 • مسار العرض' : 'STEP 15 OF 20 • DEMO JOURNEY'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'جمع الأداء الفعلي واستيراد البيانات' : 'Performance Data Collection Hub'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'فتح فترات التقارير، مهام الجمع، ومعاينة الاستيراد الذكية'
                : 'Reporting Period Collection Tasks, Reminders & Smart Import Validation'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'فتح فترة التقرير وتوليد مهام جمع البيانات مع تواريخ الاستحقاق والتنبيهات، ومعاينة استيراد الملفات مع كشف واستبعاد السجلات الخاطئة والمكررة.'
                : 'Open active reporting window, auto-generate collection tasks with due dates and overdue escalation alerts. Preview bulk file imports with automated rejection of invalid or duplicate records.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsImportModalOpen(true)}
              className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <Upload className="w-4 h-4" />
              <span>{lang === 'ar' ? 'معاينة استيراد ملف (Excel/CSV)' : 'Preview File Import (Validation)'}</span>
            </button>
            <button
              onClick={() => navigate('/performance/actuals')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>{lang === 'ar' ? 'القيم والأدلة (Step 16) ➔' : 'Next: Actuals & Evidence (Step 16) ➔'}</span>
            </button>
          </div>
        </div>

        {/* Period Context Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Active Window</span>
            <span className="font-bold text-white font-mono">Q1 2026 (Open)</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Collection Window Close</span>
            <span className="font-bold text-cyan-300 font-mono">April 15, 2026</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Missing Updates</span>
            <span className={`font-bold font-mono ${missingCount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {missingCount} Tasks Overdue
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">Collection Rate</span>
            <span className="font-bold text-emerald-400 font-mono">68% Received</span>
          </div>
        </div>
      </div>

      {/* Collection Tasks Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'مهام جمع البيانات لمؤشرات الأداء (Q1 2026)' : 'Active Data Collection Tasks & Ownership Queue'}
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'متابعة تواريخ الاستحقاق، التنبيهات، والتحديثات المفقودة لكل مؤشر'
                : 'Monitor submission deadlines, send reminders, and track missing entries'}
            </p>
          </div>
          <span className="text-[11px] font-mono bg-cyan-50 text-cyan-700 px-2.5 py-0.5 rounded-full border border-cyan-200 font-semibold">
            {collectionTasks.length} ASSIGNED TASKS
          </span>
        </div>

        <div className="space-y-3">
          {collectionTasks.map((task) => {
            const isMissing = task.status.includes('Missing');
            const isSubmitted = task.status === 'Submitted';

            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isMissing
                    ? 'bg-rose-50/50 border-rose-300'
                    : isSubmitted
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                      {task.kpiCode}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200">
                      {task.period}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isMissing
                          ? 'bg-rose-100 text-rose-800'
                          : isSubmitted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {lang === 'ar' ? task.statusAr : task.status}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? task.titleAr : task.title}
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>
                      {lang === 'ar' ? 'المسؤول:' : 'Assignee:'} <strong>{task.responsible}</strong> ({task.department})
                    </span>
                    <span>•</span>
                    <span className="font-mono text-rose-600 font-semibold">
                      Due: {task.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isMissing && (
                    <button
                      onClick={() => handleSendReminder(task.id, task.responsible)}
                      className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إرسال تنبيه' : 'Send Reminder'}</span>
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/performance/actuals')}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {lang === 'ar' ? 'إدخال يدوي ➔' : 'Manual Entry ➔'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Import Preview Modal with Automated Error & Duplicate Rejection (Client Requirement) */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-6 h-6 text-cyan-600" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {lang === 'ar'
                      ? 'معاينة استيراد ملف البيانات والتحقق من السجلات'
                      : 'Bulk Import Preview & Validation Gate (Excel / CSV)'}
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    File: <code>Q1_2026_KPI_Bulk_Upload.csv</code> • Pre-import integrity audit
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Records Validation Table */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-900 flex items-center justify-between">
                <span>
                  {lang === 'ar'
                    ? 'فحص النظام: تم رصد 2 سجل صالح، 1 سجل مكرر، و 1 خطأ في التنسيق.'
                    : 'System Scan: 2 Valid Records, 1 Duplicate Record, 1 Format Error detected.'}
                </span>
                <span className="font-mono font-bold text-cyan-800">PRE-INGESTION AUDIT</span>
              </div>

              <div className="space-y-2">
                {importRecords.map((rec, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                      rec.status === 'valid'
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : rec.status === 'duplicate'
                        ? 'bg-amber-50/40 border-amber-300'
                        : 'bg-rose-50/40 border-rose-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{rec.kpiCode}</span>
                        <span className="text-slate-600 font-semibold">{rec.name}</span>
                        <span className="text-[10px] font-mono bg-white px-1.5 py-0.2 rounded border border-slate-200">
                          {rec.period}
                        </span>
                      </div>
                      {rec.errorNote && (
                        <div className="text-[11px] text-rose-700 mt-1 font-medium">
                          ⚠ {lang === 'ar' ? rec.errorNoteAr : rec.errorNote}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-800">Value: {rec.actualValue}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          rec.status === 'valid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rec.status === 'duplicate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {rec.status === 'valid' ? 'VALID ✅' : rec.status === 'duplicate' ? 'DUPLICATE 🛑' : 'REJECTED ❌'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                DUPLICATES & ERRORS WILL BE PURGED AUTOMATICALLY
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={handleAcceptValidOnly}
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
                >
                  {lang === 'ar' ? 'استيراد السجلات الصالحة فقط واستبعاد الأخطاء' : 'Import Valid Only & Reject Errors'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
