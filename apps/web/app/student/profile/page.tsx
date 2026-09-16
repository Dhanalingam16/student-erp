'use client';

import React from 'react';
import { mockStudents } from '@school-erp/mock-data';
import { User, Phone, MapPin, HeartPulse } from 'lucide-react';

export default function StudentProfilePage() {
  const student = mockStudents[0];

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
        <img src={student.avatar} alt="" className="w-16 h-16 rounded-xl object-cover ring-2 ring-slate-200" />
        <div>
          <h1 className="text-xl font-bold text-slate-900">{student.name}</h1>
          <p className="text-xs text-slate-500">{student.className} - {student.section} • Roll #{student.rollNo} • ID: {student.id}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Student Digital ID & Details</h3>
        <p><strong className="text-slate-900">Guardian Name:</strong> {student.parentName}</p>
        <p><strong className="text-slate-900">Guardian Phone:</strong> {student.parentPhone}</p>
        <p><strong className="text-slate-900">Blood Group:</strong> {student.bloodGroup}</p>
        <p><strong className="text-slate-900">Address:</strong> {student.address}</p>
      </div>
    </div>
  );
}
