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
  Clock,
  MoreHorizontal,
  User,
  GraduationCap,
} from 'lucide-react';
import { INSTITUTION_INFO } from '@/lib/constants';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { students } = useERPStore();
  const student = students[0]; // Aarav Sharma (Class 10-A)

  const bottomNavItems = [
    { label: 'Home', href: '/student', icon: <Home className="h-4 w-4" /> },
    { label: 'Academics', href: '/student/academics', icon: <BookOpen className="h-4 w-4" /> },
    { label: 'Attendance', href: '/student/attendance', icon: <CalendarCheck className="h-4 w-4" /> },
    { label: 'Schedule', href: '/student/schedule', icon: <Clock className="h-4 w-4" /> },
    { label: 'More', href: '/student/more', icon: <MoreHorizontal className="h-4 w-4" /> },
  ];

  return (
    <DeviceFrameWrapper title="Student Portal">
      {/* Student App Top Header */}
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
              <span className="text-[9px] text-navy-300">Student Portal</span>
            </div>
          </div>

          <div className="px-2 py-0.5 rounded-full bg-navy-800 border border-navy-700 text-[10px] text-amber-300 font-mono">
            Class {student.classSection}
          </div>
        </div>

        {/* Student Bar */}
        <div className="mt-2 pt-2 border-t border-navy-900 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-amber-400 text-navy-950 font-bold flex items-center justify-center text-[10px]">
              {student.firstName[0]}
            </div>
            <span className="font-semibold text-white">{student.fullName}</span>
            <span className="text-navy-400 font-mono">• Roll {student.rollNumber}</span>
          </div>
          <span className="font-mono text-emerald-400 font-semibold">
            {student.overallAttendancePercentage}% Present
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-3.5 space-y-4">{children}</main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 sm:max-w-md sm:mx-auto bg-white border-t border-slate-200 py-1.5 px-3 flex justify-around items-center z-40 shadow-lg">
        {bottomNavItems.map((item, idx) => {
          const isActive =
            item.href === '/student' ? pathname === '/student' : pathname.startsWith(item.href);

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded transition-colors ${
                isActive ? 'text-navy-950 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.icon}
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </DeviceFrameWrapper>
  );
}
