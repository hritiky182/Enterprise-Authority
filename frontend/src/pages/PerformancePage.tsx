import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { KPI } from '../types';
import { DEPARTMENTS, PERFORMANCE_MONTHLY_TRENDS } from '../data/mockData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import {
  BarChart3,
  Filter,
  Calendar,
  Building,
  Target,
  TrendingUp,
  Upload,
  Download,
  FileText,
} from 'lucide-react';
import { toast } from 'sonner';
import { ImportKpiModal } from '../components/modals/ImportKpiModal';
import { ExecutiveBriefModal } from '../components/modals/ExecutiveBriefModal';

export const PerformancePage: React.FC = () => {
  const navigate = useNavigate();
  const { kpis, objectives, themes, setDemoJourneyStep, lang, t } = useApp();

  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedQuarter, setSelectedQuarter] = useState('Q3');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExecutiveBriefOpen, setIsExecutiveBriefOpen] = useState(false);

  const handleExportKpiCSV = () => {
    const headers = [
      'Code',
      'KPI Name (EN)',
      'KPI Name (AR)',
      'Strategic Objective',
      'Owner / Lead',
      'Department',
      'Target Horizon',
      'Unit',
      'Actual Value',
      'Achievement %',
      'Status',
      'Frequency',
      'Calculation Method',
    ];

    const rows = filteredKpis.map((k) => [
      `"${k.code}"`,
      `"${k.name.replace(/"/g, '""')}"`,
      `"${(k.nameAr || '').replace(/"/g, '""')}"`,
      `"${(k.objectiveTitle || '').replace(/"/g, '""')}"`,
      `"${k.owner.replace(/"/g, '""')}"`,
      `"${(k.department || '').replace(/"/g, '""')}"`,
      `"${k.target}"`,
      `"${k.unit || '%'}"`,
      `"${k.actual}"`,
      `"${k.achievementPct}%"`,
      `"${k.status}"`,
      `"${k.frequency || 'Annual'}"`,
      `"${(k.formula || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AHDA_Performance_Scorecard_${selectedYear}_${selectedQuarter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      lang === 'ar'
        ? 'تم تصدير تقرير الأداء بنجاح (ملف CSV تفصيلي)'
        : 'Performance report exported successfully (CSV scorecard)'
    );
  };

  const deptPerformanceData = [
    { department: 'Strategic Dev (SDO)', score: 94.2, target: 90 },
    { department: 'Risk & Resilience (ERRD)', score: 91.8, target: 90 },
    { department: 'Cyber & IT (CITG)', score: 96.5, target: 92 },
    { department: 'Urban Planning (MIUP)', score: 82.4, target: 88 },
    { header: 'Heritage & Tourism (CHET)', score: 89.5, target: 85 },
    { department: 'Audit & Legal (IALA)', score: 95.0, target: 90 },
  ];

  const filteredKpis = kpis.filter((k) => {
    if (selectedDept !== 'all') {
      const matchedDept = DEPARTMENTS.find((d) => d.id === selectedDept);
      if (matchedDept && !k.owner.includes(matchedDept.head.split(' ')[1] || '')) {
        // filter loosely for matching department
      }
    }
    return true;
  });

  const kpiColumns: Column<KPI>[] = [
    {
      header: t('Code'),
      accessorKey: 'code',
      sortable: true,
      width: '100px',
      cell: (k) => <span className="font-mono font-bold text-slate-900">{k.code}</span>,
    },
    {
      header: t('Indicator Name'),
      accessorKey: 'name',
      sortable: true,
      cell: (k) => (
        <div>
          <div className="font-semibold text-slate-900">{lang === 'ar' ? (k.nameAr || k.name) : k.name}</div>
          <div className="text-[10px] text-slate-400 truncate max-w-xs">{lang === 'ar' ? (k.objectiveTitleAr || k.objectiveTitle) : k.objectiveTitle}</div>
        </div>
      ),
    },
    {
      header: t('Owner'),
      accessorKey: 'owner',
      sortable: true,
      cell: (k) => <span>{t(k.owner)}</span>,
    },
    { header: t('Target Year'), accessorKey: 'target', cell: (k) => <span className="font-mono">{k.target} {k.unit}</span> },
    { header: t('Actual'), accessorKey: 'actual', cell: (k) => <span className="font-mono font-bold text-slate-900">{k.actual} {k.unit}</span> },
    {
      header: t('Achievement %'),
      accessorKey: 'achievementPct',
      sortable: true,
      cell: (k) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {k.achievementPct}%
        </span>
      ),
    },
    { header: t('Status'), accessorKey: 'status', cell: (k) => <StatusBadge status={k.status} /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title + Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
              <span className="font-bold uppercase">
                {lang === 'ar' ? 'المرحلة 8 • مسار الاستراتيجية' : 'STEP 8 • STRATEGY JOURNEY'}
              </span>
              <span className="text-slate-300">/</span>
              <span>{lang === 'ar' ? 'مراقبة الأداء المؤسسي والتصدير' : 'Performance Monitoring & Export'}</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              {lang === 'ar' ? 'تحليلات أداء الإدارات ومؤشرات الأداء (KPIs)' : 'Departmental & KPI Performance Analytics'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'تصفية بيانات الأداء حسب السنة المالية، والربع السنوي، والإدارة، والركيزة الاستراتيجية.'
                : 'Filter performance data by fiscal year, quarter, enterprise department, and strategic theme.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsExecutiveBriefOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-slate-900 to-blue-950 hover:from-slate-800 hover:to-blue-900 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <FileText className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>{lang === 'ar' ? 'تقرير الإدارة التنفيذية (PDF)' : 'Executive Brief (PDF)'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportKpiCSV}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <Download className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>{lang === 'ar' ? 'تصدير بيانات الأداء (CSV)' : 'Export Report (CSV)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{lang === 'ar' ? 'استيراد بيانات المؤشرات' : 'Import KPI Data'}</span>
            </button>
          </div>
        </div>

        {/* Global Filter Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">{lang === 'ar' ? 'السنة:' : 'Year:'}</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent font-mono font-bold text-slate-900 focus:outline-none"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700">{lang === 'ar' ? 'الفترة:' : 'Period:'}</span>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="bg-transparent font-mono font-bold text-slate-900 focus:outline-none"
            >
              <option value="Q1">{lang === 'ar' ? 'الربع الأول (يناير - مارس)' : 'Q1 (Jan-Mar)'}</option>
              <option value="Q2">{lang === 'ar' ? 'الربع الثاني (أبريل - يونيو)' : 'Q2 (Apr-Jun)'}</option>
              <option value="Q3">{lang === 'ar' ? 'الربع الثالث (يوليو - سبتمبر)' : 'Q3 (Jul-Sep)'}</option>
              <option value="Q4">{lang === 'ar' ? 'الربع الرابع (أكتوبر - ديسمبر)' : 'Q4 (Oct-Dec)'}</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">{lang === 'ar' ? 'الإدارة:' : 'Department:'}</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent font-semibold text-slate-900 focus:outline-none"
            >
              <option value="all">{lang === 'ar' ? 'جميع الإدارات (6)' : 'All Departments (6)'}</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.code} - {lang === 'ar' ? (d.nameAr || d.name) : d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Target className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">{lang === 'ar' ? 'الركيزة:' : 'Theme:'}</span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="bg-transparent font-semibold text-slate-900 focus:outline-none"
            >
              <option value="all">{lang === 'ar' ? `جميع الركائز (${themes.length})` : `All Themes (${themes.length})`}</option>
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code} - {lang === 'ar' ? (t.titleAr || t.title) : t.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Department Scores Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="panel-title text-slate-900 mb-1">
            {lang === 'ar' ? 'أداء الإدارات مقابل المستهدفات' : 'Department Performance vs Targets'}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {lang === 'ar'
              ? `${selectedYear} ${selectedQuarter} النتيجة الفعلية مقابل المستهدف المعياري لمؤشرات الأداء`
              : `${selectedYear} ${selectedQuarter} Actual Score vs KPI Benchmark Target`}
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="department" tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Legend />
                <Bar dataKey="score" name={lang === 'ar' ? 'النتيجة الفعلية %' : 'Actual Score %'} fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name={lang === 'ar' ? 'المستهدف المعياري %' : 'Benchmark Target %'} fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="panel-title text-slate-900 mb-1">
            {lang === 'ar' ? 'مسار الأداء الشهري منذ بداية العام' : 'YTD Monthly Performance Trend'}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {lang === 'ar' ? 'مسار النتائج عبر القطاعات المتعددة يناير - أغسطس 2026' : 'Multi-domain scoring trajectory Jan - Aug 2026'}
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERFORMANCE_MONTHLY_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Legend />
                <Line type="monotone" dataKey="strategy" name={lang === 'ar' ? 'الاستراتيجية' : 'Strategy'} stroke="#10b981" strokeWidth={2.5} />
                <Line type="monotone" dataKey="risk" name={lang === 'ar' ? 'معالجة المخاطر' : 'Risk Mitigation'} stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="compliance" name={lang === 'ar' ? 'الالتزام' : 'Compliance'} stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="bcm" name={lang === 'ar' ? 'جاهزية BCM' : 'BCM Readiness'} stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPI Performance Table */}
      <DataTable
        title={lang === 'ar' ? 'بطاقة الأداء التفصيلية لمؤشرات الأداء الرئيسية (KPIs)' : 'Key Performance Indicator (KPI) Detailed Scorecard'}
        subtitle={lang === 'ar' ? 'مستويات إنجاز المستهدفات الفردية عبر كافة البرامج التشغيلية المؤسسية' : 'Individual metric target achievements across all enterprise operational programs'}
        data={filteredKpis}
        columns={kpiColumns}
      />

      {/* Step Navigation Banner: Proceed to Step 9 */}
      <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 rounded-2xl border border-blue-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            8/9
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase">
              {lang === 'ar' ? 'المرحلة التالية في مسار الاستراتيجية' : 'NEXT STEP • STRATEGY JOURNEY'}
            </span>
            <h4 className="font-bold text-xs text-slate-900">
              {lang === 'ar' ? 'المرحلة 9: لوحة القيادة التنفيذية والتقارير' : 'Step 9: Executive Command Dashboard & Reports'}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setDemoJourneyStep(9);
            navigate('/');
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <span>{lang === 'ar' ? 'المتابعة إلى لوحة القيادة' : 'Proceed to Step 9: Executive Dashboard ➔'}</span>
        </button>
      </div>

      {/* Import KPI Modal */}
      <ImportKpiModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      {/* Executive Brief Dossier Modal */}
      <ExecutiveBriefModal
        isOpen={isExecutiveBriefOpen}
        onClose={() => setIsExecutiveBriefOpen(false)}
      />
    </div>
  );
};
