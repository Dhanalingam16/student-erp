'use client';

import React, { useState } from 'react';
import { mockFeeLedgers } from '@school-erp/mock-data';
import { FeeLedger } from '@school-erp/types';
import { StatCard, Badge, Button, Modal } from '@school-erp/ui';
import { Receipt, CreditCard, Download, CheckCircle, Plus } from 'lucide-react';

export default function FinanceDashboardPage() {
  const [selectedLedger, setSelectedLedger] = useState<FeeLedger | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReceipt = (ledger: FeeLedger) => {
    setSelectedLedger(ledger);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Fees & Finance Control</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time ledger overview, fee structures, and receipt generator</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
          Create Fee Structure
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total YTD Collection" value="₹1.85 Cr" change="87% target" changeType="positive" icon={<Receipt className="w-5 h-5 text-emerald-600" />} />
        <StatCard title="Outstanding Balances" value="₹24.5 L" change="18 Students" changeType="negative" icon={<CreditCard className="w-5 h-5 text-red-600" />} />
        <StatCard title="Collected This Month" value="₹45.2 L" change="+12% vs Aug" changeType="positive" icon={<Receipt className="w-5 h-5 text-blue-600" />} />
        <StatCard title="Overdue Reminders Sent" value="42 Alerts" change="Automated SMS" changeType="neutral" icon={<CheckCircle className="w-5 h-5 text-amber-600" />} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Student Fee Ledgers</h3>
          <span className="text-xs text-slate-500">Term 2 Ledger</span>
        </div>

        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4">Class</th>
              <th className="py-3.5 px-4">Total Fee</th>
              <th className="py-3.5 px-4">Paid</th>
              <th className="py-3.5 px-4">Due Amount</th>
              <th className="py-3.5 px-4">Due Date</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockFeeLedgers.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">{f.studentName}</td>
                <td className="py-3 px-4">{f.classSection}</td>
                <td className="py-3 px-4">₹{f.totalFee.toLocaleString()}</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">₹{f.paidAmount.toLocaleString()}</td>
                <td className="py-3 px-4 text-red-600 font-bold">₹{f.dueAmount.toLocaleString()}</td>
                <td className="py-3 px-4">{f.dueDate}</td>
                <td className="py-3 px-4">
                  <Badge variant={f.status === 'Paid' ? 'success' : f.status === 'Overdue' ? 'danger' : 'warning'}>
                    {f.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="outline" size="sm" onClick={() => handleOpenReceipt(f)}>
                    View Receipt
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mock Receipt Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Fee Payment Receipt Preview"
        footer={
          <Button variant="primary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Download PDF Receipt
          </Button>
        }
      >
        {selectedLedger && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-900 text-white rounded-lg flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">St. Xavier International School</p>
                <p className="text-[10px] text-slate-300">Official Payment Voucher</p>
              </div>
              <span className="font-mono text-xs text-blue-400">RCP-2026-089</span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-slate-400 block">Student Name:</span>
                <span className="font-bold text-slate-900">{selectedLedger.studentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Class & Section:</span>
                <span className="font-bold text-slate-900">{selectedLedger.classSection}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Tuition Fee Installment:</span>
                <span className="font-mono text-slate-900">₹{selectedLedger.paidAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-slate-900 text-sm">
                <span>Total Amount Paid:</span>
                <span>₹{selectedLedger.paidAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
