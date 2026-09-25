'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { HomeworkItem } from '@/types';
import { BookOpen, Plus, FileText, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddHomeworkModal } from '@/components/modals/AddHomeworkModal';

export default function TeacherHomeworkPage() {
  const { homework } = useERPStore();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const columns: ColumnDef<HomeworkItem>[] = [
    {
      header: 'Title & Chapter',
      accessorKey: 'title',
      sortable: true,
      cell: (hw) => (
        <div>
          <span className="font-bold text-slate-900">{hw.title}</span>
          <span className="block text-[11px] text-slate-500 line-clamp-1">{hw.description}</span>
        </div>
      ),
    },
    {
      header: 'Subject & Class',
      accessorKey: 'subject',
      sortable: true,
      cell: (hw) => (
        <div>
          <span className="font-semibold text-slate-800">{hw.subject}</span>
          <span className="block text-[10px] text-slate-400">Class {hw.classSection}</span>
        </div>
      ),
    },
    {
      header: 'Assigned Date',
      accessorKey: 'assignedDate',
      sortable: true,
      className: 'font-mono text-slate-600',
    },
    {
      header: 'Due Date',
      accessorKey: 'dueDate',
      sortable: true,
      className: 'font-mono font-bold text-rose-700',
    },
    {
      header: 'Submissions',
      cell: (hw) => (
        <span className="font-mono text-xs">
          <span className="font-bold text-emerald-700">{hw.totalSubmissions}</span> / {hw.totalStudents} Turn-in
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Class Homework & Digital Assignments
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Publish daily exercises, attach worksheet PDFs, and track student completion status.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="h-3.5 w-3.5 mr-1" />
          Assign Homework
        </Button>
      </div>

      <DataTable
        data={homework}
        columns={columns}
        searchPlaceholder="Search homework by title or subject..."
        searchKey="title"
        exportFileName="class-homework-list"
      />

      <AddHomeworkModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </div>
  );
}
