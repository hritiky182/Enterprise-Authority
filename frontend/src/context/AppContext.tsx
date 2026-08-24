import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  User,
  Role,
  RiskItem,
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
  CURRENT_USER,
  MOCK_USERS,
  RISKS as initialRisks,
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

interface ModalConfig {
  type: 'risk' | 'objective' | 'initiative' | 'kpi' | 'compliance' | 'bcm' | 'action' | 'policy' | 'document' | 'create_action' | 'create_risk';
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
  toggleLanguage: () => void;
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
  
  objectives: StrategicObjective[];
  initiatives: StrategicInitiative[];
  kpis: KPI[];
  
  actions: ActionItem[];
  addAction: (action: Omit<ActionItem, 'id' | 'code'>) => void;
  updateActionStatus: (id: string, status: ActionItem['status'], progress: number) => void;
  
  tasks: TaskItem[];
  updateTaskColumn: (taskId: string, column: TaskItem['boardColumn']) => void;
  addTask: (task: Omit<TaskItem, 'id' | 'code'>) => void;

  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id' | 'code'>) => void;

  bcmProcesses: BCMProcess[];
  bcmPlans: BCMPlan[];
  
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
        return JSON.parse(savedUser);
      } catch (e) {
        return CURRENT_USER;
      }
    }
    return CURRENT_USER;
  });

  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  // Entities
  const [risks, setRisks] = useState<RiskItem[]>(initialRisks);
  const [objectives] = useState<StrategicObjective[]>(initialObjectives);
  const [initiatives] = useState<StrategicInitiative[]>(initialInitiatives);
  const [kpis] = useState<KPI[]>(initialKpis);
  const [actions, setActions] = useState<ActionItem[]>(initialActions);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
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

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    setLang(nextLang);
    toast.info(`Language toggled to ${nextLang === 'ar' ? 'Arabic Ready' : 'English'}`);
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

    setRisks((prev) => [newRisk, ...prev]);
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
    setRisks((prev) =>
      prev.map((r) => {
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
      })
    );
    toast.success('Risk Register Updated', {
      description: `Risk status modified to ${status}.`,
    });
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
    setDocuments((prev) => [newDoc, ...prev]);
    toast.success('Document Uploaded', {
      description: `${newDoc.title} added to Repository.`,
    });
    closeModal();
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
        toggleLanguage,
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
        objectives,
        initiatives,
        kpis,
        actions,
        addAction,
        updateActionStatus,
        tasks,
        addTask,
        updateTaskColumn,
        documents,
        addDocument,
        bcmProcesses,
        bcmPlans,
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
