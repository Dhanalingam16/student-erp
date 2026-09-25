'use client';

import React, { useState } from 'react';
import { SCHOOL_CLASSES, SUBJECTS_CLASS_10 } from '@/lib/constants';
import { TODAY_TIMETABLE_10A } from '@/lib/demo-data';
import { GraduationCap, BookOpen, Clock, Users, Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AcademicsPage() {
  const [selectedClass, setSelectedClass] = useState('10-A');

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Academic Curriculum, Classes & Timetable
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Class sections, subject teacher allocations, CBSE syllabus blueprints, and master timetable grid.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Assign Subject
        </Button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {SCHOOL_CLASSES.map((cls) => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
              selectedClass === cls.id
                ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-base">Class {cls.id}</span>
              <span
                className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                  selectedClass === cls.id ? 'bg-navy-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {cls.stream}
              </span>
            </div>
            <p className={`text-[11px] mt-1 ${selectedClass === cls.id ? 'text-slate-300' : 'text-slate-500'}`}>
              CT: {cls.classTeacher}
            </p>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200/20 text-[10px]">
              <span>{cls.room}</span>
              <span className="font-mono">{cls.totalStudents} Students</span>
            </div>
          </div>
        ))}
      </div>

      {/* Master Timetable Grid for Selected Class */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Master Weekly Timetable — Class {selectedClass}
            </h3>
            <p className="text-slate-500 text-[11px]">8 Academic Periods • Morning Assembly at 07:45 AM</p>
          </div>
          <Badge variant="info">Active Schedule</Badge>
        </div>

        <div className="border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
              <tr>
                <th className="py-2.5 px-3 w-20">Period</th>
                <th className="py-2.5 px-3 w-32">Time Slot</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Faculty In-Charge</th>
                <th className="py-2.5 px-3">Room / Facility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TODAY_TIMETABLE_10A.map((slot) => (
                <tr
                  key={slot.periodNumber}
                  className={`hover:bg-slate-50 ${slot.periodNumber === 4 ? 'bg-amber-50/40 italic' : ''}`}
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    Period {slot.periodNumber}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    {slot.startTime} – {slot.endTime}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{slot.subject}</td>
                  <td className="py-2.5 px-3 text-slate-700">{slot.teacherName}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{slot.roomNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
