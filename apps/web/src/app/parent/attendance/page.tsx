'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { CalendarCheck, CheckCircle2, Clock, X, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ParentAttendancePage() {
  const { selectedChild } = useERPStore();

  // Simulated September 2026 Calendar grid days (1 to 30)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // Status mapping
  const getDayStatus = (day: number) => {
    if (day === 6 || day === 13 || day === 20 || day === 27) return 'sunday';
    if (day === 12 || day === 26) return 'saturday';
    if (day > 25) return 'upcoming';
    if (day === 14) return 'absent'; // Sick leave
    if (day === 22) return 'late';
    return 'present';
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Attendance Stats Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-slate-900">Attendance Summary</h2>
            <p className="text-[11px] text-slate-500">Academic Session 2026–2027</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold font-mono text-emerald-700">
              {selectedChild.overallAttendancePercentage}%
            </span>
            <span className="text-[10px] text-slate-400 block">Overall Target: 75%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
          <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
            <span className="text-emerald-800 font-bold font-mono text-sm">82</span>
            <span className="block text-[10px] text-emerald-600">Present Days</span>
          </div>
          <div className="p-2 bg-rose-50 rounded border border-rose-100">
            <span className="text-rose-800 font-bold font-mono text-sm">3</span>
            <span className="block text-[10px] text-rose-600">Absences</span>
          </div>
          <div className="p-2 bg-amber-50 rounded border border-amber-100">
            <span className="text-amber-800 font-bold font-mono text-sm">2</span>
            <span className="block text-[10px] text-amber-600">Late Arrivals</span>
          </div>
        </div>
      </div>

      {/* Monthly Heatmap Calendar: September 2026 */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            September 2026 Calendar
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Working Days: 22</span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px]">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={i} className="font-bold text-slate-400 py-1">
              {d}
            </div>
          ))}

          {/* Blank offset for Tuesday start (Sep 1 was Tuesday) */}
          <div className="p-2" />

          {daysInMonth.map((day) => {
            const st = getDayStatus(day);
            return (
              <div
                key={day}
                className={`py-2 rounded font-bold transition-all text-xs ${
                  st === 'present'
                    ? 'bg-emerald-100 text-emerald-800'
                    : st === 'absent'
                    ? 'bg-rose-500 text-white'
                    : st === 'late'
                    ? 'bg-amber-400 text-navy-950'
                    : st === 'sunday'
                    ? 'bg-slate-100 text-slate-400'
                    : st === 'saturday'
                    ? 'bg-slate-100 text-slate-400'
                    : 'bg-slate-50 text-slate-300'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-600">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Present
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block" /> Absent
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" /> Late
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-slate-200 inline-block" /> Weekend / Holiday
          </span>
        </div>
      </div>
    </div>
  );
}
