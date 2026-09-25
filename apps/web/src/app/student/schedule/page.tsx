'use client';

import React, { useState } from 'react';
import { TODAY_TIMETABLE_10A } from '@/lib/demo-data';
import { Clock, Calendar, FileSpreadsheet, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function StudentSchedulePage() {
  const [activeTab, setActiveTab] = useState<'timetable' | 'exams'>('timetable');

  const examDatesheet = [
    { date: '15 Nov 2026', day: 'Monday', subject: 'Mathematics (Standard)', time: '09:00 AM – 12:00 PM', room: 'Hall A' },
    { date: '18 Nov 2026', day: 'Thursday', subject: 'Science (Theory)', time: '09:00 AM – 12:00 PM', room: 'Hall A' },
    { date: '21 Nov 2026', day: 'Sunday', subject: 'Social Science', time: '09:00 AM – 12:00 PM', room: 'Hall B' },
    { date: '24 Nov 2026', day: 'Wednesday', subject: 'English Language & Literature', time: '09:00 AM – 12:00 PM', room: 'Hall A' },
    { date: '27 Nov 2026', day: 'Saturday', subject: 'Computer Applications', time: '09:00 AM – 11:00 AM', room: 'Lab 3' },
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <div>
            <h1 className="font-bold text-slate-900 text-sm">Class 10-A Schedules</h1>
            <p className="text-[10px] text-slate-500">Timetable & Examination Date-Sheets</p>
          </div>
        </div>

        <div className="flex bg-slate-100 p-0.5 rounded border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-2.5 py-1 font-semibold rounded ${
              activeTab === 'timetable' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
            }`}
          >
            Timetable
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-2.5 py-1 font-semibold rounded ${
              activeTab === 'exams' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
            }`}
          >
            Pre-Boards
          </button>
        </div>
      </div>

      {activeTab === 'timetable' ? (
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
          <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block border-b border-slate-100 pb-1.5">
            Today's Academic Periods (Friday)
          </span>

          <div className="space-y-2">
            {TODAY_TIMETABLE_10A.map((slot) => (
              <div
                key={slot.periodNumber}
                className={`p-2.5 rounded border flex justify-between items-center ${
                  slot.periodNumber === 4 ? 'bg-amber-50/50 border-amber-200 italic' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded bg-navy-900 text-white font-mono font-bold flex items-center justify-center text-[10px]">
                    {slot.periodNumber}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{slot.subject}</p>
                    <p className="text-[10px] text-slate-400">
                      {slot.teacherName} • {slot.roomNumber}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-slate-600 font-medium">{slot.startTime}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
          <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block border-b border-slate-100 pb-1.5">
            Pre-Board Examination I (Date-Sheet)
          </span>

          <div className="space-y-2">
            {examDatesheet.map((ex, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900">{ex.subject}</span>
                  <span className="font-mono font-bold text-blue-700">{ex.date}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>{ex.time}</span>
                  <span>Venue: {ex.room}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
