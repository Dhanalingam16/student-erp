'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { Student, FeeTransaction } from '@/types';
import { formatCurrencyINR, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CollectFeeModal } from '@/components/modals/CollectFeeModal';
import {
  IndianRupee,
  Receipt,
  CreditCard,
  Building,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet,
  Printer,
  ShieldAlert,
} from 'lucide-react';
import { INITIAL_FEE_STRUCTURES } from '@/lib/demo-data';

export default function FinancePage() {
  const { students, feeTransactions } = useERPStore();
  const [activeTab, setActiveTab] = useState<'ledgers' | 'transactions' | 'structures'>('ledgers');
  const [selectedStudentForCollect, setSelectedStudentForCollect] = useState<Student | null>(null);
  const [isCollectFeeOpen, setIsCollectFeeOpen] = useState(false);

  // Financial aggregates
  const totalReceivable = students.reduce((acc, s) => acc + 85500, 0); // Annual
  const totalCollected = feeTransactions.reduce((acc, t) => acc + t.amountPaid, 0);
  const totalOutstanding = students.reduce((acc, s) => acc + s.pendingFeeAmount, 0);

  // Columns for Student Fee Ledger
  const ledgerColumns: ColumnDef<Student>[] = [
    {
      header: 'Roll',
      accessorKey: 'rollNumber',
      sortable: true,
      className: 'w-16 font-mono font-semibold',
    },
    {
      header: 'Student Name',
      accessorKey: 'fullName',
      sortable: true,
      cell: (st) => (
        <div>
          <span className="font-bold text-slate-900">{st.fullName}</span>
          <span className="block text-[10px] text-slate-400 font-mono">{st.admissionNo}</span>
        </div>
      ),
    },
    {
      header: 'Class',
      accessorKey: 'classSection',
      sortable: true,
      className: 'w-20',
      cell: (st) => <span>Class {st.classSection}</span>,
    },
    {
      header: 'Annual Fee (INR)',
      cell: () => <span className="font-mono text-slate-700">₹85,500</span>,
    },
    {
      header: 'Outstanding Balance',
      accessorKey: 'pendingFeeAmount',
      sortable: true,
      className: 'text-right font-mono font-bold',
      cell: (st) => (
        <span className={st.pendingFeeAmount > 0 ? 'text-rose-700' : 'text-emerald-700'}>
          {formatCurrencyINR(st.pendingFeeAmount)}
        </span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'feeStatus',
      sortable: true,
      className: 'text-center',
      cell: (st) => (
        <Badge
          variant={
            st.feeStatus === 'paid'
              ? 'success'
              : st.feeStatus === 'pending'
              ? 'warning'
              : st.feeStatus === 'partial'
              ? 'info'
              : 'danger'
          }
        >
          {st.feeStatus.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: 'Action',
      cell: (st) => (
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-[11px] text-emerald-800 hover:bg-emerald-50"
          onClick={() => {
            setSelectedStudentForCollect(st);
            setIsCollectFeeOpen(true);
          }}
        >
          <CreditCard className="h-3 w-3 mr-1" />
          Collect
        </Button>
      ),
    },
  ];

  // Columns for Transaction History
  const transactionColumns: ColumnDef<FeeTransaction>[] = [
    {
      header: 'Receipt #',
      accessorKey: 'receiptNumber',
      sortable: true,
      className: 'font-mono font-semibold text-slate-900',
    },
    {
      header: 'Date & Time',
      accessorKey: 'transactionDate',
      sortable: true,
      className: 'font-mono text-slate-500',
    },
    {
      header: 'Student Name',
      accessorKey: 'studentName',
      sortable: true,
      cell: (tx) => (
        <div>
          <span className="font-bold text-slate-900">{tx.studentName}</span>
          <span className="block text-[10px] text-slate-400">Class {tx.classSection}</span>
        </div>
      ),
    },
    {
      header: 'Description',
      accessorKey: 'termTitle',
      className: 'max-w-xs truncate',
    },
    {
      header: 'Mode',
      accessorKey: 'paymentMode',
      sortable: true,
      cell: (tx) => (
        <span className="uppercase text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
          {tx.paymentMode}
        </span>
      ),
    },
    {
      header: 'Amount Paid',
      accessorKey: 'amountPaid',
      sortable: true,
      className: 'text-right font-mono font-bold text-emerald-700',
      cell: (tx) => formatCurrencyINR(tx.amountPaid),
    },
    {
      header: 'Receipt',
      cell: (tx) => (
        <Button variant="outline" size="sm" className="h-6 px-2 text-[11px]" onClick={() => window.print()}>
          <Printer className="h-3 w-3 mr-1" />
          Print
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Title & Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-emerald-600" />
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Finance & Student Accounts Ledger
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Real-time accounts receivable, offline counter deposits, online receipts, and reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200">
            <button
              onClick={() => setActiveTab('ledgers')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                activeTab === 'ledgers' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
              }`}
            >
              Student Fee Ledgers
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                activeTab === 'transactions' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
              }`}
            >
              Receipts ({feeTransactions.length})
            </button>
            <button
              onClick={() => setActiveTab('structures')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                activeTab === 'structures' ? 'bg-white text-navy-950 shadow-xs' : 'text-slate-600'
              }`}
            >
              Fee Structures
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setSelectedStudentForCollect(null);
              setIsCollectFeeOpen(true);
            }}
          >
            <CreditCard className="h-3.5 w-3.5 mr-1" />
            Collect Counter Fee
          </Button>
        </div>
      </div>

      {/* Financial Health KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
              Total Fee Realized
            </span>
            <p className="text-xl font-bold font-mono text-emerald-700 mt-1">
              {formatCurrencyINR(totalCollected)}
            </p>
            <span className="text-[10px] text-slate-400">Reconciled to School SBI Account</span>
          </div>
          <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
              Outstanding Defaulters
            </span>
            <p className="text-xl font-bold font-mono text-rose-700 mt-1">
              {formatCurrencyINR(totalOutstanding)}
            </p>
            <span className="text-[10px] text-rose-500">Term 2 Due: 15 October 2026</span>
          </div>
          <div className="p-3 rounded-full bg-rose-50 text-rose-600">
            <TrendingDown className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
              Total Annual Billable
            </span>
            <p className="text-xl font-bold font-mono text-navy-950 mt-1">
              {formatCurrencyINR(totalReceivable)}
            </p>
            <span className="text-[10px] text-slate-400">1,420 Enrolled Students</span>
          </div>
          <div className="p-3 rounded-full bg-blue-50 text-blue-600">
            <Building className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Main Tab Panels */}
      {activeTab === 'ledgers' && (
        <DataTable
          data={students}
          columns={ledgerColumns}
          searchPlaceholder="Search student account by name or roll number..."
          searchKey="fullName"
          filterOptions={[
            {
              label: 'Fee Status',
              key: 'feeStatus',
              options: [
                { label: 'Paid', value: 'paid' },
                { label: 'Pending', value: 'pending' },
                { label: 'Partial', value: 'partial' },
                { label: 'Overdue', value: 'overdue' },
              ],
            },
          ]}
          exportFileName="fee-ledgers-report"
        />
      )}

      {activeTab === 'transactions' && (
        <DataTable
          data={feeTransactions}
          columns={transactionColumns}
          searchPlaceholder="Search receipt number or student..."
          searchKey="receiptNumber"
          exportFileName="fee-receipts-register"
        />
      )}

      {activeTab === 'structures' && (
        <div className="space-y-4">
          {INITIAL_FEE_STRUCTURES.map((struct) => (
            <div key={struct.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{struct.title}</h3>
                  <p className="text-xs text-slate-500">Applicable to Class 10 (Session 2026-27)</p>
                </div>
                <Badge variant="info">CBSE Approved</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block">Annual Tuition Fee</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {formatCurrencyINR(struct.annualTuition)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block">Annual Development Charges</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {formatCurrencyINR(struct.developmentCharges)}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-slate-500 block">Science & Lab Charges</span>
                  <span className="font-mono text-base font-bold text-slate-900">
                    {formatCurrencyINR(struct.labCharges)}
                  </span>
                </div>
              </div>

              {/* Installments Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Approved Installment Schedule
                </h4>
                <div className="border border-slate-200 rounded overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Term Installment</th>
                        <th className="py-2 px-3">Statutory Due Date</th>
                        <th className="py-2 px-3 text-right">Amount (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {struct.termInstallments.map((inst, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-semibold text-slate-800">{inst.title}</td>
                          <td className="py-2 px-3 font-mono text-slate-600">{formatDate(inst.dueDate)}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                            {formatCurrencyINR(inst.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Collect Fee Modal */}
      {isCollectFeeOpen && (
        <CollectFeeModal
          isOpen={isCollectFeeOpen}
          onClose={() => {
            setIsCollectFeeOpen(false);
            setSelectedStudentForCollect(null);
          }}
          student={selectedStudentForCollect || undefined}
        />
      )}
    </div>
  );
}
