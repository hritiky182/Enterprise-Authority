import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  User,
  Role,
  Sector,
  RiskItem,
  StrategicTheme,
  StrategicGoal,
  StrategicObjective,
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
  CURRENT_USER,
  MOCK_USERS,
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

export interface StrategyKpiInput {
  id?: string | undefined;
  code?: string | undefined;
  name: string;
  nameAr?: string | undefined;
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
}

export interface StrategyInitiativeInput {
  id?: string | undefined;
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
    id?: string | undefined;
    title: string;
    dueDate: string;
    status?: 'Completed' | 'In Progress' | 'Pending';
  }[] | undefined;
  keyProjects?: string[] | undefined;
}

export interface StrategyObjectiveInput {
  id?: string | undefined;
  code?: string | undefined;
  title: string;
  titleAr?: string | undefined;
  owner?: string | undefined;
  department?: string | undefined;
  sectorId?: string | undefined;
  sectorName?: string | undefined;
  targetYear?: number | undefined;
  progress?: number | undefined;
  status?: 'on-track' | 'at-risk' | 'behind' | 'achieved' | undefined;
  kpis?: StrategyKpiInput[] | undefined;
  initiatives?: StrategyInitiativeInput[] | undefined;
}

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
  goal?: {
    code?: string | undefined;
    title: string;
    description?: string | undefined;
  };
  // Multiple objectives array
  objectives?: StrategyObjectiveInput[] | undefined;
  // Backward compatibility fields
  objective?: StrategyObjectiveInput | undefined;
  kpi?: StrategyKpiInput | undefined;
  initiative?: StrategyInitiativeInput | undefined;
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
  objectives: StrategicObjective[];
  initiatives: StrategicInitiative[];
  kpis: KPI[];
  addStrategy: (payload: CreateStrategyPayload) => { themeId: string; goalId: string; objectiveId: string };
  addKPI: (kpi: Omit<KPI, 'id'>) => KPI;
  addInitiative: (init: Omit<StrategicInitiative, 'id'>) => StrategicInitiative;
  deleteStrategyTheme: (themeId: string) => void;
  resetStrategies: () => void;
  updateObjective: (id: string, updates: Partial<StrategicObjective>, note?: string) => void;
  toggleMilestone: (initiativeId: string, milestoneId: string) => void;
  importStrategyData: (data: {
    themes?: StrategicTheme[];
    goals?: StrategicGoal[];
    objectives?: StrategicObjective[];
    initiatives?: StrategicInitiative[];
    kpis?: KPI[];
  }) => { themesCount: number; objectivesCount: number; kpisCount: number; initiativesCount: number };
  
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
  importUsers: (newUsers: Partial<User>[]) => number;

  bcmProcesses: BCMProcess[];
  bcmPlans: BCMPlan[];
  
  // Organization Structure & Client Metadata
  sectors: Sector[];
  organization: typeof ORGANIZATION_INFO;
  
  // Modal / Drawer State
  activeModal: ModalConfig | null;
  openModal: (type: ModalConfig['type'], item?: any) => void;
  closeModal: () => void;

  // Filter criteria for navigation cross-linking
  selectedFilter: { category?: string; status?: string; department?: string } | null;
  setSelectedFilter: (filter: { category?: string; status?: string; department?: string } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('eda_auth') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser = sessionStorage.getItem('eda_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.role && (parsed.role === 'Authority Board & CEO' || ROLE_PERMISSIONS_MAP[parsed.role as Role])) {
          return parsed;
        }
      } catch (e) {
        return CURRENT_USER;
      }
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
    const saved = sessionStorage.getItem('eda_risks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        /* fallback */
      }
    }
    return initialRisks;
  });
  
  const [themes, setThemes] = useState<StrategicTheme[]>(() => {
    const saved = sessionStorage.getItem('eda_themes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((t: any) => t.title?.includes('People and Society') || t.id === 'st-people')) {
          return parsed;
        }
      } catch (e) {
        /* fallback */
      }
    }
    return initialThemes;
  });

  const [goals, setGoals] = useState<StrategicGoal[]>(() => {
    const saved = sessionStorage.getItem('eda_goals');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((g: any) => g.id === 'sg-people-1' || g.title?.includes('Community Participation'))) {
          return parsed;
        }
      } catch (e) {
        /* fallback */
      }
    }
    return initialGoals;
  });

  const [objectives, setObjectives] = useState<StrategicObjective[]>(() => {
    const saved = sessionStorage.getItem('eda_objectives');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((o: any) => o.code === '2.1' || o.id === 'so-2-1')) {
          return parsed;
        }
      } catch (e) {
        /* fallback */
      }
    }
    return initialObjectives;
  });

  const [initiatives, setInitiatives] = useState<StrategicInitiative[]>(() => {
    const saved = sessionStorage.getItem('eda_initiatives');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((i: any) => i.id === 'init-aha-1' || i.code?.includes('AHA'))) {
          return parsed;
        }
      } catch (e) {
        /* fallback */
      }
    }
    return initialInitiatives;
  });

  const [kpis, setKpis] = useState<KPI[]>(() => {
    const saved = sessionStorage.getItem('eda_kpis');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((k: any) => k.code === '2.1.1' || k.id === 'kpi-2-1-1')) {
          return parsed;
        }
      } catch (e) {
        /* fallback */
      }
    }
    return initialKpis;
  });

  const [actions, setActions] = useState<ActionItem[]>(initialActions);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = sessionStorage.getItem('eda_documents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        /* fallback */
      }
    }
    return initialDocuments;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = sessionStorage.getItem('eda_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((u: any) => u.role === 'Authority Board & CEO' || u.id === 'usr-106')) {
          return parsed;
        }
      } catch (e) {
        /* fallback */
      }
    }
    return MOCK_USERS;
  });

  const [bcmProcesses] = useState<BCMProcess[]>(initialBcmProcesses);
  const [bcmPlans] = useState<BCMPlan[]>(initialBcmPlans);

  // Modals & Drawers
  const [activeModal, setActiveModal] = useState<ModalConfig | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<{ category?: string; status?: string; department?: string } | null>(null);

  const permissions = ROLE_PERMISSIONS_MAP[currentUser.role] || ROLE_PERMISSIONS_MAP['Viewer'];

  const login = (userToLogin?: User) => {
    const userToSet = userToLogin || currentUser;
    setCurrentUser(userToSet);
    setIsAuthenticated(true);
    sessionStorage.setItem('eda_auth', 'true');
    sessionStorage.setItem('eda_user', JSON.stringify(userToSet));
    toast.success('Signed in successfully', {
      description: `Welcome back, ${userToSet.name}`,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('eda_auth');
    sessionStorage.removeItem('eda_user');
    toast.info('Signed out of Enterprise Platform');
  };

  const switchUserRole = (role: Role) => {
    const matchedUser = MOCK_USERS.find((u) => u.role === role) || {
      ...currentUser,
      role,
      title: `${role} Officer`,
    };
    setCurrentUser(matchedUser);
    sessionStorage.setItem('eda_user', JSON.stringify(matchedUser));
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
      sessionStorage.setItem('eda_kpis', JSON.stringify(updated));
      return updated;
    });

    setObjectives((prev) => {
      const updated = prev.map((o) =>
        o.id === newKpiData.objectiveId ? { ...o, kpiCount: (o.kpiCount || 0) + 1 } : o
      );
      sessionStorage.setItem('eda_objectives', JSON.stringify(updated));
      return updated;
    });

    toast.success(`KPI "${createdKpi.code} ${createdKpi.name}" Created`, {
      description: 'Added to live Strategy Matrix and OKR register.',
    });
    return createdKpi;
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
      sessionStorage.setItem('eda_initiatives', JSON.stringify(updated));
      return updated;
    });

    toast.success(`Initiative "${createdInit.title}" Created`, {
      description: 'Added to strategic delivery roadmap.',
    });
    return createdInit;
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
    let goalCode = existingGoal ? existingGoal.code : (payload.goal?.code?.trim() || `SG-${nextThemeNum}.1`);
    let goalTitle = existingGoal ? existingGoal.title : (payload.goal?.title || 'Primary Strategic Goal');

    let newGoal: StrategicGoal | null = null;
    if (!existingGoal) {
      newGoal = {
        id: goalId,
        code: goalCode,
        themeId,
        title: goalTitle,
        description: payload.goal?.description || '',
        isCustom: true,
      };
    }

    // 3. Normalize Objectives List (Supports single objective or array of multiple objectives)
    let objectivesList: StrategyObjectiveInput[] = [];
    if (payload.objectives && payload.objectives.length > 0) {
      objectivesList = payload.objectives;
    } else if (payload.objective && payload.objective.title?.trim()) {
      objectivesList = [
        {
          ...payload.objective,
          kpis: payload.kpi ? [payload.kpi] : [],
          initiatives: payload.initiative ? [payload.initiative] : [],
        },
      ];
    } else if (payload.selectedObjectiveId) {
      const exist = objectives.find((o) => o.id === payload.selectedObjectiveId);
      if (exist) {
        objectivesList = [
          {
            id: exist.id,
            code: exist.code,
            title: exist.title,
            owner: exist.owner,
            department: exist.department,
            sectorId: exist.sectorId,
            sectorName: exist.sectorName,
            status: exist.status,
            targetYear: exist.targetYear,
            progress: exist.progress,
            kpis: payload.kpi ? [payload.kpi] : [],
            initiatives: payload.initiative ? [payload.initiative] : [],
          },
        ];
      }
    }

    const newObjectivesToInsert: StrategicObjective[] = [];
    const newKpisToInsert: KPI[] = [];
    const newInitiativesToInsert: StrategicInitiative[] = [];
    const updatedObjectiveIds: string[] = [];

    objectivesList.forEach((objInput, objIdx) => {
      const existingObj = objInput.id ? objectives.find((o) => o.id === objInput.id) : null;
      const objId = existingObj ? existingObj.id : (objInput.id || `so-${Date.now()}-${objIdx}`);
      const objCode = existingObj ? existingObj.code : (objInput.code?.trim() || `OBJ-${nextThemeNum}.${objIdx + 1}`);
      const objTitle = existingObj ? existingObj.title : objInput.title;
      updatedObjectiveIds.push(objId);

      const kpisCount = objInput.kpis?.length || 0;

      if (!existingObj) {
        newObjectivesToInsert.push({
          id: objId,
          code: objCode,
          goalId,
          themeId,
          themeName: themeTitle,
          title: objTitle,
          owner: objInput.owner || currentUser.name,
          department: objInput.department || currentUser.department,
          kpiCount: kpisCount,
          status: objInput.status || 'on-track',
          targetYear: Number(objInput.targetYear) || 2027,
          progress: Number(objInput.progress) || 15,
          isCustom: true,
          ...(objInput.titleAr ? { titleAr: objInput.titleAr } : {}),
          ...(objInput.sectorId ? { sectorId: objInput.sectorId } : {}),
          ...(objInput.sectorName ? { sectorName: objInput.sectorName } : {}),
        });
      }

      // KPIs under this objective
      if (objInput.kpis && objInput.kpis.length > 0) {
        objInput.kpis.forEach((kpiInput, kpiIdx) => {
          if (!kpiInput.name?.trim()) return;
          const kCode = kpiInput.code?.trim() || `${objCode}.${kpiIdx + 1}`;
          const targetVal = Number(kpiInput.target) || 100;
          const actualVal = Number(kpiInput.actual) || 0;
          const achievement = targetVal > 0 ? Math.min(100, Math.round((actualVal / targetVal) * 100)) : 0;
          const pCode = kpiInput.pillarCode || themeCode || '02';
          const pTitle = kpiInput.pillarTitle || themeTitle;

          newKpisToInsert.push({
            id: kpiInput.id || `kpi-${Date.now()}-${objIdx}-${kpiIdx}`,
            code: kCode,
            objectiveId: objId,
            objectiveTitle: objTitle,
            name: kpiInput.name,
            nameAr: kpiInput.nameAr,
            unit: kpiInput.unit || '%',
            owner: objInput.owner || currentUser.name,
            target: targetVal,
            actual: actualVal,
            achievementPct: achievement,
            frequency: kpiInput.frequency || 'Quarterly',
            status: kpiInput.status || 'on-track',
            formula: kpiInput.formula || '',
            baseline: kpiInput.baseline !== undefined ? kpiInput.baseline : '-',
            target2026: kpiInput.target2026 !== undefined ? kpiInput.target2026 : `${targetVal}${kpiInput.unit || '%'}`,
            target2027: kpiInput.target2027 !== undefined ? kpiInput.target2027 : `${targetVal}${kpiInput.unit || '%'}`,
            strategicInitiative: kpiInput.strategicInitiative || '',
            keyMilestone: kpiInput.keyMilestone || '',
            keyProject: kpiInput.keyProject || '',
            pillarCode: pCode,
            pillarTitle: pTitle,
            sectorId: objInput.sectorId,
            sectorName: objInput.sectorName,
            isCustom: true,
          });
        });
      }

      // Initiatives under this objective
      if (objInput.initiatives && objInput.initiatives.length > 0) {
        objInput.initiatives.forEach((initInput, initIdx) => {
          if (!initInput.title?.trim()) return;
          const initCode = initInput.code?.trim() || `INIT-${objCode}-${initIdx + 1}`;

          newInitiativesToInsert.push({
            id: initInput.id || `init-${Date.now()}-${objIdx}-${initIdx}`,
            code: initCode,
            objectiveId: objId,
            objectiveTitle: objTitle,
            title: initInput.title,
            description: initInput.description || '',
            owner: initInput.owner || objInput.owner || currentUser.name,
            department: initInput.department || objInput.department || currentUser.department,
            budgetSAR: Number(initInput.budgetSAR) || 5000000,
            spentSAR: Number(initInput.spentSAR) || 500000,
            progress: Number(initInput.progress) || 15,
            startDate: initInput.startDate || '2026-01-01',
            endDate: initInput.endDate || '2027-12-31',
            status: initInput.status || 'Planning',
            milestones: initInput.milestones?.map((m, mIdx) => ({
              id: m.id || `m-${Date.now()}-${objIdx}-${initIdx}-${mIdx}`,
              title: m.title,
              dueDate: m.dueDate,
              status: m.status || 'In Progress',
            })) || [
              {
                id: `m-${Date.now()}-${objIdx}-${initIdx}-1`,
                title: 'Framework & Initial Scope Sign-off',
                dueDate: '2026-10-15',
                status: 'Completed',
              },
            ],
            keyProjects: initInput.keyProjects && initInput.keyProjects.length > 0
              ? initInput.keyProjects
              : ['Regional Strategic Project'],
            risksCount: 1,
            actionsCount: 1,
            isCustom: true,
          });
        });
      }
    });

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

    if (newObjectivesToInsert.length > 0) {
      setObjectives((prev) => {
        const updated = [...prev, ...newObjectivesToInsert];
        sessionStorage.setItem('eda_objectives', JSON.stringify(updated));
        return updated;
      });
    }

    if (newKpisToInsert.length > 0) {
      setKpis((prev) => {
        const updated = [...prev, ...newKpisToInsert];
        sessionStorage.setItem('eda_kpis', JSON.stringify(updated));
        return updated;
      });
    }

    if (newInitiativesToInsert.length > 0) {
      setInitiatives((prev) => {
        const updated = [...prev, ...newInitiativesToInsert];
        sessionStorage.setItem('eda_initiatives', JSON.stringify(updated));
        return updated;
      });
    }

    toast.success(`Strategic Pillar Formulated Successfully`, {
      description: `Aligned under ${themeTitle} with ${objectivesList.length} Objectives, ${newKpisToInsert.length} KPIs, and ${newInitiativesToInsert.length} Initiatives.`,
    });

    return { themeId, goalId, objectiveId: updatedObjectiveIds[0] || '' };
  };

  const deleteStrategyTheme = (themeId: string) => {
    setThemes((prev) => {
      const updated = prev.filter((t) => t.id !== themeId);
      sessionStorage.setItem('eda_themes', JSON.stringify(updated));
      return updated;
    });

    const goalsToRemove = goals.filter((g) => g.themeId === themeId).map((g) => g.id);
    setGoals((prev) => {
      const updated = prev.filter((g) => g.themeId !== themeId);
      sessionStorage.setItem('eda_goals', JSON.stringify(updated));
      return updated;
    });

    const objsToRemove = objectives.filter((o) => o.themeId === themeId).map((o) => o.id);
    setObjectives((prev) => {
      const updated = prev.filter((o) => o.themeId !== themeId);
      sessionStorage.setItem('eda_objectives', JSON.stringify(updated));
      return updated;
    });

    setKpis((prev) => {
      const updated = prev.filter((k) => !objsToRemove.includes(k.objectiveId));
      sessionStorage.setItem('eda_kpis', JSON.stringify(updated));
      return updated;
    });

    setInitiatives((prev) => {
      const updated = prev.filter((i) => !objsToRemove.includes(i.objectiveId));
      sessionStorage.setItem('eda_initiatives', JSON.stringify(updated));
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
    sessionStorage.removeItem('eda_themes');
    sessionStorage.removeItem('eda_goals');
    sessionStorage.removeItem('eda_objectives');
    sessionStorage.removeItem('eda_initiatives');
    sessionStorage.removeItem('eda_kpis');
    toast.success('Strategy Architecture Reset', {
      description: 'Restored baseline enterprise strategic pillars and OKRs.',
    });
  };

  const updateObjective = (id: string, updates: Partial<StrategicObjective>, note?: string) => {
    setObjectives((prev) => {
      const updated = prev.map((obj) => {
        if (obj.id === id) {
          return { ...obj, ...updates };
        }
        return obj;
      });
      sessionStorage.setItem('eda_objectives', JSON.stringify(updated));
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
      sessionStorage.setItem('eda_initiatives', JSON.stringify(updated));
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
        goals,
        objectives,
        initiatives,
        kpis,
        addStrategy,
        addKPI,
        addInitiative,
        deleteStrategyTheme,
        resetStrategies,
        updateObjective,
        toggleMilestone,
        importStrategyData,
        importKpiActuals,
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
        importUsers,
        bcmProcesses,
        bcmPlans,
        sectors: AUTHORITY_SECTORS,
        organization: ORGANIZATION_INFO,
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
