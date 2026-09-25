'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useERPStore } from '@/lib/store';
import { formatCurrencyINR, formatDate } from '@/lib/utils';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  IndianRupee,
  Bus,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Building2,
  ChevronRight,
  Plus,
  RefreshCw,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CollectFeeModal } from '@/components/modals/CollectFeeModal';
import { AttendanceEntryModal } from '@/components/modals/AttendanceEntryModal';
import { VisitorPassModal } from '@/components/modals/VisitorPassModal';

export default function AdminDashboardPage() {
  const {
    students,
    teachers,
    attendance,
    feeTransactions,
    busRoutes,
    visitorPasses,
    announcements,
  } = useERPStore();

  const [isCollectFeeOpen, setIsCollectFeeOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isVisitorOpen, setIsVisitorOpen] = useState(false);

  // Computed metrics
  const totalStudents = 1420;
  const totalTeachers = 84;
  const totalStaff = 32;

  const presentTodayCount = attendance.filter((a) => a.status === 'present').length;
  const absentTodayCount = attendance.filter((a) => a.status === 'absent').length;
  const lateTodayCount = attendance.filter((a) => a.status === 'late').length;

  const totalOutstandingFees = students.reduce((acc, s) => acc + s.pendingFeeAmount, 0);
  const todayCollectedFees = feeTransactions.reduce((acc, t) => acc + t.amountPaid, 0);

  const activeVisitors = visitorPasses.filter((v) => v.status === 'active');

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Top Banner: Real-time School Operational Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              School Operational Command Center
            </h1>
            <Badge variant="info">Live Sync</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Friday, 25 September 2026 • Academic Session 2026–2027 • Period 3 in progress
          </p>
        </div>

        {/* Quick Action Drawer Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsAttendanceOpen(true)}>
            <UserCheck className="h-3.5 w-3.5 mr-1 text-blue-600" />
            Class Register
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsCollectFeeOpen(true)}>
            <IndianRupee className="h-3.5 w-3.5 mr-1 text-emerald-600" />
            Collect Fee
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsVisitorOpen(true)}>
            <Plus className="h-3.5 w-3.5 mr-1" />
            Gate Pass
          </Button>
        </div>
      </div>

      {/* 1. TOP-LEVEL OPERATIONAL METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Students Present
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-emerald-700">1,348</span>
            <span className="text-[11px] font-medium text-emerald-600">94.9%</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">72 absent today</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Faculty On Duty
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-slate-900">81 / 84</span>
            <span className="text-[11px] font-medium text-slate-500">96.4%</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">3 on approved leave</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Today's Fee Collection
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-navy-950">
              {formatCurrencyINR(todayCollectedFees)}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {feeTransactions.length} receipts issued
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Total Outstanding
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-rose-700">
              {formatCurrencyINR(totalOutstandingFees)}
            </span>
          </div>
          <span className="text-[10px] text-rose-500 mt-0.5 block">Term 2 due 15 Oct</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Active Transport
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-slate-900">16 / 16</span>
            <Badge variant="success">Normal</Badge>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">All morning trips done</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Visitors on Campus
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-xl font-bold font-mono text-amber-700">{activeVisitors.length}</span>
            <Badge variant="warning">Gate 1</Badge>
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Passes active</span>
        </div>
      </div>

      {/* 2. REAL-TIME CRITICAL ALERTS BANNER */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Priority Operational Alerts & Exceptions
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">4 active flags requiring review</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="flex items-start gap-2.5 p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-900">
            <div className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-1" />
            <div className="flex-1">
              <span className="font-semibold">Fee Overdue Notice:</span> Student Aditya Verma (10-A) has
              outstanding Term 1 & 2 balance ₹38,500 over 90 days.
              <div className="mt-1">
                <Link
                  href="/admin/finance"
                  className="font-medium text-rose-800 underline hover:text-rose-950 text-[11px]"
                >
                  View Student Ledger →
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900">
            <div className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-1" />
            <div className="flex-1">
              <span className="font-semibold">Transport Delay Resolved:</span> Route 12 bus reached school at
              07:44 AM (4 mins delay) due to Sector 11 metro civil works.
              <div className="mt-1">
                <Link
                  href="/admin/transport"
                  className="font-medium text-amber-800 underline hover:text-amber-950 text-[11px]"
                >
                  Inspect Fleet GPS →
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded bg-blue-50 border border-blue-200 text-blue-900">
            <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1" />
            <div className="flex-1">
              <span className="font-semibold">CBSE Pre-Board Schedule:</span> Theory examination date-sheet
              ready for publishing to Teacher & Parent portals.
              <div className="mt-1">
                <Link
                  href="/admin/examination"
                  className="font-medium text-blue-800 underline hover:text-blue-950 text-[11px]"
                >
                  Publish Date-Sheet →
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded bg-slate-50 border border-slate-200 text-slate-900">
            <div className="w-2 h-2 rounded-full bg-slate-600 shrink-0 mt-1" />
            <div className="flex-1">
              <span className="font-semibold">Clinic Log:</span> Student Vihaan Mukherjee (10-A) treated for mild
              headache and eye strain in dispensary. Mother notified.
              <div className="mt-1">
                <Link
                  href="/admin/clinic"
                  className="font-medium text-slate-700 underline hover:text-slate-950 text-[11px]"
                >
                  Open Clinic Log →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TWO-COLUMN OPERATIONAL SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2 Cols): Class Attendance Roster & Admissions Pipeline */}
        <div className="lg:col-span-2 space-y-5">
          {/* Class-wise Morning Attendance Status */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Class Attendance Roster — Morning Session
                </h3>
                <p className="text-[11px] text-slate-400">Class 10-A register verified by Mrs. Lakshmi Raman</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setIsAttendanceOpen(true)}
              >
                Mark Register
              </Button>
            </div>

            <div className="divide-y divide-slate-100">
              {attendance.map((rec) => (
                <div key={rec.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-500 font-semibold w-12">{rec.rollNumber}</span>
                    <div>
                      <p className="font-semibold text-slate-900">{rec.studentName}</p>
                      <p className="text-[10px] text-slate-400">Class {rec.classSection}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {rec.remarks && (
                      <span className="text-[11px] text-slate-500 italic hidden sm:inline">
                        "{rec.remarks}"
                      </span>
                    )}
                    {rec.checkInTime && (
                      <span className="text-[11px] font-mono text-slate-500">{rec.checkInTime}</span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                        rec.status === 'present'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : rec.status === 'late'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 text-right">
              <Link
                href="/admin/people"
                className="text-xs text-navy-800 hover:text-navy-950 font-semibold flex items-center justify-end gap-1"
              >
                <span>View Complete 1,420 Student Directory</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Admissions CRM Pipeline Status */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Session 2026–2027 Admissions Pipeline
                </h3>
                <p className="text-[11px] text-slate-400">Inquiry-to-enrollment conversion funnel</p>
              </div>
              <Link href="/admin/admissions">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  CRM Pipeline
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <p className="text-slate-500 text-[10px] uppercase font-bold">New Enquiries</p>
                <p className="text-lg font-bold font-mono text-slate-900 mt-0.5">248</p>
                <span className="text-[10px] text-slate-400">This Month</span>
              </div>
              <div className="p-2.5 bg-blue-50 rounded border border-blue-200">
                <p className="text-blue-800 text-[10px] uppercase font-bold">Applications</p>
                <p className="text-lg font-bold font-mono text-blue-900 mt-0.5">186</p>
                <span className="text-[10px] text-blue-600">Entrance Scheduled</span>
              </div>
              <div className="p-2.5 bg-amber-50 rounded border border-amber-200">
                <p className="text-amber-800 text-[10px] uppercase font-bold">Interviews</p>
                <p className="text-lg font-bold font-mono text-amber-900 mt-0.5">42</p>
                <span className="text-[10px] text-amber-600">Pending Review</span>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200">
                <p className="text-emerald-800 text-[10px] uppercase font-bold">Enrolled</p>
                <p className="text-lg font-bold font-mono text-emerald-900 mt-0.5">124</p>
                <span className="text-[10px] text-emerald-600">Fee Paid</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Finance Receipts & Live Transport */}
        <div className="space-y-5">
          {/* Recent Fee Transactions */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <IndianRupee className="h-4 w-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Recent Fee Payments
                </h3>
              </div>
              <Link href="/admin/finance">
                <span className="text-xs text-navy-800 font-semibold hover:underline">Ledger</span>
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              {feeTransactions.map((txn) => (
                <div key={txn.id} className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">{txn.studentName}</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {formatCurrencyINR(txn.amountPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span className="font-mono text-[10px]">{txn.receiptNumber}</span>
                    <span className="uppercase text-[10px] font-semibold">{txn.paymentMode}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => setIsCollectFeeOpen(true)}
            >
              Collect Counter Fee
            </Button>
          </div>

          {/* Transport Fleet Status */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Bus className="h-4 w-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Bus Fleet Status
                </h3>
              </div>
              <Badge variant="success">All Active</Badge>
            </div>

            <div className="space-y-2 text-xs">
              {busRoutes.map((route) => (
                <div key={route.id} className="p-2.5 rounded border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">{route.routeNumber}</span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                        route.currentStatus === 'on_route'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {route.currentStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{route.routeName}</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Driver: {route.driverName} ({route.driverPhone})
                  </p>
                </div>
              ))}
            </div>

            <Link href="/admin/transport" className="block">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Open Fleet GPS Monitor
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CollectFeeModal isOpen={isCollectFeeOpen} onClose={() => setIsCollectFeeOpen(false)} />
      <AttendanceEntryModal isOpen={isAttendanceOpen} onClose={() => setIsAttendanceOpen(false)} />
      <VisitorPassModal isOpen={isVisitorOpen} onClose={() => setIsVisitorOpen(false)} />
    </div>
  );
}
