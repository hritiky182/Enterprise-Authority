import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  User,
  Role,
  Sector,
  Department,
  OrganizationConfig,
  RiskItem,
  StrategicTheme,
  StrategicGoal,
  StrategicObjective,
  StrategyPlan,
  StrategicInitiative,
  KPI,
  ActionItem,
  TaskItem,
  DocumentItem,
  BCMProcess,
  BCMPlan,
  NotificationItem,
} from '../types';
import {
  ORGANIZATION_INFO,
  AUTHORITY_SECTORS,
  DEPARTMENTS as initialDepartments,
  CURRENT_USER,
  MOCK_USERS,
  DEFAULT_STRATEGY_PLAN,
  RISKS as initialRisks,
  STRATEGIC_THEMES as initialThemes,
  STRATEGIC_GOALS as initialGoals,
  STRATEGIC_OBJECTIVES as initialObjectives,
  STRATEGIC_INITIATIVES as initialInitiatives,
  KPIS as initialKpis,
  ACTION_ITEMS as initialActions,
  TASK_ITEMS as initialTasks,
  DOCUMENT_ITEMS as initialDocuments,
  BCM_PROCESSES as initialBcmProcesses,
  BCM_PLANS as initialBcmPlans,
  NOTIFICATIONS as initialNotifications,
} from '../data/mockData';
import { ROLE_PERMISSIONS_MAP, RolePermissions } from '../utils/permissions';
import { toast } from 'sonner';
import { t as translate, Language } from '../utils/translations';

export interface CreateStrategyPayload {
  selectedThemeId?: string | undefined;
  selectedGoalId?: string | undefined;
  selectedObjectiveId?: string | undefined;
  selectedInitiativeId?: string | undefined;
  theme: {
    code?: string | undefined;
    title: string;
    description: string;
    color?: string | undefined;
    weight?: number | undefined;
  };
  goal: {
    code?: string | undefined;
    title: string;
    description?: string | undefined;
  };
  objective: {
    code?: string | undefined;
    title: string;
    owner: string;
    department: string;
    sectorId?: string | undefined;
    sectorName?: string | undefined;
    targetYear?: number | undefined;
    progress?: number | undefined;
    status?: 'on-track' | 'at-risk' | 'behind' | 'achieved' | undefined;
  };
  kpi?: {
    code?: string | undefined;
    name: string;
    unit?: string | undefined;
    target?: number | undefined;
    actual?: number | undefined;
    frequency?: 'Monthly' | 'Quarterly' | 'Bi-Annual' | 'Annual' | undefined;
    status?: 'on-track' | 'warning' | 'critical' | 'achieved' | undefined;
    formula?: string | undefined;
    baseline?: string | number | undefined;
    target2026?: string | number | undefined;
    target2027?: string | number | undefined;
    strategicInitiative?: string | undefined;
    keyMilestone?: string | undefined;
    keyProject?: string | undefined;
    pillarCode?: string | undefined;
    pillarTitle?: string | undefined;
  } | undefined;
  initiative?: {
    code?: string | undefined;
    title: string;
    description?: string | undefined;
    owner?: string | undefined;
    department?: string | undefined;
    budgetSAR?: number | undefined;
    spentSAR?: number | undefined;
    progress?: number | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    status?: 'In Progress' | 'Planning' | 'At Risk' | 'Completed' | undefined;
    milestones?: {
      title: string;
      dueDate: string;
      status: 'Completed' | 'In Progress' | 'Pending';
    }[] | undefined;
    keyProjects?: string[] | undefined;
  } | undefined;
}

interface ModalConfig {
  type: 'risk' | 'objective' | 'initiative' | 'kpi' | 'compliance' | 'bcm' | 'action' | 'policy' | 'document' | 'create_action' | 'create_risk' | 'create_kpi' | 'create_initiative' | 'import_strategy';
  item?: any;
}

interface AppContextType {
  // Authentication & RBAC
  isAuthenticated: boolean;
  login: (user?: User) => void;
  logout: () => void;
  currentUser: User;
  switchUserRole: (role: Role) => void;
  permissions: RolePermissions;

  lang: 'en' | 'ar';
  dir: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string, fallback?: string) => string;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  // Dynamic Entities
  risks: RiskItem[];
  addRisk: (risk: Omit<RiskItem, 'id' | 'code' | 'inherentScore' | 'residualScore' | 'lastAssessedDate'>) => void;
  updateRiskStatus: (id: string, status: RiskItem['status'], treatment?: RiskItem['treatment']) => void;

  themes: StrategicTheme[];
  goals: StrategicGoal[];
  addStrategyTheme: (theme: Omit<StrategicTheme, 'id'>) => StrategicTheme;
  addGoal: (goal: Omit<StrategicGoal, 'id'>) => StrategicGoal;
  objectives: StrategicObjective[];
  initiatives: StrategicInitiative[];
  kpis: KPI[];
  strategyPlan: StrategyPlan;
  updateStrategyPlan: (updates: Partial<StrategyPlan>) => void;
  cascadeStrategy: (payload: {
    themeId: string;
    goalIds: string[];
    objectiveIds: string[];
    kpiIds: string[];
    initiativeIds: string[];
  }) => void;
  addStrategy: (payload: CreateStrategyPayload) => { themeId: string; goalId: string; objectiveId: string };
  addObjective: (objective: Omit<StrategicObjective, 'id'>) => StrategicObjective;
  addKPI: (kpi: Omit<KPI, 'id'>) => KPI;
  updateKPI: (id: string, updates: Partial<KPI>) => void;
  deleteKPI: (id: string) => void;
  addInitiative: (init: Omit<StrategicInitiative, 'id'>) => StrategicInitiative;
  updateInitiative: (id: string, updates: Partial<StrategicInitiative>) => void;
  deleteInitiative: (id: string) => void;
  updateGoal: (id: string, updates: Partial<StrategicGoal>) => void;
  deleteGoal: (id: string) => void;
  updateStrategyTheme: (id: string, updates: Partial<StrategicTheme>) => void;
  deleteStrategyTheme: (themeId: string) => void;
  resetStrategies: () => void;
  updateObjective: (id: string, updates: Partial<StrategicObjective>, note?: string) => void;
  deleteObjective: (id: string) => void;
  toggleMilestone: (initiativeId: string, milestoneId: string) => void;
  importStrategyData: (data: {
    themes?: StrategicTheme[];
    goals?: StrategicGoal[];
    objectives?: StrategicObjective[];
    initiatives?: StrategicInitiative[];
    kpis?: KPI[];
  }) => { themesCount: number; objectivesCount: number; kpisCount: number; initiativesCount: number };
  exportAllDataAsJson: () => void;
  resetAllDataToDefaults: () => void;

  actions: ActionItem[];
  addAction: (action: Omit<ActionItem, 'id' | 'code'>) => void;
  updateActionStatus: (id: string, status: ActionItem['status'], progress: number) => void;

  tasks: TaskItem[];
  updateTaskColumn: (taskId: string, column: TaskItem['boardColumn']) => void;
  addTask: (task: Omit<TaskItem, 'id' | 'code'>) => void;

  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id' | 'code'>) => void;
  importDocuments: (docs: (Omit<DocumentItem, 'id' | 'code'> & Partial<DocumentItem>)[]) => number;

  importRisks: (newRisks: Partial<RiskItem>[]) => number;
  importKpiActuals: (updates: { code: string; actual: number; target?: number; status?: KPI['status'] }[]) => number;

  users: User[];
  addUser: (user: Omit<User, 'id'>) => User;
  updateUser: (userId: string, updates: Partial<User>) => void;
  updateUserRole: (userId: string, newRole: Role) => void;
  deleteUser: (userId: string) => void;
  importUsers: (newUsers: Partial<User>[]) => number;

  bcmProcesses: BCMProcess[];
  bcmPlans: BCMPlan[];

  // Organization Structure & Client Metadata
  sectors: Sector[];
  departments: Department[];
  organization: OrganizationConfig;
  updateOrganization: (updates: Partial<OrganizationConfig>) => void;
  addDepartment: (dept: Omit<Department, 'id'>) => Department;
  updateDepartment: (id: string, updates: Partial<Department>) => void;
  deleteDepartment: (id: string) => void;

  // Story-Driven Demo Journey State
  demoJourneyStep: number;
  setDemoJourneyStep: (step: number) => void;
  isDemoJourneyActive: boolean;
  setIsDemoJourneyActive: (active: boolean) => void;

  // Modal / Drawer State
  activeModal: ModalConfig | null;
  openModal: (type: ModalConfig['type'], item?: any) => void;
  closeModal: () => void;

  // Filter criteria for navigation cross-linking
  selectedFilter: { category?: string; status?: string; department?: string } | null;
  setSelectedFilter: (filter: { category?: string; status?: string; department?: string } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Robust local storage persistence helper for demo data manipulation
const loadStorageState = <T,>(key: string, fallback: T): T => {
  try {
    const local = localStorage.getItem(key);
    if (local !== null && local !== 'undefined') {
      const parsed = JSON.parse(local);
      if (parsed !== null && parsed !== undefined) {
        if (Array.isArray(fallback)) {
          if (Array.isArray(parsed) && parsed.length > 0) return parsed as T;
        } else {
          return parsed as T;
        }
      }
    }
    // Migration fallback from sessionStorage
    const session = sessionStorage.getItem(key);
    if (session !== null && session !== 'undefined') {
      const parsed = JSON.parse(session);
      if (parsed !== null && parsed !== undefined) {
        if (Array.isArray(fallback)) {
          if (Array.isArray(parsed) && parsed.length > 0) {
            localStorage.setItem(key, session);
            return parsed as T;
          }
        } else {
          localStorage.setItem(key, session);
          return parsed as T;
        }
      }
    }
  } catch (err) {
    console.warn(`[Storage] Failed to read ${key}:`, err);
  }
  return fallback;
};

const saveStorageState = <T,>(key: string, data: T): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    sessionStorage.setItem(key, serialized);
  } catch (err) {
    console.warn(`[Storage] Failed to save ${key}:`, err);
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('eda_auth') === 'true' || sessionStorage.getItem('eda_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser = loadStorageState<User | null>('eda_user', null);
    if (savedUser && savedUser.role && (savedUser.role === 'Authority Board & CEO' || ROLE_PERMISSIONS_MAP[savedUser.role as Role])) {
      return savedUser;
    }
    return CURRENT_USER;
  });

  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    const saved = localStorage.getItem('eda_lang');
    return saved === 'ar' || saved === 'en' ? saved : 'en';
  });

  React.useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    localStorage.setItem('eda_lang', lang);
  }, [lang]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Entities
  const [risks, setRisks] = useState<RiskItem[]>(() => {
    return loadStorageState<RiskItem[]>('eda_risks', initialRisks);
  });

  const [themes, setThemes] = useState<StrategicTheme[]>(() => {
    return loadStorageState<StrategicTheme[]>('eda_themes', initialThemes);
  });

  const [goals, setGoals] = useState<StrategicGoal[]>(() => {
    return loadStorageState<StrategicGoal[]>('eda_goals', initialGoals);
  });

  const [objectives, setObjectives] = useState<StrategicObjective[]>(() => {
    return loadStorageState<StrategicObjective[]>('eda_objectives', initialObjectives);
  });

  const [initiatives, setInitiatives] = useState<StrategicInitiative[]>(() => {
    return loadStorageState<StrategicInitiative[]>('eda_initiatives', initialInitiatives);
  });

  const [kpis, setKpis] = useState<KPI[]>(() => {
    return loadStorageState<KPI[]>('eda_kpis', initialKpis);
  });

  const [strategyPlan, setStrategyPlan] = useState<StrategyPlan>(() => {
    return loadStorageState<StrategyPlan>('eda_strategy_plan', DEFAULT_STRATEGY_PLAN);
  });

  const updateStrategyPlan = (updates: Partial<StrategyPlan>) => {
    setStrategyPlan((prev) => {
      const updated = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      saveStorageState('eda_strategy_plan', updated);
      return updated;
    });
  };

  const [actions, setActions] = useState<ActionItem[]>(initialActions);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    return loadStorageState<DocumentItem[]>('eda_documents', initialDocuments);
  });

  const [users, setUsers] = useState<User[]>(() => {
    return loadStorageState<User[]>('eda_users', MOCK_USERS);
  });

  const [bcmProcesses] = useState<BCMProcess[]>(initialBcmProcesses);
  const [bcmPlans] = useState<BCMPlan[]>(initialBcmPlans);

  // Organization Branding & Identity State
  const defaultOrgConfig: OrganizationConfig = {
    name: ORGANIZATION_INFO.name,
    nameAr: ORGANIZATION_INFO.nameAr,
    shortName: ORGANIZATION_INFO.shortName,
    shortCode: ORGANIZATION_INFO.shortName || 'AHDA',
    logo: 'ahda-emblem',
    logoUrl: '',
    themeColor: 'blue',
    vision: ORGANIZATION_INFO.vision,
    visionAr: ORGANIZATION_INFO.visionAr,
    mission: ORGANIZATION_INFO.mission,
    missionAr: 'قيادة التنمية المكانية والاجتماعية والاقتصادية المستدامة عبر واحة الأحساء والمراكز الحضرية.',
    values: [
      'Civic Co-Creation & Community First',
      'Sustainable Environmental Stewardship',
      'Heritage Preservation & Oasis Identity',
      'Institutional Agility & Innovation',
      'Governance, Transparency & Integrity',
    ],
    coreValues: [
      'Civic Co-Creation & Community First',
      'Sustainable Environmental Stewardship',
      'Heritage Preservation & Oasis Identity',
      'Institutional Agility & Innovation',
      'Governance, Transparency & Integrity',
    ],
    valuesAr: [
      'المشاركة المجتمعية وأولوية المواطن',
      'الريادة البيئية والاستدامة',
      'حفظ التراث وهوية الواحة',
      'المرونة المؤسسية والابتكار',
      'الحوكمة والنزاهة والشفافية',
    ],
    boardChair: ORGANIZATION_INFO.boardChair,
    ceo: ORGANIZATION_INFO.ceo,
  };

  const [organization, setOrganization] = useState<OrganizationConfig>(() => {
    return loadStorageState<OrganizationConfig>('eda_org_info', defaultOrgConfig);
  });

  const updateOrganization = (updates: Partial<OrganizationConfig>) => {
    setOrganization((prev) => {
      const next = { ...prev, ...updates };
      saveStorageState('eda_org_info', next);
      return next;
    });
    toast.success(lang === 'ar' ? 'تم تحديث هوية وبيانات المنظومة' : 'Organization Setup Updated', {
      description: lang === 'ar' ? 'تم حفظ التعديلات وتطبيقها على المنظومة' : 'Changes applied to entity profile & theme',
    });
  };

  // Departments State
  const [departments, setDepartments] = useState<Department[]>(() => {
    return loadStorageState<Department[]>('eda_departments', initialDepartments);
  });

  const addDepartment = (dept: Omit<Department, 'id'>): Department => {
    const newDept: Department = {
      ...dept,
      id: `dept-${Date.now()}`,
    };
    setDepartments((prev) => {
      const next = [...prev, newDept];
      saveStorageState('eda_departments', next);
      return next;
    });
    toast.success(lang === 'ar' ? 'تمت إضافة الإدارة/الوحدة التنظيمية' : 'Department Added Successfully');
    return newDept;
  };

  const updateDepartment = (id: string, updates: Partial<Department>) => {
    setDepartments((prev) => {
      const next = prev.map((d) => (d.id === id ? { ...d, ...updates } : d));
      saveStorageState('eda_departments', next);
      return next;
    });
    toast.success(lang === 'ar' ? 'تم تحديث الإدارة والصلاحيات' : 'Department & Permissions Updated');
  };

  const deleteDepartment = (id: string) => {
    setDepartments((prev) => {
      const next = prev.filter((d) => d.id !== id);
      saveStorageState('eda_departments', next);
      return next;
    });
    toast.info(lang === 'ar' ? 'تم حذف الإدارة' : 'Department Removed');
  };

  // Story-Driven Demo Journey State
  const [demoJourneyStep, setDemoJourneyStepState] = useState<number>(() => {
    return loadStorageState<number>('eda_demo_step', 1);
  });

  const [isDemoJourneyActive, setIsDemoJourneyActiveState] = useState<boolean>(() => {
    return loadStorageState<boolean>('eda_demo_active', true);
  });

  const setDemoJourneyStep = (step: number) => {
    setDemoJourneyStepState(step);
    saveStorageState('eda_demo_step', step);
  };

  const setIsDemoJourneyActive = (active: boolean) => {
    setIsDemoJourneyActiveState(active);
    saveStorageState('eda_demo_active', active);
  };

  // Modals & Drawers
  const [activeModal, setActiveModal] = useState<ModalConfig | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<{ category?: string; status?: string; department?: string } | null>(null);

  const permissions = ROLE_PERMISSIONS_MAP[currentUser.role] || ROLE_PERMISSIONS_MAP['Viewer'];

  const login = (userToLogin?: User) => {
    const userToSet = userToLogin || currentUser;
    setCurrentUser(userToSet);
    setIsAuthenticated(true);
    localStorage.setItem('eda_auth', 'true');
    sessionStorage.setItem('eda_auth', 'true');
    saveStorageState('eda_user', userToSet);
    toast.success(lang === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Signed in successfully', {
      description: lang === 'ar' ? `الدور النشط: ${userToSet.role}` : `Active Role: ${userToSet.role}`,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('eda_auth');
    localStorage.removeItem('eda_user');
    sessionStorage.removeItem('eda_auth');
    sessionStorage.removeItem('eda_user');
    toast.info('Signed out of Enterprise Platform');
  };

  const switchUserRole = (role: Role) => {
    const matchedUser = users.find((u) => u.role === role) || MOCK_USERS.find((u) => u.role === role) || {
      ...currentUser,
      role,
      title: `${role} Officer`,
    };
    setCurrentUser(matchedUser);
    saveStorageState('eda_user', matchedUser);
    toast.success(`Active Persona: ${role}`, {
      description: ROLE_PERMISSIONS_MAP[role]?.roleDescription || 'Role permissions updated.',
    });
  };

  const setLanguage = (newLang: 'en' | 'ar') => {
    setLang(newLang);
    if (newLang === 'ar') {
      toast.success('تم تحويل لغة النظام إلى العربية', {
        description: 'تم تفعيل الاتجاه من اليمين إلى اليسار والخط العربي',
      });
    } else {
      toast.info('Language switched to English', {
        description: 'Left-to-right layout and English typography enabled',
      });
    }
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
  };

  const tHelper = (key: string, fallback?: string) => {
    return translate(key, lang, fallback);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addRisk = (newRiskData: Omit<RiskItem, 'id' | 'code' | 'inherentScore' | 'residualScore' | 'lastAssessedDate'>) => {
    if (!permissions.canCreateRisk) {
      toast.error('Permission Denied', {
        description: 'Your current role does not have authorization to register enterprise risks.',
      });
      return;
    }
    const id = `r-${Date.now()}`;
    const code = `RSK-NEW-${Math.floor(100 + Math.random() * 900)}`;
    const inherentScore = newRiskData.likelihood * newRiskData.impact;
    const residualScore = newRiskData.residualLikelihood * newRiskData.residualImpact;

    const newRisk: RiskItem = {
      ...newRiskData,
      id,
      code,
      inherentScore,
      residualScore,
      lastAssessedDate: new Date().toISOString().slice(0, 10),
      history: [
        {
          date: new Date().toISOString().slice(0, 10),
          action: 'Risk created via Risk Register',
          user: currentUser.name,
        },
      ],
    };

    setRisks((prev) => {
      const updated = [newRisk, ...prev];
      sessionStorage.setItem('eda_risks', JSON.stringify(updated));
      return updated;
    });
    toast.success(`Risk ${code} Created Successfully`, {
      description: `${newRisk.title} added to Enterprise Register.`,
    });
    closeModal();
  };

  const updateRiskStatus = (id: string, status: RiskItem['status'], treatment?: RiskItem['treatment']) => {
    if (permissions.isReadOnly) {
      toast.error('Read-Only Access', {
        description: 'Your active role cannot modify risk register records.',
      });
      return;
    }
    setRisks((prev) => {
      const updated = prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            status,
            treatment: treatment || r.treatment,
            lastAssessedDate: new Date().toISOString().slice(0, 10),
            history: [
              {
                date: new Date().toISOString().slice(0, 10),
                action: `Status updated to ${status}`,
                user: currentUser.name,
              },
              ...(r.history || []),
            ],
          };
        }
        return r;
      });
      sessionStorage.setItem('eda_risks', JSON.stringify(updated));
      return updated;
    });
    toast.success('Risk Register Updated', {
      description: `Risk status modified to ${status}.`,
    });
  };

  const importRisks = (newRisks: Partial<RiskItem>[]) => {
    const validCategories: RiskItem['category'][] = ['Operational', 'Strategic', 'Financial', 'Compliance', 'Cyber', 'Reputational'];
    const validStatuses: RiskItem['status'][] = ['Open', 'Mitigating', 'Accepted', 'Closed'];
    const validTreatments: RiskItem['treatment'][] = ['Mitigate', 'Transfer', 'Avoid', 'Accept'];

    const formattedRisks: RiskItem[] = newRisks.map((r, i) => {
      const code = r.code || `RSK-2026-${Math.floor(100 + Math.random() * 900)}`;
      const id = r.id || `rsk-imp-${Date.now()}-${i}`;
      const likelihood = Number(r.likelihood) || 3;
      const impact = Number(r.impact) || 3;
      const inherentScore = likelihood * impact;
      const residualLikelihood = Math.max(1, Math.round(likelihood * 0.7));
      const residualImpact = Math.max(1, Math.round(impact * 0.7));
      const residualScore = r.residualScore !== undefined ? Number(r.residualScore) : residualLikelihood * residualImpact;

      const category: RiskItem['category'] = validCategories.includes(r.category as any) ? (r.category as RiskItem['category']) : 'Operational';
      const status: RiskItem['status'] = validStatuses.includes(r.status as any) ? (r.status as RiskItem['status']) : 'Open';
      const treatment: RiskItem['treatment'] = validTreatments.includes(r.treatment as any) ? (r.treatment as RiskItem['treatment']) : 'Mitigate';

      return {
        id,
        code,
        title: r.title || 'Untitled Risk Item',
        description: r.description || 'Imported risk item assessed under ISO 31000 framework.',
        category,
        department: r.department || currentUser.department,
        owner: r.owner || currentUser.name,
        likelihood,
        impact,
        inherentScore,
        residualLikelihood,
        residualImpact,
        residualScore,
        treatment,
        status,
        controlsCount: r.controlsCount ?? 2,
        actionsCount: r.actionsCount ?? 1,
        lastAssessedDate: r.lastAssessedDate || new Date().toISOString().slice(0, 10),
        treatmentDetails: r.treatmentDetails || 'Mitigation controls applied as per enterprise risk policy.',
        history: [
          {
            date: new Date().toISOString().slice(0, 10),
            action: 'Risk imported from external register',
            user: currentUser.name,
          },
        ],
      };
    });

    setRisks((prev) => {
      const updated = [...formattedRisks, ...prev];
      sessionStorage.setItem('eda_risks', JSON.stringify(updated));
      return updated;
    });
    toast.success(`Imported ${formattedRisks.length} Risks into Register`, {
      description: 'Enterprise 5x5 heatmap and risk metrics have been updated.',
    });
    return formattedRisks.length;
  };

  const importKpiActuals = (updates: { code: string; actual: number; target?: number; status?: KPI['status'] }[]) => {
    let updatedCount = 0;
    setKpis((prev) => {
      const updated = prev.map((kpi) => {
        const match = updates.find((u) => u.code.toLowerCase().trim() === kpi.code.toLowerCase().trim());
        if (match) {
          updatedCount++;
          const target = match.target !== undefined ? match.target : kpi.target;
          const actual = match.actual;
          const achievementPct = target > 0 ? Math.min(100, Math.round((actual / target) * 100)) : 0;
          let status: KPI['status'] = kpi.status;
          if (match.status) {
            status = match.status;
          } else if (achievementPct >= 95) {
            status = 'achieved';
          } else if (achievementPct >= 80) {
            status = 'on-track';
          } else if (achievementPct >= 65) {
            status = 'warning';
          } else {
            status = 'critical';
          }
          return {
            ...kpi,
            actual,
            target,
            achievementPct,
            status,
          };
        }
        return kpi;
      });
      sessionStorage.setItem('eda_kpis', JSON.stringify(updated));
      return updated;
    });

    toast.success(`Updated ${updatedCount} KPI Metric Measurements`, {
      description: 'Performance scorecards and achievement rates recalculated.',
    });
    return updatedCount;
  };

  const addAction = (newActionData: Omit<ActionItem, 'id' | 'code'>) => {
    if (!permissions.canCreateAction) {
      toast.error('Permission Denied', {
        description: 'Your role is restricted from creating new action plans.',
      });
      return;
    }
    const id = `act-${Date.now()}`;
    const code = `ACT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newAction: ActionItem = {
      ...newActionData,
      id,
      code,
    };
    setActions((prev) => [newAction, ...prev]);
    toast.success(`Action Plan ${code} Created`, {
      description: newAction.title,
    });
    closeModal();
  };

  const updateActionStatus = (id: string, status: ActionItem['status'], progress: number) => {
    if (permissions.isReadOnly) {
      toast.error('Read-Only Access', {
        description: 'Your active role cannot update action plan execution status.',
      });
      return;
    }
    setActions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, progress } : a))
    );
    toast.success('Action Item Updated', {
      description: `Progress updated to ${progress}%.`,
    });
  };

  const addTask = (newTaskData: Omit<TaskItem, 'id' | 'code'>) => {
    if (!permissions.canCreateTask) {
      toast.error('Permission Denied', {
        description: 'Your role is restricted from adding new operational tasks.',
      });
      return;
    }
    const id = `tsk-${Date.now()}`;
    const code = `TSK-${Math.floor(10 + Math.random() * 90)}`;
    const newTask: TaskItem = {
      ...newTaskData,
      id,
      code,
    };
    setTasks((prev) => [newTask, ...prev]);
    toast.success(`Task ${code} Added`, { description: newTask.title });
    closeModal();
  };

  const updateTaskColumn = (taskId: string, column: TaskItem['boardColumn']) => {
    if (permissions.isReadOnly) {
      toast.error('Read-Only Access', {
        description: 'Your active role cannot move kanban task cards.',
      });
      return;
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, boardColumn: column } : t))
    );
    toast.success('Kanban Task Updated', {
      description: `Moved task to ${column.replace('_', ' ').toUpperCase()}`,
    });
  };

  const addDocument = (docData: Omit<DocumentItem, 'id' | 'code'>) => {
    if (!permissions.canUploadDocument) {
      toast.error('Permission Denied', {
        description: 'Your role cannot upload documents to the repository.',
      });
      return;
    }
    const id = `doc-${Date.now()}`;
    const code = `DOC-NEW-${Math.floor(100 + Math.random() * 900)}`;
    const newDoc: DocumentItem = {
      ...docData,
      id,
      code,
    };
    setDocuments((prev) => {
      const updated = [newDoc, ...prev];
      sessionStorage.setItem('eda_documents', JSON.stringify(updated));
      return updated;
    });
    toast.success('Document Uploaded', {
      description: `${newDoc.title} added to Repository.`,
    });
    closeModal();
  };

  const importDocuments = (docs: (Omit<DocumentItem, 'id' | 'code'> & Partial<DocumentItem>)[]) => {
    const formatted: DocumentItem[] = docs.map((doc, idx) => {
      const rawType = (doc.fileType || 'pdf').toLowerCase();
      const fileType: DocumentItem['fileType'] = rawType === 'docx' ? 'docx' : rawType === 'xlsx' ? 'xlsx' : 'pdf';
      return {
        id: doc.id || `doc-imp-${Date.now()}-${idx}`,
        code: doc.code || `DOC-2026-${Math.floor(100 + Math.random() * 900)}`,
        title: doc.title || 'Untitled Document',
        category: doc.category || 'Compliance Evidence',
        uploadedBy: doc.uploadedBy || currentUser.name,
        uploadDate: doc.uploadDate || new Date().toISOString().slice(0, 10),
        version: doc.version || 'v1.0',
        fileSize: doc.fileSize || '2.4 MB',
        fileType,
        tags: doc.tags || ['Enterprise', 'Compliance'],
      };
    });

    setDocuments((prev) => {
      const updated = [...formatted, ...prev];
      sessionStorage.setItem('eda_documents', JSON.stringify(updated));
      return updated;
    });

    toast.success(`Imported ${formatted.length} Documents into Repository`, {
      description: 'Knowledge and evidence documents are now indexed.',
    });
    return formatted.length;
  };

  const importUsers = (newUsers: Partial<User>[]) => {
    const formatted: User[] = newUsers.map((u, i) => ({
      id: u.id || `usr-imp-${Date.now()}-${i}`,
      name: u.name || 'New Enterprise User',
      email: u.email || `user${i + 1}@enterprise.com`,
      title: u.title || 'Corporate Officer',
      department: u.department || 'Strategic Development Office',
      role: u.role || 'Viewer',
      avatar: u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    }));
    setUsers((prev) => {
      const updated = [...prev, ...formatted];
      sessionStorage.setItem('eda_users', JSON.stringify(updated));
      return updated;
    });
    toast.success(`Imported ${formatted.length} User Accounts into System`);
    return formatted.length;
  };

  const addUser = (userData: Omit<User, 'id'>): User => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      avatar: userData.avatar || '',
    };
    setUsers((prev) => {
      const updated = [newUser, ...prev];
      sessionStorage.setItem('eda_users', JSON.stringify(updated));
      return updated;
    });
    toast.success(
      lang === 'ar'
        ? `تمت إضافة "${newUser.nameAr || newUser.name}" وتعيين دور: ${newUser.role}`
        : `Added "${newUser.name}" and assigned role: ${newUser.role}`
    );
    return newUser;
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers((prev) => {
      const updated = prev.map((u) => (u.id === userId ? { ...u, ...updates } : u));
      sessionStorage.setItem('eda_users', JSON.stringify(updated));
      return updated;
    });
    toast.success(
      lang === 'ar'
        ? 'تم تحديث بيانات المستخدم بنجاح'
        : 'User updated successfully'
    );
  };

  const updateUserRole = (userId: string, newRole: Role) => {
    setUsers((prev) => {
      const updated = prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
      sessionStorage.setItem('eda_users', JSON.stringify(updated));
      return updated;
    });
    toast.success(
      lang === 'ar'
        ? `تم تحديث الدور بنجاح إلى: ${newRole}`
        : `Role updated successfully to: ${newRole}`
    );
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => {
      const updated = prev.filter((u) => u.id !== userId);
      saveStorageState('eda_users', updated);
      return updated;
    });
    toast.success(lang === 'ar' ? 'تم حذف المستخدم من المنظومة' : 'User removed from system');
  };

  const addObjective = (newObjData: Omit<StrategicObjective, 'id'>) => {
    const id = `obj-${Date.now()}`;
    const createdObj: StrategicObjective = {
      ...newObjData,
      id,
      kpiCount: newObjData.kpiCount || 0,
      status: newObjData.status || 'on-track',
      progress: Number(newObjData.progress) || 0,
      targetYear: Number(newObjData.targetYear) || 2026,
      isCustom: true,
    };

    setObjectives((prev) => {
      const updated = [...prev, createdObj];
      saveStorageState('eda_objectives', updated);
      return updated;
    });

    toast.success(`Objective "${createdObj.code} ${createdObj.title}" Created`, {
      description: 'Added to live Strategy framework and OKR portfolio.',
    });
    return createdObj;
  };

  const deleteObjective = (id: string) => {
    setObjectives((prev) => {
      const updated = prev.filter((o) => o.id !== id);
      saveStorageState('eda_objectives', updated);
      return updated;
    });
    setKpis((prev) => {
      const updated = prev.filter((k) => k.objectiveId !== id);
      saveStorageState('eda_kpis', updated);
      return updated;
    });
    setInitiatives((prev) => {
      const updated = prev.filter((i) => i.objectiveId !== id);
      saveStorageState('eda_initiatives', updated);
      return updated;
    });
    toast.info(lang === 'ar' ? 'تم حذف الهدف الاستراتيجي والمؤشرات المرتبطة' : 'Objective and linked metrics removed');
  };

  const addKPI = (newKpiData: Omit<KPI, 'id'>) => {
    const id = `kpi-${Date.now()}`;
    const targetVal = Number(newKpiData.target) || 100;
    const actualVal = Number(newKpiData.actual) || 0;
    const achievementPct = targetVal > 0 ? Math.min(100, Math.round((actualVal / targetVal) * 100)) : 0;

    const createdKpi: KPI = {
      ...newKpiData,
      id,
      target: targetVal,
      actual: actualVal,
      achievementPct,
      isCustom: true,
    };

    setKpis((prev) => {
      const updated = [...prev, createdKpi];
      saveStorageState('eda_kpis', updated);
      return updated;
    });

    setObjectives((prev) => {
      const updated = prev.map((o) =>
        o.id === newKpiData.objectiveId ? { ...o, kpiCount: (o.kpiCount || 0) + 1 } : o
      );
      saveStorageState('eda_objectives', updated);
      return updated;
    });

    toast.success(`KPI "${createdKpi.code} ${createdKpi.name}" Created`, {
      description: 'Added to live Strategy Matrix and OKR register.',
    });
    return createdKpi;
  };

  const updateKPI = (id: string, updates: Partial<KPI>) => {
    setKpis((prev) => {
      const updated = prev.map((k) => {
        if (k.id === id) {
          const nextTarget = updates.target !== undefined ? Number(updates.target) : k.target;
          const nextActual = updates.actual !== undefined ? Number(updates.actual) : k.actual;
          const nextAchievement = nextTarget > 0 ? Math.min(100, Math.round((nextActual / nextTarget) * 100)) : 0;
          return {
            ...k,
            ...updates,
            target: nextTarget,
            actual: nextActual,
            achievementPct: updates.achievementPct !== undefined ? updates.achievementPct : nextAchievement,
          };
        }
        return k;
      });
      saveStorageState('eda_kpis', updated);
      return updated;
    });
    toast.success(lang === 'ar' ? 'تم تحديث مؤشر الأداء بنجاح' : 'KPI updated successfully');
  };

  const deleteKPI = (id: string) => {
    setKpis((prev) => {
      const updated = prev.filter((k) => k.id !== id);
      saveStorageState('eda_kpis', updated);
      return updated;
    });
    toast.info(lang === 'ar' ? 'تم حذف مؤشر الأداء' : 'KPI removed from system');
  };

  const addInitiative = (newInitData: Omit<StrategicInitiative, 'id'>) => {
    const id = `init-${Date.now()}`;
    const createdInit: StrategicInitiative = {
      ...newInitData,
      id,
      isCustom: true,
    };

    setInitiatives((prev) => {
      const updated = [...prev, createdInit];
      saveStorageState('eda_initiatives', updated);
      return updated;
    });

    toast.success(`Initiative "${createdInit.title}" Created`, {
      description: 'Added to strategic delivery roadmap.',
    });
    return createdInit;
  };

  const updateInitiative = (id: string, updates: Partial<StrategicInitiative>) => {
    setInitiatives((prev) => {
      const updated = prev.map((i) => (i.id === id ? { ...i, ...updates } : i));
      saveStorageState('eda_initiatives', updated);
      return updated;
    });
    toast.success(lang === 'ar' ? 'تم تحديث المبادرة بنجاح' : 'Initiative updated successfully');
  };

  const deleteInitiative = (id: string) => {
    setInitiatives((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveStorageState('eda_initiatives', updated);
      return updated;
    });
    toast.info(lang === 'ar' ? 'تم حذف المبادرة الاستراتيجية' : 'Initiative removed from roadmap');
  };

  const addStrategy = (payload: CreateStrategyPayload) => {
    const nextThemeNum = themes.length + 1;

    // 1. Resolve Strategic Pillar (Theme) - Existing vs New
    const existingTheme = payload.selectedThemeId
      ? themes.find((t) => t.id === payload.selectedThemeId)
      : null;

    let themeId = existingTheme ? existingTheme.id : `st-${Date.now()}`;
    let themeCode = existingTheme ? existingTheme.code : (payload.theme.code?.trim() || `ST-${String(nextThemeNum).padStart(2, '0')}`);
    let themeTitle = existingTheme ? existingTheme.title : payload.theme.title;

    let newTheme: StrategicTheme | null = null;
    if (!existingTheme) {
      newTheme = {
        id: themeId,
        code: themeCode,
        title: themeTitle,
        description: payload.theme.description,
        color: payload.theme.color || 'blue',
        weight: Number(payload.theme.weight) || 20,
        isCustom: true,
      };
    }

    // 2. Resolve Strategic Goal - Existing vs New
    const existingGoal = payload.selectedGoalId
      ? goals.find((g) => g.id === payload.selectedGoalId)
      : null;

    let goalId = existingGoal ? existingGoal.id : `sg-${Date.now()}`;
    let goalCode = existingGoal ? existingGoal.code : (payload.goal.code?.trim() || `SG-${nextThemeNum}.1`);
    let goalTitle = existingGoal ? existingGoal.title : payload.goal.title;

    let newGoal: StrategicGoal | null = null;
    if (!existingGoal) {
      newGoal = {
        id: goalId,
        code: goalCode,
        themeId,
        title: goalTitle,
        description: payload.goal.description || '',
        isCustom: true,
      };
    }

    // 3. Resolve Strategic Objective - Existing vs New
    const existingObjective = payload.selectedObjectiveId
      ? objectives.find((o) => o.id === payload.selectedObjectiveId)
      : null;

    let objectiveId = existingObjective ? existingObjective.id : `so-${Date.now()}`;
    let objCode = existingObjective ? existingObjective.code : (payload.objective.code?.trim() || `OBJ-${nextThemeNum}01`);
    let objTitle = existingObjective ? existingObjective.title : payload.objective.title;

    let newObjective: StrategicObjective | null = null;
    if (!existingObjective) {
      newObjective = {
        id: objectiveId,
        code: objCode,
        goalId,
        themeId,
        themeName: themeTitle,
        title: objTitle,
        owner: payload.objective.owner || currentUser.name,
        department: payload.objective.department || currentUser.department,
        sectorId: payload.objective.sectorId,
        sectorName: payload.objective.sectorName,
        kpiCount: payload.kpi && payload.kpi.name?.trim() ? 1 : 0,
        status: payload.objective.status || 'on-track',
        targetYear: Number(payload.objective.targetYear) || 2027,
        progress: Number(payload.objective.progress) || 15,
        isCustom: true,
      };
    }

    // 4. Resolve Strategic Initiative - Existing vs New
    const existingInitiative = payload.selectedInitiativeId
      ? initiatives.find((i) => i.id === payload.selectedInitiativeId)
      : null;

    let initTitle = existingInitiative ? existingInitiative.title : (payload.initiative?.title?.trim() || '');
    let newInit: StrategicInitiative | null = null;

    if (!existingInitiative && payload.initiative && payload.initiative.title?.trim()) {
      const initCode = payload.initiative.code?.trim() || `INIT-${String(initiatives.length + 1).padStart(2, '0')}`;
      newInit = {
        id: `init-${Date.now()}`,
        code: initCode,
        objectiveId,
        objectiveTitle: objTitle,
        title: payload.initiative.title,
        description: payload.initiative.description || '',
        owner: payload.initiative.owner || (existingObjective?.owner || currentUser.name),
        department: payload.initiative.department || (existingObjective?.department || currentUser.department),
        budgetSAR: Number(payload.initiative.budgetSAR) || 5000000,
        spentSAR: Number(payload.initiative.spentSAR) || 500000,
        progress: Number(payload.initiative.progress) || 15,
        startDate: payload.initiative.startDate || '2026-01-01',
        endDate: payload.initiative.endDate || '2027-12-31',
        status: payload.initiative.status || 'Planning',
        milestones: payload.initiative.milestones?.map((m, idx) => ({
          id: `m-${Date.now()}-${idx}`,
          title: m.title,
          dueDate: m.dueDate,
          status: m.status,
        })) || [
            {
              id: `m-${Date.now()}-1`,
              title: 'Framework & Initial Scope Sign-off',
              dueDate: '2026-10-15',
              status: 'Completed',
            },
          ],
        keyProjects: payload.kpi?.keyProject ? [payload.kpi.keyProject] : ['Regional Strategic Project'],
        risksCount: 1,
        actionsCount: 1,
        isCustom: true,
      };
    }

    // 5. Build KPI if provided
    let newKpi: KPI | null = null;
    if (payload.kpi && payload.kpi.name?.trim()) {
      const kpiCode = payload.kpi.code?.trim() || `KPI-${nextThemeNum}01`;
      const targetVal = Number(payload.kpi.target) || 100;
      const actualVal = Number(payload.kpi.actual) || 0;
      const achievement = targetVal > 0 ? Math.min(100, Math.round((actualVal / targetVal) * 100)) : 0;

      const pCode = payload.kpi.pillarCode || (themeCode.includes('02') || themeTitle.includes('People') || themeTitle.includes('02') ? '02' : '01');
      const pTitle = payload.kpi.pillarTitle || themeTitle;

      newKpi = {
        id: `kpi-${Date.now()}`,
        code: kpiCode,
        objectiveId,
        objectiveTitle: objTitle,
        name: payload.kpi.name,
        unit: payload.kpi.unit || '%',
        owner: existingObjective?.owner || payload.objective.owner || currentUser.name,
        target: targetVal,
        actual: actualVal,
        achievementPct: achievement,
        frequency: payload.kpi.frequency || 'Quarterly',
        status: payload.kpi.status || 'on-track',
        // Client Cascading Attributes
        formula: payload.kpi.formula || '',
        baseline: payload.kpi.baseline !== undefined ? payload.kpi.baseline : '-',
        target2026: payload.kpi.target2026 !== undefined ? payload.kpi.target2026 : `${targetVal}${payload.kpi.unit || '%'}`,
        target2027: payload.kpi.target2027 !== undefined ? payload.kpi.target2027 : `${targetVal}${payload.kpi.unit || '%'}`,
        strategicInitiative: payload.kpi.strategicInitiative || initTitle,
        keyMilestone: payload.kpi.keyMilestone || payload.initiative?.milestones?.[0]?.title || existingInitiative?.milestones?.[0]?.title || '',
        keyProject: payload.kpi.keyProject || existingInitiative?.keyProjects?.[0] || '',
        pillarCode: pCode,
        pillarTitle: pTitle,
        sectorId: payload.objective.sectorId || existingObjective?.sectorId,
        sectorName: payload.objective.sectorName || existingObjective?.sectorName,
        isCustom: true,
      };
    }

    // Persist & update states
    if (newTheme) {
      setThemes((prev) => {
        const updated = [...prev, newTheme!];
        sessionStorage.setItem('eda_themes', JSON.stringify(updated));
        return updated;
      });
    }

    if (newGoal) {
      setGoals((prev) => {
        const updated = [...prev, newGoal!];
        sessionStorage.setItem('eda_goals', JSON.stringify(updated));
        return updated;
      });
    }

    if (newObjective) {
      setObjectives((prev) => {
        const updated = [...prev, newObjective!];
        sessionStorage.setItem('eda_objectives', JSON.stringify(updated));
        return updated;
      });
    } else if (existingObjective && newKpi) {
      setObjectives((prev) => {
        const updated = prev.map((o) =>
          o.id === existingObjective.id ? { ...o, kpiCount: (o.kpiCount || 0) + 1 } : o
        );
        sessionStorage.setItem('eda_objectives', JSON.stringify(updated));
        return updated;
      });
    }

    if (newInit) {
      setInitiatives((prev) => {
        const updated = [...prev, newInit!];
        sessionStorage.setItem('eda_initiatives', JSON.stringify(updated));
        return updated;
      });
    } else if (existingInitiative && payload.kpi?.keyProject) {
      // Append keyProject to existing initiative if not already present
      setInitiatives((prev) => {
        const updated = prev.map((i) => {
          if (i.id === existingInitiative.id) {
            const currentProjects = i.keyProjects || [];
            if (!currentProjects.includes(payload.kpi!.keyProject!)) {
              return { ...i, keyProjects: [...currentProjects, payload.kpi!.keyProject!] };
            }
          }
          return i;
        });
        sessionStorage.setItem('eda_initiatives', JSON.stringify(updated));
        return updated;
      });
    }

    if (newKpi) {
      setKpis((prev) => {
        const updated = [...prev, newKpi!];
        sessionStorage.setItem('eda_kpis', JSON.stringify(updated));
        return updated;
      });
    }

    toast.success(`Strategy Updated Successfully`, {
      description: `Aligned under ${themeTitle} ➔ ${objTitle}`,
    });

    return { themeId, goalId, objectiveId };
  };

  const cascadeStrategy = (payload: {
    themeId: string;
    goalIds: string[];
    objectiveIds: string[];
    kpiIds: string[];
    initiativeIds: string[];
  }) => {
    const targetTheme = themes.find((t) => t.id === payload.themeId);
    const themeTitle = targetTheme ? targetTheme.title : 'Strategic Theme';
    const themeCode = targetTheme ? targetTheme.code : '01';

    // 1. Align selected goals
    if (payload.goalIds && payload.goalIds.length > 0) {
      setGoals((prev) => {
        const updated = prev.map((g) =>
          payload.goalIds.includes(g.id) ? { ...g, themeId: payload.themeId } : g
        );
        sessionStorage.setItem('eda_goals', JSON.stringify(updated));
        return updated;
      });
    }

    // 2. Align selected objectives
    if (payload.objectiveIds && payload.objectiveIds.length > 0) {
      setObjectives((prev) => {
        const updated = prev.map((o) => {
          if (payload.objectiveIds.includes(o.id)) {
            return {
              ...o,
              themeId: payload.themeId,
              themeName: themeTitle,
              goalId: payload.goalIds[0] || o.goalId,
            };
          }
          return o;
        });
        sessionStorage.setItem('eda_objectives', JSON.stringify(updated));
        return updated;
      });
    }

    // 3. Align selected KPIs
    if (payload.kpiIds && payload.kpiIds.length > 0) {
      const firstObj = objectives.find((o) => payload.objectiveIds.includes(o.id));
      const firstInit = initiatives.find((i) => payload.initiativeIds.includes(i.id));

      setKpis((prev) => {
        const updated = prev.map((k) => {
          if (payload.kpiIds.includes(k.id)) {
            return {
              ...k,
              pillarCode: themeCode,
              pillarTitle: themeTitle,
              objectiveId: firstObj ? firstObj.id : k.objectiveId,
              objectiveTitle: firstObj ? firstObj.title : k.objectiveTitle,
              strategicInitiative: firstInit ? firstInit.title : (k.strategicInitiative || ''),
              keyProject: firstInit?.keyProjects?.[0] || k.keyProject,
              keyMilestone: firstInit?.milestones?.[0]?.title || k.keyMilestone,
            };
          }
          return k;
        });
        sessionStorage.setItem('eda_kpis', JSON.stringify(updated));
        return updated;
      });
    }

    // 4. Align selected initiatives
    if (payload.initiativeIds && payload.initiativeIds.length > 0) {
      const firstObj = objectives.find((o) => payload.objectiveIds.includes(o.id));
      if (firstObj) {
        setInitiatives((prev) => {
          const updated = prev.map((i) => {
            if (payload.initiativeIds.includes(i.id)) {
              return {
                ...i,
                objectiveId: firstObj.id,
                objectiveTitle: firstObj.title,
              };
            }
            return i;
          });
          sessionStorage.setItem('eda_initiatives', JSON.stringify(updated));
          return updated;
        });
      }
    }

    toast.success(
      lang === 'ar' ? 'تم حفظ ومواءمة الاستراتيجية بنجاح' : 'Strategy Cascaded Successfully',
      {
        description:
          lang === 'ar'
            ? `تم ربط ${payload.goalIds.length} أهداف و ${payload.objectiveIds.length} مستهدفات و ${payload.kpiIds.length} مؤشرات و ${payload.initiativeIds.length} مبادرات`
            : `Cascaded ${payload.goalIds.length} Goals, ${payload.objectiveIds.length} Objectives, ${payload.kpiIds.length} KPIs, ${payload.initiativeIds.length} Initiatives`,
      }
    );
  };

  const addStrategyTheme = (themeData: Omit<StrategicTheme, 'id'>): StrategicTheme => {
    const newTheme: StrategicTheme = {
      ...themeData,
      id: `theme-${Date.now()}`,
      isCustom: true,
    };
    setThemes((prev) => {
      const updated = [...prev, newTheme];
      saveStorageState('eda_themes', updated);
      return updated;
    });
    toast.success(
      lang === 'ar'
        ? `تم إنشاء الركيزة الاستراتيجية "${newTheme.titleAr || newTheme.title}"`
        : `Created Strategic Pillar "${newTheme.title}"`
    );
    return newTheme;
  };

  const updateStrategyTheme = (id: string, updates: Partial<StrategicTheme>) => {
    setThemes((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, ...updates } : t));
      saveStorageState('eda_themes', updated);
      return updated;
    });
    toast.success(lang === 'ar' ? 'تم تحديث الركيزة الاستراتيجية' : 'Strategic Pillar Updated');
  };

  const addGoal = (goalData: Omit<StrategicGoal, 'id'>): StrategicGoal => {
    const newGoal: StrategicGoal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      isCustom: true,
    };
    setGoals((prev) => {
      const updated = [...prev, newGoal];
      saveStorageState('eda_goals', updated);
      return updated;
    });
    toast.success(
      lang === 'ar'
        ? `تم إنشاء الهدف الاستراتيجي "${newGoal.titleAr || newGoal.title}"`
        : `Created Strategic Goal "${newGoal.title}"`
    );
    return newGoal;
  };

  const updateGoal = (id: string, updates: Partial<StrategicGoal>) => {
    setGoals((prev) => {
      const updated = prev.map((g) => (g.id === id ? { ...g, ...updates } : g));
      saveStorageState('eda_goals', updated);
      return updated;
    });
    toast.success(lang === 'ar' ? 'تم تحديث الهدف الاستراتيجي' : 'Strategic Goal Updated');
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      saveStorageState('eda_goals', updated);
      return updated;
    });
    setObjectives((prev) => {
      const updated = prev.filter((o) => o.goalId !== id);
      saveStorageState('eda_objectives', updated);
      return updated;
    });
    toast.info(lang === 'ar' ? 'تم حذف الهدف الاستراتيجي' : 'Strategic Goal Removed');
  };

  const deleteStrategyTheme = (themeId: string) => {
    setThemes((prev) => {
      const updated = prev.filter((t) => t.id !== themeId);
      saveStorageState('eda_themes', updated);
      return updated;
    });

    const goalsToRemove = goals.filter((g) => g.themeId === themeId).map((g) => g.id);
    setGoals((prev) => {
      const updated = prev.filter((g) => g.themeId !== themeId);
      saveStorageState('eda_goals', updated);
      return updated;
    });

    const objsToRemove = objectives.filter((o) => o.themeId === themeId).map((o) => o.id);
    setObjectives((prev) => {
      const updated = prev.filter((o) => o.themeId !== themeId);
      saveStorageState('eda_objectives', updated);
      return updated;
    });

    setKpis((prev) => {
      const updated = prev.filter((k) => !objsToRemove.includes(k.objectiveId));
      saveStorageState('eda_kpis', updated);
      return updated;
    });

    setInitiatives((prev) => {
      const updated = prev.filter((i) => !objsToRemove.includes(i.objectiveId));
      saveStorageState('eda_initiatives', updated);
      return updated;
    });

    toast.info('Strategy Theme Removed', {
      description: 'The selected strategic theme and its nested objectives have been removed.',
    });
  };

  const resetStrategies = () => {
    setThemes(initialThemes);
    setGoals(initialGoals);
    setObjectives(initialObjectives);
    setInitiatives(initialInitiatives);
    setKpis(initialKpis);
    saveStorageState('eda_themes', initialThemes);
    saveStorageState('eda_goals', initialGoals);
    saveStorageState('eda_objectives', initialObjectives);
    saveStorageState('eda_initiatives', initialInitiatives);
    saveStorageState('eda_kpis', initialKpis);
    toast.success('Strategy Architecture Reset', {
      description: 'Restored baseline enterprise strategic pillars and OKRs.',
    });
  };

  const exportAllDataAsJson = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      organization,
      departments,
      users,
      themes,
      goals,
      objectives,
      kpis,
      initiatives,
      risks,
      strategyPlan,
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enterprise_strategy_data_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(lang === 'ar' ? 'تم تصدير ملف بيانات المنظومة بنجاح' : 'Demo Data JSON Exported Successfully');
  };

  const resetAllDataToDefaults = () => {
    localStorage.clear();
    sessionStorage.clear();
    setThemes(initialThemes);
    setGoals(initialGoals);
    setObjectives(initialObjectives);
    setInitiatives(initialInitiatives);
    setKpis(initialKpis);
    setUsers(MOCK_USERS);
    setDepartments(initialDepartments);
    setOrganization(defaultOrgConfig);
    setRisks(initialRisks);
    setStrategyPlan(DEFAULT_STRATEGY_PLAN);
    toast.success(lang === 'ar' ? 'تمت استعادة كافة البيانات الافتراضية' : 'All Demo Data Reset to Defaults');
  };

  const updateObjective = (id: string, updates: Partial<StrategicObjective>, note?: string) => {
    setObjectives((prev) => {
      const updated = prev.map((obj) => {
        if (obj.id === id) {
          return { ...obj, ...updates };
        }
        return obj;
      });
      saveStorageState('eda_objectives', updated);
      return updated;
    });

    if (note) {
      toast.success('Strategic Check-in Recorded', {
        description: note,
      });
    } else {
      toast.success('Strategic Objective Updated');
    }
  };

  const toggleMilestone = (initiativeId: string, milestoneId: string) => {
    setInitiatives((prev) => {
      const updated = prev.map((init) => {
        if (init.id === initiativeId) {
          const updatedMilestones = (init.milestones || []).map((m) => {
            if (m.id === milestoneId) {
              const newStatus: 'Completed' | 'In Progress' = m.status === 'Completed' ? 'In Progress' : 'Completed';
              return { ...m, status: newStatus };
            }
            return m;
          });
          const completedCount = updatedMilestones.filter((m) => m.status === 'Completed').length;
          const progress = updatedMilestones.length > 0 ? Math.round((completedCount / updatedMilestones.length) * 100) : init.progress;
          return { ...init, milestones: updatedMilestones, progress };
        }
        return init;
      });
      saveStorageState('eda_initiatives', updated);
      return updated;
    });
    toast.success('Deliverable Milestone Status Updated');
  };

  const importStrategyData = (data: {
    themes?: StrategicTheme[];
    goals?: StrategicGoal[];
    objectives?: StrategicObjective[];
    initiatives?: StrategicInitiative[];
    kpis?: KPI[];
  }) => {
    let themesCount = 0;
    let goalsCount = 0;
    let objectivesCount = 0;
    let kpisCount = 0;
    let initiativesCount = 0;

    if (data.themes && data.themes.length > 0) {
      const formattedThemes = data.themes.map((t, idx) => ({
        ...t,
        id: t.id || `st-imp-${Date.now()}-${idx}`,
        code: t.code || `ST-IMP-${idx + 1}`,
        isCustom: true,
      }));
      themesCount = formattedThemes.length;
      setThemes((prev) => {
        const existingIds = new Set(formattedThemes.map((t) => t.id));
        const updated = [...prev.filter((t) => !existingIds.has(t.id)), ...formattedThemes];
        sessionStorage.setItem('eda_themes', JSON.stringify(updated));
        return updated;
      });
    }

    if (data.goals && data.goals.length > 0) {
      const formattedGoals = data.goals.map((g, idx) => ({
        ...g,
        id: g.id || `sg-imp-${Date.now()}-${idx}`,
        code: g.code || `SG-IMP-${idx + 1}`,
        isCustom: true,
      }));
      goalsCount = formattedGoals.length;
      setGoals((prev) => {
        const existingIds = new Set(formattedGoals.map((g) => g.id));
        const updated = [...prev.filter((g) => !existingIds.has(g.id)), ...formattedGoals];
        sessionStorage.setItem('eda_goals', JSON.stringify(updated));
        return updated;
      });
    }

    if (data.objectives && data.objectives.length > 0) {
      const formattedObjectives = data.objectives.map((o, idx) => ({
        ...o,
        id: o.id || `so-imp-${Date.now()}-${idx}`,
        code: o.code || `OBJ-IMP-${idx + 1}`,
        isCustom: true,
      }));
      objectivesCount = formattedObjectives.length;
      setObjectives((prev) => {
        const existingIds = new Set(formattedObjectives.map((o) => o.id));
        const updated = [...prev.filter((o) => !existingIds.has(o.id)), ...formattedObjectives];
        sessionStorage.setItem('eda_objectives', JSON.stringify(updated));
        return updated;
      });
    }

    if (data.kpis && data.kpis.length > 0) {
      const formattedKpis = data.kpis.map((k, idx) => ({
        ...k,
        id: k.id || `kpi-imp-${Date.now()}-${idx}`,
        code: k.code || `KPI-IMP-${idx + 1}`,
        isCustom: true,
      }));
      kpisCount = formattedKpis.length;
      setKpis((prev) => {
        const existingIds = new Set(formattedKpis.map((k) => k.id));
        const updated = [...prev.filter((k) => !existingIds.has(k.id)), ...formattedKpis];
        sessionStorage.setItem('eda_kpis', JSON.stringify(updated));
        return updated;
      });
    }

    if (data.initiatives && data.initiatives.length > 0) {
      const formattedInitiatives = data.initiatives.map((i, idx) => ({
        ...i,
        id: i.id || `init-imp-${Date.now()}-${idx}`,
        code: i.code || `INIT-IMP-${idx + 1}`,
        isCustom: true,
      }));
      initiativesCount = formattedInitiatives.length;
      setInitiatives((prev) => {
        const existingIds = new Set(formattedInitiatives.map((i) => i.id));
        const updated = [...prev.filter((i) => !existingIds.has(i.id)), ...formattedInitiatives];
        sessionStorage.setItem('eda_initiatives', JSON.stringify(updated));
        return updated;
      });
    }

    toast.success('Strategy Data Imported Successfully', {
      description: `Imported ${themesCount} pillars, ${objectivesCount} objectives, ${kpisCount} KPIs into Strategy Architecture.`,
    });

    return { themesCount, objectivesCount, kpisCount, initiativesCount };
  };

  const openModal = (type: ModalConfig['type'], item?: any) => {
    setActiveModal({ type, item });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        currentUser,
        switchUserRole,
        permissions,
        lang,
        dir: lang === 'ar' ? 'rtl' : 'ltr',
        toggleLanguage,
        setLanguage,
        t: tHelper,
        sidebarCollapsed,
        setSidebarCollapsed,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        notifications,
        markNotificationRead,
        risks,
        addRisk,
        updateRiskStatus,
        importRisks,
        themes,
        addStrategyTheme,
        updateStrategyTheme,
        deleteStrategyTheme,
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        objectives,
        addObjective,
        updateObjective,
        deleteObjective,
        initiatives,
        addInitiative,
        updateInitiative,
        deleteInitiative,
        kpis,
        addKPI,
        updateKPI,
        deleteKPI,
        strategyPlan,
        updateStrategyPlan,
        cascadeStrategy,
        addStrategy,
        resetStrategies,
        toggleMilestone,
        importStrategyData,
        importKpiActuals,
        exportAllDataAsJson,
        resetAllDataToDefaults,
        actions,
        addAction,
        updateActionStatus,
        tasks,
        addTask,
        updateTaskColumn,
        documents,
        addDocument,
        importDocuments,
        users,
        addUser,
        updateUser,
        updateUserRole,
        deleteUser,
        importUsers,
        bcmProcesses,
        bcmPlans,
        sectors: AUTHORITY_SECTORS,
        departments,
        deleteDepartment,
        organization,
        updateOrganization,
        addDepartment,
        updateDepartment,
        demoJourneyStep,
        setDemoJourneyStep,
        isDemoJourneyActive,
        setIsDemoJourneyActive,
        activeModal,
        openModal,
        closeModal,
        selectedFilter,
        setSelectedFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
