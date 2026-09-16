'use client';

import React from 'react';
import { mockExams, mockExamResults } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { FileSpreadsheet, Plus, Award, Download } from 'lucide-react';

export default function ExaminationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Examinations & Result Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">Schedule exams, manage question banks, enter marks & publish report cards</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Schedule New Examination
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exam Schedules */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Active Examination Timetables</h3>
          {mockExams.map(ex => (
            <div key={ex.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{ex.title}</p>
                <p className="text-[11px] text-slate-500">{ex.classSection} • {ex.startDate} to {ex.endDate}</p>
              </div>
              <Badge variant={ex.status === 'Completed' ? 'success' : 'info'}>{ex.status}</Badge>
            </div>
          ))}
        </div>

        {/* Merit List & Report Cards */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Top Performers & Transcripts</h3>
          {mockExamResults.map(res => (
            <div key={res.id} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{res.studentName} ({res.rollNo})</p>
                <p className="text-[11px] text-slate-500">Total Marks: {res.totalMarksObtained}/{res.totalMaxMarks} ({res.percentage}%) • Rank #{res.rank}</p>
              </div>
              <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
                Report Card
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
