import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AUTHORITY_SECTORS, DEPARTMENTS, ORGANIZATION_INFO } from '../../data/mockData';
import { Department, Sector } from '../../types';
import {
  Building2,
  Users,
  Shield,
  Layers,
  ChevronRight,
  UserCheck,
  Search,
  ExternalLink,
  Crown,
  Briefcase,
  FileText,
  Lock,
  Landmark,
  Compass,
  TrendingUp,
  Cpu,
  Archive,
  BarChart3,
  Network,
  CheckCircle2,
} from 'lucide-react';

export const OperationalStructureView: React.FC = () => {
  const { lang, t } = useApp();
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeViewMode, setActiveViewMode] = useState<'hierarchy' | 'grid'>('hierarchy');

  const boardOffice = DEPARTMENTS.find((d) => d.id === 'dept-board');
  const ceoOffice = DEPARTMENTS.find((d) => d.id === 'dept-ceo');

  const advisoryOffices = DEPARTMENTS.filter(
    (d) => d.category === 'Advisory & Oversight'
  );

  const filteredDepartments = DEPARTMENTS.filter((d) => {
    if (selectedSector && d.sectorId !== selectedSector) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = d.name.toLowerCase().includes(q);
      const matchNameAr = (d.nameAr || '').toLowerCase().includes(q);
      const matchCode = d.code.toLowerCase().includes(q);
      const matchHead = d.head.toLowerCase().includes(q);
      return matchName || matchNameAr || matchCode || matchHead;
    }
    return true;
  });

  const getSectorIcon = (code: string) => {
    switch (code) {
      case 'SEC-SS':
        return <Users className="w-4 h-4 text-slate-700" />;
      case 'SEC-PPM':
        return <Briefcase className="w-4 h-4 text-amber-600" />;
      case 'SEC-SUD':
        return <Compass className="w-4 h-4 text-emerald-600" />;
      case 'SEC-IPD':
        return <TrendingUp className="w-4 h-4 text-indigo-600" />;
      case 'SEC-SSD':
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
      default:
        return <Building2 className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Executive Structure Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 rounded-2xl text-white border border-slate-700 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-300">
              <Network className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الهيكل التنظيمي والتشغيلي المعتمد للهيئة' : "THE AUTHORITY'S OPERATIONAL STRUCTURE"}</span>
            </div>
            <h2 className="text-xl font-bold font-sans">
              {lang === 'ar' ? 'إطار الهيكل التنظيمي لهيئة تطوير الأحساء' : 'Al Ahsa Development Authority Organization Framework'}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'الهيكل الإداري التنفيذي الرسمي الذي يشمل مجلس الهيئة، ومكتب الرئيس التنفيذي، والإدارات الرقابية والاستشارية، و5 قطاعات تشغيلية متخصصة تقود مسيرة التنمية الإقليمية المستدامة.'
                : 'Official executive architecture encompassing the Authority Board, CEO Office, oversight directorates, and 5 specialized operational sectors governing regional sustainable development.'}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-700 self-start md:self-auto">
            <button
              onClick={() => setActiveViewMode('hierarchy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeViewMode === 'hierarchy'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'المخطط الهيكلي التفاعلي' : 'Org Chart Tree'}
            </button>
            <button
              onClick={() => setActiveViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeViewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? `دليل الإدارات والأقسام (${DEPARTMENTS.length})` : `Departments Directory (${DEPARTMENTS.length})`}
            </button>
          </div>
        </div>

        {/* Quick Sector Filter Bar */}
        <div className="mt-5 pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase font-bold text-slate-400 mr-1">
            {lang === 'ar' ? 'تصفية حسب القطاع:' : 'Filter Sector:'}
          </span>
          <button
            onClick={() => setSelectedSector(null)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer ${
              selectedSector === null
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {lang === 'ar' ? `جميع القطاعات والوحدات (${DEPARTMENTS.length})` : `All Sectors & Units (${DEPARTMENTS.length})`}
          </button>
          {AUTHORITY_SECTORS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSector(sec.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                selectedSector === sec.id
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sec.name}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE HIERARCHY TREE (Matching PDF page 1) */}
      {activeViewMode === 'hierarchy' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-8 overflow-x-auto">
          {/* Level 1: Authority Board & Secretariat */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Internal Audit (Dotted advisory on left) */}
              <div className="w-56 p-3.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-center shadow-2xs">
                <span className="text-[9px] font-mono font-bold uppercase text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">
                  Independent Oversight
                </span>
                <div className="font-bold text-xs text-slate-900 mt-1">Internal Audit</div>
                <div className="text-[10px] text-slate-500 mt-0.5">المراجعة الداخلية</div>
                <div className="text-[10px] text-blue-700 font-mono mt-1">Head: Abdullah Al-Ghamdi</div>
              </div>

              {/* Authority Board (Center Supreme Node) */}
              <div className="w-72 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white text-center shadow-lg border-2 border-amber-400/40 relative">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto mb-2 shadow-md">
                  <Crown className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm tracking-wide uppercase">Authority Board</h3>
                <div className="text-[11px] text-amber-300 font-sans mt-0.5">مجلس الهيئة</div>
                <div className="text-[10px] text-slate-300 font-mono mt-1 border-t border-slate-800 pt-1.5">
                  Chaired by H.R.H. Prince Saud bin Talal Al Saud
                </div>
              </div>

              {/* Board Secretariat (Right Node) */}
              <div className="w-56 p-3.5 rounded-xl border border-slate-200 bg-white text-center shadow-2xs">
                <span className="text-[9px] font-mono font-bold uppercase text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  Board Advisory
                </span>
                <div className="font-bold text-xs text-slate-900 mt-1">Authority Board Secretariat</div>
                <div className="text-[10px] text-slate-500 mt-0.5">أمانة مجلس الهيئة</div>
                <div className="text-[10px] text-slate-600 font-mono mt-1">Majed Al-Mutairi</div>
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-0.5 h-8 bg-blue-600 my-1" />

            {/* Level 2: Chief Executive Officer (CEO) */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-64 p-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center shadow-md border border-blue-500">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-200">
                  Executive Leadership
                </div>
                <h3 className="font-bold text-sm mt-0.5">Chief Executive Officer</h3>
                <div className="text-[11px] text-blue-200 font-sans">الرئيس التنفيذي</div>
                <div className="text-[10px] text-white/90 font-mono mt-1 font-semibold">
                  Eng. Abdulaziz Al-Hassan
                </div>
              </div>

              {/* CEO Office */}
              <div className="w-48 p-3 rounded-xl border border-blue-200 bg-blue-50/60 text-center shadow-2xs">
                <div className="font-bold text-xs text-blue-950">CEO Office</div>
                <div className="text-[10px] text-slate-500">مكتب الرئيس التنفيذي</div>
                <div className="text-[10px] text-blue-700 font-mono mt-0.5">Fahad Al-Kaltham</div>
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-0.5 h-8 bg-blue-600 my-1" />

            {/* Level 3: Direct Advisory & Reporting Offices Grid */}
            <div className="w-full max-w-4xl p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-mono font-semibold text-slate-600">
                <span className="uppercase text-[10px] text-blue-700 font-bold">
                  Direct Advisory & Institutional Oversight Directorates
                </span>
                <span>Reports Directly to CEO</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
                {advisoryOffices
                  .filter((d) => d.id !== 'dept-ia') // IA is displayed at the top with dotted line
                  .map((dept) => (
                    <div
                      key={dept.id}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-center space-y-1 hover:border-blue-400 transition-colors"
                    >
                      <div className="font-bold text-[11px] text-slate-900 leading-tight">
                        {dept.name}
                      </div>
                      {dept.nameAr && (
                        <div className="text-[10px] text-slate-400">{dept.nameAr}</div>
                      )}
                      <div className="text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-100 truncate">
                        {dept.head}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Connecting Vertical Stem to 5 Sectors */}
            <div className="w-0.5 h-8 bg-blue-600 my-1" />
          </div>

          {/* Level 4: The 5 Core Operational Sectors */}
          <div className="pt-2">
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                CORE OPERATIONAL DIVISIONS
              </span>
              <h3 className="text-base font-bold text-slate-900">
                5 Specialized Operational Sectors
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {AUTHORITY_SECTORS.map((sector) => {
                const subDepts = DEPARTMENTS.filter((d) => d.sectorId === sector.id);

                return (
                  <div
                    key={sector.id}
                    className={`rounded-2xl border transition-all ${
                      selectedSector === sector.id
                        ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                        : 'border-slate-200 shadow-xs hover:border-slate-300'
                    } flex flex-col justify-between overflow-hidden bg-white`}
                  >
                    {/* Sector Header */}
                    <div className="p-4 bg-slate-900 text-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-300 font-bold">
                          {sector.code}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400">
                          {subDepts.length} Units
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-white leading-tight">
                        {sector.name}
                      </h4>
                      {sector.nameAr && (
                        <div className="text-[11px] text-slate-300 font-sans">{sector.nameAr}</div>
                      )}
                      <div className="text-[10px] text-blue-300 font-mono pt-1">
                        Head: {sector.head}
                      </div>
                    </div>

                    {/* Sub-departments List */}
                    <div className="p-3 space-y-2 flex-1 bg-slate-50/40 divide-y divide-slate-100">
                      {subDepts.map((sub) => (
                        <div key={sub.id} className="pt-2 first:pt-0">
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-xs text-slate-900 leading-tight">
                              {sub.name}
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 shrink-0 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                              {sub.employeeCount}p
                            </span>
                          </div>
                          {sub.nameAr && (
                            <div className="text-[10px] text-slate-400 mt-0.5 font-sans">
                              {sub.nameAr}
                            </div>
                          )}
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                            Dir: {sub.head}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Sector Footer Tag */}
                    <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center">
                      <button
                        onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                        className="text-[10px] font-mono font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
                      >
                        {selectedSector === sector.id ? 'Clear Focus' : 'Focus Sector →'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FULL DIRECTORY GRID VIEW */}
      {activeViewMode === 'grid' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search departments, directors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Showing {filteredDepartments.length} of {DEPARTMENTS.length} Organizational Units
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDepartments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs space-y-3 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {dept.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {dept.employeeCount} Cadres
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900">{dept.name}</h3>
                  {dept.nameAr && (
                    <div className="text-xs text-slate-400 font-sans mt-0.5">{dept.nameAr}</div>
                  )}
                  {dept.sectorName && (
                    <div className="text-[11px] font-semibold text-blue-600 mt-1 font-mono">
                      {dept.sectorName}
                    </div>
                  )}
                  {dept.category && (
                    <span className="inline-block mt-1 text-[9px] font-mono uppercase font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {dept.category}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 pt-2 border-t border-slate-100 font-mono flex items-center justify-between">
                  <span>Unit Director:</span>
                  <span className="font-bold text-slate-900">{dept.head}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
