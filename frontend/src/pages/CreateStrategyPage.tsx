import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS, AUTHORITY_SECTORS } from '../data/mockData';
import {
  Target,
  ArrowLeft,
  Sparkles,
  Layers,
  BarChart3,
  Calendar,
  DollarSign,
  User,
  Building,
  CheckCircle2,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Leaf,
  Globe,
  Plus,
  RefreshCw,
  Calculator,
  Compass,
  FolderGit2,
  Milestone,
  Check,
  CheckSquare,
  ChevronRight,
  GitBranch,
  ListTree,
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

const COLOR_OPTIONS = [
  { id: 'blue', name: 'Executive Blue', bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-700', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'indigo', name: 'Royal Indigo', bg: 'bg-indigo-600', border: 'border-indigo-500', text: 'text-indigo-700', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'emerald', name: 'Emerald Green', bg: 'bg-emerald-600', border: 'border-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'teal', name: 'Coastal Teal', bg: 'bg-teal-600', border: 'border-teal-500', text: 'text-teal-700', badge: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'purple', name: 'Deep Purple', bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-purple-700', badge: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'amber', name: 'Warm Amber', bg: 'bg-amber-600', border: 'border-amber-500', text: 'text-amber-700', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'rose', name: 'Ruby Rose', bg: 'bg-rose-600', border: 'border-rose-500', text: 'text-rose-700', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
];

const PRESETS = [
  {
    name: '🌴 2.1.1 Event Visitor Indicator',
    badge: 'Initiative 6',
    themeId: 'st-people',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Empower community participation, civic awareness of the development strategy, and improve quality of life and oasis services.',
    color: 'blue',
    weight: 35,
    goalId: 'sg-people-1',
    goalCode: 'SG-2.1',
    goalTitle: 'Community Participation & Development Strategy Awareness',
    goalDescription: 'Foster active civic participation, digital dialogue, and widespread community alignment with the Al-Ahsa Development Strategy.',
    objId: 'so-2-1',
    objCode: '2.1',
    objTitle: '2.1 Enhance Community Participation and Awareness of the Development Strategy',
    sectorId: 'sec-ssd',
    sectorName: 'Strategy & Sector Development Sector',
    department: 'Tourism Destination Management Office',
    targetYear: 2027,
    progress: 84,
    objStatus: 'on-track' as const,
    kpiCode: '2.1.1',
    kpiName: 'Event Visitor Indicator',
    kpiNameAr: 'مؤشر زوار الفعاليات',
    kpiFormula: '(Total Actual Event Visitors - Total Targeted Visitors) * 100%',
    kpiBaseline: '-',
    kpiTarget2026: '75%',
    kpiTarget2027: '80%',
    kpiTarget: 75,
    kpiActual: 74,
    kpiUnit: '%',
    kpiFrequency: 'Annual' as const,
    kpiStatus: 'on-track' as const,
    initId: 'init-aha-1',
    initCode: 'INIT-6',
    initTitle: 'Initiative 6: Raise awareness of the Al-Ahsa Strategy and increase digital engagement',
    initDescription: 'Comprehensive public awareness campaign, multimedia storytelling of the Al-Ahsa Development Strategy, and active digital engagement channels.',
    budgetSAR: 8500000,
    spentSAR: 5200000,
    keyMilestone: 'Develop community awareness framework',
    keyProject: 'Al-Ahsa Strategy Awareness Project',
    milestoneTitle: 'Develop community awareness framework',
    milestoneDate: '2026-06-30',
  },
  {
    name: '📱 2.1.2 Digital Engagement Index',
    badge: 'Initiative 7',
    themeId: 'st-people',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Empower community participation, civic awareness of the development strategy, and improve quality of life and oasis services.',
    color: 'blue',
    weight: 35,
    goalId: 'sg-people-1',
    goalCode: 'SG-2.1',
    goalTitle: 'Community Participation & Development Strategy Awareness',
    goalDescription: 'Foster active civic participation, digital dialogue, and widespread community alignment with the Al-Ahsa Development Strategy.',
    objId: 'so-2-1',
    objCode: '2.1',
    objTitle: '2.1 Enhance Community Participation and Awareness of the Development Strategy',
    sectorId: 'sec-ssd',
    sectorName: 'Strategy & Sector Development Sector',
    department: 'Strategy Development',
    targetYear: 2027,
    progress: 84,
    objStatus: 'on-track' as const,
    kpiCode: '2.1.2',
    kpiName: 'Digital Engagement Index',
    kpiNameAr: 'مؤشر التفاعل الرقمي مع الهيئة',
    kpiFormula: "Average Results of Engagement Analysis Reports for the Authority's Social Media Platforms",
    kpiBaseline: '2.00%',
    kpiTarget2026: '3.50%',
    kpiTarget2027: '4.00%',
    kpiTarget: 3.5,
    kpiActual: 3.2,
    kpiUnit: '%',
    kpiFrequency: 'Quarterly' as const,
    kpiStatus: 'on-track' as const,
    initId: 'init-aha-2',
    initCode: 'INIT-7',
    initTitle: 'Initiative 7: Increase community participation in development planning',
    initDescription: 'Unified civic engagement digital portal enabling citizens to vote on regional ideas, participate in municipal surveys, and empower local community economy.',
    budgetSAR: 12000000,
    spentSAR: 7800000,
    keyMilestone: 'Unified digital community engagement platform (reporting, surveys, voting, dashboard)',
    keyProject: 'Digital Platforms and Technical Integration for Community Engagement',
    milestoneTitle: 'Unified digital community engagement platform (reporting, surveys, voting, dashboard)',
    milestoneDate: '2026-12-15',
  },
  {
    name: '🗳️ 2.1.3 Awareness of Al-Ahsa Strategy',
    badge: 'Initiative 6',
    themeId: 'st-people',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Empower community participation, civic awareness of the development strategy, and improve quality of life and oasis services.',
    color: 'blue',
    weight: 35,
    goalId: 'sg-people-1',
    goalCode: 'SG-2.1',
    goalTitle: 'Community Participation & Development Strategy Awareness',
    goalDescription: 'Foster active civic participation, digital dialogue, and widespread community alignment with the Al-Ahsa Development Strategy.',
    objId: 'so-2-1',
    objCode: '2.1',
    objTitle: '2.1 Enhance Community Participation and Awareness of the Development Strategy',
    sectorId: 'sec-ppm',
    sectorName: 'Programs & Projects Management Sector',
    department: 'Regional Programs & Projects',
    targetYear: 2027,
    progress: 84,
    objStatus: 'on-track' as const,
    kpiCode: '2.1.3',
    kpiName: 'Awareness of Al-Ahsa Development Strategy',
    kpiNameAr: 'مؤشر الوعي باستراتيجية تطوير الأحساء',
    kpiFormula: 'Average Survey Results',
    kpiBaseline: '-',
    kpiTarget2026: '-',
    kpiTarget2027: '40%',
    kpiTarget: 40,
    kpiActual: 36,
    kpiUnit: '%',
    kpiFrequency: 'Annual' as const,
    kpiStatus: 'on-track' as const,
    initId: 'init-aha-1',
    initCode: 'INIT-6',
    initTitle: 'Initiative 6: Raise awareness of the Al-Ahsa Strategy and increase digital engagement',
    initDescription: 'Comprehensive public awareness campaign, multimedia storytelling of the Al-Ahsa Development Strategy, and active digital engagement channels.',
    budgetSAR: 8500000,
    spentSAR: 5200000,
    keyMilestone: 'Develop community awareness framework',
    keyProject: 'Al-Ahsa Strategy Awareness Project',
    milestoneTitle: 'Develop community awareness framework',
    milestoneDate: '2026-06-30',
  },
  {
    name: '🎪 2.1.4 Number of Festival / Show Days',
    badge: 'Initiative 7',
    themeId: 'st-people',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Empower community participation, civic awareness of the development strategy, and improve quality of life and oasis services.',
    color: 'blue',
    weight: 35,
    goalId: 'sg-people-1',
    goalCode: 'SG-2.1',
    goalTitle: 'Community Participation & Development Strategy Awareness',
    goalDescription: 'Foster active civic participation, digital dialogue, and widespread community alignment with the Al-Ahsa Development Strategy.',
    objId: 'so-2-1',
    objCode: '2.1',
    objTitle: '2.1 Enhance Community Participation and Awareness of the Development Strategy',
    sectorId: 'sec-ssd',
    sectorName: 'Strategy & Sector Development Sector',
    department: 'Tourism Destination Management Office',
    targetYear: 2027,
    progress: 84,
    objStatus: 'on-track' as const,
    kpiCode: '2.1.4',
    kpiName: 'Number of Festival / Show Days',
    kpiNameAr: 'عدد أيام إقامة المهرجانات والفعاليات',
    kpiFormula: 'Total Number of Days Festivals and Shows Are Held',
    kpiBaseline: '70',
    kpiTarget2026: '73',
    kpiTarget2027: '75',
    kpiTarget: 73,
    kpiActual: 71,
    kpiUnit: 'Days',
    kpiFrequency: 'Annual' as const,
    kpiStatus: 'on-track' as const,
    initId: 'init-aha-2',
    initCode: 'INIT-7',
    initTitle: 'Initiative 7: Increase community participation in development planning',
    initDescription: 'Unified civic engagement digital portal enabling citizens to vote on regional ideas, participate in municipal surveys, and empower local community economy.',
    budgetSAR: 12000000,
    spentSAR: 7800000,
    keyMilestone: 'Support Local Initiatives and the Community Economy',
    keyProject: 'Community Empowerment, Events and Impact Project',
    milestoneTitle: 'Support Local Initiatives and the Community Economy',
    milestoneDate: '2027-03-31',
  },
  {
    name: "🏡 2.2.1 Residents' Satisfaction Index",
    badge: 'Initiative 8',
    themeId: 'st-people',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Empower community participation, civic awareness of the development strategy, and improve quality of life and oasis services.',
    color: 'blue',
    weight: 35,
    goalId: 'sg-people-2',
    goalCode: 'SG-2.2',
    goalTitle: 'Quality of Life & Community Services Elevation',
    goalDescription: 'Support regional partner entities to enhance municipal service delivery, residents satisfaction, and environmental oasis preservation.',
    objId: 'so-2-2',
    objCode: '2.2',
    objTitle: '2.2 Support Entities in Improving Quality of Life and Enhancing Services Provided to the Community',
    sectorId: 'sec-sud',
    sectorName: 'Spatial & Urban Development Sector',
    department: 'Urban Observatory',
    targetYear: 2027,
    progress: 79,
    objStatus: 'on-track' as const,
    kpiCode: '2.2.1',
    kpiName: "Residents' Satisfaction Index",
    kpiNameAr: 'مؤشر رضا السكان',
    kpiFormula: 'Customer Satisfaction Index (CSI) from Urban Observatory Surveys',
    kpiBaseline: '-',
    kpiTarget2026: '-',
    kpiTarget2027: '50%',
    kpiTarget: 50,
    kpiActual: 46,
    kpiUnit: '%',
    kpiFrequency: 'Annual' as const,
    kpiStatus: 'on-track' as const,
    initId: 'init-aha-3',
    initCode: 'INIT-8',
    initTitle: 'Initiative 8: Enhance and Improve Quality of Life in Al-Ahsa',
    initDescription: 'Al-Ahsa Quality of Life framework alignment with the national Vision 2030 Quality of Life Program, inter-agency integration, and UNESCO oasis date palm preservation.',
    budgetSAR: 16500000,
    spentSAR: 11400000,
    keyMilestone: 'Quality of Life Indicators Framework and Monitoring Dashboard',
    keyProject: 'Quality of Life Improvement Project',
    milestoneTitle: 'Quality of Life Indicators Framework and Monitoring Dashboard',
    milestoneDate: '2026-08-31',
  },
  {
    name: '🌴 2.2.2 Number of Palm Trees in Oasis',
    badge: 'Initiative 8',
    themeId: 'st-people',
    themeCode: '02',
    themeTitle: '02 People and Society',
    themeDescription: 'Empower community participation, civic awareness of the development strategy, and improve quality of life and oasis services.',
    color: 'emerald',
    weight: 35,
    goalId: 'sg-people-2',
    goalCode: 'SG-2.2',
    goalTitle: 'Quality of Life & Community Services Elevation',
    goalDescription: 'Support regional partner entities to enhance municipal service delivery, residents satisfaction, and environmental oasis preservation.',
    objId: 'so-2-2',
    objCode: '2.2',
    objTitle: '2.2 Support Entities in Improving Quality of Life and Enhancing Services Provided to the Community',
    sectorId: 'sec-sud',
    sectorName: 'Spatial & Urban Development Sector',
    department: 'Urban Observatory',
    targetYear: 2027,
    progress: 79,
    objStatus: 'achieved' as const,
    kpiCode: '2.2.2',
    kpiName: 'Number of Palm Trees within the Oasis',
    kpiNameAr: 'عدد أشجار النخيل داخل الواحة',
    kpiFormula: 'Total Number of Palm Trees (in Millions)',
    kpiBaseline: '2.5M',
    kpiTarget2026: '2.5M',
    kpiTarget2027: '2.5M',
    kpiTarget: 2.5,
    kpiActual: 2.5,
    kpiUnit: 'M Trees',
    kpiFrequency: 'Annual' as const,
    kpiStatus: 'achieved' as const,
    initId: 'init-aha-3',
    initCode: 'INIT-8',
    initTitle: 'Initiative 8: Enhance and Improve Quality of Life in Al-Ahsa',
    initDescription: 'Al-Ahsa Quality of Life framework alignment with the national Vision 2030 Quality of Life Program, inter-agency integration, and UNESCO oasis date palm preservation.',
    budgetSAR: 16500000,
    spentSAR: 11400000,
    keyMilestone: 'Quality of Life Indicators Framework and Monitoring Dashboard',
    keyProject: 'Quality of Life Improvement Project',
    milestoneTitle: 'Quality of Life Indicators Framework and Monitoring Dashboard',
    milestoneDate: '2026-08-31',
  },
];

export const CreateStrategyPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { themes, goals, objectives, initiatives, addStrategy, currentUser, lang } = useApp();

  // Mode toggles: 'existing' vs 'new'
  const [pillarMode, setPillarMode] = useState<'existing' | 'new'>('existing');
  const [goalMode, setGoalMode] = useState<'existing' | 'new'>('existing');
  const [objectiveMode, setObjectiveMode] = useState<'existing' | 'new'>('existing');
  const [initiativeMode, setInitiativeMode] = useState<'existing' | 'new'>('existing');

  // Selected Entity IDs
  const defaultTheme = themes.find((t) => t.code === '02' || t.id === 'st-people') || themes[0];
  const [selectedThemeId, setSelectedThemeId] = useState<string>(defaultTheme?.id || '');

  // Filtered goals for the selected pillar
  const availableGoals = goals.filter((g) => g.themeId === selectedThemeId);
  const [selectedGoalId, setSelectedGoalId] = useState<string>(availableGoals[0]?.id || '');

  // Filtered objectives for the selected goal or pillar
  const availableObjectives = objectives.filter(
    (o) => o.themeId === selectedThemeId || (selectedGoalId && o.goalId === selectedGoalId)
  );
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<string>(availableObjectives[0]?.id || '');

  // Filtered initiatives for the selected objective
  const availableInitiatives = initiatives.filter(
    (i) => i.objectiveId === selectedObjectiveId
  );
  const displayInitiatives = availableInitiatives.length > 0 ? availableInitiatives : initiatives;
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string>(displayInitiatives[0]?.id || '');

  // Custom project/milestone mode within existing initiative
  const [projectPickerMode, setProjectPickerMode] = useState<'select' | 'custom'>('select');
  const [milestonePickerMode, setMilestonePickerMode] = useState<'select' | 'custom'>('select');

  // Form states - Core Theme & Goal
  const [themeCode, setThemeCode] = useState(defaultTheme?.code || '02');
  const [themeTitle, setThemeTitle] = useState(defaultTheme?.title || '02 People and Society');
  const [themeDescription, setThemeDescription] = useState(
    defaultTheme?.description ||
    'Empower community participation, civic awareness of the development strategy, and improve quality of life and oasis services.'
  );
  const [themeColor, setThemeColor] = useState(defaultTheme?.color || 'blue');
  const [themeWeight, setThemeWeight] = useState(defaultTheme?.weight || 35);

  const [goalCode, setGoalCode] = useState(availableGoals[0]?.code || 'SG-2.1');
  const [goalTitle, setGoalTitle] = useState(availableGoals[0]?.title || 'Community Participation & Development Strategy Awareness');
  const [goalDescription, setGoalDescription] = useState(availableGoals[0]?.description || 'Foster active civic participation and widespread community alignment.');

  // Objective & Sector Cascading
  const [objCode, setObjCode] = useState(availableObjectives[0]?.code || '2.1');
  const [objTitle, setObjTitle] = useState(
    availableObjectives[0]?.title || '2.1 Enhance Community Participation and Awareness of the Development Strategy'
  );
  const [objOwner, setObjOwner] = useState(availableObjectives[0]?.owner || currentUser.name);
  const [sectorId, setSectorId] = useState(availableObjectives[0]?.sectorId || 'sec-ssd');
  const [sectorName, setSectorName] = useState(availableObjectives[0]?.sectorName || 'Strategy & Sector Development Sector');
  const [objDept, setObjDept] = useState(availableObjectives[0]?.department || 'Strategy Development');
  const [targetYear, setTargetYear] = useState(availableObjectives[0]?.targetYear || 2027);
  const [objProgress, setObjProgress] = useState(availableObjectives[0]?.progress || 84);
  const [objStatus, setObjStatus] = useState<'on-track' | 'at-risk' | 'behind' | 'achieved'>(
    availableObjectives[0]?.status || 'on-track'
  );

  // KPI & Matrix Mathematical Specification
  const [kpiCode, setKpiCode] = useState('2.1.1');
  const [kpiName, setKpiName] = useState('Event Visitor Indicator');
  const [kpiNameAr, setKpiNameAr] = useState('مؤشر زوار الفعاليات');
  const [kpiFormula, setKpiFormula] = useState('(Total Actual Event Visitors - Total Targeted Visitors) * 100%');
  const [kpiBaseline, setKpiBaseline] = useState<string | number>('-');
  const [kpiTarget2026, setKpiTarget2026] = useState<string | number>('75%');
  const [kpiTarget2027, setKpiTarget2027] = useState<string | number>('80%');
  const [kpiTarget, setKpiTarget] = useState(75);
  const [kpiActual, setKpiActual] = useState(74);
  const [kpiUnit, setKpiUnit] = useState('%');
  const [kpiFrequency, setKpiFrequency] = useState<'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual'>('Annual');
  const [kpiStatus, setKpiStatus] = useState<'on-track' | 'warning' | 'critical' | 'achieved'>('on-track');
  const [keyProject, setKeyProject] = useState('Al-Ahsa Strategy Awareness Project');
  const [keyMilestone, setKeyMilestone] = useState('Develop community awareness framework');
  const [pillarCode, setPillarCode] = useState('02');

  // Initiative & Budget
  const [initCode, setInitCode] = useState(displayInitiatives[0]?.code || 'INIT-6');
  const [initTitle, setInitTitle] = useState(
    displayInitiatives[0]?.title || 'Initiative 6: Raise awareness of the Al-Ahsa Strategy and increase digital engagement'
  );
  const [initDescription, setInitDescription] = useState(
    displayInitiatives[0]?.description ||
    'Comprehensive public awareness campaign, multimedia storytelling of the Al-Ahsa Development Strategy, and active digital engagement channels.'
  );
  const [budgetSAR, setBudgetSAR] = useState(displayInitiatives[0]?.budgetSAR || 8500000);
  const [spentSAR, setSpentSAR] = useState(displayInitiatives[0]?.spentSAR || 5200000);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');
  const [milestoneTitle, setMilestoneTitle] = useState('Develop community awareness framework');
  const [milestoneDueDate, setMilestoneDueDate] = useState('2026-06-30');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync when Pillar changes in existing mode
  const handlePillarChange = (themeId: string) => {
    setSelectedThemeId(themeId);
    const chosenTheme = themes.find((t) => t.id === themeId);
    if (chosenTheme) {
      setThemeCode(chosenTheme.code);
      setThemeTitle(chosenTheme.title);
      setThemeDescription(chosenTheme.description);
      setThemeColor(chosenTheme.color);
      setThemeWeight(chosenTheme.weight);
      setPillarCode(chosenTheme.code);

      // Auto update nested goals
      const goalsForTheme = goals.filter((g) => g.themeId === themeId);
      const firstGoal = goalsForTheme[0];
      if (firstGoal) {
        setSelectedGoalId(firstGoal.id);
        setGoalCode(firstGoal.code);
        setGoalTitle(firstGoal.title);
        setGoalDescription(firstGoal.description || '');
      }

      // Auto update nested objectives
      const objsForTheme = objectives.filter((o) => o.themeId === themeId);
      const firstObj = objsForTheme[0];
      if (firstObj) {
        handleObjectiveChange(firstObj.id);
      }
    }
  };

  // Sync when Goal changes in existing mode
  const handleGoalChange = (gId: string) => {
    setSelectedGoalId(gId);
    const chosenGoal = goals.find((g) => g.id === gId);
    if (chosenGoal) {
      setGoalCode(chosenGoal.code);
      setGoalTitle(chosenGoal.title);
      setGoalDescription(chosenGoal.description || '');

      // Filter objectives under this goal
      const objsForGoal = objectives.filter((o) => o.goalId === gId);
      const firstObj = objsForGoal[0];
      if (firstObj) {
        handleObjectiveChange(firstObj.id);
      }
    }
  };

  // Sync when Objective changes in existing mode
  const handleObjectiveChange = (oId: string) => {
    setSelectedObjectiveId(oId);
    const chosenObj = objectives.find((o) => o.id === oId);
    if (chosenObj) {
      setObjCode(chosenObj.code);
      setObjTitle(chosenObj.title);
      setObjOwner(chosenObj.owner);
      setObjDept(chosenObj.department);
      if (chosenObj.sectorId) setSectorId(chosenObj.sectorId);
      if (chosenObj.sectorName) setSectorName(chosenObj.sectorName);
      if (chosenObj.targetYear) setTargetYear(chosenObj.targetYear);
      if (chosenObj.progress !== undefined) setObjProgress(chosenObj.progress);
      if (chosenObj.status) setObjStatus(chosenObj.status);

      // Update available initiatives for this objective
      const initsForObj = initiatives.filter((i) => i.objectiveId === oId);
      const firstInit = initsForObj[0];
      if (firstInit) {
        handleInitiativeChange(firstInit.id);
      }
    }
  };

  // Sync when Initiative changes in existing mode
  const handleInitiativeChange = (iId: string) => {
    setSelectedInitiativeId(iId);
    const chosenInit = initiatives.find((i) => i.id === iId);
    if (chosenInit) {
      setInitCode(chosenInit.code);
      setInitTitle(chosenInit.title);
      setInitDescription(chosenInit.description || '');
      setBudgetSAR(chosenInit.budgetSAR || 5000000);
      setSpentSAR(chosenInit.spentSAR || 1000000);
      if (chosenInit.startDate) setStartDate(chosenInit.startDate);
      if (chosenInit.endDate) setEndDate(chosenInit.endDate);

      // Populate default project and milestone from this initiative
      if (chosenInit.keyProjects && chosenInit.keyProjects.length > 0 && chosenInit.keyProjects[0]) {
        setKeyProject(chosenInit.keyProjects[0]);
      }
      if (chosenInit.milestones && chosenInit.milestones.length > 0 && chosenInit.milestones[0]) {
        setKeyMilestone(chosenInit.milestones[0].title);
        setMilestoneTitle(chosenInit.milestones[0].title);
        setMilestoneDueDate(chosenInit.milestones[0].dueDate);
      }
    }
  };

  const selectedInitiativeObj = initiatives.find((i) => i.id === selectedInitiativeId);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    // Set modes
    setPillarMode('existing');
    setGoalMode('existing');
    setObjectiveMode('existing');
    setInitiativeMode('existing');

    if (preset.themeId) setSelectedThemeId(preset.themeId);
    if (preset.goalId) setSelectedGoalId(preset.goalId);
    if (preset.objId) setSelectedObjectiveId(preset.objId);
    if (preset.initId) setSelectedInitiativeId(preset.initId);

    setThemeCode(preset.themeCode || '02');
    setThemeTitle(preset.themeTitle);
    setThemeDescription(preset.themeDescription);
    setThemeColor(preset.color);
    setThemeWeight(preset.weight);
    setGoalCode(preset.goalCode);
    setGoalTitle(preset.goalTitle);
    setGoalDescription(preset.goalDescription);
    setObjCode(preset.objCode);
    setObjTitle(preset.objTitle);
    setSectorId(preset.sectorId);
    setSectorName(preset.sectorName);
    setObjDept(preset.department);
    setTargetYear(preset.targetYear);
    setObjProgress(preset.progress);
    setObjStatus(preset.objStatus);
    setKpiCode(preset.kpiCode);
    setKpiName(preset.kpiName);
    setKpiNameAr(preset.kpiNameAr || '');
    setKpiFormula(preset.kpiFormula);
    setKpiBaseline(preset.kpiBaseline);
    setKpiTarget2026(preset.kpiTarget2026);
    setKpiTarget2027(preset.kpiTarget2027);
    setKeyProject(preset.keyProject);
    setKeyMilestone(preset.keyMilestone);
    setPillarCode(preset.themeCode || '02');
    setKpiTarget(preset.kpiTarget);
    setKpiActual(preset.kpiActual);
    setKpiUnit(preset.kpiUnit);
    setKpiFrequency(preset.kpiFrequency);
    setKpiStatus(preset.kpiStatus);
    setInitCode(preset.initCode);
    setInitTitle(preset.initTitle);
    setInitDescription(preset.initDescription);
    setBudgetSAR(preset.budgetSAR);
    setSpentSAR(preset.spentSAR);
    setMilestoneTitle(preset.milestoneTitle);
    setMilestoneDueDate(preset.milestoneDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeTitle.trim() || !goalTitle.trim() || !objTitle.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addStrategy({
        selectedThemeId: pillarMode === 'existing' ? selectedThemeId : undefined,
        selectedGoalId: goalMode === 'existing' ? selectedGoalId : undefined,
        selectedObjectiveId: objectiveMode === 'existing' ? selectedObjectiveId : undefined,
        selectedInitiativeId: initiativeMode === 'existing' ? selectedInitiativeId : undefined,
        theme: {
          code: themeCode.trim() || '02',
          title: themeTitle.trim(),
          description: themeDescription.trim(),
          color: themeColor,
          weight: Number(themeWeight),
        },
        goal: {
          code: goalCode.trim() || 'SG-2.1',
          title: goalTitle.trim(),
          description: goalDescription.trim(),
        },
        objective: {
          code: objCode.trim() || '2.1',
          title: objTitle.trim(),
          owner: objOwner.trim() || currentUser.name,
          department: objDept,
          sectorId,
          sectorName,
          targetYear: Number(targetYear),
          progress: Number(objProgress),
          status: objStatus,
        },
        kpi: kpiName.trim()
          ? {
            code: kpiCode.trim() || '2.1.1',
            name: kpiName.trim(),
            unit: kpiUnit.trim() || '%',
            target: Number(kpiTarget),
            actual: Number(kpiActual),
            frequency: kpiFrequency,
            status: kpiStatus,
            formula: kpiFormula.trim(),
            baseline: kpiBaseline,
            target2026: kpiTarget2026,
            target2027: kpiTarget2027,
            strategicInitiative: initTitle.trim(),
            keyMilestone: keyMilestone.trim() || milestoneTitle.trim(),
            keyProject: keyProject.trim(),
            pillarCode: pillarCode || '02',
            pillarTitle: themeTitle || '02 People and Society',
          }
          : undefined,
        initiative: initTitle.trim()
          ? {
            code: initCode.trim() || 'INIT-6',
            title: initTitle.trim(),
            description: initDescription.trim(),
            owner: objOwner,
            department: objDept,
            budgetSAR: Number(budgetSAR),
            spentSAR: Number(spentSAR),
            progress: Number(objProgress),
            startDate,
            endDate,
            status: 'In Progress',
            milestones: [
              {
                title: milestoneTitle.trim() || 'Core Deliverable Approval',
                dueDate: milestoneDueDate,
                status: 'In Progress',
              },
            ],
            keyProjects: keyProject.trim() ? [keyProject.trim()] : undefined,
          }
          : undefined,
      });

      // Redirect back to Strategy screen
      navigate('/strategy');
    } catch (err) {
      console.error('Error creating strategy:', err);
      setIsSubmitting(false);
    }
  };

  const selectedColorObj = COLOR_OPTIONS.find((c) => c.id === themeColor) || COLOR_OPTIONS[0];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
            <Link
              to="/strategy"
              className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180 ml-0.5' : 'mr-0.5'}`} />
              <span>{lang === 'ar' ? 'هندسة الاستراتيجية ومصفوفة المواءمة' : 'Strategy Architecture'}</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-bold uppercase">{lang === 'ar' ? 'صياغة المواءمة الاستراتيجية للهيئة' : 'AHDA Cascading Formulation'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'صياغة الأداء الاستراتيجي والمبادرات' : 'Strategic Performance & Initiative Formulation'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {lang === 'ar'
              ? 'تطبيق نموذج المواءمة المتعدد: ربط الركائز الاستراتيجية الجديدة أو القائمة، بالأهداف، والمؤشرات متعددة السنوات (2026/2027)، والمبادرات الاستراتيجية مع المعالم والمشاريع التنفيذية.'
              : 'Execute the 1-to-many cascading model: Link new or existing Strategic Pillars, Objectives, Multi-Year KPIs (2026/2027), and Strategic Initiatives with deliverables and projects.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/strategy"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>{isSubmitting ? (lang === 'ar' ? 'جاري الاعتماد...' : 'Deploying Strategy...') : (lang === 'ar' ? 'حفظ ومواءمة الاستراتيجية' : 'Save & Cascade Strategy')}</span>
          </button>
        </div>
      </div>

      {/* Preset Strategy Templates Banner (from AHDA Diagram) */}
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 p-4 rounded-2xl border border-blue-100 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{lang === 'ar' ? 'نماذج استراتيجية هيئة تطوير الأحساء المعتمدة (انقر للتحميل الفوري)' : 'AHDA Strategic Model Benchmarks (Click to load diagram preset)'}</span>
          </div>
          <span className="text-[11px] font-mono text-blue-600">{lang === 'ar' ? '6 مؤشرات ومبادرات معتمدة' : '6 Verified KPIs & Initiatives'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              className="p-2.5 bg-white/90 hover:bg-white border border-blue-200/70 hover:border-blue-400 rounded-xl text-left text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
            >
              <div className="flex items-center justify-between font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                <span className="truncate">{p.name}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 shrink-0 ml-1">
                  {p.badge}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{p.keyProject}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form (7 cols) + Live Preview (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Area */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          {/* Card 1: Strategic Pillar / Theme */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Strategic Pillar (Theme)</h3>
                  <p className="text-[11px] text-slate-500">Core organizational vision pillar & executive priority</p>
                </div>
              </div>

              {/* Segmented Mode Selector */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPillarMode('existing')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${pillarMode === 'existing' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Select Existing Pillar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPillarMode('new');
                    setSelectedThemeId('');
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${pillarMode === 'new' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  + Create New Pillar
                </button>
              </div>
            </div>

            {pillarMode === 'existing' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Choose Strategic Pillar from Register
                  </label>
                  <select
                    value={selectedThemeId}
                    onChange={(e) => handlePillarChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
                  >
                    {themes.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.code} — {lang === 'ar' ? (t.titleAr || t.title) : t.title} ({t.weight}% weight)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Pillar Summary Badge */}
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200/60 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-blue-600 text-white text-[11px]">
                        {themeCode}
                      </span>
                      <span className="font-bold text-slate-900">{themeTitle}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{themeDescription}</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200 shrink-0">
                    Weight: {themeWeight}%
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pillar Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={themeCode}
                      onChange={(e) => {
                        setThemeCode(e.target.value);
                        setPillarCode(e.target.value);
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="e.g. 05"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pillar Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={themeTitle}
                      onChange={(e) => setThemeTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="e.g. Environmental Sustainability & Smart Oasis"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Executive Pillar Description & Strategic Scope <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={themeDescription}
                    onChange={(e) => setThemeDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Describe the long-term impact and institutional mandate..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Theme Accent Color</label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_OPTIONS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setThemeColor(c.id)}
                          className={`w-7 h-7 rounded-lg ${c.bg} transition-all cursor-pointer flex items-center justify-center text-white ${themeColor === c.id ? 'ring-2 ring-offset-2 ring-slate-900 scale-110 shadow-xs' : 'opacity-80 hover:opacity-100'
                            }`}
                          title={c.name}
                        >
                          {themeColor === c.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">Strategic Weight: {themeWeight}%</label>
                      <span className="text-[10px] text-slate-400 font-mono">Relative Priority</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="5"
                      value={themeWeight}
                      onChange={(e) => setThemeWeight(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Strategic Goal */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Strategic Goal</h3>
                  <p className="text-[11px] text-slate-500">Milestone objective nested under the strategic pillar</p>
                </div>
              </div>

              {/* Segmented Mode Selector */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setGoalMode('existing')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${goalMode === 'existing' ? 'bg-white text-teal-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Select Existing Goal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGoalMode('new');
                    setSelectedGoalId('');
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${goalMode === 'new' ? 'bg-white text-teal-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  + Create New Goal
                </button>
              </div>
            </div>

            {goalMode === 'existing' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Choose Existing Goal Under Pillar {themeCode}
                  </label>
                  <select
                    value={selectedGoalId}
                    onChange={(e) => handleGoalChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600 cursor-pointer"
                  >
                    {availableGoals.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.code} — {g.title}
                      </option>
                    ))}
                    {availableGoals.length === 0 && (
                      <option value="">No existing goals under this pillar</option>
                    )}
                  </select>
                </div>

                <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-200/60 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-teal-600 text-white text-[11px]">
                      {goalCode}
                    </span>
                    <span className="font-bold text-slate-900">{goalTitle}</span>
                  </div>
                  {goalDescription && <p className="text-[11px] text-slate-600 mt-1">{goalDescription}</p>}
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Goal Code</label>
                    <input
                      type="text"
                      required
                      value={goalCode}
                      onChange={(e) => setGoalCode(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                      placeholder="e.g. SG-2.3"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Goal Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={goalTitle}
                      onChange={(e) => setGoalTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                      placeholder="e.g. Strategic Destination Empowerment"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Goal Alignment Summary</label>
                  <input
                    type="text"
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                    placeholder="Brief description of desired institutional outcome..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Strategic Objective (Execution Target) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Strategic Objective (OKR Target)</h3>
                  <p className="text-[11px] text-slate-500">Actionable department target with progress tracking</p>
                </div>
              </div>

              {/* Segmented Mode Selector */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setObjectiveMode('existing')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${objectiveMode === 'existing' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Select Existing Objective
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setObjectiveMode('new');
                    setSelectedObjectiveId('');
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${objectiveMode === 'new' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  + Create New Objective
                </button>
              </div>
            </div>

            {objectiveMode === 'existing' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Choose Strategic Objective (e.g. 2.1 or 2.2)
                  </label>
                  <select
                    value={selectedObjectiveId}
                    onChange={(e) => handleObjectiveChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer"
                  >
                    {availableObjectives.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.code} — {o.title}
                      </option>
                    ))}
                    {availableObjectives.length === 0 && (
                      <option value="">No existing objectives found</option>
                    )}
                  </select>
                </div>

                <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200/60 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-600 text-white text-[11px]">
                        {objCode}
                      </span>
                      <span className="font-bold text-slate-900">{objTitle}</span>
                    </div>
                    <StatusBadge status={objStatus} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-indigo-100 text-[11px] font-mono text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[9px]">Lead Officer</span>
                      <span className="font-semibold text-slate-800 truncate block">{objOwner}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Department</span>
                      <span className="font-semibold text-slate-800 truncate block">{objDept}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Target Year</span>
                      <span className="font-semibold text-slate-800">FY {targetYear}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Current Progress</span>
                      <span className="font-bold text-indigo-700">{objProgress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Objective Code</label>
                    <input
                      type="text"
                      required
                      value={objCode}
                      onChange={(e) => setObjCode(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      placeholder="e.g. 2.3"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Objective Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={objTitle}
                      onChange={(e) => setObjTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      placeholder="e.g. Expand Regional Cultural and Heritage Visitor Capacities"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Operational Sector (AHDA 5 Sectors)
                    </label>
                    <select
                      value={sectorId}
                      onChange={(e) => {
                        const selId = e.target.value;
                        setSectorId(selId);
                        const foundSec = AUTHORITY_SECTORS.find((s) => s.id === selId);
                        if (foundSec) {
                          setSectorName(foundSec.name);
                        }
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer"
                    >
                      {AUTHORITY_SECTORS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Directorate</label>
                    <select
                      value={objDept}
                      onChange={(e) => setObjDept(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer"
                    >
                      {DEPARTMENTS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name} ({d.code})
                        </option>
                      ))}
                      <option value="Tourism Destination Management Office">Tourism Destination Management Office</option>
                      <option value="Urban Observatory">Urban Observatory</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Owner / Lead Officer</label>
                    <input
                      type="text"
                      required
                      value={objOwner}
                      onChange={(e) => setObjOwner(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Horizon</label>
                    <select
                      value={targetYear}
                      onChange={(e) => setTargetYear(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer"
                    >
                      <option value={2026}>2026</option>
                      <option value={2027}>2027</option>
                      <option value={2028}>2028</option>
                      <option value={2030}>2030</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Status</label>
                    <select
                      value={objStatus}
                      onChange={(e: any) => setObjStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer"
                    >
                      <option value="on-track">On Track</option>
                      <option value="at-risk">At Risk</option>
                      <option value="behind">Behind</option>
                      <option value="achieved">Achieved</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 4: Key Performance Indicator (KPI & Cascading Matrix Specification) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Key Performance Indicator (KPI & Target)</h3>
                  <p className="text-[11px] text-slate-500">Measurable indicator with formula & multi-year targets (2026–2027)</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Level 4: Cascaded Metric
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">KPI Code</label>
                <input
                  type="text"
                  value={kpiCode}
                  onChange={(e) => setKpiCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="e.g. 2.1.1"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Indicator Name (English)</label>
                <input
                  type="text"
                  value={kpiName}
                  onChange={(e) => setKpiName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="e.g. Event Visitor Indicator"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Indicator Name in Arabic (الاسم بالعربية)
                </label>
                <input
                  type="text"
                  value={kpiNameAr}
                  onChange={(e) => setKpiNameAr(e.target.value)}
                  dir="rtl"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-right"
                  placeholder="مثال: مؤشر زوار الفعاليات"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Measurement Frequency</label>
                <select
                  value={kpiFrequency}
                  onChange={(e: any) => setKpiFrequency(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                >
                  <option value="Annual">Annual</option>
                  <option value="Bi-Annual">Bi-Annual</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>

            {/* Mathematical Calculation Formula */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-blue-600" />
                  <span>Mathematical Calculation Formula</span>
                </label>
                <span className="text-[10px] font-mono text-slate-400">Official execution formula</span>
              </div>
              <input
                type="text"
                value={kpiFormula}
                onChange={(e) => setKpiFormula(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                placeholder="e.g. (Total Actual Event Visitors - Total Targeted Visitors) * 100%"
              />
              {kpiFormula && (
                <div className="mt-1.5 p-2 bg-slate-900 text-blue-300 rounded-lg text-[11px] font-mono flex items-center gap-2 border border-slate-800">
                  <span className="text-slate-400 font-bold">f(x) =</span>
                  <span className="truncate">{kpiFormula}</span>
                </div>
              )}
            </div>

            {/* Multi-Year Cascading Targets & Baseline Grid */}
            <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Cascading Multi-Year Targets (Client Matrix)</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Baseline Value</label>
                  <input
                    type="text"
                    value={kpiBaseline}
                    onChange={(e) => setKpiBaseline(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    placeholder="e.g. 2.00% or 70 or -"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-700 mb-1">Target 2026</label>
                  <input
                    type="text"
                    value={kpiTarget2026}
                    onChange={(e) => setKpiTarget2026(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-mono font-bold text-blue-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    placeholder="e.g. 75%"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-700 mb-1">Target 2027</label>
                  <input
                    type="text"
                    value={kpiTarget2027}
                    onChange={(e) => setKpiTarget2027(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs font-mono font-bold text-emerald-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                    placeholder="e.g. 80%"
                  />
                </div>
              </div>
            </div>

            {/* Execution Measurement Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Numeric Target</label>
                <input
                  type="number"
                  step="any"
                  value={kpiTarget}
                  onChange={(e) => setKpiTarget(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Actual / Current</label>
                <input
                  type="number"
                  step="any"
                  value={kpiActual}
                  onChange={(e) => setKpiActual(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Metric Unit</label>
                <input
                  type="text"
                  value={kpiUnit}
                  onChange={(e) => setKpiUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="%, Days, M Trees, SAR"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={kpiStatus}
                  onChange={(e: any) => setKpiStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                >
                  <option value="on-track">On Track</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                  <option value="achieved">Achieved</option>
                </select>
              </div>
            </div>

            {/* Key Project & Milestone Linkage */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ListTree className="w-4 h-4 text-emerald-600" />
                  <span>Linkage to Deliverables & Projects</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">From Initiative in Step 5</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Key Project Name</span>
                    </label>
                    {selectedInitiativeObj?.keyProjects && selectedInitiativeObj.keyProjects.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setProjectPickerMode(projectPickerMode === 'select' ? 'custom' : 'select')}
                        className="text-[10px] text-blue-600 hover:underline font-mono"
                      >
                        {projectPickerMode === 'select' ? '+ Custom Project' : 'Select from Initiative'}
                      </button>
                    )}
                  </div>

                  {projectPickerMode === 'select' && selectedInitiativeObj?.keyProjects && selectedInitiativeObj.keyProjects.length > 0 ? (
                    <select
                      value={keyProject}
                      onChange={(e) => setKeyProject(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                    >
                      {selectedInitiativeObj.keyProjects.map((p, idx) => (
                        <option key={idx} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={keyProject}
                      onChange={(e) => setKeyProject(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      placeholder="e.g. Al-Ahsa Strategy Awareness Project"
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <Milestone className="w-3.5 h-3.5 text-amber-600" />
                      <span>Key Project Milestone</span>
                    </label>
                    {selectedInitiativeObj?.milestones && selectedInitiativeObj.milestones.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setMilestonePickerMode(milestonePickerMode === 'select' ? 'custom' : 'select')}
                        className="text-[10px] text-blue-600 hover:underline font-mono"
                      >
                        {milestonePickerMode === 'select' ? '+ Custom Milestone' : 'Select from Initiative'}
                      </button>
                    )}
                  </div>

                  {milestonePickerMode === 'select' && selectedInitiativeObj?.milestones && selectedInitiativeObj.milestones.length > 0 ? (
                    <select
                      value={keyMilestone}
                      onChange={(e) => {
                        setKeyMilestone(e.target.value);
                        setMilestoneTitle(e.target.value);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
                    >
                      {selectedInitiativeObj.milestones.map((m) => (
                        <option key={m.id} value={m.title}>
                          {m.title} ({m.dueDate})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={keyMilestone}
                      onChange={(e) => {
                        setKeyMilestone(e.target.value);
                        setMilestoneTitle(e.target.value);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                      placeholder="e.g. Develop community awareness framework"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Strategic Initiative & Budget */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                  5
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Strategic Initiative & Execution Program</h3>
                  <p className="text-[11px] text-slate-500">Funded implementation project delivering this objective</p>
                </div>
              </div>

              {/* Segmented Mode Selector */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setInitiativeMode('existing')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${initiativeMode === 'existing' ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Select Existing Initiative
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInitiativeMode('new');
                    setSelectedInitiativeId('');
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${initiativeMode === 'new' ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  + Create New Initiative
                </button>
              </div>
            </div>

            {initiativeMode === 'existing' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Strategic Initiative (e.g. Initiative 6, 7, 8)
                  </label>
                  <select
                    value={selectedInitiativeId}
                    onChange={(e) => handleInitiativeChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600 cursor-pointer"
                  >
                    {displayInitiatives.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.code} — {i.title}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedInitiativeObj && (
                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-amber-600 text-white text-[11px]">
                            {selectedInitiativeObj.code}
                          </span>
                          <span className="font-bold text-slate-900">{selectedInitiativeObj.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1">{selectedInitiativeObj.description}</p>
                      </div>
                      <StatusBadge status={selectedInitiativeObj.status} />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-amber-200/60 font-mono text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[9px]">Budget</span>
                        <span className="font-bold text-slate-900">
                          SAR {(selectedInitiativeObj.budgetSAR / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">Spent</span>
                        <span className="font-bold text-amber-800">
                          SAR {(selectedInitiativeObj.spentSAR / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">Owner</span>
                        <span className="font-semibold text-slate-800 truncate block">{selectedInitiativeObj.owner}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">Milestones</span>
                        <span className="font-semibold text-slate-800">
                          {selectedInitiativeObj.milestones?.length || 0} Gates
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Initiative Code</label>
                    <input
                      type="text"
                      value={initCode}
                      onChange={(e) => setInitCode(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                      placeholder="e.g. INIT-09"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Initiative Title</label>
                    <input
                      type="text"
                      value={initTitle}
                      onChange={(e) => setInitTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                      placeholder="e.g. Initiative 9: Cultural Heritage & Oasis Activation"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Initiative Scope</label>
                  <textarea
                    rows={2}
                    value={initDescription}
                    onChange={(e) => setInitDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    placeholder="Describe implementation roadmap..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Allocation (SAR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">SAR</span>
                      <input
                        type="number"
                        value={budgetSAR}
                        onChange={(e) => setBudgetSAR(Number(e.target.value))}
                        className="w-full pl-12 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Spent Capital (SAR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">SAR</span>
                      <input
                        type="number"
                        value={spentSAR}
                        onChange={(e) => setSpentSAR(Number(e.target.value))}
                        className="w-full pl-12 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Key Deliverable Milestone</label>
                    <input
                      type="text"
                      value={milestoneTitle}
                      onChange={(e) => setMilestoneTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                      placeholder="e.g. Masterplan Stage 1 Approval"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Milestone Target Date</label>
                    <input
                      type="date"
                      value={milestoneDueDate}
                      onChange={(e) => setMilestoneDueDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <Link
              to="/strategy"
              className="px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'Deploying Strategy...' : 'Save & Cascade Strategy'}</span>
            </button>
          </div>
        </form>

        {/* Live Interactive Preview (Right Column - 5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  AHDA Strategy Execution Tree
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Cascading
              </span>
            </div>

            {/* Strategic Theme Box */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200/70 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded">
                      {themeCode || '02'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      {themeTitle || '02 People and Society'}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${pillarMode === 'existing' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                      {pillarMode === 'existing' ? 'EXISTING PILLAR' : 'NEW PILLAR'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Weight: {themeWeight}%</span>
                  </div>
                </div>
              </div>

              {/* Nested Goal */}
              <div className="pl-3 border-l-2 border-slate-300 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                  <span className="font-mono text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                    {goalCode || 'SG-2.1'}
                  </span>
                  <span className="truncate">{goalTitle || 'Primary Strategic Goal'}</span>
                </div>

                {/* Nested Objective Card */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {objCode || '2.1'}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${objectiveMode === 'existing' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                        {objectiveMode === 'existing' ? 'EXISTING OBJECTIVE' : 'NEW OBJECTIVE'}
                      </span>
                    </div>
                    <StatusBadge status={objStatus} />
                  </div>
                  <h5 className="font-semibold text-xs text-slate-900">
                    {objTitle || 'Strategic Objective Target'}
                  </h5>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-mono">
                    <span className="truncate max-w-[140px]">Lead: {objOwner || currentUser.name}</span>
                    <span className="font-bold text-indigo-700">{objProgress}% Progress</span>
                  </div>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full transition-all" style={{ width: `${objProgress}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Target: FY {targetYear}</span>
                    <span className="truncate max-w-[120px]">{objDept}</span>
                  </div>
                </div>
              </div>

              {/* KPI Snapshot Pill */}
              {kpiName && (
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        {kpiCode}
                      </span>
                      <span className="font-semibold text-slate-800 line-clamp-1">{kpiName}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {kpiActual} / {kpiTarget} {kpiUnit}
                    </span>
                  </div>

                  {kpiFormula && (
                    <div className="p-1.5 bg-slate-900 text-blue-300 rounded text-[10px] font-mono flex items-center gap-1.5 overflow-hidden">
                      <Calculator className="w-3 h-3 text-blue-400 shrink-0" />
                      <span className="truncate">{kpiFormula}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2 rounded-lg text-center font-mono text-[10px] border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[9px]">Baseline</span>
                      <span className="font-bold text-slate-700">{kpiBaseline || '-'}</span>
                    </div>
                    <div>
                      <span className="text-blue-500 block text-[9px]">Target 2026</span>
                      <span className="font-bold text-blue-700">{kpiTarget2026 || '-'}</span>
                    </div>
                    <div>
                      <span className="text-emerald-600 block text-[9px]">Target 2027</span>
                      <span className="font-bold text-emerald-700">{kpiTarget2027 || '-'}</span>
                    </div>
                  </div>

                  {keyProject && (
                    <div className="text-[10px] text-slate-600 flex items-center gap-1.5 pt-0.5 font-sans">
                      <FolderGit2 className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span className="font-semibold truncate">Project: {keyProject}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Initiative Snapshot Pill */}
              {initTitle && (
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        {initCode}
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-[200px]">{initTitle}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-slate-700">
                      SAR {(budgetSAR / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="truncate max-w-[180px]">Milestone: {milestoneTitle}</span>
                    <span>{milestoneDueDate}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button in preview */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center space-x-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Deploy into Strategy Matrix</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
