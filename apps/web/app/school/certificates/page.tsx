'use client';

import React from 'react';
import { mockCertificates } from '@school-erp/mock-data';
import { Award, Plus, Download, Eye } from 'lucide-react';
import { Button, Badge } from '@school-erp/ui';

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Certificates & Document Centre</h1>
          <p className="text-xs text-slate-500 mt-1">Generate Transfer Certificates, Bonafides, Study Certificates & Transcripts</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Generate New Certificate
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
            <tr>
              <th className="py-3 px-4">Certificate No</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Requested By</th>
              <th className="py-3 px-4">Issue Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockCertificates.map(crt => (
              <tr key={crt.id}>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">{crt.certificateNo}</td>
                <td className="py-3 px-4 font-semibold text-slate-800">{crt.type}</td>
                <td className="py-3 px-4">{crt.studentName}</td>
                <td className="py-3 px-4 text-slate-500">{crt.requestedBy}</td>
                <td className="py-3 px-4">{crt.issueDate}</td>
                <td className="py-3 px-4"><Badge variant="success">{crt.status}</Badge></td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>Preview & Print</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
