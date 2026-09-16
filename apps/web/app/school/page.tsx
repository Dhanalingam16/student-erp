'use client';

import React from 'react';
import Link from 'next/link';
import { StatCard, AIInsightCard, Button } from '@school-erp/ui';
import { Users, Briefcase, CalendarCheck, Receipt, AlertTriangle, ArrowRight, Clock, ChevronRight } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar
} from 'recharts';

const attendanceTrendData = [
  { day: 'Mon', percentage: 95.2 },
  { day: 'Tue', percentage: 94.8 },
  { day: 'Wed', percentage: 96.1 },
  { day: 'Thu', percentage: 93.5 },
  { day: 'Fri', percentage: 94.2 },
];

const feeCollectionData = [
  { month: 'Apr', collected: 45 },
  { month: 'May', collected: 62 },
  { month: 'Jun', collected: 78 },
  { month: 'Jul', collected: 82 },
  { month: 'Aug', collected: 87 },
];

export default function SchoolCommandCenterPage() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">School Command Center</h1>
          <p className="text-xs text-slate-500 mt-1">
            Monday, 15 September 2026 • St. Xavier International Campus (5,000 Students enrolled)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/school/students/STU-1024">
            <Button variant="outline" size="sm">
              Open Flagship Student 360° (STU-1024)
            </Button>
          </Link>
          <Link href="/school/admissions">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Admissions CRM Pipeline
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Core Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enrolled Students"
          value="5,000"
          change="+3.2% vs last yr"
          changeType="positive"
          icon={<Users className="w-5 h-5 text-blue-600" />}
          description="Across 12 Grades (A, B, C Sections)"
        />
        <StatCard
          title="Active Teachers & Staff"
          value="250"
          change="98.5% On Duty"
          changeType="positive"
          icon={<Briefcase className="w-5 h-5 text-indigo-600" />}
          description="3 teachers on approved leave today"
        />
        <StatCard
          title="Today's Attendance Rate"
          value="94.2%"
          change="Above 92% target"
          changeType="positive"
          icon={<CalendarCheck className="w-5 h-5 text-emerald-600" />}
          description="4,710 Present • 290 Absent"
        />
        <StatCard
          title="Term Fee Collection Velocity"
          value="87%"
          change="₹1.85 Cr Collected"
          changeType="neutral"
          icon={<Receipt className="w-5 h-5 text-amber-600" />}
          description="18 overdue payments pending review"
        />
      </div>

      {/* AI School Insight & Attention Required Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attention Required Panel (8 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-amber-50 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">Attention Required Action Center</h3>
            </div>
            <span className="text-xs text-slate-400">4 Critical Flags</span>
          </div>

          <div className="space-y-3">
            <Link href="/school/students?filter=low-attendance" className="block">
              <div className="p-3.5 rounded-lg border border-amber-200/70 bg-amber-50/40 hover:bg-amber-50 transition-colors flex items-center justify-between group">
                <div>
                  <p className="text-xs font-semibold text-slate-900 group-hover:text-amber-900">24 Students below 75% Attendance threshold</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Grade 10-A has 12 students with consecutive unexcused absences.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-700 shrink-0" />
              </div>
            </Link>

            <Link href="/school/finance" className="block">
              <div className="p-3.5 rounded-lg border border-red-200/70 bg-red-50/40 hover:bg-red-50 transition-colors flex items-center justify-between group">
                <div>
                  <p className="text-xs font-semibold text-slate-900 group-hover:text-red-900">18 Overdue Fee Payments (Quarter 2)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Total outstanding amount: ₹3,45,000 across Grade 8 & 10.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-red-700 shrink-0" />
              </div>
            </Link>

            <Link href="/school/admissions" className="block">
              <div className="p-3.5 rounded-lg border border-blue-200/70 bg-blue-50/40 hover:bg-blue-50 transition-colors flex items-center justify-between group">
                <div>
                  <p className="text-xs font-semibold text-slate-900 group-hover:text-blue-900">7 Admission Verifications Pending</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Applicant documents submitted awaiting Principal approval.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-700 shrink-0" />
              </div>
            </Link>

            <Link href="/teacher/assignments" className="block">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-100 transition-colors flex items-center justify-between group">
                <div>
                  <p className="text-xs font-semibold text-slate-900 group-hover:text-slate-900">12 Assignments awaiting evaluation</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Physics & Mathematics submissions pending faculty review.</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            </Link>
          </div>
        </div>

        {/* AI Insight Card (5 Cols) */}
        <div className="lg:col-span-5">
          <AIInsightCard
            title="School Operational Intelligence"
            category="Admin Summary"
            description="Overall campus health is strong (94.2% attendance). Attendance in Grade 10-A has dipped by 3.2% over the last fortnight. Quarter 2 fee collection velocity is on track at 87%."
            recommendations={[
              "Send automated alert SMS to parents of 24 low-attendance students",
              "Review Grade 10 Mathematics performance before half-yearly exams",
              "Approve 7 pending admission document verifications"
            ]}
            actionLabel="View All AI System Insights"
            className="h-full flex flex-col justify-between"
          />
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Weekly Attendance Trend (%)</h3>
              <p className="text-xs text-slate-500">Average student presence rate across all 12 grades</p>
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">94.2% Today</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Area type="monotone" dataKey="percentage" stroke="#2563eb" fill="#dbeafe" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Velocity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Fee Collection Velocity (%)</h3>
              <p className="text-xs text-slate-500">Cumulative term collection progress per month</p>
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">87% Target Met</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeCollectionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="collected" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Today's Schedule Timeline */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-bold text-slate-900">Today's Campus Schedule Timeline</h3>
          </div>
          <span className="text-xs text-slate-500">4 Scheduled Campus Events</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-blue-600 uppercase">09:00 AM - 10:00 AM</span>
            <p className="text-xs font-semibold text-slate-900 mt-1">Grade 10-A Mathematics Period</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Faculty: Priya Sundaram • Room 204</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-amber-600 uppercase">10:30 AM - 11:30 AM</span>
            <p className="text-xs font-semibold text-slate-900 mt-1">Physics Monthly Unit Assessment</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Grade 10 & 11 • Hall 2</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-purple-600 uppercase">02:00 PM - 03:00 PM</span>
            <p className="text-xs font-semibold text-slate-900 mt-1">Academic Committee Review</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Principal Office • HODs Meeting</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] font-bold text-emerald-600 uppercase">03:30 PM - 04:30 PM</span>
            <p className="text-xs font-semibold text-slate-900 mt-1">Transport Departure Dispatch</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Buses DL-01 to DL-12 Fleet</p>
          </div>
        </div>
      </div>
    </div>
  );
}
