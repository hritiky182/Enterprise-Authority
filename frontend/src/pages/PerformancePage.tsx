import React, { useState } from 'react';
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
import { BarChart3, Filter, Calendar, Building, Target, TrendingUp, Upload } from 'lucide-react';
import { ImportKpiModal } from '../components/modals/ImportKpiModal';

export const PerformancePage: React.FC = () => {
  const { kpis, objectives, themes } = useApp();

  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedQuarter, setSelectedQuarter] = useState('Q3');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

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
        // filter loosely for mock demo
      }
    }
    return true;
  });

  const kpiColumns: Column<KPI>[] = [
    {
      header: 'Code',
      accessorKey: 'code',
      sortable: true,
      width: '100px',
      cell: (k) => <span className="font-mono font-bold text-slate-900">{k.code}</span>,
    },
    {
      header: 'Indicator Name',
      accessorKey: 'name',
      sortable: true,
      cell: (k) => (
        <div>
          <div className="font-semibold text-slate-900">{k.name}</div>
          <div className="text-[10px] text-slate-400 truncate max-w-xs">{k.objectiveTitle}</div>
        </div>
      ),
    },
    { header: 'Owner', accessorKey: 'owner', sortable: true },
    { header: 'Target', accessorKey: 'target', cell: (k) => <span className="font-mono">{k.target} {k.unit}</span> },
    { header: 'Actual', accessorKey: 'actual', cell: (k) => <span className="font-mono font-bold text-slate-900">{k.actual} {k.unit}</span> },
    {
      header: 'Achievement %',
      accessorKey: 'achievementPct',
      sortable: true,
      cell: (k) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {k.achievementPct}%
        </span>
      ),
    },
    { header: 'Status', accessorKey: 'status', cell: (k) => <StatusBadge status={k.status} /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title + Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>INSTITUTIONAL PERFORMANCE MONITORING</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Departmental & KPI Performance Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Filter performance data by fiscal year, quarter, enterprise department, and strategic theme.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group shrink-0"
          >
            <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Import KPI Data</span>
          </button>
        </div>

        {/* Global Filter Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">Year:</span>
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
            <span className="font-semibold text-slate-700">Period:</span>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="bg-transparent font-mono font-bold text-slate-900 focus:outline-none"
            >
              <option value="Q1">Q1 (Jan-Mar)</option>
              <option value="Q2">Q2 (Apr-Jun)</option>
              <option value="Q3">Q3 (Jul-Sep)</option>
              <option value="Q4">Q4 (Oct-Dec)</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">Department:</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent font-semibold text-slate-900 focus:outline-none"
            >
              <option value="all">All Departments (6)</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.code} - {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <Target className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">Theme:</span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="bg-transparent font-semibold text-slate-900 focus:outline-none"
            >
              <option value="all">All Themes ({themes.length})</option>
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code} - {t.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Department Scores Comparison Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="panel-title text-slate-900 mb-1">Department Performance vs Targets</h3>
          <p className="text-xs text-slate-500 mb-4">{selectedYear} {selectedQuarter} Actual Score vs KPI Benchmark Target</p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="department" tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Legend />
                <Bar dataKey="score" name="Actual Score %" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Benchmark Target %" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <h3 className="panel-title text-slate-900 mb-1">YTD Monthly Performance Trend</h3>
          <p className="text-xs text-slate-500 mb-4">Multi-domain scoring trajectory Jan - Aug 2026</p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PERFORMANCE_MONTHLY_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Legend />
                <Line type="monotone" dataKey="strategy" name="Strategy" stroke="#10b981" strokeWidth={2.5} />
                <Line type="monotone" dataKey="risk" name="Risk Mitigation" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="compliance" name="Compliance" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="bcm" name="BCM Readiness" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPI Performance Table */}
      <DataTable
        title="Key Performance Indicator (KPI) Detailed Scorecard"
        subtitle="Individual metric target achievements across all enterprise operational programs"
        data={filteredKpis}
        columns={kpiColumns}
      />

      {/* Import KPI Modal */}
      <ImportKpiModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  );
};
