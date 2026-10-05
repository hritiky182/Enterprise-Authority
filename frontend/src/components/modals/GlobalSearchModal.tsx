import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, ShieldAlert, Target, ListTodo, FileText, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    risks,
    objectives,
    initiatives,
    actions,
    documents,
    bcmProcesses,
    openModal,
    lang,
    t,
  } = useApp();

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.toLowerCase().trim();

  const matchingRisks = query
    ? risks.filter((r) => r.title.toLowerCase().includes(query) || r.code.toLowerCase().includes(query))
    : risks.slice(0, 2);

  const matchingObjectives = query
    ? objectives.filter(
        (o) =>
          o.title.toLowerCase().includes(query) ||
          (o.titleAr && o.titleAr.toLowerCase().includes(query)) ||
          o.code.toLowerCase().includes(query)
      )
    : objectives.slice(0, 2);

  const matchingActions = query
    ? actions.filter((a) => a.title.toLowerCase().includes(query) || a.code.toLowerCase().includes(query))
    : actions.slice(0, 2);

  const matchingDocs = query
    ? documents.filter((d) => d.title.toLowerCase().includes(query) || d.code.toLowerCase().includes(query))
    : documents.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden">
        {/* Input header */}
        <div className="flex items-center px-4 border-b border-slate-200 py-3 gap-2.5">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'ar'
                ? 'البحث في المخاطر، الأهداف الاستراتيجية، خطط العمل، الوثائق...'
                : 'Search risks, strategic objectives, actions, documents...'
            }
            className="w-full text-sm bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 font-sans"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          {/* Risks section */}
          {matchingRisks.length > 0 && (
            <div>
              <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <ShieldAlert className="w-3.5 h-3.5 mr-1 text-rose-500" />
                Risks ({matchingRisks.length})
              </div>
              <div className="space-y-1">
                {matchingRisks.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openModal('risk', r);
                    }}
                    className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <span className="font-mono font-semibold text-slate-900 mr-2">{r.code}</span>
                      <span className="text-slate-700 font-medium">{r.title}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-rose-50 text-rose-700">
                      Score {r.inherentScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Objectives section */}
          {matchingObjectives.length > 0 && (
            <div>
              <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Target className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                {lang === 'ar' ? 'الأهداف الاستراتيجية' : 'Strategic Objectives'} ({matchingObjectives.length})
              </div>
              <div className="space-y-1">
                {matchingObjectives.map((o) => (
                  <div
                    key={o.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openModal('objective', o);
                    }}
                    className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <span className="font-mono font-semibold text-slate-900 mr-2">{o.code}</span>
                      <span className="text-slate-700 font-medium">
                        {lang === 'ar' ? (o.titleAr || o.title) : o.title}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-emerald-50 text-emerald-700">
                      {o.progress}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Plans section */}
          {matchingActions.length > 0 && (
            <div>
              <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                <ListTodo className="w-3.5 h-3.5 mr-1 text-amber-500" />
                Action Plans ({matchingActions.length})
              </div>
              <div className="space-y-1">
                {matchingActions.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      openModal('action', a);
                    }}
                    className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <span className="font-mono font-semibold text-slate-900 mr-2">{a.code}</span>
                      <span className="text-slate-700 font-medium">{a.title}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                      {a.dueDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <span>Press ESC or click outside to dismiss</span>
          <span>Enterprise Global Search</span>
        </div>
      </div>
    </div>
  );
};
