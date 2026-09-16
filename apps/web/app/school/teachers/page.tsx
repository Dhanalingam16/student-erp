'use client';

import React from 'react';
import { mockTeachers } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { Plus, Briefcase, Mail, Phone, BookOpen } from 'lucide-react';

export default function TeachersDirectoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Teachers & Faculty Directory</h1>
          <p className="text-xs text-slate-500 mt-1">250 Active Staff Members across Departments</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Add Teacher / Staff
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTeachers.map(teacher => (
          <div key={teacher.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-4">
            <img src={teacher.avatar} alt="" className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-100" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">{teacher.name}</h3>
                <Badge variant="success">{teacher.status}</Badge>
              </div>
              <p className="text-xs text-blue-600 font-semibold mt-0.5">{teacher.designation}</p>
              <p className="text-[11px] text-slate-500 mt-1">Qualification: {teacher.qualification}</p>
              
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-400" /> {teacher.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> {teacher.phone}</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400">Classes:</span>
                {teacher.classesAssigned.map(cls => (
                  <span key={cls} className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded text-[10px] font-bold">
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
