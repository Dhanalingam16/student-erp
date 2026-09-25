'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { CalendarCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function StudentAttendancePage() {
  const { students } = useERPStore();
  const student = students[0]; // Aarav Sharma

  const subjectAttendance = [
    { subject: 'Mathematics (Standard)', totalClasses: 42, attended: 40, percentage: 95.2 },
    { subject: 'Science (Physics, Chem, Bio)', totalClasses: 48, attended: 45, percentage: 93.8 },
    { subject: 'English Language & Literature', totalClasses: 36, attended: 35, percentage: 97.2 },
    { subject: 'Social Science', totalClasses: 38, attended: 35, percentage: 92.1 },
    { subject: 'Computer Applications & AI', totalClasses: 24, attended: 23, percentage: 95.8 },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Overall Score Card */}
      <div className="bg-navy-950 text-white rounded-lg p-5 shadow-sm text-center space-y-2">
        <span className="text-navy-300 text-[10px] font-semibold uppercase tracking-wider">
          Cumulative Attendance Ratio
        </span>
        <div className="py-1">
          <span className="text-3xl font-extrabold font-mono text-emerald-400">
            {student.overallAttendancePercentage}%
          </span>
        </div>
        <p className="text-[11px] text-navy-200">
          Eligible for CBSE Board Examinations (75% statutory threshold met)
        </p>
      </div>

      {/* Subject-wise Attendance Breakdown */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-3">
        <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
          Subject-Wise Attendance Tally
        </h2>

        <div className="space-y-3">
          {subjectAttendance.map((sub, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-slate-800">
                <span className="font-semibold">{sub.subject}</span>
                <span className="font-mono font-bold text-emerald-700">{sub.percentage}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${sub.percentage}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>{sub.attended} Attended</span>
                <span>{sub.totalClasses} Total Lectures</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
