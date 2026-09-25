'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { StudentMarks } from '@/types';
import { FileSpreadsheet, Edit, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarksEntryModal } from '@/components/modals/MarksEntryModal';

export default function TeacherMarksPage() {
  const { marks } = useERPStore();
  const [isEntryOpen, setIsEntryOpen] = useState(false);

  const columns: ColumnDef<StudentMarks>[] = [
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
      header: 'Marks (Max 80)',
      accessorKey: 'marksObtained',
      sortable: true,
      className: 'font-mono font-bold text-slate-900 text-center',
    },
    {
      header: 'CBSE Grade',
      accessorKey: 'grade',
      sortable: true,
      className: 'text-center font-mono font-bold',
      cell: (m) => (
        <span
          className={`px-2 py-0.5 rounded text-xs ${
            m.grade.startsWith('A')
              ? 'bg-emerald-100 text-emerald-800'
              : m.grade.startsWith('B')
              ? 'bg-blue-100 text-blue-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {m.grade}
        </span>
      ),
    },
    {
      header: 'Teacher Remarks',
      accessorKey: 'remarks',
      className: 'text-slate-600 text-xs italic',
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-amber-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Half-Yearly Examination 2026: Mathematics Tabulation
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Class 10-A • Subject Code: 041 (Standard Mathematics) • Maximum Theory Marks: 80
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsEntryOpen(true)}>
          <Edit className="h-3.5 w-3.5 mr-1" />
          Edit Tabulation Scores
        </Button>
      </div>

      <DataTable
        data={marks}
        columns={columns}
        searchPlaceholder="Search student marks..."
        searchKey="studentName"
        exportFileName="class-10a-math-tabulation"
      />

      <MarksEntryModal isOpen={isEntryOpen} onClose={() => setIsEntryOpen(false)} />
    </div>
  );
}
