import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileSpreadsheet, Download, FileText, Eye, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';

export const ReportsPage: React.FC = () => {
  const { lang, t } = useApp();
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  const reportTemplates = [
    {
      id: 'rep-1',
      title: 'Q3 Executive Strategy & Institutional Scorecard',
      titleAr: 'بطاقة قياس الأداء المؤسسي والاستراتيجي التنفيذي للربع الثالث',
      category: 'Executive Reports',
      categoryAr: 'تقارير تنفيذية',
      format: 'PDF',
      pages: 18,
      date: '2026-08-20',
    },
    {
      id: 'rep-2',
      title: '5×5 ERM Risk Heatmap & Mitigation Progress Report',
      titleAr: 'تقرير تقدم معالجة المخاطر ومصفوفة الحرارة 5×5 لإدارة المخاطر',
      category: 'Risk Reports',
      categoryAr: 'تقارير المخاطر',
      format: 'PDF / Excel',
      pages: 12,
      date: '2026-08-15',
    },
    {
      id: 'rep-3',
      title: 'NCA ECC Cybersecurity Controls Compliance Audit Report',
      titleAr: 'تقرير التدقيق والامتثال لضوابط الأمن السيبراني NCA ECC',
      category: 'Cybersecurity Reports',
      categoryAr: 'تقارير الأمن السيبراني',
      format: 'PDF',
      pages: 24,
      date: '2026-08-10',
    },
    {
      id: 'rep-4',
      title: 'ISO 22301 BCM Readiness & BIA Recovery Objectives',
      titleAr: 'جاهزية استمرارية الأعمال ISO 22301 وأهداف التعافي BIA',
      category: 'BCM Reports',
      categoryAr: 'تقارير الاستمرارية',
      format: 'PDF / Excel',
      pages: 16,
      date: '2026-08-05',
    },
    {
      id: 'rep-5',
      title: 'Enterprise Masterplan Strategic Initiatives Expenditure',
      titleAr: 'مصروفات المبادرات الاستراتيجية للمخطط الشامل للمنظومة',
      category: 'Strategy Reports',
      categoryAr: 'تقارير الاستراتيجية',
      format: 'Excel',
      pages: 8,
      date: '2026-08-01',
    },
    {
      id: 'rep-6',
      title: 'Corporate Governance & Policy Renewal Status Index',
      titleAr: 'مؤشر حالة تحديث السياسات ولوائح الحوكمة المؤسسية',
      category: 'Governance Reports',
      categoryAr: 'تقارير الحوكمة',
      format: 'PDF',
      pages: 10,
      date: '2026-07-28',
    },
  ];

  const handleDownload = (rep: typeof reportTemplates[0]) => {
    const title = lang === 'ar' ? rep.titleAr : rep.title;
    toast.success(lang === 'ar' ? `جاري تحميل ${title}` : `Downloading ${title}`, {
      description: lang === 'ar' ? 'تم إنشاء مخرجات التقرير بنجاح.' : 'Report artifact generated successfully.',
    });
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <Breadcrumbs />
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1 mt-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>{t('EXECUTIVE REPORTING & ANALYTICS CENTER')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">{t('Executive Reports & Artifact Generator')}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('Generate, preview and export official PDF/Excel reports for enterprise leadership.')}
          </p>
        </div>
      </div>

      {/* Grid of reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTemplates.map((rep) => (
          <div
            key={rep.id}
            className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {lang === 'ar' ? rep.categoryAr : rep.category}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-400">{rep.format}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">
                {lang === 'ar' ? rep.titleAr : rep.title}
              </h3>
              <div className="flex items-center space-x-4 text-xs text-slate-500 font-mono">
                <span>{rep.pages} {t('Pages')}</span>
                <span>{lang === 'ar' ? 'التاريخ:' : 'Date:'} {rep.date}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                onClick={() => setSelectedReport(rep)}
                className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center space-x-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t('Preview')}</span>
              </button>
              <button
                onClick={() => handleDownload(rep)}
                className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-1 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t('Download')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="font-bold text-sm text-slate-900">
                {lang === 'ar' ? selectedReport.titleAr : selectedReport.title}
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">✕</button>
            </div>
            <div className="p-8 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-blue-600 mx-auto" />
              <div className="font-bold text-sm text-slate-900">{t('Enterprise Official Executive Report')}</div>
              <p className="text-xs text-slate-500">{t('Document generated with verified ISO 31000 & NCA ECC audit stamps.')}</p>
            </div>
            <div className="flex justify-end gap-2 p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs cursor-pointer"
              >
                {t('Close Preview')}
              </button>
              <button
                onClick={() => {
                  toast.success(lang === 'ar' ? 'تم تنزيل التقرير بنجاح' : 'Report downloaded to local storage.');
                  setSelectedReport(null);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 cursor-pointer"
              >
                {lang === 'ar' ? 'تنزيل PDF' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
