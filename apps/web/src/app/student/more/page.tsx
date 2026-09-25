'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { INSTITUTION_INFO } from '@/lib/constants';
import {
  User,
  CreditCard,
  BookMarked,
  FileCheck2,
  Printer,
  Barcode,
  Building,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function StudentMorePage() {
  const { students } = useERPStore();
  const student = students[0]; // Aarav Sharma

  return (
    <div className="space-y-4 text-xs">
      {/* Official Digital Student ID Card */}
      <div className="border-2 border-navy-950 rounded-xl p-4 bg-white shadow-md space-y-3">
        <div className="text-center border-b border-slate-200 pb-2">
          <span className="font-extrabold text-sm uppercase tracking-wide text-navy-950">
            {INSTITUTION_INFO.name}
          </span>
          <p className="text-[9px] text-slate-500">{INSTITUTION_INFO.address}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-navy-900 text-white font-bold text-[9px] uppercase tracking-widest">
            STUDENT IDENTITY CARD (2026–2027)
          </span>
        </div>

        <div className="flex gap-3 items-center">
          <div className="w-16 h-20 rounded bg-slate-200 border border-slate-300 flex flex-col items-center justify-center font-bold text-slate-500 shrink-0">
            <User className="h-8 w-8 text-slate-400" />
            <span className="text-[8px] uppercase">Photo</span>
          </div>

          <div className="space-y-1 text-slate-800 flex-1">
            <h3 className="font-bold text-sm text-navy-950">{student.fullName}</h3>
            <p>
              <span className="text-slate-400">Class:</span> <strong>Class {student.classSection}</strong>
            </p>
            <p>
              <span className="text-slate-400">Roll No:</span> <strong className="font-mono">{student.rollNumber}</strong>
            </p>
            <p>
              <span className="text-slate-400">Admission No:</span>{' '}
              <strong className="font-mono">{student.admissionNo}</strong>
            </p>
            <p>
              <span className="text-slate-400">Blood Group:</span> <strong>{student.bloodGroup}</strong>
            </p>
          </div>
        </div>

        {/* Barcode & Signature */}
        <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-[10px] text-slate-400">
          <div className="font-mono tracking-widest text-slate-800">||| | ||||| || |||| ||||</div>
          <div className="text-right">
            <p className="font-semibold text-slate-700">Dr. A. Swaminathan</p>
            <p className="text-[8px]">Principal</p>
          </div>
        </div>
      </div>

      {/* Library Borrowed Books */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2.5">
        <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
          <div className="flex items-center gap-1.5">
            <BookMarked className="h-4 w-4 text-emerald-600" />
            <h3 className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
              Library Borrowed Books
            </h3>
          </div>
          <Badge variant="success">1 Active Book</Badge>
        </div>

        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded space-y-1">
          <span className="font-bold text-slate-900 block">Concepts of Physics (Vol. 1) - H.C. Verma</span>
          <p className="text-[10px] text-slate-400 font-mono">Barcode: LIB-PHYS-40192 • Issued: 14 Sep 2026</p>
          <div className="flex justify-between items-center pt-1 border-t border-slate-100 text-[10px]">
            <span className="text-emerald-700 font-semibold">Due: 28 Sep 2026 (3 Days Left)</span>
            <span className="text-slate-500 font-mono">Fine: ₹0</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => window.print()}>
          <Printer className="h-3.5 w-3.5 mr-1" />
          Print Student ID Card
        </Button>
      </div>
    </div>
  );
}
