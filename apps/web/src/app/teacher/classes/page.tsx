'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { Student } from '@/types';
import { Users, Phone, Mail, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TeacherClassesPage() {
  const { students } = useERPStore();
  const class10Students = students.filter((s) => s.classSection === '10-A');

  const columns: ColumnDef<Student>[] = [
    {
      header: 'Roll',
      accessorKey: 'rollNumber',
      sortable: true,
      className: 'w-16 font-mono font-bold',
    },
    {
      header: 'Student Name',
      accessorKey: 'fullName',
      sortable: true,
      cell: (st) => (
        <div>
          <span className="font-bold text-slate-900">{st.fullName}</span>
          <span className="block text-[10px] text-slate-400 font-mono">{st.admissionNo}</span>
        </div>
      ),
    },
    {
      header: 'Attendance %',
      accessorKey: 'overallAttendancePercentage',
      sortable: true,
      className: 'text-center font-mono font-bold text-emerald-700',
      cell: (st) => `${st.overallAttendancePercentage}%`,
    },
    {
      header: 'Parent / Guardian',
      accessorKey: 'parentName',
      cell: (st) => (
        <div>
          <span className="font-semibold text-slate-800">{st.parentName}</span>
          <span className="block text-[10px] text-slate-500 font-mono">{st.parentPhone}</span>
        </div>
      ),
    },
    {
      header: 'Blood Group',
      accessorKey: 'bloodGroup',
      className: 'font-mono text-center',
    },
    {
      header: 'Commute Mode',
      cell: (st) => (
        <span className="text-xs text-slate-600">
          {st.busRouteId ? `Bus ${st.busRouteId.toUpperCase()}` : st.isHostelite ? 'Hostel' : 'Private'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Class 10-A Student Roster
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Class Teacher: Mrs. Lakshmi Raman • Academic Session 2026–2027 • 36 Enrolled
          </p>
        </div>
      </div>

      <DataTable
        data={class10Students}
        columns={columns}
        searchPlaceholder="Search student name or roll number..."
        searchKey="fullName"
        exportFileName="class-10a-students-roster"
      />
    </div>
  );
}
