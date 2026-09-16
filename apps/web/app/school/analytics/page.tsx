'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Receipt } from 'lucide-react';
import { StatCard } from '@school-erp/ui';

export default function SchoolAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">Institution Analytics Centre</h1>
        <p className="text-xs text-slate-500 mt-1">Cross-module insights: Academics, Attendance, Admissions, Finance & HR</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Academic Pass Velocity" value="96.4%" change="+1.8% vs 2025" changeType="positive" icon={<TrendingUp className="w-5 h-5 text-emerald-600" />} />
        <StatCard title="Average Class Size" value="31.2 Students" change="Optimal ratio" changeType="neutral" icon={<Users className="w-5 h-5 text-blue-600" />} />
        <StatCard title="Fee Collection Rate" value="87.0%" change="Target 90%" changeType="positive" icon={<Receipt className="w-5 h-5 text-amber-600" />} />
        <StatCard title="Teacher Attendance" value="98.5%" change="250 Staff" changeType="positive" icon={<BarChart3 className="w-5 h-5 text-purple-600" />} />
      </div>
    </div>
  );
}
