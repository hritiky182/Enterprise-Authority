import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPLIANCE_FRAMEWORKS, COMPLIANCE_REQUIREMENTS, COMPLIANCE_FINDINGS } from '../data/mockData';
import { StatCard } from '../components/common/StatCard';
import { DataTable, Column } from '../components/common/DataTable';
import { StatusBadge } from '../components/common/StatusBadge';
import { ComplianceFramework, ComplianceRequirement, ComplianceFinding } from '../types';
import { CheckCircle2, ShieldCheck, AlertCircle, FileCheck, Layers } from 'lucide-react';

export const CompliancePage: React.FC = () => {
  const { lang, t } = useApp();
  const [activeTab, setActiveTab] = useState<'frameworks' | 'requirements' | 'findings'>('frameworks');

  const frameworkColumns: Column<ComplianceFramework>[] = [
    { header: t('Framework ID'), accessorKey: 'code', sortable: true, cell: (f) => <span className="font-mono font-bold text-slate-900">{f.code}</span> },
    {
      header: t('Framework Standard Name'),
      accessorKey: 'name',
      sortable: true,
      cell: (f) => (
        <div>
          <div className="font-semibold text-slate-900">{f.name}</div>
          <div className="text-[10px] text-slate-400 font-mono">{t(f.category)} (v{f.version})</div>
        </div>
      ),
    },
    { header: t('Total Controls'), accessorKey: 'totalRequirements', cell: (f) => <span className="font-mono">{f.totalRequirements} {lang === 'ar' ? 'ضوابط' : 'Controls'}</span> },
    { header: t('Compliant'), accessorKey: 'compliantCount', cell: (f) => <span className="font-mono font-bold text-emerald-700">{f.compliantCount}</span> },
    { header: t('Partial'), accessorKey: 'partialCount', cell: (f) => <span className="font-mono text-amber-700">{f.partialCount}</span> },
    {
      header: t('Overall Score'),
      accessorKey: 'scorePct',
      sortable: true,
      cell: (f) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          {f.scorePct}%
        </span>
      ),
    },
  ];

  const reqColumns: Column<ComplianceRequirement>[] = [
    { header: t('Requirement ID'), accessorKey: 'code', sortable: true, cell: (r) => <span className="font-mono font-bold text-slate-900">{r.code}</span> },
    { header: t('Framework'), accessorKey: 'frameworkName', sortable: true, cell: (r) => <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{r.frameworkName}</span> },
    {
      header: t('Title & Description'),
      accessorKey: 'title',
      sortable: true,
      cell: (r) => (
        <div>
          <div className="font-semibold text-slate-900">{r.title}</div>
          <div className="text-[10px] text-slate-500">{r.description}</div>
        </div>
      ),
    },
    { header: t('Owner'), accessorKey: 'owner', sortable: true, cell: (r) => <span>{t(r.owner)}</span> },
    { header: t('Status'), accessorKey: 'status', cell: (r) => <StatusBadge status={r.status} /> },
  ];

  const findingColumns: Column<ComplianceFinding>[] = [
    { header: t('Finding Code'), accessorKey: 'code', sortable: true, cell: (f) => <span className="font-mono font-bold text-slate-900">{f.code}</span> },
    { header: t('Framework'), accessorKey: 'frameworkName', cell: (f) => <span className="font-mono text-xs text-slate-600">{f.frameworkName}</span> },
    {
      header: t('Audit Finding & Recommendation'),
      accessorKey: 'title',
      sortable: true,
      cell: (f) => (
        <div>
          <div className="font-semibold text-slate-900">{f.title}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{lang === 'ar' ? 'التوصية:' : 'Rec:'} {f.recommendation}</div>
        </div>
      ),
    },
    { header: t('Severity'), accessorKey: 'severity', cell: (f) => <StatusBadge status={f.severity} variant="risk" /> },
    { header: t('Audit Date'), accessorKey: 'auditDate', cell: (f) => <span className="font-mono text-slate-600">{f.auditDate}</span> },
    { header: t('Status'), accessorKey: 'status', cell: (f) => <StatusBadge status={f.status} /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('REGULATORY & COMPLIANCE FRAMEWORKS')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {t('Compliance Management & Audit Findings')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('ISO 27001, ISO 22301, ISO 31000, NCA ECC and NIST CSF regulatory control matrices.')}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('frameworks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${activeTab === 'frameworks' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            {t('Frameworks')} ({COMPLIANCE_FRAMEWORKS.length})
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${activeTab === 'requirements' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            {t('Requirements')}
          </button>
          <button
            onClick={() => setActiveTab('findings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${activeTab === 'findings' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
          >
            {t('Audit Findings')} ({COMPLIANCE_FINDINGS.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Average Compliance Rate" value="94.5%" subtext={lang === 'ar' ? 'عبر 5 أطر عمل معيارية' : 'Across 5 Standard Frameworks'} badgeText={lang === 'ar' ? 'ممتثل' : 'Compliant'} badgeColor="emerald" />
        <StatCard title="Total Audited Requirements" value={lang === 'ar' ? '423 ضابطاً' : '423 Controls'} subtext={lang === 'ar' ? '395 مستوفاة بالكامل' : '395 Fully Satisfied'} badgeText={lang === 'ar' ? 'مدقق' : 'Audited'} badgeColor="blue" />
        <StatCard title="Open Audit Findings" value={COMPLIANCE_FINDINGS.filter((f) => f.status !== 'Closed').length} subtext={lang === 'ar' ? '1 عالية الأهمية' : '1 High Severity'} badgeText={lang === 'ar' ? 'قيد المعالجة' : 'In Progress'} badgeColor="amber" />
        <StatCard title="External Audit Readiness" value={lang === 'ar' ? 'الفئة (أ)' : 'Grade A'} badgeText={lang === 'ar' ? 'معتمد' : 'Certified'} badgeColor="emerald" />
      </div>

      {/* Framework Cards Grid */}
      {activeTab === 'frameworks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMPLIANCE_FRAMEWORKS.map((fw) => (
              <div key={fw.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {fw.code}
                  </span>
                  <span className="font-mono font-bold text-base text-slate-900">{fw.scorePct}%</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900">{fw.name}</h3>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full" style={{ width: `${fw.scorePct}%` }} />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-1">
                  <span>{fw.compliantCount} / {fw.totalRequirements} {lang === 'ar' ? 'ضوابط' : 'Controls'}</span>
                  <span>{fw.partialCount} {lang === 'ar' ? 'جزئي' : 'Partial'}</span>
                </div>
              </div>
            ))}
          </div>

          <DataTable
            title={t('Regulatory Compliance Frameworks')}
            subtitle={lang === 'ar' ? 'تفصيل الضوابط حسب المعايير والأنظمة الرقابية' : 'Detailed control break-down by regulatory standards'}
            data={COMPLIANCE_FRAMEWORKS}
            columns={frameworkColumns}
          />
        </div>
      )}

      {activeTab === 'requirements' && (
        <DataTable
          title={t('Central Regulatory Requirements & Controls')}
          subtitle={lang === 'ar' ? 'ربط الضوابط ومسؤوليات الملاك المعنيين' : 'Control mappings and owner responsibility'}
          data={COMPLIANCE_REQUIREMENTS}
          columns={reqColumns}
        />
      )}
      {activeTab === 'findings' && (
        <DataTable
          title={t('Audit Findings & Remediation Tracker')}
          subtitle={lang === 'ar' ? 'توصيات التدقيق وروابط إجراءات المعالجة التصحيحية' : 'Audit recommendations and remediation action links'}
          data={COMPLIANCE_FINDINGS}
          columns={findingColumns}
        />
      )}
    </div>
  );
};
