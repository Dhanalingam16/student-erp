'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockStudents } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { Search, Filter, Plus, ArrowRight, Eye, Phone } from 'lucide-react';

export default function StudentsDirectoryPage() {
  const [query, setQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const filtered = mockStudents.filter(s => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase()) || s.id.toLowerCase().includes(query.toLowerCase());
    const matchesClass = selectedClass === 'all' || s.className === selectedClass;
    return matchesQuery && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Manage 5,000 enrolled students across all 12 grades</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Admit New Student
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name, ID (STU-1024), or roll no..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 bg-white"
          >
            <option value="all">All Grades</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 6">Grade 6</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">ID / Roll</th>
              <th className="py-3.5 px-4">Class & Section</th>
              <th className="py-3.5 px-4">Attendance</th>
              <th className="py-3.5 px-4">Score</th>
              <th className="py-3.5 px-4">Fee Status</th>
              <th className="py-3.5 px-4">Parent Phone</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-semibold text-slate-900">{s.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-slate-700">{s.id} (#{s.rollNo})</td>
                <td className="py-3 px-4 font-medium text-slate-900">{s.className} - {s.section}</td>
                <td className="py-3 px-4">
                  <span className={`font-bold ${s.attendancePercentage < 75 ? 'text-red-600' : 'text-slate-900'}`}>
                    {s.attendancePercentage}%
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-slate-900">{s.academicScore}%</td>
                <td className="py-3 px-4">
                  <Badge variant={s.feesPending > 0 ? 'warning' : 'success'}>{s.feesStatus}</Badge>
                </td>
                <td className="py-3 px-4">{s.parentPhone}</td>
                <td className="py-3 px-4 text-right">
                  <Link href={`/school/students/${s.id}`}>
                    <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5 text-blue-600" />}>
                      360° Profile
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
