'use client';

import React from 'react';
import { mockCalendarEvents } from '@school-erp/mock-data';
import { CalendarDays, MapPin, Clock, Plus } from 'lucide-react';
import { Button, Badge } from '@school-erp/ui';

export default function SchoolEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">School Master Calendar & Events</h1>
          <p className="text-xs text-slate-500 mt-1">Academic calendar, PTM meetings, sports days & annual functions</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Schedule Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCalendarEvents.map(evt => (
          <div key={evt.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">{evt.title}</h3>
              <Badge variant="info">{evt.category}</Badge>
            </div>
            <p className="text-xs text-slate-600">{evt.description}</p>
            <div className="text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {evt.date} • {evt.time}</p>
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Location: {evt.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
