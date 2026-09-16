'use client';

import React from 'react';
import { mockSchools } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { Building, Plus, Settings } from 'lucide-react';

export default function AdminSchoolsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Schools Directory & Multi-Tenant Management</h1>
          <p className="text-xs text-slate-500 mt-1">Configure individual school tenants, quotas & licenses</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Onboard New School
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockSchools.map(sch => (
          <div key={sch.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img src={sch.logo} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{sch.name}</h3>
                  <p className="text-xs text-slate-500">{sch.code} • {sch.address}</p>
                </div>
              </div>
              <Badge variant="success">{sch.status}</Badge>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Principal: <strong className="text-slate-900">{sch.principalName}</strong></p>
              <p>Students: <strong className="text-slate-900">{sch.activeStudents.toLocaleString()}</strong> | Faculty: <strong className="text-slate-900">{sch.activeTeachers}</strong></p>
              <p>Plan Tier: <span className="font-semibold text-blue-600">{sch.subscriptionPlan}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
