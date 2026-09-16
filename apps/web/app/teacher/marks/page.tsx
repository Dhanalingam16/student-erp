'use client';

import React, { useState } from 'react';
import { mockStudents } from '@school-erp/mock-data';
import { calculateGrade } from '@school-erp/utils';
import { Button, Badge } from '@school-erp/ui';
import { Save, Check, FilePenLine } from 'lucide-react';

export default function TeacherMarksEntryPage() {
  const [marksMap, setMarksMap] = useState<Record<string, number>>({
    'STU-1024': 82,
    'STU-1025': 94,
    'STU-1026': 68,
    'STU-1027': 90
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleMarkChange = (studentId: string, value: number) => {
    setMarksMap(prev => ({ ...prev, [studentId]: Math.min(100, Math.max(0, value)) }));
    setIsSaved(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Marks Entry Sheet — Grade 10-A</h1>
          <p className="text-xs text-slate-500 mt-1">Subject: Mathematics | Unit Assessment 2 (Max Marks: 100)</p>
        </div>
        <div className="flex items-center gap-3">
          {isSaved && <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1"><Check className="w-4 h-4" /> Marks Submitted</span>}
          <Button variant="primary" size="sm" onClick={() => setIsSaved(true)} leftIcon={<Save className="w-4 h-4" />}>
            Save Marks & Compute Grades
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Student Name & ID</th>
              <th className="py-3.5 px-4">Roll No</th>
              <th className="py-3.5 px-4">Marks Obtained (/100)</th>
              <th className="py-3.5 px-4">Percentage</th>
              <th className="py-3.5 px-4">Auto Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockStudents.map((s) => {
              const score = marksMap[s.id] ?? 80;
              const { grade, color } = calculateGrade(score);
              return (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-6 font-semibold text-slate-900 flex items-center gap-3">
                    <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <span>{s.name}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-700">#{s.rollNo}</td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={score}
                      onChange={(e) => handleMarkChange(s.id, parseInt(e.target.value) || 0)}
                      className="w-24 px-3 py-1.5 text-xs font-bold text-slate-900 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{score}%</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded text-xs font-bold border ${color}`}>
                      {grade}
                    </span>
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
