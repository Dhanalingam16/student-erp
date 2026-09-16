'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge, Button, AIInsightCard, Modal } from '@school-erp/ui';
import {
  Clock, CheckSquare, BookCheck, FilePenLine, Plus, MessageSquare,
  ChevronRight, CalendarCheck, BookOpen, AlertCircle, PlayCircle, Check
} from 'lucide-react';
import { mockAssignments } from '@school-erp/mock-data';

export default function TeacherDashboardWorkExecutionPage() {
  const [isClassActive, setIsClassActive] = useState(false);
  const [isCreateAsnModalOpen, setIsCreateAsnModalOpen] = useState(false);
  const [asnTitle, setAsnTitle] = useState('');

  const handleStartClass = () => {
    setIsClassActive(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner — Task Execution Theme */}
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Faculty Work Execution Portal</span>
          <h1 className="text-2xl font-bold tracking-tight mt-0.5">Good morning, Ms. Priya Sundaram</h1>
          <p className="text-xs text-slate-400 mt-1">Senior PGT Mathematics • Grade 10-A (Class Teacher), 10-B & 12-A</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/teacher/attendance">
            <Button variant="secondary" size="sm" leftIcon={<CheckSquare className="w-4 h-4 text-emerald-600" />}>
              Mark Class Attendance
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => setIsCreateAsnModalOpen(true)} className="text-white border-slate-700 hover:bg-slate-800" leftIcon={<Plus className="w-4 h-4 text-blue-400" />}>
            Create Assignment
          </Button>
        </div>
      </div>

      {/* PROMINENT NEXT CLASS HERO CARD */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-6 rounded-xl border border-blue-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            NEXT SCHEDULED CLASS • 10:00 AM TODAY
          </span>
          <h2 className="text-xl font-bold text-white mt-1">Mathematics — Grade 10-A</h2>
          <p className="text-xs text-slate-300">Room 204 • 32 Students Enrolled | Topic: Quadratic Formula Derivations</p>
        </div>
        <div className="flex items-center gap-3">
          {isClassActive ? (
            <span className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center gap-2 shadow-sm animate-pulse">
              <Check className="w-4 h-4" /> Class Session Active (In Progress)
            </span>
          ) : (
            <Button variant="primary" size="md" onClick={handleStartClass} className="bg-blue-600 hover:bg-blue-500 text-white shadow-md" leftIcon={<PlayCircle className="w-5 h-5" />}>
              Start Live Class Session
            </Button>
          )}
        </div>
      </div>

      {/* TODAY'S SCHEDULE TIMELINE */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">TODAY'S PERIOD TIMELINE (Monday, 15 Sep)</h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md">3 Teaching Periods Scheduled</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-l-blue-600 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-700 font-mono">09:00 AM — 10:00 AM</span>
              <Badge variant="success">Class Teacher</Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Mathematics — Grade 10-A</h3>
            <p className="text-xs text-slate-500">Room 204 • 32 Enrolled Students</p>
            <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-200/60">
              <span className="text-slate-500">Attendance: Pending</span>
              <Link href="/teacher/attendance" className="text-blue-600 font-bold hover:underline">
                Mark Now →
              </Link>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-l-amber-500 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-700 font-mono">10:30 AM — 11:30 AM</span>
              <Badge variant="info" className="font-bold">Subject Teacher</Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Science / Applied Physics — Grade 9-B</h3>
            <p className="text-xs text-slate-500">Lab 2 • 30 Enrolled Students</p>
            <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-200/60">
              <span className="text-slate-500">Roster Lookup</span>
              <Link href="/teacher/classes" className="text-slate-700 font-semibold hover:underline">
                View Roster →
              </Link>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-l-slate-400 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 font-mono">12:00 PM — 01:00 PM</span>
              <Badge variant="neutral">Subject Teacher</Badge>
            </div>
            <h3 className="text-sm font-bold text-slate-900">English Literature — Grade 8-A</h3>
            <p className="text-xs text-slate-500">Room 108 • 28 Enrolled Students</p>
            <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-200/60">
              <span className="text-slate-500">Lesson Notes</span>
              <span className="text-slate-400 font-medium">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS ROW & PENDING WORK QUEUE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Work Queue (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">PENDING EVALUATION & TASKS QUEUE</h3>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 rounded">12 Pending Work Items</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-amber-50/40 border border-amber-200/70 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">12 Assignments to Evaluate (Grade 10-A)</p>
                <p className="text-[11px] text-slate-500">Quadratic Equations homework submitted by Rahul Sharma.</p>
              </div>
              <Link href="/teacher/assignments">
                <Button variant="outline" size="sm">Evaluate Submissions</Button>
              </Link>
            </div>

            <div className="p-3.5 bg-blue-50/40 border border-blue-200/70 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">3 Exam Papers Pending Marks Entry</p>
                <p className="text-[11px] text-slate-500">Monthly Unit Assessment 2 answer sheets marked.</p>
              </div>
              <Link href="/teacher/marks">
                <Button variant="outline" size="sm">Enter Marks</Button>
              </Link>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">5 Student Messages & Parent Inquiries</p>
                <p className="text-[11px] text-slate-500">Parent Vikram Sharma inquired regarding English remedial.</p>
              </div>
              <Link href="/teacher/messages">
                <Button variant="ghost" size="sm">Reply</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions & AI Insight (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-400">Quick Faculty Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/teacher/attendance" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
                <span>Mark Attendance</span>
              </Link>
              <button onClick={() => setIsCreateAsnModalOpen(true)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 flex items-center gap-2 text-left">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Create Homework</span>
              </button>
              <Link href="/teacher/marks" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 flex items-center gap-2">
                <FilePenLine className="w-4 h-4 text-indigo-600" />
                <span>Enter Marks</span>
              </Link>
              <Link href="/teacher/classes" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>View Roster</span>
              </Link>
            </div>
          </div>

          <AIInsightCard
            title="Classroom Remedial Focus"
            category="Faculty AI Alert"
            description="3 students in 10-A (including Rahul Sharma) scored <75% in Quadratic Algebra unit test. Remedial exercises recommended."
            recommendations={[
              "Distribute Quadratic formula derivation drill sheet",
              "Schedule 15-min review session post 5th period"
            ]}
          />
        </div>
      </div>

      {/* Create Assignment Modal */}
      <Modal
        isOpen={isCreateAsnModalOpen}
        onClose={() => setIsCreateAsnModalOpen(false)}
        title="Create New Homework Assignment"
        footer={
          <Button variant="primary" size="sm" onClick={() => setIsCreateAsnModalOpen(false)}>
            Publish Assignment
          </Button>
        }
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Class & Subject</label>
            <input type="text" defaultValue="Grade 10-A — Mathematics" disabled className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 font-medium" />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assignment Title</label>
            <input
              type="text"
              placeholder="e.g. Quadratic Formula Derivations & Word Problems"
              value={asnTitle}
              onChange={(e) => setAsnTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
              <input type="date" defaultValue="2026-09-18" className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-900" />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total Max Marks</label>
              <input type="number" defaultValue={50} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-900" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
