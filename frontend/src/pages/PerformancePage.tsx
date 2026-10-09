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
  TrendingDown,
  Upload,
  Download,
  FileText,
  MessageSquare,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import { ImportKpiModal } from '../components/modals/ImportKpiModal';
import { ExecutiveBriefModal } from '../components/modals/ExecutiveBriefModal';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

export const PerformancePage: React.FC = () => {
  const navigate = useNavigate();
  const { kpis, objectives, themes, lang, t } = useApp();

  const [activeTab, setActiveTab] = useState<'summary' | 'grid'>('summary');
  const [selectedPerspective, setSelectedPerspective] = useState<'Financial' | 'Customer' | 'Internal' | 'Capacity'>('Financial');
  const [selectedPeriod, setSelectedPeriod] = useState('December 2026');
  const [comments, setComments] = useState<string[]>([
    'Fiscal year target trajectory demonstrates resilient recovery across heritage tourism revenues.',
  ]);
  const [newComment, setNewComment] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);

  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedQuarter, setSelectedQuarter] = useState('Q3');
  const [selectedDept, setSelectedDept] = useState('all');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExecutiveBriefOpen, setIsExecutiveBriefOpen] = useState(false);

  // Corporater-style trend data
  const corporaterTrendData = [
    { month: 'Jun', score: 98 },
    { month: 'Jul', score: 92 },
    { month: 'Aug', score: 90 },
    { month: 'Sep', score: 81 },
    { month: 'Oct', score: 82 },
    { month: 'Nov', score: 85 },
    { month: 'Dec', score: 88 },
  ];

  // Perspective specific objectives
  const perspectiveObjectives = {
    Financial: [
      { id: 'po-1', name: 'Ensure Financial Sustainability & Fiscal Resilience', nameAr: 'ضمان الاستدامة والمرونة المالية للمنظومة', priority: 'warning', status: 'critical' },
      { id: 'po-2', name: 'Increase Regional Heritage Tourism Value Added', nameAr: 'تعظيم القيمة المضافة لقطاع السياحة التراثية', priority: 'warning', status: 'warning' },
      { id: 'po-3', name: 'Attract Private Capital Co-Investment in Agri-Oasis', nameAr: 'جذب الاستثمارات المشتركة للقطاع الخاص بواحة النخيل', priority: 'warning', status: 'critical' },
    ],
    Customer: [
      { id: 'po-4', name: 'Ensure World-Class Visitor Satisfaction & Safety', nameAr: 'ضمان أعلى معايير رضا وسلامة زوار المحافظة', priority: 'on-track', status: 'on-track' },
      { id: 'po-5', name: 'Elevate Quality of Life Index for Al-Ahsa Residents', nameAr: 'الارتقاء بمؤشر جودة الحياة للمواطنين والمقيمين', priority: 'warning', status: 'warning' },
      { id: 'po-6', name: 'Expand Regional Cultural Identity Pride', nameAr: 'تعزيز الفخر بالهوية الثقافية والتراثية الحية', priority: 'on-track', status: 'on-track' },
    ],
    Internal: [
      { id: 'po-7', name: 'Consolidate Unified Spatial Planning Regulations', nameAr: 'توحيد ضوابط وأنظمة التخطيط المكاني الشامل', priority: 'warning', status: 'critical' },
      { id: 'po-8', name: 'Rehabilitate UNESCO Irrigation Canal Network', nameAr: 'تأهيل وتطوير شبكات قنوات الري المسجلة باليونسكو', priority: 'critical', status: 'critical' },
      { id: 'po-9', name: 'Accelerate Enterprise Smart Process Digitization', nameAr: 'تسريع أتمتة العمليات والخدمات المؤسسية الذكية', priority: 'on-track', status: 'on-track' },
    ],
    Capacity: [
      { id: 'po-10', name: 'Attract and Develop High-Impact Saudi Leadership', nameAr: 'استقطاب وتطوير القيادات والكفاءات الوطنية المتميزة', priority: 'on-track', status: 'on-track' },
      { id: 'po-11', name: 'Achieve Institutional Governance & ISO Standards', nameAr: 'تحقيق التميز في الحوكمة المؤسسية ومعايير الآيزو', priority: 'warning', status: 'warning' },
      { id: 'po-12', name: 'Build Institutional Business Continuity Capacity', nameAr: 'بناء القدرات والجاهزية المؤسسية لاستمرارية الأعمال', priority: 'on-track', status: 'on-track' },
    ],
  }[selectedPerspective];

  // Perspective specific KPIs
  const perspectiveKpis = {
    Financial: [
      { name: 'Municipal Revenue Diversification Index', nameAr: 'مؤشر تنويع الإيرادات البلدية', responsible: 'Dr. Reem Al-Qahtani', actual: 'SAR 18,859,631', priority: 'warning', status: 'warning' },
      { name: 'Return on Capital Investment (ROCE %)', nameAr: 'العائد على رأس المال المستثمر', responsible: 'Eng. Abdulaziz Al-Hassan', actual: '101%', priority: 'on-track', status: 'on-track' },
      { name: 'Visitor Economic Yield / Yield Per Tourist', nameAr: 'العائد الاقتصادي لكل زائر', responsible: 'Eng. Fahad Al-Subaie', actual: 'SAR 2,420', priority: 'critical', status: 'critical' },
    ],
    Customer: [
      { name: 'Visitor Satisfaction Net Promoter Score (NPS)', nameAr: 'صافي نقاط الترويج ورضا الزوار', responsible: 'Noura Al-Shammari', actual: '+68 NPS', priority: 'on-track', status: 'on-track' },
      { name: 'Quality of Life Resident Benchmark Index', nameAr: 'مؤشر جودة الحياة لسكان المحافظة', responsible: 'Dr. Reem Al-Qahtani', actual: '78.5 / 100', priority: 'warning', status: 'warning' },
    ],
    Internal: [
      { name: 'Spatial Permitting Cycle Time Efficiency', nameAr: 'متوسط زمن إصدار الموافقات التخطيطية', responsible: 'Eng. Tariq Al-Mansoor', actual: '14 Days', priority: 'warning', status: 'critical' },
      { name: 'Irrigation Water Canal Circulation Rate', nameAr: 'نسبة جريان المياه بقنوات الري التراثية', responsible: 'Abdullah Al-Ghamdi', actual: '72%', priority: 'critical', status: 'critical' },
    ],
    Capacity: [
      { name: 'Specialized Strategy Capability Fill Ratio', nameAr: 'نسبة استقطاب الكفاءات التخصصية بالهيئة', responsible: 'Eng. Khaled Al-Otaibi', actual: '94%', priority: 'on-track', status: 'on-track' },
      { name: 'ISO 22301 & 9001 Audit Compliance Score', nameAr: 'نسبة الالتزام بمعايير الأيزو والجودة', responsible: 'Haya Al-Mulhim', actual: '96.5%', priority: 'on-track', status: 'on-track' },
    ],
  }[selectedPerspective];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [newComment.trim(), ...prev]);
    setNewComment('');
    setIsAddingComment(false);
    toast.success(lang === 'ar' ? 'تمت إضافة التقييم بنجاح' : 'Comment added to scorecard assessment');
  };

  const handleExportKpiCSV = () => {
    const headers = ['Code', 'Name', 'Target', 'Actual', 'Achievement', 'Status'];
    const rows = kpis.map((k) => [
      `"${k.code}"`,
      `"${k.name}"`,
      `"${k.target}"`,
      `"${k.actual}"`,
      `"${k.achievementPct}%"`,
      `"${k.status}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AHDA_Scorecard_${selectedPerspective}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Scorecard CSV exported successfully');
  };

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
      {/* Top Header & Breadcrumbs (Corporater Style Image 3) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 mb-1">
            <span>Corporate</span>
            <span>&gt;</span>
            <span>Corporate Scorecard</span>
            <span>&gt;</span>
            <span className="text-blue-700 font-bold">{selectedPerspective}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'ملخص الأداء المؤسسي (Performance Summary)' : 'Performance Summary'}
          </h1>
        </div>

        {/* View Switcher & Period Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Perspective Selector Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {(['Financial', 'Customer', 'Internal', 'Capacity'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPerspective(p)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedPerspective === p
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Tab Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'summary'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scorecard Summary
            </button>
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Detailed KPI Grid
            </button>
          </div>

          <button
            onClick={handleExportKpiCSV}
            className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 cursor-pointer"
            title="Export CSV Scorecard"
          >
            <Download className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. CORPORATER PERFORMANCE SUMMARY VIEW (DIRECT MATCH IMAGE 3)   */}
      {/* ============================================================== */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Top Section: Trend Line Chart & Quick Stats & Description Panel */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left 2 Columns: KPI Achievement Over Period + Quick Statistics */}
            <div className="xl:col-span-2 space-y-6">
              {/* Line Chart: KPIS ACHIEVEMENT OVER THE PERIOD */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 font-mono">
                    KPIS ACHIEVEMENT OVER THE PERIOD
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">Monthly Index</span>
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={corporaterTrendData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} domain={[70, 110]} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '12px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#1e3a8a"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#1e3a8a', strokeWidth: 1, stroke: '#fff' }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Statistics (2x2 Grid with Left Accent Borders matching Image 3) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 font-mono">
                    QUICK STATISTICS
                  </h3>
                  <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50/50 p-4 rounded-xl border-l-4 border-l-rose-600 border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-sans block">Overall Objectives</span>
                    <div className="text-2xl font-bold font-sans text-slate-900 mt-1">74%</div>
                  </div>

                  <div className="bg-slate-50/50 p-4 rounded-xl border-l-4 border-l-amber-500 border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-sans block">Overall KPIs</span>
                    <div className="text-2xl font-bold font-sans text-slate-900 mt-1">74%</div>
                  </div>

                  <div className="bg-slate-50/50 p-4 rounded-xl border-l-4 border-l-rose-600 border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-sans block">Overall Initiatives</span>
                    <div className="text-2xl font-bold font-sans text-slate-900 mt-1">52%</div>
                  </div>

                  <div className="bg-slate-50/50 p-4 rounded-xl border-l-4 border-l-rose-600 border border-slate-200/70">
                    <span className="text-xs text-slate-500 font-sans block">Risks Treated</span>
                    <div className="text-2xl font-bold font-sans text-slate-900 mt-1">34%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: DESCRIPTION Panel (Exact Match Image 3) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 font-mono">
                    DESCRIPTION
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">NAME</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedPerspective}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">PRIORITY</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      <span className="font-medium text-slate-700">Medium / High Strategic Priority</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">STATUS</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-2xs" />
                      <span className="font-medium text-slate-700">Action Plan Required</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">TREND</span>
                    <div className="flex items-center gap-1 text-rose-600 font-bold mt-0.5 font-mono">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>Degrading (-3.2%)</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">WEIGHT</span>
                    <span className="font-mono font-bold text-slate-800">10.00</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">MODIFIED BY</span>
                    <span className="text-slate-700 font-medium">Administrator</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">LAST MODIFIED</span>
                    <span className="text-slate-500 font-mono text-[11px]">May 19, 2026, 1:32:33 PM</span>
                  </div>
                </div>
              </div>

              {/* Key Assessment Section (Image 3) */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-700 font-mono">
                    KEY ASSESSMENT
                  </span>
                  <button
                    onClick={() => setIsAddingComment(true)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-600 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {comments.map((c, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200/60 leading-relaxed font-sans">
                      {c}
                    </div>
                  ))}
                </div>

                {isAddingComment && (
                  <form onSubmit={handleAddComment} className="space-y-2 pt-2">
                    <textarea
                      rows={2}
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add an assessment note..."
                      className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsAddingComment(false)}
                        className="px-2.5 py-1 text-xs text-slate-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-semibold"
                      >
                        Save Note
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section: RELATED OBJECTIVES & RELATED KPIS Tables (Exact Match Image 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* RELATED OBJECTIVES */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 font-mono">
                  RELATED OBJECTIVES
                </h3>
                <Search className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                    <tr>
                      <th className="py-2.5 px-3">NAME</th>
                      <th className="py-2.5 px-3 text-center w-24">PRIORITY</th>
                      <th className="py-2.5 px-3 text-center w-20">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {perspectiveObjectives.map((obj) => (
                      <tr key={obj.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-semibold text-slate-900">{lang === 'ar' ? obj.nameAr : obj.name}</span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`w-2.5 h-2.5 rounded-full inline-block ${
                              obj.priority === 'on-track'
                                ? 'bg-emerald-500'
                                : obj.priority === 'warning'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                          />
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`w-2.5 h-2.5 rounded-full inline-block ${
                              obj.status === 'on-track'
                                ? 'bg-emerald-500'
                                : obj.status === 'warning'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RELATED KPIS */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 font-mono">
                  RELATED KPIS
                </h3>
                <Search className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                    <tr>
                      <th className="py-2.5 px-3">NAME</th>
                      <th className="py-2.5 px-3">RESPONSIBLE</th>
                      <th className="py-2.5 px-3 text-end">ACTUAL</th>
                      <th className="py-2.5 px-3 text-center w-20">PRIORITY</th>
                      <th className="py-2.5 px-3 text-center w-16">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {perspectiveKpis.map((k, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-semibold text-slate-900">{lang === 'ar' ? k.nameAr : k.name}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium">{k.responsible}</td>
                        <td className="py-3 px-3 text-end font-mono font-bold text-slate-900">{k.actual}</td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`w-2.5 h-2.5 rounded-full inline-block ${
                              k.priority === 'on-track' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`w-2.5 h-2.5 rounded-full inline-block ${
                              k.status === 'on-track'
                                ? 'bg-emerald-500'
                                : k.status === 'warning'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. DETAILED KPI SCORECARD & GRID TAB                           */}
      {/* ============================================================== */}
      {activeTab === 'grid' && (
        <div className="space-y-6">
          <DataTable
            title={lang === 'ar' ? 'سجل قياس مؤشرات الأداء الاستراتيجية' : 'Strategic KPI Performance Register'}
            subtitle={lang === 'ar' ? 'القيم الفعلية والمستهدفات السنوية ونسب الإنجاز' : 'Actuals, baselines, targets and variance calculations'}
            data={kpis}
            columns={kpiColumns}
          />
        </div>
      )}

      {/* Lifecycle Flow Progression */}
      <StrategicLifecycleProgression
        currentStage={17}
        stageTitle="Performance Monitoring"
        stageTitleAr="متابعة وتحليل الأداء"
        prevStage={{ stage: 16, title: 'Actuals & Evidence Validation', titleAr: 'اعتماد القيم الفعلية والشواهد', path: '/performance/actuals' }}
        nextStage={{ stage: 18, title: 'Corrective Actions', titleAr: 'الخطط التصحيحية', path: '/actions' }}
        relatedLinks={[
          { title: "Actuals Collection", titleAr: "جمع القيم الفعلية", path: "/performance/collection" },
          { title: "Evidence Validation", titleAr: "اعتماد الشواهد", path: "/performance/actuals" },
          { title: "Corrective Actions", titleAr: "الخطط التصحيحية", path: "/actions" },
        ]}
      />

      <ImportKpiModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      <ExecutiveBriefModal
        isOpen={isExecutiveBriefOpen}
        onClose={() => setIsExecutiveBriefOpen(false)}
      />
    </div>
  );
};
