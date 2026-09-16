'use client';

import React from 'react';
import { mockAttendanceRecords } from '@school-erp/mock-data';
import { Badge, Button, StatCard } from '@school-erp/ui';
import { CalendarCheck, AlertTriangle, Users, Download } from 'lucide-react';

export default function SchoolAttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">School Attendance Hub</h1>
          <p className="text-xs text-slate-500 mt-1">Daily student and teacher presence logging across all sections</p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
          Export Monthly Attendance Report
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Overall Attendance Rate" value="94.2%" change="4,710 Present" changeType="positive" icon={<CalendarCheck className="w-5 h-5 text-emerald-600" />} />
        <StatCard title="Unexcused Absentees" value="290 Students" change="5.8% Rate" changeType="negative" icon={<AlertTriangle className="w-5 h-5 text-red-600" />} />
        <StatCard title="Low Attendance Alerts" value="24 Students" change="<75% Threshold" changeType="neutral" icon={<Users className="w-5 h-5 text-amber-600" />} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">Today's Class Attendance Audit (15 Sep 2026)</h3>
        </div>
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
            <tr>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Class</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockAttendanceRecords.map(r => (
              <tr key={r.id}>
                <td className="py-3 px-4 font-semibold text-slate-900">{r.studentName}</td>
                <td className="py-3 px-4">{r.className}</td>
                <td className="py-3 px-4">{r.date}</td>
                <td className="py-3 px-4">
                  <Badge variant={r.status === 'Present' ? 'success' : r.status === 'Absent' ? 'danger' : 'warning'}>
                    {r.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-slate-500">{r.remarks || 'Regular Attendance'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
