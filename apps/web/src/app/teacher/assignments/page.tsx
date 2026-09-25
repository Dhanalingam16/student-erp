'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { AssignmentSubmission } from '@/types';
import { FileCheck2, CheckCircle2, Star, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';

export default function TeacherAssignmentsPage() {
  const { submissions, gradeSubmission } = useERPStore();
  const [selectedSub, setSelectedSub] = useState<AssignmentSubmission | null>(null);
  const [marks, setMarks] = useState<number>(18);
  const [feedback, setFeedback] = useState<string>('Well solved with clear steps.');

  const handleSaveGrade = () => {
    if (!selectedSub) return;
    gradeSubmission(selectedSub.id, marks, feedback);
    setSelectedSub(null);
  };

  const columns: ColumnDef<AssignmentSubmission>[] = [
    {
      header: 'Roll',
      accessorKey: 'rollNumber',
      sortable: true,
      className: 'w-16 font-mono font-bold',
    },
    {
      header: 'Student Name',
      accessorKey: 'studentName',
      sortable: true,
      className: 'font-bold text-slate-900',
    },
    {
      header: 'Turn-in Time',
      accessorKey: 'submittedAt',
      sortable: true,
      className: 'font-mono text-slate-600',
    },
    {
      header: 'Review Status',
      accessorKey: 'status',
      sortable: true,
      cell: (s) => (
        <Badge variant={s.status === 'graded' ? 'success' : 'warning'}>
          {s.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: 'Score / Max',
      cell: (s) => (
        <span className="font-mono font-bold">
          {s.marksObtained !== undefined ? (
            <span className="text-emerald-700">{s.marksObtained}</span>
          ) : (
            <span className="text-slate-400">—</span>
          )}{' '}
          / {s.maxMarks}
        </span>
      ),
    },
    {
      header: 'Teacher Remarks',
      accessorKey: 'teacherFeedback',
      className: 'text-slate-600 text-xs italic',
      cell: (s) => s.teacherFeedback || 'Pending evaluation',
    },
    {
      header: 'Action',
      cell: (s) => (
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-[11px]"
          onClick={() => {
            setSelectedSub(s);
            setMarks(s.marksObtained ?? 18);
            setFeedback(s.teacherFeedback ?? 'Very good work!');
          }}
        >
          <Edit3 className="h-3 w-3 mr-1" />
          {s.status === 'graded' ? 'Edit Grade' : 'Grade'}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-5 w-5 text-emerald-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Homework Evaluation & Grading Desk
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Review student submitted homework solutions, score work out of 20, and leave formative remarks.
          </p>
        </div>
      </div>

      <DataTable
        data={submissions}
        columns={columns}
        searchPlaceholder="Search submissions by student name or roll..."
        searchKey="studentName"
        exportFileName="homework-submissions"
      />

      {/* Grading Modal */}
      {selectedSub && (
        <Dialog
          isOpen={!!selectedSub}
          onClose={() => setSelectedSub(null)}
          title={`Grade Submission: ${selectedSub.studentName}`}
          description={`Class 10-A • Roll ${selectedSub.rollNumber} • Submitted: ${selectedSub.submittedAt}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
              <span className="font-semibold text-slate-800">Submitted Work File</span>
              <p className="text-slate-600 font-mono text-[11px]">
                Aarav_Sharma_Math_Ex4.3_Solutions.pdf (4 pages, 2.1 MB)
              </p>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Marks Awarded (out of {selectedSub.maxMarks})
              </label>
              <input
                type="number"
                min={0}
                max={selectedSub.maxMarks}
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-slate-200 rounded font-mono font-bold text-slate-900 text-sm focus:ring-1 focus:ring-navy-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">Teacher Feedback Comment</label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy-600"
                placeholder="Give constructive feedback..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <Button variant="outline" size="sm" onClick={() => setSelectedSub(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveGrade}>
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Submit Grade
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
