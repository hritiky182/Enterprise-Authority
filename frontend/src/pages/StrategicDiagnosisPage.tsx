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
  MoreVertical,
  Plus,
  Filter,
  BarChart2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { StrategicLifecycleProgression } from '../components/common/StrategicLifecycleProgression';

interface DiagnosisItem {
  id: string;
  name: string;
  nameAr: string;
  status: 'active' | 'warning' | 'critical' | 'resolved';
  evidence: string;
  evidenceAr: string;
  strategicIssue: string;
  strategicIssueAr: string;
}

export const StrategicDiagnosisPage: React.FC = () => {
  const { lang, t } = useApp();
  const navigate = useNavigate();

  // Mode: 'swot' | 'pestel' | 'mandates'
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'swot' | 'pestel' | 'mandates'>('swot');

  // Search queries per quadrant
  const [searchQueries, setSearchQueries] = useState<Record<string, string>>({
    strengths: '',
    weaknesses: '',
    opportunities: '',
    threats: '',
    political: '',
    economic: '',
    social: '',
    technological: '',
    environmental: '',
    legal: '',
  });

  const handleSearchChange = (key: string, val: string) => {
    setSearchQueries((prev) => ({ ...prev, [key]: val }));
  };

  // SWOT Datasets
  const [swotData, setSwotData] = useState<Record<'strengths' | 'weaknesses' | 'opportunities' | 'threats', DiagnosisItem[]>>({
    strengths: [
      {
        id: 's-1',
        name: "World's Largest Oasis (2.5M Palms) & UNESCO Living Heritage",
        nameAr: 'أكبر واحة نخيل في العالم (2.5 مليون نخلة) وموقع تراث عالمي لليونسكو',
        status: 'active',
        evidence: 'UNESCO Inscription Dossier #1563 & Regional GIS Survey',
        evidenceAr: 'ملف تسجيل اليونسكو #1563 والمسح الجغرافي الإقليمي GIS',
        strategicIssue: 'Harness global cultural cachet for luxury eco-tourism destination positioning.',
        strategicIssueAr: 'استثمار المكانة العالمية في تعزيز مكانة الأحساء كوجهة سياحية بيئية وتراثية فاخرة.',
      },
      {
        id: 's-2',
        name: 'Established Traditional Farming & Date Processing Clusters',
        nameAr: 'سلاسل إمداد زراعية راسخة وصناعات تمور تحويلية ذات جودة عالية',
        status: 'active',
        evidence: 'Chamber of Commerce Agri-Business Census 2025',
        evidenceAr: 'إحصاءات الغرفة التجارية للقطاع الزراعي 2025',
        strategicIssue: 'Scale agricultural processing into international export markets.',
        strategicIssueAr: 'توسيع الصناعات التحويلية الزراعية لأسواق التصدير العالمية.',
      },
      {
        id: 's-3',
        name: 'Knowledgeable, Dedicated Local Craftsmen & Creative Community',
        nameAr: 'حرفيون محليون مهرة وشبكة مجتمعية رائدة بالحرف والفنون الشعبية',
        status: 'active',
        evidence: 'UNESCO Creative Cities Network Roster',
        evidenceAr: 'سجل شبكة اليونسكو للمدن المبدعة في الحرف اليدوية',
        strategicIssue: 'Institutionalize creative artisan incubators and regional souks.',
        strategicIssueAr: 'مأسسة حاضنات الحرفيين والأسواق التراثية النوعية.',
      },
      {
        id: 's-4',
        name: 'Strategic Tri-Border Logistics Connectivity (KSA, Qatar, UAE, Bahrain)',
        nameAr: 'موقع لوجستي إقليمي استراتيجي يربط المملكة بقطر والإمارات والبحرين',
        status: 'active',
        evidence: 'National Transport Strategy Regional Corridor Analysis',
        evidenceAr: 'تحليل الممرات التنموية للاستراتيجية الوطنية للنقل',
        strategicIssue: 'Establish regional intermodal dry-port and transit warehousing hub.',
        strategicIssueAr: 'تأسيس ميناء جاف ومركز لوجستي للنقل التكاملي بالمنطقة.',
      },
    ],
    weaknesses: [
      {
        id: 'w-1',
        name: 'Fragmented Spatial Planning & Urban Growth Canal Encroachment',
        nameAr: 'تشتت التخطيط المكاني وتداخل الزحف العمراني مع قنوات الري التاريخية',
        status: 'critical',
        evidence: 'Regional Spatial Audit #AUD-SP-2025',
        evidenceAr: 'تقرير تدقيق التخطيط المكاني الإقليمي #AUD-SP-2025',
        strategicIssue: 'Absence of unified spatial zoning regulations threatens living oasis buffer.',
        strategicIssueAr: 'غياب ضوابط التخطيط المكاني الموحد يهدد النطاق المحمي لتراث الواحة.',
      },
      {
        id: 'w-2',
        name: 'Groundwater Table Depletion and Farm Abandonment Risk',
        nameAr: 'انخفاض مناسيب المياه الجوفية ومخاطر هجر الحيازات الزراعية التقليدية',
        status: 'critical',
        evidence: 'Ministry of Environment Hydrological Survey 2024',
        evidenceAr: 'المسح الهيدرولوجي لوزارة البيئة والمياه 2024',
        strategicIssue: 'Accelerate modern irrigation infrastructure and circular treated water networks.',
        strategicIssueAr: 'تسريع تحديث شبكات الري الدائرية وتدوير المياه المعالجة.',
      },
      {
        id: 'w-3',
        name: 'Limited Luxury Hospitality Keys (Sub-4-Star Accommodation Deficit)',
        nameAr: 'نقص الغرف الفندقية الفاخرة (عجز في مرافق الإيواء ذات الـ 4 و 5 نجوم)',
        status: 'warning',
        evidence: 'Tourism Development Fund Market Feasibility Study',
        evidenceAr: 'دراسة الجدوى الميدانية لصندوق التنمية السياحي',
        strategicIssue: 'Incentivize private hospitality operators through fast-tracked municipal concessions.',
        strategicIssueAr: 'تحفيز مشغلي الفنادق الفاخرة بحزم تسهيلات وتراخيص استثمارية مرنة.',
      },
      {
        id: 'w-4',
        name: 'Incomplete Digital Infrastructure in Heritage Villages',
        nameAr: 'عدم اكتمال البنية التحتية الرقمية والألياف الضوئية في القرى التراثية',
        status: 'warning',
        evidence: 'CITC Regional Coverage Benchmark 2025',
        evidenceAr: 'تقرير هيئة الاتصالات والفضاء والتقنية لتغطية النطاق العريض',
        strategicIssue: 'Roll out high-speed smart connectivity across heritage corridors.',
        strategicIssueAr: 'إطلاق شبكات الجيل الخامس والألياف في المسارات السياحية.',
      },
    ],
    opportunities: [
      {
        id: 'o-1',
        name: 'Surging Domestic & GCC Heritage Tourism Demand (Vision 2030 QoL)',
        nameAr: 'تنامي الطلب السياحي التراثي من مواطني ومقيمي دول الخليج وبرنامج جودة الحياة',
        status: 'active',
        evidence: 'Ministry of Tourism Inbound Market Analytics 2025',
        evidenceAr: 'بيانات وزارة السياحة لتحليل حركة السياحة الوافدة 2025',
        strategicIssue: 'Position Al-Ahsa as the flagship winter seasonal destination.',
        strategicIssueAr: 'ترسيخ مكانة الأحساء كالوجهة الشتوية التراثية الأولى بالمملكة.',
      },
      {
        id: 'o-2',
        name: 'Public-Private Co-Investment in Eco-Agri Resorts & Date Byproducts',
        nameAr: 'فرص الاستثمار المشترك مع القطاع الخاص بالمنتجعات البيئية وصناعات التمور',
        status: 'active',
        evidence: 'PIF Regional Co-Investment Platform',
        evidenceAr: 'منصة استثمارات الصناديق التنموية الإقليمية',
        strategicIssue: 'Launch structured PPP packages for heritage sites and canal retreats.',
        strategicIssueAr: 'طرح حزم مشاريع الشراكة بين القطاعين العام والخاص للمواقع التراثية.',
      },
      {
        id: 'o-3',
        name: 'UNESCO Living Lab for Sustainable Dryland Agriculture',
        nameAr: 'تحويل الواحة إلى مختبر حي معتمد لليونسكو في الزراعة المستدامة للمناطق الجافة',
        status: 'active',
        evidence: 'FAO & UNESCO Collaborative Concept Note',
        evidenceAr: 'المذكرة التوجيهية المشتركة لمنظمة الأغذية والزراعة واليونسكو',
        strategicIssue: 'Attract international climate-resilience research funds and talent.',
        strategicIssueAr: 'استقطاب مراكز الأبحاث الدولية المعنية بالزراعة الصحراوية المبتكرة.',
      },
    ],
    threats: [
      {
        id: 't-1',
        name: 'Extreme Climate Heatwaves & Prolonged Regional Drought',
        nameAr: 'موجات الحرارة الشديدة وتغير المناخ وتوالي فترات الجفاف الموسمي',
        status: 'critical',
        evidence: 'National Center for Meteorology Regional Heat Index',
        evidenceAr: 'مؤشر درجات الحرارة للمركز الوطني للأرصاد',
        strategicIssue: 'Mandate climate-resilient oasis micro-climate mitigation standards.',
        strategicIssueAr: 'تطبيق اشتراطات تخفيف الجزر الحرارية وتكثيف الأحزمة الخضراء.',
      },
      {
        id: 't-2',
        name: 'Competition from Gulf Regional Cultural Tourism Destinations',
        nameAr: 'المنافسة المتسارعة من وجهات السياحة الثقافية الخليجية المجاورة',
        status: 'warning',
        evidence: 'GCC Regional Tourism Benchmarking Report 2025',
        evidenceAr: 'تقرير المقارنة المعيارية للوجهات السياحية الخليجية 2025',
        strategicIssue: 'Differentiate with authentic living agricultural oasis experiences.',
        strategicIssueAr: 'التميز بتجربة واحة النخيل التراثية الحية المتفردة عالمياً.',
      },
      {
        id: 't-3',
        name: 'Uncontrolled Industrial Logistics Traffic Damaging Historical Routes',
        nameAr: 'مرور الشاحنات الثقيلة غير المنظم عبر الطرق التاريخية والمواقع التراثية',
        status: 'critical',
        evidence: 'Traffic Safety & Heritage Structural Survey',
        evidenceAr: 'مسح السلامة المرورية وسلامة المباني الطينية التاريخية',
        strategicIssue: 'Enforce bypass arterial highways and restrictive heavy-vehicle zoning.',
        strategicIssueAr: 'استكمال الطرق الدائرية ومنع مرور الشاحنات بالنطاقات المحمية.',
      },
    ],
  });

  // PESTEL Datasets
  const [pestelData, setPestelData] = useState<Record<'political' | 'economic' | 'social' | 'technological' | 'environmental' | 'legal', DiagnosisItem[]>>({
    political: [
      {
        id: 'p-1',
        name: 'Establishment of Al-Ahsa Development Authority by Royal Decree A/142',
        nameAr: 'صدور الأمر الملكي رقم أ/142 بإنشاء هيئة تطوير محافظة الأحساء',
        status: 'active',
        evidence: 'Royal Decree Official Gazette 1443H',
        evidenceAr: 'جريدة أم القرى الرسمية لعام 1443هـ',
        strategicIssue: 'Full empowerment for cross-sector regional orchestration.',
        strategicIssueAr: 'تمكين تنظيمي كامل لقيادة وتنسيق المشاريع التنموية الكبرى.',
      },
      {
        id: 'p-2',
        name: 'National Spatial Strategy 2030 Prioritization for Eastern Province',
        nameAr: 'أولويات الاستراتيجية العمرانية الوطنية 2030 للمنطقة الشرقية',
        status: 'active',
        evidence: 'Council of Ministers Resolution 2022',
        evidenceAr: 'قرارات مجلس الوزراء للاستراتيجية العمرانية',
        strategicIssue: 'Harmonize local master plans with national spatial growth corridors.',
        strategicIssueAr: 'مواءمة المخططات المحلية مع محاور النمو العمراني الوطني.',
      },
    ],
    economic: [
      {
        id: 'e-1',
        name: 'Economic Diversification Away from Oil Monoculture',
        nameAr: 'تسريع التنويع الاقتصادي الإقليمي وتقليل الاعتماد على قطاع النفط التقليدي',
        status: 'active',
        evidence: 'Ministry of Economy & Planning Sector Reports',
        evidenceAr: 'تقارير وزارة الاقتصاد والتخطيط للتنمية القطاعية',
        strategicIssue: 'Boost tourism and agro-business contribution to Regional GDP by 35%.',
        strategicIssueAr: 'رفع مساهمة السياحة والصناعات الزراعية في الناتج المحلي الإقليمي بنسبة 35%.',
      },
      {
        id: 'e-2',
        name: 'Inflationary Pressures on Infrastructure Construction Materials',
        nameAr: 'الضغوط التضخمية وتذبذب تكاليف مواد البناء والمقاولات للبنية التحتية',
        status: 'warning',
        evidence: 'Saudi Contractors Authority Cost Index',
        evidenceAr: 'مؤشر تكاليف البناء للهيئة السعودية للمقاولين',
        strategicIssue: 'Adopt value engineering and modular infrastructure procurement.',
        strategicIssueAr: 'تبني الهندسة القيمية ونماذج الشراء المجمعة للمشاريع.',
      },
    ],
    social: [
      {
        id: 's-soc-1',
        name: 'Growing Youth Demographic Seeking High-Skill Employment',
        nameAr: 'نمو الفئة الشابة الطموحة وتزايد الطلب على وظائف نوعية متقدمة',
        status: 'active',
        evidence: 'General Authority for Statistics Regional Census',
        evidenceAr: 'بيانات الهيئة العامة للإحصاء للتوزيع السكاني',
        strategicIssue: 'Develop vocational tourism, GIS, and modern agriculture academies.',
        strategicIssueAr: 'تأسيس أكاديميات متخصصة بالسياحة والتقنيات المكانية والزراعية.',
      },
      {
        id: 's-soc-2',
        name: 'High Community Pride and Attachment to Cultural Heritage',
        nameAr: 'الاعتزاز المجتمعي الراسخ والارتباط العميق بالهوية الثقافية والتراثية',
        status: 'active',
        evidence: 'Community Consultation Survey (AHDA 2025)',
        evidenceAr: 'استطلاع المشاركة المجتمعية لهيئة تطوير الأحساء 2025',
        strategicIssue: 'Engage local families in authentic community-based tourism.',
        strategicIssueAr: 'إشراك الأسر والتعاونيات في إدارة وتشغيل مسارات السياحة التراثية.',
      },
    ],
    technological: [
      {
        id: 't-tech-1',
        name: 'Deployment of Regional Digital Twin & IoT Oasis Monitoring',
        nameAr: 'تطبيق التوأم الرقمي الإقليمي وحساسات إنترنت الأشياء (IoT) لحماية الواحة',
        status: 'active',
        evidence: 'DGA Smart Cities Transformation Framework',
        evidenceAr: 'إطار هيئة الحكومة الرقمية للمدن الذكية',
        strategicIssue: 'Real-time telemetry for canal water levels and urban encroachment.',
        strategicIssueAr: 'رصد فوري لمناسيب المياه ومنع التعديات على النطاق الزراعي.',
      },
    ],
    environmental: [
      {
        id: 'e-env-1',
        name: 'Preservation of the UNESCO World Heritage Oasis Cultural Landscape',
        nameAr: 'حماية واستدامة المشهد الثقافي لواحة الأحساء المسجلة باليونسكو',
        status: 'critical',
        evidence: 'National Center for Environmental Compliance Audits',
        evidenceAr: 'تقارير المركز الوطني للرقابة على الالتزام البيئي',
        strategicIssue: 'Zero-tolerance zoning against destruction of palm groves and canal buffers.',
        strategicIssueAr: 'تطبيق صارم لمنع تجريف النخيل وإعادة تأهيل العيون المائية التاريخية.',
      },
    ],
    legal: [
      {
        id: 'l-1',
        name: 'Comprehensive Regulatory Zoning and Building Permitting Mandates',
        nameAr: 'ضوابط البناء والتراخيص التخطيطية الموحدة للمحافظة',
        status: 'active',
        evidence: 'AHDA Executive Regulation Decree 2025',
        evidenceAr: 'اللائحة التنفيذية المعتمدة لهيئة تطوير الأحساء 2025',
        strategicIssue: 'Full legal clarity for investors and strict protection of historic core.',
        strategicIssueAr: 'وضوح قانوني كامل للمستثمرين مع حماية مشددة للقلب التاريخي.',
      },
    ],
  });

  // Helper for Status Dot
  const renderStatusDot = (status: DiagnosisItem['status']) => {
    switch (status) {
      case 'active':
        return <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs" title="Positive / On Track" />;
      case 'warning':
        return <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-xs" title="Medium Risk / Attention Required" />;
      case 'critical':
        return <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-xs" title="Critical Issue / High Impact" />;
      case 'resolved':
        return <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-xs" title="Controlled" />;
    }
  };

  // Helper to render Corporater SWOT row
  const renderSwotRow = (
    key: 'strengths' | 'weaknesses' | 'opportunities' | 'threats',
    letter: string,
    titleEn: string,
    titleAr: string,
    descEn: string,
    descAr: string,
    colorTheme: { bg: string; text: string; border: string; tileBg: string },
    monthlyCounts: { month: string; count: number }[]
  ) => {
    const query = (searchQueries[key] || '').toLowerCase();
    const items = swotData[key].filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.nameAr.includes(query) ||
        item.evidence.toLowerCase().includes(query)
    );

    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col lg:flex-row items-stretch">
        {/* Left Definition Tile (Corporater Style) */}
        <div className="w-full lg:w-72 p-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 bg-slate-50/40 flex flex-col justify-start">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl shadow-xs text-white ${colorTheme.tileBg}`}>
              {letter}
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide text-slate-900 uppercase">
                {lang === 'ar' ? titleAr : titleEn}
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {items.length} {lang === 'ar' ? 'عناصر محددة' : 'Factors Identified'}
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            {lang === 'ar' ? descAr : descEn}
          </p>
        </div>

        {/* Center Searchable Table (Corporater Style) */}
        <div className="flex-1 p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80">
          <div>
            <div className="relative mb-3">
              <Search className={`w-3.5 h-3.5 absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
              <input
                type="text"
                value={searchQueries[key]}
                onChange={(e) => handleSearchChange(key, e.target.value)}
                placeholder={lang === 'ar' ? 'البحث في الجدول...' : 'Search table...'}
                className={`w-full ${lang === 'ar' ? 'pr-9 pl-3' : 'pl-9 pr-3'} py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-y border-slate-200/70 text-slate-500 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-2 px-3 font-semibold">{lang === 'ar' ? 'اسم العنصر / العامل' : 'NAME'}</th>
                    <th className="py-2 px-3 font-semibold text-center w-20">{lang === 'ar' ? 'الحالة' : 'STATUS'}</th>
                    <th className="py-2 px-2 text-center w-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-slate-400 text-xs italic">
                        {lang === 'ar' ? 'لا توجد نتائج مطابقة' : 'No matching items found'}
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {lang === 'ar' ? item.nameAr : item.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {lang === 'ar' ? item.evidenceAr : item.evidence}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {renderStatusDot(item.status)}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <button
                            onClick={() => toast.info(lang === 'ar' ? `القضية الاستراتيجية: ${item.strategicIssueAr}` : `Strategic Issue: ${item.strategicIssue}`)}
                            className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                            title={lang === 'ar' ? 'عرض القضية الاستراتيجية' : 'View strategic issue'}
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Metric Bar Chart (Corporater Style) */}
        <div className="w-full lg:w-48 p-5 bg-slate-50/20 flex flex-col justify-center">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
            {lang === 'ar' ? 'العناصر الموثقة' : 'IDENTIFIED'}
          </div>
          <div className="space-y-2">
            {monthlyCounts.map((m) => (
              <div key={m.month} className="flex items-center gap-2 text-[11px] font-mono">
                <span className="w-8 text-slate-500 font-medium">{m.month}</span>
                <div className="flex-1 bg-slate-100 h-3 rounded overflow-hidden">
                  <div
                    className="h-full bg-slate-600 rounded"
                    style={{ width: `${Math.min(100, m.count * 10)}%` }}
                  />
                </div>
                <span className="w-4 text-slate-700 font-bold text-end">{m.count}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-2 px-1">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Top Header & Breadcrumb */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-700 mb-1">
            <span className="font-bold uppercase text-emerald-600">
              {lang === 'ar' ? 'المرحلة 6 من 20 • دورة حياة الاستراتيجية' : 'STAGE 6 OF 20 • STRATEGIC LIFECYCLE'}
            </span>
            <span className="text-slate-300">/</span>
            <span>{lang === 'ar' ? 'تحليل البيئة الاستراتيجية' : 'SWOT & PESTEL Strategic Diagnosis'}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {lang === 'ar' ? 'التشخيص الاستراتيجي المؤسسي (SWOT & PESTEL)' : 'Corporate Strategic Diagnosis (SWOT & PESTEL)'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === 'ar'
              ? 'تحليل متكامل للبيئة الداخلية (نقاط القوة والضعف) والبيئة الخارجية (الفرص والمخاطر ومحاور PESTEL) المعتمدة لهيئة تطوير الأحساء.'
              : 'Enterprise assessment of internal attributes and external environment with full traceability to strategic issues.'}
          </p>
        </div>

        {/* View Switcher Tabs (Corporater Style) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveAnalysisTab('swot')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeAnalysisTab === 'swot'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SWOT Analysis
            </button>
            <button
              onClick={() => setActiveAnalysisTab('pestel')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeAnalysisTab === 'pestel'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              PESTEL Analysis
            </button>
            <button
              onClick={() => setActiveAnalysisTab('mandates')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeAnalysisTab === 'mandates'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'التكليفات وأصحاب المصلحة' : 'Mandates & Stakeholders'}
            </button>
          </div>

          <button
            onClick={() => navigate('/strategic-prioritization')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>{lang === 'ar' ? 'المتابعة: مصفوفة الأولويات' : 'Next: Prioritization'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* SWOT TAB CONTENT (Direct Alignment with Client Image 1) */}
      {activeAnalysisTab === 'swot' && (
        <div className="space-y-4">
          {renderSwotRow(
            'strengths',
            'S',
            'STRENGTHS',
            'نقاط القوة',
            'Strengths are the internal resources and capabilities within Al-Ahsa Development Authority that provide competitive regional advantage and sustainable heritage value.',
            'نقاط القوة هي الموارد والقدرات المؤسسية الداخلية التي توفر ميزة تنموية وتراثية مستدامة تعزز ريادة الواحة.',
            { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', tileBg: 'bg-blue-600' },
            [
              { month: 'Sep', count: 5 },
              { month: 'Oct', count: 6 },
              { month: 'Nov', count: 7 },
              { month: 'Dec', count: 10 },
            ]
          )}

          {renderSwotRow(
            'weaknesses',
            'W',
            'WEAKNESSES',
            'نقاط الضعف',
            'Weaknesses are internal organizational or spatial constraints that prevent optimal results, requiring corrective interventions and structural capacity building.',
            'نقاط الضعف هي التحديات والقيود المكانية أو التنظيمية الداخلية التي تستلزم تدخلات تصحيحية عاجلة وبناء قدرات مؤسسية.',
            { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', tileBg: 'bg-indigo-600' },
            [
              { month: 'Sep', count: 5 },
              { month: 'Oct', count: 6 },
              { month: 'Nov', count: 7 },
              { month: 'Dec', count: 10 },
            ]
          )}

          {renderSwotRow(
            'opportunities',
            'O',
            'OPPORTUNITIES',
            'الفرص الخارجية',
            'Opportunities are favorable external trends, market shifts, and national Vision 2030 initiatives that the Authority can leverage for transformational socioeconomic impact.',
            'الفرص هي العوامل الخارجية المواتية وبرامج رؤية 2030 التي يمكن للهيئة استثمارها لتحقيق أثر اقتصادي ومجتمعي نوعي.',
            { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', tileBg: 'bg-teal-600' },
            [
              { month: 'Sep', count: 6 },
              { month: 'Oct', count: 7 },
              { month: 'Nov', count: 9 },
              { month: 'Dec', count: 11 },
            ]
          )}

          {renderSwotRow(
            'threats',
            'T',
            'THREATS',
            'التهديدات والمخاطر',
            'Threats are external environmental, climatic, or market risks that could jeopardize heritage preservation or strategic delivery if unmitigated.',
            'التهديدات هي المخاطر المناخية أو البيئية أو التنافسية الخارجية التي قد تهدد استدامة الواحة ما لم تتم إدارتها بحزم.',
            { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', tileBg: 'bg-rose-600' },
            [
              { month: 'Sep', count: 4 },
              { month: 'Oct', count: 5 },
              { month: 'Nov', count: 6 },
              { month: 'Dec', count: 8 },
            ]
          )}
        </div>
      )}

      {/* PESTEL TAB CONTENT */}
      {activeAnalysisTab === 'pestel' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'political', letter: 'P', title: 'POLITICAL', titleAr: 'المحور السياسي والتنظيمي', desc: 'Government directives, royal decrees, Vision 2030 cascades, and inter-agency cooperation frameworks.' },
            { key: 'economic', letter: 'E', title: 'ECONOMIC', titleAr: 'المحور الاقتصادي والاستثماري', desc: 'Regional GDP expansion, public-private partnerships, supply chain costs, and market viability.' },
            { key: 'social', letter: 'S', title: 'SOCIAL', titleAr: 'المحور الاجتماعي والسكاني', desc: 'Community demographics, youth employment, civic engagement, and cultural lifestyle preservation.' },
            { key: 'technological', letter: 'T', title: 'TECHNOLOGICAL', titleAr: 'المحور التقني والرقمي', desc: 'Smart city infrastructure, IoT monitoring of agricultural canals, GIS digital twins, and connectivity.' },
            { key: 'environmental', letter: 'E', title: 'ENVIRONMENTAL', titleAr: 'المحور البيئي والمناخي', desc: 'UNESCO living landscape conservation, water recycling networks, micro-climate heat mitigation.' },
            { key: 'legal', letter: 'L', title: 'LEGAL', titleAr: 'المحور التشريعي والنظامي', desc: 'Spatial zoning regulations, statutory mandates, contract governance, and municipal law.' },
          ].map((item) => {
            const dataList = (pestelData as any)[item.key] as DiagnosisItem[];
            return (
              <div key={item.key} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center shadow-xs">
                      {item.letter}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{lang === 'ar' ? item.titleAr : item.title}</h3>
                      <span className="text-[10px] text-slate-400 font-mono">{dataList.length} Factors Monitored</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500">{item.desc}</p>
                <div className="space-y-2 pt-1">
                  {dataList.map((d) => (
                    <div key={d.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-start justify-between gap-3 text-xs">
                      <div>
                        <div className="font-semibold text-slate-900">{lang === 'ar' ? d.nameAr : d.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{d.evidence}</div>
                      </div>
                      <div className="shrink-0 pt-0.5">{renderStatusDot(d.status)}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MANDATES & STAKEHOLDERS TAB */}
      {activeAnalysisTab === 'mandates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{lang === 'ar' ? 'التكليفات والأوامر السامية المعتمدة' : 'Statutory Mandates & Decrees'}</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1 text-xs">
                <span className="font-mono font-bold text-blue-800 text-[10px]">ROYAL-DECREE-A142</span>
                <div className="font-bold text-slate-900 text-sm">Royal Decree No. (A/142) Establishing Al-Ahsa Development Authority</div>
                <p className="text-slate-600">Regional spatial planning, economic diversification, heritage preservation, municipal harmonization.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                <span className="font-mono font-bold text-purple-700 text-[10px]">VISION-2030-QOL</span>
                <div className="font-bold text-slate-900 text-sm">Saudi Vision 2030 Quality of Life & National Tourism Strategy</div>
                <p className="text-slate-600">Targeting 100M+ visitors nationwide, activating UNESCO World Heritage oasis sites.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'ar' ? 'احتياجات وتطلعات أصحاب المصلحة' : 'Stakeholder Priorities & Expectations'}</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1 text-xs">
                <span className="font-mono font-bold text-emerald-800 text-[10px]">COMMUNITY & RESIDENTS</span>
                <div className="font-bold text-slate-900">Oasis Residents & Community</div>
                <p className="text-slate-600">High-quality recreational green corridors, modern infrastructure, and preservation of local cultural identity.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
                <span className="font-mono font-bold text-teal-700 text-[10px]">PRIVATE INVESTORS</span>
                <div className="font-bold text-slate-900">Hospitality Operators & Agribusiness</div>
                <p className="text-slate-600">Streamlined licensing, clear zoning incentives, and public-private co-investment in eco-resorts.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lifecycle Flow Progression */}
      <StrategicLifecycleProgression
        currentStage={6}
        stageTitle="Strategic Diagnosis"
        stageTitleAr="التشخيص الاستراتيجي المؤسسي"
        prevStage={{ stage: 5, title: 'Planning Cycle', titleAr: 'دورة التخطيط السنوية', path: '/planning-cycle' }}
        nextStage={{ stage: 7, title: 'Prioritization Matrix', titleAr: 'مصفوفة الأولويات', path: '/strategic-prioritization' }}
        relatedLinks={[
          { title: 'Planning Cycle', titleAr: 'دورة التخطيط', path: '/planning-cycle' },
          { title: 'Strategic Prioritization', titleAr: 'تحديد الأولويات', path: '/strategic-prioritization' },
          { title: 'Strategic Identity', titleAr: 'الهوية والركائز', path: '/strategy/identity' },
        ]}
      />
    </div>
  );
};
