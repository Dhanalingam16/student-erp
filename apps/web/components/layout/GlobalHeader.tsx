'use client';

import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Sparkles, User, LogOut, CheckCircle, Smartphone } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '@school-erp/types';
import { DEMO_USERS } from '@school-erp/constants';
import { useRouter } from 'next/navigation';
import { mockAnnouncements } from '@school-erp/mock-data';

export interface GlobalHeaderProps {
  onOpenSearch: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ onOpenSearch }) => {
  const { user, selectedRole, loginAsRole, logout } = useAuthStore();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const router = useRouter();

  const handleRoleSelect = (role: UserRole) => {
    loginAsRole(role);
    setIsRoleDropdownOpen(false);
    if (role === 'SUPER_ADMIN') router.push('/admin');
    else if (role === 'SCHOOL_ADMIN') router.push('/school');
    else if (role === 'TEACHER') router.push('/teacher');
    else if (role === 'STUDENT') router.push('/student');
    else if (role === 'PARENT') router.push('/parent-mobile');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Search Bar Trigger */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-3 px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-slate-500 text-xs font-medium transition-colors w-72 border border-slate-200/60"
        >
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate">Search students, teachers, exams...</span>
          <kbd className="ml-auto px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Demo Mode Role Selector Banner */}
        <div className="relative">
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg text-amber-900 text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>DEMO MODE: <strong className="text-amber-950">{user?.role}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-700 ml-1" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
              <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Switch Role Viewport</span>
              </div>
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.role}
                  onClick={() => handleRoleSelect(demo.role as UserRole)}
                  className={`w-full text-left px-3 py-2 flex items-start gap-2.5 hover:bg-slate-50 transition-colors ${
                    selectedRole === demo.role ? 'bg-slate-50 font-medium' : ''
                  }`}
                >
                  <img src={demo.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-900 truncate">{demo.name}</p>
                      {selectedRole === demo.role && <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{demo.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Mobile Viewports shortcuts */}
        <button
          onClick={() => router.push('/parent-mobile')}
          className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
        >
          <Smartphone className="w-3.5 h-3.5 text-slate-500" />
          <span>Parent App (Mobile)</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">Notifications</span>
                <span className="text-[10px] font-medium px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">3 New</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                {mockAnnouncements.map((anc) => (
                  <div key={anc.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <p className="text-xs font-medium text-slate-900 leading-snug">{anc.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{anc.content}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Category: {anc.category}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-100 text-center">
                <button onClick={() => setIsNotifOpen(false)} className="text-xs font-medium text-blue-600 hover:underline">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'}
            alt=""
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-900 leading-tight">{user?.name}</p>
            <p className="text-[10px] text-slate-500 truncate max-w-[120px]">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
