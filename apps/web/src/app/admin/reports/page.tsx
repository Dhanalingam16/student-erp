'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { BarChart3, Download, Printer, Filter, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrencyINR } from '@/lib/utils';

export default function ReportsPage() {
  const { students, feeTransactions, attendance } = useERPStore();
  const [selectedReport, setSelectedReport] = useState('attendance');

  const reportCategories = [
    { id: 'attendance', name: 'Student Attendance & Defaulters Report', count: '1,420 Records' },
    { id: 'finance', name: 'Fee Collection & Defaulter Aging Analysis', count: '₹2.85 Cr Billed' },
    { id: 'academic', name: 'CBSE Examination Scholastic Performance', count: 'Half-Yearly 2026' },
    { id: 'transport', name: 'Transport Fleet Route & Fuel Utilization', count: '16 Bus Routes' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Institutional Analytics & Statutory Reporting
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Export comprehensive multi-dimensional reports for CBSE compliance, auditor inspection, and parent reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-3.5 w-3.5 mr-1" />
            Print Report
          </Button>
          <Button variant="primary" size="sm" onClick={() => alert('Exporting data as CSV spreadsheet...')}>
            <Download className="h-3.5 w-3.5 mr-1" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Report Categories Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {reportCategories.map((rc) => (
          <div
            key={rc.id}
            onClick={() => setSelectedReport(rc.id)}
            className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
              selectedReport === rc.id
                ? 'bg-navy-900 text-white border-navy-900 shadow-xs'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className="font-bold text-sm block">{rc.name}</span>
            <span className={`text-[10px] block mt-1 ${selectedReport === rc.id ? 'text-slate-300' : 'text-slate-400'}`}>
              {rc.count}
            </span>
          </div>
        ))}
      </div>

      {/* Report Data Preview Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 text-xs">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              {selectedReport === 'attendance'
                ? 'Class 10 Attendance & Absenteeism Ledger'
                : selectedReport === 'finance'
                ? 'Student Fee Accounts & Defaulter Ledger'
                : 'Scholastic Grade Distributions'}
            </h3>
            <p className="text-slate-500 text-[11px]">Academic Session 2026–2027 • Generated on 25 Sep 2026</p>
          </div>
          <Badge variant="success">Validated Record</Badge>
        </div>

        <div className="border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Roll</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Class</th>
                <th className="py-2.5 px-3 text-right">Attendance %</th>
                <th className="py-2.5 px-3 text-right">Fee Status</th>
                <th className="py-2.5 px-3 text-right">Outstanding (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-mono font-bold text-slate-900">{st.rollNumber}</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">{st.fullName}</td>
                  <td className="py-2 px-3 font-mono">Class {st.classSection}</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">
                    {st.overallAttendancePercentage}%
                  </td>
                  <td className="py-2 px-3 text-right uppercase font-bold text-[10px]">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        st.feeStatus === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {st.feeStatus}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                    {formatCurrencyINR(st.pendingFeeAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
