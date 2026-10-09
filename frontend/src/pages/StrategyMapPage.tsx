import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  X,
  Target,
  BarChart3,
  Sparkles,
  Link2,
  Users,
  Building2,
  Clock,
  Shield,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

interface ObjectiveMapCard {
  id: string;
  code: string;
  title: string;
  titleAr: string;
  perspective: 'Financial' | 'Customer' | 'Internal' | 'Capacity';
  owner: string;
  ownerAr: string;
  department: string;
  description: string;
  descriptionAr: string;
  progress: number;
  measures: string[];
  measuresAr: string[];
  initiatives: string[];
  initiativesAr: string[];
  upstreamDependencies: string[];
  downstreamImpacts: string[];
}

export const StrategyMapPage: React.FC = () => {
  const { lang, t } = useApp();
  const navigate = useNavigate();

  const [selectedObjective, setSelectedObjective] = useState<ObjectiveMapCard | null>(null);

  const mapObjectives: ObjectiveMapCard[] = [
    // 1. Financial & Economic (Top)
    {
      id: 'obj-fin-1',
      code: 'OBJ-01',
      title: 'Maximize High-Yield Tourism & Agritech Economic Contribution',
      titleAr: 'تعظيم مساهمة السياحة ذات القيمة المضافة والصناعات الزراعية في الناتج المحلي',
      perspective: 'Financial',
      owner: 'Dr. Mona Al-Shehri (VP Economic Investment)',
      ownerAr: 'د. منى الشهري (نائب الرئيس للاستثمار الاقتصادي)',
      department: 'Economic & Investment Sector',
      description: 'Expand private sector investments and diversify Al-Ahsa GDP beyond hydrocarbons.',
      descriptionAr: 'توسيع الاستثمارات الخاصة وتنويع الناتج المحلي الإجمالي لمحافظة الأحساء خارج نطاق الهيدروكربونات.',
      progress: 92,
      measures: ['KPI-01: Inbound Tourism Spending (SAR B)', 'KPI-02: Private Capital Inflows'],
      measuresAr: ['مؤشر 01: الإنفاق السياحي الوافد (مليار ريال)', 'مؤشر 02: تدفقات رؤوس الأموال الخاصة'],
      initiatives: ['INIT-01: Eco-Luxury Hospitality Fund', 'INIT-02: Date Value-Chain Agritech Hub'],
      initiativesAr: ['مبادرة 01: صندوق الضيافة الفاخرة المستدامة', 'مبادرة 02: مجمع الصناعات الزراعية التحويلية'],
      upstreamDependencies: ['OBJ-03 (Customer/Visitor Experience)', 'OBJ-04 (Quality of Life)'],
      downstreamImpacts: ['Vision 2030 Non-Oil GDP Target'],
    },
    // 2. Customer & Community
    {
      id: 'obj-cust-1',
      code: 'OBJ-03',
      title: 'Elevate Oasis Resident Well-Being & Heritage Visitor Satisfaction',
      titleAr: 'الارتقاء بجودة حياة سكان الواحة ورضا زوار المواقع التراثية',
      perspective: 'Customer',
      owner: 'Eng. Faisal Al-Otaibi (Sector Head Community)',
      ownerAr: 'م. فيصل العتيبي (رئيس قطاع تنمية المجتمع)',
      department: 'Community & Culture Sector',
      description: 'Deliver vibrant cultural destinations, pedestrian shaded trails, and community pride.',
      descriptionAr: 'توفير وجهات ثقافية نابضة بالحياة، ومسارات مظللة للمشاة، وتعزيز الفخر بالهوية التراثية.',
      progress: 88,
      measures: ['KPI-03: Resident Satisfaction Index (86%)', 'KPI-04: Annual Visitor Footfall (3.2M)'],
      measuresAr: ['مؤشر 03: مؤشر رضا السكان (86%)', 'مؤشر 04: إجمالي أعداد الزوار السنوي (3.2 مليون)'],
      initiatives: ['INIT-03: Oasis Cultural Festival Season', 'INIT-04: Green Shaded Heritage Trails'],
      initiativesAr: ['مبادرة 03: مواسم الفعاليات الثقافية بالواحة', 'مبادرة 04: مسارات المشاة الخضراء المظللة'],
      upstreamDependencies: ['OBJ-05 (Spatial Zoning Excellence)', 'OBJ-06 (UNESCO Canal Preservation)'],
      downstreamImpacts: ['OBJ-01 (Economic Contribution)'],
    },
    // 3. Internal Operations & Spatial
    {
      id: 'obj-int-1',
      code: 'OBJ-05',
      title: 'Enforce Integrated Spatial Planning & Protect UNESCO Living Oasis',
      titleAr: 'تطبيق التخطيط المكاني المتكامل وحماية المشهد الثقافي لواحة اليونسكو',
      perspective: 'Internal',
      owner: 'Eng. Tariq Al-Ghamdi (Director Spatial Governance)',
      ownerAr: 'م. طارق الغامدي (مدير حوكمة التخطيط المكاني)',
      department: 'Urban Planning & Heritage Sector',
      description: 'Establish unified buffer zone bylaws and water circulation infrastructure.',
      descriptionAr: 'تطبيق لوائح النطاقات العازلة المعتمدة وبنية توزيع المياه المعالجة لقنوات الري.',
      progress: 84,
      measures: ['KPI-05: Spatial Compliance Rate (94%)', 'KPI-06: Protected Canal Kilometers (180 km)'],
      measuresAr: ['مؤشر 05: نسبة الالتزام بالمخطط المكاني (94%)', 'مؤشر 06: الكيلومترات المحمية من قنوات الري (180 كم)'],
      initiatives: ['INIT-05: Al-Ahsa GIS Digital Twin Zoning', 'INIT-06: Ancient Canal Rehabilitation'],
      initiativesAr: ['مبادرة 05: التوأم الرقمي للتخطيط المكاني GIS', 'مبادرة 06: تأهيل شبكات القنوات التاريخية'],
      upstreamDependencies: ['OBJ-07 (Digital Innovation & Talents)'],
      downstreamImpacts: ['OBJ-03 (Resident Quality of Life & Tourism)'],
    },
    // 4. Learning & Growth / Capacity (Bottom)
    {
      id: 'obj-cap-1',
      code: 'OBJ-07',
      title: 'Build World-Class Regional Talents & Deploy Enterprise GRC Digital Twin',
      titleAr: 'بناء الكفاءات الوطنية المتخصصة وتدشين منصة الرقابة الاستراتيجية الرقمية',
      perspective: 'Capacity',
      owner: 'Sarah Al-Mutairi (VP Human Capital & Tech)',
      ownerAr: 'سارة المطيري (نائب الرئيس للموارد البشرية والتقنية)',
      department: 'Corporate Support & Digital Sector',
      description: 'Cultivate specialized urban conservation professionals and automated strategy tracking.',
      descriptionAr: 'تطوير الكفاءات في صون التراث الإقليمي والتحول الرقمي الشامل لعمليات الحوكمة والاستراتيجية.',
      progress: 95,
      measures: ['KPI-07: Certified Saudi Professionals (150+)', 'KPI-08: Enterprise Platform Adoption (98%)'],
      measuresAr: ['مؤشر 07: المتخصصون المعتمدون (150+)', 'مؤشر 08: نسبة استخدام المنصة المؤسسية (98%)'],
      initiatives: ['INIT-07: Al-Ahsa Heritage Leadership Academy', 'INIT-08: Enterprise Strategy Suite Rollout'],
      initiativesAr: ['مبادرة 07: أكاديمية قيادات التراث بالأحساء', 'مبادرة 08: تدشين منصة الاستراتيجية والحوكمة'],
      upstreamDependencies: ['Authority Operational Budget'],
      downstreamImpacts: ['OBJ-05 (Spatial & Environmental Operations)'],
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 10 من 20 • دورة حياة الاستراتيجية' : 'STAGE 10 OF 20 • STRATEGIC LIFECYCLE'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'خريطة الاستراتيجية وبطاقات الأهداف' : 'BSC Strategy Map & Objective Cards'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'خريطة العلاقات السببية وبطاقة تفاصيل المستهدف الاستراتيجي'
                : 'Directional Strategy Map & Interactive Objective Intelligence Cards'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate('/kpis')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer group"
            >
              <span>{lang === 'ar' ? 'المتابعة: قاموس المؤشرات' : 'Next: KPI Dictionary'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Strategy Map Visual Swimlanes (Client Requirement: "Build directional relationships between objectives") */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {lang === 'ar' ? 'المخطط السببي الموجه لمصفوفة بطاقة الأداء المتوازن' : 'Authoritative Causal Strategy Map (Bottom-Up Value Creation)'}
              </h2>
              <span className="text-[11px] text-slate-500">
                {lang === 'ar' ? 'تدفق القيمة السببية: صعوداً من القدرات والتقنية وصولاً للأثر المالي والاقتصادي' : 'Value Flow: Capacity & Enablers drive Operations, which drive Beneficiary Outcomes, creating Economic Value'}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 font-semibold">
            CLICK CARD TO OPEN DETAILS
          </span>
        </div>

        {/* 4 Swimlanes connected by directional causal arrows */}
        <div className="space-y-4">
          {/* Level 1: Financial & Economic (Top) */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
                <span>{lang === 'ar' ? '1. المحور المالي والأثر الاقتصادي (Financial & Economic)' : '1. Financial & Economic Impact Perspective'}</span>
              </span>
              <span className="font-mono text-[10px] text-blue-700">WEIGHT: 25%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {mapObjectives.filter((o) => o.perspective === 'Financial').map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObjective(obj)}
                  className="p-3.5 rounded-xl border border-blue-300 bg-white hover:border-blue-500 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                      {obj.code}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600">
                      {obj.progress}% Progress
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? obj.titleAr : obj.title}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="truncate">{obj.owner}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-blue-600 font-mono text-xs items-center gap-1">
            <ArrowUp className="w-4 h-4 animate-bounce" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Generates Economic Return & Investment</span>
          </div>

          {/* Level 2: Customer & Beneficiaries */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-600"></span>
                <span>{lang === 'ar' ? '2. محور العملاء والمستفيدين والمجتمع (Customer & Community)' : '2. Customer & Community Beneficiary Perspective'}</span>
              </span>
              <span className="font-mono text-[10px] text-emerald-700">WEIGHT: 30%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {mapObjectives.filter((o) => o.perspective === 'Customer').map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObjective(obj)}
                  className="p-3.5 rounded-xl border border-emerald-300 bg-white hover:border-emerald-500 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      {obj.code}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600">
                      {obj.progress}% Progress
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? obj.titleAr : obj.title}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="truncate">{obj.owner}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-teal-600 font-mono text-xs items-center gap-1">
            <ArrowUp className="w-4 h-4 animate-bounce" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Delivers Superior Visitor & Resident Experience</span>
          </div>

          {/* Level 3: Internal Operations & Spatial */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-teal-900">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-teal-600"></span>
                <span>{lang === 'ar' ? '3. محور العمليات الداخلية والتميز المكاني (Internal Operations)' : '3. Internal Operations & Spatial Governance Perspective'}</span>
              </span>
              <span className="font-mono text-[10px] text-teal-700">WEIGHT: 25%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {mapObjectives.filter((o) => o.perspective === 'Internal').map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObjective(obj)}
                  className="p-3.5 rounded-xl border border-teal-300 bg-white hover:border-teal-500 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800">
                      {obj.code}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600">
                      {obj.progress}% Progress
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? obj.titleAr : obj.title}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="truncate">{obj.owner}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-purple-600 font-mono text-xs items-center gap-1">
            <ArrowUp className="w-4 h-4 animate-bounce" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Powers Flawless Operations & Preservation</span>
          </div>

          {/* Level 4: Capacity & Tech (Foundation) */}
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-purple-900">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-purple-600"></span>
                <span>{lang === 'ar' ? '4. محور القدرات المؤسسية والتقنية (Capacity & Tech)' : '4. Organizational Capacity, People & Digital Tech (Foundation)'}</span>
              </span>
              <span className="font-mono text-[10px] text-purple-700">WEIGHT: 20%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {mapObjectives.filter((o) => o.perspective === 'Capacity').map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setSelectedObjective(obj)}
                  className="p-3.5 rounded-xl border border-purple-300 bg-white hover:border-purple-500 shadow-2xs hover:shadow-xs transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                      {obj.code}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600">
                      {obj.progress}% Progress
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? obj.titleAr : obj.title}
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="truncate">{obj.owner}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Objective Intelligence Card Modal (Client Requirement: "Open an objective directly from the map to view its definition, owner, measures, initiatives and dependencies") */}
      {selectedObjective && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                  {selectedObjective.code}
                </span>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600">
                    BSC {selectedObjective.perspective.toUpperCase()} OBJECTIVE
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {lang === 'ar' ? selectedObjective.titleAr : selectedObjective.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedObjective(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {/* Definition & Narrative */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  {lang === 'ar' ? 'الوصف والنطاق الاستراتيجي:' : 'Objective Strategic Definition & Scope:'}
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {lang === 'ar' ? selectedObjective.descriptionAr : selectedObjective.description}
                </p>
              </div>

              {/* Owner & Department */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Accountable Owner</span>
                  <span className="font-bold text-slate-900 block mt-0.5">
                    {lang === 'ar' ? selectedObjective.ownerAr : selectedObjective.owner}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 bg-white">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Lead Sector</span>
                  <span className="font-bold text-slate-900 block mt-0.5">
                    {selectedObjective.department}
                  </span>
                </div>
              </div>

              {/* Supporting Measures / KPIs */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-[10px] font-mono text-indigo-700 uppercase font-bold flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'مؤشرات الأداء المعتمدة (Measures):' : 'Key Performance Measures (KPIs):'}</span>
                </span>
                <div className="space-y-1.5">
                  {(lang === 'ar' ? selectedObjective.measuresAr : selectedObjective.measures).map((m, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-indigo-50/50 border border-indigo-100 font-semibold text-slate-800 flex items-center justify-between">
                      <span>{m}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Initiatives */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <span className="text-[10px] font-mono text-amber-700 uppercase font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'المبادرات والمشاريع الممولة (Initiatives):' : 'Supported Strategic Initiatives:'}</span>
                </span>
                <div className="space-y-1.5">
                  {(lang === 'ar' ? selectedObjective.initiativesAr : selectedObjective.initiatives).map((init, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-amber-50/50 border border-amber-100 font-semibold text-slate-800 flex items-center justify-between">
                      <span>{init}</span>
                      <span className="text-[10px] font-mono bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-bold">FUNDED</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upstream & Downstream Dependencies */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                    {lang === 'ar' ? 'الاعتماديات السابقة (Upstream):' : 'Upstream Enablers:'}
                  </span>
                  <div className="mt-1 space-y-1">
                    {selectedObjective.upstreamDependencies.map((dep, idx) => (
                      <span key={idx} className="block text-[11px] font-semibold text-slate-700 truncate">
                        • {dep}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                    {lang === 'ar' ? 'الأثر اللاحق (Downstream):' : 'Downstream Impacts:'}
                  </span>
                  <div className="mt-1 space-y-1">
                    {selectedObjective.downstreamImpacts.map((imp, idx) => (
                      <span key={idx} className="block text-[11px] font-semibold text-slate-700 truncate">
                        ➔ {imp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                AUDIT CHECKSUM: {selectedObjective.code}-VERIFIED
              </span>
              <button
                onClick={() => setSelectedObjective(null)}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
              >
                {lang === 'ar' ? 'إغلاق البطاقة' : 'Close Card'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enterprise Strategic Lifecycle Progression */}
      <StrategicLifecycleProgression
        currentStage={10}
        stageTitle="Directional BSC Strategy Map & Objective Cards"
        stageTitleAr="خريطة استراتيجية بطاقة الأداء وبطاقات الأهداف الذكية"
        prevStage={{
          stage: 9,
          title: "BSC Perspectives Config",
          titleAr: "تهيئة محاور بطاقة الأداء",
          path: "/bsc-config",
        }}
        nextStage={{
          stage: 11,
          title: "KPI Dictionary & Targets",
          titleAr: "قاموس المؤشرات والمستهدفات",
          path: "/kpis",
        }}
        relatedLinks={[
          { title: "Corporate Objectives", titleAr: "الأهداف المؤسسية", path: "/objectives" },
          { title: "Departmental Cascade", titleAr: "المواءمة الإدارية", path: "/departmental-cascade" },
          { title: "Strategy Matrix", titleAr: "مصفوفة الاستراتيجية", path: "/strategy" },
        ]}
      />
    </div>
  );
};
