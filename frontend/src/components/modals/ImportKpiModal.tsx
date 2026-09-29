import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Upload,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  Download,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface ImportKpiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface KpiUpdateRow {
  code: string;
  name?: string | undefined;
  currentActual?: number | undefined;
  newActual: number;
  target?: number | undefined;
  unit?: string | undefined;
  notes?: string | undefined;
}

const SAMPLE_CSV = `KPICode,ActualValue,Notes
KPI-01,95.5,Q3 Audit automated verification completed
KPI-02,94.0,NCA CSCC-1:2023 compliance milestone met
KPI-03,88.0,High-risk vendor assessment pipeline completed
KPI-04,96.2,BCM operational failover test successful
KPI-05,92.5,Q3 SDO strategic initiative milestone verified`;

export const ImportKpiModal: React.FC<ImportKpiModalProps> = ({ isOpen, onClose }) => {
  const { kpis, importKpiActuals } = useApp();

  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'preset'>('upload');
  const [pasteContent, setPasteContent] = useState('');
  const [parsedRows, setParsedRows] = useState<KpiUpdateRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const parseKpiCSV = (csvText: string): KpiUpdateRow[] => {
    const lines = csvText
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const headerLine = lines[0];
    if (!headerLine || lines.length < 2) {
      throw new Error('CSV must contain a header row and at least one KPI measurement row.');
    }

    const headers = headerLine.split(',').map((h) => h.trim().toLowerCase());
    const codeIdx = headers.findIndex((h) => h.includes('code') || h === 'kpi');
    const actualIdx = headers.findIndex((h) => h.includes('actual') || h.includes('value'));
    const notesIdx = headers.findIndex((h) => h.includes('note') || h.includes('comment'));

    if (codeIdx === -1 || actualIdx === -1) {
      throw new Error('CSV must contain "KPICode" and "ActualValue" columns.');
    }

    const rows: KpiUpdateRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const values = line.split(',').map((v) => v.replace(/^"|"$/g, '').trim());
      const rawCode = values[codeIdx] || '';
      const rawActual = Number(values[actualIdx]);

      if (rawCode && !isNaN(rawActual)) {
        const matchedKpi = kpis.find((k) => k.code.toLowerCase() === rawCode.toLowerCase());
        rows.push({
          code: rawCode,
          name: matchedKpi?.name || 'Unmatched KPI',
          currentActual: matchedKpi?.actual,
          newActual: rawActual,
          target: matchedKpi?.target,
          unit: matchedKpi?.unit || '%',
          notes: notesIdx !== -1 ? values[notesIdx] : undefined,
        });
      }
    }

    if (rows.length === 0) {
      throw new Error('No valid KPI code and numeric actual values found.');
    }

    return rows;
  };

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    setParseError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (file.name.endsWith('.json')) {
          const raw = JSON.parse(content);
          const list = Array.isArray(raw) ? raw : raw.kpis || [];
          const rows: KpiUpdateRow[] = list.map((item: any) => {
            const code = item.code || item.KPICode || '';
            const newActual = Number(item.actual || item.ActualValue || 0);
            const matchedKpi = kpis.find((k) => k.code.toLowerCase() === code.toLowerCase());
            return {
              code,
              name: matchedKpi?.name,
              currentActual: matchedKpi?.actual,
              newActual,
              target: matchedKpi?.target,
              unit: matchedKpi?.unit,
              notes: item.notes,
            };
          });
          setParsedRows(rows);
        } else {
          const rows = parseKpiCSV(content);
          setParsedRows(rows);
        }
      } catch (err: any) {
        setParseError(err.message || 'Failed to parse file.');
        setParsedRows([]);
      }
    };
    reader.readAsText(file);
  };

  const handleApplyPreset = () => {
    // Generate realistic Q3 performance actuals based on existing KPIs
    const updates: KpiUpdateRow[] = kpis.map((k) => {
      // 90% to 105% of target
      const variation = 0.9 + Math.random() * 0.15;
      const newActual = Math.round(k.target * variation * 10) / 10;
      return {
        code: k.code,
        name: k.name,
        currentActual: k.actual,
        newActual,
        target: k.target,
        unit: k.unit,
        notes: 'Q3 Enterprise Consolidated Departmental Measurement',
      };
    });
    setParsedRows(updates);
    setFileName('Demo Preset: Q3 Enterprise Actuals');
    setParseError(null);
  };

  const handleApplyPaste = () => {
    setParseError(null);
    try {
      if (pasteContent.trim().startsWith('{') || pasteContent.trim().startsWith('[')) {
        const raw = JSON.parse(pasteContent);
        const list = Array.isArray(raw) ? raw : raw.kpis || [];
        const rows: KpiUpdateRow[] = list.map((item: any) => {
          const code = item.code || item.KPICode || '';
          const newActual = Number(item.actual || item.ActualValue || 0);
          const matchedKpi = kpis.find((k) => k.code.toLowerCase() === code.toLowerCase());
          return {
            code,
            name: matchedKpi?.name,
            currentActual: matchedKpi?.actual,
            newActual,
            target: matchedKpi?.target,
            unit: matchedKpi?.unit,
            notes: item.notes,
          };
        });
        setParsedRows(rows);
      } else {
        const rows = parseKpiCSV(pasteContent);
        setParsedRows(rows);
      }
    } catch (err: any) {
      setParseError(err.message || 'Failed to parse pasted data.');
      setParsedRows([]);
    }
  };

  const handleCommitImport = () => {
    if (parsedRows.length === 0) return;
    const updates = parsedRows.map((r) => ({
      code: r.code,
      actual: r.newActual,
    }));
    importKpiActuals(updates);
    onClose();
  };

  const downloadSampleTemplate = () => {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kpi_performance_measurements_template.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Sample KPI CSV Template Downloaded');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden my-8 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 to-blue-950 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold">Import KPI Performance Data</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/30 border border-blue-400/30 text-blue-200 uppercase">
                  Bulk Readings
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Upload departmental actual measurements to update performance scorecards.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ingestion Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-2.5">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeTab === 'upload' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>File Upload (CSV/JSON)</span>
            </button>
            <button
              onClick={() => setActiveTab('paste')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeTab === 'paste' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Paste Text</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('preset');
                handleApplyPreset();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeTab === 'preset' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Demo Q3 Preset</span>
            </button>
          </div>

          <button
            onClick={downloadSampleTemplate}
            className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV Template</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'upload' && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileUpload(file);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
                  : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <div className="font-semibold text-sm text-slate-800">
                {fileName ? fileName : 'Choose a CSV / JSON file or drag it here'}
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                File must contain <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">KPICode</code> and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">ActualValue</code>.
              </p>
            </div>
          )}

          {activeTab === 'paste' && (
            <div className="space-y-3">
              <textarea
                value={pasteContent}
                onChange={(e) => setPasteContent(e.target.value)}
                placeholder={`Paste CSV content here...\n\nExample:\nKPICode,ActualValue,Notes\nKPI-01,95.5,Verified in audit\nKPI-02,94.0,NCA CSCC verified`}
                rows={6}
                className="w-full p-3 font-mono text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleApplyPaste}
                disabled={!pasteContent.trim()}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors cursor-pointer"
              >
                Parse Pasted KPI Data
              </button>
            </div>
          )}

          {activeTab === 'preset' && (
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
              <div>
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Q3 Performance Scorecard Measurements Generated
                </div>
                <div className="text-[11px] text-blue-700 mt-0.5">
                  Pre-populated verified measurement values for all active institutional indicators.
                </div>
              </div>
              <button
                type="button"
                onClick={handleApplyPreset}
                className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-50"
              >
                Regenerate Values
              </button>
            </div>
          )}

          {parseError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Parsed Preview Table */}
          {parsedRows.length > 0 && (
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Parsed Measurements Preview ({parsedRows.length} Indicators)
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Ready to Apply
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-52 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase sticky top-0">
                    <tr>
                      <th className="p-2.5">KPI Code</th>
                      <th className="p-2.5">Indicator Name</th>
                      <th className="p-2.5">Target</th>
                      <th className="p-2.5">Current</th>
                      <th className="p-2.5">New Actual</th>
                      <th className="p-2.5">Est. Achv %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {parsedRows.map((r, i) => {
                      const estAchv = r.target && r.target > 0 ? Math.min(100, Math.round((r.newActual / r.target) * 100)) : 100;
                      return (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2.5 font-bold text-slate-900">{r.code}</td>
                          <td className="p-2.5 font-sans truncate max-w-xs text-slate-700">{r.name}</td>
                          <td className="p-2.5 text-slate-500">{r.target ? `${r.target} ${r.unit}` : '-'}</td>
                          <td className="p-2.5 text-slate-400">{r.currentActual ? `${r.currentActual} ${r.unit}` : '-'}</td>
                          <td className="p-2.5 font-bold text-blue-700">{r.newActual} {r.unit}</td>
                          <td className="p-2.5">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              estAchv >= 90 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {estAchv}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCommitImport}
            disabled={parsedRows.length === 0}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply {parsedRows.length} KPI Measurements</span>
          </button>
        </div>
      </div>
    </div>
  );
};
