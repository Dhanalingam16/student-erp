'use client';

import React from 'react';
import { ShieldCheck, Plus, Check } from 'lucide-react';
import { Button, Badge } from '@school-erp/ui';

export default function RolesPermissionsPage() {
  const permissions = [
    { module: 'Student Records', superAdmin: true, schoolAdmin: true, teacher: false, student: false, parent: false },
    { module: 'Mark Attendance', superAdmin: true, schoolAdmin: true, teacher: true, student: false, parent: false },
    { module: 'Enter Exam Marks', superAdmin: true, schoolAdmin: true, teacher: true, student: false, parent: false },
    { module: 'Fee Ledger & Receipts', superAdmin: true, schoolAdmin: true, teacher: false, student: true, parent: true },
    { module: 'School Settings', superAdmin: true, schoolAdmin: true, teacher: false, student: false, parent: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Roles & Access Permission Matrix</h1>
          <p className="text-xs text-slate-500 mt-1">Fine-grained RBAC matrix definition across system modules</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Define Custom Role
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
            <tr>
              <th className="py-3 px-4">ERP Feature / Module</th>
              <th className="py-3 px-4 text-center">Super Admin</th>
              <th className="py-3 px-4 text-center">School Admin</th>
              <th className="py-3 px-4 text-center">Teacher</th>
              <th className="py-3 px-4 text-center">Student</th>
              <th className="py-3 px-4 text-center">Parent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {permissions.map((p, i) => (
              <tr key={i}>
                <td className="py-3.5 px-4 font-bold text-slate-900">{p.module}</td>
                <td className="py-3.5 px-4 text-center">{p.superAdmin ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : '-'}</td>
                <td className="py-3.5 px-4 text-center">{p.schoolAdmin ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : '-'}</td>
                <td className="py-3.5 px-4 text-center">{p.teacher ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : '-'}</td>
                <td className="py-3.5 px-4 text-center">{p.student ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : '-'}</td>
                <td className="py-3.5 px-4 text-center">{p.parent ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
