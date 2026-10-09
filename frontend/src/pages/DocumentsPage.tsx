import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DataTable, Column } from '../components/common/DataTable';
import { DocumentItem } from '../types';
import { FileText, Download, Upload, Eye, FileSpreadsheet, FileCode, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { UploadDocumentModal } from '../components/modals/UploadDocumentModal';

export const DocumentsPage: React.FC = () => {
  const { documents, openModal, lang, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredDocs = documents.filter((d) => {
    if (selectedCategory !== 'all' && d.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    return true;
  });

  const getCategoryLabel = (cat: string) => {
    if (cat === 'all') return lang === 'ar' ? 'الكل' : 'All';
    if (lang === 'ar') {
      const map: Record<string, string> = {
        'Policy': 'سياسات',
        'Procedure': 'إجراءات',
        'Risk Document': 'وثائق المخاطر',
        'Strategy Document': 'وثائق الاستراتيجية',
        'BCM Plan': 'خطط الاستمرارية',
        'Compliance Evidence': 'أدلة الالتزام',
        'Governance Document': 'وثائق الحوكمة',
      };
      return map[cat] || cat;
    }
    return cat;
  };

  const docColumns: Column<DocumentItem>[] = [
    { header: t('Document ID'), accessorKey: 'code', sortable: true, cell: (d) => <span className="font-mono font-bold text-slate-900">{d.code}</span> },
    {
      header: t('Title & Format'),
      accessorKey: 'title',
      sortable: true,
      cell: (d) => (
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600 font-mono text-[10px] uppercase font-bold">
            {d.fileType}
          </div>
          <div>
            <div className="font-semibold text-slate-900">{d.title}</div>
            <div className="text-[10px] text-slate-400 font-mono">{t(d.category)} • {d.fileSize}</div>
          </div>
        </div>
      ),
    },
    { header: t('Uploaded By'), accessorKey: 'uploadedBy', sortable: true, cell: (d) => <span>{t(d.uploadedBy)}</span> },
    { header: t('Upload Date'), accessorKey: 'uploadDate', cell: (d) => <span className="font-mono text-slate-600">{d.uploadDate}</span> },
    { header: t('Version'), accessorKey: 'version', cell: (d) => <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">{d.version}</span> },
    {
      header: t('Actions'),
      cell: (d) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toast.info(`${lang === 'ar' ? 'معاينة' : 'Viewing preview of'} ${d.title}`)}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-600 cursor-pointer"
            title={t('Preview')}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => toast.success(`${lang === 'ar' ? 'تم تنزيل' : 'Downloaded'} ${d.title} (${d.fileSize})`)}
            className="p-1.5 rounded hover:bg-slate-100 text-emerald-700 cursor-pointer"
            title={t('Download')}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <FileText className="w-4 h-4" />
            <span>{t('ENTERPRISE KNOWLEDGE & EVIDENCE REPOSITORY')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {t('Document & Compliance Evidence Repository')}
          </h1>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          {t('Upload & Import Documents')}
        </button>
      </div>

      {/* Category Badges */}
      <div className="flex flex-wrap gap-2 bg-white p-3 rounded-xl border border-slate-200 text-xs font-mono">
        <span className="font-semibold text-slate-700 self-center mr-2">{lang === 'ar' ? 'الفئة:' : 'Category:'}</span>
        {['all', 'Policy', 'Procedure', 'Risk Document', 'Strategy Document', 'BCM Plan', 'Compliance Evidence', 'Governance Document'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      <DataTable
        title={lang === 'ar' ? 'فهرس ملفات مستودع الوثائق المؤسسي' : 'Document Repository Master File Index'}
        subtitle={lang === 'ar' ? 'البحث وتنزيل لوائح الهيئة المعتمدة وأدلة الامتثال' : 'Search and download official enterprise charters and compliance evidence'}
        data={filteredDocs}
        columns={docColumns}
      />

      {/* Upload & Import Document Modal */}
      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};
