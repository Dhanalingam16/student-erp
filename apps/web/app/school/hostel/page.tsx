'use client';

import React from 'react';
import { mockHostelDorms } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { Building2, Plus, Phone } from 'lucide-react';

export default function HostelPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Hostel & Dormitory Management</h1>
          <p className="text-xs text-slate-500 mt-1">Room matrix, bed allocations, wardens & mess schedules</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Allocate Room Bed
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockHostelDorms.map(h => (
          <div key={h.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">{h.buildingName}</h3>
              <Badge variant="info">Room {h.roomNo}</Badge>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Type: <strong className="text-slate-900">{h.type} Room</strong> ({h.occupied}/{h.capacity} Occupied)</p>
              <p>Warden: {h.wardenName} ({h.wardenPhone})</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
