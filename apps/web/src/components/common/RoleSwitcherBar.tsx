'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useERPStore } from '@/lib/store';
import {
  ShieldAlert,
  GraduationCap,
  Users,
  User,
  Smartphone,
  ExternalLink,
  ChevronDown,
  Building2,
} from 'lucide-react';
import { INSTITUTION_INFO } from '@/lib/constants';

export function RoleSwitcherBar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentUser,
    switchRole,
    deviceFrameEnabled,
    setDeviceFrameEnabled,
    selectedChildId,
    setSelectedChildId,
    students,
  } = useERPStore();

  const isParentRoute = pathname.startsWith('/parent');
  const isStudentRoute = pathname.startsWith('/student');
  const isMobileRoute = isParentRoute || isStudentRoute;

  const currentRole = currentUser.role;

  const parentChildren = [
    students.find((s) => s.id === 'std-10101') || students[0],
    students.find((s) => s.id === 'std-06115') || students[1],
  ].filter(Boolean);

  return (
    <header className="bg-navy-950 text-white text-xs border-b border-navy-800 sticky top-0 z-50 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-xs">
      {/* Institution & Active Portal Indicator */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="w-5 h-5 rounded bg-amber-500 text-navy-950 font-bold flex items-center justify-center text-[10px]">
            VM
          </div>
          <span className="font-semibold text-slate-100 tracking-tight">
            {INSTITUTION_INFO.name}
          </span>
        </Link>
        <span className="text-navy-400 hidden sm:inline">|</span>
        <span className="text-navy-300 font-mono text-[11px] hidden md:inline">
          CBSE #{INSTITUTION_INFO.affiliationNo.split('/')[2]} • Session {INSTITUTION_INFO.academicSession}
        </span>
      </div>

      {/* 4 Dedicated Product Tabs */}
      <div className="flex items-center gap-1 bg-navy-900 p-0.5 rounded border border-navy-800">
        <Link
          href="/admin"
          onClick={() => switchRole('super_admin')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
            pathname.startsWith('/admin')
              ? 'bg-navy-800 text-white font-medium shadow-xs'
              : 'text-navy-300 hover:text-white hover:bg-navy-850'
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5 text-blue-400" />
          <span className="hidden sm:inline">Admin Web</span>
          <span className="sm:hidden">Admin</span>
        </Link>

        <Link
          href="/teacher"
          onClick={() => switchRole('teacher')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
            pathname.startsWith('/teacher')
              ? 'bg-navy-800 text-white font-medium shadow-xs'
              : 'text-navy-300 hover:text-white hover:bg-navy-850'
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Teacher Web</span>
          <span className="sm:hidden">Teacher</span>
        </Link>

        <Link
          href="/parent"
          onClick={() => switchRole('parent')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
            pathname.startsWith('/parent')
              ? 'bg-navy-800 text-white font-medium shadow-xs'
              : 'text-navy-300 hover:text-white hover:bg-navy-850'
          }`}
        >
          <Users className="h-3.5 w-3.5 text-amber-400" />
          <span className="hidden sm:inline">Parent App</span>
          <span className="sm:hidden">Parent</span>
        </Link>

        <Link
          href="/student"
          onClick={() => switchRole('student')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
            pathname.startsWith('/student')
              ? 'bg-navy-800 text-white font-medium shadow-xs'
              : 'text-navy-300 hover:text-white hover:bg-navy-850'
          }`}
        >
          <User className="h-3.5 w-3.5 text-purple-400" />
          <span className="hidden sm:inline">Student App</span>
          <span className="sm:hidden">Student</span>
        </Link>
      </div>

      {/* Right side controls: Child switcher (if parent) & Device Frame Toggle (if mobile) */}
      <div className="flex items-center gap-2">
        {isParentRoute && (
          <div className="flex items-center gap-1.5 bg-navy-900 border border-amber-500/40 px-2 py-0.5 rounded text-[11px]">
            <span className="text-amber-400 font-medium">Child:</span>
            <select
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              {parentChildren.map((c) => (
                <option key={c.id} value={c.id} className="bg-navy-950 text-white">
                  {c.firstName} (Class {c.classSection})
                </option>
              ))}
            </select>
          </div>
        )}

        {isMobileRoute && (
          <button
            onClick={() => setDeviceFrameEnabled(!deviceFrameEnabled)}
            className={`hidden lg:flex items-center gap-1 px-2 py-1 rounded border text-[11px] transition-colors ${
              deviceFrameEnabled
                ? 'bg-amber-500 text-navy-950 border-amber-400 font-semibold'
                : 'bg-navy-900 text-navy-300 border-navy-800 hover:text-white'
            }`}
            title="Toggle smartphone simulation frame for mobile apps"
          >
            <Smartphone className="h-3 w-3" />
            <span>{deviceFrameEnabled ? 'Mobile Frame: ON' : 'Mobile Frame: OFF'}</span>
          </button>
        )}

        {/* User Badge */}
        <div className="flex items-center gap-1.5 text-navy-300 pl-1 border-l border-navy-800">
          <div className="w-5 h-5 rounded-full bg-navy-800 flex items-center justify-center font-bold text-white text-[10px]">
            {currentUser.name.charAt(0)}
          </div>
          <span className="text-[11px] font-medium text-slate-200 hidden lg:inline max-w-[120px] truncate">
            {currentUser.name}
          </span>
        </div>
      </div>
    </header>
  );
}
