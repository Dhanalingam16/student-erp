'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { ClinicVisit } from '@/types';
import { Stethoscope, Plus, HeartPulse, ShieldAlert, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ClinicPage() {
  const { clinicVisits } = useERPStore();

  const columns: ColumnDef<ClinicVisit>[] = [
    {
      header: 'Time',
      accessorKey: 'visitTime',
      sortable: true,
      className: 'w-24 font-mono font-bold text-slate-800',
    },
    {
      header: 'Student Name',
      accessorKey: 'studentName',
      sortable: true,
      cell: (v) => (
        <div>
          <span className="font-bold text-slate-900">{v.studentName}</span>
          <span className="block text-[10px] text-slate-400">Class {v.classSection}</span>
        </div>
      ),
    },
    {
      header: 'Reported Symptoms',
      accessorKey: 'symptoms',
      className: 'text-slate-800 font-medium',
    },
    {
      header: 'First-Aid / Treatment Administered',
      accessorKey: 'treatment',
      className: 'text-slate-600 text-xs',
    },
    {
      header: 'Medication Given',
      accessorKey: 'medicationGiven',
      className: 'font-mono text-xs text-navy-900',
    },
    {
      header: 'Parent Notified',
      accessorKey: 'parentNotified',
      className: 'text-center',
      cell: (v) => (
        <Badge variant={v.parentNotified ? 'success' : 'slate'}>
          {v.parentNotified ? 'NOTIFIED (SMS/CALL)' : 'ROUTINE DISMISS'}
        </Badge>
      ),
    },
    {
      header: 'Attending Nurse',
      accessorKey: 'attendingNurse',
      className: 'text-slate-500 text-xs',
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-rose-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              School Health Infirmary & Medical Records
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Emergency triage register, prescription logs, student blood group profiles, and parent intimation.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Log Infirmary Visit
        </Button>
      </div>

      <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeartPulse className="h-4 w-4 text-rose-600 shrink-0" />
          <span>
            Campus Medical Officer on duty: <strong>Dr. Ananya Ray (MBBS)</strong> & <strong>Sister Anita Roy (RN)</strong>. Ambulance stationed at Gate 2.
          </span>
        </div>
        <span className="font-mono font-bold text-rose-800">Direct Helpline: Ext. 108</span>
      </div>

      <DataTable
        data={clinicVisits}
        columns={columns}
        searchPlaceholder="Search clinic visits by student or symptoms..."
        searchKey="studentName"
        exportFileName="health-infirmary-log"
      />
    </div>
  );
}
