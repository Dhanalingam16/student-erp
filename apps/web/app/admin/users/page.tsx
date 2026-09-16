'use client';

import React from 'react';
import { DEMO_USERS } from '@school-erp/constants';
import { Badge, Button } from '@school-erp/ui';
import { Users, Plus, Shield } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Global User Accounts Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Delegated user accounts across all tenant institutions</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Create User Account
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
            <tr>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {DEMO_USERS.map((u, i) => (
              <tr key={i}>
                <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-3">
                  <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span>{u.name}</span>
                </td>
                <td className="py-3 px-4"><Badge variant="info">{u.role}</Badge></td>
                <td className="py-3 px-4 font-mono text-slate-500">{u.email}</td>
                <td className="py-3 px-4"><Badge variant="success">Active</Badge></td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="sm">Manage Permissions</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
