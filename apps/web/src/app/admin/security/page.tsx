'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { VisitorPass } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { VisitorPassModal } from '@/components/modals/VisitorPassModal';
import {
  ShieldCheck,
  Plus,
  Clock,
  LogOut,
  Printer,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

export default function SecurityPage() {
  const { visitorPasses, checkoutVisitor } = useERPStore();
  const [isNewPassOpen, setIsNewPassOpen] = useState(false);

  const columns: ColumnDef<VisitorPass>[] = [
    {
      header: 'Pass #',
      accessorKey: 'passNumber',
      sortable: true,
      className: 'font-mono font-bold text-slate-900',
    },
    {
      header: 'Visitor Details',
      accessorKey: 'visitorName',
      sortable: true,
      cell: (v) => (
        <div>
          <span className="font-bold text-slate-900">{v.visitorName}</span>
          <span className="block text-[10px] text-slate-400 font-mono">{v.phone}</span>
        </div>
      ),
    },
    {
      header: 'Visiting Officer / Reason',
      accessorKey: 'purpose',
      cell: (v) => (
        <div>
          <span className="font-medium text-slate-800">{v.meetingPerson}</span>
          <span className="block text-[10px] text-slate-500 italic">{v.purpose}</span>
        </div>
      ),
    },
    {
      header: 'Vehicle',
      accessorKey: 'vehicleNumber',
      cell: (v) => (v.vehicleNumber ? <span className="font-mono">{v.vehicleNumber}</span> : 'Pedestrian'),
    },
    {
      header: 'Entry / Exit',
      cell: (v) => (
        <div className="font-mono text-slate-700">
          <span>In: {v.entryTime}</span>
          {v.exitTime && <span className="block text-[10px] text-slate-400">Out: {v.exitTime}</span>}
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (v) => (
        <Badge variant={v.status === 'active' ? 'warning' : 'slate'}>
          {v.status === 'active' ? 'INSIDE CAMPUS' : 'CHECKED OUT'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      cell: (v) => (
        <div className="flex items-center gap-1.5">
          {v.status === 'active' ? (
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 text-[11px] text-rose-700 hover:bg-rose-50"
              onClick={() => checkoutVisitor(v.id)}
            >
              <LogOut className="h-3 w-3 mr-1" />
              Checkout
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 text-[11px]"
              onClick={() => window.print()}
            >
              <Printer className="h-3 w-3 mr-1" />
              Pass
            </Button>
          )}
        </div>
      ),
    },
  ];

  const activeVisitorsCount = visitorPasses.filter((v) => v.status === 'active').length;

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-amber-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Campus Security & Gate Visitor Registry
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Real-time biometric & digital gate badges for parents, vendors, and inspectors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={activeVisitorsCount > 0 ? 'warning' : 'success'}>
            {activeVisitorsCount} Visitors Currently on Campus
          </Badge>
          <Button variant="primary" size="sm" onClick={() => setIsNewPassOpen(true)}>
            <Plus className="h-3.5 w-3.5 mr-1" />
            Issue Gate Pass
          </Button>
        </div>
      </div>

      {/* Visitor Passes Table */}
      <DataTable
        data={visitorPasses}
        columns={columns}
        searchPlaceholder="Search visitor name, phone, or pass number..."
        searchKey="visitorName"
        exportFileName="gate-visitors-register"
      />

      <VisitorPassModal isOpen={isNewPassOpen} onClose={() => setIsNewPassOpen(false)} />
    </div>
  );
}
