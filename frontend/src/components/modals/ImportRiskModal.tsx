import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { RiskItem } from '../../types';
import {
  Upload,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  Download,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';

interface ImportRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_RISK_CSV = `RiskCode,Title,Category,Department,Likelihood,Impact,Owner,Treatment
RSK-IMP-01,Supply Chain Geopolitical & Single-Source Disruption,Operational Risk,Corporate Operations & Logistics,4,4,Eng. Tariq Al-Mansoor,Mitigate
RSK-IMP-02,Cloud Data Residency & Cross-Border Sovereign Compliance,Compliance Risk,Legal & Enterprise Governance,3,5,Dr. Reem Al-Qahtani,Mitigate
RSK-IMP-03,Distributed Microservices Latency Degradation,Cyber & IT Risk,IT Infrastructure,3,3,Fahad Al-Harbi,Accept
RSK-IMP-04,Core ERP System Failover Downtime Beyond RTO,BCM & Resilience,Risk & Resilience Department,4,5,Sarah Al-Otaibi,Transfer`;

const normalizeCategory = (cat: string): RiskItem['category'] => {
  const c = cat.toLowerCase();
  if (c.includes('cyber') || c.includes('it') || c.includes('tech')) return 'Cyber';
  if (c.includes('strat')) return 'Strategic';
  if (c.includes('finan')) return 'Financial';
  if (c.includes('comp') || c.includes('legal') || c.includes('reg')) return 'Compliance';
  if (c.includes('reput')) return 'Reputational';
  return 'Operational';
};

const normalizeStatus = (stat: string): RiskItem['status'] => {
  const s = stat.toLowerCase();
  if (s.includes('mitig') || s.includes('prog')) return 'Mitigating';
  if (s.includes('accept')) return 'Accepted';
  if (s.includes('close') || s.includes('resolv')) return 'Closed';
  return 'Open';
};

const DEMO_PRESET_RISKS: Partial<RiskItem>[] = [
  {
    code: 'RSK-IMP-101',
    title: 'Zero-Day Vulnerability in Third-Party SaaS API Gateway',
    category: 'Cyber',
    department: 'IT Infrastructure & Cyber Defense',
    owner: 'Fahad Al-Harbi',
    likelihood: 4,
    impact: 5,
    treatment: 'Mitigate',
    status: 'Open',
    treatmentDetails: 'Enforce real-time WAF rate-limiting and mandate API mTLS across all external edge ingress gateways.',
    description: 'Third-party API dependencies exposing perimeter endpoints to remote invocation exploits.',
  },
  {
    code: 'RSK-IMP-102',
    title: 'Critical Vendor Talent Attrition in Core Architecture',
    category: 'Strategic',
    department: 'Strategic Development Office',
    owner: 'Dr. Reem Al-Qahtani',
    likelihood: 3,
    impact: 4,
    treatment: 'Mitigate',
    status: 'Mitigating',
    treatmentDetails: 'Implement internal succession planning and cross-train senior engineering staff.',
    description: 'Key architectural talent shortages affecting institutional delivery timelines.',
  },
  {
    code: 'RSK-IMP-103',
    title: 'Physical Data Center Power Redundancy Interruption',
    category: 'Operational',
    department: 'Risk & Resilience Department',
    owner: 'Sarah Al-Otaibi',
    likelihood: 2,
    impact: 5,
    treatment: 'Transfer',
    status: 'Open',
    treatmentDetails: 'Dual-feed utility grid subscription with 72-hour on-site diesel backup generator SLA testing.',
    description: 'Primary power distribution units susceptible to regional grid voltage drops.',
  },
];

export const ImportRiskModal: React.FC<ImportRiskModalProps> = ({ isOpen, onClose }) => {
  const { importRisks, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'preset'>('upload');
  const [pasteContent, setPasteContent] = useState('');
  const [parsedRisks, setParsedRisks] = useState<Partial<RiskItem>[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const parseRiskCSV = (csvText: string): Partial<RiskItem>[] => {
    const lines = csvText
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const headerLine = lines[0];
    if (!headerLine || lines.length < 2) {
      throw new Error('CSV must contain a header row and at least one risk row.');
    }

    const headers = headerLine.split(',').map((h) => h.trim().toLowerCase());
    const getColIndex = (...aliases: string[]) =>
      headers.findIndex((h) => aliases.some((a) => h.includes(a)));

    const codeIdx = getColIndex('code', 'id');
    const titleIdx = getColIndex('title', 'name', 'risk');
    const categoryIdx = getColIndex('cat', 'type');
    const deptIdx = getColIndex('dept', 'department');
    const likelihoodIdx = getColIndex('like', 'prob');
    const impactIdx = getColIndex('imp', 'severity');
    const ownerIdx = getColIndex('owner', 'lead');
    const treatmentIdx = getColIndex('treat', 'action', 'response');

    if (titleIdx === -1) {
      throw new Error('CSV must contain a "Title" column for risk items.');
    }

    const rows: Partial<RiskItem>[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const values = line.split(',').map((v) => v.replace(/^"|"$/g, '').trim());

      const title = values[titleIdx];
      if (!title) continue;

      const code = codeIdx !== -1 && values[codeIdx] ? values[codeIdx] : `RSK-IMP-${Math.floor(100 + Math.random() * 900)}`;
      const rawCat = categoryIdx !== -1 && values[categoryIdx] ? values[categoryIdx] : 'Operational';
      const category = normalizeCategory(rawCat);
      const department = deptIdx !== -1 && values[deptIdx] ? values[deptIdx] : currentUser.department;
      const likelihood = likelihoodIdx !== -1 && !isNaN(Number(values[likelihoodIdx])) ? Math.min(5, Math.max(1, Number(values[likelihoodIdx]))) : 3;
      const impact = impactIdx !== -1 && !isNaN(Number(values[impactIdx])) ? Math.min(5, Math.max(1, Number(values[impactIdx]))) : 3;
      const owner = ownerIdx !== -1 && values[ownerIdx] ? values[ownerIdx] : currentUser.name;
      const treatmentRaw = treatmentIdx !== -1 && values[treatmentIdx] ? values[treatmentIdx] : 'Mitigate';
      const treatment = (['Mitigate', 'Transfer', 'Accept', 'Avoid'].includes(treatmentRaw) ? treatmentRaw : 'Mitigate') as any;

      rows.push({
        code,
        title,
        category,
        department,
        likelihood,
        impact,
        owner,
        treatment,
        status: 'Open',
      });
    }

    if (rows.length === 0) {
      throw new Error('No valid risk records found in file.');
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
          const list = Array.isArray(raw) ? raw : raw.risks || [];
          const rows: Partial<RiskItem>[] = list.map((item: any, i: number) => ({
            code: item.code || `RSK-IMP-${Math.floor(100 + Math.random() * 900)}`,
            title: item.title || `Imported Risk ${i + 1}`,
            category: normalizeCategory(item.category || ''),
            department: item.department || currentUser.department,
            likelihood: Number(item.likelihood) || 3,
            impact: Number(item.impact) || 3,
            owner: item.owner || currentUser.name,
            treatment: item.treatment || 'Mitigate',
            treatmentDetails: item.treatmentDetails,
            status: normalizeStatus(item.status || ''),
          }));
          setParsedRisks(rows);
        } else {
          const rows = parseRiskCSV(content);
          setParsedRisks(rows);
        }
      } catch (err: any) {
        setParseError(err.message || 'Failed to parse file.');
        setParsedRisks([]);
      }
    };
    reader.readAsText(file);
  };

  const handleApplyPaste = () => {
    setParseError(null);
    try {
      if (pasteContent.trim().startsWith('{') || pasteContent.trim().startsWith('[')) {
        const raw = JSON.parse(pasteContent);
        const list = Array.isArray(raw) ? raw : raw.risks || [];
        const rows: Partial<RiskItem>[] = list.map((item: any, i: number) => ({
          code: item.code || `RSK-IMP-${Math.floor(100 + Math.random() * 900)}`,
          title: item.title || `Imported Risk ${i + 1}`,
          category: normalizeCategory(item.category || ''),
          department: item.department || currentUser.department,
          likelihood: Number(item.likelihood) || 3,
          impact: Number(item.impact) || 3,
          owner: item.owner || currentUser.name,
          treatment: item.treatment || 'Mitigate',
          status: normalizeStatus(item.status || ''),
        }));
        setParsedRisks(rows);
      } else {
        const rows = parseRiskCSV(pasteContent);
        setParsedRisks(rows);
      }
    } catch (err: any) {
      setParseError(err.message || 'Failed to parse pasted data.');
      setParsedRisks([]);
    }
  };

  const handleCommitImport = () => {
    if (parsedRisks.length === 0) return;
    importRisks(parsedRisks);
    onClose();
  };

  const downloadSampleTemplate = () => {
    const blob = new Blob([SAMPLE_RISK_CSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enterprise_risk_register_template.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Sample Risk CSV Template Downloaded');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden my-8 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 to-rose-950 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold">Import Enterprise Risk Register</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/30 border border-rose-400/30 text-rose-200 uppercase">
                  ISO 31000
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Import risk items to populate the enterprise register and update the 5x5 heatmap.
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
                activeTab === 'upload' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>File Upload (CSV/JSON)</span>
            </button>
            <button
              onClick={() => setActiveTab('paste')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeTab === 'paste' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Paste Text</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('preset');
                setParsedRisks(DEMO_PRESET_RISKS);
                setFileName('Standard Preset: Cybersecurity & Supply Chain Risks');
                setParseError(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeTab === 'preset' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Standard Risk Preset</span>
            </button>
          </div>

          <button
            onClick={downloadSampleTemplate}
            className="text-[11px] text-rose-700 hover:text-rose-900 font-semibold flex items-center space-x-1 cursor-pointer"
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
                  ? 'border-rose-500 bg-rose-50/50 scale-[0.99]'
                  : 'border-slate-200 hover:border-rose-400 hover:bg-slate-50/50'
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
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <div className="font-semibold text-sm text-slate-800">
                {fileName ? fileName : 'Choose a CSV / JSON file or drag it here'}
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                File columns: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">RiskCode</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">Title</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">Likelihood (1-5)</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">Impact (1-5)</code>.
              </p>
            </div>
          )}

          {activeTab === 'paste' && (
            <div className="space-y-3">
              <textarea
                value={pasteContent}
                onChange={(e) => setPasteContent(e.target.value)}
                placeholder={`Paste CSV content here...\n\nExample:\nRiskCode,Title,Category,Department,Likelihood,Impact,Owner,Treatment\nRSK-IMP-01,Supply Chain Disruption,Operational,Logistics,4,4,Eng. Tariq,Mitigate`}
                rows={6}
                className="w-full p-3 font-mono text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="button"
                onClick={handleApplyPaste}
                disabled={!pasteContent.trim()}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors cursor-pointer"
              >
                Parse Pasted Risk Register
              </button>
            </div>
          )}

          {activeTab === 'preset' && (
            <div className="p-4 bg-rose-50/60 border border-rose-200 rounded-xl text-xs text-rose-950 flex items-center justify-between">
              <div>
                <div className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Sample Cyber & Operational Risk Register Loaded
                </div>
                <div className="text-[11px] text-rose-700 mt-0.5">
                  Pre-configured with 3 ISO 31000 risk items spanning Cyber, Resilience, and Strategic dependencies.
                </div>
              </div>
            </div>
          )}

          {parseError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {/* Parsed Preview Table */}
          {parsedRisks.length > 0 && (
            <div className="space-y-2 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Parsed Risks Preview ({parsedRisks.length} Items)
                </span>
                <span className="text-[11px] text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Ready to Register
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase sticky top-0">
                    <tr>
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Risk Title</th>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">L × I</th>
                      <th className="p-2.5">Score</th>
                      <th className="p-2.5">Treatment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {parsedRisks.map((r, i) => {
                      const score = (r.likelihood || 3) * (r.impact || 3);
                      return (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2.5 font-bold text-slate-900">{r.code}</td>
                          <td className="p-2.5 font-sans truncate max-w-xs text-slate-800">{r.title}</td>
                          <td className="p-2.5 text-slate-500 font-sans">{r.category}</td>
                          <td className="p-2.5 text-slate-600">{r.likelihood} × {r.impact}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              score >= 16
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : score >= 10
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}>
                              Score {score}
                            </span>
                          </td>
                          <td className="p-2.5 text-slate-700 font-sans">{r.treatment}</td>
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
            disabled={parsedRisks.length === 0}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Import {parsedRisks.length} Risks into Heatmap</span>
          </button>
        </div>
      </div>
    </div>
  );
};
