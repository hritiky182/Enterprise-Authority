import React, { useState, useMemo } from 'react';
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
  FolderGit2,
  Milestone as MilestoneIcon,
  Zap,
  CheckSquare,
  Square,
  Search,
  X,
  ExternalLink,
  ChevronRight,
  Award,
  BookOpen,
  Upload,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import { OrganizationLogo } from '../components/common/OrganizationLogo';
import {
  StrategicTheme,
  StrategicGoal,
  StrategicObjective,
  KPI,
  StrategicInitiative,
  Milestone,
  Department,
  Sector,
} from '../types';

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
    addDepartment,
    themes,
    addStrategyTheme,
    goals,
    addGoal,
    objectives,
    addObjective,
    kpis,
    addKPI,
    initiatives,
    addInitiative,
    updateStrategyPlan,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // ==========================================
  // CHAPTER 1 STATE (Entity & Organization Setup)
  // Blank by default per client requirement!
  // ==========================================
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
  const [orgValues, setOrgValues] = useState<string[]>([]);
  const [newValueInput, setNewValueInput] = useState<string>('');

  // ==========================================
  // CHAPTER 2 STATE (Org Hierarchy & Permissions)
  // ==========================================
  const [leadershipCeoTitle, setLeadershipCeoTitle] = useState<string>('');
  const [leadershipDeputyCeo, setLeadershipDeputyCeo] = useState<string>('');
  const [customSectors, setCustomSectors] = useState<
    { id: string; code: string; name: string; nameAr: string; head: string; departments: string[] }[]
  >([]);
  const [sectorFormCode, setSectorFormCode] = useState('');
  const [sectorFormName, setSectorFormName] = useState('');
  const [sectorFormNameAr, setSectorFormNameAr] = useState('');
  const [sectorFormHead, setSectorFormHead] = useState('');

  const [customDepartments, setCustomDepartments] = useState<
    { id: string; code: string; name: string; nameAr: string; head: string; employeeCount: number; sectorName: string }[]
  >([]);
  const [deptFormCode, setDeptFormCode] = useState('');
  const [deptFormName, setDeptFormName] = useState('');
  const [deptFormNameAr, setDeptFormNameAr] = useState('');
  const [deptFormHead, setDeptFormHead] = useState('');
  const [deptFormEmployees, setDeptFormEmployees] = useState(12);
  const [deptFormSector, setDeptFormSector] = useState('');

  // Permissions Matrix State
  const [permissionMatrix, setPermissionMatrix] = useState<
    { role: string; roleAr: string; strategy: string; kpis: string; risk: string; governance: string }[]
  >([
    {
      role: 'Administrator',
      roleAr: 'مدير النظام المعتمد',
      strategy: 'Full Amend/Edit',
      kpis: 'Full Amend/Edit',
      risk: 'Full Amend/Edit',
      governance: 'Full Control',
    },
    {
      role: 'Strategy Manager / Director',
      roleAr: 'مدير الاستراتيجية والتميز',
      strategy: 'Amend / Approve',
      kpis: 'Amend / Approve',
      risk: 'Review / Comment',
      governance: 'Restricted',
    },
    {
      role: 'Strategy Specialist',
      roleAr: 'أخصائي استراتيجية',
      strategy: 'Amend / Edit',
      kpis: 'Amend / Edit',
      risk: 'View Only',
      governance: 'Restricted',
    },
    {
      role: 'GRC & Risk Specialist',
      roleAr: 'أخصائي المخاطر والالتزام',
      strategy: 'View / Review',
      kpis: 'View / Review',
      risk: 'Amend / Approve',
      governance: 'Restricted',
    },
    {
      role: 'BCM Specialist',
      roleAr: 'أخصائي استمرارية الأعمال',
      strategy: 'View Only',
      kpis: 'View Only',
      risk: 'Amend (BCM)',
      governance: 'Restricted',
    },
    {
      role: 'Department Head / Operational Lead',
      roleAr: 'مدير إدارة تشغيلية',
      strategy: 'Contribute / Update',
      kpis: 'Update Actuals',
      risk: 'Submit Risks',
      governance: 'View Only',
    },
  ]);

  // ==========================================
  // CHAPTER 3.1 STATE: STRATEGIC PILLARS (Themes)
  // "First we should create the Strategic Pillar"
  // ==========================================
  const [customPillars, setCustomPillars] = useState<
    { id: string; code: string; title: string; titleAr: string; desc: string; color: string; weight: number }[]
  >([]);
  const [pillarFormCode, setPillarFormCode] = useState('');
  const [pillarFormTitle, setPillarFormTitle] = useState('');
  const [pillarFormTitleAr, setPillarFormTitleAr] = useState('');
  const [pillarFormDesc, setPillarFormDesc] = useState('');
  const [pillarFormColor, setPillarFormColor] = useState('blue');
  const [pillarFormWeight, setPillarFormWeight] = useState(25);

  // ==========================================
  // CHAPTER 3.2 STATE: STRATEGIC GOALS
  // "then Strategic Goals"
  // ==========================================
  const [customGoals, setCustomGoals] = useState<
    { id: string; code: string; title: string; titleAr: string; pillarCode: string; desc: string }[]
  >([]);
  const [goalFormCode, setGoalFormCode] = useState('');
  const [goalFormTitle, setGoalFormTitle] = useState('');
  const [goalFormTitleAr, setGoalFormTitleAr] = useState('');
  const [goalFormPillarCode, setGoalFormPillarCode] = useState('');
  const [goalFormDesc, setGoalFormDesc] = useState('');

  // ==========================================
  // CHAPTER 3.3 STATE: STRATEGIC OBJECTIVES
  // "then Strategic Objectives"
  // ==========================================
  const [customObjectives, setCustomObjectives] = useState<
    {
      id: string;
      code: string;
      title: string;
      titleAr: string;
      pillarCode: string;
      goalCode: string;
      owner: string;
      department: string;
      targetYear: number;
      desc: string;
      status: 'on-track' | 'at-risk' | 'behind' | 'achieved';
    }[]
  >([]);
  const [objFormCode, setObjFormCode] = useState('');
  const [objFormTitle, setObjFormTitle] = useState('');
  const [objFormTitleAr, setObjFormTitleAr] = useState('');
  const [objFormPillarCode, setObjFormPillarCode] = useState('');
  const [objFormGoalCode, setObjFormGoalCode] = useState('');
  const [objFormOwner, setObjFormOwner] = useState('');
  const [objFormDepartment, setObjFormDepartment] = useState('');
  const [objFormYear, setObjFormYear] = useState(2027);
  const [objFormDesc, setObjFormDesc] = useState('');
  const [objFormStatus, setObjFormStatus] = useState<'on-track' | 'at-risk' | 'behind' | 'achieved'>('on-track');

  // ==========================================
  // CHAPTER 3.4 STATE: KEY PERFORMANCE INDICATORS (KPIs)
  // "then Key Performance Indicators"
  // ==========================================
  const [customKpis, setCustomKpis] = useState<
    {
      id: string;
      code: string;
      name: string;
      nameAr: string;
      objCode: string;
      formula: string;
      unit: string;
      baseline: string | number;
      target: number;
      actual: number;
      frequency: 'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual';
      type: 'Leading' | 'Lagging';
      weight: number;
      owner: string;
    }[]
  >([]);
  const [kpiFormCode, setKpiFormCode] = useState('');
  const [kpiFormName, setKpiFormName] = useState('');
  const [kpiFormNameAr, setKpiFormNameAr] = useState('');
  const [kpiFormObjCode, setKpiFormObjCode] = useState('');
  const [kpiFormFormula, setKpiFormFormula] = useState('');
  const [kpiFormUnit, setKpiFormUnit] = useState('%');
  const [kpiFormBaseline, setKpiFormBaseline] = useState('0%');
  const [kpiFormTarget, setKpiFormTarget] = useState(100);
  const [kpiFormActual, setKpiFormActual] = useState(0);
  const [kpiFormFrequency, setKpiFormFrequency] = useState<'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual'>('Quarterly');
  const [kpiFormType, setKpiFormType] = useState<'Leading' | 'Lagging'>('Lagging');
  const [kpiFormWeight, setKpiFormWeight] = useState(25);
  const [kpiFormOwner, setKpiFormOwner] = useState('');

  // ==========================================
  // CHAPTER 3.5 STATE: STRATEGIC INITIATIVES & FLAGSHIP PROJECTS
  // "then Strategic Initiatives & Flagship Projects"
  // ==========================================
  const [customInitiatives, setCustomInitiatives] = useState<
    {
      id: string;
      code: string;
      title: string;
      titleAr: string;
      objCode: string;
      flagshipProject: string;
      flagshipProjectAr: string;
      owner: string;
      department: string;
      budgetSAR: number;
      spentSAR: number;
      startDate: string;
      endDate: string;
      desc: string;
      milestones: { title: string; dueDate: string }[];
    }[]
  >([]);
  const [initFormCode, setInitFormCode] = useState('');
  const [initFormTitle, setInitFormTitle] = useState('');
  const [initFormTitleAr, setInitFormTitleAr] = useState('');
  const [initFormObjCode, setInitFormObjCode] = useState('');
  const [initFormFlagshipProject, setInitFormFlagshipProject] = useState('');
  const [initFormFlagshipProjectAr, setInitFormFlagshipProjectAr] = useState('');
  const [initFormOwner, setInitFormOwner] = useState('');
  const [initFormDepartment, setInitFormDepartment] = useState('');
  const [initFormBudgetSAR, setInitFormBudgetSAR] = useState(10000000);
  const [initFormSpentSAR, setInitFormSpentSAR] = useState(0);
  const [initFormStartDate, setInitFormStartDate] = useState('2026-01-01');
  const [initFormEndDate, setInitFormEndDate] = useState('2027-12-31');
  const [initFormDesc, setInitFormDesc] = useState('');
  const [initFormMilestoneTitle, setInitFormMilestoneTitle] = useState('');
  const [initFormMilestoneDate, setInitFormMilestoneDate] = useState('2026-12-31');
  const [initFormMilestonesList, setInitFormMilestonesList] = useState<{ title: string; dueDate: string }[]>([]);

  // ==========================================
  // CHAPTER 3.6 STATE: STRATEGY PLAN BINDING & ATTACHMENT
  // "so that we can attach them to the strategy"
  // ==========================================
  const [strategyPlanName, setStrategyPlanName] = useState<string>('');
  const [strategyPlanNameAr, setStrategyPlanNameAr] = useState<string>('');
  const [strategyStartYear, setStrategyStartYear] = useState<number>(2026);
  const [strategyEndYear, setStrategyEndYear] = useState<number>(2030);
  const [strategyDuration, setStrategyDuration] = useState<string>('2026 – 2030 (5-Year Strategic Cycle)');
  const [strategyMandateStatement, setStrategyMandateStatement] = useState<string>('');
  const [strategyMandateStatementAr, setStrategyMandateStatementAr] = useState<string>('');

  // Selected IDs to attach to the strategy plan
  const [attachedPillarCodes, setAttachedPillarCodes] = useState<string[]>([]);
  const [attachedGoalCodes, setAttachedGoalCodes] = useState<string[]>([]);
  const [attachedObjectiveCodes, setAttachedObjectiveCodes] = useState<string[]>([]);
  const [attachedKpiCodes, setAttachedKpiCodes] = useState<string[]>([]);
  const [attachedInitiativeCodes, setAttachedInitiativeCodes] = useState<string[]>([]);

  // SIDEBAR CHAPTER & STEP DEFINITIONS (9 Sequential Steps matching user directive!)
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
      subtitle: 'Leadership, sectors, departments & matrix',
      subtitleAr: 'القيادة، القطاعات، الإدارات، ومصفوفة الصلاحيات',
      icon: <Network className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 3,
      title: 'Strategic Pillars',
      titleAr: 'الركائز الاستراتيجية',
      subtitle: 'Create foundational strategic pillars',
      subtitleAr: 'تأسيس الركائز الكبرى والمحاور',
      icon: <Target className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 4,
      title: 'Strategic Goals',
      titleAr: 'الأهداف العامة',
      subtitle: 'Formulate overarching goals per pillar',
      subtitleAr: 'صياغة الأهداف العامة التابعة لكل ركيزة',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 5,
      title: 'Strategic Objectives',
      titleAr: 'الأهداف الاستراتيجية',
      subtitle: 'Define measurable objectives with SMART assist',
      subtitleAr: 'تحديد الأهداف الاستراتيجية مع مساعد SMART',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 6,
      title: 'Key Performance Indicators',
      titleAr: 'مؤشرات قياس الأداء',
      subtitle: 'Formulas, baselines, targets & rules',
      subtitleAr: 'المعادلات، خطوط الأساس، والمستهدفات',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 7,
      title: 'Initiatives & Flagship Projects',
      titleAr: 'المبادرات والمشاريع الكبرى',
      subtitle: 'Budgets, milestones & flagship programs',
      subtitleAr: 'الميزانيات، المعالم، والمشاريع القيادية',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      chapter: 3,
      step: 8,
      title: 'Strategy Plan Attachment',
      titleAr: 'ربط وتجميع استراتيجية المنظومة',
      subtitle: 'Bind pillars, goals, OKRs & projects into plan',
      subtitleAr: 'ربط واعتماد كافة مكونات الاستراتيجية',
      icon: <FolderGit2 className="w-4 h-4" />,
    },
    {
      chapter: 4,
      step: 9,
      title: 'Monitoring & Launch',
      titleAr: 'استعراض الأداء وإطلاق المنظومة',
      subtitle: 'Scorecard review, charter export & launch',
      subtitleAr: 'ملخص بطاقة الأداء، التقارير، وتفعيل النظام',
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  // ==========================================
  // DEMO DATA AUTO-FILL HANDLERS (Per-step & All-in-one)
  // Clean text without duplicate emoji
  // ==========================================
  const fillStep1DemoData = () => {
    setOrgName('Al-Ahsa Development Authority');
    setOrgNameAr('هيئة تطوير محافظة الأحساء');
    setOrgShortCode('AHDA');
    setOrgLogo('ahda-emblem');
    setOrgThemeColor('blue');
    setOrgVision(
      'To establish Al-Ahsa as a global benchmark for sustainable oasis living, UNESCO heritage excellence, and economic prosperity by 2030.'
    );
    setOrgVisionAr(
      'أن تكون الأحساء نموذجاً عالمياً للعيش المستدام في الواحات، والريادة في صون التراث الثقافي لليونسكو، والازدهار الاقتصادي بحلول 2030.'
    );
    setOrgMission(
      'To spearhead integrated spatial planning, unleash heritage and agritourism investments, and elevate citizen quality of life in full harmony with Saudi Vision 2030.'
    );
    setOrgMissionAr(
      'قيادة التخطيط المكاني المنسق، وتحفيز السياحة التراثية والزراعية ذات العائد المرتفع، والارتقاء بجودة حياة المواطنين بمواءمة تامة مع رؤية السعودية 2030.'
    );
    setOrgBoardChair('HRH Prince Saud bin Talal bin Badr Al Saud');
    setOrgCeo('Dr. Faisal Al-Husseini');
    setOrgValues([
      'Cultural Stewardship',
      'Agile Governance',
      'Sustainable Innovation',
      'Civic Empowerment',
    ]);
    toast.success(lang === 'ar' ? 'تم تعبئة هوية وبيانات المنظومة التجريبية' : 'Demo Organization Identity Loaded!');
  };

  const fillStep2DemoData = () => {
    setLeadershipCeoTitle('Dr. Faisal Al-Husseini - Chief Executive Officer');
    setLeadershipDeputyCeo('Eng. Mansour Al-Ghamdi - Deputy CEO for Strategy & Delivery');
    setCustomSectors([
      {
        id: 'sec-sud',
        code: 'SUD',
        name: 'Spatial & Urban Development Sector',
        nameAr: 'قطاع التنمية المكانية والتخطيط الحضري',
        head: 'Eng. Fahad Al-Subaie',
        departments: ['Urban Regional Planning', 'Heritage Sites Regeneration', 'Infrastructure & Spatial GIS'],
      },
      {
        id: 'sec-ssd',
        code: 'SSD',
        name: 'Strategy & Sector Development Sector',
        nameAr: 'قطاع الاستراتيجية والتطوير القطاعي',
        head: 'Sarah Al-Mansoor',
        departments: ['Corporate Strategy & PMO', 'Economic Intelligence', 'Partnerships & Investment'],
      },
      {
        id: 'sec-tdmo',
        code: 'TDMO',
        name: 'Tourism Destination Management Office',
        nameAr: 'مكتب إدارة وتطوير الوجهة السياحية',
        head: 'Dr. Tariq Al-Ghamdi',
        departments: ['Agritourism Experience', 'UNESCO Creative Crafts', 'Events & Storytelling'],
      },
      {
        id: 'sec-ssg',
        code: 'SSG',
        name: 'Support Services & Corporate Governance',
        nameAr: 'قطاع الخدمات المساندة والحوكمة المؤسسية',
        head: 'Bandar Al-Harbi',
        departments: ['Human Capital', 'Finance & Procurement', 'Digital Innovation & IT'],
      },
    ]);

    setCustomDepartments([
      {
        id: 'dep-101',
        code: 'DEP-URP',
        name: 'Urban & Regional Planning',
        nameAr: 'إدارة التخطيط الحضري والإقليمي',
        head: 'Eng. Khaled Al-Mutairi',
        employeeCount: 18,
        sectorName: 'Spatial & Urban Development Sector',
      },
      {
        id: 'dep-102',
        code: 'DEP-STR',
        name: 'Corporate Strategy & PMO',
        nameAr: 'إدارة الاستراتيجية المؤسسية ومكتب إدارة المشاريع',
        head: 'Sarah Al-Mansoor',
        employeeCount: 14,
        sectorName: 'Strategy & Sector Development Sector',
      },
      {
        id: 'dep-103',
        code: 'DEP-TDM',
        name: 'Agritourism Experience & Heritage',
        nameAr: 'إدارة السياحة الزراعية والتراثية',
        head: 'Dr. Tariq Al-Ghamdi',
        employeeCount: 22,
        sectorName: 'Tourism Destination Management Office',
      },
      {
        id: 'dep-104',
        code: 'DEP-GRC',
        name: 'Enterprise Risk & Governance',
        nameAr: 'إدارة المخاطر المؤسسية والحوكمة',
        head: 'Ahmed Al-Shehri',
        employeeCount: 9,
        sectorName: 'Support Services & Corporate Governance',
      },
    ]);
    toast.success(lang === 'ar' ? 'تم تعبئة الهيكل التنظيمي والقطاعات التجريبية' : 'Demo Organizational Hierarchy Loaded!');
  };

  const fillStep3DemoData = () => {
    const demoPillars = [
      {
        id: 'pl-1',
        code: '01',
        title: 'Economic Diversification & Tourism Growth',
        titleAr: 'النمو الاقتصادي وتطوير السياحة',
        desc: 'Unlocking regional GDP through experiential tourism, agricultural value-chain expansion, and private sector investments.',
        color: 'blue',
        weight: 30,
      },
      {
        id: 'pl-2',
        code: '02',
        title: 'People, Community & Vibrant Society',
        titleAr: 'المجتمع والارتقاء بجودة الحياة',
        desc: 'Elevating urban living standards, civic dialogue, pedestrian corridors, and cultural festival participation.',
        color: 'teal',
        weight: 25,
      },
      {
        id: 'pl-3',
        code: '03',
        title: 'UNESCO Heritage & Environmental Sustainability',
        titleAr: 'صون واحة اليونسكو والاستدامة البيئية',
        desc: 'Preserving the worlds largest cultural oasis, irrigation network, palm biodiversity, and regional environmental balance.',
        color: 'emerald',
        weight: 25,
      },
      {
        id: 'pl-4',
        code: '04',
        title: 'Governance & Institutional Excellence',
        titleAr: 'الحوكمة والمواءمة والتميز المؤسسي',
        desc: 'Streamlining spatial zoning, inter-agency municipal alignment, cybersecurity resiliency, and smart digital operations.',
        color: 'indigo',
        weight: 20,
      },
    ];
    setCustomPillars(demoPillars);
    setAttachedPillarCodes(demoPillars.map((p) => p.code));
    toast.success(lang === 'ar' ? 'تم تعبئة الركائز الاستراتيجية الأربع' : 'Demo Strategic Pillars Loaded!');
  };

  const fillStep4DemoData = () => {
    const demoGoals = [
      {
        id: 'sg-1',
        code: 'SG-1.1',
        title: 'Establish Al-Ahsa as a Leading Global Eco-Oasis Destination',
        titleAr: 'ترسيخ الأحساء كوجهة عالمية رائدة لسياحة الواحات المستدامة',
        pillarCode: '01',
        desc: 'Attract 4M+ tourists annually through heritage trails, luxury date-farm lodges, and curated cultural experiences.',
      },
      {
        id: 'sg-2',
        code: 'SG-2.1',
        title: 'Empower Resident Wellbeing and Civic Co-Creation',
        titleAr: 'تعزيز جودة حياة السكان والشراكة المجتمعية الفاعلة',
        pillarCode: '02',
        desc: 'Enhance regional living standards and empower local community engagement in development decisions.',
      },
      {
        id: 'sg-3',
        code: 'SG-3.1',
        title: 'Safeguard UNESCO Cultural Oasis & Natural Biosphere',
        titleAr: 'صون المشهد الثقافي لواحة اليونسكو والمحميات الطبيعية',
        pillarCode: '03',
        desc: 'Preserve date palm reserves, historic water springs, and promote eco-friendly agriculture.',
      },
      {
        id: 'sg-4',
        code: 'SG-4.1',
        title: 'Attain High-Performance Institutional Agility & Alignment',
        titleAr: 'تحقيق التميز المؤسسي والمرونة التشغيلية التامة',
        pillarCode: '04',
        desc: 'Unify municipal zoning codes, enable data-driven spatial insights, and ensure robust risk compliance.',
      },
    ];
    setCustomGoals(demoGoals);
    setAttachedGoalCodes(demoGoals.map((g) => g.code));
    toast.success(lang === 'ar' ? 'تم تعبئة الأهداف العامة التجريبية' : 'Demo Strategic Goals Loaded!');
  };

  const fillStep5DemoData = () => {
    const demoObjs: typeof customObjectives = [
      {
        id: 'obj-1',
        code: 'SO-01',
        title: 'Elevate Sustainable Heritage & Agri-Tourism Capacity',
        titleAr: 'الارتقاء بالطاقة الاستيعابية للسياحة التراثية والزراعية المستدامة',
        pillarCode: '01',
        goalCode: 'SG-1.1',
        owner: 'Dr. Tariq Al-Ghamdi',
        department: 'Tourism Destination Management Office',
        targetYear: 2026,
        desc: 'Expand certified farm stays, artisan craft centers, and annual festival visitor numbers to surpass 2.5 million guests.',
        status: 'on-track',
      },
      {
        id: 'obj-2',
        code: 'SO-02',
        title: 'Foster Civic Dialogue & Regional Quality of Life',
        titleAr: 'تعزيز المشاركة المجتمعية والارتقاء بجودة الحياة الحضرية',
        pillarCode: '02',
        goalCode: 'SG-2.1',
        owner: 'Sarah Al-Mansoor',
        department: 'Strategy & Sector Development',
        targetYear: 2027,
        desc: 'Launch interactive digital civic dialogue portals and elevate citizen satisfaction across urban districts.',
        status: 'on-track',
      },
      {
        id: 'obj-3',
        code: 'SO-03',
        title: 'Rehabilitate Historic Oasis Irrigation & Green Corridors',
        titleAr: 'إعادة تأهيل قنوات الري التراثية والممرات الخضراء بواحة الأحساء',
        pillarCode: '03',
        goalCode: 'SG-3.1',
        owner: 'Eng. Fahad Al-Subaie',
        department: 'Spatial & Urban Development Sector',
        targetYear: 2028,
        desc: 'Protect 2.5M palm trees and implement recycled greywater agricultural systems across 12,000 hectares.',
        status: 'on-track',
      },
      {
        id: 'obj-4',
        code: 'SO-04',
        title: 'Digitize Spatial Governance & Inter-Agency Coordination',
        titleAr: 'رقمنة الحوكمة المكانية والتنسيق بين الجهات الحكومية',
        pillarCode: '04',
        goalCode: 'SG-4.1',
        owner: 'Bandar Al-Harbi',
        department: 'Corporate Governance & IT',
        targetYear: 2026,
        desc: 'Establish unified GIS spatial platform and ensure seamless municipal license approvals with 99.8% service uptime.',
        status: 'on-track',
      },
    ];
    setCustomObjectives(demoObjs);
    setAttachedObjectiveCodes(demoObjs.map((o) => o.code));
    toast.success(lang === 'ar' ? 'تم تعبئة الأهداف الاستراتيجية التفصيلية' : 'Demo Strategic Objectives Loaded!');
  };

  const fillStep6DemoData = () => {
    const demoKpis: typeof customKpis = [
      {
        id: 'kpi-1',
        code: '2.1.1',
        name: 'Event Visitor Engagement Indicator',
        nameAr: 'مؤشر تفاعل وحضور زوار الفعاليات الإقليمية',
        objCode: 'SO-01',
        formula: '(Total Actual Event Visitors - Target Visitors) / Target * 100%',
        unit: '%',
        baseline: '50%',
        target: 75,
        actual: 74,
        frequency: 'Annual',
        type: 'Lagging',
        weight: 35,
        owner: 'Dr. Tariq Al-Ghamdi',
      },
      {
        id: 'kpi-2',
        code: '2.1.2',
        name: 'Digital Civic Dialogue Index',
        nameAr: 'مؤشر التفاعل الرقمي والحوار المجتمعي مع الهيئة',
        objCode: 'SO-02',
        formula: "Average Results of Engagement Analysis Reports across Authority's Digital Platforms",
        unit: '%',
        baseline: '2.0%',
        target: 3.5,
        actual: 3.2,
        frequency: 'Quarterly',
        type: 'Leading',
        weight: 30,
        owner: 'Sarah Al-Mansoor',
      },
      {
        id: 'kpi-3',
        code: '2.2.1',
        name: 'Oasis Residents Satisfaction Score',
        nameAr: 'مؤشر رضا سكان الواحة وجودة الخدمات البلدية',
        objCode: 'SO-02',
        formula: 'Comprehensive Standardized Municipal & Living Condition Survey Score (Scale 1-100)',
        unit: 'Score',
        baseline: '72',
        target: 85,
        actual: 82,
        frequency: 'Annual',
        type: 'Lagging',
        weight: 35,
        owner: 'Eng. Fahad Al-Subaie',
      },
      {
        id: 'kpi-4',
        code: '3.1.1',
        name: 'UNESCO Oasis Conservation Integrity Index',
        nameAr: 'مؤشر سلامة صون الواحة ومواقع اليونسكو التراثية',
        objCode: 'SO-03',
        formula: '(Audited Compliant Heritage Zone Area / Total Designated Zone Area) * 100%',
        unit: '%',
        baseline: '85%',
        target: 96,
        actual: 91,
        frequency: 'Bi-Annual',
        type: 'Lagging',
        weight: 35,
        owner: 'Eng. Fahad Al-Subaie',
      },
    ];
    setCustomKpis(demoKpis);
    setAttachedKpiCodes(demoKpis.map((k) => k.code));
    toast.success(lang === 'ar' ? 'تم تعبئة مؤشرات قياس الأداء وقواعد الاحتساب' : 'Demo KPIs & Measurement Rules Loaded!');
  };

  const fillStep7DemoData = () => {
    const demoInits: typeof customInitiatives = [
      {
        id: 'init-1',
        code: 'INIT-06',
        title: 'Raise awareness of Al-Ahsa Strategy & Digital Engagement',
        titleAr: 'رفع الوعي باستراتيجية تطوير الأحساء وتعزيز التفاعل الرقمي',
        objCode: 'SO-01',
        flagshipProject: 'Al-Ahsa Strategy Awareness Project',
        flagshipProjectAr: 'مشروع التوعية باستراتيجية تطوير الأحساء',
        owner: 'Tourism Destination Management Office',
        department: 'Marketing & Public Relations',
        budgetSAR: 8500000,
        spentSAR: 5200000,
        startDate: '2026-01-01',
        endDate: '2027-06-30',
        desc: 'Comprehensive public awareness campaigns, multimedia storytelling of oasis heritage, and unified digital communication channels.',
        milestones: [
          { title: 'Develop community awareness framework & brand guide', dueDate: '2026-06-30' },
          { title: 'Launch multimedia digital engagement portal', dueDate: '2026-10-15' },
          { title: 'Execute regional oasis festival campaigns', dueDate: '2027-02-28' },
        ],
      },
      {
        id: 'init-2',
        code: 'INIT-07',
        title: 'Increase community participation in regional development planning',
        titleAr: 'تعزيز المشاركة المجتمعية في تخطيط مسارات التنمية الإقليمية',
        objCode: 'SO-02',
        flagshipProject: 'Digital Platforms and Technical Integration for Community Engagement',
        flagshipProjectAr: 'المنصات الرقمية والتكامل التقني للمشاركة المجتمعية',
        owner: 'Sarah Al-Mansoor',
        department: 'Strategy & Sector Development',
        budgetSAR: 12000000,
        spentSAR: 7800000,
        startDate: '2026-03-01',
        endDate: '2027-12-31',
        desc: 'Unified civic engagement digital portal enabling citizens to vote on regional ideas, participate in municipal surveys, and empower local community economy.',
        milestones: [
          { title: 'Digital Platforms and Technical Integration Framework', dueDate: '2026-05-15' },
          { title: 'Unified digital civic voting & consultation portal', dueDate: '2026-12-15' },
          { title: 'Local initiatives incubator & community impact dashboard', dueDate: '2027-03-31' },
        ],
      },
      {
        id: 'init-3',
        code: 'INIT-08',
        title: 'Enhance urban living standards and oasis environmental services',
        titleAr: 'تحسين جودة الحياة الحضرية والخدمات البيئية لواحة الأحساء',
        objCode: 'SO-03',
        flagshipProject: 'Quality of Life & Oasis Civic Satisfaction Project',
        flagshipProjectAr: 'مشروع قياس جودة الحياة ورضا سكان الواحة',
        owner: 'Eng. Fahad Al-Subaie',
        department: 'Spatial & Urban Development',
        budgetSAR: 16500000,
        spentSAR: 6200000,
        startDate: '2026-01-15',
        endDate: '2028-12-31',
        desc: 'Upgrading recreational spaces, developing continuous green corridors, expanding pedestrian network, and monitoring living satisfaction.',
        milestones: [
          { title: 'Regional green corridor environmental baseline audit', dueDate: '2026-07-31' },
          { title: 'Municipal park revitalizations & community sports track', dueDate: '2026-12-31' },
          { title: 'Comprehensive civic satisfaction measurement benchmark', dueDate: '2027-04-30' },
        ],
      },
    ];
    setCustomInitiatives(demoInits);
    setAttachedInitiativeCodes(demoInits.map((i) => i.code));
    toast.success(lang === 'ar' ? 'تم تعبئة المبادرات والمشاريع الكبرى التجريبية' : 'Demo Strategic Initiatives Loaded!');
  };

  const fillStep8DemoData = () => {
    setStrategyPlanName('Al-Ahsa Regional Sustainable Transformation Strategy 2026–2030');
    setStrategyPlanNameAr('استراتيجية هيئة تطوير الأحساء للتنمية الإقليمية المستدامة 2026–2030');
    setStrategyStartYear(2026);
    setStrategyEndYear(2030);
    setStrategyDuration('2026 – 2030 (5-Year Strategic Cycle)');
    setStrategyMandateStatement(
      "To lead comprehensive socio-economic, spatial, and cultural transformation in Al-Ahsa, unlocking the heritage oasis economy, enhancing residents' quality of life, and achieving sustainable regional prosperity in full alignment with Saudi Vision 2030."
    );
    setStrategyMandateStatementAr(
      'قيادة التحول التنموي الشامل، والمكاني، والاقتصادي في الأحساء، وتعظيم الاستفادة من واحة التراث العالمي، والارتقاء بجودة حياة السكان، وتحقيق الازدهار المستدام بما يتماشى مع رؤية السعودية 2030.'
    );

    // Attach all created items
    setAttachedPillarCodes(customPillars.map((p) => p.code));
    setAttachedGoalCodes(customGoals.map((g) => g.code));
    setAttachedObjectiveCodes(customObjectives.map((o) => o.code));
    setAttachedKpiCodes(customKpis.map((k) => k.code));
    setAttachedInitiativeCodes(customInitiatives.map((i) => i.code));

    toast.success(lang === 'ar' ? 'تم ربط وتجميع كافة عناصر الاستراتيجية' : 'Strategy Blueprint Successfully Bound!');
  };

  const fillAllDemoData = () => {
    fillStep1DemoData();
    fillStep2DemoData();
    fillStep3DemoData();
    fillStep4DemoData();
    fillStep5DemoData();
    fillStep6DemoData();
    fillStep7DemoData();
    fillStep8DemoData();
    toast.success(
      lang === 'ar'
        ? 'تم تحميل كامل بيانات العرض التجريبي للمنظومة والاستراتيجية بنجاح!'
        : 'All End-to-End Demo Journey Data Loaded!'
    );
  };

  // ==========================================
  // HANDLERS FOR INDIVIDUAL FORMS
  // ==========================================
  const handleAddValue = () => {
    if (newValueInput.trim() && !orgValues.includes(newValueInput.trim())) {
      setOrgValues([...orgValues, newValueInput.trim()]);
      setNewValueInput('');
    }
  };

  const handleRemoveValue = (idx: number) => {
    setOrgValues(orgValues.filter((_, i) => i !== idx));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(lang === 'ar' ? 'حجم الملف يتجاوز 5 ميجابايت' : 'File size exceeds 5MB limit');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setOrgLogoUrl(result);
        toast.success(lang === 'ar' ? 'تم رفع الشعار المخصص بنجاح!' : 'Custom logo uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectorFormName.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال اسم القطاع' : 'Please enter sector name');
      return;
    }
    const newSec = {
      id: `sec-${Date.now()}`,
      code: sectorFormCode || `SEC-0${customSectors.length + 1}`,
      name: sectorFormName.trim(),
      nameAr: sectorFormNameAr.trim() || sectorFormName.trim(),
      head: sectorFormHead.trim() || 'Director General',
      departments: [],
    };
    setCustomSectors([...customSectors, newSec]);
    setSectorFormCode('');
    setSectorFormName('');
    setSectorFormNameAr('');
    setSectorFormHead('');
    toast.success(lang === 'ar' ? 'تم إضافة القطاع بنجاح' : 'Sector Added Successfully');
  };

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptFormName.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال اسم الإدارة' : 'Please enter department name');
      return;
    }
    const newDept = {
      id: `dep-${Date.now()}`,
      code: deptFormCode || `DEP-${customDepartments.length + 101}`,
      name: deptFormName.trim(),
      nameAr: deptFormNameAr.trim() || deptFormName.trim(),
      head: deptFormHead.trim() || 'Department Manager',
      employeeCount: deptFormEmployees || 10,
      sectorName: deptFormSector || customSectors[0]?.name || 'Executive Sector',
    };
    setCustomDepartments([...customDepartments, newDept]);
    setDeptFormCode('');
    setDeptFormName('');
    setDeptFormNameAr('');
    setDeptFormHead('');
    toast.success(lang === 'ar' ? 'تم إضافة الإدارة التشغيلية بنجاح' : 'Department Added Successfully');
  };

  const handleAddPillar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pillarFormTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان الركيزة الاستراتيجية' : 'Please enter pillar title');
      return;
    }
    const code = pillarFormCode || `0${customPillars.length + 1}`;
    const newPillar = {
      id: `pl-${Date.now()}`,
      code,
      title: pillarFormTitle.trim(),
      titleAr: pillarFormTitleAr.trim() || pillarFormTitle.trim(),
      desc: pillarFormDesc.trim(),
      color: pillarFormColor,
      weight: pillarFormWeight,
    };
    setCustomPillars([...customPillars, newPillar]);
    setAttachedPillarCodes((prev) => Array.from(new Set([...prev, code])));
    setPillarFormCode('');
    setPillarFormTitle('');
    setPillarFormTitleAr('');
    setPillarFormDesc('');
    toast.success(lang === 'ar' ? 'تم إنشاء الركيزة الاستراتيجية بنجاح' : 'Strategic Pillar Created');
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalFormTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان الهدف العام' : 'Please enter strategic goal title');
      return;
    }
    const pillar = goalFormPillarCode || customPillars[0]?.code || '01';
    const code = goalFormCode || `SG-${pillar}.${customGoals.length + 1}`;
    const newGoal = {
      id: `sg-${Date.now()}`,
      code,
      title: goalFormTitle.trim(),
      titleAr: goalFormTitleAr.trim() || goalFormTitle.trim(),
      pillarCode: pillar,
      desc: goalFormDesc.trim(),
    };
    setCustomGoals([...customGoals, newGoal]);
    setAttachedGoalCodes((prev) => Array.from(new Set([...prev, code])));
    setGoalFormCode('');
    setGoalFormTitle('');
    setGoalFormTitleAr('');
    setGoalFormDesc('');
    toast.success(lang === 'ar' ? 'تم إنشاء الهدف العام بنجاح' : 'Strategic Goal Created');
  };

  const handleApplySmartAssist = () => {
    if (!objFormTitle.trim()) {
      setObjFormTitle('Elevate Regional Agritourism and Artisan Living Standards to 90% by 2027');
      setObjFormTitleAr('الارتقاء بالطاقة الاستيعابية للسياحة الزراعية التراثية ومستويات المعيشة إلى 90% بحلول 2027');
      setObjFormDesc(
        'Specific: Expand registered oasis farm-stays. Measurable: Achieve 90% occupancy and satisfaction index. Achievable: Backed by regional capex. Relevant: Aligned with Vision 2030 Tourism pillar. Time-bound: Target delivery by Q4 2027.'
      );
    } else {
      setObjFormDesc(
        (prev) =>
          prev +
          '\n[SMART Criteria Verified: Specific scope defined, quantifiable milestone attached, assigned to designated department owner, target year aligned].'
      );
    }
    toast.success(lang === 'ar' ? 'تم تطبيق معايير SMART الاستراتيجية عبر المساعد الذكي' : 'SMART Optimization Applied!');
  };

  const handleAddObjective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!objFormTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان الهدف الاستراتيجي' : 'Please enter objective title');
      return;
    }
    const code = objFormCode || `SO-0${customObjectives.length + 1}`;
    const newObj: (typeof customObjectives)[0] = {
      id: `obj-${Date.now()}`,
      code,
      title: objFormTitle.trim(),
      titleAr: objFormTitleAr.trim() || objFormTitle.trim(),
      pillarCode: objFormPillarCode || customPillars[0]?.code || '01',
      goalCode: objFormGoalCode || customGoals[0]?.code || 'SG-1.1',
      owner: objFormOwner.trim() || 'Strategy Custodian',
      department: objFormDepartment.trim() || 'Strategy Development',
      targetYear: objFormYear,
      desc: objFormDesc.trim(),
      status: objFormStatus,
    };
    setCustomObjectives([...customObjectives, newObj]);
    setAttachedObjectiveCodes((prev) => Array.from(new Set([...prev, code])));
    setObjFormCode('');
    setObjFormTitle('');
    setObjFormTitleAr('');
    setObjFormDesc('');
    toast.success(lang === 'ar' ? 'تم إنشاء الهدف الاستراتيجي بنجاح' : 'Strategic Objective Created');
  };

  const handleAddKpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiFormName.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال اسم مؤشر الأداء' : 'Please enter KPI name');
      return;
    }
    const code = kpiFormCode || `2.1.${customKpis.length + 1}`;
    const newKpi: (typeof customKpis)[0] = {
      id: `kpi-${Date.now()}`,
      code,
      name: kpiFormName.trim(),
      nameAr: kpiFormNameAr.trim() || kpiFormName.trim(),
      objCode: kpiFormObjCode || customObjectives[0]?.code || 'SO-01',
      formula: kpiFormFormula.trim() || '(Actual - Target) / Target * 100',
      unit: kpiFormUnit,
      baseline: kpiFormBaseline || '0%',
      target: Number(kpiFormTarget) || 100,
      actual: Number(kpiFormActual) || 0,
      frequency: kpiFormFrequency,
      type: kpiFormType,
      weight: Number(kpiFormWeight) || 25,
      owner: kpiFormOwner.trim() || 'KPI Custodian',
    };
    setCustomKpis([...customKpis, newKpi]);
    setAttachedKpiCodes((prev) => Array.from(new Set([...prev, code])));
    setKpiFormCode('');
    setKpiFormName('');
    setKpiFormNameAr('');
    setKpiFormFormula('');
    toast.success(lang === 'ar' ? 'تم إضافة مؤشر قياس الأداء وقواعد الاحتساب' : 'KPI Created Successfully');
  };

  const handleAddMilestoneToInitForm = () => {
    if (!initFormMilestoneTitle.trim()) return;
    setInitFormMilestonesList([
      ...initFormMilestonesList,
      { title: initFormMilestoneTitle.trim(), dueDate: initFormMilestoneDate },
    ]);
    setInitFormMilestoneTitle('');
  };

  const handleAddInitiative = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initFormTitle.trim()) {
      toast.error(lang === 'ar' ? 'يرجى إدخال عنوان المبادرة الاستراتيجية' : 'Please enter initiative title');
      return;
    }
    const code = initFormCode || `INIT-0${customInitiatives.length + 1}`;
    const newInit: (typeof customInitiatives)[0] = {
      id: `init-${Date.now()}`,
      code,
      title: initFormTitle.trim(),
      titleAr: initFormTitleAr.trim() || initFormTitle.trim(),
      objCode: initFormObjCode || customObjectives[0]?.code || 'SO-01',
      flagshipProject: initFormFlagshipProject.trim() || `${initFormTitle.trim()} Delivery Program`,
      flagshipProjectAr: initFormFlagshipProjectAr.trim() || initFormTitleAr.trim() || initFormTitle.trim(),
      owner: initFormOwner.trim() || 'Initiative Director',
      department: initFormDepartment.trim() || 'PMO & Strategy Delivery',
      budgetSAR: Number(initFormBudgetSAR) || 10000000,
      spentSAR: Number(initFormSpentSAR) || 0,
      startDate: initFormStartDate,
      endDate: initFormEndDate,
      desc: initFormDesc.trim(),
      milestones: initFormMilestonesList.length > 0 ? initFormMilestonesList : [{ title: 'Initial Kickoff & Milestone Plan', dueDate: initFormEndDate }],
    };
    setCustomInitiatives([...customInitiatives, newInit]);
    setAttachedInitiativeCodes((prev) => Array.from(new Set([...prev, code])));
    setInitFormCode('');
    setInitFormTitle('');
    setInitFormTitleAr('');
    setInitFormFlagshipProject('');
    setInitFormFlagshipProjectAr('');
    setInitFormMilestonesList([]);
    setInitFormDesc('');
    toast.success(lang === 'ar' ? 'تم إضافة المبادرة والمشروع القيادي بنجاح' : 'Initiative & Flagship Project Added');
  };

  // Toggle multi-select items in Step 8 (Binding)
  const toggleAttached = (type: 'pillar' | 'goal' | 'objective' | 'kpi' | 'initiative', code: string) => {
    if (type === 'pillar') {
      setAttachedPillarCodes((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    } else if (type === 'goal') {
      setAttachedGoalCodes((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    } else if (type === 'objective') {
      setAttachedObjectiveCodes((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    } else if (type === 'kpi') {
      setAttachedKpiCodes((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    } else if (type === 'initiative') {
      setAttachedInitiativeCodes((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    }
  };

  // ==========================================
  // FINAL COMPLETION & LAUNCH HANDLER
  // ==========================================
  const handleCompleteAndLaunch = () => {
    // 1. Save Organization
    updateOrganization({
      name: orgName || 'Al-Ahsa Development Authority',
      nameAr: orgNameAr || 'هيئة تطوير الأحساء',
      shortName: orgShortCode || 'AHDA',
      logo: orgLogo,
      logoUrl: orgLogoUrl,
      themeColor: orgThemeColor,
      vision: orgVision || organization.vision,
      visionAr: orgVisionAr || organization.visionAr,
      mission: orgMission || organization.mission,
      missionAr: orgMissionAr || organization.missionAr,
      boardChair: orgBoardChair || organization.boardChair,
      ceo: orgCeo || organization.ceo,
      values: orgValues.length > 0 ? orgValues : organization.values,
    });

    // 2. Commit Strategy Plan
    updateStrategyPlan({
      name: strategyPlanName || 'AHDA Comprehensive Transformation Strategy 2026–2030',
      nameAr: strategyPlanNameAr || 'استراتيجية هيئة تطوير الأحساء للتنمية الإقليمية المستدامة 2026–2030',
      duration: strategyDuration || '2026 – 2030 (5-Year Strategic Cycle)',
      startYear: strategyStartYear,
      endYear: strategyEndYear,
      statement:
        strategyMandateStatement ||
        "To lead comprehensive socio-economic, spatial, and cultural transformation in Al-Ahsa, unlocking the heritage oasis economy, enhancing residents' quality of life, and achieving sustainable regional prosperity.",
      statementAr:
        strategyMandateStatementAr ||
        'قيادة التحول التنموي الشامل، والمكاني، والاقتصادي في الأحساء، وتعظيم الاستفادة من واحة التراث العالمي، والارتقاء بجودة حياة السكان.',
      status: 'Active',
      version: 'v2.0-Official',
      approvedBy: orgBoardChair || 'HRH Prince Saud bin Talal bin Badr Al Saud',
    });

    // 3. Save Custom Pillars to AppContext if added
    customPillars.forEach((p) => {
      addStrategyTheme({
        code: p.code,
        title: p.title,
        titleAr: p.titleAr,
        description: p.desc,
        color: p.color,
        weight: p.weight,
      });
    });

    // 4. Save Custom Goals
    customGoals.forEach((g) => {
      const parentTheme = themes.find((t) => t.code === g.pillarCode) || themes[0];
      addGoal({
        code: g.code,
        themeId: parentTheme?.id || 'st-people',
        title: g.title,
        titleAr: g.titleAr,
        description: g.desc,
      });
    });

    // 5. Save Custom Objectives
    customObjectives.forEach((o) => {
      const parentTheme = themes.find((t) => t.code === o.pillarCode) || themes[0];
      const parentGoal = goals.find((g) => g.code === o.goalCode) || goals[0];
      addObjective({
        code: o.code,
        title: o.title,
        titleAr: o.titleAr,
        themeId: parentTheme?.id || 'st-people',
        themeName: parentTheme?.title || 'Strategic Pillar',
        goalId: parentGoal?.id || 'sg-people-1',
        owner: o.owner,
        department: o.department,
        targetYear: o.targetYear,
        kpiCount: customKpis.filter((k) => k.objCode === o.code).length,
        status: o.status,
        progress: 15,
        description: o.desc,
      });
    });

    // 6. Save Custom KPIs
    customKpis.forEach((k) => {
      const parentObj = objectives.find((o) => o.code === k.objCode) || objectives[0];
      addKPI({
        code: k.code,
        name: k.name,
        nameAr: k.nameAr,
        objectiveId: parentObj?.id || 'so-2-1',
        objectiveTitle: parentObj?.title || 'Strategic Objective',
        unit: k.unit,
        owner: k.owner,
        target: k.target,
        actual: k.actual,
        achievementPct: k.target > 0 ? Math.round((k.actual / k.target) * 100) : 0,
        frequency: k.frequency,
        status: 'on-track',
        type: k.type,
        weight: k.weight,
        formula: k.formula,
        baseline: k.baseline,
      });
    });

    // 7. Save Custom Initiatives
    customInitiatives.forEach((i) => {
      const parentObj = objectives.find((o) => o.code === i.objCode) || objectives[0];
      addInitiative({
        code: i.code,
        title: i.title,
        titleAr: i.titleAr,
        objectiveId: parentObj?.id || 'so-2-1',
        objectiveTitle: parentObj?.title || 'Strategic Objective',
        owner: i.owner,
        department: i.department,
        budgetSAR: i.budgetSAR,
        spentSAR: i.spentSAR,
        progress: i.budgetSAR > 0 ? Math.round((i.spentSAR / i.budgetSAR) * 100) : 10,
        startDate: i.startDate,
        endDate: i.endDate,
        status: 'In Progress',
        milestones: i.milestones.map((m, idx) => ({
          id: `ms-${idx}`,
          title: m.title,
          dueDate: m.dueDate,
          status: 'In Progress',
        })),
        risksCount: 2,
        actionsCount: 3,
        keyProjects: [i.flagshipProject],
        description: i.desc,
      });
    });

    // 8. Persist Wizard Completion Flag
    localStorage.setItem('eda_setup_wizard_done', 'true');
    sessionStorage.setItem('eda_setup_wizard_done', 'true');

    toast.success(
      lang === 'ar'
        ? 'تم تفعيل وحفظ كامل المنظومة والاستراتيجية بنجاح! مرحباً بك في المنصة.'
        : 'Enterprise Strategy Suite Configured & Launched Successfully!'
    );
    navigate('/');
  };

  const nextStep = () => {
    if (currentStep < 9) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* ============================================================== */}
      {/* TOP HEADER BAR (Sleek Dark Navigation) */}
      {/* ============================================================== */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-white">
                {orgName || (lang === 'ar' ? 'هيئة تطوير الأحساء' : 'Al-Ahsa Development Authority')}
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Setup Wizard • معالج التأسيس
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {lang === 'ar'
                ? 'رحلة العرض المتكاملة: تأسيس الهوية، الهيكل، صياغة الاستراتيجية الهرمية، والإطلاق'
                : 'End-to-End Enterprise Journey: Entity Setup, Hierarchy, Cascading Strategy & Launch'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Demo Fill All - Single Sparkles icon, no duplicate emoji */}
          {/* <button
            type="button"
            onClick={fillAllDemoData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            title="Pre-load complete AHDA reference data across all 9 steps"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="hidden md:inline">{lang === 'ar' ? 'تعبئة كامل بيانات العرض' : 'Fill All Demo Data'}</span>
            <span className="md:hidden">{lang === 'ar' ? 'بيانات تجريبية' : 'Demo All'}</span>
          </button> */}

          {/* Quick Jump / Exit */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            title="Skip to Dashboard"
          >
            <span>{lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* MAIN CONTAINER: DARK SIDEBAR + CLEAN WHITE WORKSPACE */}
      {/* ============================================================== */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* LEFT / RIGHT PROGRESS SIDEBAR (REMAINS DARK AS REQUESTED) */}
        <aside className="w-full lg:w-80 bg-slate-900 border-b lg:border-b-0 lg:border-e border-slate-800 p-4 sm:p-6 shrink-0 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
                <span>{lang === 'ar' ? 'تقدم الإعداد' : 'Setup Progress'}</span>
                <span className="font-mono text-blue-400">{Math.round((currentStep / 9) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                  style={{ width: `${(currentStep / 9) * 100}%` }}
                />
              </div>
            </div>

            {/* Steps List */}
            <nav className="space-y-1.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {CHAPTERS.map((c) => {
                const isActive = currentStep === c.step;
                const isPast = currentStep > c.step;
                return (
                  <button
                    key={c.step}
                    type="button"
                    onClick={() => setCurrentStep(c.step)}
                    className={`w-full text-start p-2.5 rounded-xl flex items-start gap-3 transition-all cursor-pointer ${isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                        : isPast
                          ? 'text-slate-300 hover:bg-slate-800/80'
                          : 'text-slate-400 hover:bg-slate-800/50'
                      }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-mono text-xs font-bold transition-all ${isActive
                          ? 'bg-white/20 text-white'
                          : isPast
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                    >
                      {isPast ? <Check className="w-3.5 h-3.5" /> : c.step}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                          {lang === 'ar' ? c.titleAr : c.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">Ch.{c.chapter}</span>
                      </div>
                      <p className={`text-[11px] line-clamp-1 mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {lang === 'ar' ? c.subtitleAr : c.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Help Footer */}
          <div className="pt-4 border-t border-slate-800 mt-4 text-[11px] text-slate-400 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {lang === 'ar'
                ? 'الحقول فارغة افتراضياً لتمكين الإدخال اليدوي، أو استخدم زر تعبئة البيانات التجريبية.'
                : 'Fields start blank for manual input, or click "Fill Demo Data" on any step.'}
            </span>
          </div>
        </aside>

        {/* RIGHT WORKSPACE (PROFESSIONAL CLEAN WHITE CANVAS) */}
        <main className="flex-1 bg-slate-50 text-slate-900 flex flex-col justify-between min-h-screen">
          <div className="p-4 sm:p-8 lg:p-10 max-w-5xl mx-auto w-full flex-1">
            {/* ========================================================== */}
            {/* STEP 1: ORGANIZATION SETUP (Chapter 1) */}
            {/* ========================================================== */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Step Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        CHAPTER 1 • STEP 1 OF 9
                      </span>
                      <span className="text-xs text-slate-500">{lang === 'ar' ? 'تهيئة وهوية المنظومة' : 'Entity Setup'}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {lang === 'ar' ? 'تأسيس وهوية المنظومة / الجهة' : 'Organization Setup & Official Identity'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ar'
                        ? 'حدد الاسم الرسمي، الشعار، ألوان الهوية، الرؤية، الرسالة، ورؤساء المنظومة كما في صفحة إعدادات الجهة.'
                        : 'Configure official name, emblem logo, branding colors, mission statement, and executive leadership.'}
                    </p>
                  </div>

                  {/* Single Sparkles Lucide Icon without repeating emoji */}
                  <button
                    type="button"
                    onClick={fillStep1DemoData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? 'تعبئة هوية الأحساء' : 'Fill Demo Identity'}</span>
                  </button>
                </div>

                {/* Form Card Grid */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Entity Name EN */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'اسم الجهة بالإنجليزية' : 'Official Entity Name (English)'}
                      </label>
                      <input
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="e.g. Al-Ahsa Development Authority"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
                      />
                    </div>

                    {/* Entity Name AR */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'اسم الجهة بالعربية' : 'Official Entity Name (Arabic)'}
                      </label>
                      <input
                        type="text"
                        value={orgNameAr}
                        onChange={(e) => setOrgNameAr(e.target.value)}
                        placeholder="مثال: هيئة تطوير محافظة الأحساء"
                        dir="rtl"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
                      />
                    </div>

                    {/* Short Code */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'الرمز المختصر' : 'Short Code / Acronym'}
                      </label>
                      <input
                        type="text"
                        value={orgShortCode}
                        onChange={(e) => setOrgShortCode(e.target.value)}
                        placeholder="e.g. AHDA"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs uppercase transition-all"
                      />
                    </div>

                    {/* Color Theme Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'نسق وألوان الهوية' : 'Branding Theme Color'}
                      </label>
                      <div className="flex items-center gap-2 pt-0.5">
                        {COLOR_THEMES.map((th) => (
                          <button
                            key={th.id}
                            type="button"
                            onClick={() => setOrgThemeColor(th.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${orgThemeColor === th.id
                                ? 'bg-white border-blue-600 text-slate-900 ring-2 ring-blue-500/20 shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
                              }`}
                          >
                            <span className={`w-3 h-3 rounded-full ${th.bg}`} />
                            <span className="text-[11px] font-semibold">{th.name.split(' ')[1] || th.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Leadership: Board Chair */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'رئيس مجلس الإدارة' : 'Chairman of the Board'}
                      </label>
                      <input
                        type="text"
                        value={orgBoardChair}
                        onChange={(e) => setOrgBoardChair(e.target.value)}
                        placeholder="e.g. HRH Prince Saud bin Talal bin Badr Al Saud"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
                      />
                    </div>

                    {/* Leadership: CEO */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'الرئيس التنفيذي' : 'Chief Executive Officer (CEO)'}
                      </label>
                      <input
                        type="text"
                        value={orgCeo}
                        onChange={(e) => setOrgCeo(e.target.value)}
                        placeholder="e.g. Dr. Faisal Al-Husseini"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Logo Selection & Custom Upload */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        {lang === 'ar' ? 'شعار المنظومة الرسمي' : 'Official Organization Emblem / Logo'}
                      </span>
                      {orgLogoUrl && (
                        <button
                          type="button"
                          onClick={() => setOrgLogoUrl('')}
                          className="text-[11px] text-red-600 hover:underline cursor-pointer"
                        >
                          {lang === 'ar' ? 'إلغاء الشعار المرفوع' : 'Remove Custom Logo'}
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {PRESET_LOGOS.map((pl) => (
                        <button
                          key={pl.id}
                          type="button"
                          onClick={() => {
                            setOrgLogo(pl.id);
                            setOrgLogoUrl('');
                          }}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${orgLogo === pl.id && !orgLogoUrl
                              ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                        >
                          <pl.icon className="w-6 h-6 text-blue-600" />
                          <span className="text-[11px] text-center font-medium">
                            {lang === 'ar' ? pl.nameAr : pl.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Upload File Input */}
                    <div className="pt-2 flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer transition-colors border border-slate-300 shadow-2xs">
                        <Upload className="w-3.5 h-3.5 text-blue-600" />
                        <span>{lang === 'ar' ? 'رفع شعار مخصص (PNG/SVG)' : 'Upload Custom Logo'}</span>
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      </label>
                      {orgLogoUrl && (
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {lang === 'ar' ? 'تم تجهيز الشعار المخصص' : 'Custom logo active'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vision & Mission Statements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'الرؤية المؤسسية (English)' : 'Vision Statement (English)'}
                      </label>
                      <textarea
                        rows={3}
                        value={orgVision}
                        onChange={(e) => setOrgVision(e.target.value)}
                        placeholder="Enter long-term institutional vision..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'الرؤية المؤسسية (العربية)' : 'Vision Statement (Arabic)'}
                      </label>
                      <textarea
                        rows={3}
                        value={orgVisionAr}
                        onChange={(e) => setOrgVisionAr(e.target.value)}
                        placeholder="أدخل نص الرؤية المؤسسية..."
                        dir="rtl"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'الرسالة المؤسسية (English)' : 'Mission Statement (English)'}
                      </label>
                      <textarea
                        rows={3}
                        value={orgMission}
                        onChange={(e) => setOrgMission(e.target.value)}
                        placeholder="Enter strategic mandate and mission..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'الرسالة المؤسسية (العربية)' : 'Mission Statement (Arabic)'}
                      </label>
                      <textarea
                        rows={3}
                        value={orgMissionAr}
                        onChange={(e) => setOrgMissionAr(e.target.value)}
                        placeholder="أدخل نص الرسالة المؤسسية..."
                        dir="rtl"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Core Values Tags */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <label className="block text-xs font-bold text-slate-700">
                      {lang === 'ar' ? 'القيم المؤسسية الجوهرية' : 'Core Values & Cultural Principles'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newValueInput}
                        onChange={(e) => setNewValueInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddValue())}
                        placeholder={lang === 'ar' ? 'أضف قيمة جديدة (مثال: الاستدامة البيئية)' : 'Add a core value...'}
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                      <button
                        type="button"
                        onClick={handleAddValue}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {orgValues.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {orgValues.map((val, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs shadow-2xs"
                          >
                            <span>{val}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveValue(idx)}
                              className="text-slate-400 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* STEP 2: ORGANIZATIONAL STRUCTURE & PERMISSIONS (Chapter 2) */}
            {/* ========================================================== */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        CHAPTER 2 • STEP 2 OF 9
                      </span>
                      <span className="text-xs text-slate-500">{lang === 'ar' ? 'الهيكل التنظيمي والصلاحيات' : 'Org Hierarchy'}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {lang === 'ar' ? 'الهيكل الإداري والقطاعات ومصفوفة الصلاحيات' : 'Sectors, Departments & Permissions Matrix'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ar'
                        ? 'بناء القطاعات التنفيذية، الإدارات التشغيلية، ومصفوفة صلاحيات الأدوار (تعديل، اعتماد، مراجعة، استعراض).'
                        : 'Structure organizational sectors, operational departments, and fine-grained roles & permissions matrix.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={fillStep2DemoData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? 'تعبئة هيكل المنظومة' : 'Fill Demo Structure'}</span>
                  </button>
                </div>

                {/* Leadership Tier Card */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-800">
                    {lang === 'ar' ? 'المستوى القيادي الأعلى (مجلس الإدارة ومكتب الرئيس)' : 'Executive Leadership Tier'}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {lang === 'ar' ? 'الرئيس التنفيذي / الإدارة العليا' : 'CEO Office & Executive Title'}
                      </label>
                      <input
                        type="text"
                        value={leadershipCeoTitle}
                        onChange={(e) => setLeadershipCeoTitle(e.target.value)}
                        placeholder="e.g. Dr. Faisal Al-Husseini - Chief Executive Officer"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {lang === 'ar' ? 'نائب الرئيس التنفيذي للاستراتيجية' : 'Deputy CEO / VP for Strategy'}
                      </label>
                      <input
                        type="text"
                        value={leadershipDeputyCeo}
                        onChange={(e) => setLeadershipDeputyCeo(e.target.value)}
                        placeholder="e.g. Eng. Mansour Al-Ghamdi - Deputy CEO"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Sectors Builder Form Card */}
                <form onSubmit={handleAddSector} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {lang === 'ar' ? 'إضافة قطاع تنفيذي جديد (+ القطاعات)' : '+ Add Executive Sector'}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {customSectors.length} {lang === 'ar' ? 'قطاعات مسجلة' : 'Sectors Registered'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">{lang === 'ar' ? 'رمز القطاع' : 'Sector Code'}</label>
                      <input
                        type="text"
                        value={sectorFormCode}
                        onChange={(e) => setSectorFormCode(e.target.value)}
                        placeholder="e.g. SUD"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs shadow-2xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">{lang === 'ar' ? 'اسم القطاع (EN/AR)' : 'Sector Name'}</label>
                      <input
                        type="text"
                        value={sectorFormName}
                        onChange={(e) => setSectorFormName(e.target.value)}
                        placeholder="e.g. Spatial & Urban Development Sector"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">{lang === 'ar' ? 'رئيس القطاع' : 'Sector Head'}</label>
                      <input
                        type="text"
                        value={sectorFormHead}
                        onChange={(e) => setSectorFormHead(e.target.value)}
                        placeholder="e.g. Eng. Fahad Al-Subaie"
                        className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إضافة القطاع' : 'Add Sector'}</span>
                    </button>
                  </div>
                </form>

                {/* Created Sectors Cards */}
                {customSectors.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {customSectors.map((sec) => (
                      <div
                        key={sec.id}
                        className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start justify-between"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                              {sec.code}
                            </span>
                            <span className="text-xs font-bold text-slate-900">{sec.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{sec.head}</p>
                          {sec.departments.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {sec.departments.map((d, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                  {d}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setCustomSectors(customSectors.filter((s) => s.id !== sec.id))}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Roles & Permissions Matrix Table */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {lang === 'ar' ? 'مصفوفة حوكمة الأدوار والصلاحيات (Permissions Matrix)' : 'Roles & Permissions Matrix'}
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {lang === 'ar'
                        ? 'تخصيص الصلاحيات الدقيقة لكل دور (تعديل/إضافة، اعتماد، مراجعة، استعراض فقط) لمنع التداخل بين الاستراتيجية والمخاطر.'
                        : 'Granular permissions matrix separating Strategy, KPIs, Risk, and Governance per persona.'}
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-start text-xs">
                      <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                        <tr>
                          <th className="py-2.5 px-3 text-start">{lang === 'ar' ? 'الدور الوظيفي' : 'Role / Persona'}</th>
                          <th className="py-2.5 px-3 text-start">{lang === 'ar' ? 'الاستراتيجية والأهداف' : 'Strategy & OKRs'}</th>
                          <th className="py-2.5 px-3 text-start">{lang === 'ar' ? 'مؤشرات الأداء' : 'KPI Tracking'}</th>
                          <th className="py-2.5 px-3 text-start">{lang === 'ar' ? 'المخاطر وBCM' : 'Risk & BCM'}</th>
                          <th className="py-2.5 px-3 text-start">{lang === 'ar' ? 'إدارة المنظومة' : 'Governance'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {permissionMatrix.map((pm, i) => (
                          <tr key={i} className="hover:bg-slate-50/70">
                            <td className="py-2.5 px-3 font-semibold text-slate-900 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                              <span>{lang === 'ar' ? pm.roleAr : pm.role}</span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                                {pm.strategy}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                                {pm.kpis}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                                {pm.risk}
                              </span>
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                                {pm.governance}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* STEP 3: STRATEGIC PILLARS (Chapter 3.1) */}
            {/* "first we should create the Strategic Pillar" */}
            {/* ========================================================== */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        CHAPTER 3 • STEP 3 OF 9
                      </span>
                      <span className="text-xs text-slate-500">{lang === 'ar' ? 'الركائز الاستراتيجية' : 'Strategic Pillars'}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {lang === 'ar' ? 'تأسيس الركائز الاستراتيجية الكبرى (Pillars / Themes)' : 'Create Strategic Pillars & Themes'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ar'
                        ? 'الخطوة الأولى في الاستراتيجية: تأسيس المحاور والركائز الكبرى (الرمز، العنوان، الوزن النسبي، والوصف).'
                        : 'Step 1 in strategy creation: Establish overarching strategic themes & pillars before defining goals.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={fillStep3DemoData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? 'تعبئة ركائز الأحساء الأربع' : 'Fill Demo Pillars'}</span>
                  </button>
                </div>

                {/* Add Strategic Pillar Form Card */}
                <form onSubmit={handleAddPillar} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block">
                    {lang === 'ar' ? '+ إضافة ركيزة استراتيجية جديدة' : '+ Add Strategic Pillar'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'رمز الركيزة' : 'Pillar Code'}
                      </label>
                      <input
                        type="text"
                        value={pillarFormCode}
                        onChange={(e) => setPillarFormCode(e.target.value)}
                        placeholder="e.g. 01 or PL-01"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'عنوان الركيزة (English)' : 'Pillar Title (English)'}
                      </label>
                      <input
                        type="text"
                        value={pillarFormTitle}
                        onChange={(e) => setPillarFormTitle(e.target.value)}
                        placeholder="e.g. Economic Diversification & Tourism Growth"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'الوزن النسبي %' : 'Strategic Weight %'}
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={pillarFormWeight}
                        onChange={(e) => setPillarFormWeight(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'عنوان الركيزة (العربية)' : 'Pillar Title (Arabic)'}
                      </label>
                      <input
                        type="text"
                        value={pillarFormTitleAr}
                        onChange={(e) => setPillarFormTitleAr(e.target.value)}
                        placeholder="مثال: النمو الاقتصادي وتطوير السياحة"
                        dir="rtl"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'اللون المميز للركيزة' : 'Pillar Accent Color'}
                      </label>
                      <div className="flex items-center gap-2 pt-1">
                        {['blue', 'teal', 'emerald', 'indigo', 'purple', 'amber'].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => setPillarFormColor(c)}
                            className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${pillarFormColor === c ? 'border-slate-800 scale-110 shadow-xs' : 'border-transparent opacity-75'
                              } ${c === 'blue'
                                ? 'bg-blue-600'
                                : c === 'teal'
                                  ? 'bg-teal-600'
                                  : c === 'emerald'
                                    ? 'bg-emerald-600'
                                    : c === 'indigo'
                                      ? 'bg-indigo-600'
                                      : c === 'purple'
                                        ? 'bg-purple-600'
                                        : 'bg-amber-600'
                              }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'وصف الركيزة ونطاق الأثر' : 'Pillar Description & Strategic Scope'}
                      </label>
                      <textarea
                        rows={2}
                        value={pillarFormDesc}
                        onChange={(e) => setPillarFormDesc(e.target.value)}
                        placeholder="Explain the overarching purpose and systemic scope of this pillar..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'إضافة الركيزة' : 'Add Strategic Pillar'}</span>
                    </button>
                  </div>
                </form>

                {/* Created Pillars Cards */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">
                    {lang === 'ar' ? 'الركائز الاستراتيجية المسجلة:' : 'Configured Strategic Pillars:'} ({customPillars.length})
                  </span>

                  {customPillars.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-white">
                      <Target className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">
                        {lang === 'ar'
                          ? 'لم يتم إضافة ركائز بعد. استخدم النموذج أعلاه أو اضغط زر تعبئة ركائز الأحساء الأربع.'
                          : 'No pillars added yet. Use the form above or click "Fill Demo Pillars".'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {customPillars.map((p) => (
                        <div
                          key={p.id}
                          className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                                {p.code}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                  {p.weight}% {lang === 'ar' ? 'وزن' : 'weight'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setCustomPillars(customPillars.filter((item) => item.id !== p.id))}
                                  className="text-slate-400 hover:text-red-600 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <h3 className="font-bold text-sm text-slate-900">{p.title}</h3>
                            {p.titleAr && <p className="text-xs text-slate-500 mt-0.5" dir="rtl">{p.titleAr}</p>}
                            {p.desc && <p className="text-xs text-slate-600 mt-2 line-clamp-2">{p.desc}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* STEP 4: STRATEGIC GOALS (Chapter 3.2) */}
            {/* "then Strategic Goals" */}
            {/* ========================================================== */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        CHAPTER 3 • STEP 4 OF 9
                      </span>
                      <span className="text-xs text-slate-500">{lang === 'ar' ? 'الأهداف العامة' : 'Strategic Goals'}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {lang === 'ar' ? 'صياغة الأهداف العامة (Strategic Goals)' : 'Formulate Overarching Strategic Goals'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ar'
                        ? 'الخطوة الثانية في الاستراتيجية: إنشاء الأهداف العامة وربطها بالركائز الاستراتيجية المحددة في الخطوة السابقة.'
                        : 'Step 2: Define overarching goals and attach them to the strategic pillars created in step 3.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={fillStep4DemoData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? 'تعبئة الأهداف العامة' : 'Fill Demo Goals'}</span>
                  </button>
                </div>

                {/* Add Goal Form Card */}
                <form onSubmit={handleAddGoal} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block">
                    {lang === 'ar' ? '+ إضافة هدف عام جديد وربطه بركيزة' : '+ Add Strategic Goal'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'رمز الهدف العام' : 'Goal Code'}
                      </label>
                      <input
                        type="text"
                        value={goalFormCode}
                        onChange={(e) => setGoalFormCode(e.target.value)}
                        placeholder="e.g. SG-1.1"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'الركيزة التابع لها' : 'Parent Pillar'}
                      </label>
                      <select
                        value={goalFormPillarCode}
                        onChange={(e) => setGoalFormPillarCode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      >
                        {customPillars.length === 0 ? (
                          <option value="01">Pillar 01 (Default)</option>
                        ) : (
                          customPillars.map((p) => (
                            <option key={p.id} value={p.code}>
                              {p.code} - {p.title}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'عنوان الهدف العام (English)' : 'Goal Title (English)'}
                      </label>
                      <input
                        type="text"
                        value={goalFormTitle}
                        onChange={(e) => setGoalFormTitle(e.target.value)}
                        placeholder="e.g. Establish Al-Ahsa as Global Oasis Tourism Destination"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'عنوان الهدف العام (العربية)' : 'Goal Title (Arabic)'}
                      </label>
                      <input
                        type="text"
                        value={goalFormTitleAr}
                        onChange={(e) => setGoalFormTitleAr(e.target.value)}
                        placeholder="مثال: ترسيخ الأحساء كوجهة عالمية رائدة لسياحة الواحات"
                        dir="rtl"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {lang === 'ar' ? 'وصف الهدف العام' : 'Goal Strategic Mandate'}
                      </label>
                      <input
                        type="text"
                        value={goalFormDesc}
                        onChange={(e) => setGoalFormDesc(e.target.value)}
                        placeholder="Mandate & strategic focus..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'إضافة الهدف العام' : 'Add Strategic Goal'}</span>
                    </button>
                  </div>
                </form>

                {/* Created Goals List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">
                    {lang === 'ar' ? 'الأهداف العامة المسجلة:' : 'Configured Strategic Goals:'} ({customGoals.length})
                  </span>

                  {customGoals.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-white">
                      <Compass className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">
                        {lang === 'ar'
                          ? 'لم يتم إضافة أهداف عامة بعد. استخدم النموذج أعلاه أو اضغط زر تعبئة الأهداف العامة.'
                          : 'No goals added yet. Use the form above or click "Fill Demo Goals".'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {customGoals.map((g) => (
                        <div
                          key={g.id}
                          className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                {g.code}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                {lang === 'ar' ? `تابع للركيزة ${g.pillarCode}` : `Under Pillar ${g.pillarCode}`}
                              </span>
                              <span className="font-bold text-xs text-slate-900">{g.title}</span>
                            </div>
                            {g.titleAr && <p className="text-xs text-slate-500" dir="rtl">{g.titleAr}</p>}
                            {g.desc && <p className="text-[11px] text-slate-600">{g.desc}</p>}
                          </div>

                          <button
                            type="button"
                            onClick={() => setCustomGoals(customGoals.filter((item) => item.id !== g.id))}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* STEP 5: STRATEGIC OBJECTIVES (Chapter 3.3) */}
            {/* "then Strategic Objectives" */}
            {/* ========================================================== */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        CHAPTER 3 • STEP 5 OF 9
                      </span>
                      <span className="text-xs text-slate-500">{lang === 'ar' ? 'الأهداف الاستراتيجية' : 'Strategic Objectives'}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {lang === 'ar' ? 'صياغة الأهداف الاستراتيجية (Strategic Objectives)' : 'Formulate Strategic Objectives (OKRs)'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ar'
                        ? 'الخطوة الثالثة: صياغة الأهداف الاستراتيجية الذكية القابلة للقياس وربطها بالهدف العام والركيزة، وتعيين الإدارة المسؤولة.'
                        : 'Step 3: Define measurable objectives linked to your goals and pillars, with owners, departments, and SMART assist.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={fillStep5DemoData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? 'تعبئة الأهداف الاستراتيجية' : 'Fill Demo Objectives'}</span>
                  </button>
                </div>

                {/* Add Objective Form Card */}
                <form onSubmit={handleAddObjective} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {lang === 'ar' ? '+ إضافة هدف استراتيجي جديد' : '+ Add Strategic Objective'}
                    </span>
                    <button
                      type="button"
                      onClick={handleApplySmartAssist}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1 rounded-lg cursor-pointer transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>{lang === 'ar' ? 'مساعد SMART الذكي' : 'SMART AI Assistant'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'رمز الهدف' : 'Objective Code'}</label>
                      <input
                        type="text"
                        value={objFormCode}
                        onChange={(e) => setObjFormCode(e.target.value)}
                        placeholder="e.g. SO-01"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الركيزة التابعة' : 'Linked Pillar'}</label>
                      <select
                        value={objFormPillarCode}
                        onChange={(e) => setObjFormPillarCode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      >
                        {customPillars.map((p) => (
                          <option key={p.id} value={p.code}>
                            {p.code} - {p.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الهدف العام' : 'Linked Goal'}</label>
                      <select
                        value={objFormGoalCode}
                        onChange={(e) => setObjFormGoalCode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      >
                        {customGoals.map((g) => (
                          <option key={g.id} value={g.code}>
                            {g.code} - {g.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'سنة الإنجاز المستهدفة' : 'Target Year'}</label>
                      <input
                        type="number"
                        value={objFormYear}
                        onChange={(e) => setObjFormYear(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'عنوان الهدف (English)' : 'Objective Title (English)'}</label>
                      <input
                        type="text"
                        value={objFormTitle}
                        onChange={(e) => setObjFormTitle(e.target.value)}
                        placeholder="e.g. Elevate Sustainable Heritage & Agri-Tourism Capacity"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'عنوان الهدف (العربية)' : 'Objective Title (Arabic)'}</label>
                      <input
                        type="text"
                        value={objFormTitleAr}
                        onChange={(e) => setObjFormTitleAr(e.target.value)}
                        placeholder="مثال: الارتقاء بالطاقة الاستيعابية للسياحة التراثية والزراعية"
                        dir="rtl"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'المسؤول / المشرف' : 'Lead Custodian / Owner'}</label>
                      <input
                        type="text"
                        value={objFormOwner}
                        onChange={(e) => setObjFormOwner(e.target.value)}
                        placeholder="e.g. Dr. Tariq Al-Ghamdi"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الإدارة المسؤولة' : 'Responsible Department'}</label>
                      <input
                        type="text"
                        value={objFormDepartment}
                        onChange={(e) => setObjFormDepartment(e.target.value)}
                        placeholder="e.g. Tourism Destination Management Office"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'وصف النطاق ومخرجات الهدف' : 'Objective Scope & SMART Deliverables'}</label>
                      <textarea
                        rows={2}
                        value={objFormDesc}
                        onChange={(e) => setObjFormDesc(e.target.value)}
                        placeholder="Specific scope, key outcomes, and success boundaries..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'إضافة الهدف الاستراتيجي' : 'Add Strategic Objective'}</span>
                    </button>
                  </div>
                </form>

                {/* Created Objectives List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">
                    {lang === 'ar' ? 'الأهداف الاستراتيجية المسجلة:' : 'Configured Strategic Objectives:'} ({customObjectives.length})
                  </span>

                  {customObjectives.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-white">
                      <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">
                        {lang === 'ar'
                          ? 'لم يتم إضافة أهداف استراتيجية بعد. استخدم النموذج أعلاه أو اضغط زر تعبئة الأهداف.'
                          : 'No objectives added yet. Use the form above or click "Fill Demo Objectives".'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {customObjectives.map((o) => (
                        <div
                          key={o.id}
                          className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                {o.code}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                Pillar {o.pillarCode} • Goal {o.goalCode}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                                Target {o.targetYear}
                              </span>
                              <span className="font-bold text-xs text-slate-900">{o.title}</span>
                            </div>
                            {o.titleAr && <p className="text-xs text-slate-500" dir="rtl">{o.titleAr}</p>}
                            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3 text-slate-400" />
                                {o.owner}
                              </span>
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                {o.department}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setCustomObjectives(customObjectives.filter((item) => item.id !== o.id))}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* STEP 6: KEY PERFORMANCE INDICATORS (Chapter 3.4) */}
            {/* "then Key Performance Indicators" */}
            {/* ========================================================== */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        CHAPTER 3 • STEP 6 OF 9
                      </span>
                      <span className="text-xs text-slate-500">{lang === 'ar' ? 'مؤشرات قياس الأداء' : 'KPIs & Metrics'}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {lang === 'ar' ? 'مؤشرات قياس الأداء وقواعد الاحتساب (KPIs)' : 'Key Performance Indicators & Calculation Rules'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ar'
                        ? 'الخطوة الرابعة: ربط مؤشرات الأداء بالأهداف، صياغة معادلات الاحتساب، وتحديد خط الأساس والمستهدف والنوع (استباقي/لاحق).'
                        : 'Step 4: Establish KPIs under objectives with explicit mathematical formulas, baselines, targets, and leading/lagging types.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={fillStep6DemoData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? 'تعبئة مؤشرات الأحساء' : 'Fill Demo KPIs'}</span>
                  </button>
                </div>

                {/* Add KPI Form Card */}
                <form onSubmit={handleAddKpi} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block">
                    {lang === 'ar' ? '+ إضافة مؤشر قياس أداء جديد' : '+ Add Key Performance Indicator'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'رمز المؤشر' : 'KPI Code'}</label>
                      <input
                        type="text"
                        value={kpiFormCode}
                        onChange={(e) => setKpiFormCode(e.target.value)}
                        placeholder="e.g. 2.1.1"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الهدف الاستراتيجي التابع له' : 'Parent Objective'}</label>
                      <select
                        value={kpiFormObjCode}
                        onChange={(e) => setKpiFormObjCode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      >
                        {customObjectives.map((o) => (
                          <option key={o.id} value={o.code}>
                            {o.code} - {o.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'اسم المؤشر (English)' : 'KPI Name (English)'}</label>
                      <input
                        type="text"
                        value={kpiFormName}
                        onChange={(e) => setKpiFormName(e.target.value)}
                        placeholder="e.g. Event Visitor Engagement Indicator"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'اسم المؤشر (العربية)' : 'KPI Name (Arabic)'}</label>
                      <input
                        type="text"
                        value={kpiFormNameAr}
                        onChange={(e) => setKpiFormNameAr(e.target.value)}
                        placeholder="مثال: مؤشر تفاعل وحضور زوار الفعاليات"
                        dir="rtl"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'معادلة الاحتساب وقاعدة القياس' : 'Mathematical Formula'}</label>
                      <input
                        type="text"
                        value={kpiFormFormula}
                        onChange={(e) => setKpiFormFormula(e.target.value)}
                        placeholder="e.g. (Total Actual Visitors - Target) / Target * 100%"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'وحدة القياس' : 'Unit'}</label>
                      <select
                        value={kpiFormUnit}
                        onChange={(e) => setKpiFormUnit(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      >
                        <option value="%">% (Percentage)</option>
                        <option value="Score">Score (1-100)</option>
                        <option value="SAR">SAR (Currency)</option>
                        <option value="Number">Number / Count</option>
                        <option value="M Visitors">Million Visitors</option>
                        <option value="Days">Days</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'خط الأساس (Baseline)' : 'Baseline'}</label>
                      <input
                        type="text"
                        value={kpiFormBaseline}
                        onChange={(e) => setKpiFormBaseline(e.target.value)}
                        placeholder="e.g. 50%"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'المستهدف (Target)' : 'Target'}</label>
                      <input
                        type="number"
                        value={kpiFormTarget}
                        onChange={(e) => setKpiFormTarget(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الفعلي الحالي (Actual)' : 'Current Actual'}</label>
                      <input
                        type="number"
                        value={kpiFormActual}
                        onChange={(e) => setKpiFormActual(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'دورية القياس' : 'Frequency'}</label>
                      <select
                        value={kpiFormFrequency}
                        onChange={(e) => setKpiFormFrequency(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      >
                        <option value="Quarterly">Quarterly (ربع سنوي)</option>
                        <option value="Annual">Annual (سنوي)</option>
                        <option value="Monthly">Monthly (شهري)</option>
                        <option value="Bi-Annual">Bi-Annual (نصف سنوي)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'نوع المؤشر' : 'KPI Type'}</label>
                      <select
                        value={kpiFormType}
                        onChange={(e) => setKpiFormType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      >
                        <option value="Lagging">Lagging (مؤشر نتيجي / أثر)</option>
                        <option value="Leading">Leading (مؤشر استباقي / محفز)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الوزن النسبي %' : 'Weight %'}</label>
                      <input
                        type="number"
                        value={kpiFormWeight}
                        onChange={(e) => setKpiFormWeight(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'مالك المؤشر' : 'Owner'}</label>
                      <input
                        type="text"
                        value={kpiFormOwner}
                        onChange={(e) => setKpiFormOwner(e.target.value)}
                        placeholder="e.g. Dr. Tariq Al-Ghamdi"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'إضافة مؤشر الأداء' : 'Add KPI'}</span>
                    </button>
                  </div>
                </form>

                {/* Created KPIs List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">
                    {lang === 'ar' ? 'مؤشرات الأداء المسجلة:' : 'Configured Key Performance Indicators:'} ({customKpis.length})
                  </span>

                  {customKpis.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-white">
                      <BarChart3 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">
                        {lang === 'ar'
                          ? 'لم يتم إضافة مؤشرات أداء بعد. استخدم النموذج أعلاه أو اضغط زر تعبئة مؤشرات الأحساء.'
                          : 'No KPIs added yet. Use the form above or click "Fill Demo KPIs".'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {customKpis.map((k) => (
                        <div
                          key={k.id}
                          className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start justify-between gap-4"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                {k.code}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                Obj: {k.objCode}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                                {k.type}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                                {k.frequency}
                              </span>
                              <span className="font-bold text-xs text-slate-900">{k.name}</span>
                            </div>

                            {k.nameAr && <p className="text-xs text-slate-500" dir="rtl">{k.nameAr}</p>}

                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700 flex items-center gap-2">
                              <Calculator className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{k.formula}</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                              <div>
                                <span className="text-slate-500">{lang === 'ar' ? 'الأساس:' : 'Baseline:'} </span>
                                <span className="text-slate-800 font-mono font-semibold">{k.baseline}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">{lang === 'ar' ? 'المستهدف:' : 'Target:'} </span>
                                <span className="text-emerald-600 font-mono font-bold">{k.target} {k.unit}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">{lang === 'ar' ? 'الفعلي:' : 'Actual:'} </span>
                                <span className="text-blue-600 font-mono font-bold">{k.actual} {k.unit}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">{lang === 'ar' ? 'المسؤول:' : 'Owner:'} </span>
                                <span className="text-slate-800 font-semibold">{k.owner}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setCustomKpis(customKpis.filter((item) => item.id !== k.id))}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* STEP 7: STRATEGIC INITIATIVES & FLAGSHIP PROJECTS (Chapter 3.5) */}
            {/* "then Strategic Initiatives & Flagship Projects" */}
            {/* ========================================================== */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        CHAPTER 3 • STEP 7 OF 9
                      </span>
                      <span className="text-xs text-slate-500">{lang === 'ar' ? 'المبادرات والمشاريع الكبرى' : 'Initiatives & Projects'}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {lang === 'ar' ? 'المبادرات الاستراتيجية والمشاريع الكبرى القيادية' : 'Strategic Initiatives & Flagship Delivery Projects'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ar'
                        ? 'الخطوة الخامسة: بناء المبادرات التنفيذية والمشاريع الكبرى (Flagship Projects)، ربطها بالأهداف، تحديد الميزانيات SAR، وجدولة المعالم.'
                        : 'Step 5: Formulate execution initiatives & flagship projects linked to objectives, complete with budgets and milestones.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={fillStep7DemoData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? 'تعبئة مبادرات ومشاريع الأحساء' : 'Fill Demo Initiatives'}</span>
                  </button>
                </div>

                {/* Add Initiative Form Card */}
                <form onSubmit={handleAddInitiative} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <span className="text-xs font-bold text-slate-900 block">
                    {lang === 'ar' ? '+ إضافة مبادرة استراتيجية ومشروع قيادي' : '+ Add Strategic Initiative & Flagship Project'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'رمز المبادرة' : 'Initiative Code'}</label>
                      <input
                        type="text"
                        value={initFormCode}
                        onChange={(e) => setInitFormCode(e.target.value)}
                        placeholder="e.g. INIT-06"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الهدف الاستراتيجي التابع له' : 'Linked Objective'}</label>
                      <select
                        value={initFormObjCode}
                        onChange={(e) => setInitFormObjCode(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      >
                        {customObjectives.map((o) => (
                          <option key={o.id} value={o.code}>
                            {o.code} - {o.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'عنوان المبادرة (English)' : 'Initiative Title (English)'}</label>
                      <input
                        type="text"
                        value={initFormTitle}
                        onChange={(e) => setInitFormTitle(e.target.value)}
                        placeholder="e.g. Raise awareness of Al-Ahsa Strategy & Digital Civic Engagement"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'عنوان المبادرة (العربية)' : 'Initiative Title (Arabic)'}</label>
                      <input
                        type="text"
                        value={initFormTitleAr}
                        onChange={(e) => setInitFormTitleAr(e.target.value)}
                        placeholder="مثال: رفع الوعي باستراتيجية تطوير الأحساء وتعزيز التفاعل الرقمي"
                        dir="rtl"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-amber-800 mb-1 flex items-center gap-1.5">
                        <FolderGit2 className="w-3.5 h-3.5 text-amber-600" />
                        <span>{lang === 'ar' ? 'المشروع القيادي الكبير (Flagship Project)' : 'Flagship Project Name'}</span>
                      </label>
                      <input
                        type="text"
                        value={initFormFlagshipProject}
                        onChange={(e) => setInitFormFlagshipProject(e.target.value)}
                        placeholder="e.g. Al-Ahsa Strategy Awareness Project"
                        className="w-full px-3.5 py-2 rounded-xl bg-amber-50/50 border border-amber-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الميزانية المعتمدة (SAR)' : 'Budget (SAR)'}</label>
                      <input
                        type="number"
                        value={initFormBudgetSAR}
                        onChange={(e) => setInitFormBudgetSAR(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'المصروف حتى الآن (SAR)' : 'Spent (SAR)'}</label>
                      <input
                        type="number"
                        value={initFormSpentSAR}
                        onChange={(e) => setInitFormSpentSAR(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'تاريخ البداية' : 'Start Date'}</label>
                      <input
                        type="date"
                        value={initFormStartDate}
                        onChange={(e) => setInitFormStartDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}</label>
                      <input
                        type="date"
                        value={initFormEndDate}
                        onChange={(e) => setInitFormEndDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'مالك المبادرة' : 'Initiative Owner'}</label>
                      <input
                        type="text"
                        value={initFormOwner}
                        onChange={(e) => setInitFormOwner(e.target.value)}
                        placeholder="e.g. Tourism Destination Management Office"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">{lang === 'ar' ? 'الإدارة المنفذة' : 'Executing Department'}</label>
                      <input
                        type="text"
                        value={initFormDepartment}
                        onChange={(e) => setInitFormDepartment(e.target.value)}
                        placeholder="e.g. Marketing & Public Relations"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    {/* Milestones Mini-Builder */}
                    <div className="sm:col-span-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <span className="text-xs font-bold text-slate-800 block">
                        {lang === 'ar' ? 'معالم الإنجاز الرئيسية (Key Milestones)' : 'Key Delivery Milestones'}
                      </span>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={initFormMilestoneTitle}
                          onChange={(e) => setInitFormMilestoneTitle(e.target.value)}
                          placeholder="e.g. Launch multimedia digital engagement portal"
                          className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs shadow-2xs"
                        />
                        <input
                          type="date"
                          value={initFormMilestoneDate}
                          onChange={(e) => setInitFormMilestoneDate(e.target.value)}
                          className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs shadow-2xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddMilestoneToInitForm}
                          className="px-3.5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
                        >
                          + {lang === 'ar' ? 'إضافة معلم' : 'Add Milestone'}
                        </button>
                      </div>

                      {initFormMilestonesList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {initFormMilestonesList.map((m, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 font-mono shadow-2xs"
                            >
                              <MilestoneIcon className="w-3 h-3 text-blue-600" />
                              <span>{m.title} ({m.dueDate})</span>
                              <button
                                type="button"
                                onClick={() => setInitFormMilestonesList(initFormMilestonesList.filter((_, idx) => idx !== i))}
                                className="text-slate-400 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'ar' ? 'إضافة المبادرة والمشروع' : 'Add Initiative & Project'}</span>
                    </button>
                  </div>
                </form>

                {/* Created Initiatives List */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">
                    {lang === 'ar' ? 'المبادرات والمشاريع الكبرى المسجلة:' : 'Configured Strategic Initiatives & Projects:'} ({customInitiatives.length})
                  </span>

                  {customInitiatives.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-white">
                      <TrendingUp className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-500">
                        {lang === 'ar'
                          ? 'لم يتم إضافة مبادرات بعد. استخدم النموذج أعلاه أو اضغط زر تعبئة مبادرات ومشاريع الأحساء.'
                          : 'No initiatives added yet. Use the form above or click "Fill Demo Initiatives".'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {customInitiatives.map((init) => (
                        <div
                          key={init.id}
                          className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start justify-between gap-4"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                {init.code}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                Obj: {init.objCode}
                              </span>
                              <span className="font-bold text-xs text-slate-900">{init.title}</span>
                            </div>

                            {init.flagshipProject && (
                              <div className="flex items-center gap-1.5 text-xs text-amber-900 font-semibold bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                                <FolderGit2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>{lang === 'ar' ? 'المشروع القيادي: ' : 'Flagship Project: '}</span>
                                <span className="text-slate-900">{init.flagshipProject}</span>
                              </div>
                            )}

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                              <div>
                                <span className="text-slate-500">{lang === 'ar' ? 'الميزانية:' : 'Budget:'} </span>
                                <span className="text-emerald-700 font-mono font-bold">
                                  {init.budgetSAR.toLocaleString()} SAR
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500">{lang === 'ar' ? 'المصروف:' : 'Spent:'} </span>
                                <span className="text-blue-700 font-mono font-bold">
                                  {init.spentSAR.toLocaleString()} SAR
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-500">{lang === 'ar' ? 'المالك:' : 'Owner:'} </span>
                                <span className="text-slate-800 font-semibold">{init.owner}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">{lang === 'ar' ? 'المعالم:' : 'Milestones:'} </span>
                                <span className="text-purple-700 font-mono font-bold">{init.milestones.length} milestones</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setCustomInitiatives(customInitiatives.filter((item) => item.id !== init.id))}
                            className="text-slate-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* STEP 8: STRATEGY PLAN ATTACHMENT & BINDING (Chapter 3.6) */}
            {/* "so that we can attach them to the strategy" */}
            {/* ========================================================== */}
            {currentStep === 8 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        CHAPTER 3 • STEP 8 OF 9
                      </span>
                      <span className="text-xs text-slate-500">{lang === 'ar' ? 'ربط واعتماد الاستراتيجية' : 'Strategy Plan Binding'}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {lang === 'ar' ? 'ربط وتجميع وثيقة الاستراتيجية المعتمدة' : 'Strategy Plan Formulation & Cascading Attachment'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ar'
                        ? 'الآن بعد تأسيس الركائز والأهداف العامة والاستراتيجية والمؤشرات والمبادرات، قم بربطهم جميعاً في وثيقة الاستراتيجية الكبرى.'
                        : 'Now that all building blocks are created, bind the pillars, goals, objectives, KPIs, and initiatives into the master strategy.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={fillStep8DemoData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'ar' ? 'ربط كافة العناصر تلقائياً' : 'Bind All Elements'}</span>
                  </button>
                </div>

                {/* Master Strategy Plan Inputs Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'اسم وثيقة الاستراتيجية (English)' : 'Master Strategy Plan Name (English)'}
                      </label>
                      <input
                        type="text"
                        value={strategyPlanName}
                        onChange={(e) => setStrategyPlanName(e.target.value)}
                        placeholder="e.g. Al-Ahsa Regional Sustainable Transformation Strategy 2026–2030"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'اسم وثيقة الاستراتيجية (العربية)' : 'Master Strategy Plan Name (Arabic)'}
                      </label>
                      <input
                        type="text"
                        value={strategyPlanNameAr}
                        onChange={(e) => setStrategyPlanNameAr(e.target.value)}
                        placeholder="مثال: استراتيجية هيئة تطوير الأحساء للتنمية الإقليمية المستدامة 2026–2030"
                        dir="rtl"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'المدى والمدة الزمنية للدورة' : 'Strategic Horizon & Cycle Duration'}
                      </label>
                      <input
                        type="text"
                        value={strategyDuration}
                        onChange={(e) => setStrategyDuration(e.target.value)}
                        placeholder="2026 – 2030 (5-Year Strategic Cycle)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'سنوات البداية والانتهاء' : 'Cycle Horizon Years'}
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={strategyStartYear}
                          onChange={(e) => setStrategyStartYear(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono shadow-2xs"
                        />
                        <span className="text-slate-400">➔</span>
                        <input
                          type="number"
                          value={strategyEndYear}
                          onChange={(e) => setStrategyEndYear(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {lang === 'ar' ? 'البيان الاستراتيجي والتفويض التنفيذي (Executive Mandate Statement)' : 'Executive Mandate Statement'}
                      </label>
                      <textarea
                        rows={3}
                        value={strategyMandateStatement}
                        onChange={(e) => setStrategyMandateStatement(e.target.value)}
                        placeholder="State the core executive mandate, socio-economic rationale, and sovereign direction..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Multi-Select Cascade Attachment Panels */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-5 h-5 text-blue-600" />
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        {lang === 'ar' ? 'عناصر الاستراتيجية المرتبطة بوثيقة الاعتماد' : 'Elements Attached to Strategy'}
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        {lang === 'ar' ? 'حدد المكونات التي ترغب بربطها بهذه الاستراتيجية' : 'Select all created components to bind to this strategy blueprint'}
                      </p>
                    </div>
                  </div>

                  {/* 1. Attached Pillars */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        1. {lang === 'ar' ? 'الركائز الاستراتيجية' : 'Strategic Pillars'} ({attachedPillarCodes.length}/{customPillars.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttachedPillarCodes(customPillars.map((p) => p.code))}
                        className="text-blue-600 hover:underline text-[11px] font-semibold cursor-pointer"
                      >
                        {lang === 'ar' ? 'تحديد الكل' : 'Select All'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {customPillars.map((p) => {
                        const isSel = attachedPillarCodes.includes(p.code);
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => toggleAttached('pillar', p.code)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 cursor-pointer transition-all ${isSel
                                ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                              }`}
                          >
                            {isSel ? <CheckSquare className="w-3.5 h-3.5 text-blue-600" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                            <span>{p.code} - {p.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Attached Goals */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        2. {lang === 'ar' ? 'الأهداف العامة' : 'Strategic Goals'} ({attachedGoalCodes.length}/{customGoals.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttachedGoalCodes(customGoals.map((g) => g.code))}
                        className="text-blue-600 hover:underline text-[11px] font-semibold cursor-pointer"
                      >
                        {lang === 'ar' ? 'تحديد الكل' : 'Select All'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {customGoals.map((g) => {
                        const isSel = attachedGoalCodes.includes(g.code);
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => toggleAttached('goal', g.code)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 cursor-pointer transition-all ${isSel
                                ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                              }`}
                          >
                            {isSel ? <CheckSquare className="w-3.5 h-3.5 text-teal-600" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                            <span>{g.code} - {g.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Attached Objectives */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        3. {lang === 'ar' ? 'الأهداف الاستراتيجية' : 'Strategic Objectives'} ({attachedObjectiveCodes.length}/{customObjectives.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttachedObjectiveCodes(customObjectives.map((o) => o.code))}
                        className="text-blue-600 hover:underline text-[11px] font-semibold cursor-pointer"
                      >
                        {lang === 'ar' ? 'تحديد الكل' : 'Select All'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {customObjectives.map((o) => {
                        const isSel = attachedObjectiveCodes.includes(o.code);
                        return (
                          <button
                            key={o.id}
                            type="button"
                            onClick={() => toggleAttached('objective', o.code)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 cursor-pointer transition-all ${isSel
                                ? 'bg-purple-50 border-purple-500 text-purple-900 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                              }`}
                          >
                            {isSel ? <CheckSquare className="w-3.5 h-3.5 text-purple-600" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                            <span>{o.code} - {o.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Attached KPIs */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        4. {lang === 'ar' ? 'مؤشرات قياس الأداء' : 'Key Performance Indicators'} ({attachedKpiCodes.length}/{customKpis.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttachedKpiCodes(customKpis.map((k) => k.code))}
                        className="text-blue-600 hover:underline text-[11px] font-semibold cursor-pointer"
                      >
                        {lang === 'ar' ? 'تحديد الكل' : 'Select All'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {customKpis.map((k) => {
                        const isSel = attachedKpiCodes.includes(k.code);
                        return (
                          <button
                            key={k.id}
                            type="button"
                            onClick={() => toggleAttached('kpi', k.code)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 cursor-pointer transition-all ${isSel
                                ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                              }`}
                          >
                            {isSel ? <CheckSquare className="w-3.5 h-3.5 text-amber-600" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                            <span>{k.code} - {k.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 5. Attached Initiatives & Flagship Projects */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        5. {lang === 'ar' ? 'المبادرات والمشاريع الكبرى' : 'Initiatives & Flagship Projects'} ({attachedInitiativeCodes.length}/{customInitiatives.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setAttachedInitiativeCodes(customInitiatives.map((i) => i.code))}
                        className="text-blue-600 hover:underline text-[11px] font-semibold cursor-pointer"
                      >
                        {lang === 'ar' ? 'تحديد الكل' : 'Select All'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {customInitiatives.map((i) => {
                        const isSel = attachedInitiativeCodes.includes(i.code);
                        return (
                          <button
                            key={i.id}
                            type="button"
                            onClick={() => toggleAttached('initiative', i.code)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 cursor-pointer transition-all ${isSel
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                              }`}
                          >
                            {isSel ? <CheckSquare className="w-3.5 h-3.5 text-emerald-600" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                            <span>{i.code} - {i.flagshipProject || i.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Hierarchy Tree Visual Preview Banner */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-bold text-blue-900">
                      {lang === 'ar' ? 'ملخص الهيكل الهرمي المرتبط:' : 'Cascading Blueprint Hierarchy:'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-blue-800 font-semibold">
                    <span>{attachedPillarCodes.length} Pillars</span>
                    <span>➔</span>
                    <span>{attachedGoalCodes.length} Goals</span>
                    <span>➔</span>
                    <span>{attachedObjectiveCodes.length} OKRs</span>
                    <span>➔</span>
                    <span>{attachedKpiCodes.length} KPIs</span>
                    <span>➔</span>
                    <span>{attachedInitiativeCodes.length} Flagships</span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* STEP 9: MONITORING, EXECUTIVE SCORECARD & LAUNCH (Chapter 4) */}
            {/* ========================================================== */}
            {currentStep === 9 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        CHAPTER 4 • STEP 9 OF 9
                      </span>
                      <span className="text-xs text-slate-500">{lang === 'ar' ? 'استعراض الأداء والإطلاق' : 'Review & Launch'}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                      {lang === 'ar' ? 'استعراض بطاقة الأداء المتوازن وإطلاق المنظومة' : 'Executive Scorecard Review & Platform Launch'}
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ar'
                        ? 'مراجعة الميثاق الاستراتيجي الكامل، تصدير التقارير، وتفعيل المنظومة لتعكس البيانات فوراً عبر كافة شاشات المنصة.'
                        : 'Final review of strategy architecture, export options, and live platform deployment.'}
                    </p>
                  </div>
                </div>

                {/* Scorecard KPI Summary Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span>{lang === 'ar' ? 'الركائز الاستراتيجية' : 'Strategic Pillars'}</span>
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">{customPillars.length}</div>
                    <span className="text-[10px] text-slate-500">{attachedPillarCodes.length} attached</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span>{lang === 'ar' ? 'الأهداف الاستراتيجية' : 'Strategic OKRs'}</span>
                      <Layers className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">{customObjectives.length}</div>
                    <span className="text-[10px] text-slate-500">{attachedObjectiveCodes.length} attached</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span>{lang === 'ar' ? 'مؤشرات الأداء (KPIs)' : 'Active KPIs'}</span>
                      <BarChart3 className="w-4 h-4 text-teal-600" />
                    </div>
                    <div className="text-2xl font-bold text-slate-900 font-mono">{customKpis.length}</div>
                    <span className="text-[10px] text-slate-500">{attachedKpiCodes.length} monitored</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                      <span>{lang === 'ar' ? 'إجمالي الميزانيات SAR' : 'Total Capex SAR'}</span>
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-xl font-bold text-emerald-700 font-mono">
                      {(customInitiatives.reduce((acc, cur) => acc + (cur.budgetSAR || 0), 0) / 1000000).toFixed(1)}M
                    </div>
                    <span className="text-[10px] text-slate-500">{customInitiatives.length} initiatives</span>
                  </div>
                </div>

                {/* Master Charter Review Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <OrganizationLogo logoId={orgLogo} logoUrl={orgLogoUrl} size="md" />
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          {orgName || 'Al-Ahsa Development Authority'}
                        </h2>
                        <p className="text-xs text-blue-600 font-semibold">
                          {strategyPlanName || 'AHDA Comprehensive Transformation Strategy 2026–2030'}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      STATUS: READY TO LAUNCH
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block mb-1 font-semibold">{lang === 'ar' ? 'الرؤية:' : 'Vision:'}</span>
                      <p className="text-slate-800 italic">
                        "{orgVision || 'To establish Al-Ahsa as a global benchmark for sustainable oasis living, UNESCO heritage excellence, and economic prosperity.'}"
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-1 font-semibold">{lang === 'ar' ? 'الرسالة والتفويض:' : 'Mission & Mandate:'}</span>
                      <p className="text-slate-800 italic">
                        "{orgMission || 'To spearhead integrated spatial planning and unleash investments across Al-Ahsa.'}"
                      </p>
                    </div>
                  </div>

                  {/* Quick Export Actions */}
                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => toast.success(lang === 'ar' ? 'تم تجهيز تقرير الميثاق الاستراتيجي PDF' : 'PDF Strategy Charter Generated')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>{lang === 'ar' ? 'تصدير وثيقة الميثاق (PDF)' : 'Export Strategy Charter (PDF)'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toast.success(lang === 'ar' ? 'تم تجهيز جدول البيانات Excel' : 'Excel Matrix Generated')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium cursor-pointer shadow-2xs"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{lang === 'ar' ? 'تصدير مصفوفة المؤشرات (Excel)' : 'Export Matrix (Excel)'}</span>
                    </button>
                  </div>
                </div>

                {/* Big Launch Platform Banner */}
                <div className="pt-4 flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200 text-center space-y-4 shadow-xs">
                  <div className="p-3 bg-white rounded-2xl shadow-xs border border-blue-100 text-blue-600">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      {lang === 'ar' ? 'هل أنت مستعد لإطلاق المنظومة؟' : 'Ready to Launch Strategy Suite?'}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      {lang === 'ar'
                        ? 'سيتم حفظ كافة البيانات المدخلة في المتصفح وتحديث المنظومة بالكامل، مع تفعيل كافة الشاشات التشغيلية.'
                        : 'All configured entities, pillars, goals, OKRs, KPIs, and initiatives will be saved and reflected live across the platform.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCompleteAndLaunch}
                    className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all transform hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>
                      {lang === 'ar' ? 'حفظ البيانات وتفعيل المنظومة والاستراتيجية' : 'Save & Launch Enterprise Strategy Suite'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================== */}
          {/* BOTTOM STEP NAVIGATION FOOTER (CLEAN WHITE) */}
          {/* ========================================================== */}
          <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between sticky bottom-0 z-30 shadow-xs">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={prevStep}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${currentStep === 1
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400 bg-slate-50'
                  : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 cursor-pointer shadow-2xs'
                }`}
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{lang === 'ar' ? 'السابق' : 'Previous Step'}</span>
            </button>

            <span className="text-xs text-slate-500 font-mono font-semibold">
              {lang === 'ar' ? `الخطوة ${currentStep} من 9` : `Step ${currentStep} of 9`}
            </span>

            {currentStep < 9 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <span>{lang === 'ar' ? 'التالي' : 'Next Step'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCompleteAndLaunch}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{lang === 'ar' ? 'إطلاق المنظومة' : 'Launch Platform'}</span>
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SetupWizardPage;
