'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { SUBJECTS_CLASS_10 } from '@/lib/constants';
import { BookOpen, Download, Upload, CheckCircle2, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';

export default function StudentAcademicsPage() {
  const { homework } = useERPStore();
  const [selectedHw, setSelectedHw] = useState<any | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUploadSolution = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploaded(true);
    setTimeout(() => {
      setIsUploaded(false);
      setSelectedHw(null);
    }, 1200);
  };

  const lmsChapters = [
    { subject: 'Mathematics', title: 'Chapter 8: Quadratic Equations (NCERT Solutions & Formulae)', file: 'Math_Ch8_Quadratic_NCERT_Key.pdf', size: '2.4 MB' },
    { subject: 'Mathematics', title: 'Chapter 9: Some Applications of Trigonometry (Heights & Distances)', file: 'Trigo_Heights_Distances_Notes.pdf', size: '3.1 MB' },
    { subject: 'Science (Physics)', title: 'Chapter 10: Light - Reflection and Refraction (Ray Diagrams Guide)', file: 'Physics_Ray_Diagrams_Handbook.pdf', size: '4.8 MB' },
    { subject: 'Computer Applications', title: 'Unit 3: Relational Database & SQL Commands Reference', file: 'MySQL_DDL_DML_QuickRef.pdf', size: '1.2 MB' },
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Homework Submissions Desk */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Assigned Homework Tasks
          </h2>
          <Badge variant="warning">{homework.length} Active</Badge>
        </div>

        <div className="space-y-2.5">
          {homework.map((hw) => (
            <div key={hw.id} className="p-3 border border-slate-200 rounded space-y-2">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-900">{hw.title}</span>
                <span className="font-mono text-[10px] font-bold text-rose-700 ml-1">Due {hw.dueDate}</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">{hw.description}</p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                <span className="text-slate-400 font-mono">
                  {hw.subject} • {hw.teacherName}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-[10px] text-navy-900 font-bold"
                  onClick={() => setSelectedHw(hw)}
                >
                  <Upload className="h-3 w-3 mr-1" />
                  Submit Work
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Downloadable Chapter Notes (LMS) */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-3">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Study Materials & Lecture Notes
          </h2>
          <Badge variant="info">Faculty Uploaded</Badge>
        </div>

        <div className="space-y-2">
          {lmsChapters.map((ch, idx) => (
            <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
              <div>
                <span className="font-semibold text-slate-900 line-clamp-1">{ch.title}</span>
                <p className="text-[10px] text-slate-400 font-mono">
                  {ch.subject} • {ch.size}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-[10px] shrink-0"
                onClick={() => alert(`Downloading ${ch.file}...`)}
              >
                <Download className="h-3 w-3 mr-1" />
                PDF
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Homework Upload Modal */}
      {selectedHw && (
        <Dialog
          isOpen={!!selectedHw}
          onClose={() => setSelectedHw(null)}
          title={`Submit Assignment: ${selectedHw.title}`}
          description={`Class 10-A • ${selectedHw.subject} • Deadline: ${selectedHw.dueDate}`}
          maxWidth="md"
        >
          {isUploaded ? (
            <div className="py-6 text-center space-y-1">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-slate-900 text-sm">Solution Uploaded Successfully!</p>
              <p className="text-[11px] text-slate-500">Submitted to {selectedHw.teacherName}.</p>
            </div>
          ) : (
            <form onSubmit={handleUploadSolution} className="space-y-3.5 text-xs">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-5 text-center space-y-2 bg-slate-50">
                <Upload className="h-6 w-6 text-slate-400 mx-auto" />
                <p className="font-semibold text-slate-700">Choose file or drag and drop</p>
                <p className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB</p>
                <input type="file" className="text-[11px] text-slate-500 mx-auto" />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Student Comments (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Completed all 9 questions with graphs"
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded bg-white text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <Button type="button" variant="outline" size="sm" onClick={() => setSelectedHw(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Turn In Assignment
                </Button>
              </div>
            </form>
          )}
        </Dialog>
      )}
    </div>
  );
}
