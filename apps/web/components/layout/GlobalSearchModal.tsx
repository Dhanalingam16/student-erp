'use client';

import React, { useState, useEffect } from 'react';
import { Search, Users, Briefcase, FileSpreadsheet, Receipt, BookOpen, X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockStudents, mockTeachers, mockFeeLedgers, mockExams } from '@school-erp/mock-data';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // toggle opening handled by parent or shortcut
        }
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredStudents = q ? mockStudents.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.className.toLowerCase().includes(q)) : [];
  const filteredTeachers = q ? mockTeachers.filter(t => t.name.toLowerCase().includes(q) || t.department.toLowerCase().includes(q)) : [];
  const filteredFees = q ? mockFeeLedgers.filter(f => f.studentName.toLowerCase().includes(q) || f.status.toLowerCase().includes(q)) : [];
  const filteredExams = q ? mockExams.filter(e => e.title.toLowerCase().includes(q)) : [];

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center px-4 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search students (Rahul), teachers, classes, fees, exams... (⌘K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full px-3 py-4 text-sm bg-transparent outline-none text-slate-900 placeholder-slate-400"
          />
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {!query && (
            <div className="text-center py-8 text-xs text-slate-400">
              Type <span className="font-semibold text-slate-600">Rahul</span>, <span className="font-semibold text-slate-600">Grade 10</span>, or <span className="font-semibold text-slate-600">Fees</span> to instant search
            </div>
          )}

          {query && filteredStudents.length === 0 && filteredTeachers.length === 0 && filteredFees.length === 0 && filteredExams.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-500">
              No matching records found for "{query}"
            </div>
          )}

          {filteredStudents.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <Users className="w-3.5 h-3.5" /> Students
              </span>
              <div className="space-y-1">
                {filteredStudents.map(s => (
                  <div
                    key={s.id}
                    onClick={() => handleSelect(`/school/students/${s.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600">{s.name}</p>
                        <p className="text-xs text-slate-500">{s.className} Section {s.section} • Roll #{s.rollNo} • ID: {s.id}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredTeachers.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <Briefcase className="w-3.5 h-3.5" /> Teachers & Staff
              </span>
              <div className="space-y-1">
                {filteredTeachers.map(t => (
                  <div
                    key={t.id}
                    onClick={() => handleSelect('/school/teachers')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.designation} • Dept: {t.department}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredFees.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                <Receipt className="w-3.5 h-3.5" /> Fee Records
              </span>
              <div className="space-y-1">
                {filteredFees.map(f => (
                  <div
                    key={f.id}
                    onClick={() => handleSelect('/school/finance')}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600">{f.studentName} ({f.classSection})</p>
                      <p className="text-xs text-slate-500">Status: {f.status} • Due: ₹{f.dueAmount.toLocaleString()}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border rounded text-slate-600 font-mono">ESC</kbd> to exit</span>
          <span>School Operating System Global Index</span>
        </div>
      </div>
    </div>
  );
};
