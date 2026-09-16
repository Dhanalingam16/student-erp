'use client';

import React from 'react';
import { mockHealthRecords } from '@school-erp/mock-data';
import { HeartPulse, Plus } from 'lucide-react';
import { Button, Badge } from '@school-erp/ui';

export default function HealthPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Health & Clinic Records</h1>
          <p className="text-xs text-slate-500 mt-1">Student medical profiles, clinic visit logs & allergy alerts</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Log Clinic Visit
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockHealthRecords.map(h => (
          <div key={h.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">{h.studentName}</h3>
              <Badge variant="danger">Blood: {h.bloodGroup}</Badge>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Height: {h.heightCm} cm • Weight: {h.weightKg} kg</p>
              <p>Allergies: <span className="font-semibold text-amber-800">{h.allergies.join(', ')}</span></p>
              <p>Emergency Contact: {h.emergencyContact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
