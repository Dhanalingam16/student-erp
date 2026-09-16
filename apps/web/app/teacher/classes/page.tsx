'use client';

import React from 'react';
import { mockClasses } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { GraduationCap, Users, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

export default function TeacherClassesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">My Assigned Classes</h1>
        <p className="text-xs text-slate-500 mt-1">Class rosters, subject teaching modules & quick attendance launching</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockClasses.map(cls => (
          <div key={cls.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{cls.className} - Section {cls.section}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{cls.roomNo} • {cls.studentCount} Students</p>
              </div>
              <Badge variant="info">Active Class</Badge>
            </div>
            <div className="flex gap-3">
              <Link href="/teacher/attendance" className="flex-1">
                <Button variant="primary" size="sm" className="w-full" leftIcon={<CalendarCheck className="w-4 h-4" />}>
                  Mark Attendance
                </Button>
              </Link>
              <Link href="/teacher/marks" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Marks Entry Sheet
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
