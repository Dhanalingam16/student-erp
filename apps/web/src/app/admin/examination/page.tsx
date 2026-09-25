'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { ExamRecord, StudentMarks } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MarksEntryModal } from '@/components/modals/MarksEntryModal';
import { Dialog } from '@/components/ui/dialog';
import {
  FileSpreadsheet,
  Award,
  Printer,
  Calendar,
  CheckCircle2,
  Edit,
  FileCheck,
} from 'lucide-react';
import { CBSE_GRADING_SCALE, INSTITUTION_INFO } from '@/lib/constants';

export default function ExaminationPage() {
  const { exams, marks, students } = useERPStore();
  const [activeTab, setActiveTab] = useState<'schedules' | 'tabulation' | 'grading'>('tabulation');
  const [isMarksEntryOpen, setIsMarksEntryOpen] = useState(false);
  const [selectedStudentReport, setSelectedStudentReport] = useState<any | null>(null);

  // Columns for Scheduled Exams
  const examColumns: ColumnDef<ExamRecord>[] = [
    {
      header: 'Exam Title',
      accessorKey: 'title',
      sortable: true,
      className: 'font-bold text-slate-900',
    },
    {
      header: 'Class',
      accessorKey: 'classSection',
      sortable: true,
      className: 'w-24',
      cell: (ex) => <span>Class {ex.classSection}</span>,
    },
    {
      header: 'Subject',
      accessorKey: 'subject',
      sortable: true,
      className: 'font-medium text-slate-800',
    },
    {
      header: 'Date',
      accessorKey: 'examDate',
      sortable: true,
      className: 'font-mono text-slate-600',
    },
    {
      header: 'Max / Pass',
      cell: (ex) => (
        <span className="font-mono text-slate-700">
          {ex.maxMarks} / {ex.passingMarks}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      className: 'text-center',
      cell: (ex) => (
        <Badge variant={ex.status === 'published' ? 'success' : 'info'}>
          {ex.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: 'Action',
      cell: () => (
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-[11px]"
          onClick={() => setIsMarksEntryOpen(true)}
        >
          <Edit className="h-3 w-3 mr-1" />
          Marks
        </Button>
      ),
    },
  ];

  // Columns for Tabulation Sheet
  const tabulationColumns: ColumnDef<StudentMarks>[] = [
    {
      header: 'Roll',
      accessorKey: 'rollNumber',
      sortable: true,
      className: 'w-16 font-mono font-semibold',
    },
    {
      header: 'Student Name',
      accessorKey: 'studentName',
      sortable: true,
      className: 'font-bold text-slate-900',
    },
    {
      header: 'Mathematics (Max 80)',
      accessorKey: 'marksObtained',
      sortable: true,
      className: 'text-center font-mono font-bold text-slate-900',
    },
    {
      header: 'CBSE Grade',
      accessorKey: 'grade',
      sortable: true,
      className: 'text-center font-mono font-bold',
      cell: (m) => (
        <span
          className={`px-2 py-0.5 rounded text-xs ${
            m.grade === 'A1'
              ? 'bg-emerald-100 text-emerald-800'
              : m.grade === 'A2'
              ? 'bg-emerald-50 text-emerald-700'
              : m.grade.startsWith('B')
              ? 'bg-blue-50 text-blue-700'
              : 'bg-amber-50 text-amber-700'
          }`}
        >
          {m.grade}
        </span>
      ),
    },
    {
      header: 'Evaluation Remarks',
      accessorKey: 'remarks',
      className: 'text-slate-600 text-xs italic',
    },
    {
      header: 'Report Card',
      cell: (m) => (
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-[11px]"
          onClick={() => {
            const st = students.find((s) => s.id === m.studentId) || students[0];
            setSelectedStudentReport({ ...m, student: st });
          }}
        >
          <FileCheck className="h-3 w-3 mr-1" />
          Preview
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Title & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-blue-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Examination & CBSE Result Processing
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Schedule management, online tabulation, CBSE 9-point grading, and report card generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200">
            <button
              onClick={() => setActiveTab('tabulation')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                activeTab === 'tabulation' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
              }`}
            >
              Class 10-A Tabulation
            </button>
            <button
              onClick={() => setActiveTab('schedules')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                activeTab === 'schedules' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
              }`}
            >
              Exam Date-Sheets
            </button>
            <button
              onClick={() => setActiveTab('grading')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                activeTab === 'grading' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
              }`}
            >
              CBSE Grading Scale
            </button>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsMarksEntryOpen(true)}>
            <Edit className="h-3.5 w-3.5 mr-1" />
            Enter Subject Marks
          </Button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'tabulation' && (
        <DataTable
          data={marks}
          columns={tabulationColumns}
          searchPlaceholder="Search student tabulation..."
          searchKey="studentName"
          exportFileName="class-10a-tabulation-sheet"
          title="Half-Yearly Examination 2026 - Class 10-A Mathematics Tabulation"
        />
      )}

      {activeTab === 'schedules' && (
        <DataTable
          data={exams}
          columns={examColumns}
          searchPlaceholder="Search exams by subject or title..."
          searchKey="subject"
          exportFileName="cbse-exam-schedules"
        />
      )}

      {activeTab === 'grading' && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              CBSE 9-Point Absolute & Positional Grading Scale
            </h3>
            <p className="text-xs text-slate-500">
              Statutory benchmark defined by CBSE Examination Byelaws for Secondary School Assessments.
            </p>
          </div>

          <div className="border border-slate-200 rounded overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Score Range (%)</th>
                  <th className="py-2.5 px-3">Grade</th>
                  <th className="py-2.5 px-3">Grade Point</th>
                  <th className="py-2.5 px-3">Positional Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {CBSE_GRADING_SCALE.map((g, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 font-sans">
                    <td className="py-2 px-3 font-mono font-bold text-slate-900">
                      {g.minMarks}% – {g.maxMarks}%
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-900">
                        {g.grade}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-mono text-slate-700">{g.gradePoint.toFixed(1)}</td>
                    <td className="py-2 px-3 text-slate-600 text-xs">{g.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Marks Entry Modal */}
      <MarksEntryModal isOpen={isMarksEntryOpen} onClose={() => setIsMarksEntryOpen(false)} />

      {/* Printable Report Card Modal */}
      {selectedStudentReport && (
        <Dialog
          isOpen={!!selectedStudentReport}
          onClose={() => setSelectedStudentReport(null)}
          title={`Official Report Card: ${selectedStudentReport.studentName}`}
          description="Half-Yearly Examination 2026 Academic Performance Transcript"
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            {/* Report Card Document */}
            <div className="border-2 border-navy-900 rounded p-6 bg-white space-y-4 shadow-xs">
              <div className="text-center border-b-2 border-navy-900 pb-3">
                <h3 className="font-extrabold text-base uppercase text-navy-950 tracking-wide">
                  {INSTITUTION_INFO.name}
                </h3>
                <p className="text-slate-500 text-[11px]">{INSTITUTION_INFO.address}</p>
                <p className="text-slate-500 text-[11px]">
                  Affiliation: {INSTITUTION_INFO.affiliationNo} • School Code: {INSTITUTION_INFO.schoolCode}
                </p>
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-800 mt-2 bg-slate-100 py-1 rounded">
                  ★ PROGRESS REPORT CARD — HALF-YEARLY EXAMINATION (2026–2027) ★
                </h4>
              </div>

              {/* Student Bio */}
              <div className="grid grid-cols-2 gap-3 py-1 border-b border-slate-200">
                <div>
                  <p>
                    <span className="text-slate-500">Student Name:</span>{' '}
                    <span className="font-bold text-slate-900">{selectedStudentReport.studentName}</span>
                  </p>
                  <p className="mt-1">
                    <span className="text-slate-500">Admission No:</span>{' '}
                    <span className="font-mono">{selectedStudentReport.student.admissionNo}</span>
                  </p>
                  <p className="mt-1">
                    <span className="text-slate-500">Parent/Guardian:</span>{' '}
                    <span className="font-medium">{selectedStudentReport.student.parentName}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p>
                    <span className="text-slate-500">Class & Section:</span>{' '}
                    <span className="font-bold">Class {selectedStudentReport.student.classSection}</span>
                  </p>
                  <p className="mt-1">
                    <span className="text-slate-500">Roll Number:</span>{' '}
                    <span className="font-mono font-bold">{selectedStudentReport.rollNumber}</span>
                  </p>
                  <p className="mt-1">
                    <span className="text-slate-500">Attendance:</span>{' '}
                    <span className="font-mono font-bold text-emerald-700">
                      {selectedStudentReport.student.overallAttendancePercentage}%
                    </span>
                  </p>
                </div>
              </div>

              {/* Scholastic Subject Table */}
              <div className="space-y-1">
                <table className="w-full text-left border-collapse border border-slate-300">
                  <thead className="bg-slate-100 text-slate-700 font-semibold text-[11px]">
                    <tr>
                      <th className="p-2 border border-slate-300">Subject</th>
                      <th className="p-2 border border-slate-300 text-center">Max Marks</th>
                      <th className="p-2 border border-slate-300 text-center">Marks Obtained</th>
                      <th className="p-2 border border-slate-300 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2 border border-slate-300 font-medium">Mathematics (Standard)</td>
                      <td className="p-2 border border-slate-300 text-center font-mono">80</td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold">
                        {selectedStudentReport.marksObtained}
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold text-emerald-800">
                        {selectedStudentReport.grade}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-300 font-medium">Science (Physics, Chem, Bio)</td>
                      <td className="p-2 border border-slate-300 text-center font-mono">80</td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold">75</td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold text-emerald-800">
                        A1
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-300 font-medium">English Language & Literature</td>
                      <td className="p-2 border border-slate-300 text-center font-mono">80</td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold">72</td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold text-blue-800">
                        B1
                      </td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="p-2 border border-slate-300">Overall Scholastic Average</td>
                      <td className="p-2 border border-slate-300 text-center font-mono">240</td>
                      <td className="p-2 border border-slate-300 text-center font-mono">
                        {selectedStudentReport.marksObtained + 75 + 72}
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-mono text-emerald-800">
                        A1 (92.1%)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Class Teacher Remarks */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                <span className="font-semibold text-slate-800">Class Teacher Remarks:</span>
                <p className="text-slate-600 italic">
                  "{selectedStudentReport.remarks || 'Commendable performance in analytical problem solving.'}"
                </p>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-3 gap-4 pt-6 text-center text-[11px] text-slate-600">
                <div className="border-t border-slate-400 pt-1">
                  <p className="font-semibold">Mrs. Lakshmi Raman</p>
                  <p className="text-slate-400 text-[10px]">Class Teacher</p>
                </div>
                <div className="border-t border-slate-400 pt-1">
                  <p className="font-semibold">Examination Cell</p>
                  <p className="text-slate-400 text-[10px]">Controller of Exams</p>
                </div>
                <div className="border-t border-slate-400 pt-1">
                  <p className="font-semibold">Dr. A. Swaminathan</p>
                  <p className="text-slate-400 text-[10px]">Principal</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="h-3.5 w-3.5 mr-1" />
                Print Official Report
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedStudentReport(null)}>
                Close
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
