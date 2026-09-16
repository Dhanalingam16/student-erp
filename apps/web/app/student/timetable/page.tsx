'use client';

import React from 'react';

export default function StudentTimetablePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">Student Timetable & Class Schedule</h1>
        <p className="text-xs text-slate-500 mt-1">Grade 10-A • Room 204</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 text-xs text-slate-600">
        <p className="font-bold text-slate-900">Weekly Schedule Grid</p>
        <p className="mt-1">Period 1: Mathematics (09:00 - 10:00 AM)</p>
        <p className="mt-1">Period 2: Physics (10:00 - 11:00 AM)</p>
        <p className="mt-1">Period 3: English (11:30 - 12:30 PM)</p>
      </div>
    </div>
  );
}
