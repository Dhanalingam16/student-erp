'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarDays,
  FileSpreadsheet,
  IndianRupee,
  Bus,
  Bed,
  ShieldCheck,
  Stethoscope,
  BookMarked,
  Boxes,
  Bell,
  Calendar,
  FileCheck,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Search,
  Plus,
  Menu,
  X,
  CreditCard,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { INSTITUTION_INFO } from '@/lib/constants';
import { CollectFeeModal } from '@/components/modals/CollectFeeModal';
import { AttendanceEntryModal } from '@/components/modals/AttendanceEntryModal';
import { VisitorPassModal } from '@/components/modals/VisitorPassModal';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick Action Modal states
  const [isCollectFeeOpen, setIsCollectFeeOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isVisitorPassOpen, setIsVisitorPassOpen] = useState(false);

  const navSections: NavSection[] = [
    {
      title: 'Core Operations',
      items: [
        { label: 'Live Dashboard', href: '/admin', icon: <LayoutDashboard className="h-4 w-4" /> },
        { label: 'People Directory', href: '/admin/people', icon: <Users className="h-4 w-4" /> },
        { label: 'Admissions & CRM', href: '/admin/admissions', icon: <UserCheck className="h-4 w-4" /> },
        { label: 'Academics & LMS', href: '/admin/academics', icon: <GraduationCap className="h-4 w-4" /> },
      ],
    },
    {
      title: 'Academics & Finance',
      items: [
        { label: 'Examination & Marks', href: '/admin/examination', icon: <FileSpreadsheet className="h-4 w-4" /> },
        { label: 'Finance & Fees', href: '/admin/finance', icon: <IndianRupee className="h-4 w-4" /> },
        { label: 'Transport Fleet & GPS', href: '/admin/transport', icon: <Bus className="h-4 w-4" /> },
      ],
    },
    {
      title: 'Campus & Facilities',
      items: [
        { label: 'Hostel & Boarding', href: '/admin/hostel', icon: <Bed className="h-4 w-4" /> },
        { label: 'Visitor & Security', href: '/admin/security', icon: <ShieldCheck className="h-4 w-4" /> },
        { label: 'Health & Clinic', href: '/admin/clinic', icon: <Stethoscope className="h-4 w-4" /> },
        { label: 'Library Catalog', href: '/admin/library', icon: <BookMarked className="h-4 w-4" /> },
        { label: 'Assets & Inventory', href: '/admin/inventory', icon: <Boxes className="h-4 w-4" /> },
      ],
    },
    {
      title: 'Administration',
      items: [
        { label: 'Communication Hub', href: '/admin/communication', icon: <Bell className="h-4 w-4" /> },
        { label: 'Calendar & Events', href: '/admin/calendar', icon: <Calendar className="h-4 w-4" /> },
        { label: 'Certificates (TC/Bonafide)', href: '/admin/certificates', icon: <FileCheck className="h-4 w-4" /> },
        { label: 'Reports & Analytics', href: '/admin/reports', icon: <BarChart3 className="h-4 w-4" /> },
        { label: 'System Admin & RBAC', href: '/admin/system', icon: <Settings className="h-4 w-4" /> },
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-100 min-h-screen">
      {/* Admin Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between sticky top-[41px] z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm tracking-tight hidden sm:inline">
              Administration ERP
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[11px] font-semibold border border-blue-200">
              CBSE {INSTITUTION_INFO.academicSession}
            </span>
          </div>
        </div>

        {/* Search & Quick Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Action Buttons */}
          <div className="hidden md:flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setIsCollectFeeOpen(true)}
            >
              <CreditCard className="h-3 w-3 text-emerald-600 mr-1" />
              Collect Fee
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setIsAttendanceOpen(true)}
            >
              <UserCheck className="h-3 w-3 text-blue-600 mr-1" />
              Attendance
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-7"
              onClick={() => setIsVisitorPassOpen(true)}
            >
              <ShieldCheck className="h-3 w-3 text-amber-600 mr-1" />
              Gate Pass
            </Button>
          </div>

          {/* Search bar simulation */}
          <div className="relative w-48 sm:w-64 hidden sm:block">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student, staff, roll... (Cmd+K)"
              className="w-full pl-8 pr-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-navy-600"
            />
          </div>

          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="hidden lg:inline text-[11px] font-medium">Campus Connected</span>
          </div>
        </div>
      </header>

      {/* Main ERP Layout (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
          } transition-all duration-200 ease-in-out bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto max-h-[calc(100vh-80px)] sticky top-[82px] z-20`}
        >
          <div className="p-3 space-y-5">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {section.title}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item, iIdx) => {
                    const isActive =
                      item.href === '/admin'
                        ? pathname === '/admin'
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={iIdx}
                        href={item.href}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors ${
                          isActive
                            ? 'bg-navy-900 text-white font-semibold shadow-xs'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={isActive ? 'text-white' : 'text-slate-500'}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-100 text-blue-800 font-mono font-medium">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer info */}
          <div className="mt-auto p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Vidya Mandir ERP v4.2</p>
            <p className="text-[10px]">Affiliated with Central Board of Secondary Education (CBSE)</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>

      {/* Global Modals for Admin Quick Actions */}
      <CollectFeeModal isOpen={isCollectFeeOpen} onClose={() => setIsCollectFeeOpen(false)} />
      <AttendanceEntryModal isOpen={isAttendanceOpen} onClose={() => setIsAttendanceOpen(false)} />
      <VisitorPassModal isOpen={isVisitorPassOpen} onClose={() => setIsVisitorPassOpen(false)} />
    </div>
  );
}
