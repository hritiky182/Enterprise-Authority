import React from 'react';
import { useApp } from '../context/AppContext';
import { OperationalStructureView } from '../components/organization/OperationalStructureView';
import { Network } from 'lucide-react';

export const OrgStructurePage: React.FC = () => {
  const { lang, t } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
            <Network className="w-4 h-4" />
            <span>{t('AL AHSA DEVELOPMENT AUTHORITY • ORGANIZATIONAL HIERARCHY')}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'الهيكل التنظيمي والقطاعات التشغيلية' : 'Authority Operational Structure & Sectors'}
          </h1>
        </div>
      </div>

      {/* Main Operational Structure View */}
      <OperationalStructureView />
    </div>
  );
};
