import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  BookOpen,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Layers,
  Sparkles,
  Link2,
  ExternalLink,
  Target,
  ShieldAlert,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SwotItem {
  id: string;
  category: 'Strengths' | 'Weaknesses' | 'Opportunities' | 'Threats';
  title: string;
  titleAr: string;
  evidence: string;
  evidenceAr: string;
  impact: 'High' | 'Critical' | 'Medium';
  strategicIssueId?: string;
  strategicIssueTitle?: string;
  strategicIssueTitleAr?: string;
}

export const StrategicDiagnosisPage: React.FC = () => {
  const { lang, t } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'Strengths' | 'Weaknesses' | 'Opportunities' | 'Threats'>('all');
  const [selectedSwotItem, setSelectedSwotItem] = useState<SwotItem | null>(null);

  // Mandate References
  const mandates = [
    {
      code: 'ROYAL-DECREE-A142',
      title: 'Royal Decree No. (A/142) Establishing Al-Ahsa Development Authority',
      titleAr: 'الأمر الملكي رقم (أ/142) القاضي بإنشاء هيئة تطوير محافظة الأحساء',
      mandateScope: 'Regional spatial planning, economic diversification, heritage preservation, municipal harmonization.',
      mandateScopeAr: 'التخطيط المكاني الشامل، والتنويع الاقتصادي، والحفاظ على التراث، والمواءمة البلدية.',
      officialDate: 'Shawwal 1443H',
    },
    {
      code: 'VISION-2030-QOL',
      title: 'Saudi Vision 2030 Quality of Life & Tourism Strategy',
      titleAr: 'برنامج جودة الحياة والاستراتيجية الوطنية للسياحة رؤية 2030',
      mandateScope: 'Targeting 100M+ visitors nationwide, activating UNESCO World Heritage oasis sites.',
      mandateScopeAr: 'استهداف أكثر من 100 مليون زيارة وطنية، وتفعيل مواقع التراث العالمي لليونسكو في الواحة.',
      officialDate: 'Cabinet Resolution 2016',
    },
  ];

  // Stakeholder Needs
  const stakeholders = [
    {
      group: 'Oasis Residents & Community',
      groupAr: 'سكان الواحة والمجتمع المحلي',
      need: 'High-quality recreational green corridors, modern infrastructure, and preservation of local cultural identity.',
      needAr: 'ممرات خضراء ترفيهية عالية الجودة، وبنية تحتية حديثة، والحفاظ على الهوية الثقافية الأصيلة.',
      priority: 'Essential',
    },
    {
      group: 'Private Investors & Hospitality Operators',
      groupAr: 'المستثمرون ومشغلو الضيافة والسياحة',
      need: 'Streamlined licensing, clear zoning incentives, and public-private co-investment in eco-resorts.',
      needAr: 'تسهيل التراخيص، وحوافز استثمارية واضحة، وشراكات استثمارية مشتركة في المنتجعات البيئية.',
      priority: 'High Impact',
    },
    {
      group: 'UNESCO World Heritage Committee',
      groupAr: 'لجنة التراث العالمي لليونسكو',
      need: 'Strict preservation of the living evolving cultural landscape and agricultural canal buffers.',
      needAr: 'حماية صارمة للمشهد الثقافي المتطور الحي وشبكات قنوات الري الزراعية العريقة.',
      priority: 'Mandatory Compliance',
    },
  ];

  // SWOT Findings
  const swotFindings: SwotItem[] = [
    {
      id: 'swot-w1',
      category: 'Weaknesses',
      title: 'Fragmented Spatial Planning & Buffer Zone Encroachment',
      titleAr: 'تشتت التخطيط المكاني وتداخل النطاقات العمرانية مع الواحة',
      evidence: 'Urban Growth Audit Report 2025 (Doc #AUD-SP-2025)',
      evidenceAr: 'تقرير تدقيق النمو العمراني 2025 (وثيقة #AUD-SP-2025)',
      impact: 'Critical',
      strategicIssueId: 'ISSUE-01',
      strategicIssueTitle: 'Absence of unified spatial zoning regulations threatens UNESCO cultural heritage perimeter.',
      strategicIssueTitleAr: 'غياب ضوابط التخطيط المكاني الموحد يهدد النطاق المحمي لتراث اليونسكو.',
    },
    {
      id: 'swot-s1',
      category: 'Strengths',
      title: "World's Largest Oasis (2.5M Palms) & UNESCO Living Heritage",
      titleAr: 'أكبر واحة نخيل في العالم (2.5 مليون نخلة) وموقع تراث عالمي حي',
      evidence: 'UNESCO Inscription Dossier #1563 & Regional GIS Survey',
      evidenceAr: 'ملف تسجيل اليونسكو #1563 والمسح الجغرافي الإقليمي GIS',
      impact: 'Critical',
      strategicIssueId: 'ISSUE-02',
      strategicIssueTitle: 'Untapped potential in world-class agri-tourism and eco-luxury hospitality.',
      strategicIssueTitleAr: 'طاقات غير مستغلة بالكامل في السياحة الزراعية العالمية والضيافة البيئية الفاخرة.',
    },
    {
      id: 'swot-o1',
      category: 'Opportunities',
      title: 'Surging Domestic & GCC Heritage Tourism Demand',
      titleAr: 'نمو متسارع في الطلب السياحي التراثي من السوق المحلي ودول الخليج',
      evidence: 'Ministry of Tourism Inbound Market Analytics 2025',
      evidenceAr: 'بيانات وزارة السياحة لتحليل حركة السياحة الوافدة 2025',
      impact: 'High',
      strategicIssueId: 'ISSUE-03',
      strategicIssueTitle: 'Accelerate curated seasonal cultural festivals and boutique heritage hotels.',
      strategicIssueTitleAr: 'تسريع تدشين المهرجانات الثقافية النوعية والفنادق التراثية المصغرة.',
    },
    {
      id: 'swot-t1',
      category: 'Threats',
      title: 'Groundwater Table Depletion and Farm Abandonment Risk',
      titleAr: 'تراجع منسوب المياه الجوفية ومخاطر هجر المزارع التراثية',
      evidence: 'Ministry of Environment & Water Hydrological Report 2024',
      evidenceAr: 'تقرير وزارة البيئة والمياه الهيدرولوجي 2024',
      impact: 'Critical',
      strategicIssueId: 'ISSUE-04',
      strategicIssueTitle: 'Need for sustainable agricultural subsidies and treated water circulation.',
      strategicIssueTitleAr: 'ضرورة تبني حزم دعم للمزارعين وتوسيع شبكات المياه المعالجة.',
    },
  ];

  const filteredSwot =
    activeTab === 'all'
      ? swotFindings
      : swotFindings.filter((s) => s.category === activeTab);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400 mb-1">
              <span className="font-bold uppercase text-emerald-400">
                {lang === 'ar' ? 'المرحلة 6 من 20 • مسار العرض' : 'STEP 6 OF 20 • DEMO JOURNEY'}
              </span>
              <span className="text-slate-500">/</span>
              <span>{lang === 'ar' ? 'التشخيص الاستراتيجي' : 'Strategic Diagnosis'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {lang === 'ar'
                ? 'التشخيص الاستراتيجي وتتبع الأدلة الإثباتية'
                : 'Strategic Diagnosis, Mandates & Issue Traceability'}
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {lang === 'ar'
                ? 'حصر الأوامر السامية ووثائق التكليف، واحتياجات أصحاب المصلحة، ومخرجات تحليل SWOT مع تتبع النتائج إلى قضايا استراتيجية تتطلب تدخلاً مؤسسياً.'
                : 'Capture statutory mandates, stakeholder needs, and SWOT findings, tracing every finding directly to a strategic issue requiring a formal strategic response.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/strategic-prioritization')}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>{lang === 'ar' ? 'الانتقال إلى مصفوفة الأولويات (Step 7) ➔' : 'Next: Prioritization Matrix (Step 7) ➔'}</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Metadata Stats */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'مراجع التكليف المعتمدة' : 'Statutory Mandates'}
            </span>
            <span className="font-bold text-white">2 Royal & Cabinet Decrees</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'فئات أصحاب المصلحة' : 'Stakeholder Groups'}
            </span>
            <span className="font-bold text-teal-300">3 Key Segments Surveyed</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'نتائج SWOT الموثقة' : 'Verified SWOT Items'}
            </span>
            <span className="font-bold text-emerald-400">4 Critical Insights</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">
              {lang === 'ar' ? 'القضايا الاستراتيجية المشتقة' : 'Strategic Issues'}
            </span>
            <span className="font-bold text-amber-300">4 Prioritized Issues</span>
          </div>
        </div>
      </div>

      {/* Grid: Mandates & Stakeholder Needs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mandate References */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <BookOpen className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'وثائق ومراجع التكليف المؤسسي (Mandates)' : 'Statutory Mandates & Institutional Charter'}
            </h2>
          </div>

          <div className="space-y-3">
            {mandates.map((m) => (
              <div key={m.code} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800">
                    {m.code}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{m.officialDate}</span>
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {lang === 'ar' ? m.titleAr : m.title}
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  {lang === 'ar' ? m.mandateScopeAr : m.mandateScope}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stakeholder Needs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Users className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? 'احتياجات وتطلعات أصحاب المصلحة' : 'Stakeholder Voice & Regional Needs'}
            </h2>
          </div>

          <div className="space-y-3">
            {stakeholders.map((s, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? s.groupAr : s.group}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {s.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {lang === 'ar' ? s.needAr : s.need}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SWOT Matrix with Interactive Traceability to Strategic Issues (Client Requirement: "Trace a finding to a strategic issue requiring a response") */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-600" />
              <span>{lang === 'ar' ? 'مصفوفة SWOT وتتبع القضايا الاستراتيجية' : 'SWOT Analysis & Strategic Issue Traceability Matrix'}</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {lang === 'ar'
                ? 'انقر على أي نتيجة في SWOT لمعاينة سلسلة التتبع إلى القضية الاستراتيجية وخيار التدخل المطلوب'
                : 'Click any SWOT finding below to trace it to its root strategic issue and mandatory response'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['all', 'Strengths', 'Weaknesses', 'Opportunities', 'Threats'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : tab}
              </button>
            ))}
          </div>
        </div>

        {/* SWOT Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSwot.map((item) => {
            const isSelected = selectedSwotItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedSwotItem(item)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-500 ring-2 ring-teal-400/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    item.category === 'Strengths'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.category === 'Weaknesses'
                      ? 'bg-rose-100 text-rose-800'
                      : item.category === 'Opportunities'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.category.toUpperCase()}
                  </span>

                  <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-bold">
                    {item.impact} Impact
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900">
                  {lang === 'ar' ? item.titleAr : item.title}
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                  <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    <strong>{lang === 'ar' ? 'الدليل الإثباتي:' : 'Evidence:'}</strong>{' '}
                    {lang === 'ar' ? item.evidenceAr : item.evidence}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-teal-700 font-semibold">
                  <span>{lang === 'ar' ? 'تتبع القضية الاستراتيجية ➔' : 'Trace to Strategic Issue ➔'}</span>
                  <span className="font-mono text-[10px] text-slate-400">{item.strategicIssueId}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Traceability Card Callout */}
        {selectedSwotItem && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 via-slate-50 to-blue-50 border-2 border-teal-500 animate-in fade-in space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-bold uppercase font-mono text-teal-800">
                  {lang === 'ar' ? 'سلسلة التتبع من التشخيص إلى القضية الاستراتيجية' : 'Verified Traceability Lineage'}
                </span>
              </div>
              <span className="text-[10px] font-mono bg-teal-600 text-white px-2 py-0.5 rounded font-bold">
                TRACE LINK VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">1. Diagnostic Finding</span>
                <span className="font-semibold text-slate-800 block mt-1">
                  {lang === 'ar' ? selectedSwotItem.titleAr : selectedSwotItem.title}
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">2. Documented Evidence</span>
                <span className="text-slate-700 block mt-1 font-mono text-[11px]">
                  {lang === 'ar' ? selectedSwotItem.evidenceAr : selectedSwotItem.evidence}
                </span>
              </div>

              <div className="p-3 bg-teal-50/80 rounded-lg border border-teal-300">
                <span className="text-[10px] font-mono text-teal-800 uppercase block font-bold">3. Resulting Strategic Issue</span>
                <span className="font-bold text-teal-900 block mt-1">
                  {lang === 'ar' ? selectedSwotItem.strategicIssueTitleAr : selectedSwotItem.strategicIssueTitle}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => {
                  toast.success(
                    lang === 'ar'
                      ? `تم تحويل القضية ${selectedSwotItem.strategicIssueId} إلى مصفوفة المفاضلة وتحديد الأولويات`
                      : `Transferred ${selectedSwotItem.strategicIssueId} into Strategic Prioritization Matrix`
                  );
                  navigate('/strategic-prioritization');
                }}
                className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>{lang === 'ar' ? 'توجيه لمصفوفة المفاضلة (Step 7) ➔' : 'Forward to Prioritization Matrix (Step 7) ➔'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
