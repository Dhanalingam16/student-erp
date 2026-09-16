'use client';

import React from 'react';
import { Settings, Save, Building } from 'lucide-react';
import { Button } from '@school-erp/ui';

export default function SchoolSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">School Profile & System Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Configure academic year, school branding, term dates & notification defaults</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Institutional Configuration</h3>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">School Official Name</label>
          <input type="text" defaultValue="St. Xavier International School" className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Active Academic Year</label>
            <select className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900 bg-white">
              <option>2026 - 2027</option>
              <option>2025 - 2026</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Affiliation Code</label>
            <input type="text" defaultValue="CBSE-DEL-99021" className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button variant="primary" size="sm" leftIcon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
