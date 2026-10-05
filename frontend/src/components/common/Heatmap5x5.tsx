import React, { useState } from 'react';
import { RiskItem } from '../../types';
import { LayoutGrid, BarChart2, ShieldAlert, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Heatmap5x5Props {
  risks: RiskItem[];
  onSelectCell?: (likelihood: number, impact: number) => void;
  selectedCell?: { likelihood: number; impact: number } | null;
}

export const Heatmap5x5: React.FC<Heatmap5x5Props> = ({
  risks,
  onSelectCell,
  selectedCell,
}) => {
  const { lang, t } = useApp();
  const [viewMode, setViewMode] = useState<'matrix' | 'distribution'>('matrix');

  const likelihoodLabels = [
    { level: 5, label: lang === 'ar' ? '5 - مؤكد تقريباً' : '5 - Almost Certain' },
    { level: 4, label: lang === 'ar' ? '4 - محتمل جداً' : '4 - Likely' },
    { level: 3, label: lang === 'ar' ? '3 - ممكن' : '3 - Possible' },
    { level: 2, label: lang === 'ar' ? '2 - غير مرجح' : '2 - Unlikely' },
    { level: 1, label: lang === 'ar' ? '1 - نادر' : '1 - Rare' },
  ];

  const impactLabels = [
    { level: 1, label: lang === 'ar' ? '1 - طفيف' : '1 - Minor' },
    { level: 2, label: lang === 'ar' ? '2 - متوسط' : '2 - Moderate' },
    { level: 3, label: lang === 'ar' ? '3 - ملحوظ' : '3 - Serious' },
    { level: 4, label: lang === 'ar' ? '4 - كبير' : '4 - Major' },
    { level: 5, label: lang === 'ar' ? '5 - حرج' : '5 - Critical' },
  ];

  const getCellScore = (l: number, i: number) => l * i;

  const getRisksInCell = (l: number, i: number) => {
    return risks.filter((r) => r.likelihood === l && r.impact === i);
  };

  // Modern sleek color palette for matrix cells (Subtle & Executive)
  const getCellStyles = (l: number, i: number, hasRisks: boolean) => {
    const score = getCellScore(l, i);
    const isSelected =
      selectedCell?.likelihood === l && selectedCell?.impact === i;

    let baseBg = '';
    let textColor = 'text-slate-600';
    let borderColor = 'border-slate-200/60';
    let badgeBg = '';

    if (score >= 16) {
      // Critical (16-25)
      baseBg = hasRisks
        ? 'bg-rose-100/90 border-rose-300/80 shadow-xs'
        : 'bg-rose-50/40 hover:bg-rose-50/80';
      textColor = 'text-rose-950';
      badgeBg = 'bg-rose-600 text-white';
    } else if (score >= 10) {
      // High (10-15)
      baseBg = hasRisks
        ? 'bg-amber-100/90 border-amber-300/80 shadow-xs'
        : 'bg-amber-50/40 hover:bg-amber-50/80';
      textColor = 'text-amber-950';
      badgeBg = 'bg-amber-600 text-white';
    } else if (score >= 5) {
      // Moderate (5-9)
      baseBg = hasRisks
        ? 'bg-yellow-100/90 border-yellow-300/80 shadow-xs'
        : 'bg-yellow-50/30 hover:bg-yellow-50/70';
      textColor = 'text-yellow-950';
      badgeBg = 'bg-yellow-600 text-white';
    } else {
      // Low (1-4)
      baseBg = hasRisks
        ? 'bg-slate-100 border-slate-300 shadow-xs'
        : 'bg-slate-50/40 hover:bg-slate-100/50';
      textColor = 'text-slate-700';
      badgeBg = 'bg-slate-700 text-white';
    }

    if (isSelected) {
      borderColor = 'border-slate-900 ring-2 ring-slate-900/80 ring-offset-1 z-10';
    }

    return { baseBg, textColor, borderColor, badgeBg, score };
  };

  // Calculated Distribution Summary for Bar View
  const criticalRisks = risks.filter((r) => r.inherentScore >= 16);
  const highRisks = risks.filter((r) => r.inherentScore >= 10 && r.inherentScore < 16);
  const moderateRisks = risks.filter((r) => r.inherentScore >= 5 && r.inherentScore < 10);
  const lowRisks = risks.filter((r) => r.inherentScore < 5);
  const totalRisks = risks.length || 1;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      {/* Header with Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="panel-title text-slate-900 font-bold text-base">
              {t('5×5 Enterprise Risk Matrix & Heatmap')}
            </h3>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              {t('ISO 31000 Standard')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t('Real-time evaluation of likelihood vs consequence exposures across institutional domains.')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle Button */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t('Matrix View')}</span>
            </button>
            <button
              onClick={() => setViewMode('distribution')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'distribution'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>{t('Severity Breakdown')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center space-x-4">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
            {t('Risk Tier Legend:')}
          </span>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
            <span className="text-slate-600 font-medium">{t('Low (1-4)')}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
            <span className="text-slate-600 font-medium">{t('Moderate (5-9)')}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="text-slate-600 font-medium">{t('High (10-15)')}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
            <span className="text-slate-600 font-medium">{t('Critical (16-25)')}</span>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          {t('Click any cell to filter the register')}
        </span>
      </div>

      {/* VIEW 1: 5x5 MATRIX */}
      {viewMode === 'matrix' && (
        <div className="relative overflow-x-auto pt-2">
          <div className="min-w-[620px]">
            {/* Impact Axis Label */}
            <div className="text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 pl-36">
              {lang === 'ar' ? 'الأثر (مستوى العواقب) ←' : 'Impact (Consequence Level) →'}
            </div>

            <div className="grid grid-cols-6 gap-2">
              {/* Top-left Axis Header */}
              <div className="p-2 text-[11px] font-mono font-bold text-slate-400 flex items-end justify-end pr-3">
                {lang === 'ar' ? 'الاحتمالية ↓' : 'Likelihood ↓'}
              </div>

              {/* Impact Header Cards */}
              {impactLabels.map((imp) => (
                <div
                  key={imp.level}
                  className="py-2 px-1 text-center text-xs font-semibold text-slate-700 bg-slate-50/80 rounded-xl border border-slate-200/70 shadow-2xs font-mono"
                >
                  {imp.label}
                </div>
              ))}

              {/* 5 Likelihood Rows */}
              {likelihoodLabels.map((lh) => (
                <React.Fragment key={lh.level}>
                  {/* Row Header */}
                  <div className="py-2 px-2 text-xs font-semibold text-slate-700 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-center justify-end text-right pr-3 font-mono">
                    {lh.label}
                  </div>

                  {/* 5 Impact Cells */}
                  {impactLabels.map((imp) => {
                    const cellRisks = getRisksInCell(lh.level, imp.level);
                    const hasRisks = cellRisks.length > 0;
                    const { baseBg, textColor, borderColor, badgeBg, score } = getCellStyles(
                      lh.level,
                      imp.level,
                      hasRisks
                    );

                    return (
                      <button
                        key={`${lh.level}-${imp.level}`}
                        onClick={() => onSelectCell && onSelectCell(lh.level, imp.level)}
                        className={`h-20 rounded-xl border ${borderColor} ${baseBg} transition-all duration-200 p-2.5 flex flex-col justify-between text-left cursor-pointer group relative overflow-hidden`}
                      >
                        {/* Cell Top Row: Score Pill & Count Badge */}
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600 transition-colors">
                            {score}
                          </span>

                          {hasRisks && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${badgeBg} shadow-xs animate-in zoom-in-75`}
                            >
                              {cellRisks.length}{' '}
                              {cellRisks.length === 1
                                ? lang === 'ar' ? 'خطر' : 'Risk'
                                : lang === 'ar' ? 'مخاطر' : 'Risks'}
                            </span>
                          )}
                        </div>

                        {/* Cell Content: Risk Code Tags */}
                        {hasRisks ? (
                          <div className="space-y-1">
                            <div
                              className={`text-xs font-mono font-bold truncate ${textColor} bg-white/70 px-1.5 py-0.5 rounded border border-black/5 shadow-2xs`}
                            >
                              {cellRisks[0]?.code}
                            </div>
                            {cellRisks.length > 1 && (
                              <div className="text-[10px] font-mono font-medium text-slate-500">
                                +{cellRisks.length - 1} {lang === 'ar' ? 'إضافي' : 'more item'}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                            {lang === 'ar' ? 'لا توجد مخاطر' : 'No risks'}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: EXECUTIVE SEVERITY BREAKDOWN */}
      {viewMode === 'distribution' && (
        <div className="space-y-6 pt-2">
          {/* Consolidated Progress Exposure Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="font-bold text-slate-700">Enterprise Risk Portfolio Exposure Distribution</span>
              <span className="text-slate-500">Total Registered: {risks.length} Risks</span>
            </div>

            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${(criticalRisks.length / totalRisks) * 100}%` }}
                className="bg-rose-600 h-full transition-all duration-500"
                title={`Critical: ${criticalRisks.length}`}
              />
              <div
                style={{ width: `${(highRisks.length / totalRisks) * 100}%` }}
                className="bg-amber-500 h-full transition-all duration-500"
                title={`High: ${highRisks.length}`}
              />
              <div
                style={{ width: `${(moderateRisks.length / totalRisks) * 100}%` }}
                className="bg-yellow-400 h-full transition-all duration-500"
                title={`Moderate: ${moderateRisks.length}`}
              />
              <div
                style={{ width: `${(lowRisks.length / totalRisks) * 100}%` }}
                className="bg-slate-400 h-full transition-all duration-500"
                title={`Low: ${lowRisks.length}`}
              />
            </div>
          </div>

          {/* 4 Cards Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Critical */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-900">Critical Exposure</span>
                <ShieldAlert className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-mono font-extrabold text-rose-700">
                {criticalRisks.length}{' '}
                <span className="text-xs font-normal text-slate-500">
                  ({Math.round((criticalRisks.length / totalRisks) * 100)}%)
                </span>
              </div>
              <p className="text-[11px] text-slate-600">Requires immediate leadership oversight & daily mitigation.</p>
            </div>

            {/* High */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900">High Risk Exposure</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-mono font-extrabold text-amber-700">
                {highRisks.length}{' '}
                <span className="text-xs font-normal text-slate-500">
                  ({Math.round((highRisks.length / totalRisks) * 100)}%)
                </span>
              </div>
              <p className="text-[11px] text-slate-600">Mitigation plans assigned with target milestone deadlines.</p>
            </div>

            {/* Moderate */}
            <div className="p-4 rounded-xl border border-yellow-200 bg-yellow-50/40 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-yellow-900">Moderate Risk</span>
                <Info className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-2xl font-mono font-extrabold text-yellow-700">
                {moderateRisks.length}{' '}
                <span className="text-xs font-normal text-slate-500">
                  ({Math.round((moderateRisks.length / totalRisks) * 100)}%)
                </span>
              </div>
              <p className="text-[11px] text-slate-600">Monitored periodically by department risk coordinators.</p>
            </div>

            {/* Low */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Low Exposure</span>
                <ShieldCheck className="w-4 h-4 text-slate-600" />
              </div>
              <div className="text-2xl font-mono font-extrabold text-slate-700">
                {lowRisks.length}{' '}
                <span className="text-xs font-normal text-slate-500">
                  ({Math.round((lowRisks.length / totalRisks) * 100)}%)
                </span>
              </div>
              <p className="text-[11px] text-slate-600">Acceptable inherent levels under standard controls.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
