'use client';

import React from 'react';
import { StatCard, AIInsightCard, Badge, Button } from '@school-erp/ui';
import { Building, Users, ShieldCheck, Cpu, Lock, LineChart, Plus, CheckCircle, AlertTriangle } from 'lucide-react';
import { mockSchools } from '@school-erp/mock-data';

export default function SuperAdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Super Admin Governance Platform</span>
          <h1 className="text-xl font-bold tracking-tight mt-0.5">Multi-Tenant Platform Control</h1>
          <p className="text-xs text-slate-400 mt-1">Global platform monitoring across all registered schools & tenant instances</p>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Onboard New School
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Schools / Tenants" value="14 Schools" change="100% Operational" changeType="positive" icon={<Building className="w-5 h-5 text-blue-600" />} />
        <StatCard title="Global Active Users" value="48,500 Users" change="Students & Staff" changeType="positive" icon={<Users className="w-5 h-5 text-indigo-600" />} />
        <StatCard title="System Uptime SLA" value="99.99%" change="0 Outages" changeType="positive" icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />} />
        <StatCard title="Security Alerts" value="0 Critical" change="Audit Logs Clean" changeType="neutral" icon={<Lock className="w-5 h-5 text-slate-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Managed Schools Directory */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Registered School Tenants</h3>
          <div className="space-y-3">
            {mockSchools.map(sch => (
              <div key={sch.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={sch.logo} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">{sch.name}</p>
                    <p className="text-[11px] text-slate-500">{sch.code} • Principal: {sch.principalName}</p>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <span className="font-bold text-slate-900 block">{sch.activeStudents.toLocaleString()} Students</span>
                  <Badge variant="success">{sch.subscriptionPlan} Plan</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">System Infrastructure Health</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-emerald-50 text-emerald-900 rounded border border-emerald-200 flex items-center justify-between">
              <span className="font-semibold">Core Database Cluster</span>
              <span className="font-bold">Healthy (4ms)</span>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-900 rounded border border-emerald-200 flex items-center justify-between">
              <span className="font-semibold">Storage & Media CDN</span>
              <span className="font-bold">99.9% Online</span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-900 rounded border border-blue-200 flex items-center justify-between">
              <span className="font-semibold">Mock Service Worker</span>
              <span className="font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
