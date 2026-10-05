import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Plus,
  Compass,
  Milestone,
  ArrowRight,
  Trash2,
  ChevronDown,
  ChevronUp,
  FolderGit2,
  CheckCircle2,
  Shield,
  Building2,
  RefreshCw,
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

interface FormKpi {
  id: string;
  code: string;
  name: string;
  nameAr?: string;
  formula: string;
  baseline: string;
  target2026: string;
  target2027: string;
  target: number;
  actual: number;
  unit: string;
  frequency: 'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual';
  status: 'on-track' | 'warning' | 'critical' | 'achieved';
}

interface FormMilestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

interface FormInitiative {
  id: string;
  code: string;
  title: string;
  description: string;
  budgetSAR: number;
  spentSAR: number;
  owner: string;
  department: string;
  startDate: string;
  endDate: string;
  status: 'Planning' | 'In Progress' | 'At Risk' | 'Completed';
  milestones: FormMilestone[];
  keyProjects: string[];
}

interface FormObjective {
  id: string;
  code: string;
  title: string;
  titleAr?: string;
  owner: string;
  department: string;
  sectorId: string;
  sectorName: string;
  targetYear: number;
  progress: number;
  status: 'on-track' | 'at-risk' | 'behind' | 'achieved';
  isCollapsed?: boolean;
  kpis: FormKpi[];
  initiatives: FormInitiative[];
}

export const CreateStrategyPage: React.FC = () => {
  const navigate = useNavigate();
  const { themes, goals, objectives, addStrategy, currentUser, lang, t } = useApp();

  // Mode toggles
  const [pillarMode, setPillarMode] = useState<'existing' | 'new'>('existing');
  const [goalMode, setGoalMode] = useState<'existing' | 'new'>('existing');

  // Selected Pillar
  const defaultTheme = themes.find((t) => t.code === '02' || t.id === 'st-people') || themes[0];
  const [selectedThemeId, setSelectedThemeId] = useState<string>(defaultTheme?.id || '');

  // Filtered goals for the selected pillar
  const availableGoals = goals.filter((g) => g.themeId === selectedThemeId);
  const [selectedGoalId, setSelectedGoalId] = useState<string>(availableGoals[0]?.id || '');

  // Theme Form State
  const [themeCode, setThemeCode] = useState(defaultTheme?.code || '02');
  const [themeTitle, setThemeTitle] = useState(defaultTheme?.title || '02 People and Society');
  const [themeDescription, setThemeDescription] = useState(
    defaultTheme?.description ||
      'Empower community participation, civic awareness of the development strategy, and improve quality of life and oasis services.'
  );
  const [themeColor, setThemeColor] = useState(defaultTheme?.color || 'blue');
  const [themeWeight, setThemeWeight] = useState(defaultTheme?.weight || 35);

  // Goal Form State
  const [goalCode, setGoalCode] = useState(availableGoals[0]?.code || 'SG-2.1');
  const [goalTitle, setGoalTitle] = useState(availableGoals[0]?.title || 'Community Participation, Strategy Awareness & Quality of Life');
  const [goalDescription, setGoalDescription] = useState(availableGoals[0]?.description || 'Empower civic involvement and municipal quality across the Al-Ahsa region.');

  // MULTIPLE OBJECTIVES STATE (Each with multiple KPIs, multiple Initiatives, multiple Milestones & Projects)
  const [objectivesList, setObjectivesList] = useState<FormObjective[]>([
    {
      id: 'obj-2-1',
      code: '2.1',
      title: 'Enhance Community Participation and Awareness of the Development Strategy',
      titleAr: 'تعزيز المشاركة المجتمعية والوعي باستراتيجية التطوير',
      owner: currentUser.name,
      department: 'Tourism Destination Management Office',
      sectorId: 'sec-ssd',
      sectorName: 'Strategy & Sector Development Sector',
      targetYear: 2027,
      progress: 84,
      status: 'on-track',
      isCollapsed: false,
      kpis: [
        {
          id: 'kpi-2-1-1',
          code: '2.1.1',
          name: 'Event Visitor Indicator',
          nameAr: 'مؤشر زوار الفعاليات',
          formula: '(Total Actual Event Visitors - Total Targeted Visitors) * 100%',
          baseline: '-',
          target2026: '75%',
          target2027: '80%',
          target: 75,
          actual: 74,
          unit: '%',
          frequency: 'Annual',
          status: 'on-track',
        },
        {
          id: 'kpi-2-1-2',
          code: '2.1.2',
          name: 'Digital Engagement Index',
          nameAr: 'مؤشر التفاعل الرقمي مع الهيئة',
          formula: "Average Results of Engagement Analysis Reports for the Authority's Social Media Platforms",
          baseline: '2.00%',
          target2026: '3.50%',
          target2027: '4.00%',
          target: 3.5,
          actual: 3.2,
          unit: '%',
          frequency: 'Quarterly',
          status: 'on-track',
        },
        {
          id: 'kpi-2-1-3',
          code: '2.1.3',
          name: 'Awareness of Al-Ahsa Development Strategy',
          nameAr: 'مؤشر الوعي باستراتيجية تطوير الأحساء',
          formula: 'Average Survey Results',
          baseline: '-',
          target2026: '-',
          target2027: '40%',
          target: 40,
          actual: 36,
          unit: '%',
          frequency: 'Annual',
          status: 'on-track',
        },
        {
          id: 'kpi-2-1-4',
          code: '2.1.4',
          name: 'Number of Festival / Show Days',
          nameAr: 'عدد أيام إقامة المهرجانات والفعاليات',
          formula: 'Total Number of Days Festivals and Shows Are Held',
          baseline: '70',
          target2026: '73',
          target2027: '75',
          target: 73,
          actual: 71,
          unit: 'Days',
          frequency: 'Annual',
          status: 'on-track',
        },
      ],
      initiatives: [
        {
          id: 'init-6',
          code: 'INIT-6',
          title: 'Initiative 6: Raise awareness of the Al-Ahsa Strategy and increase digital engagement',
          description: 'Comprehensive public awareness campaign, multimedia storytelling of the Al-Ahsa Development Strategy, and active digital engagement channels.',
          budgetSAR: 8500000,
          spentSAR: 5200000,
          owner: currentUser.name,
          department: 'Tourism Destination Management Office',
          startDate: '2025-01-01',
          endDate: '2026-12-31',
          status: 'In Progress',
          milestones: [
            {
              id: 'm-6-1',
              title: 'Develop community awareness framework',
              dueDate: '2026-06-30',
              status: 'In Progress',
            },
          ],
          keyProjects: ['Al-Ahsa Strategy Awareness Project'],
        },
        {
          id: 'init-7',
          code: 'INIT-7',
          title: 'Initiative 7: Increase community participation in development planning',
          description: 'Unified civic engagement digital portal enabling citizens to vote on regional ideas, participate in municipal surveys, and empower local community economy.',
          budgetSAR: 12000000,
          spentSAR: 7800000,
          owner: currentUser.name,
          department: 'Strategy Development',
          startDate: '2025-06-01',
          endDate: '2027-06-30',
          status: 'In Progress',
          milestones: [
            {
              id: 'm-7-1',
              title: 'Unified digital community engagement platform (reporting, surveys, voting, dashboard)',
              dueDate: '2027-03-31',
              status: 'In Progress',
            },
          ],
          keyProjects: ['Digital Platforms and Technical Integration for Community Engagement'],
        },
      ],
    },
    {
      id: 'obj-2-2',
      code: '2.2',
      title: 'Support entities in improving quality of life and enhancing community services',
      titleAr: 'دعم الجهات في تحسين جودة الحياة والارتقاء بالخدمات المقدمة للمجتمع',
      owner: currentUser.name,
      department: 'Urban Observatory',
      sectorId: 'sec-sud',
      sectorName: 'Spatial & Urban Development Sector',
      targetYear: 2027,
      progress: 79,
      status: 'on-track',
      isCollapsed: false,
      kpis: [
        {
          id: 'kpi-2-2-1',
          code: '2.2.1',
          name: "Residents' Satisfaction Index",
          nameAr: 'مؤشر رضا السكان',
          formula: 'Customer Satisfaction Index (CSI) from Urban Observatory Surveys',
          baseline: '-',
          target2026: '-',
          target2027: '50%',
          target: 50,
          actual: 46,
          unit: '%',
          frequency: 'Annual',
          status: 'on-track',
        },
        {
          id: 'kpi-2-2-2',
          code: '2.2.2',
          name: 'Number of Palm Trees within the Oasis',
          nameAr: 'عدد أشجار النخيل داخل الواحة',
          formula: 'Total Number of Palm Trees (in Millions)',
          baseline: '2.5M',
          target2026: '2.5M',
          target2027: '2.5M',
          target: 2.5,
          actual: 2.5,
          unit: 'M Trees',
          frequency: 'Annual',
          status: 'achieved',
        },
      ],
      initiatives: [
        {
          id: 'init-8',
          code: 'INIT-8',
          title: 'Initiative 8: Enhance and Improve Quality of Life in Al-Ahsa',
          description: 'Al-Ahsa Quality of Life framework alignment with the national Vision 2030 Quality of Life Program, inter-agency integration, and UNESCO oasis date palm preservation.',
          budgetSAR: 16500000,
          spentSAR: 11400000,
          owner: currentUser.name,
          department: 'Urban Observatory',
          startDate: '2025-03-01',
          endDate: '2027-12-31',
          status: 'In Progress',
          milestones: [
            {
              id: 'm-8-1',
              title: 'Quality of Life Indicators Framework and Monitoring Dashboard',
              dueDate: '2026-08-31',
              status: 'In Progress',
            },
          ],
          keyProjects: ['Quality of Life Improvement Project'],
        },
      ],
    },
  ]);

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

      const goalsForTheme = goals.filter((g) => g.themeId === themeId);
      const firstGoal = goalsForTheme[0];
      if (firstGoal) {
        setSelectedGoalId(firstGoal.id);
        setGoalCode(firstGoal.code);
        setGoalTitle(firstGoal.title);
        setGoalDescription(firstGoal.description || '');
      }
    }
  };

  // OBJECTIVES MANAGEMENT HELPERS
  const handleAddObjective = () => {
    const nextNum = objectivesList.length + 1;
    const newObjCode = `${themeCode}.${nextNum}`;
    const newObjective: FormObjective = {
      id: `obj-${Date.now()}`,
      code: newObjCode,
      title: `Strategic Objective ${newObjCode}`,
      owner: currentUser.name,
      department: currentUser.department,
      sectorId: 'sec-ssd',
      sectorName: 'Strategy & Sector Development Sector',
      targetYear: 2027,
      progress: 0,
      status: 'on-track',
      isCollapsed: false,
      kpis: [
        {
          id: `kpi-${Date.now()}-1`,
          code: `${newObjCode}.1`,
          name: `Key Indicator ${newObjCode}.1`,
          formula: 'Mathematical formulation / survey index',
          baseline: '-',
          target2026: '80%',
          target2027: '90%',
          target: 80,
          actual: 0,
          unit: '%',
          frequency: 'Annual',
          status: 'on-track',
        },
      ],
      initiatives: [
        {
          id: `init-${Date.now()}-1`,
          code: `INIT-${newObjCode}-1`,
          title: `Strategic Initiative under ${newObjCode}`,
          description: 'Key execution initiative driving delivery of target metrics.',
          budgetSAR: 5000000,
          spentSAR: 500000,
          owner: currentUser.name,
          department: currentUser.department,
          startDate: '2026-01-01',
          endDate: '2027-12-31',
          status: 'Planning',
          milestones: [
            {
              id: `m-${Date.now()}-1`,
              title: 'Detailed Implementation Plan Sign-off',
              dueDate: '2026-09-30',
              status: 'In Progress',
            },
          ],
          keyProjects: ['Flagship Transformation Project'],
        },
      ],
    };
    setObjectivesList([...objectivesList, newObjective]);
  };

  const handleRemoveObjective = (objId: string) => {
    if (objectivesList.length <= 1) return;
    setObjectivesList(objectivesList.filter((o) => o.id !== objId));
  };

  const handleUpdateObjectiveField = (objId: string, field: keyof FormObjective, value: any) => {
    setObjectivesList(
      objectivesList.map((o) => (o.id === objId ? { ...o, [field]: value } : o))
    );
  };

  const toggleCollapseObjective = (objId: string) => {
    setObjectivesList(
      objectivesList.map((o) => (o.id === objId ? { ...o, isCollapsed: !o.isCollapsed } : o))
    );
  };

  // KPI HELPERS
  const handleAddKpi = (objId: string) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        const nextKpiNum = o.kpis.length + 1;
        const newKpi: FormKpi = {
          id: `kpi-${Date.now()}`,
          code: `${o.code}.${nextKpiNum}`,
          name: `New KPI Indicator`,
          formula: 'Standard measurement methodology',
          baseline: '-',
          target2026: '75%',
          target2027: '85%',
          target: 75,
          actual: 0,
          unit: '%',
          frequency: 'Annual',
          status: 'on-track',
        };
        return { ...o, kpis: [...o.kpis, newKpi] };
      })
    );
  };

  const handleRemoveKpi = (objId: string, kpiId: string) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        return { ...o, kpis: o.kpis.filter((k) => k.id !== kpiId) };
      })
    );
  };

  const handleUpdateKpiField = (objId: string, kpiId: string, field: keyof FormKpi, value: any) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        return {
          ...o,
          kpis: o.kpis.map((k) => (k.id === kpiId ? { ...k, [field]: value } : k)),
        };
      })
    );
  };

  // INITIATIVE HELPERS
  const handleAddInitiative = (objId: string) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        const nextInitNum = o.initiatives.length + 1;
        const newInit: FormInitiative = {
          id: `init-${Date.now()}`,
          code: `INIT-${o.code}-${nextInitNum}`,
          title: `Initiative ${nextInitNum}: New Delivery Program`,
          description: 'Key execution stream driving deliverables and milestone targets.',
          budgetSAR: 6000000,
          spentSAR: 1000000,
          owner: o.owner,
          department: o.department,
          startDate: '2026-01-01',
          endDate: '2027-12-31',
          status: 'Planning',
          milestones: [
            {
              id: `m-${Date.now()}-1`,
              title: 'Core Deliverable Milestone Approval',
              dueDate: '2026-10-31',
              status: 'In Progress',
            },
          ],
          keyProjects: ['Strategic Delivery Project'],
        };
        return { ...o, initiatives: [...o.initiatives, newInit] };
      })
    );
  };

  const handleRemoveInitiative = (objId: string, initId: string) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        return { ...o, initiatives: o.initiatives.filter((i) => i.id !== initId) };
      })
    );
  };

  const handleUpdateInitiativeField = (
    objId: string,
    initId: string,
    field: keyof FormInitiative,
    value: any
  ) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        return {
          ...o,
          initiatives: o.initiatives.map((i) =>
            i.id === initId ? { ...i, [field]: value } : i
          ),
        };
      })
    );
  };

  // MILESTONE & PROJECT HELPERS
  const handleAddMilestone = (objId: string, initId: string) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        return {
          ...o,
          initiatives: o.initiatives.map((i) => {
            if (i.id !== initId) return i;
            return {
              ...i,
              milestones: [
                ...i.milestones,
                {
                  id: `m-${Date.now()}`,
                  title: 'New Milestone Deliverable',
                  dueDate: '2026-12-31',
                  status: 'In Progress',
                },
              ],
            };
          }),
        };
      })
    );
  };

  const handleRemoveMilestone = (objId: string, initId: string, milestoneId: string) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        return {
          ...o,
          initiatives: o.initiatives.map((i) => {
            if (i.id !== initId) return i;
            return {
              ...i,
              milestones: i.milestones.filter((m) => m.id !== milestoneId),
            };
          }),
        };
      })
    );
  };

  const handleAddProject = (objId: string, initId: string) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        return {
          ...o,
          initiatives: o.initiatives.map((i) => {
            if (i.id !== initId) return i;
            return {
              ...i,
              keyProjects: [...i.keyProjects, 'New Project Deliverable'],
            };
          }),
        };
      })
    );
  };

  const handleRemoveProject = (objId: string, initId: string, projectIdx: number) => {
    setObjectivesList(
      objectivesList.map((o) => {
        if (o.id !== objId) return o;
        return {
          ...o,
          initiatives: o.initiatives.map((i) => {
            if (i.id !== initId) return i;
            return {
              ...i,
              keyProjects: i.keyProjects.filter((_, idx) => idx !== projectIdx),
            };
          }),
        };
      })
    );
  };

  // LOAD OFFICIAL AHDA BENCHMARK TEMPLATE
  const loadOfficialAhdaPreset = () => {
    setPillarMode('existing');
    const p02 = themes.find((t) => t.code === '02') || themes[0];
    if (p02) {
      setSelectedThemeId(p02.id);
      setThemeCode(p02.code);
      setThemeTitle(p02.title);
      setThemeDescription(p02.description);
      setThemeColor(p02.color);
      setThemeWeight(p02.weight);
    }
    setGoalCode('SG-02');
    setGoalTitle('Community Participation, Strategic Awareness & Quality of Life');
    setGoalDescription('Empower civic involvement and municipal quality across the Al-Ahsa region.');

    setObjectivesList([
      {
        id: 'obj-2-1',
        code: '2.1',
        title: 'Enhance Community Participation and Awareness of the Development Strategy',
        titleAr: 'تعزيز المشاركة المجتمعية والوعي باستراتيجية التطوير',
        owner: currentUser.name,
        department: 'Tourism Destination Management Office',
        sectorId: 'sec-ssd',
        sectorName: 'Strategy & Sector Development Sector',
        targetYear: 2027,
        progress: 84,
        status: 'on-track',
        isCollapsed: false,
        kpis: [
          {
            id: 'kpi-2-1-1',
            code: '2.1.1',
            name: 'Event Visitor Indicator',
            nameAr: 'مؤشر زوار الفعاليات',
            formula: '(Total Actual Event Visitors - Total Targeted Visitors) * 100%',
            baseline: '-',
            target2026: '75%',
            target2027: '80%',
            target: 75,
            actual: 74,
            unit: '%',
            frequency: 'Annual',
            status: 'on-track',
          },
          {
            id: 'kpi-2-1-2',
            code: '2.1.2',
            name: 'Digital Engagement Index',
            nameAr: 'مؤشر التفاعل الرقمي مع الهيئة',
            formula: "Average Results of Engagement Analysis Reports for the Authority's Social Media Platforms",
            baseline: '2.00%',
            target2026: '3.50%',
            target2027: '4.00%',
            target: 3.5,
            actual: 3.2,
            unit: '%',
            frequency: 'Quarterly',
            status: 'on-track',
          },
          {
            id: 'kpi-2-1-3',
            code: '2.1.3',
            name: 'Awareness of Al-Ahsa Development Strategy',
            nameAr: 'مؤشر الوعي باستراتيجية تطوير الأحساء',
            formula: 'Average Survey Results Across Regional Stakeholders',
            baseline: '-',
            target2026: '-',
            target2027: '40%',
            target: 40,
            actual: 36,
            unit: '%',
            frequency: 'Annual',
            status: 'on-track',
          },
          {
            id: 'kpi-2-1-4',
            code: '2.1.4',
            name: 'Number of Festival / Show Days',
            nameAr: 'عدد أيام إقامة المهرجانات والفعاليات',
            formula: 'Total Number of Days Festivals and Shows Are Held in Al-Ahsa',
            baseline: '70',
            target2026: '73',
            target2027: '75',
            target: 73,
            actual: 71,
            unit: 'Days',
            frequency: 'Annual',
            status: 'on-track',
          },
        ],
        initiatives: [
          {
            id: 'init-6',
            code: 'INIT-6',
            title: 'Initiative 6: Raise awareness of the Al-Ahsa Strategy and increase digital engagement',
            description: 'Comprehensive public awareness campaign, multimedia storytelling of the Al-Ahsa Development Strategy, and active digital engagement channels.',
            budgetSAR: 8500000,
            spentSAR: 5200000,
            owner: currentUser.name,
            department: 'Tourism Destination Management Office',
            startDate: '2025-01-01',
            endDate: '2026-12-31',
            status: 'In Progress',
            milestones: [
              {
                id: 'm-6-1',
                title: 'Develop community awareness framework',
                dueDate: '2026-06-30',
                status: 'In Progress',
              },
            ],
            keyProjects: ['Al-Ahsa Strategy Awareness Project'],
          },
          {
            id: 'init-7',
            code: 'INIT-7',
            title: 'Initiative 7: Increase community participation in development planning',
            description: 'Unified civic engagement digital portal enabling citizens to vote on regional ideas, participate in municipal surveys, and empower local community economy.',
            budgetSAR: 12000000,
            spentSAR: 7800000,
            owner: currentUser.name,
            department: 'Strategy Development',
            startDate: '2025-06-01',
            endDate: '2027-06-30',
            status: 'In Progress',
            milestones: [
              {
                id: 'm-7-1',
                title: 'Unified digital community engagement platform (reporting, surveys, voting, dashboard)',
                dueDate: '2027-03-31',
                status: 'In Progress',
              },
            ],
            keyProjects: ['Digital Platforms and Technical Integration for Community Engagement'],
          },
        ],
      },
      {
        id: 'obj-2-2',
        code: '2.2',
        title: 'Support entities in improving quality of life and enhancing community services',
        titleAr: 'دعم الجهات في تحسين جودة الحياة والارتقاء بالخدمات المقدمة للمجتمع',
        owner: currentUser.name,
        department: 'Urban Observatory',
        sectorId: 'sec-sud',
        sectorName: 'Spatial & Urban Development Sector',
        targetYear: 2027,
        progress: 79,
        status: 'on-track',
        isCollapsed: false,
        kpis: [
          {
            id: 'kpi-2-2-1',
            code: '2.2.1',
            name: "Residents' Satisfaction Index",
            nameAr: 'مؤشر رضا السكان',
            formula: 'Customer Satisfaction Index (CSI) from Urban Observatory Surveys',
            baseline: '-',
            target2026: '-',
            target2027: '50%',
            target: 50,
            actual: 46,
            unit: '%',
            frequency: 'Annual',
            status: 'on-track',
          },
          {
            id: 'kpi-2-2-2',
            code: '2.2.2',
            name: 'Number of Palm Trees within the Oasis',
            nameAr: 'عدد أشجار النخيل داخل الواحة',
            formula: 'Total Number of Palm Trees (in Millions)',
            baseline: '2.5M',
            target2026: '2.5M',
            target2027: '2.5M',
            target: 2.5,
            actual: 2.5,
            unit: 'M Trees',
            frequency: 'Annual',
            status: 'achieved',
          },
        ],
        initiatives: [
          {
            id: 'init-8',
            code: 'INIT-8',
            title: 'Initiative 8: Enhance and Improve Quality of Life in Al-Ahsa',
            description: 'Al-Ahsa Quality of Life framework alignment with the national Vision 2030 Quality of Life Program, inter-agency integration, and UNESCO oasis date palm preservation.',
            budgetSAR: 16500000,
            spentSAR: 11400000,
            owner: currentUser.name,
            department: 'Urban Observatory',
            startDate: '2025-03-01',
            endDate: '2027-12-31',
            status: 'In Progress',
            milestones: [
              {
                id: 'm-8-1',
                title: 'Quality of Life Indicators Framework and Monitoring Dashboard',
                dueDate: '2026-08-31',
                status: 'In Progress',
              },
            ],
            keyProjects: ['Quality of Life Improvement Project'],
          },
        ],
      },
    ]);
  };

  // FORM SUBMISSION
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeTitle.trim() || !goalTitle.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      addStrategy({
        selectedThemeId: pillarMode === 'existing' ? selectedThemeId : undefined,
        selectedGoalId: goalMode === 'existing' ? selectedGoalId : undefined,
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
        objectives: objectivesList.map((obj) => ({
          code: obj.code.trim(),
          title: obj.title.trim(),
          titleAr: obj.titleAr?.trim(),
          owner: obj.owner.trim() || currentUser.name,
          department: obj.department,
          sectorId: obj.sectorId,
          sectorName: obj.sectorName,
          targetYear: Number(obj.targetYear),
          progress: Number(obj.progress),
          status: obj.status,
          kpis: obj.kpis
            .filter((k) => k.name.trim())
            .map((k) => ({
              code: k.code.trim(),
              name: k.name.trim(),
              nameAr: k.nameAr?.trim(),
              unit: k.unit.trim() || '%',
              target: Number(k.target),
              actual: Number(k.actual),
              frequency: k.frequency,
              status: k.status,
              formula: k.formula.trim(),
              baseline: k.baseline,
              target2026: k.target2026,
              target2027: k.target2027,
              pillarCode: themeCode || '02',
              pillarTitle: themeTitle,
            })),
          initiatives: obj.initiatives
            .filter((i) => i.title.trim())
            .map((i) => ({
              code: i.code.trim(),
              title: i.title.trim(),
              description: i.description.trim(),
              owner: i.owner || obj.owner,
              department: i.department || obj.department,
              budgetSAR: Number(i.budgetSAR),
              spentSAR: Number(i.spentSAR),
              progress: Number(obj.progress),
              startDate: i.startDate,
              endDate: i.endDate,
              status: i.status,
              milestones: i.milestones.filter((m) => m.title.trim()),
              keyProjects: i.keyProjects.filter((p) => p.trim()),
            })),
        })),
      });

      navigate('/strategy');
    } catch (err) {
      console.error('Error creating multi-level strategy:', err);
      setIsSubmitting(false);
    }
  };

  // Metrics summary for the whole formulation tree
  const totalKpisCount = objectivesList.reduce((sum, o) => sum + o.kpis.length, 0);
  const totalInitsCount = objectivesList.reduce((sum, o) => sum + o.initiatives.length, 0);
  const totalMilestonesCount = objectivesList.reduce(
    (sum, o) => sum + o.initiatives.reduce((iSum, i) => iSum + i.milestones.length, 0),
    0
  );
  const totalProjectsCount = objectivesList.reduce(
    (sum, o) => sum + o.initiatives.reduce((iSum, i) => iSum + i.keyProjects.length, 0),
    0
  );

  return (
    <div className="space-y-6 pb-20 animate-in fade-in">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-blue-600 mb-1">
            <Link
              to="/strategy"
              className="inline-flex items-center space-x-1 text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-0.5 rtl:rotate-180" />
              <span>{lang === 'ar' ? 'الاستراتيجية المؤسسية' : 'Strategy Architecture'}</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-bold uppercase">{lang === 'ar' ? 'صياغة نموذج التنفيذ المتعدد' : 'AHDA Multi-Level Cascading'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'صياغة الهيكل الاستراتيجي وتنفيذ المستويات' : 'Strategic Formulation: Multi-Tier Execution Model'}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            {lang === 'ar'
              ? 'تكوين النموذج الاستراتيجي المتكامل: ركيزة استراتيجية واحدة تضم عدة أهداف استراتيجية، وعدة مؤشرات أداء (KPIs)، وعدة مبادرات، وعدة مراحل تسليم (Milestones)، وعدة مشاريع.'
              : 'Formulate the complete execution cascade: 1 Strategic Pillar contains multiple Strategic Objectives, multiple KPIs, multiple Initiatives, multiple Milestones, and multiple Projects.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/strategy"
            className="px-4 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>
              {isSubmitting
                ? (lang === 'ar' ? 'جارٍ الحفظ والاعتماد...' : 'Deploying Strategy...')
                : (lang === 'ar' ? 'حفظ واعتماد النموذج الاستراتيجي' : 'Save & Cascade Multi-Tier Strategy')}
            </span>
          </button>
        </div>
      </div>

      {/* Complete AHDA Model Benchmark Preset Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 rounded-2xl border border-blue-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              {lang === 'ar' ? 'نموذج هيئة تطوير الأحساء الرسمي (الركيزة 02)' : 'Official AHDA Strategy Model Template (Pillar 02)'}
            </h3>
            <span className="text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
              {lang === 'ar' ? 'معتمد من المخطط' : 'DIAGRAM VERIFIED'}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            {lang === 'ar'
              ? 'تحميل كامل لمخطط الهيئة: ركيزة 02 (الناس والمجتمع) تشمل الهدفين 2.1 و 2.2، و 6 مؤشرات أداء تفصيلية، و 3 مبادرات كبرى، و 3 معالم رئيسية، و 3 مشاريع استراتيجية.'
              : 'One-click load: Pillar 02 (People and Society) with Objectives 2.1 & 2.2, 6 Multi-Year KPIs, 3 Initiatives (6, 7, 8), 3 Key Milestones, and 3 Flagship Projects.'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={loadOfficialAhdaPreset}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تحميل نموذج الركيزة 02 بالكامل' : 'Load Complete Pillar 02 Architecture'}</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Dynamic Form Builder (7 cols) + Live Cascading Preview (5 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Form: Multi-Level Builder */}
        <form onSubmit={handleSubmit} className="xl:col-span-7 space-y-6">
          {/* Card 1: Strategic Pillar / Theme */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{t('Strategic Pillar')}</h3>
                  <p className="text-[11px] text-slate-500">{lang === 'ar' ? 'الركيزة التنظيمية الكبرى والأولوية العليا' : 'Core organizational vision pillar'}</p>
                </div>
              </div>

              {/* Segmented Mode Selector */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPillarMode('existing')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    pillarMode === 'existing' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'ar' ? 'ركيزة حالية' : 'Select Existing'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPillarMode('new');
                    setSelectedThemeId('');
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    pillarMode === 'new' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'ar' ? '+ إنشاء ركيزة جديدة' : '+ Create New'}
                </button>
              </div>
            </div>

            {pillarMode === 'existing' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'اختر الركيزة من السجل' : 'Choose Strategic Pillar from Register'}
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
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'ar' ? 'رمز الركيزة' : 'Pillar Code'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={themeCode}
                      onChange={(e) => setThemeCode(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="e.g. 05"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {lang === 'ar' ? 'اسم الركيزة' : 'Pillar Title'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={themeTitle}
                      onChange={(e) => setThemeTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="e.g. 05 Environmental Sustainability & Smart Oasis"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {lang === 'ar' ? 'وصف الركيزة والنطاق' : 'Pillar Scope & Strategic Mandate'}
                  </label>
                  <textarea
                    rows={2}
                    value={themeDescription}
                    onChange={(e) => setThemeDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Color Palette</label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_OPTIONS.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setThemeColor(c.id)}
                          className={`w-7 h-7 rounded-lg ${c.bg} transition-all cursor-pointer flex items-center justify-center text-white ${
                            themeColor === c.id ? 'ring-2 ring-offset-2 ring-slate-900 scale-110 shadow-xs' : 'opacity-80 hover:opacity-100'
                          }`}
                        >
                          {themeColor === c.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">Weight: {themeWeight}%</label>
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
                  <h3 className="text-sm font-bold text-slate-900">{lang === 'ar' ? 'الهدف الاستراتيجي العام' : 'Strategic Alignment Goal'}</h3>
                  <p className="text-[11px] text-slate-500">{lang === 'ar' ? 'الغاية الاستراتيجية التوجيهية للركيزة' : 'High-level milestone goal grouping nested objectives'}</p>
                </div>
              </div>

              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setGoalMode('existing')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    goalMode === 'existing' ? 'bg-white text-teal-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'ar' ? 'هدف حالي' : 'Select Existing'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGoalMode('new');
                    setSelectedGoalId('');
                  }}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    goalMode === 'new' ? 'bg-white text-teal-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'ar' ? '+ إنشاء هدف عام' : '+ Create New'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{lang === 'ar' ? 'رمز الهدف' : 'Goal Code'}</label>
                <input
                  type="text"
                  required
                  value={goalCode}
                  onChange={(e) => setGoalCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                  placeholder="e.g. SG-2.1"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">{lang === 'ar' ? 'عنوان الهدف الاستراتيجي' : 'Goal Title'}</label>
                <input
                  type="text"
                  required
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                  placeholder="e.g. Community Participation, Strategy Awareness & Quality of Life"
                />
              </div>
            </div>
          </div>

          {/* DYNAMIC MULTI-OBJECTIVES SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {lang === 'ar' ? 'الأهداف الاستراتيجية التفصيلية' : 'Strategic Objectives'} ({objectivesList.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'يمكن للركيزة الواحدة أن تضم عدة أهداف استراتيجية، وكل هدف يحتوي على عدة مؤشرات وعدة مبادرات.'
                      : 'A single pillar can contain multiple Strategic Objectives. Each objective drives its own KPIs and Initiatives.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddObjective}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'ar' ? '+ إضافة هدف استراتيجي' : '+ Add Strategic Objective'}</span>
              </button>
            </div>

            {/* List of Objectives Cards */}
            {objectivesList.map((obj, objIdx) => (
              <div
                key={obj.id}
                className="bg-white rounded-2xl border-2 border-slate-200/90 shadow-xs overflow-hidden transition-all hover:border-indigo-300"
              >
                {/* Objective Card Header */}
                <div className="p-4 bg-slate-50/90 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-xs bg-indigo-600 text-white px-2.5 py-1 rounded-lg shadow-2xs">
                      {obj.code}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {obj.title}
                      </h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{obj.sectorName}</span>
                        <span>•</span>
                        <span>{obj.kpis.length} KPIs</span>
                        <span>•</span>
                        <span>{obj.initiatives.length} Initiatives</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCollapseObjective(obj.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white transition-colors cursor-pointer"
                      title="Collapse or Expand"
                    >
                      {obj.isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                    {objectivesList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveObjective(obj.id)}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove this Objective"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {!obj.isCollapsed && (
                  <div className="p-5 space-y-6">
                    {/* Objective Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {lang === 'ar' ? 'رمز الهدف' : 'Objective Code'} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={obj.code}
                          onChange={(e) => handleUpdateObjectiveField(obj.id, 'code', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {lang === 'ar' ? 'عنوان الهدف الاستراتيجي (English)' : 'Objective Title (English)'} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={obj.title}
                          onChange={(e) => handleUpdateObjectiveField(obj.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {lang === 'ar' ? 'عنوان الهدف الاستراتيجي (عربي)' : 'Objective Title (Arabic)'}
                        </label>
                        <input
                          type="text"
                          value={obj.titleAr || ''}
                          onChange={(e) => handleUpdateObjectiveField(obj.id, 'titleAr', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 text-right"
                          placeholder="مثال: تعزيز المشاركة المجتمعية والوعي باستراتيجية التطوير"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">{lang === 'ar' ? 'القطاع التنظيمي' : 'Sector'}</label>
                        <select
                          value={obj.sectorId}
                          onChange={(e) => {
                            const s = AUTHORITY_SECTORS.find((sec) => sec.id === e.target.value);
                            handleUpdateObjectiveField(obj.id, 'sectorId', e.target.value);
                            if (s) handleUpdateObjectiveField(obj.id, 'sectorName', s.name);
                          }}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer"
                        >
                          {AUTHORITY_SECTORS.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">{lang === 'ar' ? 'الإدارة المسؤولة' : 'Department'}</label>
                        <select
                          value={obj.department}
                          onChange={(e) => handleUpdateObjectiveField(obj.id, 'department', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer"
                        >
                          {DEPARTMENTS.map((d) => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">{lang === 'ar' ? 'السنة المستهدفة' : 'Target Year'}</label>
                        <select
                          value={obj.targetYear}
                          onChange={(e) => handleUpdateObjectiveField(obj.id, 'targetYear', Number(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-600 cursor-pointer font-mono"
                        >
                          {[2025, 2026, 2027, 2028, 2030].map((yr) => (
                            <option key={yr} value={yr}>FY {yr}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* SUB-SECTION A: MULTIPLE KPIS FOR THIS OBJECTIVE */}
                    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Target className="w-4 h-4 text-blue-600" />
                          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                            {lang === 'ar' ? 'مؤشرات الأداء التابعة للهدف' : `KPIs / Targets for Objective ${obj.code}`} ({obj.kpis.length})
                          </h5>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddKpi(obj.id)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? '+ إضافة مؤشر' : '+ Add KPI'}</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {obj.kpis.map((kpi, kIdx) => (
                          <div
                            key={kpi.id}
                            className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-3 transition-all hover:border-blue-300"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-1">
                                <span className="font-mono font-bold text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                                  {kpi.code}
                                </span>
                                <input
                                  type="text"
                                  placeholder="KPI Indicator Name (e.g. Event Visitor Indicator)"
                                  value={kpi.name}
                                  onChange={(e) => handleUpdateKpiField(obj.id, kpi.id, 'name', e.target.value)}
                                  className="flex-1 px-2.5 py-1 text-xs font-bold text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveKpi(obj.id, kpi.id)}
                                className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Remove KPI"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                              <div>
                                <label className="block text-[10px] text-slate-500 font-mono">Baseline</label>
                                <input
                                  type="text"
                                  value={kpi.baseline}
                                  onChange={(e) => handleUpdateKpiField(obj.id, kpi.id, 'baseline', e.target.value)}
                                  className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-center"
                                  placeholder="e.g. 70"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-blue-700 font-bold font-mono">Target 2026</label>
                                <input
                                  type="text"
                                  value={kpi.target2026}
                                  onChange={(e) => handleUpdateKpiField(obj.id, kpi.id, 'target2026', e.target.value)}
                                  className="w-full px-2 py-1 bg-blue-50/50 border border-blue-200 rounded-lg text-xs font-mono text-center font-bold text-blue-900"
                                  placeholder="e.g. 75%"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-indigo-700 font-bold font-mono">Target 2027</label>
                                <input
                                  type="text"
                                  value={kpi.target2027}
                                  onChange={(e) => handleUpdateKpiField(obj.id, kpi.id, 'target2027', e.target.value)}
                                  className="w-full px-2 py-1 bg-indigo-50/50 border border-indigo-200 rounded-lg text-xs font-mono text-center font-bold text-indigo-900"
                                  placeholder="e.g. 80%"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-500 font-mono">Actual ({kpi.unit})</label>
                                <input
                                  type="number"
                                  value={kpi.actual}
                                  onChange={(e) => handleUpdateKpiField(obj.id, kpi.id, 'actual', Number(e.target.value))}
                                  className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-center"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-500 font-mono">Unit</label>
                                <input
                                  type="text"
                                  value={kpi.unit}
                                  onChange={(e) => handleUpdateKpiField(obj.id, kpi.id, 'unit', e.target.value)}
                                  className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-center"
                                  placeholder="%"
                                />
                              </div>
                            </div>

                            <div>
                              <input
                                type="text"
                                placeholder="Formula: (Total Actual Event Visitors - Total Targeted Visitors) * 100%"
                                value={kpi.formula}
                                onChange={(e) => handleUpdateKpiField(obj.id, kpi.id, 'formula', e.target.value)}
                                className="w-full px-2.5 py-1 text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg focus:bg-white"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SUB-SECTION B: MULTIPLE INITIATIVES FOR THIS OBJECTIVE */}
                    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-cyan-700" />
                          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                            {lang === 'ar' ? 'المبادرات والمشاريع التابعة للهدف' : `Initiatives, Milestones & Projects for ${obj.code}`} ({obj.initiatives.length})
                          </h5>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddInitiative(obj.id)}
                          className="px-2.5 py-1 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-[11px] font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? '+ إضافة مبادرة' : '+ Add Initiative'}</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {obj.initiatives.map((init, iIdx) => (
                          <div
                            key={init.id}
                            className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-1">
                                <span className="font-mono font-bold text-xs bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded">
                                  {init.code}
                                </span>
                                <input
                                  type="text"
                                  placeholder="Initiative Title (e.g. Initiative 6: Raise awareness...)"
                                  value={init.title}
                                  onChange={(e) => handleUpdateInitiativeField(obj.id, init.id, 'title', e.target.value)}
                                  className="flex-1 px-2.5 py-1 text-xs font-bold text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-600"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveInitiative(obj.id, init.id)}
                                className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Remove Initiative"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <textarea
                              rows={2}
                              placeholder="Initiative description and execution deliverables..."
                              value={init.description}
                              onChange={(e) => handleUpdateInitiativeField(obj.id, init.id, 'description', e.target.value)}
                              className="w-full px-2.5 py-1 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
                            />

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              <div>
                                <label className="block text-[10px] text-slate-500 font-mono">Budget (SAR)</label>
                                <input
                                  type="number"
                                  value={init.budgetSAR}
                                  onChange={(e) => handleUpdateInitiativeField(obj.id, init.id, 'budgetSAR', Number(e.target.value))}
                                  className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-500 font-mono">Spent (SAR)</label>
                                <input
                                  type="number"
                                  value={init.spentSAR}
                                  onChange={(e) => handleUpdateInitiativeField(obj.id, init.id, 'spentSAR', Number(e.target.value))}
                                  className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-500 font-mono">Start Date</label>
                                <input
                                  type="date"
                                  value={init.startDate}
                                  onChange={(e) => handleUpdateInitiativeField(obj.id, init.id, 'startDate', e.target.value)}
                                  className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] text-slate-500 font-mono">End Date</label>
                                <input
                                  type="date"
                                  value={init.endDate}
                                  onChange={(e) => handleUpdateInitiativeField(obj.id, init.id, 'endDate', e.target.value)}
                                  className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                                />
                              </div>
                            </div>

                            {/* NESTED MILESTONES & PROJECTS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                              {/* Milestones */}
                              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                                    <Milestone className="w-3.5 h-3.5 text-slate-600" />
                                    <span>{lang === 'ar' ? 'المعالم الرئيسية (Milestones)' : 'Deliverable Milestones'}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleAddMilestone(obj.id, init.id)}
                                    className="text-[10px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                                  >
                                    + Add Milestone
                                  </button>
                                </div>

                                <div className="space-y-1.5">
                                  {init.milestones.map((m) => (
                                    <div key={m.id} className="flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-200">
                                      <input
                                        type="text"
                                        value={m.title}
                                        onChange={(e) => {
                                          const updated = init.milestones.map((item) =>
                                            item.id === m.id ? { ...item, title: e.target.value } : item
                                          );
                                          handleUpdateInitiativeField(obj.id, init.id, 'milestones', updated);
                                        }}
                                        className="flex-1 text-[11px] text-slate-800 border-0 focus:outline-none"
                                        placeholder="Milestone title"
                                      />
                                      <input
                                        type="date"
                                        value={m.dueDate}
                                        onChange={(e) => {
                                          const updated = init.milestones.map((item) =>
                                            item.id === m.id ? { ...item, dueDate: e.target.value } : item
                                          );
                                          handleUpdateInitiativeField(obj.id, init.id, 'milestones', updated);
                                        }}
                                        className="text-[10px] font-mono text-slate-500 bg-transparent border-0 focus:outline-none w-24"
                                      />
                                      {init.milestones.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveMilestone(obj.id, init.id, m.id)}
                                          className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Key Projects */}
                              <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-950">
                                    <FolderGit2 className="w-3.5 h-3.5 text-amber-700" />
                                    <span>{lang === 'ar' ? 'المشاريع الاستراتيجية (Projects)' : 'Flagship Projects'}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleAddProject(obj.id, init.id)}
                                    className="text-[10px] font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
                                  >
                                    + Add Project
                                  </button>
                                </div>

                                <div className="space-y-1.5">
                                  {init.keyProjects.map((p, pIdx) => (
                                    <div key={pIdx} className="flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-amber-200">
                                      <input
                                        type="text"
                                        value={p}
                                        onChange={(e) => {
                                          const updated = [...init.keyProjects];
                                          updated[pIdx] = e.target.value;
                                          handleUpdateInitiativeField(obj.id, init.id, 'keyProjects', updated);
                                        }}
                                        className="flex-1 text-[11px] text-slate-800 border-0 focus:outline-none font-medium"
                                        placeholder="Project title (e.g. Al-Ahsa Strategy Awareness Project)"
                                      />
                                      {init.keyProjects.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveProject(obj.id, init.id, pIdx)}
                                          className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Bottom Add Objective Button */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleAddObjective}
                className="w-full py-3 border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'ar' ? '+ إضافة هدف استراتيجي جديد إلى الركيزة' : '+ Add Another Strategic Objective to this Pillar'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Right Column: Live Cascading Model Preview (AHDA Infographic Architecture) */}
        <div className="xl:col-span-5 sticky top-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {lang === 'ar' ? 'المعاينة الحية للنموذج الاستراتيجي' : 'Live Cascading Architecture'}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                1:MANY CASCADING
              </span>
            </div>

            {/* Live Count Metrics */}
            <div className="grid grid-cols-5 gap-1.5 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[9px] text-slate-400 block">{t('Pillar')}</span>
                <span className="text-sm font-bold text-slate-900">1</span>
              </div>
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-200/80">
                <span className="text-[9px] text-indigo-700 block">{t('Objectives')}</span>
                <span className="text-sm font-bold text-indigo-800">{objectivesList.length}</span>
              </div>
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-200/80">
                <span className="text-[9px] text-blue-700 block">{t('KPIs')}</span>
                <span className="text-sm font-bold text-blue-800">{totalKpisCount}</span>
              </div>
              <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-200/80">
                <span className="text-[9px] text-cyan-700 block">{t('Initiatives')}</span>
                <span className="text-sm font-bold text-cyan-800">{totalInitsCount}</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/80">
                <span className="text-[9px] text-amber-700 block">{t('Projects')}</span>
                <span className="text-sm font-bold text-amber-800">{totalProjectsCount}</span>
              </div>
            </div>

            {/* 6-Stage Breadcrumb Chain */}
            <div className="p-2.5 bg-slate-100 rounded-xl text-[10px] font-semibold text-slate-700 flex items-center justify-between overflow-x-auto">
              <span>{t('Pillar')}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 rtl:rotate-180" />
              <span>{t('Objective')}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 rtl:rotate-180" />
              <span>{t('KPI')}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 rtl:rotate-180" />
              <span>{t('Initiative')}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 rtl:rotate-180" />
              <span>{t('Milestone')}</span>
              <ArrowRight className="w-3 h-3 text-slate-400 rtl:rotate-180" />
              <span>{t('Project')}</span>
            </div>

            {/* Visual Hierarchy Cascading Tree */}
            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
              {/* Pillar Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-950 text-white shadow-2xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                    Pillar {themeCode}
                  </span>
                  <span className="text-[10px] font-mono text-blue-300">{themeWeight}% Weight</span>
                </div>
                <h4 className="text-sm font-bold mt-1 text-white">{themeTitle}</h4>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">{themeDescription}</p>
              </div>

              {/* Objectives List in Preview */}
              <div className="space-y-4 pl-3 border-l-2 border-indigo-200">
                {objectivesList.map((obj) => (
                  <div key={obj.id} className="bg-slate-50/90 rounded-xl border border-slate-200 p-3.5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-600 text-white">
                          {obj.code}
                        </span>
                        <h5 className="text-xs font-bold text-slate-900">{obj.title}</h5>
                      </div>
                      <StatusBadge status={obj.status} />
                    </div>

                    {/* KPI mini-table */}
                    <div className="bg-white rounded-lg border border-slate-200/80 p-2 space-y-1">
                      <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold flex items-center justify-between">
                        <span>{obj.kpis.length} KPIs / Targets</span>
                        <span>2026 / 2027</span>
                      </div>
                      <div className="divide-y divide-slate-100 text-[11px]">
                        {obj.kpis.map((k) => (
                          <div key={k.id} className="py-1 flex items-center justify-between">
                            <span className="truncate pr-2 font-medium text-slate-800">{k.code} {k.name}</span>
                            <span className="font-mono font-bold text-blue-700 shrink-0 text-[10px]">
                              {k.target2026 || '-'} / {k.target2027 || '-'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Initiatives chain */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block">
                        {obj.initiatives.length} Initiatives ➔ Deliverables
                      </span>

                      {obj.initiatives.map((init) => (
                        <div key={init.id} className="bg-white p-2.5 rounded-lg border border-slate-200/90 text-xs space-y-1.5">
                          <div className="flex items-center justify-between font-bold text-slate-900 text-[11px]">
                            <span>{init.code}: {init.title}</span>
                          </div>

                          {/* Milestones Flow */}
                          {init.milestones.length > 0 && init.milestones[0] && (
                            <div className="flex items-center gap-1 text-[10px] text-slate-600">
                              <Milestone className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{init.milestones[0].title}</span>
                              <span className="font-mono text-slate-400">({init.milestones[0].dueDate})</span>
                            </div>
                          )}

                          {/* Projects Flow */}
                          {init.keyProjects.length > 0 && (
                            <div className="flex items-center gap-1 text-[10px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              <FolderGit2 className="w-3 h-3 text-amber-700 shrink-0" />
                              <span className="truncate">{init.keyProjects[0]}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{isSubmitting ? 'Deploying...' : 'Save & Cascade All Objectives & Metrics'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
