'use client';

import React from 'react';
import { Download, FileText, BookOpen } from 'lucide-react';
import { Button } from '@school-erp/ui';

export default function StudyMaterialsPage() {
  const materials = [
    { title: 'Mathematics Quadratic Equations Formulas & Proofs', subject: 'Mathematics', size: '2.4 MB', author: 'Priya Sundaram' },
    { title: 'Physics Electromagnetic Induction Lab Notes & Diagrams', subject: 'Physics', size: '4.8 MB', author: 'Dr. Amit Gupta' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900">Digital Study Materials & Downloads</h1>
        <p className="text-xs text-slate-500 mt-1">Course modules, lab reference sheets & sample question papers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((m, i) => (
          <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase">
              <FileText className="w-4 h-4" />
              <span>{m.subject}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
            <p className="text-xs text-slate-500">Uploaded by {m.author} • Size: {m.size}</p>
            <div className="pt-2">
              <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                Download PDF Resource
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
