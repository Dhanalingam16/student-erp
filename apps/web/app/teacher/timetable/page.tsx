'use client';

import React from 'react';
import { Clock } from 'lucide-react';

export default function TeacherTimetablePage() {
  const schedule = [
    { period: 'Period 1 (09:00 - 10:00)', mon: 'Grade 10-A Maths (Room 204)', tue: 'Grade 10-B Maths', wed: 'Grade 10-A Maths', thu: 'Grade 12-A Maths', fri: 'Grade 10-A Maths' },
    { period: 'Period 2 (10:00 - 11:00)', mon: 'Free / Remedial', tue: 'Grade 10-A Maths', wed: 'Free', thu: 'Grade 10-B Maths', fri: 'Free' },
    { period: 'Period 3 (11:30 - 12:30)', mon: 'Grade 10-B Maths (Room 205)', tue: 'Free', wed: 'Grade 12-A Maths', thu: 'Free', fri: 'Grade 10-B Maths' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">Faculty Weekly Timetable Grid</h1>
        <p className="text-xs text-slate-500 mt-1">Ms. Priya Sundaram • Academic Term 2026-27</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
            <tr>
              <th className="py-3 px-4">Period / Time</th>
              <th className="py-3 px-4">Monday</th>
              <th className="py-3 px-4">Tuesday</th>
              <th className="py-3 px-4">Wednesday</th>
              <th className="py-3 px-4">Thursday</th>
              <th className="py-3 px-4">Friday</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {schedule.map((s, i) => (
              <tr key={i}>
                <td className="py-3.5 px-4 font-bold text-slate-900 bg-slate-50/50">{s.period}</td>
                <td className="py-3.5 px-4">{s.mon}</td>
                <td className="py-3.5 px-4">{s.tue}</td>
                <td className="py-3.5 px-4">{s.wed}</td>
                <td className="py-3.5 px-4">{s.thu}</td>
                <td className="py-3.5 px-4">{s.fri}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
