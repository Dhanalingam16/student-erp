'use client';

import React from 'react';
import { Boxes, Plus, AlertTriangle, CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  quantity: number;
  minThreshold: number;
  status: 'adequate' | 'low_stock' | 'reorder';
  vendor: string;
}

export default function InventoryPage() {
  const items: InventoryItem[] = [
    { id: 'inv-01', name: 'Compound Microscope (Olympus CX21)', category: 'Science Lab Equipment', location: 'Biology Lab 2', quantity: 24, minThreshold: 10, status: 'adequate', vendor: 'LabTech Instruments Ltd' },
    { id: 'inv-02', name: 'Dell OptiPlex Desktop PCs (Core i5)', category: 'IT Assets', location: 'Computer Lab 3', quantity: 42, minThreshold: 5, status: 'adequate', vendor: 'Dell India Direct' },
    { id: 'inv-03', name: 'CBSE Secondary Exam Answer Booklets', category: 'Stationery & Printing', location: 'Examination Strongroom', quantity: 450, minThreshold: 1000, status: 'low_stock', vendor: 'Govt. Approved Press' },
    { id: 'inv-04', name: 'N95 Student First-Aid Respirators', category: 'Medical Supplies', location: 'Infirmary Store', quantity: 180, minThreshold: 50, status: 'adequate', vendor: 'Apollo Medical Wholesale' },
    { id: 'inv-05', name: 'Cosco Tournament Basketballs (Size 7)', category: 'Sports & PE', location: 'Sports Equipment Room', quantity: 12, minThreshold: 15, status: 'reorder', vendor: 'Cosco Sports India' },
  ];

  const columns: ColumnDef<InventoryItem>[] = [
    {
      header: 'Item Name',
      accessorKey: 'name',
      sortable: true,
      className: 'font-bold text-slate-900',
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: (item) => <Badge variant="slate">{item.category}</Badge>,
    },
    {
      header: 'Location',
      accessorKey: 'location',
      className: 'text-slate-600',
    },
    {
      header: 'Stock Level',
      cell: (item) => (
        <span className="font-mono font-bold">
          <span className={item.status === 'low_stock' || item.status === 'reorder' ? 'text-rose-700' : 'text-emerald-700'}>
            {item.quantity}
          </span>
          <span className="text-slate-400"> (Min: {item.minThreshold})</span>
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (item) => (
        <Badge variant={item.status === 'adequate' ? 'success' : item.status === 'low_stock' ? 'warning' : 'danger'}>
          {item.status.replace('_', ' ').toUpperCase()}
        </Badge>
      ),
    },
    {
      header: 'Registered Vendor',
      accessorKey: 'vendor',
      className: 'text-slate-500 text-[11px]',
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="h-5 w-5 text-indigo-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Institutional Assets & Lab Inventory
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Stock ledger, laboratory equipment tracking, purchase orders, and asset maintenance logs.
          </p>
        </div>

        <Button variant="primary" size="sm">
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Inventory Stock
        </Button>
      </div>

      <DataTable
        data={items}
        columns={columns}
        searchPlaceholder="Search inventory by item or category..."
        searchKey="name"
        exportFileName="assets-inventory-register"
      />
    </div>
  );
}
