'use client';

import React, { useState } from 'react';
import { mockAdmissionLeads } from '@school-erp/mock-data';
import { AdmissionLead } from '@school-erp/types';
import { Badge, Button } from '@school-erp/ui';
import { UserPlus, ArrowRight, CheckCircle, ChevronRight, Phone, Mail } from 'lucide-react';

const STAGES: AdmissionLead['status'][] = ['Enquiry', 'Application', 'Verification', 'Interview', 'Approved', 'Enrolled'];

export default function AdmissionsCRMPage() {
  const [leads, setLeads] = useState<AdmissionLead[]>(mockAdmissionLeads);

  const moveStage = (id: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        const currIndex = STAGES.indexOf(l.status);
        const nextStage = STAGES[Math.min(currIndex + 1, STAGES.length - 1)];
        return { ...l, status: nextStage };
      }
      return l;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Admissions CRM Pipeline</h1>
          <p className="text-xs text-slate-500 mt-1">Interactive lead funnel from Enquiry to Enrollment</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
          Add New Applicant Lead
        </Button>
      </div>

      {/* Visual Pipeline Funnel Overview Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between overflow-x-auto">
        {STAGES.map((stage, i) => {
          const count = leads.filter(l => l.status === stage).length;
          return (
            <React.Fragment key={stage}>
              <div className="flex flex-col items-center min-w-[100px] text-center">
                <span className="text-xs font-bold text-slate-900">{stage}</span>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1">{count} Leads</span>
              </div>
              {i < STAGES.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Kanban Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STAGES.map(stage => {
          const stageLeads = leads.filter(l => l.status === stage);
          return (
            <div key={stage} className="bg-slate-100/70 p-3 rounded-xl border border-slate-200/80 min-h-[350px] flex flex-col">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">{stage}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-600">
                  {stageLeads.length}
                </span>
              </div>

              <div className="space-y-2 flex-1">
                {stageLeads.map(lead => (
                  <div key={lead.id} className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-2">
                    <p className="text-xs font-bold text-slate-900">{lead.applicantName}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{lead.applyingClass}</p>
                    <div className="text-[10px] text-slate-400 space-y-0.5">
                      <p>Parent: {lead.parentName}</p>
                      <p>{lead.phone}</p>
                    </div>

                    {stage !== 'Enrolled' && (
                      <button
                        onClick={() => moveStage(lead.id)}
                        className="w-full mt-2 py-1 px-2 bg-slate-900 text-white rounded text-[10px] font-semibold flex items-center justify-center gap-1 hover:bg-slate-800 transition-colors"
                      >
                        <span>Advance Stage</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
