'use client';

import React, { useState } from 'react';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useERPStore } from '@/lib/store';
import { StudentMarks } from '@/types';
import { calculateCbseGrade } from '@/lib/constants';
import { Save, CheckCircle, AlertTriangle } from 'lucide-react';

interface MarksEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  examTitle?: string;
  subjectName?: string;
}

export function MarksEntryModal({
  isOpen,
  onClose,
  examTitle = 'Half-Yearly Examination 2026',
  subjectName = 'Mathematics (Standard)',
}: MarksEntryModalProps) {
  const { marks, submitMarks } = useERPStore();
  const [currentMarks, setCurrentMarks] = useState<StudentMarks[]>(marks);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const maxMarks = 80;

  const handleScoreChange = (studentId: string, newScoreStr: string) => {
    const score = Number(newScoreStr);
    if (isNaN(score) || score < 0) return;
    if (score > maxMarks) {
      setValidationError(`Marks cannot exceed maximum marks (${maxMarks})`);
      return;
    }
    setValidationError(null);

    setCurrentMarks((prev) =>
      prev.map((item) => {
        if (item.studentId === studentId) {
          const grade = calculateCbseGrade(score, maxMarks);
          return { ...item, marksObtained: score, grade };
        }
        return item;
      })
    );
  };

  const handleRemarkChange = (studentId: string, remarks: string) => {
    setCurrentMarks((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, remarks } : item))
    );
  };

  const handleSave = () => {
    submitMarks('exam-hy-2026-math', currentMarks);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Enter Examination Marks — ${subjectName}`}
      description={`${examTitle} • Class 10-A • Maximum Theory Marks: ${maxMarks} • Pass Marks: 27`}
      maxWidth="3xl"
    >
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded">
          <div>
            <span className="font-semibold text-slate-800">Class 10-A Tabulation Sheet</span>
            <p className="text-[11px] text-slate-500">
              CBSE 9-point grading scale (A1 to E) is computed automatically upon score input.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">
              Max Marks: {maxMarks}
            </span>
          </div>
        </div>

        {validationError && (
          <div className="p-2 bg-rose-50 border border-rose-200 rounded text-rose-700 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Tabulation Table */}
        <div className="border border-slate-200 rounded max-h-[380px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 text-slate-600 sticky top-0 uppercase tracking-wider text-[10px] select-none border-b border-slate-200">
              <tr>
                <th className="py-2 px-3 w-16">Roll</th>
                <th className="py-2 px-3">Student Name</th>
                <th className="py-2 px-3 w-28 text-center">Marks (/{maxMarks})</th>
                <th className="py-2 px-3 w-20 text-center">CBSE Grade</th>
                <th className="py-2 px-3">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentMarks.map((m) => (
                <tr key={m.studentId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-3 font-mono font-medium text-slate-700">{m.rollNumber}</td>
                  <td className="py-2 px-3 font-semibold text-slate-900">{m.studentName}</td>
                  <td className="py-2 px-3 text-center">
                    <input
                      type="number"
                      min={0}
                      max={maxMarks}
                      value={m.marksObtained}
                      onChange={(e) => handleScoreChange(m.studentId, e.target.value)}
                      className="w-16 text-center py-1 border border-slate-300 rounded font-mono font-bold text-slate-900 focus:ring-1 focus:ring-navy-600 bg-white"
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-xs ${
                        m.grade === 'A1'
                          ? 'bg-emerald-100 text-emerald-800'
                          : m.grade === 'A2'
                          ? 'bg-emerald-50 text-emerald-700'
                          : m.grade.startsWith('B')
                          ? 'bg-blue-50 text-blue-700'
                          : m.grade.startsWith('C')
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {m.grade}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="text"
                      value={m.remarks || ''}
                      onChange={(e) => handleRemarkChange(m.studentId, e.target.value)}
                      placeholder="Feedback..."
                      className="w-full px-2 py-0.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy-600 bg-white"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-200">
          <p className="text-[11px] text-slate-400">
            Saving updates student report cards and class performance analytics immediately.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave}>
              <Save className="h-3.5 w-3.5 mr-1" />
              {isSaved ? 'Tabulation Saved!' : 'Save Tabulation'}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
