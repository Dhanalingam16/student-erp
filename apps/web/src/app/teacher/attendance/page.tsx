'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { AttendanceRecord } from '@/types';
import { CalendarCheck, CheckCheck, Clock, X, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AttendanceEntryModal } from '@/components/modals/AttendanceEntryModal';

export default function TeacherAttendancePage() {
  const { attendance } = useERPStore();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      header: 'Roll',
      accessorKey: 'rollNumber',
      sortable: true,
      className: 'w-16 font-mono font-bold text-slate-900',
    },
    {
      header: 'Student Name',
      accessorKey: 'studentName',
      sortable: true,
      className: 'font-bold text-slate-900',
    },
    {
      header: 'Class',
      accessorKey: 'classSection',
      cell: (r) => <span>Class {r.classSection}</span>,
    },
    {
      header: 'Date',
      accessorKey: 'date',
      sortable: true,
      className: 'font-mono text-slate-600',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      className: 'text-center',
      cell: (r) => (
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
            r.status === 'present'
              ? 'bg-emerald-100 text-emerald-800'
              : r.status === 'late'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          {r.status}
        </span>
      ),
    },
    {
      header: 'Check-In',
      accessorKey: 'checkInTime',
      className: 'font-mono text-slate-500',
      cell: (r) => r.checkInTime || '—',
    },
    {
      header: 'Remarks / Absence Reason',
      accessorKey: 'remarks',
      className: 'text-slate-600 italic',
      cell: (r) => r.remarks || '—',
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-emerald-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Class 10-A Morning Attendance Register
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Verify student presence, record late arrivals, and transmit automated SMS to parents.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsRegisterOpen(true)}>
          <CheckCheck className="h-3.5 w-3.5 mr-1" />
          Mark Today's Attendance
        </Button>
      </div>

      <DataTable
        data={attendance}
        columns={columns}
        searchPlaceholder="Search attendance record by student or roll..."
        searchKey="studentName"
        exportFileName="class-10a-attendance"
      />

      <AttendanceEntryModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
}
