'use client';

import React, { useState } from 'react';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useERPStore } from '@/lib/store';
import { AttendanceRecord, AttendanceStatus, Student } from '@/types';
import { Check, X, Clock, CheckCheck, Save } from 'lucide-react';

interface AttendanceEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultClassSection?: string;
}

export function AttendanceEntryModal({
  isOpen,
  onClose,
  defaultClassSection = '10-A',
}: AttendanceEntryModalProps) {
  const { students, attendance, markAttendance } = useERPStore();
  const [classSection, setClassSection] = useState(defaultClassSection);
  const [attendanceDate, setAttendanceDate] = useState('2026-09-25');
  const [isSaved, setIsSaved] = useState(false);

  const classStudents = students.filter((s) => s.classSection === classSection);

  // Initialize status map from existing attendance records or default to present
  const [statusMap, setStatusMap] = useState<Record<string, { status: AttendanceStatus; remarks?: string }>>(() => {
    const map: Record<string, { status: AttendanceStatus; remarks?: string }> = {};
    classStudents.forEach((st) => {
      const existing = attendance.find((a) => a.studentId === st.id && a.date === '2026-09-25');
      map[st.id] = {
        status: existing?.status || 'present',
        remarks: existing?.remarks || '',
      };
    });
    return map;
  });

  const handleMarkAllPresent = () => {
    const updated: Record<string, { status: AttendanceStatus; remarks?: string }> = {};
    classStudents.forEach((st) => {
      updated[st.id] = { status: 'present', remarks: '' };
    });
    setStatusMap(updated);
  };

  const handleSetStudentStatus = (studentId: string, status: AttendanceStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status },
    }));
  };

  const handleSetRemarks = (studentId: string, remarks: string) => {
    setStatusMap((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], remarks },
    }));
  };

  const handleSubmit = () => {
    const recordsToSave: AttendanceRecord[] = classStudents.map((st) => {
      const entry = statusMap[st.id] || { status: 'present' };
      return {
        id: `att-${st.id}-${attendanceDate}`,
        studentId: st.id,
        studentName: st.fullName,
        rollNumber: st.rollNumber,
        classSection,
        date: attendanceDate,
        status: entry.status,
        checkInTime: entry.status === 'present' ? '07:45 AM' : entry.status === 'late' ? '08:15 AM' : undefined,
        remarks: entry.remarks,
      };
    });

    markAttendance(recordsToSave);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const presentCount = Object.values(statusMap).filter((e) => e.status === 'present').length;
  const absentCount = Object.values(statusMap).filter((e) => e.status === 'absent').length;
  const lateCount = Object.values(statusMap).filter((e) => e.status === 'late').length;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Daily Attendance Register — Class ${classSection}`}
      description="Mark morning attendance for Class 10-A. Attendance syncs instantly across School Admin, Parent App, and SMS dispatch."
      maxWidth="3xl"
    >
      <div className="space-y-4 text-xs">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-slate-500 block text-[10px]">Date</span>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="border border-slate-300 rounded px-2 py-1 text-xs bg-white text-slate-800"
              />
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Class & Section</span>
              <select
                value={classSection}
                onChange={(e) => setClassSection(e.target.value)}
                className="border border-slate-300 rounded px-2 py-1 text-xs bg-white text-slate-800"
              >
                <option value="10-A">Class 10-A (36 Students)</option>
                <option value="10-B">Class 10-B (38 Students)</option>
                <option value="11-A">Class 11-A (32 Students)</option>
                <option value="6-B">Class 6-B (38 Students)</option>
              </select>
            </div>
          </div>

          {/* Quick Action & Counts */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs mr-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                Present: {presentCount}
              </span>
              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-semibold">
                Absent: {absentCount}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                Late: {lateCount}
              </span>
            </div>

            <Button variant="outline" size="sm" onClick={handleMarkAllPresent}>
              <CheckCheck className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              Mark All Present
            </Button>
          </div>
        </div>

        {/* Student Roster Table */}
        <div className="border border-slate-200 rounded overflow-hidden max-h-[380px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 text-slate-600 sticky top-0 uppercase tracking-wider text-[10px] select-none border-b border-slate-200">
              <tr>
                <th className="py-2 px-3 w-16">Roll</th>
                <th className="py-2 px-3">Student Name</th>
                <th className="py-2 px-3 text-center w-64">Attendance Status</th>
                <th className="py-2 px-3">Remarks / Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.map((st) => {
                const entry = statusMap[st.id] || { status: 'present', remarks: '' };
                return (
                  <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 font-mono font-medium text-slate-700">{st.rollNumber}</td>
                    <td className="py-2 px-3">
                      <p className="font-semibold text-slate-900">{st.fullName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{st.admissionNo}</p>
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleSetStudentStatus(st.id, 'present')}
                          className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                            entry.status === 'present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                        >
                          <Check className="h-3 w-3" />
                          Present
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSetStudentStatus(st.id, 'absent')}
                          className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                            entry.status === 'absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                          }`}
                        >
                          <X className="h-3 w-3" />
                          Absent
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSetStudentStatus(st.id, 'late')}
                          className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                            entry.status === 'late'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700'
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          Late
                        </button>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        placeholder="Optional remark..."
                        value={entry.remarks || ''}
                        onChange={(e) => handleSetRemarks(st.id, e.target.value)}
                        className="w-full px-2 py-0.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy-600 bg-white"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
          <p className="text-[11px] text-slate-500 italic">
            Automated SMS notifications are dispatched to parents of absent/late students at 09:00 AM.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              <Save className="h-3.5 w-3.5 mr-1" />
              {isSaved ? 'Submitted Successfully!' : 'Save & Submit Register'}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
