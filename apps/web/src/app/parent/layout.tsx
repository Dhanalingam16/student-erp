'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useERPStore } from '@/lib/store';
import { DeviceFrameWrapper } from '@/components/common/DeviceFrameWrapper';
import {
  Home,
  BookOpen,
  CalendarCheck,
  CreditCard,
  MoreHorizontal,
  ChevronDown,
  User,
  Bus,
} from 'lucide-react';
import { INSTITUTION_INFO } from '@/lib/constants';

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { selectedChildId, setSelectedChildId, selectedChild, students } = useERPStore();

  const parentChildren = [
    students.find((s) => s.id === 'std-10101') || students[0],
    students.find((s) => s.id === 'std-06115') || students[1],
  ].filter(Boolean);

  const bottomNavItems = [
    { label: 'Home', href: '/parent', icon: <Home className="h-4 w-4" /> },
    { label: 'Academics', href: '/parent/academics', icon: <BookOpen className="h-4 w-4" /> },
    { label: 'Attendance', href: '/parent/attendance', icon: <CalendarCheck className="h-4 w-4" /> },
    { label: 'Fees', href: '/parent/fees', icon: <CreditCard className="h-4 w-4" />, badge: selectedChild.pendingFeeAmount > 0 ? 'Due' : undefined },
    { label: 'More', href: '/parent/more', icon: <MoreHorizontal className="h-4 w-4" /> },
  ];

  return (
    <DeviceFrameWrapper title="Parent Portal">
      {/* Mobile App Header with Child Selector */}
      <header className="bg-navy-950 text-white p-3.5 sticky top-0 z-30 shadow-xs border-b border-navy-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-500 text-navy-950 font-black text-xs flex items-center justify-center">
              VM
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-tight text-white block">
                {INSTITUTION_INFO.name}
              </span>
              <span className="text-[9px] text-navy-300">Parent Companion App</span>
            </div>
          </div>

          {/* Prominent Multi-Child Switcher Pill */}
          <div className="relative">
            <select
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              className="bg-navy-800 text-amber-300 text-xs font-bold py-1 px-2.5 rounded-full border border-amber-500/50 appearance-none pr-6 cursor-pointer focus:outline-none"
            >
              {parentChildren.map((c) => (
                <option key={c.id} value={c.id} className="bg-navy-900 text-white font-medium">
                  {c.firstName} • Class {c.classSection}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3 w-3 text-amber-300 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Selected Child Info Strip */}
        <div className="mt-2 pt-2 border-t border-navy-900 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <User className="h-3 w-3 text-amber-400" />
            <span className="font-semibold text-white">{selectedChild.fullName}</span>
            <span className="text-navy-300 font-mono">• Roll {selectedChild.rollNumber}</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold">
            {selectedChild.overallAttendancePercentage}% Attendance
          </span>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 p-3.5 space-y-4">{children}</main>

      {/* Persistent Bottom Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 sm:max-w-md sm:mx-auto bg-white border-t border-slate-200 py-1.5 px-3 flex justify-around items-center z-40 shadow-lg">
        {bottomNavItems.map((item, idx) => {
          const isActive =
            item.href === '/parent' ? pathname === '/parent' : pathname.startsWith(item.href);

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded transition-colors relative ${
                isActive ? 'text-navy-950 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 rounded-full bg-rose-600 text-white text-[8px] font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </DeviceFrameWrapper>
  );
}
