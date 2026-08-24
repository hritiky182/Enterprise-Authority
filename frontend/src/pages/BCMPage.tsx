import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BCM_EXERCISES } from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { BCMProcess, BCMPlan, BCMExercise } from '../types';
import { Activity, ShieldCheck, Clock, Zap, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const BCMPage: React.FC = () => {
  const { bcmProcesses, bcmPlans } = useApp();
  const [activeTab, setActiveTab] = useState<'bia' | 'plans' | 'exercises'>('bia');

  const biaColumns: Column<BCMProcess>[] = [
    { header: 'Process ID', accessorKey: 'code', sortable: true, cell: (p) => <span className="font-mono font-bold text-slate-900">{p.code}</span> },
    {
      header: 'Business Process Name',
      accessorKey: 'processName',
      sortable: true,
      cell: (p) => (
        <div>
          <div className="font-semibold text-slate-900">{p.processName}</div>
          <div className="text-[10px] text-slate-400 font-mono">{p.department}</div>
        </div>
      ),
    },
    { header: 'Criticality', accessorKey: 'criticality', sortable: true, cell: (p) => <StatusBadge status={p.criticality} variant="criticality" /> },
    { header: 'MTD', accessorKey: 'mtdHours', sortable: true, cell: (p) => <span className="font-mono text-rose-700 font-bold">{p.mtdHours} hrs</span> },
    { header: 'RTO', accessorKey: 'rtoHours', sortable: true, cell: (p) => <span className="font-mono text-amber-700 font-bold">{p.rtoHours} hrs</span> },
    { header: 'RPO', accessorKey: 'rpoHours', sortable: true, cell: (p) => <span className="font-mono text-emerald-700 font-bold">{p.rpoHours} hrs</span> },
    {
      header: 'Dependencies',
      accessorKey: 'dependencies',
      cell: (p) => (
        <div className="flex flex-wrap gap-1">
          {p.dependencies.map((d, i) => (
            <span key={i} className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">
              {d}
            </span>
          ))}
        </div>
      ),
    },
    { header: 'Readiness', accessorKey: 'readinessPct', sortable: true, cell: (p) => <span className="font-mono font-bold text-emerald-700">{p.readinessPct}%</span> },
    { header: 'Status', accessorKey: 'status', cell: (p) => <StatusBadge status={p.status} /> },
  ];

  const planColumns: Column<BCMPlan>[] = [
    { header: 'Plan ID', accessorKey: 'code', sortable: true, cell: (p) => <span className="font-mono font-bold text-slate-900">{p.code}</span> },
    { header: 'Continuity Plan Title', accessorKey: 'title', sortable: true, cell: (p) => <span className="font-semibold text-slate-900">{p.title}</span> },
    { header: 'Target Process', accessorKey: 'processName', cell: (p) => <span className="text-slate-700">{p.processName}</span> },
    { header: 'Version', accessorKey: 'version', cell: (p) => <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">{p.version}</span> },
    { header: 'Last Tested', accessorKey: 'lastTestedDate', cell: (p) => <span className="font-mono text-slate-600">{p.lastTestedDate}</span> },
    { header: 'Test Result', accessorKey: 'testResult', cell: (p) => <StatusBadge status={p.testResult} /> },
    { header: 'Status', accessorKey: 'status', cell: (p) => <StatusBadge status={p.status} /> },
  ];

  const exerciseColumns: Column<BCMExercise>[] = [
    { header: 'Exercise Code', accessorKey: 'code', sortable: true, cell: (e) => <span className="font-mono font-bold text-slate-900">{e.code}</span> },
    { header: 'Exercise Title', accessorKey: 'title', sortable: true, cell: (e) => <span className="font-semibold text-slate-900">{e.title}</span> },
    { header: 'Type', accessorKey: 'type', cell: (e) => <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{e.type}</span> },
    { header: 'Date Held', accessorKey: 'date', cell: (e) => <span className="font-mono text-slate-600">{e.date}</span> },
    { header: 'Participants', accessorKey: 'participantsCount', cell: (e) => <span className="font-mono">{e.participantsCount} Cadres</span> },
    { header: 'Result', accessorKey: 'result', cell: (e) => <StatusBadge status={e.result} /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-600 mb-1">
            <Activity className="w-4 h-4" />
            <span>BUSINESS CONTINUITY MANAGEMENT (ISO 22301)</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            BCM & Emergency Operational Resilience
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Business Impact Analysis (BIA), Recovery Time Objectives (RTO/RPO), and Disaster Simulation Exercises.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('bia')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'bia' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            BIA Matrix ({bcmProcesses.length})
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'plans' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            Continuity Plans ({bcmPlans.length})
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'exercises' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            Exercises & Drills ({BCM_EXERCISES.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="BCM Overall Readiness" value="93.5%" subtext="ISO 22301 Standard" badgeText="High Readiness" badgeColor="emerald" />
        <StatCard title="Tier-1 Mission Critical" value={bcmProcesses.filter((p) => p.criticality.includes('Tier 1')).length} subtext="Hotline & Storm Dam Controls" badgeText="Tier 1" badgeColor="rose" />
        <StatCard title="Tested BCM Plans" value={bcmPlans.filter((p) => p.testResult === 'Passed').length} subtext="Validated in Q2 Simulation" badgeText="Passed" badgeColor="emerald" />
        <StatCard title="Target RTO Compliance" value="97.2%" subtext="Max 2 hr Hotline Failover" badgeText="On Track" badgeColor="emerald" />
      </div>

      {activeTab === 'bia' && <DataTable title="Business Impact Analysis (BIA) Master Matrix" subtitle="MTD, RTO, RPO metrics and operational dependencies" data={bcmProcesses} columns={biaColumns} />}
      {activeTab === 'plans' && <DataTable title="Business Continuity Plans (BCP)" subtitle="Approved emergency procedures and failover manuals" data={bcmPlans} columns={planColumns} />}
      {activeTab === 'exercises' && <DataTable title="Disaster Exercises & Simulation Drills" subtitle="Full scale storm surge and cyber tabletop testing logs" data={BCM_EXERCISES} columns={exerciseColumns} />}
    </div>
  );
};
