'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useERPStore } from '@/lib/store';
import {
  CalendarCheck,
  BookOpen,
  FileCheck2,
  FileSpreadsheet,
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AttendanceEntryModal } from '@/components/modals/AttendanceEntryModal';
import { AddHomeworkModal } from '@/components/modals/AddHomeworkModal';
import { MarksEntryModal } from '@/components/modals/MarksEntryModal';

export default function TeacherDashboardPage() {
  const { homework, submissions, attendance } = useERPStore();
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isHomeworkOpen, setIsHomeworkOpen] = useState(false);
  const [isMarksOpen, setIsMarksOpen] = useState(false);

  // Today's classes for Mrs. Lakshmi Raman
  const teacherSchedule = [
    { period: 1, time: '08:00 AM – 08:45 AM', class: '10-A', subject: 'Mathematics (Standard)', room: 'Room 204', status: 'completed' },
    { period: 3, time: '09:30 AM – 10:15 AM', class: '11-A', subject: 'Applied Mathematics', room: 'Science Block 101', status: 'in_progress' },
    { period: 5, time: '10:35 AM – 11:20 AM', class: '10-B', subject: 'Mathematics (Standard)', room: 'Room 205', status: 'upcoming' },
    { period: 7, time: '12:05 PM – 12:50 PM', class: '12-A', subject: 'Mathematics (Calculus)', room: 'Science Block 201', status: 'upcoming' },
  ];

  const pendingSubmissionsCount = submissions.filter((s) => s.status === 'submitted').length;

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Teacher Greeting Banner */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-slate-400 font-mono text-[11px] block">Friday, 25 September 2026</span>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight mt-0.5">
            Good morning, Mrs. Lakshmi Raman
          </h1>
          <p className="text-xs text-slate-500">
            Class Teacher of 10-A • Senior PGT Mathematics Department
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={() => setIsAttendanceOpen(true)}>
            <CalendarCheck className="h-3.5 w-3.5 mr-1" />
            Mark Attendance
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsHomeworkOpen(true)}>
            <BookOpen className="h-3.5 w-3.5 mr-1 text-blue-600" />
            Add Homework
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsMarksOpen(true)}>
            <FileSpreadsheet className="h-3.5 w-3.5 mr-1 text-amber-600" />
            Tabulate Marks
          </Button>
        </div>
      </div>

      {/* Attendance Pending Alert Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-amber-100 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-amber-900 text-sm">
              Morning Attendance Verification Pending
            </p>
            <p className="text-amber-700 text-xs">
              Class 10-A register must be submitted to the School Office before 09:00 AM for automated parent SMS dispatch.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          className="bg-amber-600 hover:bg-amber-700 border-amber-600"
          onClick={() => setIsAttendanceOpen(true)}
        >
          Open Class 10-A Register
        </Button>
      </div>

      {/* 2-Column Workflow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2 Cols): Today's Schedule & Homework Submissions */}
        <div className="lg:col-span-2 space-y-5">
          {/* Today's Teaching Periods */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Today's Classroom Schedule
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">4 Teaching Periods</span>
            </div>

            <div className="space-y-2">
              {teacherSchedule.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded border flex items-center justify-between transition-colors ${
                    item.status === 'in_progress'
                      ? 'bg-blue-50/70 border-blue-300 ring-1 ring-blue-300'
                      : item.status === 'completed'
                      ? 'bg-slate-50 border-slate-200 opacity-70'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-900 w-16">
                      Period {item.period}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">
                        {item.subject} — Class {item.class}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {item.time} • Room {item.room}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      item.status === 'in_progress'
                        ? 'info'
                        : item.status === 'completed'
                        ? 'slate'
                        : 'outline'
                    }
                  >
                    {item.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Submissions */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  Student Homework Submissions to Grade
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {pendingSubmissionsCount} Pending Review
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {submissions.map((sub) => (
                <div key={sub.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{sub.studentName}</p>
                    <p className="text-[11px] text-slate-500">
                      Roll {sub.rollNumber} • Submitted: {sub.submittedAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {sub.status === 'graded' ? (
                      <span className="font-mono font-bold text-emerald-700">
                        Graded: {sub.marksObtained}/{sub.maxMarks}
                      </span>
                    ) : (
                      <Link href="/teacher/assignments">
                        <Button variant="outline" size="sm" className="h-6 px-2 text-[11px]">
                          Review Submission
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deadlines & Class 10-A Overview */}
        <div className="space-y-5">
          {/* Class 10-A Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3 text-xs">
            <div className="flex justify-between items-start border-b border-slate-100 pb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Class 10-A In-Charge
                </h3>
                <p className="text-slate-500 text-[11px]">Room 204 • General Stream</p>
              </div>
              <Badge variant="info">36 Students</Badge>
            </div>

            <div className="space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Present Today:</span>
                <span className="font-mono font-bold text-emerald-700">34 Students</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Absent:</span>
                <span className="font-mono font-bold text-rose-700">1 Student (Aditya Verma)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Late Arrivals:</span>
                <span className="font-mono font-bold text-amber-700">1 Student (Priya Nair)</span>
              </div>
            </div>

            <Link href="/teacher/classes" className="block pt-1">
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Student Roster
              </Button>
            </Link>
          </div>

          {/* Exam Deadlines */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <FileSpreadsheet className="h-4 w-4 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Exam Tabulation Deadlines
              </h3>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
              <span className="font-semibold text-slate-900 block">Half-Yearly Mathematics (Class 10-A)</span>
              <p className="text-slate-500 text-[11px]">Max Marks: 80 • Passing: 27</p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => setIsMarksOpen(true)}
                >
                  Open Tabulation Sheet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AttendanceEntryModal isOpen={isAttendanceOpen} onClose={() => setIsAttendanceOpen(false)} />
      <AddHomeworkModal isOpen={isHomeworkOpen} onClose={() => setIsHomeworkOpen(false)} />
      <MarksEntryModal isOpen={isMarksOpen} onClose={() => setIsMarksOpen(false)} />
    </div>
  );
}
