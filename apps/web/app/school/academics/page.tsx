'use client';

import React from 'react';
import { mockClasses } from '@school-erp/mock-data';
import { Button, Badge } from '@school-erp/ui';
import { GraduationCap, Clock, BookOpen, Plus } from 'lucide-react';

export default function AcademicsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Academic Structure & Timetable</h1>
          <p className="text-xs text-slate-500 mt-1">Classes, sections, curriculum mapping & master period schedules</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Add Class / Section
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockClasses.map(cls => (
          <div key={cls.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{cls.className} - Section {cls.section}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{cls.roomNo} • {cls.studentCount} Students</p>
              </div>
              <Badge variant="info">Active</Badge>
            </div>
            <div className="text-xs text-slate-600 space-y-1.5">
              <p><strong className="text-slate-900">Class Teacher:</strong> {cls.classTeacherName}</p>
              <p><strong className="text-slate-900">Subjects Taught:</strong> Mathematics, Physics, Chemistry, English, Computer Science</p>
            </div>
            <div className="pt-2 flex justify-end">
              <Button variant="outline" size="sm" leftIcon={<Clock className="w-3.5 h-3.5" />}>
                View Master Timetable
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
