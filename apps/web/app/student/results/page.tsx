'use client';

import React from 'react';
import { mockExamResults } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { Award, Download } from 'lucide-react';

export default function StudentResultsPage() {
  const result = mockExamResults[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Term Examination Results & Report Card</h1>
          <p className="text-xs text-slate-500 mt-1">{result.examTitle} • Grade 10-A</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
          Download Official PDF Transcript
        </Button>
      </div>

      <div className="p-6 bg-slate-900 text-white rounded-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase text-blue-400 font-bold">Overall Aggregate Rank</span>
          <p className="text-2xl font-bold mt-0.5">{result.totalMarksObtained} / {result.totalMaxMarks} ({result.percentage}%)</p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">Grade {result.overallGrade}</span>
          <p className="text-xs text-slate-400 mt-1">Class Rank #{result.rank}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
            <tr>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Marks Obtained</th>
              <th className="py-3 px-4">Max Marks</th>
              <th className="py-3 px-4">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {result.subjectResults.map(sub => (
              <tr key={sub.subject}>
                <td className="py-3.5 px-4 font-bold text-slate-900">{sub.subject}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">{sub.marksObtained}</td>
                <td className="py-3.5 px-4 text-slate-500">{sub.maxMarks}</td>
                <td className="py-3.5 px-4"><Badge variant="success">{sub.grade}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
