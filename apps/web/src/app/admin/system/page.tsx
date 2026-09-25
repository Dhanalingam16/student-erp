'use client';

import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Key,
  Users,
  Lock,
  Database,
  CheckCircle2,
  Clock,
  Globe,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RolePermission {
  module: string;
  superAdmin: boolean;
  teacher: boolean;
  accountant: boolean;
  parent: boolean;
  student: boolean;
}

export default function SystemAdminPage() {
  const [activeTab, setActiveTab] = useState<'rbac' | 'audit' | 'sessions'>('rbac');

  const permissionsMatrix: RolePermission[] = [
    { module: 'Student Master Directory (View/Edit)', superAdmin: true, teacher: true, accountant: false, parent: false, student: false },
    { module: 'Daily Attendance Marking & Registers', superAdmin: true, teacher: true, accountant: false, parent: false, student: false },
    { module: 'Exam Marks Tabulation & Publishing', superAdmin: true, teacher: true, accountant: false, parent: false, student: false },
    { module: 'Fee Structures & Offline Counter Receipting', superAdmin: true, teacher: false, accountant: true, parent: false, student: false },
    { module: 'Online Fee Payment Checkout', superAdmin: false, teacher: false, accountant: false, parent: true, student: false },
    { module: 'Live Bus Fleet GPS Telemetry', superAdmin: true, teacher: false, accountant: false, parent: true, student: true },
    { module: 'Hostel Room & Bed Allocation', superAdmin: true, teacher: false, accountant: false, parent: false, student: false },
    { module: 'Campus Gate Visitor Pass Generation', superAdmin: true, teacher: false, accountant: false, parent: false, student: false },
    { module: 'System RBAC & Audit Trails', superAdmin: true, teacher: false, accountant: false, parent: false, student: false },
  ];

  const auditLogs = [
    { id: 'aud-01', user: 'admin@vidyamandir.edu.in', action: 'Published Half-Yearly Class 10-A Marks Tabulation', ip: '192.168.1.104', timestamp: '2026-09-25 09:12 AM' },
    { id: 'aud-02', user: 'l.raman@vidyamandir.edu.in', action: 'Submitted Class 10-A Morning Attendance Register', ip: '10.0.4.52', timestamp: '2026-09-25 07:55 AM' },
    { id: 'aud-03', user: 'accounts@vidyamandir.edu.in', action: 'Issued Receipt VMPS/2026-27/REC-4891 (₹28,500 Cash)', ip: '192.168.1.112', timestamp: '2026-09-24 11:24 AM' },
    { id: 'aud-04', user: 'security.gate1@vidyamandir.edu.in', action: 'Issued Visitor Gate Pass VP-2026-0814', ip: '10.0.1.1', timestamp: '2026-09-25 09:15 AM' },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-slate-800" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Enterprise System Administration & Security
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Granular Role-Based Access Control (RBAC), multi-factor authentication, audit logs, and session controls.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('rbac')}
            className={`px-3 py-1 font-semibold rounded ${
              activeTab === 'rbac' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
            }`}
          >
            RBAC Matrix
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1 font-semibold rounded ${
              activeTab === 'audit' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
            }`}
          >
            Audit Trail Logs
          </button>
        </div>
      </div>

      {activeTab === 'rbac' ? (
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Role-Based Access Control (RBAC) Permissions</h3>
              <p className="text-slate-500 text-[11px]">Strict institutional segregation of duties</p>
            </div>
            <Badge variant="info">Enforced via FastAPI Middleware</Badge>
          </div>

          <div className="border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200 text-[10px] uppercase">
                <tr>
                  <th className="py-2.5 px-3">Module / Permission Scope</th>
                  <th className="py-2.5 px-3 text-center">Super Admin</th>
                  <th className="py-2.5 px-3 text-center">Teacher</th>
                  <th className="py-2.5 px-3 text-center">Accountant</th>
                  <th className="py-2.5 px-3 text-center">Parent</th>
                  <th className="py-2.5 px-3 text-center">Student</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissionsMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{row.module}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-emerald-600 font-bold">✓</span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {row.teacher ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {row.accountant ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {row.parent ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {row.student ? <span className="text-emerald-600 font-bold">✓</span> : <span className="text-slate-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Immutable Security Audit Trail</h3>
              <p className="text-slate-500 text-[11px]">System events, financial modifications, and data exports</p>
            </div>
            <Badge variant="slate">SHA-256 Chained</Badge>
          </div>

          <div className="divide-y divide-slate-100">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{log.action}</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    User: {log.user} • IP Address: {log.ip}
                  </p>
                </div>
                <span className="font-mono text-slate-500 text-[11px]">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
