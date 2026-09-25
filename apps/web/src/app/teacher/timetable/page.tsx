'use client';

import React from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TeacherTimetablePage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const periods = [
    { period: 1, time: '08:00 – 08:45 AM', mon: '10-A (Math)', tue: '10-A (Math)', wed: '10-A (Math)', thu: '10-A (Math)', fri: '10-A (Math)', sat: 'Remedial' },
    { period: 2, time: '08:45 – 09:30 AM', mon: 'Free / Dept', tue: '11-A (Math)', wed: '11-A (Math)', thu: 'Free / Prep', fri: '10-B (Math)', sat: 'House Activity' },
    { period: 3, time: '09:30 – 10:15 AM', mon: '11-A (Math)', tue: 'Free / Prep', wed: '10-B (Math)', thu: '11-A (Math)', fri: '11-A (Math)', sat: 'PTM / Club' },
    { period: 4, time: '10:15 – 10:35 AM', mon: 'RECESS', tue: 'RECESS', wed: 'RECESS', thu: 'RECESS', fri: 'RECESS', sat: 'RECESS' },
    { period: 5, time: '10:35 – 11:20 AM', mon: '10-B (Math)', tue: '10-B (Math)', wed: 'Free', thu: '10-B (Math)', fri: '10-B (Math)', sat: 'Staff Meeting' },
    { period: 6, time: '11:20 – 12:05 PM', mon: '12-A (Math)', tue: '12-A (Math)', wed: '12-A (Math)', thu: '12-A (Math)', fri: 'Free / Eval', sat: 'Free' },
    { period: 7, time: '12:05 – 12:50 PM', mon: 'Free / Library', tue: 'Lab Supervision', wed: '10-A (Math)', thu: 'Free', fri: '12-A (Math)', sat: 'Depart' },
    { period: 8, time: '12:50 – 01:30 PM', mon: '10-A (Tutorial)', tue: '11-A (Problem)', wed: 'Free', thu: '12-A (Doubt)', fri: 'Class Teacher Hour', sat: 'Depart' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Faculty Weekly Teaching Schedule
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Mrs. Lakshmi Raman • Senior PGT Mathematics • 24 Teaching Periods per Week
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs overflow-x-auto text-xs">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
            <tr>
              <th className="p-2.5 w-16">Period</th>
              <th className="p-2.5 w-28">Time</th>
              {days.map((d) => (
                <th key={d} className="p-2.5">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {periods.map((row) => (
              <tr key={row.period} className={row.period === 4 ? 'bg-amber-50/50 font-sans' : 'hover:bg-slate-50'}>
                <td className="p-2.5 font-bold text-slate-900">P{row.period}</td>
                <td className="p-2.5 text-slate-500 text-[11px]">{row.time}</td>
                <td className={`p-2.5 ${row.mon.includes('10-A') ? 'font-bold text-navy-950 bg-blue-50/50' : 'text-slate-700'}`}>{row.mon}</td>
                <td className={`p-2.5 ${row.tue.includes('10-A') ? 'font-bold text-navy-950 bg-blue-50/50' : 'text-slate-700'}`}>{row.tue}</td>
                <td className={`p-2.5 ${row.wed.includes('10-A') ? 'font-bold text-navy-950 bg-blue-50/50' : 'text-slate-700'}`}>{row.wed}</td>
                <td className={`p-2.5 ${row.thu.includes('10-A') ? 'font-bold text-navy-950 bg-blue-50/50' : 'text-slate-700'}`}>{row.thu}</td>
                <td className={`p-2.5 ${row.fri.includes('10-A') ? 'font-bold text-navy-950 bg-blue-50/50' : 'text-slate-700'}`}>{row.fri}</td>
                <td className="p-2.5 text-slate-500">{row.sat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
