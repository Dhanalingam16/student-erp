'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { INSTITUTION_INFO } from '@/lib/constants';
import { FileCheck, Printer, Download, Plus, Search, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';

export default function CertificatesPage() {
  const { students } = useERPStore();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [certType, setCertType] = useState<'bonafide' | 'tc' | 'character'>('bonafide');
  const [previewOpen, setPreviewOpen] = useState(false);

  const student = students.find((s) => s.id === selectedStudentId) || students[0];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-emerald-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Institutional Certificates & Document Issuance
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Generate digitally verifiable Transfer Certificates (TC), Bonafide certificates, and Character certificates.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setPreviewOpen(true)}>
          <Printer className="h-3.5 w-3.5 mr-1" />
          Generate & Print Certificate
        </Button>
      </div>

      {/* Selector Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 text-sm">Certificate Configuration</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-slate-800 block mb-1">Select Student</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
            >
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.fullName} (Class {st.classSection} • Roll {st.rollNumber} • {st.admissionNo})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-800 block mb-1">Certificate Type</label>
            <select
              value={certType}
              onChange={(e) => setCertType(e.target.value as any)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
            >
              <option value="bonafide">Bonafide Student Certificate (For Passport / Bank / Scholarship)</option>
              <option value="tc">Transfer Certificate (TC - School Leaving Certificate)</option>
              <option value="character">Conduct & Character Certificate</option>
            </select>
          </div>
        </div>
      </div>

      {/* Printable Preview Container */}
      <div className="border-2 border-navy-900 rounded-lg p-8 bg-white space-y-6 shadow-sm max-w-3xl mx-auto text-xs">
        <div className="text-center border-b-2 border-navy-950 pb-4 space-y-1">
          <h2 className="font-extrabold text-base uppercase text-navy-950 tracking-wider">
            {INSTITUTION_INFO.name}
          </h2>
          <p className="text-slate-500 text-[11px]">{INSTITUTION_INFO.address}</p>
          <p className="text-slate-500 text-[11px]">
            Affiliated to Central Board of Secondary Education (CBSE) • Affiliation No. {INSTITUTION_INFO.affiliationNo}
          </p>
          <div className="pt-2">
            <span className="font-bold text-xs uppercase px-3 py-1 rounded bg-slate-100 border border-slate-300 tracking-widest text-slate-900">
              {certType === 'bonafide'
                ? '★ BONAFIDE STUDENT CERTIFICATE ★'
                : certType === 'tc'
                ? '★ TRANSFER CERTIFICATE (TC) ★'
                : '★ CONDUCT & CHARACTER CERTIFICATE ★'}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-slate-800 leading-relaxed text-sm font-serif">
          <p>
            Certificate Ref No: <span className="font-mono font-bold">VMPS/CERT/2026/0419</span>
            <span className="float-right font-mono">Date: 25 September 2026</span>
          </p>

          <p className="pt-2">
            This is to certify that Master / Kumari <strong>{student.fullName}</strong>, Son / Daughter of{' '}
            <strong>{student.parentName}</strong>, is a bonafide student of this institution studying in{' '}
            <strong>Class {student.classSection}</strong> during the academic session <strong>2026–2027</strong>.
          </p>

          <p>
            His / Her Admission Number as per the General School Register is <strong>{student.admissionNo}</strong> and Date of Birth as recorded is <strong>{student.dob}</strong>.
          </p>

          <p>
            During his / her tenure at the institution, his / her general conduct and moral character have been observed to be <strong>Exemplary</strong>.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-200 text-center text-xs">
          <div>
            <div className="w-24 h-12 border-b border-dashed border-slate-400 mx-auto mb-1 flex items-center justify-center text-[10px] text-slate-400">
              [School Seal]
            </div>
            <p className="font-bold text-slate-900">School Registrar</p>
          </div>
          <div>
            <div className="w-32 h-12 border-b border-dashed border-slate-400 mx-auto mb-1" />
            <p className="font-bold text-slate-900">Dr. Arvind Swaminathan</p>
            <p className="text-[10px] text-slate-500">Principal & Director</p>
          </div>
        </div>
      </div>
    </div>
  );
}
