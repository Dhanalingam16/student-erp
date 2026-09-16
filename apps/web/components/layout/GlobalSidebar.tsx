'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../store/authStore';
import {
  NAV_GROUPS_SCHOOL_ADMIN,
  NAV_SUPER_ADMIN,
  NAV_TEACHER,
  APP_NAME,
  APP_TAGLINE
} from '@school-erp/constants';
import {
  LayoutDashboard, Users, GraduationCap, CalendarCheck, FileSpreadsheet,
  UserPlus, Bus, Building2, BookOpen, HeartPulse, Receipt, Briefcase,
  Megaphone, CalendarDays, Award, BarChart3, Settings, ShieldCheck,
  Sliders, Cpu, Lock, LineChart, CheckSquare, BookCheck, FilePenLine,
  Clock, MessageSquare, Building, Smartphone
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
  CalendarCheck: <CalendarCheck className="w-4 h-4" />,
  FileSpreadsheet: <FileSpreadsheet className="w-4 h-4" />,
  UserPlus: <UserPlus className="w-4 h-4" />,
  Bus: <Bus className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  HeartPulse: <HeartPulse className="w-4 h-4" />,
  Receipt: <Receipt className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Megaphone: <Megaphone className="w-4 h-4" />,
  CalendarDays: <CalendarDays className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />,
  BarChart3: <BarChart3 className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
  Building: <Building className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Sliders: <Sliders className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Lock: <Lock className="w-4 h-4" />,
  LineChart: <LineChart className="w-4 h-4" />,
  CheckSquare: <CheckSquare className="w-4 h-4" />,
  BookCheck: <BookCheck className="w-4 h-4" />,
  FilePenLine: <FilePenLine className="w-4 h-4" />,
  Clock: <Clock className="w-4 h-4" />,
  MessageSquare: <MessageSquare className="w-4 h-4" />,
};

export const GlobalSidebar: React.FC = () => {
  const pathname = usePathname();
  const { selectedRole } = useAuthStore();

  const renderSchoolAdminNav = () => (
    <div className="space-y-5 px-3">
      {NAV_GROUPS_SCHOOL_ADMIN.map((group, idx) => (
        <div key={idx} className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {group.title}
          </p>
          {group.items.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/school' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>{iconMap[item.icon]}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );

  const renderSimpleNav = (items: { label: string; href: string; icon: string }[]) => (
    <div className="space-y-1 px-3">
      {items.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/admin' && item.href !== '/teacher' && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              isActive
                ? 'bg-slate-800 text-white font-semibold shadow-xs'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
            }`}
          >
            <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>{iconMap[item.icon]}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-base shadow-sm">
          S
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white">{APP_NAME}</h1>
          <p className="text-[10px] text-slate-400 tracking-wide">{APP_TAGLINE}</p>
        </div>
      </div>

      {/* Navigation Body */}
      <div className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
        {selectedRole === 'SCHOOL_ADMIN' && renderSchoolAdminNav()}
        {selectedRole === 'SUPER_ADMIN' && renderSimpleNav(NAV_SUPER_ADMIN)}
        {selectedRole === 'TEACHER' && renderSimpleNav(NAV_TEACHER)}
        {(selectedRole === 'STUDENT' || selectedRole === 'PARENT') && (
          <div className="p-4 text-xs text-slate-400 space-y-3">
            <p className="font-semibold text-white">Mobile Only Application</p>
            <p className="text-slate-400 leading-relaxed">
              {selectedRole === 'STUDENT' ? 'Student Portal' : 'Parent Portal'} is exclusively built as a Mobile App.
            </p>
            <div>
              <Link
                href={selectedRole === 'STUDENT' ? '/student-mobile' : '/parent-mobile'}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Launch {selectedRole === 'STUDENT' ? 'Student' : 'Parent'} Mobile App</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        <span>St. Xavier School ERP • v2.4.0</span>
      </div>
    </aside>
  );
};
