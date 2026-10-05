import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_USERS } from '../data/mockData';
import { Building2, ShieldCheck, Lock, Mail, Key, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { Role, User } from '../types';

export const LoginPage: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<Role>('Authority Board & CEO');
  const [email, setEmail] = useState('a.hassan@ahda.gov.sa');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const matchedUser = (MOCK_USERS.find((u) => u.role === selectedRole) || MOCK_USERS[0]) as User;

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    const user = MOCK_USERS.find((u) => u.role === role);
    if (user) {
      setEmail(user.email);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseUser = (MOCK_USERS.find((u) => u.role === selectedRole) || MOCK_USERS[0]) as User;
    const userToLogin: User = {
      ...baseUser,
      email,
    };
    login(userToLogin);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-blue-900 selection:text-white">
      {/* Deep Executive Navy Background Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-950/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-slate-900/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-950/30 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 flex items-center justify-center text-white shadow-md border border-slate-700/50">
            <Building2 className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-white uppercase leading-none font-sans">
              Enterprise Authority
            </h1>
            <span className="text-[10px] text-blue-300/80 font-mono tracking-widest block uppercase mt-0.5">
              GRC & Strategy Suite
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>ISO 31000 & 27001 COMPLIANT</span>
          </div>
          <span className="text-slate-800">|</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-950/80 border border-blue-800/40 text-blue-300 font-semibold">
            V3.4 ENTERPRISE
          </span>
        </div>
      </header>

      {/* Main Login Body */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-4 py-8 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Column: Platform Identity & Demo Persona Selector */}
        <div className="flex-1 space-y-6 max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>EXECUTIVE DEMONSTRATION PLATFORM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Institutional Strategy, Risk & Governance Suite
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            Unified SaaS control center empowering leadership with real-time OKR progress, ISO 31000 risk matrices, and regulatory compliance audit oversight.
          </p>

          {/* Quick Select Personas */}
          <div className="pt-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 text-left">
              Select Role Persona to Test RBAC Permissions:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {MOCK_USERS.filter((user, index, self) => index === self.findIndex((t) => t.role === user.role)).map((u) => {
                const isSelected = selectedRole === u.role;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleRoleSelect(u.role)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-950/80 border-blue-700 ring-2 ring-blue-700/50 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover border border-blue-400/40" />
                      {isSelected ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      ) : (
                        <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                      )}
                    </div>
                    <div className="text-[11px] font-bold text-white truncate">{u.role}</div>
                    <div className="text-[9px] text-slate-400 truncate">{u.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Glassmorphism Login Form */}
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Enterprise Sign In</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Active Persona: <span className="text-blue-300 font-semibold">{selectedRole}</span> ({matchedUser.name})
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-300">Enterprise Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all font-mono"
                  placeholder="name@enterprise.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-slate-300">Password</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-blue-400 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
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
                <span>Remember session credentials</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold text-xs border border-blue-700/50 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <span>Sign In as {selectedRole}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          {/* Role Access Security Notice */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2.5 font-mono">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-semibold block">{selectedRole} Permissions</span>
              <span>{matchedUser.department} • Active RBAC Session Authorization</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-6 py-4 text-center text-xs font-mono text-slate-500 border-t border-slate-900/80">
        Enterprise Strategy & Governance Suite • Interactive Enterprise Demonstration
      </footer>
    </div>
  );
};
