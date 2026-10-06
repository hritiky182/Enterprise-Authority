import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { STRATEGY_SPECIALIST_USER } from '../data/mockData';
import {
  Building2,
  ShieldCheck,
  Lock,
  Mail,
  Key,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Target,
  Layers,
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import { Role, User } from '../types';
import { OrganizationLogo } from '../components/common/OrganizationLogo';

export const LoginPage: React.FC = () => {
  const { login, lang, setLanguage, t, organization } = useApp();
  const navigate = useNavigate();

  const [selectedRole] = useState<Role>('Strategy Specialist');
  const [email, setEmail] = useState(STRATEGY_SPECIALIST_USER.email);
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const matchedUser: User = STRATEGY_SPECIALIST_USER;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userToLogin: User = {
      ...STRATEGY_SPECIALIST_USER,
      email,
    };
    login(userToLogin);
    // Directly launch into the 5-step specialist journey starting with Organization Setup
    navigate('/organization/setup');
  };

  const journeySteps = [
    {
      step: '01',
      title: lang === 'ar' ? 'تسجيل الدخول كـ أخصائي استراتيجية' : 'Strategy Specialist Login',
      desc: lang === 'ar' ? 'صلاحيات كاملة لصياغة الاستراتيجية والمؤشرات' : 'Authenticated RBAC role for strategy architecture',
      icon: <Lock className="w-3.5 h-3.5 text-blue-400" />,
      active: true,
    },
    {
      step: '02',
      title: lang === 'ar' ? 'تعريف هوية المنظومة' : 'Define Organization & Branding',
      desc: lang === 'ar' ? 'الاسم، الشعار، الألوان، الرؤية، والرسالة' : 'Name, emblem logo, colors, vision & mission',
      icon: <Building2 className="w-3.5 h-3.5 text-emerald-400" />,
      active: false,
    },
    {
      step: '03',
      title: lang === 'ar' ? 'التخطيط الاستراتيجي' : 'Strategy Planning',
      desc: lang === 'ar' ? 'اسم الاستراتيجية، المدى الزمني، والبيان' : 'Strategy Name, Duration, and Executive Statement',
      icon: <Target className="w-3.5 h-3.5 text-amber-400" />,
      active: false,
    },
    {
      step: '04',
      title: lang === 'ar' ? 'مواءمة المكونات' : 'Define & Link Components',
      desc: lang === 'ar' ? 'الركائز ➔ الأهداف ➔ المؤشرات ➔ المبادرات' : 'Pillars ➔ Objectives ➔ KPIs ➔ Initiatives',
      icon: <Layers className="w-3.5 h-3.5 text-indigo-400" />,
      active: false,
    },
    {
      step: '05',
      title: lang === 'ar' ? 'متابعة الأداء والتصدير' : 'Performance Monitoring & Reports',
      desc: lang === 'ar' ? 'بطاقة الأداء المتوازن وتصدير تقرير PDF و Excel' : 'Scorecards, PDF Dossier & Excel export',
      icon: <TrendingUp className="w-3.5 h-3.5 text-teal-400" />,
      active: false,
    },
  ];

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-blue-900 selection:text-white"
    >
      {/* Deep Executive Navy Background Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-950/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-slate-900/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-950/30 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <OrganizationLogo logoId={organization.logo} logoUrl={organization.logoUrl} size="md" />
          <div>
            <h1 className="text-sm font-bold tracking-wider text-white uppercase leading-none font-sans">
              {lang === 'ar' ? (organization.nameAr || organization.name) : organization.name}
            </h1>
            <span className="text-[10px] text-blue-300/80 font-mono tracking-widest block uppercase mt-0.5">
              {organization.shortCode || organization.shortName || 'AHDA'} • {t('GRC & Strategy Suite', 'GRC & Strategy Suite')}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6 text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>{t('ISO 31000 & 27001 COMPLIANT')}</span>
            </div>
            <span className="text-slate-800">|</span>
            <span className="px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/40 text-blue-300 font-semibold">
              {t('V3.4 ENTERPRISE')}
            </span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/90 p-0.5 text-xs shadow-md font-semibold">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-mono ${
                lang === 'en'
                  ? 'bg-blue-900 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-sans ${
                lang === 'ar'
                  ? 'bg-blue-900 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </header>

      {/* Main Login Body */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-4 py-8 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Column: Platform Identity & Demo Flow */}
        <div className="flex-1 space-y-5 max-w-xl text-center lg:text-start">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'ar' ? 'رحلة أخصائي الاستراتيجية • العرض التفاعلي' : 'STRATEGY SPECIALIST WORKFLOW DEMO'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {lang === 'ar'
              ? 'المنظومة المؤسسية لإدارة الاستراتيجية والأداء'
              : 'Institutional Strategy, Planning & Performance Suite'}
          </h2>

          <p className="text-xs text-slate-400 leading-relaxed">
            {lang === 'ar'
              ? 'بوابة موحدة لإعداد هوية الهيئة، صياغة الاستراتيجية (الاسم والمدى والبيان)، مواءمة الركائز والمستهدفات والمؤشرات والمبادرات، ومتابعة الأداء مع التصدير التنفيذي.'
              : 'Unified SaaS platform empowering Strategy Specialists to configure institutional branding, define strategy horizons, cascade objectives to KPIs, and generate executive dossiers.'}
          </p>

          {/* Single Strategy Specialist Persona Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/60 border border-blue-800/60 shadow-lg text-start">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold bg-blue-900/50 px-2 py-0.5 rounded-full border border-blue-700/50">
                {lang === 'ar' ? 'الدور المعتمد للدخول' : 'Designated Demo Persona'}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'صلاحيات كاملة للاستراتيجية' : 'Full Strategy RBAC'}</span>
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src={matchedUser.avatar}
                alt={matchedUser.name}
                className="w-12 h-12 rounded-xl object-cover border-2 border-blue-500/60 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white truncate">
                    {lang === 'ar' ? matchedUser.nameAr || matchedUser.name : matchedUser.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                    {t('Strategy Specialist')}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 truncate">
                  {lang === 'ar' ? matchedUser.titleAr || matchedUser.title : matchedUser.title}
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                  {lang === 'ar' ? matchedUser.departmentAr || matchedUser.department : matchedUser.department} • {matchedUser.email}
                </p>
              </div>
            </div>
          </div>

          {/* 5-Phase End-to-End Specialist Workflow */}
          <div className="space-y-2 pt-1 text-start">
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
              {lang === 'ar' ? 'مسار العمل المتكامل لأخصائي الاستراتيجية:' : 'End-to-End Strategy Specialist Flow:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {journeySteps.map((step, idx) => (
                <div
                  key={step.step}
                  className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all ${
                    idx === 0
                      ? 'bg-blue-950/60 border-blue-700/80 shadow-sm ring-1 ring-blue-600/40'
                      : 'bg-slate-900/50 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{step.step}</span>
                    {step.icon}
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white line-clamp-1">{step.title}</h5>
                    <p className="text-[9px] text-slate-400 line-clamp-2 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Glassmorphism Login Form */}
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                <span>{lang === 'ar' ? 'تسجيل دخول المنظومة' : 'Enterprise Sign In'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t('Active Persona:')}{' '}
                <span className="text-blue-300 font-semibold">{t('Strategy Specialist')}</span> ({matchedUser.name})
              </p>
            </div>
            <OrganizationLogo logoId={organization.logo} logoUrl={organization.logoUrl} size="sm" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-300">{t('Enterprise Work Email')}</label>
              <div className="relative">
                <Mail
                  className={`w-4 h-4 absolute ${
                    lang === 'ar' ? 'right-3.5' : 'left-3.5'
                  } top-1/2 -translate-y-1/2 text-slate-500`}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full ${
                    lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'
                  } py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all font-mono`}
                  placeholder="name@enterprise.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-slate-300">{t('Password')}</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-blue-400 hover:underline">
                  {t('Forgot Password?')}
                </a>
              </div>
              <div className="relative">
                <Key
                  className={`w-4 h-4 absolute ${
                    lang === 'ar' ? 'right-3.5' : 'left-3.5'
                  } top-1/2 -translate-y-1/2 text-slate-500`}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full ${
                    lang === 'ar' ? 'pr-10 pl-10' : 'pl-10 pr-10'
                  } py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all font-mono`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${
                    lang === 'ar' ? 'left-3.5' : 'right-3.5'
                  } top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-blue-800 focus:ring-blue-800 focus:ring-offset-slate-900"
                />
                <span>{t('Remember session credentials')}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold text-xs border border-blue-700/50 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <span>
                {lang === 'ar'
                  ? 'تسجيل الدخول كـ أخصائي استراتيجية والانطلاق'
                  : 'Sign In as Strategy Specialist & Begin Journey'}
              </span>
              <ArrowRight
                className={`w-4 h-4 group-hover:translate-x-0.5 transition-transform ${
                  lang === 'ar' ? 'rotate-180' : ''
                }`}
              />
            </button>
          </form>

          {/* Role Access Security Notice */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-semibold block">
                {t('Strategy Specialist')} - {t('Permissions', 'Permissions')}
              </span>
              <span>{t(matchedUser.department)} • {t('Active RBAC Session Authorization')}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-6 py-4 text-center text-xs font-mono text-slate-500 border-t border-slate-900/80">
        {t('Enterprise Strategy & Governance Suite • Interactive Enterprise Demonstration')}
      </footer>
    </div>
  );
};
