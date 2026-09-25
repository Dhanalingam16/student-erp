'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { SUBJECTS_CLASS_10 } from '@/lib/constants';
import { BookOpen, CheckCircle, FileText, Download, Award, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ParentAcademicsPage() {
  const { selectedChild, homework } = useERPStore();

  return (
    <div className="space-y-4 text-xs">
      {/* Subjects Roster */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Enrolled Subjects (Class {selectedChild.classSection})
          </h2>
          <Badge variant="info">CBSE Curriculum</Badge>
        </div>

        <div className="space-y-2">
          {SUBJECTS_CLASS_10.map((sub) => (
            <div key={sub.code} className="p-2.5 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900">{sub.name}</span>
                <p className="text-[10px] text-slate-500 font-mono">Code: {sub.code} • Teacher: {sub.teacher}</p>
              </div>
              <span className="font-mono text-emerald-700 font-bold">A1 Grade</span>
            </div>
          ))}
        </div>
      </div>

      {/* Homework List */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2.5">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
          Active Assigned Homework
        </h3>

        <div className="space-y-2">
          {homework.map((hw) => (
            <div key={hw.id} className="p-3 border border-slate-200 rounded space-y-1.5">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-900">{hw.title}</span>
                <span className="font-mono font-bold text-rose-700 text-[10px] ml-2">Due {hw.dueDate}</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">{hw.description}</p>
              <div className="flex justify-between items-center pt-1 text-[10px] text-slate-400 border-t border-slate-100">
                <span>{hw.subject} • {hw.teacherName}</span>
                <span className="text-emerald-700 font-bold">Status: Submitted</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Formative Remarks */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
          Teacher Term Remarks
        </h3>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded space-y-1 text-slate-800">
          <div className="flex justify-between items-center">
            <span className="font-bold text-navy-950">Mrs. Lakshmi Raman (Class Teacher 10-A)</span>
            <span className="text-[10px] text-slate-500 font-mono">PTM Note</span>
          </div>
          <p className="italic text-[11px] text-slate-700">
            "{selectedChild.firstName} shows great academic dedication and analytical capability in Standard Mathematics. Commended for punctuality and disciplined notebook presentation."
          </p>
        </div>
      </div>
    </div>
  );
}
