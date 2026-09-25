'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  Calendar,
  BookOpen,
  FileCheck2,
  FileSpreadsheet,
  Bell,
  Clock,
  Menu,
  CheckCircle2,
} from 'lucide-react';
import { AttendanceEntryModal } from '@/components/modals/AttendanceEntryModal';
import { AddHomeworkModal } from '@/components/modals/AddHomeworkModal';
import { MarksEntryModal } from '@/components/modals/MarksEntryModal';
import { Button } from '@/components/ui/button';
import { INSTITUTION_INFO } from '@/lib/constants';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Quick Action Modals
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isHomeworkOpen, setIsHomeworkOpen] = useState(false);
  const [isMarksOpen, setIsMarksOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/teacher', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'My Classes & Students', href: '/teacher/classes', icon: <Users className="h-4 w-4" /> },
    { label: 'Mark Attendance', href: '/teacher/attendance', icon: <CalendarCheck className="h-4 w-4" />, badge: 'Action Due' },
    { label: 'Teaching Timetable', href: '/teacher/timetable', icon: <Clock className="h-4 w-4" /> },
    { label: 'Homework', href: '/teacher/homework', icon: <BookOpen className="h-4 w-4" /> },
    { label: 'Assignments Review', href: '/teacher/assignments', icon: <FileCheck2 className="h-4 w-4" /> },
    { label: 'Exam Marks Tabulation', href: '/teacher/marks', icon: <FileSpreadsheet className="h-4 w-4" /> },
    { label: 'Class Notices', href: '/teacher/communication', icon: <Bell className="h-4 w-4" /> },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-100 min-h-screen">
      {/* Teacher Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-[41px] z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            title="Toggle Sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">Faculty Workspace</span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                Class Teacher 10-A
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Mrs. Lakshmi Raman • Senior PGT Mathematics
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => setIsAttendanceOpen(true)}
          >
            <CalendarCheck className="h-3 w-3 text-emerald-600 mr-1" />
            Attendance
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => setIsHomeworkOpen(true)}
          >
            <BookOpen className="h-3 w-3 text-blue-600 mr-1" />
            Add Homework
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => setIsMarksOpen(true)}
          >
            <FileSpreadsheet className="h-3 w-3 text-amber-600 mr-1" />
            Enter Marks
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-60' : 'w-0 -translate-x-full'
          } transition-all duration-200 ease-in-out bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto max-h-[calc(100vh-80px)] sticky top-[82px] z-20`}
        >
          <div className="p-3 space-y-1">
            <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Faculty Navigation
            </p>
            {navItems.map((item, idx) => {
              const isActive =
                item.href === '/teacher' ? pathname === '/teacher' : pathname.startsWith(item.href);
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`flex items-center justify-between px-2.5 py-2 rounded text-xs transition-colors ${
                    isActive
                      ? 'bg-navy-900 text-white font-semibold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-white' : 'text-slate-500'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-100 text-rose-800 font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Class 10-A Room 204</p>
            <p className="text-[10px]">36 Enrolled • Next Class: Period 5 (10:35 AM)</p>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>

      {/* Modals */}
      <AttendanceEntryModal isOpen={isAttendanceOpen} onClose={() => setIsAttendanceOpen(false)} />
      <AddHomeworkModal isOpen={isHomeworkOpen} onClose={() => setIsHomeworkOpen(false)} />
      <MarksEntryModal isOpen={isMarksOpen} onClose={() => setIsMarksOpen(false)} />
    </div>
  );
}
