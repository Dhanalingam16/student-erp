'use client';

import React, { useState } from 'react';
import { Tabs, AIInsightCard, Badge, Button } from '@school-erp/ui';
import { mockStudents, mockExamResults, mockFeeLedgers } from '@school-erp/mock-data';
import { formatDate } from '@school-erp/utils';
import {
  User, GraduationCap, CalendarCheck, BookOpen, Award, Receipt,
  Bus, HeartPulse, FileText, MessageSquare, Phone, Mail, MapPin, CheckCircle, Clock
} from 'lucide-react';

export default function Student360Page({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const student = mockStudents.find(s => s.id === params.id || s.rollNo === params.id) || mockStudents[0];
  const examResult = mockExamResults[0];
  const feeLedger = mockFeeLedgers[0];

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'academics', label: 'Academics', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck className="w-3.5 h-3.5" /> },
    { id: 'assignments', label: 'Assignments', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'exams', label: 'Exams & Results', icon: <Award className="w-3.5 h-3.5" /> },
    { id: 'fees', label: 'Fees & Ledger', icon: <Receipt className="w-3.5 h-3.5" /> },
    { id: 'transport', label: 'Transport', icon: <Bus className="w-3.5 h-3.5" /> },
    { id: 'health', label: 'Health Record', icon: <HeartPulse className="w-3.5 h-3.5" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'communication', label: 'Communication', icon: <MessageSquare className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Student Profile 360 Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-20 h-20 rounded-xl object-cover ring-2 ring-slate-200 shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{student.name}</h1>
              <Badge variant="success">Status: {student.status}</Badge>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-1">
              {student.className} • Section {student.section} | Roll No: <span className="font-bold text-slate-900">{student.rollNo}</span> | ID: <span className="font-mono text-slate-700">{student.id}</span>
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {student.parentPhone} ({student.parentName})</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Dwarka, New Delhi</span>
              <span className="flex items-center gap-1.5"><HeartPulse className="w-3.5 h-3.5 text-slate-400" /> Blood Group: {student.bloodGroup}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Generate Transfer Certificate
          </Button>
          <Button variant="primary" size="sm">
            Send Message to Parent
          </Button>
        </div>
      </div>

      {/* 4 Summary Stat Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Attendance Rate</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-slate-900">{student.attendancePercentage}%</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Good</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">182 Days Present • 18 Absent</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Academic Aggregate Score</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-slate-900">{student.academicScore}%</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Grade A</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Class Rank #4 of 32 Students</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Fees Balance Due</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-slate-900">₹{student.feesPending.toLocaleString()}</span>
            <Badge variant={student.feesPending > 0 ? 'warning' : 'success'}>
              {student.feesStatus}
            </Badge>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Quarter 2 Installment Due Sep 30</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pending Assignments</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-slate-900">3 Tasks</span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Due this week</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Maths & Physics Lab Reports</p>
        </div>
      </div>

      {/* Flagship Reserved AI Student Insight Banner */}
      <AIInsightCard
        title={`Academic Performance Insight — ${student.name}`}
        category="Student 360° AI Analysis"
        description="Rahul's overall performance is strong (84% aggregate). However, Mathematics assessment performance has declined by 8% across the last 3 unit tests. Science & Physics remain exceptional at 89%."
        recommendations={[
          'Schedule 3 additional quadratic practice sessions with Priya Sundaram',
          'Focus remedial exercises on Algebra & Polynomial derivations',
          'Review error log from unit assessment 2'
        ]}
        actionLabel="Assign Remedial Practice Worksheet"
      />

      {/* Tabs Control */}
      <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Personal & Guardian Details */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Student & Family Information</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Father / Guardian</span>
                <span className="font-semibold text-slate-900">{student.parentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Guardian Phone</span>
                <span className="font-semibold text-slate-900">{student.parentPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Date of Birth</span>
                <span className="font-semibold text-slate-900">{formatDate(student.dob)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Admission Year</span>
                <span className="font-semibold text-slate-900">{student.admissionYear}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block">Residential Address</span>
                <span className="font-semibold text-slate-900">{student.address}</span>
              </div>
            </div>
          </div>

          {/* Right Recent Activity Timeline */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Recent Campus Activity Log</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <span className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5"><CheckCircle className="w-3.5 h-3.5" /></span>
                <div>
                  <p className="font-semibold text-slate-900">Attendance Recorded Present</p>
                  <p className="text-slate-500">Period 1 • Grade 10-A • 09:00 AM Today</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <span className="p-1 rounded-full bg-blue-100 text-blue-700 mt-0.5"><BookOpen className="w-3.5 h-3.5" /></span>
                <div>
                  <p className="font-semibold text-slate-900">Submitted Physics Lab Report</p>
                  <p className="text-slate-500">Electromagnetic Induction Assignment • Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs">
                <span className="p-1 rounded-full bg-purple-100 text-purple-700 mt-0.5"><Award className="w-3.5 h-3.5" /></span>
                <div>
                  <p className="font-semibold text-slate-900">Monthly Assessment 2 Results Published</p>
                  <p className="text-slate-500">Scored 420/500 (84%) • Rank #4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academics' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Subject Performance Breakdown (Term 1)</h3>
          <div className="space-y-3">
            {examResult.subjectResults.map((sub) => (
              <div key={sub.subject} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-900">{sub.subject}</p>
                  <p className="text-[11px] text-slate-500">Max Marks: {sub.maxMarks}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-900">{sub.marksObtained}%</span>
                  <Badge variant={sub.marksObtained >= 80 ? 'success' : 'info'}>{sub.grade}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'fees' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Student Fee Ledger</h3>
            <Badge variant="warning">Pending ₹{feeLedger.dueAmount.toLocaleString()}</Badge>
          </div>
          <div className="text-xs space-y-2">
            <div className="p-3 bg-slate-50 rounded flex justify-between">
              <span>Total Academic Fee:</span>
              <span className="font-bold text-slate-900">₹{feeLedger.totalFee.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded flex justify-between text-emerald-700">
              <span>Total Paid till date:</span>
              <span className="font-bold">₹{feeLedger.paidAmount.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded flex justify-between text-amber-800 font-bold">
              <span>Outstanding Due (Due Sep 30):</span>
              <span>₹{feeLedger.dueAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'overview' && activeTab !== 'academics' && activeTab !== 'fees' && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xs text-center text-xs text-slate-500">
          Viewing detailed records for <strong className="text-slate-900">{student.name}</strong> under tab: <span className="font-bold text-blue-600 uppercase">{activeTab}</span>.
        </div>
      )}
    </div>
  );
}
