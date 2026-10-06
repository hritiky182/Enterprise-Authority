import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Printer,
  Download,
  X,
  Target,
  Layers,
  BarChart3,
  Sparkles,
  Building2,
  CheckCircle2,
  Calendar,
  User,
  Shield,
  Award,
} from 'lucide-react';
import { toast } from 'sonner';
import { OrganizationLogo } from '../common/OrganizationLogo';

interface ExecutiveBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveBriefModal: React.FC<ExecutiveBriefModalProps> = ({ isOpen, onClose }) => {
  const {
    organization,
    themes,
    goals,
    objectives,
    kpis,
    initiatives,
    lang,
    t,
  } = useApp();

  if (!isOpen) return null;

  const totalBudget = initiatives.reduce((sum, i) => sum + (i.budgetSAR || 0), 0);
  const totalSpent = initiatives.reduce((sum, i) => sum + (i.spentSAR || 0), 0);
  const avgKpiAchieve = kpis.length > 0 ? Math.round(kpis.reduce((sum, k) => sum + k.achievementPct, 0) / kpis.length) : 88;

  const handlePrint = () => {
    window.print();
    toast.success(lang === 'ar' ? 'تم تجهيز ملف التقرير للطباعة أو الحفظ كـ PDF' : 'Ready to print or save as PDF');
  };

  const handleDownloadCSV = () => {
    const headers = [
      'Level',
      'Code',
      'Title (EN)',
      'Title (AR)',
      'Owner / Lead',
      'Target Horizon',
      'Formula / Budget',
      'Status / Progress',
    ];

    const rows: string[][] = [];

    // Vision
    rows.push(['Vision', 'VIS-01', `"${organization.vision}"`, `"${organization.visionAr || ''}"`, 'Authority Board & CEO', '2030', 'Strategic Mandate', 'Active']);
    // Mission
    rows.push(['Mission', 'MIS-01', `"${organization.mission}"`, `"${organization.missionAr || ''}"`, 'Executive Leadership', '2030', 'Operational Mandate', 'Active']);

    // Themes
    themes.forEach((theme) => {
      rows.push(['Strategic Pillar', theme.code, `"${theme.title}"`, `"${theme.titleAr || ''}"`, 'Executive Council', '2027', `Weight: ${theme.weight}%`, 'Active']);
    });

    // Objectives
    objectives.forEach((obj) => {
      rows.push(['Objective', obj.code, `"${obj.title}"`, `"${obj.titleAr || ''}"`, obj.owner, `${obj.targetYear}`, 'OKR', `${obj.progress}% (${obj.status})`]);
    });

    // KPIs
    kpis.forEach((kpi) => {
      rows.push(['KPI', kpi.code, `"${kpi.name}"`, `"${kpi.nameAr || ''}"`, kpi.owner, '2026/2027', `"${kpi.formula || ''}"`, `${kpi.actual} ${kpi.unit} (${kpi.achievementPct}%)`]);
    });

    // Initiatives
    initiatives.forEach((init) => {
      rows.push(['Initiative', init.code, `"${init.title}"`, `"${init.titleAr || ''}"`, init.owner, '2026-2027', `SAR ${(init.budgetSAR / 1000000).toFixed(1)}M`, `${init.progress}% (${init.status})`]);
    });

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const orgCode = organization.shortCode || organization.shortName || 'AHDA';
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${orgCode}_Executive_Strategy_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(lang === 'ar' ? 'تم تحميل ملف البيانات بنجاح' : 'Executive strategy data exported successfully.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      {/* Modal Dialog Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-900">
        {/* Top Control Bar (Hidden during print) */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {lang === 'ar' ? 'تقرير التميز الاستراتيجي التنفيذي (PDF/طباعة)' : 'Executive Strategy Brief & Board Certified Dossier'}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {organization.name} • {organization.shortCode || organization.shortName || 'AHDA'}-EXEC-2026-v3.4
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'طباعة / حفظ كـ PDF' : 'Print / Save PDF'}</span>
            </button>

            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تصدير Excel' : 'Export Excel'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-white print:p-0 print:overflow-visible">
          {/* Header Charter Block */}
          <div className="border-b-2 border-slate-900 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center p-1 bg-slate-50 border border-slate-200 shadow-2xs shrink-0">
                  <OrganizationLogo logoId={organization.logo} logoUrl={organization.logoUrl} size="lg" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-sans">
                    {lang === 'ar' ? (organization.nameAr || organization.name) : organization.name}
                  </h1>
                  <div className="text-xs font-semibold text-blue-700 font-mono mt-0.5">
                    {lang === 'ar' ? organization.name : organization.nameAr}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">
                    Board Executive Strategy Dossier • 2026–2030 Horizon
                  </div>
                </div>
              </div>

              <div className="text-start sm:text-end font-mono text-xs space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Document Metadata</div>
                <div><strong>Ref:</strong> {organization.shortCode || organization.shortName || 'AHDA'}-STRAT-BRIEF-2026</div>
                <div><strong>Date:</strong> {new Date().toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div><strong>Classification:</strong> <span className="text-rose-600 font-bold">CONFIDENTIAL</span></div>
              </div>
            </div>
          </div>

          {/* Complete Relationship Lineage (Vision -> Mission -> Values -> Pillars -> Objectives -> KPIs -> Initiatives) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {lang === 'ar' ? '1. سلسلة المواءمة الاستراتيجية المتكاملة (Relationship Lineage)' : '1. Strategic Relationship Lineage & Foundation'}
              </h2>
            </div>

            {/* Visual Step Lineage */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center font-mono text-[10px]">
              <div className="p-2 rounded-xl bg-blue-100/70 border border-blue-200 text-blue-900">
                <div className="font-bold uppercase">1. Vision</div>
                <div className="text-[9px] text-blue-700 font-sans mt-0.5">Sustainable Leader</div>
              </div>
              <div className="p-2 rounded-xl bg-indigo-100/70 border border-indigo-200 text-indigo-900">
                <div className="font-bold uppercase">2. Mission</div>
                <div className="text-[9px] text-indigo-700 font-sans mt-0.5">Masterplan Execution</div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-100/70 border border-emerald-200 text-emerald-900">
                <div className="font-bold uppercase">3. Pillars</div>
                <div className="text-[9px] text-emerald-700 font-sans mt-0.5">{themes.length} Core Themes</div>
              </div>
              <div className="p-2 rounded-xl bg-cyan-100/70 border border-cyan-200 text-cyan-900">
                <div className="font-bold uppercase">4. Objectives</div>
                <div className="text-[9px] text-cyan-700 font-sans mt-0.5">{objectives.length} Strategic OKRs</div>
              </div>
              <div className="p-2 rounded-xl bg-amber-100/70 border border-amber-200 text-amber-900">
                <div className="font-bold uppercase">5. KPIs</div>
                <div className="text-[9px] text-amber-700 font-sans mt-0.5">{kpis.length} Telemetry Points</div>
              </div>
              <div className="p-2 rounded-xl bg-purple-100/70 border border-purple-200 text-purple-900">
                <div className="font-bold uppercase">6. Projects</div>
                <div className="text-[9px] text-purple-700 font-sans mt-0.5">{initiatives.length} Flagship Inits</div>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-1.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800">
                  {lang === 'ar' ? 'الرؤية الاستراتيجية (Vision)' : 'Official Strategic Vision'}
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-relaxed font-sans">
                  "{organization.vision}"
                </p>
                {organization.visionAr && lang !== 'ar' && (
                  <p className="text-[11px] text-slate-500 font-sans">
                    {organization.visionAr}
                  </p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-1.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-800">
                  {lang === 'ar' ? 'الرسالة المؤسسية (Mission)' : 'Official Institutional Mission'}
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-relaxed font-sans">
                  "{organization.mission}"
                </p>
                {organization.missionAr && lang !== 'ar' && (
                  <p className="text-[11px] text-slate-500 font-sans">
                    {organization.missionAr}
                  </p>
                )}
              </div>
            </div>

            {/* Core Values */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase me-2">
                {lang === 'ar' ? 'القيم المؤسسية:' : 'Core Values:'}
              </span>
              {((organization.coreValues || organization.values) ?? []).map((val: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-slate-200 text-slate-800 shadow-2xs font-sans"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>

          {/* Strategic Pillars Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {lang === 'ar' ? '2. الركائز الاستراتيجية الخمس والأوزان النسبية' : '2. Strategic Themes (Pillars) & Weight Allocation'}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {themes.map((theme) => {
                const themeObjs = objectives.filter((o) => o.themeId === theme.id);
                return (
                  <div key={theme.id} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{theme.code}</span>
                      <span className="font-bold text-slate-700">{theme.weight}% wt</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-2">
                      {lang === 'ar' ? (theme.titleAr || theme.title) : theme.title}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {themeObjs.length} {lang === 'ar' ? 'مستهدفات' : 'Objectives'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strategic Objectives (OKRs) Table */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {lang === 'ar' ? '3. سجل المستهدفات والملكية المؤسسية (Objectives & Ownership)' : '3. Cascaded Strategic Objectives (OKRs) & Governance'}
              </h2>
            </div>

            <table className="w-full text-xs text-start border-collapse border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase">
                <tr>
                  <th className="p-2.5 border border-slate-200 text-start w-20">Code</th>
                  <th className="p-2.5 border border-slate-200 text-start">Objective Title</th>
                  <th className="p-2.5 border border-slate-200 text-start w-40">Owner & Dept</th>
                  <th className="p-2.5 border border-slate-200 text-center w-24">Horizon</th>
                  <th className="p-2.5 border border-slate-200 text-center w-24">Progress</th>
                  <th className="p-2.5 border border-slate-200 text-center w-24">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {objectives.slice(0, 6).map((obj) => (
                  <tr key={obj.id} className="hover:bg-slate-50">
                    <td className="p-2 border border-slate-200 font-mono font-bold text-blue-700">{obj.code}</td>
                    <td className="p-2 border border-slate-200 font-semibold">{lang === 'ar' ? (obj.titleAr || obj.title) : obj.title}</td>
                    <td className="p-2 border border-slate-200 text-[11px]">
                      <div>{obj.owner}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{obj.department}</div>
                    </td>
                    <td className="p-2 border border-slate-200 text-center font-mono">{obj.targetYear}</td>
                    <td className="p-2 border border-slate-200 text-center font-mono font-bold">{obj.progress}%</td>
                    <td className="p-2 border border-slate-200 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        obj.status === 'on-track' || obj.status === 'achieved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {obj.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key Performance Indicators (Telemetry) Table */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {lang === 'ar' ? '4. مصفوفة مؤشرات الأداء وحساب المعادلات (KPI Telemetry)' : '4. KPI Formulation, Multi-Year Targets & Weighting'}
              </h2>
            </div>

            <table className="w-full text-xs text-start border-collapse border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase">
                <tr>
                  <th className="p-2.5 border border-slate-200 text-start w-20">KPI Code</th>
                  <th className="p-2.5 border border-slate-200 text-start">Indicator Name</th>
                  <th className="p-2.5 border border-slate-200 text-start min-w-[200px]">Calculation Formula</th>
                  <th className="p-2.5 border border-slate-200 text-center w-16">Base</th>
                  <th className="p-2.5 border border-slate-200 text-center w-20 bg-blue-50">2026 Tgt</th>
                  <th className="p-2.5 border border-slate-200 text-center w-20 bg-indigo-50">2027 Tgt</th>
                  <th className="p-2.5 border border-slate-200 text-center w-20">Actual</th>
                  <th className="p-2.5 border border-slate-200 text-center w-20">Achieve %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {kpis.slice(0, 6).map((kpi) => (
                  <tr key={kpi.id} className="hover:bg-slate-50">
                    <td className="p-2 border border-slate-200 font-mono font-bold text-slate-900">{kpi.code}</td>
                    <td className="p-2 border border-slate-200 font-semibold">
                      {lang === 'ar' ? (kpi.nameAr || kpi.name) : kpi.name}
                      <div className="text-[9px] font-mono text-indigo-600 mt-0.5">
                        {kpi.type || 'Lagging'} • {kpi.frequency} • {kpi.weight || 15}% wt
                      </div>
                    </td>
                    <td className="p-2 border border-slate-200 font-mono text-[10px] text-slate-600 bg-slate-50/50">
                      {lang === 'ar' ? (kpi.formulaAr || kpi.formula || '—') : (kpi.formula || '—')}
                    </td>
                    <td className="p-2 border border-slate-200 text-center font-mono">{kpi.baseline || '—'}</td>
                    <td className="p-2 border border-slate-200 text-center font-mono font-bold text-blue-800 bg-blue-50/40">{kpi.target2026 || '—'}</td>
                    <td className="p-2 border border-slate-200 text-center font-mono font-bold text-indigo-800 bg-indigo-50/40">{kpi.target2027 || '—'}</td>
                    <td className="p-2 border border-slate-200 text-center font-mono font-bold">{kpi.actual} {kpi.unit}</td>
                    <td className="p-2 border border-slate-200 text-center font-mono font-black text-emerald-700">{kpi.achievementPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Flagship Strategic Initiatives Portfolio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                {lang === 'ar' ? '5. محفظة المبادرات والمشاريع التمكينية (Flagship Portfolio)' : '5. Flagship Strategic Projects Portfolio & Capital Allocations'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase">Allocated Capital Budget</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  SAR {(totalBudget / 1000000).toFixed(1)} Million
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase">Current Capital Execution</div>
                <div className="text-base font-bold text-blue-700 mt-0.5">
                  SAR {(totalSpent / 1000000).toFixed(1)} Million ({totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}%)
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase">Active Strategic Initiatives</div>
                <div className="text-base font-bold text-emerald-700 mt-0.5">
                  {initiatives.length} Approved Projects
                </div>
              </div>
            </div>

            <table className="w-full text-xs text-start border-collapse border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 font-mono text-[10px] text-slate-700 uppercase">
                <tr>
                  <th className="p-2.5 border border-slate-200 text-start w-20">Code</th>
                  <th className="p-2.5 border border-slate-200 text-start">Initiative & Scope</th>
                  <th className="p-2.5 border border-slate-200 text-start w-36">Lead Department</th>
                  <th className="p-2.5 border border-slate-200 text-center w-28">Budget (SAR)</th>
                  <th className="p-2.5 border border-slate-200 text-center w-24">Execution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {initiatives.map((init) => (
                  <tr key={init.id} className="hover:bg-slate-50">
                    <td className="p-2 border border-slate-200 font-mono font-bold text-slate-900">{init.code}</td>
                    <td className="p-2 border border-slate-200">
                      <div className="font-semibold text-slate-900">{lang === 'ar' ? (init.titleAr || init.title) : init.title}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{init.description}</div>
                    </td>
                    <td className="p-2 border border-slate-200 text-[11px] font-mono text-slate-600">{init.department}</td>
                    <td className="p-2 border border-slate-200 text-center font-mono font-bold text-slate-900">
                      SAR {(init.budgetSAR / 1000000).toFixed(1)}M
                    </td>
                    <td className="p-2 border border-slate-200 text-center font-mono font-bold text-blue-700">
                      {init.progress}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Executive Sign-off Certification */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Strategy Architecture Lead</div>
              <div className="font-bold text-slate-900 mt-1">Dr. Sarah Al-Rashid</div>
              <div className="text-[10px] text-slate-500">Chief Strategy Officer</div>
              <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ Electronically Certified</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase">Operational PMO Lead</div>
              <div className="font-bold text-slate-900 mt-1">Eng. Fahad Al-Subaie</div>
              <div className="text-[10px] text-slate-500">Director General of PMO</div>
              <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ Roadmap Approved</div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase">Authority Chief Executive</div>
              <div className="font-bold text-slate-900 mt-1">Eng. Omar Al-Mulhim</div>
              <div className="text-[10px] text-slate-500">Chief Executive Officer</div>
              <div className="text-[10px] text-blue-600 font-bold mt-1">★ Board Executive Charter</div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 print:hidden">
          <div className="text-xs text-slate-500 font-mono">
            {organization.shortCode || organization.shortName || 'AHDA'} • Source Code Ownership & Proprietary Strategic IP
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'ar' ? 'طباعة / حفظ كـ PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
