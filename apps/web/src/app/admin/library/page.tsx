'use client';

import React from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { LibraryBook } from '@/types';
import { BookMarked, Plus, Search, CheckCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function LibraryPage() {
  const { libraryBooks } = useERPStore();

  const columns: ColumnDef<LibraryBook>[] = [
    {
      header: 'ISBN',
      accessorKey: 'isbn',
      sortable: true,
      className: 'w-36 font-mono text-slate-700',
    },
    {
      header: 'Book Title',
      accessorKey: 'title',
      sortable: true,
      cell: (b) => (
        <div>
          <span className="font-bold text-slate-900">{b.title}</span>
          <span className="block text-[10px] text-slate-400">Author: {b.author}</span>
        </div>
      ),
    },
    {
      header: 'Subject Category',
      accessorKey: 'category',
      sortable: true,
      cell: (b) => <Badge variant="slate">{b.category}</Badge>,
    },
    {
      header: 'Rack Location',
      accessorKey: 'rackLocation',
      className: 'font-mono text-xs text-slate-800',
    },
    {
      header: 'Availability',
      cell: (b) => (
        <span className="font-mono font-bold">
          <span className={b.availableCopies > 0 ? 'text-emerald-700' : 'text-rose-700'}>
            {b.availableCopies}
          </span>
          <span className="text-slate-400"> / {b.totalCopies} Copies</span>
        </span>
      ),
    },
    {
      header: 'Desk Action',
      cell: (b) => (
        <Button variant="outline" size="sm" className="h-6 px-2 text-[11px]" disabled={b.availableCopies === 0}>
          <BookOpen className="h-3 w-3 mr-1" />
          Issue Book
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-emerald-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Library Resource Catalogue & Circulation Desk
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Book accession registry, barcode scanning, issue/return lending ledger, and overdue fine computing.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="h-3.5 w-3.5 mr-1" />
          New Book Accession
        </Button>
      </div>

      <DataTable
        data={libraryBooks}
        columns={columns}
        searchPlaceholder="Search by book title, author, or ISBN..."
        searchKey="title"
        exportFileName="library-catalogue"
      />
    </div>
  );
}
