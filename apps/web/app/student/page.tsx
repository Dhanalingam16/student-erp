'use client';

import React from 'react';
import Link from 'next/link';
import { StatCard, AIInsightCard, Button } from '@school-erp/ui';
import { Clock, BookOpen, Award, Download, ArrowRight, FileText } from 'lucide-react';
import { mockAssignments } from '@school-erp/mock-data';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Good morning, Rahul 👋</h1>
          <p className="text-xs text-slate-500 mt-1">Grade 10 • Section A | Roll No: STU-1024</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/student/results">
            <Button variant="primary" size="sm" leftIcon={<Award className="w-4 h-4" />}>
              View Term Report Card
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Attendance Rate" value="91.4%" change="Good Standing" changeType="positive" icon={<Clock className="w-5 h-5 text-emerald-600" />} />
        <StatCard title="Assignments Pending" value="3 Tasks" change="Due Friday" changeType="neutral" icon={<BookOpen className="w-5 h-5 text-amber-600" />} />
        <StatCard title="Upcoming Exams" value="2 Papers" change="Half-Yearly" changeType="positive" icon={<Award className="w-5 h-5 text-blue-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Today's Period Classes</h3>
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">09:00 AM</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">Mathematics — Quadratic Proofs</p>
                <p className="text-[11px] text-slate-500">Priya Sundaram • Room 204</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded">Present</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase">10:00 AM</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">Physics — Electromagnetic Induction</p>
                <p className="text-[11px] text-slate-500">Dr. Amit Gupta • Lab 2</p>
              </div>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded">Upcoming</span>
            </div>
          </div>
        </div>

        {/* AI Study Insight */}
        <div className="lg:col-span-5">
          <AIInsightCard
            title="Personalized Study Insight"
            category="Student Recommendation"
            description="You have an upcoming Physics paper in 10 days. Historical performance indicates extra practice needed in Electromagnetic Induction."
            recommendations={[
              "Solve 3 sample papers on Magnetism & Induction",
              "Review Faraday experiment notes from Lab 2"
            ]}
            actionLabel="Open Study Material"
          />
        </div>
      </div>
    </div>
  );
}
