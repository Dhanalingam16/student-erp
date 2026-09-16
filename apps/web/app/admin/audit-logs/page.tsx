'use client';

import React from 'react';
import { Lock, Shield, CheckCircle } from 'lucide-react';
import { Badge } from '@school-erp/ui';

export default function AuditLogsPage() {
  const logs = [
    { id: 'LOG-01', user: 'Dr. Rajesh Sharma', action: 'Updated Fee Structure Quarter 2', timestamp: '2026-09-15 11:20:14', ip: '192.168.1.42', status: 'Success' },
    { id: 'LOG-02', user: 'Priya Sundaram', action: 'Submitted Grade 10 Attendance', timestamp: '2026-09-15 09:15:02', ip: '192.168.1.88', status: 'Success' },
    { id: 'LOG-03', user: 'Super Admin', action: 'Onboarded School Tenant DPA-MUM', timestamp: '2026-09-14 16:45:22', ip: '10.0.0.1', status: 'Success' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">Security & Audit Compliance Logs</h1>
        <p className="text-xs text-slate-500 mt-1">Immutable security ledger tracking system interactions & administrative actions</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
            <tr>
              <th className="py-3 px-4">Log ID</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Action</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">IP / Device</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {logs.map(l => (
              <tr key={l.id}>
                <td className="py-3 px-4 font-bold text-slate-900">{l.id}</td>
                <td className="py-3 px-4 font-sans font-semibold text-slate-800">{l.user}</td>
                <td className="py-3 px-4 font-sans text-slate-700">{l.action}</td>
                <td className="py-3 px-4 text-slate-500">{l.timestamp}</td>
                <td className="py-3 px-4 text-slate-500">{l.ip}</td>
                <td className="py-3 px-4"><Badge variant="success">{l.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
