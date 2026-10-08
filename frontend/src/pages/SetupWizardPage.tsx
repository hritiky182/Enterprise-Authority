import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Network,
  Target,
  BarChart3,
  Layers,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  ShieldCheck,
  Plus,
  Trash2,
  Eye,
  FileSpreadsheet,
  FileText,
  RotateCcw,
  Landmark,
  Leaf,
  Crown,
  Shield,
  Palette,
  Users,
  Compass,
  Cpu,
  Calculator,
  Calendar,
  DollarSign,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { OrganizationLogo } from '../components/common/OrganizationLogo';
import { StrategicTheme, StrategicObjective, KPI, StrategicInitiative, Department, Role } from '../types';

// Preset Brand Themes
const COLOR_THEMES = [
  { id: 'blue', name: 'Executive Navy', hex: '#1e40af', bg: 'bg-blue-600', ring: 'ring-blue-500' },
  { id: 'emerald', name: 'Oasis Emerald', hex: '#059669', bg: 'bg-emerald-600', ring: 'ring-emerald-500' },
  { id: 'indigo', name: 'Royal Indigo', hex: '#4338ca', bg: 'bg-indigo-600', ring: 'ring-indigo-500' },
  { id: 'teal', name: 'Coastal Teal', hex: '#0f766e', bg: 'bg-teal-600', ring: 'ring-teal-500' },
  { id: 'amber', name: 'Desert Amber', hex: '#d97706', bg: 'bg-amber-600', ring: 'ring-amber-500' },
];

const PRESET_LOGOS = [
  { id: 'ahda-emblem', name: 'AHDA Development Emblem', nameAr: 'شعار هيئة تطوير الأحساء', icon: Landmark },
  { id: 'oasis-palm', name: 'Green Oasis Heritage Palm', nameAr: 'شعار نخلة الواحة التراثية', icon: Leaf },
  { id: 'royal-crest', name: 'Sovereign Royal Crest', nameAr: 'الشعار السيادي الملكي', icon: Crown },
  { id: 'modern-shield', name: 'Executive Shield', nameAr: 'شعار الدرع التنفيذي', icon: Shield },
];

export const SetupWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    lang,
    t,
    organization,
    updateOrganization,
    departments,
    updateDepartment,
    addDepartment,
    themes,
    addStrategyTheme,
    objectives,
    addObjective,
    kpis,
    addKPI,
    initiatives,
    addInitiative,
    updateStrategyPlan,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // CHAPTER 1 STATE (Blank by default per client request!)
  const [orgName, setOrgName] = useState<string>('');
  const [orgNameAr, setOrgNameAr] = useState<string>('');
  const [orgShortCode, setOrgShortCode] = useState<string>('');
  const [orgLogo, setOrgLogo] = useState<string>('ahda-emblem');
  const [orgLogoUrl, setOrgLogoUrl] = useState<string>('');
  const [orgThemeColor, setOrgThemeColor] = useState<string>('blue');
  const [orgVision, setOrgVision] = useState<string>('');
  const [orgVisionAr, setOrgVisionAr] = useState<string>('');
  const [orgMission, setOrgMission] = useState<string>('');
  const [orgMissionAr, setOrgMissionAr] = useState<string>('');
  const [orgBoardChair, setOrgBoardChair] = useState<string>('');
  const [orgCeo, setOrgCeo] = useState<string>('');

  // CHAPTER 2 STATE (Org Structure & Hierarchy)
  const [customSectors, setCustomSectors] = useState<
    { id: string; name: string; nameAr: string; head: string; departments: string[] }[]
  >([]);

  // CHAPTER 3.1 STATE (Strategy Foundation & Pillars)
  const [strategyName, setStrategyName] = useState<string>('');
  const [strategyDuration, setStrategyDuration] = useState<string>('');
  const [strategyStatement, setStrategyStatement] = useState<string>('');
  const [customPillars, setCustomPillars] = useState<
    { id: string; code: string; title: string; titleAr: string; desc: string; color: string }[]
  >([]);

  // CHAPTER 3.2 STATE (Strategic Objectives)
  const [customObjectives, setCustomObjectives] = useState<
    { id: string; code: string; title: string; titleAr: string; pillarCode: string; owner: string; department: string; targetYear: number; desc: string }[]
  >([]);

  // CHAPTER 3.3 STATE (KPIs & Measurement Rules)
  const [customKpis, setCustomKpis] = useState<
    { id: string; code: string; name: string; nameAr: string; objCode: string; formula: string; target: number; actual: number; unit: string; frequency: string; type: 'Leading' | 'Lagging' }[]
  >([]);

  // CHAPTER 3.4 STATE (Initiatives & Projects)
  const [customInitiatives, setCustomInitiatives] = useState<
    { id: string; code: string; title: string; titleAr: string; objCode: string; owner: string; budgetSAR: number; desc: string; milestones: string[] }[]
  >([]);

  // CHAPTER DEFINITIONS FOR THE SIDEBAR
  const CHAPTERS = [
    {
      chapter: 1,
      step: 1,
      title: 'Organization Setup',
      titleAr: 'تهيئة وهوية المنظومة',
      subtitle: 'Name, logo, branding, colors & mission',
      subtitleAr: 'الاسم، الشعار، الألوان، الرؤية، والرسالة',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      chapter: 2,
      step: 2,
      title: 'Organization Hierarchy',
      titleAr: 'الهيكل التنظيمي والصلاحيات',
      subtitle: 'CEO, layers, sectors, departments & roles',
      subtitleAr: 'القيادة، القطاعات، الإدارات، والصلاحيات',
      icon: <Network className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 3,
      title: 'Strategy & Pillars',
      titleAr: 'أسس الاستراتيجية والركائز',
      subtitle: 'Name, duration, statement & themes',
      subtitleAr: 'الاسم، المدى الزمني، والركائز الاستراتيجية',
      icon: <Target className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 4,
      title: 'Strategic Objectives',
      titleAr: 'صياغة الأهداف الاستراتيجية',
      subtitle: 'Objectives under pillars with SMART assist',
      subtitleAr: 'الأهداف التابعة للركائز مع مساعد SMART',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 5,
      title: 'KPIs & Measurement',
      titleAr: 'مؤشرات الأداء وقواعد الاحتساب',
      subtitle: 'Formulas, baselines, targets & frequency',
      subtitleAr: 'المعادلات، خطوط الأساس، والمستهدفات',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 6,
      title: 'Initiatives & Projects',
      titleAr: 'المبادرات الاستراتيجية والمشاريع',
      subtitle: 'Link to objectives, budgets & milestones',
      subtitleAr: 'ربط المبادرات بالأهداف والميزانيات',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      chapter: 4,
      step: 7,
      title: 'Monitoring & Launch',
      titleAr: 'استعراض الأداء وإطلاق المنظومة',
      subtitle: 'Scorecard summary, export & final launch',
      subtitleAr: 'ملخص بطاقة الأداء، التقارير، والإطلاق',
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  // 1-CLICK DEMO AUTO-FILL FUNCTIONS FOR PRESENTER CONVENIENCE
  const fillStep1DemoData = () => {
    setOrgName('Al-Ahsa Development Authority');
    setOrgNameAr('هيئة تطوير محافظة الأحساء');
    setOrgShortCode('AHDA');
    setOrgLogo('ahda-emblem');
    setOrgThemeColor('blue');
    setOrgVision('To establish Al-Ahsa as a global benchmark for sustainable oasis living, UNESCO heritage excellence, and economic prosperity by 2030.');
    setOrgVisionAr('أن تكون الأحساء نموذجاً عالمياً للعيش المستدام في الواحات، والريادة في صون التراث الثقافي لليونسكو، والازدهار الاقتصادي بحلول 2030.');
    setOrgMission('To spearhead integrated spatial planning, unleash heritage and agritourism investments, and elevate citizen quality of life in full harmony with Saudi Vision 2030.');
    setOrgMissionAr('قيادة التخطيط المكاني المنسق، وتحفيز السياحة التراثية والزراعية ذات العائد المرتفع، والارتقاء بجودة حياة المواطنين بمواءمة تامة مع رؤية السعودية 2030.');
    setOrgBoardChair('HRH Prince Saud bin Talal bin Badr Al Saud');
    setOrgCeo('Dr. Faisal Al-Husseini');
    toast.success(lang === 'ar' ? 'تم تعبئة بيانات المنظومة التجريبية بنجاح' : 'Demo Organization Data Loaded!');
  };

  const fillStep2DemoData = () => {
    setCustomSectors([
      {
        id: 'sec-sud',
        name: 'Spatial & Urban Development Sector',
        nameAr: 'قطاع التنمية المكانية والتخطيط الحضري',
        head: 'Eng. Fahad Al-Subaie',
        departments: ['Urban & Regional Planning', 'Heritage Sites Regeneration', 'Infrastructure & Spatial GIS'],
      },
      {
        id: 'sec-ssd',
        name: 'Strategy & Sector Development Sector',
        nameAr: 'قطاع الاستراتيجية والتطوير القطاعي',
        head: 'Sarah Al-Mansoor',
        departments: ['Corporate Strategy & PMO', 'Economic Intelligence & Statistics', 'Partnerships & Investment'],
      },
      {
        id: 'sec-tdmo',
        name: 'Tourism Destination Management Office',
        nameAr: 'مكتب إدارة وتطوير الوجهة السياحية',
        head: 'Dr. Tariq Al-Ghamdi',
        departments: ['Agritourism Experience', 'UNESCO Creative Crafts', 'Events & Cultural Storytelling'],
      },
      {
        id: 'sec-ss',
        name: 'Support Services & Governance Sector',
        nameAr: 'قطاع الخدمات المساندة والحوكمة المؤسسية',
        head: 'Bandar Al-Harbi',
        departments: ['Human Capital', 'Finance & Procurement', 'Digital Innovation & Cybersecurity'],
      },
    ]);
    toast.success(lang === 'ar' ? 'تم تعبئة هيكل المنظومة والقطاعات التجريبية' : 'Demo Organization Structure Loaded!');
  };

  const fillStep3DemoData = () => {
    setStrategyName('AHDA Comprehensive Transformation Strategy 2026-2030');
    setStrategyDuration('2026 - 2030 (5-Year Strategic Horizon)');
    setStrategyStatement('A sovereign spatial roadmap anchoring sustainable regional growth, UNESCO heritage safeguarding, and economic diversification.');
    setCustomPillars([
      {
        id: 'pl-1',
        code: 'PILLAR 01',
        title: 'Economic Diversification & Tourism Growth',
        titleAr: 'النمو الاقتصادي وتطوير السياحة',
        desc: 'Unlocking regional GDP through experiential tourism, agriculture value-chain, and private investment partnerships.',
        color: 'blue',
      },
      {
        id: 'pl-2',
        code: 'PILLAR 02',
        title: 'People, Community & Vibrant Society',
        titleAr: 'المجتمع والارتقاء بجودة الحياة',
        desc: 'Elevating urban living conditions, community spaces, citizen engagement, and recreational green corridors.',
        color: 'teal',
      },
      {
        id: 'pl-3',
        code: 'PILLAR 03',
        title: 'UNESCO Heritage & Oasis Environmental Sustainability',
        titleAr: 'صون واحة اليونسكو والاستدامة البيئية',
        desc: 'Preserving the worlds largest self-contained agricultural oasis and cultural landscape.',
        color: 'emerald',
      },
      {
        id: 'pl-4',
        code: 'PILLAR 04',
        title: 'Governance & Institutional Excellence',
        titleAr: 'الحوكمة والمواءمة والتميز المؤسسي',
        desc: 'Streamlining spatial zoning, inter-agency municipal alignment, and digital governance.',
        color: 'purple',
      },
    ]);
    toast.success(lang === 'ar' ? 'تم تعبئة أسس الاستراتيجية والركائز التجريبية' : 'Demo Strategy Pillars Loaded!');
  };

  const fillStep4DemoData = () => {
    setCustomObjectives([
      {
        id: 'obj-1',
        code: 'SO-01',
        title: 'Elevate Sustainable Heritage & Agri-Tourism Capacity',
        titleAr: 'الارتقاء بالطاقة الاستيعابية للسياحة التراثية والزراعية المستدامة',
        pillarCode: 'PILLAR 01',
        owner: 'Dr. Tariq Al-Ghamdi',
        department: 'Tourism Destination Management Office',
        targetYear: 2026,
        desc: 'Expand premium farm-stays, artisan cultural centers, and achieve 4M annual visitors across Al-Ahsa.',
      },
      {
        id: 'obj-2',
        code: 'SO-02',
        title: 'Foster Civic Dialogue & Regional Quality of Life',
        titleAr: 'تعزيز المشاركة المجتمعية والارتقاء بجودة الحياة الحضرية',
        pillarCode: 'PILLAR 02',
        owner: 'Sarah Al-Mansoor',
        department: 'Strategy & Sector Development',
        targetYear: 2026,
        desc: 'Implement continuous green recreational corridors and community co-creation platforms for urban planning.',
      },
      {
        id: 'obj-3',
        code: 'SO-03',
        title: 'Safeguard UNESCO Living Oasis & Ancient Falaj Canals',
        titleAr: 'صون واحة اليونسكو وإعادة تأهيل شبكات قنوات الري التراثية',
        pillarCode: 'PILLAR 03',
        owner: 'Eng. Fahad Al-Subaie',
        department: 'Spatial & Urban Development',
        targetYear: 2027,
        desc: 'Restore historical irrigation waterways, protect date palm biodiversity, and prevent urban sprawl into farmland.',
      },
      {
        id: 'obj-4',
        code: 'SO-04',
        title: 'Strengthen Spatial Planning Governance & Regulatory Agility',
        titleAr: 'ترسيخ حوكمة التخطيط المكاني واللوائح والضوابط العمرانية',
        pillarCode: 'PILLAR 04',
        owner: 'Bandar Al-Harbi',
        department: 'Support Services & Governance',
        targetYear: 2026,
        desc: 'Harmonize municipal zoning bylaws, streamline investment permitting, and enforce unified spatial standards.',
      },
    ]);
    toast.success(lang === 'ar' ? 'تم تعبئة الأهداف الاستراتيجية التجريبية' : 'Demo Strategic Objectives Loaded!');
  };

  const fillStep5DemoData = () => {
    setCustomKpis([
      {
        id: 'kpi-1',
        code: 'KPI-1.1',
        name: 'Oasis Cultural Visitor Experience Index',
        nameAr: 'مؤشر جودة تجربة زوار المعالم التراثية بالواحة',
        objCode: 'SO-01',
        formula: 'Standardized Visitor Satisfaction Survey (NPS + Criteria / 100)',
        target: 88,
        actual: 84,
        unit: '%',
        frequency: 'Quarterly',
        type: 'Lagging',
      },
      {
        id: 'kpi-2',
        code: 'KPI-2.1',
        name: 'Oasis Residents Satisfaction Score',
        nameAr: 'مؤشر رضا سكان الواحة وجودة الخدمات الحضرية',
        objCode: 'SO-02',
        formula: 'Annual Al-Ahsa Comprehensive Quality of Life Index Score',
        target: 85,
        actual: 81,
        unit: 'Score',
        frequency: 'Annual',
        type: 'Lagging',
      },
      {
        id: 'kpi-3',
        code: 'KPI-3.1',
        name: 'Historical Canal Network Restoration Coverage',
        nameAr: 'نسبة إنجاز ترميم قنوات المياه التراثية والفلج',
        objCode: 'SO-03',
        formula: '(Kilometers of Restored Operational Canals / Total Planned) * 100%',
        target: 80,
        actual: 65,
        unit: '%',
        frequency: 'Monthly',
        type: 'Leading',
      },
      {
        id: 'kpi-4',
        code: 'KPI-4.1',
        name: 'Spatial Zoning Compliance & Permitting Efficiency',
        nameAr: 'معدل الالتزام بالضوابط المكانية وسرعة إصدار التراخيص',
        objCode: 'SO-04',
        formula: 'Percentage of Development Permits compliant with Unified Masterplan',
        target: 95,
        actual: 92,
        unit: '%',
        frequency: 'Quarterly',
        type: 'Leading',
      },
    ]);
    toast.success(lang === 'ar' ? 'تم تعبئة مؤشرات الأداء التجريبية' : 'Demo KPIs & Formulas Loaded!');
  };

  const fillStep6DemoData = () => {
    setCustomInitiatives([
      {
        id: 'init-1',
        code: 'INIT-01',
        title: 'Historic Falaj Canal Revitalization & Eco-Tourism Trails',
        titleAr: 'تأهيل شبكة قنوات الفلج التراثية ومسارات السياحة البيئية',
        objCode: 'SO-03',
        owner: 'Spatial & Urban Development Sector',
        budgetSAR: 18500000,
        desc: 'Civil engineering restoration of 42km of irrigation canals with shaded pedestrian palm walkways and visitor signs.',
        milestones: ['Detailed canal mapping & hydrologic survey', 'Civil restoration of Phase 1 canals', 'Inauguration of public walking trails'],
      },
      {
        id: 'init-2',
        code: 'INIT-02',
        title: 'Al-Ahsa Creative Crafts Incubator & UNESCO Heritage Lodges',
        titleAr: 'حاضنة الحرف الإبداعية ونزل الضيافة التراثية لليونسكو',
        objCode: 'SO-01',
        owner: 'Tourism Destination Management Office',
        budgetSAR: 14000000,
        desc: 'Establishing 12 boutique artisan workshops and providing low-interest financing for farm owners to convert into heritage lodges.',
        milestones: ['Artisan grant program release', 'Zoning bylaws for farm stays', 'Opening of first 6 certified lodges'],
      },
      {
        id: 'init-3',
        code: 'INIT-03',
        title: 'Digital Civic Dialogue & Community Co-Creation Spatial Platform',
        titleAr: 'المنصة الرقمية للتفاعل المجتمعي والمشاركة في التخطيط المكاني',
        objCode: 'SO-02',
        owner: 'Strategy & Sector Development Sector',
        budgetSAR: 7500000,
        desc: 'Interactive civic engagement portal allowing citizens to vote on neighborhood recreational spaces and submit ideas.',
        milestones: ['Portal UX & Absher integration', 'Civic co-creation beta testing', 'Regional launch event'],
      },
    ]);
    toast.success(lang === 'ar' ? 'تم تعبئة المبادرات الاستراتيجية التجريبية' : 'Demo Strategic Initiatives Loaded!');
  };

  // FILL ENTIRE JOURNEY AT ONCE (FOR RAPID DEMONSTRATION)
  const fillAllDemoData = () => {
    fillStep1DemoData();
    fillStep2DemoData();
    fillStep3DemoData();
    fillStep4DemoData();
    fillStep5DemoData();
    fillStep6DemoData();
    toast.success(
      lang === 'ar'
        ? 'تمت تعبئة بيانات الرحلة الاستراتيجية الكاملة بضغطة واحدة!'
        : 'Complete End-to-End Strategic Journey Demo Data Populated!'
    );
  };

  // SAVE ALL CONFIGURATIONS TO LOCAL STORAGE & APP CONTEXT, THEN LAUNCH PLATFORM
  const handleCompleteAndLaunch = () => {
    // 1. Save Organization Config
    updateOrganization({
      name: orgName.trim() || 'Al-Ahsa Development Authority',
      nameAr: orgNameAr.trim() || 'هيئة تطوير محافظة الأحساء',
      shortName: orgShortCode.trim() || 'AHDA',
      shortCode: orgShortCode.trim() || 'AHDA',
      logo: orgLogo || 'ahda-emblem',
      logoUrl: orgLogoUrl,
      themeColor: orgThemeColor || 'blue',
      vision: orgVision.trim() || organization.vision,
      visionAr: orgVisionAr.trim() || organization.visionAr,
      mission: orgMission.trim() || organization.mission,
      missionAr: orgMissionAr.trim() || organization.missionAr,
      boardChair: orgBoardChair.trim() || organization.boardChair,
      ceo: orgCeo.trim() || organization.ceo,
    });

    // 2. Save Strategy Plan
    if (strategyName.trim()) {
      updateStrategyPlan({
        name: strategyName.trim(),
        nameAr: lang === 'ar' ? strategyName.trim() : 'استراتيجية التحول المؤسسي لهيئة تطوير الأحساء',
        duration: strategyDuration.trim() || '2026 - 2030 (5-Year Strategic Horizon)',
        startYear: 2026,
        endYear: 2030,
        statement: strategyStatement.trim() || organization.mission,
      });
    }

    // 3. Save Pillars to AppContext if custom ones were added
    if (customPillars.length > 0) {
      customPillars.forEach((p) => {
        addStrategyTheme({
          code: p.code,
          title: p.title,
          titleAr: p.titleAr,
          description: p.desc,
          descriptionAr: p.desc,
          color: p.color,
          weight: 25,
        });
      });
    }

    // 4. Save Objectives if added
    if (customObjectives.length > 0) {
      customObjectives.forEach((o) => {
        addObjective({
          code: o.code,
          goalId: 'goal-1',
          themeId: themes[0]?.id || 'theme-1',
          themeName: 'Economic Diversification & Tourism Growth',
          title: o.title,
          titleAr: o.titleAr,
          description: o.desc,
          owner: o.owner,
          department: o.department,
          kpiCount: 1,
          targetYear: o.targetYear,
          progress: 25,
          status: 'on-track',
        });
      });
    }

    // 5. Save KPIs if added
    if (customKpis.length > 0) {
      customKpis.forEach((k) => {
        addKPI({
          code: k.code,
          name: k.name,
          nameAr: k.nameAr,
          objectiveId: objectives[0]?.id || 'obj-1',
          objectiveTitle: 'Elevate Sustainable Heritage & Agri-Tourism Capacity',
          owner: 'Eng. Fahad Al-Subaie',
          achievementPct: Math.round((k.actual / k.target) * 100),
          formula: k.formula,
          unit: k.unit,
          target: k.target,
          actual: k.actual,
          frequency: k.frequency as any,
          status: 'on-track',
          type: k.type,
          weight: 25,
        });
      });
    }

    // 6. Save Initiatives if added
    if (customInitiatives.length > 0) {
      customInitiatives.forEach((i) => {
        addInitiative({
          code: i.code,
          title: i.title,
          titleAr: i.titleAr,
          description: i.desc,
          objectiveId: objectives[0]?.id || 'obj-1',
          objectiveTitle: 'Elevate Sustainable Heritage & Agri-Tourism Capacity',
          owner: i.owner,
          department: 'Spatial & Urban Development',
          budgetSAR: i.budgetSAR,
          spentSAR: Math.round(i.budgetSAR * 0.2),
          progress: 20,
          status: 'In Progress',
          risksCount: 0,
          actionsCount: 0,
          startDate: '2026-01-01',
          endDate: '2027-12-31',
          milestones: i.milestones.map((m, idx) => ({
            id: `ms-${Date.now()}-${idx}`,
            title: m,
            dueDate: '2026-12-31',
            completed: idx === 0,
            status: (idx === 0 ? 'Completed' : 'In Progress') as 'Completed' | 'In Progress' | 'Pending',
          })),
        });
      });
    }

    // 7. Mark setup wizard as completed in local storage
    try {
      localStorage.setItem('eda_setup_wizard_done', 'true');
      sessionStorage.setItem('eda_setup_wizard_done', 'true');
    } catch (e) {
      console.warn('Storage write failed', e);
    }

    toast.success(
      lang === 'ar'
        ? 'تم اكتمال رحلة التأسيس بنجاح! جاري الانتقال إلى لوحة قيادة المنظومة...'
        : 'Setup Journey Completed! Launching Enterprise Management Suite...',
      {
        description: lang === 'ar' ? 'تم حفظ كافة بيانات المنظومة والاستراتيجية في النظام.' : 'All organization and strategy settings are live.',
      }
    );

    // Navigate to Executive Dashboard
    navigate('/');
  };

  const handleNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleCompleteAndLaunch();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white"
    >
      {/* Top Wizard Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold">
            <Compass className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
                {lang === 'ar' ? 'معالج تأسيس المنظومة والاستراتيجية' : 'STRATEGY ONBOARDING WIZARD'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {lang === 'ar' ? `الخطوة ${currentStep} من 7` : `Step ${currentStep} of 7`}
              </span>
            </div>
            <h1 className="text-sm font-bold text-white mt-0.5">
              {orgName || (lang === 'ar' ? 'هيئة تطوير محافظة الأحساء' : 'Al-Ahsa Development Authority')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick 1-Click Auto Fill Demo Data */}
          {/* <button
            onClick={fillAllDemoData}
            type="button"
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
            title="Populate complete realistic Al-Ahsa strategy dataset in 1 click"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-100" />
            <span>{lang === 'ar' ? '✨ تعبئة الرحلة الكاملة بالبيانات' : '✨ Fill All Demo Data'}</span>
          </button> */}

          <button
            onClick={() => navigate('/')}
            type="button"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium cursor-pointer transition-colors"
          >
            {lang === 'ar' ? 'تخطي إلى لوحة القيادة' : 'Skip to Dashboard'}
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Step Content */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Left Navigation Sidebar */}
        <aside className="w-80 shrink-0 hidden lg:flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 justify-between">
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                {lang === 'ar' ? 'مراحل رحلة التأسيس الأربعة' : ' DEMO JOURNEY'}
              </div>
              <h2 className="text-sm font-bold text-slate-900">
                {lang === 'ar' ? 'مراحل إعداد المنظومة والاستراتيجية' : 'End-to-End Strategic Flow'}
              </h2>
            </div>

            {/* Stepper Navigation List */}
            <div className="space-y-2">
              {CHAPTERS.map((item) => {
                const isCurrent = currentStep === item.step;
                const isPassed = currentStep > item.step;

                return (
                  <button
                    key={item.step}
                    onClick={() => setCurrentStep(item.step)}
                    className={`w-full text-start p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 border ${isCurrent
                      ? 'bg-blue-50/80 border-blue-200 shadow-xs text-blue-900'
                      : isPassed
                        ? 'bg-slate-50/60 border-slate-200/70 text-slate-700 hover:bg-slate-100'
                        : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
                      }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold font-mono transition-colors ${isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                        }`}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5" /> : item.step}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold truncate ${isCurrent ? 'text-blue-900' : isPassed ? 'text-slate-800' : 'text-slate-500'
                            }`}
                        >
                          {lang === 'ar' ? item.titleAr : item.title}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 uppercase">
                          CH {item.chapter}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {lang === 'ar' ? item.subtitleAr : item.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Progress Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-700">
              <span>{lang === 'ar' ? 'نسبة الإنجاز' : 'Journey Progress'}</span>
              <span>{Math.round((currentStep / 7) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.round((currentStep / 7) * 100)}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {lang === 'ar' ? 'جاهز للاعتماد والإطلاق المباشر' : 'Sovereign governance verified'}
            </div>
          </div>
        </aside>

        {/* Main Form Content Area */}
        <main className="flex-1 flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 min-w-0">
          <div className="space-y-6">
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-600 mb-1">
                  <span className="font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                    {CHAPTERS[currentStep - 1]?.chapter === 1 && (lang === 'ar' ? 'الفصل 1: تأسيس المنظومة' : 'CHAPTER 1: ENTITY SETUP')}
                    {CHAPTERS[currentStep - 1]?.chapter === 2 && (lang === 'ar' ? 'الفصل 2: الهيكل التنظيمي' : 'CHAPTER 2: ORG STRUCTURE')}
                    {CHAPTERS[currentStep - 1]?.chapter === 3 && (lang === 'ar' ? 'الفصل 3: التخطيط الاستراتيجي' : 'CHAPTER 3: STRATEGY PLANNING')}
                    {CHAPTERS[currentStep - 1]?.chapter === 4 && (lang === 'ar' ? 'الفصل 4: المتابعة والتقارير' : 'CHAPTER 4: MONITORING & REPORTS')}
                  </span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-500">{lang === 'ar' ? `المرحلة ${currentStep} من 7` : `Stage ${currentStep} of 7`}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {lang === 'ar' ? CHAPTERS[currentStep - 1]?.titleAr : CHAPTERS[currentStep - 1]?.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ar' ? CHAPTERS[currentStep - 1]?.subtitleAr : CHAPTERS[currentStep - 1]?.subtitle}
                </p>
              </div>

              {/* Step Specific Action Toolbar */}
              <div className="flex items-center gap-2">
                {currentStep === 1 && (
                  <button
                    type="button"
                    onClick={fillStep1DemoData}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'ar' ? 'تعبئة بيانات تجريبية' : 'Fill Demo Data'}</span>
                  </button>
                )}
                {currentStep === 2 && (
                  <button
                    type="button"
                    onClick={fillStep2DemoData}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'ar' ? 'تعبئة الهيكل التجريبي' : 'Fill Demo Structure'}</span>
                  </button>
                )}
                {currentStep === 3 && (
                  <button
                    type="button"
                    onClick={fillStep3DemoData}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'ar' ? 'تعبئة الركائز التجريبية' : 'Fill Demo Pillars'}</span>
                  </button>
                )}
                {currentStep === 4 && (
                  <button
                    type="button"
                    onClick={fillStep4DemoData}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'ar' ? 'تعبئة الأهداف التجريبية' : 'Fill Demo Objectives'}</span>
                  </button>
                )}
                {currentStep === 5 && (
                  <button
                    type="button"
                    onClick={fillStep5DemoData}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'ar' ? 'تعبئة المؤشرات التجريبية' : 'Fill Demo KPIs'}</span>
                  </button>
                )}
                {currentStep === 6 && (
                  <button
                    type="button"
                    onClick={fillStep6DemoData}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{lang === 'ar' ? 'تعبئة المبادرات التجريبية' : 'Fill Demo Initiatives'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* STEP 1: ORGANIZATION / ENTITY SETUP */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'اسم المنظومة (بالإنجليزية)' : 'Organization Legal Name (English)'} *
                    </label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Al-Ahsa Development Authority"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'اسم المنظومة (بالعربية)' : 'Organization Legal Name (Arabic)'} *
                    </label>
                    <input
                      type="text"
                      value={orgNameAr}
                      onChange={(e) => setOrgNameAr(e.target.value)}
                      placeholder="مثال: هيئة تطوير محافظة الأحساء"
                      dir="rtl"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-sans focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'الرمز المختصر' : 'Short Code / Acronym'}
                    </label>
                    <input
                      type="text"
                      value={orgShortCode}
                      onChange={(e) => setOrgShortCode(e.target.value)}
                      placeholder="e.g. AHDA"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'رئيس مجلس الإدارة' : 'Board Chairman'}
                    </label>
                    <input
                      type="text"
                      value={orgBoardChair}
                      onChange={(e) => setOrgBoardChair(e.target.value)}
                      placeholder="e.g. HRH Prince Saud bin Talal"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'الرئيس التنفيذي' : 'Chief Executive Officer'}
                    </label>
                    <input
                      type="text"
                      value={orgCeo}
                      onChange={(e) => setOrgCeo(e.target.value)}
                      placeholder="e.g. Dr. Faisal Al-Husseini"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Logo & Theme Color Picker */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="font-bold text-xs text-slate-900">
                    {lang === 'ar' ? 'الهوية البصرية والألوان المؤسسية' : 'Visual Identity & Branding Tokens'}
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-600 mb-2">
                      {lang === 'ar' ? 'اختيار شعار المنظومة الرسمي' : 'Select Official Emblem Logo'}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {PRESET_LOGOS.map((item) => {
                        const Icon = item.icon;
                        const isSelected = orgLogo === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setOrgLogo(item.id)}
                            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-2 cursor-pointer ${isSelected
                              ? 'bg-white border-blue-600 shadow-xs ring-2 ring-blue-500/20'
                              : 'bg-white/60 border-slate-200 hover:bg-white'
                              }`}
                          >
                            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] font-bold text-slate-800">
                              {lang === 'ar' ? item.nameAr : item.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-slate-600 mb-2">
                      {lang === 'ar' ? 'السمة اللونية للمنصة' : 'Theme Accent Color Palette'}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      {COLOR_THEMES.map((theme) => {
                        const isSelected = orgThemeColor === theme.id;
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => setOrgThemeColor(theme.id)}
                            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${isSelected
                              ? 'bg-white border-slate-900 shadow-xs ring-2 ring-slate-400'
                              : 'bg-white/60 border-slate-200 hover:bg-white text-slate-700'
                              }`}
                          >
                            <div className={`w-4 h-4 rounded-full ${theme.bg}`} />
                            <span>{theme.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Vision & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'الرؤية المؤسسية' : 'Strategic Vision Statement'}
                    </label>
                    <textarea
                      rows={3}
                      value={orgVision}
                      onChange={(e) => setOrgVision(e.target.value)}
                      placeholder="e.g. To establish Al-Ahsa as a global benchmark..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'الرسالة المؤسسية' : 'Strategic Mission Statement'}
                    </label>
                    <textarea
                      rows={3}
                      value={orgMission}
                      onChange={(e) => setOrgMission(e.target.value)}
                      placeholder="e.g. To spearhead integrated spatial planning and tourism..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: ORGANIZATION HIERARCHY & ROLES */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 text-xs text-blue-900 leading-relaxed">
                  {lang === 'ar'
                    ? 'يوضح هذا الفصل هيكلية السلطة والمسؤولية: من مستوى الرئيس التنفيذي إلى القطاعات التشغيلية والإدارات، وتحديد صلاحيات التعديل، المراجعة، والاعتماد.'
                    : 'Establish the governance hierarchy: Board & CEO → Operational Sectors → Specialized Departments → Users & Roles with granular permissions matrix.'}
                </div>

                {/* Hierarchy Cards Preview */}
                <div className="space-y-3">
                  <div className="p-4 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
                        <Crown className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-blue-300 uppercase font-bold">
                          {lang === 'ar' ? 'المستوى السيادي والتنفيذي' : 'EXECUTIVE GOVERNANCE LAYER'}
                        </div>
                        <h4 className="font-bold text-sm">
                          {orgBoardChair || 'HRH Board Chairman'} & {orgCeo || 'Chief Executive Officer'}
                        </h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-blue-800 text-blue-200 px-2 py-0.5 rounded">
                      Ultimate Sign-Off & Approvals
                    </span>
                  </div>

                  {customSectors.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                      <Network className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="font-bold text-sm text-slate-700">
                        {lang === 'ar' ? 'لم يتم إضافة قطاعات تشغيلية بعد' : 'No Operational Sectors Defined Yet'}
                      </div>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        {lang === 'ar'
                          ? 'يمكنك الضغط على زر "تعبئة الهيكل التجريبي" في الأعلى لإدراج القطاعات الخمسة المعتمدة لهيئة تطوير الأحساء.'
                          : 'Click "Fill Demo Structure" above to populate the 4 operational sectors and specialized departments.'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {customSectors.map((sec) => (
                        <div key={sec.id} className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              {lang === 'ar' ? 'قطاع تنفيذي' : 'OPERATIONAL SECTOR'}
                            </span>
                            <span className="text-xs font-mono font-semibold text-slate-500">{sec.head}</span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? sec.nameAr : sec.name}</h4>
                          <div className="text-xs text-slate-500 font-sans">
                            <span className="font-semibold text-slate-700">{lang === 'ar' ? 'الإدارات: ' : 'Departments: '}</span>
                            {sec.departments.join(' • ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Permissions Matrix Recap */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="text-xs font-bold text-slate-900">
                    {lang === 'ar' ? 'مصفوفة الصلاحيات والحوكمة المقترنة' : 'Enforced Permissions & Authority Flow'}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <div className="font-bold text-blue-700">Strategy Specialist</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Formulate & Amend</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <div className="font-bold text-emerald-700">Sector DG</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Review & Endorse</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <div className="font-bold text-purple-700">Strategy Deputy</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Approve & Publish</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <div className="font-bold text-amber-700">CEO & Board</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Executive Mandate</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: STRATEGY BASIC INFO & PILLARS */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'اسم الاستراتيجية' : 'Strategy Plan Name'} *
                    </label>
                    <input
                      type="text"
                      value={strategyName}
                      onChange={(e) => setStrategyName(e.target.value)}
                      placeholder="e.g. AHDA Comprehensive Transformation Strategy 2026-2030"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'المدى الزمني' : 'Strategy Horizon & Duration'} *
                    </label>
                    <input
                      type="text"
                      value={strategyDuration}
                      onChange={(e) => setStrategyDuration(e.target.value)}
                      placeholder="e.g. 2026 - 2030 (5-Year Horizon)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ar' ? 'البيان التوجيهي للاستراتيجية' : 'Strategy Executive Statement'}
                  </label>
                  <textarea
                    rows={2}
                    value={strategyStatement}
                    onChange={(e) => setStrategyStatement(e.target.value)}
                    placeholder="e.g. A sovereign spatial roadmap anchoring sustainable regional growth and UNESCO heritage..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Strategic Pillars List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">
                      {lang === 'ar' ? 'الركائز والمحاور الاستراتيجية' : 'Strategic Pillars & Themes'}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {customPillars.length} {lang === 'ar' ? 'ركائز محددة' : 'Pillars configured'}
                    </span>
                  </div>

                  {customPillars.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                      <Target className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="font-bold text-sm text-slate-700">
                        {lang === 'ar' ? 'لم يتم تحديد ركائز استراتيجية بعد' : 'No Strategic Pillars Configured Yet'}
                      </div>
                      <p className="text-xs text-slate-500">
                        {lang === 'ar'
                          ? 'اضغط على زر "تعبئة الركائز التجريبية" في الأعلى لإضافة ركائز هيئة تطوير الأحساء الأربعة.'
                          : 'Click "Fill Demo Pillars" above to load the 4 strategic pillars.'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {customPillars.map((p) => (
                        <div key={p.id} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-1.5">
                          <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {p.code}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? p.titleAr : p.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: STRATEGIC OBJECTIVES */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <div>
                    {lang === 'ar'
                      ? 'يتم ربط كل هدف استراتيجي بالركيزة المعنية به، مع تحديد المسؤول والإدارة وسنة الاستهداف.'
                      : 'Define measurable strategic objectives directly aligned with strategic pillars, owners, and target years.'}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI SMART Assisted</span>
                  </div>
                </div>

                {customObjectives.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <Layers className="w-8 h-8 text-slate-400 mx-auto" />
                    <div className="font-bold text-sm text-slate-700">
                      {lang === 'ar' ? 'لم يتم إدراج أهداف استراتيجية بعد' : 'No Strategic Objectives Defined Yet'}
                    </div>
                    <p className="text-xs text-slate-500">
                      {lang === 'ar'
                        ? 'اضغط على "تعبئة الأهداف التجريبية" في الأعلى لإدراج الأهداف الأربعة المعتمدة.'
                        : 'Click "Fill Demo Objectives" above to populate the reference objectives.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {customObjectives.map((o) => (
                      <div key={o.id} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {o.code}
                            </span>
                            <span className="text-[10px] font-mono font-semibold text-slate-500">
                              {o.pillarCode}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-500">
                            {lang === 'ar' ? 'المسؤول: ' : 'Owner: '}
                            <strong className="text-slate-800">{o.owner}</strong> ({o.department})
                          </div>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? o.titleAr : o.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{o.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 5: KPIS & MEASUREMENT RULES */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-200 text-xs text-indigo-900 leading-relaxed">
                  {lang === 'ar'
                    ? 'يتم تحديد مؤشرات الأداء ضد كل هدف استراتيجي (الهدف ➔ المؤشر ➔ معادلة القياس ➔ خط الأساس ➔ المستهدف ➔ الفعلي).'
                    : 'Each KPI is defined against an objective: Objective → KPI → Formula → Baseline → Target → Actual.'}
                </div>

                {customKpis.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <BarChart3 className="w-8 h-8 text-slate-400 mx-auto" />
                    <div className="font-bold text-sm text-slate-700">
                      {lang === 'ar' ? 'لم يتم إضافة مؤشرات أداء بعد' : 'No KPIs Defined Yet'}
                    </div>
                    <p className="text-xs text-slate-500">
                      {lang === 'ar'
                        ? 'اضغط على "تعبئة المؤشرات التجريبية" في الأعلى لإدراج المؤشرات وقواعد الاحتساب.'
                        : 'Click "Fill Demo KPIs" above to populate the standard metrics with calculation formulas.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {customKpis.map((k) => (
                      <div key={k.id} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                              {k.code}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                              Linked to {k.objCode} • {k.frequency} • {k.type}
                            </span>
                          </div>
                          <div className="text-xs font-mono font-bold text-slate-900">
                            Target: {k.target} {k.unit} • Actual: {k.actual} {k.unit}
                          </div>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? k.nameAr : k.name}</h4>
                        <div className="p-2 rounded bg-slate-50 border border-slate-200/60 font-mono text-[11px] text-slate-700">
                          <span className="text-slate-400 font-semibold">{lang === 'ar' ? 'معادلة الاحتساب: ' : 'Formula: '}</span>
                          {k.formula}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 6: STRATEGIC INITIATIVES & PROJECTS */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-200 text-xs text-teal-900 leading-relaxed">
                  {lang === 'ar'
                    ? 'المبادرات والمشاريع هي الذراع التنفيذي للأهداف الاستراتيجية: يتم ربط كل مبادرة بهدف معتمد وميزانية وجدول زمني للمعالم.'
                    : 'Transform strategic intent into execution: connect initiatives to objectives, assign budgets, owners, and milestone schedules.'}
                </div>

                {customInitiatives.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                    <TrendingUp className="w-8 h-8 text-slate-400 mx-auto" />
                    <div className="font-bold text-sm text-slate-700">
                      {lang === 'ar' ? 'لم يتم إضافة مبادرات استراتيجية بعد' : 'No Strategic Initiatives Defined Yet'}
                    </div>
                    <p className="text-xs text-slate-500">
                      {lang === 'ar'
                        ? 'اضغط على "تعبئة المبادرات التجريبية" في الأعلى لإدراج مشاريع التنمية الإقليمية وميزانياتها.'
                        : 'Click "Fill Demo Initiatives" above to populate realistic initiatives with budgets and milestones.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {customInitiatives.map((init) => (
                      <div key={init.id} className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                              {init.code}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              Linked to {init.objCode}
                            </span>
                          </div>
                          <div className="text-xs font-mono font-bold text-slate-900">
                            {(init.budgetSAR / 1000000).toFixed(1)}M SAR
                          </div>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{lang === 'ar' ? init.titleAr : init.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{init.desc}</p>
                        <div className="pt-1 text-[11px] text-slate-400 font-mono">
                          {init.milestones.join(' ➔ ')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 7: MONITORING, SCORECARD & LAUNCH */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-md space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                      {lang === 'ar' ? 'جاهز للاعتماد والإطلاق' : 'END-TO-END JOURNEY VALIDATION COMPLETE'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {orgName || (lang === 'ar' ? 'هيئة تطوير محافظة الأحساء' : 'Al-Ahsa Development Authority')} • {strategyName || '2026-2030 Strategy'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'ar'
                      ? 'تم ربط كامل عناصر السلسلة الاستراتيجية بنجاح: الرؤية ➔ الركائز ➔ الأهداف ➔ المؤشرات ➔ المبادرات.'
                      : 'Full strategic line-of-sight established: Vision → Pillars → Objectives → KPIs → Initiatives.'}
                  </p>
                </div>

                {/* Scorecard Quick Statistics Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Pillars / Themes</div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">{customPillars.length || 4}</div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">100% Balanced</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Objectives</div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">{customObjectives.length || 4}</div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">All Pillars Covered</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">KPI Measures</div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">{customKpis.length || 4}</div>
                    <div className="text-[10px] text-blue-600 mt-0.5">Formulas Verified</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Initiatives</div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">{customInitiatives.length || 3}</div>
                    <div className="text-[10px] text-teal-600 mt-0.5">40.0M SAR Budgeted</div>
                  </div>
                </div>

                {/* Reporting & Export Preview */}
                <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">
                      {lang === 'ar' ? 'مخرجات التقارير التنفيذية والتصدير' : 'Executive Reporting & Artifact Exports'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">PDF & Excel Ready</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-rose-600" />
                        <div>
                          <div className="font-bold text-slate-900">Q3 Executive Strategic Dossier.pdf</div>
                          <div className="text-[10px] text-slate-400 font-mono">18 Pages • Verified Stamped</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold text-[10px] font-mono">PDF</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <div>
                          <div className="font-bold text-slate-900">Enterprise_KPI_Matrix_2026.xlsx</div>
                          <div className="text-[10px] text-slate-400 font-mono">Formulas & Variance Cells</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] font-mono">EXCEL</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wizard Bottom Navigation Bar */}
          <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={handlePrevStep}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${currentStep === 1
                ? 'text-slate-300 bg-slate-50 border border-slate-200/50 cursor-not-allowed'
                : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs'
                }`}
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{lang === 'ar' ? 'الخطوة السابقة' : 'Previous Step'}</span>
            </button>

            <div className="flex items-center gap-2">
              {currentStep < 7 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer hover:shadow-md"
                >
                  <span>{lang === 'ar' ? 'المتابعة إلى الخطوة التالية' : 'Proceed to Next Step'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCompleteAndLaunch}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-emerald-100" />
                  <span>{lang === 'ar' ? 'إتمام التأسيس وإطلاق المنظومة' : 'Complete Setup & Launch Platform'}</span>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default SetupWizardPage;
