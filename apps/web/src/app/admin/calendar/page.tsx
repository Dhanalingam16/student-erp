'use client';

import React from 'react';
import { Calendar as CalendarIcon, Plus, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CalendarPage() {
  const events = [
    { title: 'CBSE Pre-Board Examination I Begins', date: '15 Nov 2026', time: '09:00 AM', category: 'Examination', venue: 'Senior Examination Hall', attendees: 'Class 10 & 12' },
    { title: 'Parent-Teacher Meeting (PTM) Term 2', date: '10 Oct 2026', time: '08:30 AM – 01:30 PM', category: 'Parent Meeting', venue: 'Respective Classrooms', attendees: 'All Parents' },
    { title: 'Mahatma Gandhi Jayanti (National Holiday)', date: '02 Oct 2026', time: 'Full Day', category: 'Gazetted Holiday', venue: 'Campus Closed', attendees: 'Whole Institution' },
    { title: 'Annual Inter-School Science & AI Exhibition', date: '28 Oct 2026', time: '10:00 AM – 04:00 PM', category: 'Academic Event', venue: 'Auditorium & Labs', attendees: 'Middle & Senior Wings' },
    { title: 'Dussehra / Vijayadashami Break', date: '20 Oct 2026', time: 'Full Day', category: 'Gazetted Holiday', venue: 'Campus Closed', attendees: 'Whole Institution' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              School Academic Calendar & Institutional Events
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Gazetted holidays, examination schedules, Parent-Teacher Meetings (PTMs), and sports meets.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Schedule Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {events.map((ev, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-2.5">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-sm text-slate-900">{ev.title}</span>
                <p className="text-slate-500 text-[11px] mt-0.5">{ev.attendees}</p>
              </div>
              <Badge variant={ev.category === 'Gazetted Holiday' ? 'slate' : ev.category === 'Examination' ? 'danger' : 'info'}>
                {ev.category}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-slate-600 font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
                <span>{ev.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>{ev.time}</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 text-slate-700">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{ev.venue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
