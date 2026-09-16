'use client';

import React, { useState } from 'react';
import { mockAssignments } from '@school-erp/mock-data';
import { Button, Badge } from '@school-erp/ui';
import { Upload, CheckCircle, Clock } from 'lucide-react';

export default function StudentAssignmentsPage() {
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (id: string) => {
    setSubmittedId(id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">My Assignments & Homework Submissions</h1>
        <p className="text-xs text-slate-500 mt-1">Review active tasks, upload completed files & view grades</p>
      </div>

      <div className="space-y-4">
        {mockAssignments.map(asn => {
          const isDone = submittedId === asn.id;
          return (
            <div key={asn.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase">{asn.subject}</span>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{asn.title}</h3>
                </div>
                <Badge variant={isDone ? 'success' : 'warning'}>{isDone ? 'Submitted' : 'Pending'}</Badge>
              </div>
              <p className="text-xs text-slate-600">{asn.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500">Due: <strong className="text-slate-900">{asn.dueDate}</strong> • Max Marks: {asn.totalMarks}</span>
                {isDone ? (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Homework Submitted</span>
                ) : (
                  <Button variant="primary" size="sm" onClick={() => handleSubmit(asn.id)} leftIcon={<Upload className="w-4 h-4" />}>
                    Upload Homework File & Submit
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
