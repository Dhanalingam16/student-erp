'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { INSTITUTION_INFO } from '@/lib/constants';
import {
  FileText,
  Phone,
  Mail,
  Printer,
  ShieldAlert,
  Calendar,
  Building,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ParentMorePage() {
  const { selectedChild } = useERPStore();

  const menuSections = [
    {
      title: 'Academic Documents',
      items: [
        { label: 'Half-Yearly Report Card (2026)', desc: 'Download CBSE transcript with school seal' },
        { label: 'Fee Payment Receipts (All Terms)', desc: 'Digitally signed tax receipts' },
        { label: 'Bonafide Student Certificate', desc: 'Passport & scholarship verification' },
      ],
    },
    {
      title: 'Institution & Emergency Contacts',
      items: [
        { label: 'School Reception / PBX', desc: INSTITUTION_INFO.phone },
        { label: 'Transport Helpline & Fleet Desk', desc: '+91 11 2808 4505 (6:00 AM – 7:00 PM)' },
        { label: 'Campus Medical Dispensary', desc: 'Ext. 108 • Sister Anita Roy (RN)' },
      ],
    },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Student Profile Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-navy-900 text-white font-bold text-lg flex items-center justify-center">
            {selectedChild.firstName[0]}
            {selectedChild.lastName[0]}
          </div>
          <div>
            <h2 className="font-bold text-base text-slate-900">{selectedChild.fullName}</h2>
            <p className="text-[11px] text-slate-500">
              Admission: <span className="font-mono">{selectedChild.admissionNo}</span> • Class {selectedChild.classSection}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-700">
          <div>
            <span className="text-slate-400 block text-[10px]">Blood Group</span>
            <span className="font-bold">{selectedChild.bloodGroup}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Roll Number</span>
            <span className="font-mono font-bold">{selectedChild.rollNumber}</span>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      {menuSections.map((sec, idx) => (
        <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2">
          <h3 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider border-b border-slate-100 pb-1.5">
            {sec.title}
          </h3>

          <div className="divide-y divide-slate-100">
            {sec.items.map((item, iIdx) => (
              <div
                key={iIdx}
                onClick={() => window.print()}
                className="py-2.5 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors px-1"
              >
                <div>
                  <p className="font-semibold text-slate-900">{item.label}</p>
                  <p className="text-[10px] text-slate-500">{item.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
