'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useERPStore } from '@/lib/store';
import { formatCurrencyINR } from '@/lib/utils';
import {
  CalendarCheck,
  CreditCard,
  BookOpen,
  Clock,
  Bus,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  FileText,
  Bell,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FeePaymentModal } from '@/components/modals/FeePaymentModal';

export default function ParentHomePage() {
  const { selectedChild, attendance, homework, announcements } = useERPStore();
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Today's attendance for the selected child
  const todayRecord = attendance.find((a) => a.studentId === selectedChild.id);

  // Today's periods preview
  const todayClassesPreview = [
    { period: 1, subject: 'Mathematics', time: '08:00 AM', room: 'Room 204' },
    { period: 2, subject: 'Science (Physics)', time: '08:45 AM', room: 'Physics Lab 1' },
    { period: 3, subject: 'English Literature', time: '09:30 AM', room: 'Room 204' },
  ];

  return (
    <div className="space-y-3.5 text-xs">
      {/* 1. Today's Attendance & Campus Status Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-full ${
              todayRecord?.status === 'present'
                ? 'bg-emerald-50 text-emerald-600'
                : todayRecord?.status === 'late'
                ? 'bg-amber-50 text-amber-600'
                : 'bg-rose-50 text-rose-600'
            }`}
          >
            <CalendarCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Today's Attendance
            </span>
            <span className="font-bold text-slate-900 text-sm">
              {todayRecord?.status === 'present'
                ? 'Marked Present'
                : todayRecord?.status === 'late'
                ? 'Marked Late (Metro Delay)'
                : 'Marked Absent'}
            </span>
            <p className="text-[10px] text-slate-500 font-mono">
              Campus Check-in: {todayRecord?.checkInTime || '07:46 AM'} • Gate 1
            </p>
          </div>
        </div>

        <Link href="/parent/attendance">
          <span className="text-navy-900 font-semibold text-[11px] flex items-center gap-0.5">
            Calendar <ChevronRight className="h-3 w-3" />
          </span>
        </Link>
      </div>

      {/* 2. Outstanding Fee Alert (If applicable) */}
      {selectedChild.pendingFeeAmount > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3.5 shadow-xs space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-bold text-[9px] uppercase">
                Term 2 Installment Due
              </span>
              <h3 className="font-bold text-slate-900 text-sm mt-1">
                Outstanding: {formatCurrencyINR(selectedChild.pendingFeeAmount)}
              </h3>
              <p className="text-[11px] text-slate-600">Statutory Due Date: 15 October 2026</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setIsPayModalOpen(true)}>
              Pay Now
            </Button>
          </div>
        </div>
      )}

      {/* 3. Live Bus Route 12 Quick Status */}
      {selectedChild.busRouteId && (
        <Link
          href="/parent/transport"
          className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex items-center justify-between hover:border-slate-300 transition-colors block"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-blue-50 text-blue-600">
              <Bus className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">Route 12 (Tata Starbus)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-[11px] text-slate-500">
                Stop: {selectedChild.busStopName} • Status: On Morning Trip
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </Link>
      )}

      {/* 4. Today's Timetable Snippet */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
        <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
          <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
            Today's Class Schedule
          </span>
          <span className="text-[10px] text-slate-400">Class {selectedChild.classSection}</span>
        </div>

        <div className="space-y-1.5">
          {todayClassesPreview.map((c, i) => (
            <div key={i} className="flex justify-between items-center py-1 text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-4 text-slate-400 font-mono font-semibold">P{c.period}</span>
                <span className="font-medium text-slate-900">{c.subject}</span>
              </div>
              <span className="font-mono text-slate-500 text-[10px]">{c.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Pending Homework */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
        <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
          <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
            Active Homework
          </span>
          <Link href="/parent/academics" className="text-[11px] text-navy-800 font-semibold">
            View All ({homework.length})
          </Link>
        </div>

        <div className="space-y-2">
          {homework.slice(0, 2).map((hw) => (
            <div key={hw.id} className="p-2 bg-slate-50 rounded border border-slate-200 space-y-0.5">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-slate-900 line-clamp-1">{hw.title}</span>
                <span className="font-mono text-[10px] text-rose-700 font-bold ml-2">Due {hw.dueDate}</span>
              </div>
              <p className="text-[10px] text-slate-500">{hw.subject} • By {hw.teacherName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Recent School Notices */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
        <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block border-b border-slate-100 pb-1.5">
          Recent Institutional Circulars
        </span>
        <div className="space-y-2">
          {announcements.slice(0, 2).map((anc) => (
            <div key={anc.id} className="space-y-0.5">
              <span className="font-semibold text-slate-900 text-[11px] block">{anc.title}</span>
              <p className="text-slate-600 line-clamp-2 text-[10px] leading-relaxed">{anc.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fee Payment Modal */}
      <FeePaymentModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        student={selectedChild}
      />
    </div>
  );
}
