'use client';

import React, { useState } from 'react';
import { mockStudents } from '@school-erp/mock-data';
import { AttendanceStatus } from '@school-erp/types';
import { Button, Badge } from '@school-erp/ui';
import { Check, X, Clock, Save, CalendarCheck } from 'lucide-react';
import { attendanceService } from '../../../services/attendanceService';

export default function TeacherAttendanceGridPage() {
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({
    'STU-1024': 'Present',
    'STU-1025': 'Present',
    'STU-1026': 'Absent',
    'STU-1027': 'Late'
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap(prev => ({ ...prev, [studentId]: status }));
    setIsSaved(false);
  };

  const presentCount = Object.values(attendanceMap).filter(s => s === 'Present').length;
  const absentCount = Object.values(attendanceMap).filter(s => s === 'Absent').length;
  const lateCount = Object.values(attendanceMap).filter(s => s === 'Late').length;

  const handleSave = async () => {
    setIsLoading(true);
    await attendanceService.bulkUpdateAttendance(attendanceMap);
    setIsLoading(false);
    setIsSaved(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Classroom Attendance Marker — Grade 10-A</h1>
          <p className="text-xs text-slate-500 mt-1">Period 1 • Mathematics | Date: 15 September 2026</p>
        </div>
        <div className="flex items-center gap-3">
          {isSaved && <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1"><Check className="w-4 h-4" /> Saved & Synced across Student, Parent & Admin</span>}
          <Button variant="primary" size="sm" isLoading={isLoading} onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>
            Save Class Attendance
          </Button>
        </div>
      </div>

      {/* Dynamic Summary Counters */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider block text-emerald-700">Present</span>
            <span className="text-2xl font-bold">{presentCount}</span>
          </div>
          <Check className="w-6 h-6 text-emerald-600" />
        </div>

        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-900 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider block text-red-700">Absent</span>
            <span className="text-2xl font-bold">{absentCount}</span>
          </div>
          <X className="w-6 h-6 text-red-600" />
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider block text-amber-700">Late</span>
            <span className="text-2xl font-bold">{lateCount}</span>
          </div>
          <Clock className="w-6 h-6 text-amber-600" />
        </div>
      </div>

      {/* Interactive Attendance Table Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Student Name & ID</th>
              <th className="py-3.5 px-4 text-center">Present (✓)</th>
              <th className="py-3.5 px-4 text-center">Absent (✗)</th>
              <th className="py-3.5 px-4 text-center">Late (⏰)</th>
              <th className="py-3.5 px-4">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockStudents.map((s) => {
              const current = attendanceMap[s.id] || 'Present';
              return (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-900 flex items-center gap-3">
                    <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{s.name}</p>
                      <p className="text-[11px] text-slate-500">Roll #{s.rollNo} • ID: {s.id}</p>
                    </div>
                  </td>

                  {/* Present Toggle Button */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleStatus(s.id, 'Present')}
                      className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                        current === 'Present'
                          ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-600'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Present
                    </button>
                  </td>

                  {/* Absent Toggle Button */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleStatus(s.id, 'Absent')}
                      className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                        current === 'Absent'
                          ? 'bg-red-600 text-white shadow-xs ring-2 ring-red-600'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Absent
                    </button>
                  </td>

                  {/* Late Toggle Button */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleStatus(s.id, 'Late')}
                      className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                        current === 'Late'
                          ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-600'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Late
                    </button>
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={current === 'Present' ? 'success' : current === 'Absent' ? 'danger' : 'warning'}>
                      {current}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
