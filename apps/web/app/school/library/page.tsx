'use client';

import React from 'react';
import { mockLibraryBooks } from '@school-erp/mock-data';
import { Badge, Button } from '@school-erp/ui';
import { BookOpen, Plus, Search } from 'lucide-react';

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Library Catalogue & Circulation Desk</h1>
          <p className="text-xs text-slate-500 mt-1">Book catalog, issues, returns, overdue renewals & fines</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Issue Book
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
            <tr>
              <th className="py-3 px-4">Book Title</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">ISBN</th>
              <th className="py-3 px-4">Rack Location</th>
              <th className="py-3 px-4">Available Copies</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockLibraryBooks.map(bk => (
              <tr key={bk.id}>
                <td className="py-3 px-4 font-bold text-slate-900">{bk.title}</td>
                <td className="py-3 px-4">{bk.author}</td>
                <td className="py-3 px-4 font-mono text-slate-500">{bk.isbn}</td>
                <td className="py-3 px-4">{bk.rackLocation}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{bk.availableCopies} / {bk.totalCopies}</td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm">Issue to Student</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
