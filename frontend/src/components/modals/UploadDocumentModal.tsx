import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentItem } from '../../types';
import {
  Upload,
  FileSpreadsheet,
  FileText,
  FileCode,
  X,
  CheckCircle2,
  AlertCircle,
  Download,
  FolderOpen,
  Tag,
} from 'lucide-react';
import { toast } from 'sonner';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DOCUMENT_CATEGORIES = [
  'Policy',
  'Procedure',
  'Risk Document',
  'Strategy Document',
  'BCM Plan',
  'Compliance Evidence',
  'Governance Document',
];

const SAMPLE_DOCS_CSV = `DocumentCode,Title,Category,Department,Version,FileType,FileSize
DOC-2026-901,Enterprise Cyber Incident Response Plan v2.4,BCM Plan,IT Infrastructure & Cyber Defense,v2.4,PDF,3.2 MB
DOC-2026-902,Q3 ISO 27001 Surveillance Audit Findings,Compliance Evidence,Internal Audit & Legal,v1.0,PDF,4.8 MB
DOC-2026-903,Corporate Data Classification & Clean Desk Standard,Policy,Strategic Development Office,v3.1,PDF,1.4 MB
DOC-2026-904,Enterprise Risk Matrix Thresholds & Tolerances,Risk Document,Risk & Resilience Department,v2.0,XLSX,2.1 MB`;

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ isOpen, onClose }) => {
  const { addDocument, importDocuments, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');

  // Single file form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Compliance Evidence');
  const [department, setDepartment] = useState(currentUser.department);
  const [version, setVersion] = useState('v1.0');
  const [confidentiality, setConfidentiality] = useState<'Public' | 'Internal' | 'Confidential' | 'Strictly Confidential'>('Confidential');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const singleFileInputRef = useRef<HTMLInputElement>(null);

  // Batch CSV state
  const [batchFile, setBatchFile] = useState<File | null>(null);
  const [parsedDocs, setParsedDocs] = useState<(Omit<DocumentItem, 'id' | 'code'> & Partial<DocumentItem>)[]>([]);
  const [batchError, setBatchError] = useState<string | null>(null);
  const batchFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSingleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Document title is required.');
      return;
    }

    const fileSize = selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB';
    const rawExt = (selectedFile?.name.split('.').pop() || 'pdf').toLowerCase();
    const fileType: DocumentItem['fileType'] = rawExt === 'docx' ? 'docx' : rawExt === 'xlsx' ? 'xlsx' : 'pdf';

    addDocument({
      title: title.trim(),
      category: category as any,
      uploadedBy: currentUser.name,
      uploadDate: new Date().toISOString().slice(0, 10),
      version,
      fileSize,
      fileType,
      tags: ['Enterprise', category, department],
    });

    onClose();
  };

  const parseBatchCSV = (csvText: string) => {
    const lines = csvText
      .trim()
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const headerLine = lines[0];
    if (!headerLine || lines.length < 2) {
      throw new Error('CSV must contain a header and at least one document row.');
    }

    const headers = headerLine.split(',').map((h) => h.trim().toLowerCase());
    const getColIndex = (...aliases: string[]) =>
      headers.findIndex((h) => aliases.some((a) => h.includes(a)));

    const codeIdx = getColIndex('code', 'id');
    const titleIdx = getColIndex('title', 'name', 'doc');
    const categoryIdx = getColIndex('cat', 'type');
    const deptIdx = getColIndex('dept', 'department');
    const versionIdx = getColIndex('ver', 'version');
    const fileTypeIdx = getColIndex('format', 'filetype', 'type');
    const fileSizeIdx = getColIndex('size', 'filesize');

    if (titleIdx === -1) {
      throw new Error('CSV must contain a "Title" column.');
    }

    const docs: (Omit<DocumentItem, 'id' | 'code'> & Partial<DocumentItem>)[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line) continue;
      const values = line.split(',').map((v) => v.replace(/^"|"$/g, '').trim());
      const docTitle = values[titleIdx];
      if (!docTitle) continue;

      const code = codeIdx !== -1 && values[codeIdx] ? values[codeIdx] : `DOC-${Math.floor(100 + Math.random() * 900)}`;
      const cat = categoryIdx !== -1 && values[categoryIdx] ? values[categoryIdx] : 'Compliance Evidence';
      const dept = deptIdx !== -1 && values[deptIdx] ? values[deptIdx] : currentUser.department;
      const ver = versionIdx !== -1 && values[versionIdx] ? values[versionIdx] : 'v1.0';
      const rawFType = (fileTypeIdx !== -1 && values[fileTypeIdx] ? values[fileTypeIdx] : 'pdf').toLowerCase();
      const fType: DocumentItem['fileType'] = rawFType === 'docx' ? 'docx' : rawFType === 'xlsx' ? 'xlsx' : 'pdf';
      const fSize = fileSizeIdx !== -1 && values[fileSizeIdx] ? values[fileSizeIdx] : '2.0 MB';

      docs.push({
        code,
        title: docTitle,
        category: cat as any,
        uploadedBy: currentUser.name,
        uploadDate: new Date().toISOString().slice(0, 10),
        version: ver,
        fileSize: fSize,
        fileType: fType,
        tags: ['Enterprise', cat, dept],
      });
    }

    if (docs.length === 0) throw new Error('No valid documents found in CSV.');
    return docs;
  };

  const handleBatchFile = (file: File) => {
    setBatchFile(file);
    setBatchError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const docs = parseBatchCSV(text);
        setParsedDocs(docs);
      } catch (err: any) {
        setBatchError(err.message || 'Failed to parse batch document CSV.');
        setParsedDocs([]);
      }
    };
    reader.readAsText(file);
  };

  const handleCommitBatch = () => {
    if (parsedDocs.length === 0) return;
    importDocuments(parsedDocs);
    onClose();
  };

  const downloadSampleTemplate = () => {
    const blob = new Blob([SAMPLE_DOCS_CSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document_catalog_import_template.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Sample Document CSV Template Downloaded');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden my-8 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-900 to-emerald-950 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold">Upload & Import Documents</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 uppercase">
                  Evidence Repository
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Upload governance policies, audit evidence, BCM plans, and ISO compliance records.
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

        {/* Tab switch */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-2.5">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeTab === 'single' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeTab === 'batch' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Batch Catalog Import (CSV)</span>
            </button>
          </div>

          {activeTab === 'batch' && (
            <button
              onClick={downloadSampleTemplate}
              className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV Template</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'single' ? (
            <form id="single-doc-form" onSubmit={handleSingleSubmit} className="space-y-4">
              {/* Drag and Drop Box */}
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
                  if (file) handleSingleFileSelect(file);
                }}
                onClick={() => singleFileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]'
                    : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50/50'
                }`}
              >
                <input
                  ref={singleFileInputRef}
                  type="file"
                  accept=".pdf,.docx,.xlsx,.csv,.png,.jpg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleSingleFileSelect(file);
                  }}
                />
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="font-semibold text-xs text-slate-800">
                  {selectedFile ? selectedFile.name : 'Select file (PDF, DOCX, XLSX) or drag & drop'}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Maximum file size: 50MB. Auto-indexed into document search.
                </p>
              </div>

              {/* Document Metadata Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Enterprise Security Architecture Standard"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      {DOCUMENT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Version</label>
                    <input
                      type="text"
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      placeholder="e.g. v1.2"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Security Classification</label>
                    <select
                      value={confidentiality}
                      onChange={(e) => setConfidentiality(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Public">Public</option>
                      <option value="Internal">Internal</option>
                      <option value="Confidential">Confidential</option>
                      <option value="Strictly Confidential">Strictly Confidential</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div
                onClick={() => batchFileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-slate-50/50 rounded-2xl p-6 text-center cursor-pointer transition-all"
              >
                <input
                  ref={batchFileInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleBatchFile(file);
                  }}
                />
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-2">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="font-semibold text-xs text-slate-800">
                  {batchFile ? batchFile.name : 'Choose CSV document catalog file or drag here'}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Headers: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-700">DocumentCode, Title, Category, Department, Version, FileType</code>
                </p>
              </div>

              {batchError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{batchError}</span>
                </div>
              )}

              {parsedDocs.length > 0 && (
                <div className="space-y-2 border-t border-slate-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      Parsed Catalog ({parsedDocs.length} Documents)
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Ready to Index
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-700 font-mono text-[10px] uppercase sticky top-0">
                        <tr>
                          <th className="p-2">Code</th>
                          <th className="p-2">Document Title</th>
                          <th className="p-2">Category</th>
                          <th className="p-2">Format</th>
                          <th className="p-2">Ver</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {parsedDocs.map((d, i) => (
                          <tr key={i} className="hover:bg-slate-50">
                            <td className="p-2 font-bold text-slate-900">{d.code}</td>
                            <td className="p-2 font-sans truncate max-w-xs text-slate-800">{d.title}</td>
                            <td className="p-2 font-sans text-slate-500">{d.category}</td>
                            <td className="p-2 font-mono text-slate-500 uppercase">{d.fileType}</td>
                            <td className="p-2 text-slate-600">{d.version}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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

          {activeTab === 'single' ? (
            <button
              type="submit"
              form="single-doc-form"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Index & Upload Document</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCommitBatch}
              disabled={parsedDocs.length === 0}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-xs cursor-pointer transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Import {parsedDocs.length} Catalog Items</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
