'use client';

import React from 'react';
import { Sliders, Save } from 'lucide-react';
import { Button } from '@school-erp/ui';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">System Platform Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Configure global platform flags, storage endpoints & backup schedules</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Global Feature Flags</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">Mock Service Layer Intercept</p>
              <p className="text-slate-500">Return local mock datasets for all 5 role viewports</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-slate-900" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">AI Insight Simulation Engine</p>
              <p className="text-slate-500">Display role-based intelligent recommendations</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-slate-900" />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button variant="primary" size="sm" leftIcon={<Save className="w-4 h-4" />}>
            Save Global Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
