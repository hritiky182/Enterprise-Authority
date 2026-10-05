import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { KPI } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import {
  Target,
  Sparkles,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Building2,
  Award,
  BookOpen,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';

export const ClientStrategyMatrix: React.FC = () => {
  const { kpis, objectives, openModal } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedObjectiveFilter, setSelectedObjectiveFilter] = useState<'all' | '2.1' | '2.2'>('all');

  // Filter client-specific KPIs (specifically under pillar 02 or with cascading attributes)
  const clientKpis = kpis.filter((k) => {
    const isPillar2 = k.pillarCode === '02' || k.code.startsWith('2.');
    if (!isPillar2) return false;

    if (selectedObjectiveFilter === '2.1' && !k.code.startsWith('2.1')) return false;
    if (selectedObjectiveFilter === '2.2' && !k.code.startsWith('2.2')) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = k.name.toLowerCase().includes(q);
      const matchCode = k.code.toLowerCase().includes(q);
      const matchFormula = (k.formula || '').toLowerCase().includes(q);
      const matchProject = (k.keyProject || '').toLowerCase().includes(q);
      const matchMilestone = (k.keyMilestone || '').toLowerCase().includes(q);
      const matchInitiative = (k.strategicInitiative || '').toLowerCase().includes(q);
      return matchName || matchCode || matchFormula || matchProject || matchMilestone || matchInitiative;
    }

    return true;
  });

  const handleExportCSV = () => {
    const headers = [
      'Strategic Pillar',
      'Strategic Objectives',
      'Strategic Performance Indicators (KPI)',
      'Indicator Calculation Formula',
      'Baseline Value',
      'Annual Target for 2026',
      'Annual Target for 2027',
      'Strategic Initiatives',
      'Key Milestones',
      'Key Projects',
      'Actual Measurement',
      'Achievement %',
    ];

    const rows = clientKpis.map((k) => [
      `"${k.pillarTitle || '02 People and Society'}"`,
      `"${k.objectiveTitle}"`,
      `"${k.code} ${k.name}"`,
      `"${(k.formula || '').replace(/"/g, '""')}"`,
      `"${k.baseline || '-'}"`,
      `"${k.target2026 || '-'}"`,
      `"${k.target2027 || '-'}"`,
      `"${(k.strategicInitiative || '').replace(/"/g, '""')}"`,
      `"${(k.keyMilestone || '').replace(/"/g, '""')}"`,
      `"${(k.keyProject || '').replace(/"/g, '""')}"`,
      `"${k.actual} ${k.unit}"`,
      `"${k.achievementPct}%"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Al-Ahsa_Strategy_Cascading_Matrix_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Al-Ahsa Strategy Cascading Matrix downloaded as CSV.');
  };

  return (
    <div className="space-y-5 animate-in fade-in">
      {/* Official Client Vision Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl border border-blue-900/60 shadow-xl overflow-hidden text-white relative">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="p-6 sm:p-7 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Official Strategic Framework
              </span>
              <span className="text-xs text-slate-400 font-mono">هيئة تطوير الأحساء</span>
            </div>

            <div className="flex items-baseline gap-3">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                Vision: A Leader in Sustainable Development in Al-Ahsa
              </h1>
            </div>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Cascaded strategic performance architecture aligning Pillar <strong>02 People and Society</strong> objectives with measurable indicators, formula definitions, multi-year targets (2026–2027), and flagship enablement projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() =>
                openModal('create_kpi', {
                  objectiveId: selectedObjectiveFilter === '2.2' ? 'so-2-2' : 'so-2-1',
                  objectiveTitle:
                    selectedObjectiveFilter === '2.2'
                      ? '2.2 Support Entities in Improving Quality of Life and Enhancing Services Provided to the Community'
                      : '2.1 Enhance Community Participation and Awareness of the Development Strategy',
                  pillarCode: '02',
                  pillarTitle: '02 People and Society',
                })
              }
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Quick Add KPI</span>
            </button>

            <Link
              to="/strategy/create"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Strategy Formulation</span>
            </Link>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-blue-300" />
              <span>Export Spreadsheet</span>
            </button>
          </div>
        </div>

        {/* Sub-strip with summary counters */}
        <div className="px-6 py-3 bg-slate-950/70 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 text-[10px] block uppercase">Strategic Pillar</span>
            <span className="font-bold text-white">02 People and Society</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block uppercase">Cascaded Objectives</span>
            <span className="font-bold text-emerald-400">2 Strategic Objectives</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block uppercase">Performance KPIs</span>
            <span className="font-bold text-blue-400">6 Key Indicators</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block uppercase">Flagship Projects</span>
            <span className="font-bold text-amber-300">5 Strategic Projects</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Objective Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by indicator, formula, project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
            />
          </div>

          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-500 hover:text-slate-900 font-mono px-2 py-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Objective Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold mr-1">Filter:</span>
          <button
            onClick={() => setSelectedObjectiveFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedObjectiveFilter === 'all'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Indicators ({clientKpis.length})
          </button>
          <button
            onClick={() => setSelectedObjectiveFilter('2.1')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedObjectiveFilter === '2.1'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Obj 2.1 Community Participation
          </button>
          <button
            onClick={() => setSelectedObjectiveFilter('2.2')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedObjectiveFilter === '2.2'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Obj 2.2 Quality of Life
          </button>
        </div>
      </div>

      {/* Main Cascading Table (matching client spreadsheet format) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-mono text-[11px] uppercase tracking-wider">
                <th className="p-3.5 border-b border-slate-800 font-semibold w-36">Strategic Pillar</th>
                <th className="p-3.5 border-b border-slate-800 font-semibold w-56">Strategic Objectives</th>
                <th className="p-3.5 border-b border-slate-800 font-semibold min-w-[200px]">Strategic Performance Indicators</th>
                <th className="p-3.5 border-b border-slate-800 font-semibold min-w-[220px]">Indicator Calculation Formula</th>
                <th className="p-3.5 border-b border-slate-800 font-semibold text-center w-24">Baseline</th>
                <th className="p-3.5 border-b border-slate-800 font-semibold text-center w-24 bg-blue-950/80">Target 2026</th>
                <th className="p-3.5 border-b border-slate-800 font-semibold text-center w-24 bg-blue-900/80">Target 2027</th>
                <th className="p-3.5 border-b border-slate-800 font-semibold min-w-[200px]">Strategic Initiatives</th>
                <th className="p-3.5 border-b border-slate-800 font-semibold min-w-[220px]">Key Milestones</th>
                <th className="p-3.5 border-b border-slate-800 font-semibold min-w-[180px]">Key Projects</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 text-slate-800">
              {clientKpis.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-slate-400 italic">
                    No strategic performance indicators found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                clientKpis.map((kpi, idx) => {
                  const parentObj = objectives.find((o) => o.id === kpi.objectiveId);

                  return (
                    <tr
                      key={kpi.id}
                      onClick={() => parentObj && openModal('objective', parentObj)}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    >
                      {/* Strategic Pillar */}
                      <td className="p-3.5 align-top font-mono font-bold text-blue-900 bg-slate-50/40">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                          <span>{kpi.pillarTitle || '02 People and Society'}</span>
                        </div>
                      </td>

                      {/* Strategic Objective */}
                      <td className="p-3.5 align-top">
                        <div className="font-semibold text-slate-900 leading-snug">
                          {kpi.objectiveTitle}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono">
                          Owner: {kpi.owner}
                        </div>
                      </td>

                      {/* Strategic Performance Indicator (KPI) */}
                      <td className="p-3.5 align-top">
                        <div className="flex items-start space-x-2">
                          <span className="font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 shrink-0">
                            {kpi.code}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                              {kpi.name}
                            </div>
                            {kpi.nameAr && (
                              <div className="text-[11px] text-slate-400 font-sans dir-rtl mt-0.5">
                                {kpi.nameAr}
                              </div>
                            )}
                            <div className="mt-1 flex items-center gap-1.5">
                              <StatusBadge status={kpi.status} />
                              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                Actual: <strong className="text-slate-800">{kpi.actual} {kpi.unit}</strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Indicator Calculation Formula */}
                      <td className="p-3.5 align-top">
                        <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 font-mono text-[11px] text-slate-700 leading-relaxed">
                          {kpi.formula || '—'}
                        </div>
                      </td>

                      {/* Baseline Value */}
                      <td className="p-3.5 align-top text-center font-mono font-semibold text-slate-600">
                        {kpi.baseline || '—'}
                      </td>

                      {/* Annual Target for 2026 */}
                      <td className="p-3.5 align-top text-center font-mono font-bold text-blue-900 bg-blue-50/30">
                        <span className="px-2 py-0.5 rounded bg-blue-100/60 border border-blue-200 text-blue-800">
                          {kpi.target2026 || '—'}
                        </span>
                      </td>

                      {/* Annual Target for 2027 */}
                      <td className="p-3.5 align-top text-center font-mono font-bold text-indigo-900 bg-indigo-50/30">
                        <span className="px-2 py-0.5 rounded bg-indigo-100/60 border border-indigo-200 text-indigo-800">
                          {kpi.target2027 || '—'}
                        </span>
                      </td>

                      {/* Strategic Initiatives */}
                      <td className="p-3.5 align-top">
                        <div className="text-xs text-slate-800 font-medium leading-relaxed">
                          {kpi.strategicInitiative || '—'}
                        </div>
                      </td>

                      {/* Key Milestones */}
                      <td className="p-3.5 align-top">
                        <div className="text-xs text-slate-600 leading-relaxed bg-amber-50/40 p-2 rounded-lg border border-amber-200/60">
                          <span className="text-[10px] font-mono font-bold uppercase text-amber-800 block mb-0.5">Milestone:</span>
                          {kpi.keyMilestone || '—'}
                        </div>
                      </td>

                      {/* Key Projects */}
                      <td className="p-3.5 align-top">
                        <div className="font-semibold text-xs text-slate-900 bg-emerald-50/40 p-2 rounded-lg border border-emerald-200/60">
                          <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 block mb-0.5">Project:</span>
                          {kpi.keyProject || '—'}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info strip */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-slate-700">Source:</span>
            <span>Al Ahsa Development Authority Strategic Performance Cascading Sheet (2026–2027)</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span>Showing {clientKpis.length} cascaded indicators</span>
            <span className="text-slate-300">•</span>
            <span className="text-blue-700 font-semibold">Click any row to open full objective OKR drawer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
