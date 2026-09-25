'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { Student, Teacher, Parent } from '@/types';
import { formatCurrencyINR } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { CollectFeeModal } from '@/components/modals/CollectFeeModal';
import {
  Users,
  GraduationCap,
  HeartHandshake,
  UserCheck,
  Eye,
  CreditCard,
  Printer,
  Phone,
  Mail,
  MapPin,
  Bus,
} from 'lucide-react';

export default function PeopleDirectoryPage() {
  const { students, teachers, parents } = useERPStore();
  const [activeTab, setActiveTab] = useState<'students' | 'teachers' | 'parents'>('students');
  const [inspectStudent, setInspectStudent] = useState<Student | null>(null);
  const [feeCollectStudent, setFeeCollectStudent] = useState<Student | null>(null);

  // Student Columns
  const studentColumns: ColumnDef<Student>[] = [
    {
      header: 'Roll',
      accessorKey: 'rollNumber',
      sortable: true,
      className: 'w-16 font-mono font-semibold',
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
      header: 'Class',
      accessorKey: 'classSection',
      sortable: true,
      className: 'w-20 font-medium',
      cell: (st) => <span>Class {st.classSection}</span>,
    },
    {
      header: 'Parent Contact',
      accessorKey: 'parentName',
      cell: (st) => (
        <div>
          <span className="text-slate-800">{st.parentName}</span>
          <span className="block text-[10px] text-slate-400 font-mono">{st.parentPhone}</span>
        </div>
      ),
    },
    {
      header: 'Attendance',
      accessorKey: 'overallAttendancePercentage',
      sortable: true,
      className: 'w-24 text-center',
      cell: (st) => (
        <span
          className={`font-mono font-semibold text-xs ${
            st.overallAttendancePercentage >= 90
              ? 'text-emerald-700'
              : st.overallAttendancePercentage >= 75
              ? 'text-amber-700'
              : 'text-rose-700'
          }`}
        >
          {st.overallAttendancePercentage}%
        </span>
      ),
    },
    {
      header: 'Fee Status',
      accessorKey: 'feeStatus',
      sortable: true,
      className: 'w-28 text-center',
      cell: (st) => (
        <div>
          <Badge
            variant={
              st.feeStatus === 'paid'
                ? 'success'
                : st.feeStatus === 'pending'
                ? 'warning'
                : st.feeStatus === 'partial'
                ? 'info'
                : 'danger'
            }
          >
            {st.feeStatus.toUpperCase()}
          </Badge>
          {st.pendingFeeAmount > 0 && (
            <span className="block font-mono text-[10px] text-slate-500 mt-0.5">
              {formatCurrencyINR(st.pendingFeeAmount)}
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      cell: (st) => (
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-2 text-[11px]"
            onClick={() => setInspectStudent(st)}
            title="View 360° Profile"
          >
            <Eye className="h-3 w-3 mr-1" />
            Profile
          </Button>
          {st.pendingFeeAmount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 text-[11px] text-emerald-700 hover:bg-emerald-50"
              onClick={() => setFeeCollectStudent(st)}
              title="Collect Fee"
            >
              <CreditCard className="h-3 w-3" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  // Teacher Columns
  const teacherColumns: ColumnDef<Teacher>[] = [
    {
      header: 'Emp Code',
      accessorKey: 'employeeCode',
      sortable: true,
      className: 'w-28 font-mono',
    },
    {
      header: 'Teacher Name',
      accessorKey: 'name',
      sortable: true,
      cell: (t) => (
        <div>
          <span className="font-bold text-slate-900">{t.name}</span>
          <span className="block text-[10px] text-slate-400">{t.qualification}</span>
        </div>
      ),
    },
    {
      header: 'Designation & Dept',
      accessorKey: 'designation',
      cell: (t) => (
        <div>
          <span className="text-slate-800">{t.designation}</span>
          <span className="block text-[10px] text-slate-400">Dept: {t.department}</span>
        </div>
      ),
    },
    {
      header: 'Class Teacher',
      accessorKey: 'classSection',
      cell: (t) => (t.isClassTeacher ? <Badge variant="info">Class {t.classSection}</Badge> : '—'),
    },
    {
      header: 'Contact',
      accessorKey: 'phone',
      cell: (t) => (
        <div>
          <span className="font-mono text-slate-700">{t.phone}</span>
          <span className="block text-[10px] text-slate-400">{t.email}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Title & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-base font-bold text-slate-900 tracking-tight">Institutional People Directory</h1>
          <p className="text-xs text-slate-500">
            Comprehensive register of students, faculty, and parent guardians.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              activeTab === 'students'
                ? 'bg-white text-navy-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Students ({students.length})
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
              activeTab === 'teachers'
                ? 'bg-white text-navy-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Teachers ({teachers.length})
          </button>
        </div>
      </div>

      {/* Tables based on active tab */}
      {activeTab === 'students' ? (
        <DataTable
          data={students}
          columns={studentColumns}
          searchPlaceholder="Search student by name, roll, or admission number..."
          searchKey="fullName"
          filterOptions={[
            {
              label: 'Class',
              key: 'classSection',
              options: [
                { label: 'Class 10-A', value: '10-A' },
                { label: 'Class 6-B', value: '6-B' },
              ],
            },
            {
              label: 'Fee Status',
              key: 'feeStatus',
              options: [
                { label: 'Paid', value: 'paid' },
                { label: 'Pending', value: 'pending' },
                { label: 'Partial', value: 'partial' },
                { label: 'Overdue', value: 'overdue' },
              ],
            },
          ]}
          exportFileName="students-directory"
        />
      ) : (
        <DataTable
          data={teachers}
          columns={teacherColumns}
          searchPlaceholder="Search teacher by name or employee code..."
          searchKey="name"
          exportFileName="teachers-directory"
        />
      )}

      {/* 360-Degree Student Profile Modal */}
      {inspectStudent && (
        <Dialog
          isOpen={!!inspectStudent}
          onClose={() => setInspectStudent(null)}
          title={`Student Profile: ${inspectStudent.fullName}`}
          description={`Admission No: ${inspectStudent.admissionNo} • Class ${inspectStudent.classSection} • Roll ${inspectStudent.rollNumber}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            {/* Header info */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-navy-900 text-white font-bold text-lg flex items-center justify-center">
                  {inspectStudent.firstName[0]}
                  {inspectStudent.lastName[0]}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{inspectStudent.fullName}</h3>
                  <p className="text-slate-500">
                    Gender: {inspectStudent.gender.toUpperCase()} • Blood Group: {inspectStudent.bloodGroup} •
                    DOB: {inspectStudent.dob}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={inspectStudent.feeStatus === 'paid' ? 'success' : 'warning'}>
                  {inspectStudent.feeStatus.toUpperCase()}
                </Badge>
                <p className="text-xs font-mono font-bold mt-1 text-slate-700">
                  Attendance: {inspectStudent.overallAttendancePercentage}%
                </p>
              </div>
            </div>

            {/* Grid of details */}
            <div className="grid grid-cols-2 gap-4 border border-slate-200 rounded p-4">
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Guardian Details</p>
                <p className="font-semibold text-slate-900 mt-0.5">{inspectStudent.parentName}</p>
                <p className="text-slate-600 flex items-center gap-1 mt-1 font-mono">
                  <Phone className="h-3 w-3" /> {inspectStudent.parentPhone}
                </p>
                <p className="text-slate-600 flex items-center gap-1 font-mono">
                  <Mail className="h-3 w-3" /> {inspectStudent.parentEmail}
                </p>
              </div>

              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Transport & Boarding</p>
                {inspectStudent.busRouteId ? (
                  <div className="mt-0.5 space-y-0.5">
                    <p className="font-semibold text-slate-900 flex items-center gap-1">
                      <Bus className="h-3 w-3 text-blue-600" /> Route 12 (Tata Starbus)
                    </p>
                    <p className="text-slate-600">Stop: {inspectStudent.busStopName}</p>
                  </div>
                ) : inspectStudent.isHostelite ? (
                  <p className="font-semibold text-slate-900 mt-0.5">{inspectStudent.hostelRoom}</p>
                ) : (
                  <p className="text-slate-500 mt-0.5">Private Commuter</p>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded">
              <p className="text-slate-400 font-semibold uppercase text-[10px]">Residential Address</p>
              <p className="text-slate-700 mt-0.5 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                {inspectStudent.address}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="h-3.5 w-3.5 mr-1" />
                Print Student Card
              </Button>
              <Button variant="primary" size="sm" onClick={() => setInspectStudent(null)}>
                Close
              </Button>
            </div>
          </div>
        </Dialog>
      )}

      {/* Collect Fee modal for this student */}
      {feeCollectStudent && (
        <CollectFeeModal
          isOpen={!!feeCollectStudent}
          onClose={() => setFeeCollectStudent(null)}
          student={feeCollectStudent}
        />
      )}
    </div>
  );
}
