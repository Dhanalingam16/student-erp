'use client';

import React from 'react';
import { mockTransportRoutes } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { Bus, MapPin, Phone, User, Plus } from 'lucide-react';

export default function TransportFleetPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Transport Fleet & Bus Routes</h1>
          <p className="text-xs text-slate-500 mt-1">Manage 12 active buses, drivers, student allocations & pickup stops</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Add Bus Route
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTransportRoutes.map(tr => (
          <div key={tr.id} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{tr.routeName}</h3>
                <p className="text-xs font-mono text-slate-500 mt-0.5">{tr.busNo} • {tr.allocatedStudents}/{tr.capacity} Capacity</p>
              </div>
              <Badge variant="success">{tr.status}</Badge>
            </div>
            <div className="text-xs text-slate-600 space-y-1.5">
              <p className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-slate-400" /> Driver: <strong className="text-slate-900">{tr.driverName}</strong> ({tr.driverPhone})</p>
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /> Route: {tr.startPoint} ➔ {tr.endPoint} ({tr.totalStops} Stops)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
