'use client';

import React from 'react';
import Link from 'next/link';
import { useERPStore } from '@/lib/store';
import { TODAY_TIMETABLE_10A } from '@/lib/demo-data';
import {
  CalendarCheck,
  Clock,
  BookOpen,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  ChevronRight,
  CheckCircle2,
  Bell,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function StudentHomePage() {
  const { students, homework, announcements } = useERPStore();
  const student = students[0]; // Aarav Sharma

  return (
    <div className="space-y-3.5 text-xs">
      {/* 1. Compact Greeting & Status Banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-slate-400 font-mono text-[10px]">Friday, 25 Sep 2026</span>
          <h1 className="font-bold text-slate-900 text-sm mt-0.5">
            Hi, {student.firstName} 👋
          </h1>
          <p className="text-[11px] text-slate-500">
            Class {student.classSection} • Room 204
          </p>
        </div>

        <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-right">
          <span className="text-[9px] uppercase font-bold text-emerald-800 block">
            Today's Attendance
          </span>
          <span className="font-bold text-emerald-700 text-xs">Marked Present</span>
          <span className="text-[10px] text-slate-500 font-mono block">07:46 AM</span>
        </div>
      </div>

      {/* 2. Today's Period Timetable with Active Indicator */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
        <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
          <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
            Today's Timetable
          </span>
          <span className="text-[10px] text-blue-700 font-semibold">Period 3 Ongoing</span>
        </div>

        <div className="space-y-1.5">
          {TODAY_TIMETABLE_10A.slice(0, 4).map((slot) => {
            const isCurrent = slot.periodNumber === 3;
            return (
              <div
                key={slot.periodNumber}
                className={`p-2 rounded border flex items-center justify-between transition-colors ${
                  isCurrent
                    ? 'bg-blue-50/80 border-blue-300 ring-1 ring-blue-300 font-semibold'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    P{slot.periodNumber}
                  </span>
                  <div>
                    <p className="text-slate-900 font-medium">{slot.subject}</p>
                    <p className="text-[10px] text-slate-400">
                      {slot.teacherName} • {slot.roomNumber}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-slate-500">{slot.startTime}</span>
              </div>
            );
          })}
        </div>

        <Link
          href="/student/schedule"
          className="text-[11px] text-navy-800 font-semibold flex items-center justify-end gap-1 pt-1"
        >
          <span>View Full Schedule</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* 3. Pending Homework Countdown */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
        <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
          <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
            Pending Homework
          </span>
          <Badge variant="warning">{homework.length} Active</Badge>
        </div>

        <div className="space-y-2">
          {homework.slice(0, 2).map((hw) => (
            <div key={hw.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-900 line-clamp-1">{hw.title}</span>
                <span className="font-mono text-[10px] text-rose-700 font-bold ml-1 whitespace-nowrap">
                  Due {hw.dueDate}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 line-clamp-1">{hw.description}</p>
              <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-[10px]">
                <span className="text-slate-500">{hw.subject}</span>
                <Link href="/student/academics" className="text-navy-900 font-semibold underline">
                  Upload Solution
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Upcoming Examination Countdown */}
      <div className="bg-navy-950 text-white rounded-lg p-3.5 shadow-sm space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] text-navy-300 uppercase tracking-wider font-semibold">
              Upcoming CBSE Examination
            </span>
            <h3 className="font-bold text-sm text-white mt-0.5">Pre-Board Examination I</h3>
            <p className="text-[11px] text-navy-200">Starting from 15 November 2026</p>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-400 text-navy-950 font-bold font-mono text-[10px]">
            51 Days Left
          </span>
        </div>

        <div className="pt-2 border-t border-navy-900 flex justify-between items-center text-[10px] text-navy-300">
          <span>Subject: Mathematics (Standard)</span>
          <Link href="/student/schedule" className="text-amber-300 font-semibold flex items-center gap-1">
            <span>View Date-Sheet</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* 5. Institutional Announcements */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
        <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block border-b border-slate-100 pb-1.5">
          Campus Announcements
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
    </div>
  );
}
