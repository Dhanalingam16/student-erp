'use client';

import React from 'react';
import { mockAssignments } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { BookCheck, Plus } from 'lucide-react';

export default function TeacherAssignmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Assignments & Homework Evaluator</h1>
          <p className="text-xs text-slate-500 mt-1">Create homework, review student submissions & give feedback</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Create New Assignment
        </Button>
      </div>

      <div className="space-y-4">
        {mockAssignments.map(asn => (
          <div key={asn.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">{asn.subject} • Class {asn.classSection}</span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{asn.title}</h3>
              </div>
              <Badge variant="success">{asn.status}</Badge>
            </div>
            <p className="text-xs text-slate-600">{asn.description}</p>
            <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-100">
              <span>Submissions: <strong className="text-slate-900">{asn.submissionCount}/{asn.totalStudents} Students</strong></span>
              <span>Due Date: <strong className="text-slate-900">{asn.dueDate}</strong></span>
              <Button variant="outline" size="sm">Evaluate Submissions</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
