'use client';

import React from 'react';
import { LineChart } from 'lucide-react';
import { StatCard } from '@school-erp/ui';

export default function AdminPlatformAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">Platform Global Growth Analytics</h1>
        <p className="text-xs text-slate-500 mt-1">Multi-tenant usage metrics, student registration velocity & system load</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Platform Students" value="48,500" change="+14% YoY" changeType="positive" icon={<LineChart className="w-5 h-5 text-blue-600" />} />
        <StatCard title="Total Schools Managed" value="14 Campuses" change="Active" changeType="positive" icon={<LineChart className="w-5 h-5 text-emerald-600" />} />
        <StatCard title="Daily API Operations" value="1.2M Calls" change="Mock Service" changeType="neutral" icon={<LineChart className="w-5 h-5 text-indigo-600" />} />
        <StatCard title="Platform Revenue MRR" value="₹42.5 L" change="SaaS Subscriptions" changeType="positive" icon={<LineChart className="w-5 h-5 text-purple-600" />} />
      </div>
    </div>
  );
}
