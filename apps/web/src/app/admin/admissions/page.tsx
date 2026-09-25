'use client';

import React, { useState } from 'react';
import { UserCheck, Plus, CheckCircle2, Clock, Phone, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Lead {
  id: string;
  applicantName: string;
  appliedClass: string;
  parentName: string;
  phone: string;
  stage: 'inquiry' | 'application' | 'interview' | 'enrolled';
  score?: number;
  date: string;
}

export default function AdmissionsPage() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 'adm-01', applicantName: 'Siddharth Menon', appliedClass: '11-Science', parentName: 'Dr. G. Menon', phone: '+91 98110 44551', stage: 'interview', score: 88, date: '2026-09-20' },
    { id: 'adm-02', applicantName: 'Kavya Raghavan', appliedClass: '6', parentName: 'Mr. R. Raghavan', phone: '+91 98711 22334', stage: 'application', date: '2026-09-22' },
    { id: 'adm-03', applicantName: 'Dhruv Singhal', appliedClass: '10', parentName: 'Mr. A. Singhal', phone: '+91 99110 55667', stage: 'enrolled', score: 92, date: '2026-09-18' },
    { id: 'adm-04', applicantName: 'Rhea Chakraborty', appliedClass: '11-Commerce', parentName: 'Mrs. S. Chakraborty', phone: '+91 98104 99881', stage: 'inquiry', date: '2026-09-24' },
    { id: 'adm-05', applicantName: 'Arjun Bansal', appliedClass: '1', parentName: 'Mr. N. Bansal', phone: '+91 97114 33221', stage: 'application', date: '2026-09-23' },
  ]);

  const stages = [
    { key: 'inquiry', label: 'New Enquiries', count: leads.filter((l) => l.stage === 'inquiry').length },
    { key: 'application', label: 'Entrance Scheduled', count: leads.filter((l) => l.stage === 'application').length },
    { key: 'interview', label: 'Principal Interview', count: leads.filter((l) => l.stage === 'interview').length },
    { key: 'enrolled', label: 'Enrolled & Paid', count: leads.filter((l) => l.stage === 'enrolled').length },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-blue-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Admissions CRM & Enrollment Pipeline
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Prospect tracking, entrance test evaluations, document audits, and automated student conversion.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="h-3.5 w-3.5 mr-1" />
          New Application
        </Button>
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stages.map((stg) => (
          <div key={stg.key} className="bg-slate-100 rounded-lg p-3 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {stg.label}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white text-slate-800 text-[10px] font-bold font-mono border border-slate-200">
                {stg.count}
              </span>
            </div>

            <div className="space-y-2.5">
              {leads
                .filter((l) => l.stage === stg.key)
                .map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white p-3 rounded border border-slate-200 shadow-xs hover:border-navy-600 transition-colors space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-900">{lead.applicantName}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                        Class {lead.appliedClass}
                      </span>
                    </div>

                    <p className="text-slate-600 text-[11px]">Guardian: {lead.parentName}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
                      <span>{lead.phone}</span>
                      {lead.score && (
                        <span className="font-bold text-emerald-700">Test: {lead.score}%</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
