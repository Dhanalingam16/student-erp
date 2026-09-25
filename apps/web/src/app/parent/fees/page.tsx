'use client';

import React, { useState } from 'react';
import { useERPStore } from '@/lib/store';
import { formatCurrencyINR, formatDate } from '@/lib/utils';
import { CreditCard, Receipt, CheckCircle2, ShieldCheck, Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FeePaymentModal } from '@/components/modals/FeePaymentModal';

export default function ParentFeesPage() {
  const { selectedChild, feeTransactions } = useERPStore();
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  const studentTransactions = feeTransactions.filter((t) => t.studentId === selectedChild.id);

  return (
    <div className="space-y-4 text-xs">
      {/* Fee Balance Card */}
      <div className="bg-navy-950 text-white rounded-lg p-4 shadow-sm space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-navy-300 uppercase tracking-wider text-[10px] font-semibold">
              Current Outstanding Fee
            </span>
            <p className="text-2xl font-bold font-mono text-white mt-1">
              {formatCurrencyINR(selectedChild.pendingFeeAmount)}
            </p>
          </div>
          <Badge variant={selectedChild.feeStatus === 'paid' ? 'success' : 'warning'}>
            {selectedChild.feeStatus.toUpperCase()}
          </Badge>
        </div>

        <div className="border-t border-navy-800 pt-2 flex items-center justify-between text-[11px] text-navy-200">
          <span>Session 2026–27 (Term 2)</span>
          <span>Due: 15 Oct 2026</span>
        </div>

        {selectedChild.pendingFeeAmount > 0 && (
          <Button
            variant="primary"
            className="w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold border-amber-500"
            onClick={() => setIsPayModalOpen(true)}
          >
            <CreditCard className="h-4 w-4 mr-1.5" />
            Proceed to Online Payment
          </Button>
        )}
      </div>

      {/* Fee Installments Schedule */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2.5">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
          Annual Installment Schedule (Class {selectedChild.classSection})
        </h3>

        <div className="space-y-2">
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-900">Term 1 Installment</p>
              <p className="text-[10px] text-slate-400">Due: 15 Apr 2026</p>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-slate-900 block">₹28,500</span>
              <span className="text-[10px] font-bold text-emerald-700">PAID & SETTLED</span>
            </div>
          </div>

          <div
            className={`p-2.5 border rounded flex justify-between items-center ${
              selectedChild.pendingFeeAmount > 0
                ? 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-300'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <p className="font-semibold text-slate-900">Term 2 Installment</p>
              <p className="text-[10px] text-slate-500">Due: 15 Oct 2026</p>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-slate-900 block">₹28,500</span>
              <span
                className={`text-[10px] font-bold ${
                  selectedChild.pendingFeeAmount > 0 ? 'text-amber-800' : 'text-emerald-700'
                }`}
              >
                {selectedChild.pendingFeeAmount > 0 ? 'PAYMENT DUE' : 'PAID'}
              </span>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded flex justify-between items-center opacity-75">
            <div>
              <p className="font-semibold text-slate-900">Term 3 Installment</p>
              <p className="text-[10px] text-slate-400">Due: 15 Jan 2027</p>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-slate-900 block">₹28,500</span>
              <span className="text-[10px] font-medium text-slate-400">UPCOMING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Past Official Receipts */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs space-y-2.5">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
          Payment History & Downloadable Receipts
        </h3>

        {studentTransactions.length === 0 ? (
          <p className="text-slate-400 text-center py-4">No payment receipts recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {studentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded flex items-center justify-between"
              >
                <div>
                  <p className="font-mono font-bold text-slate-900 text-xs">{tx.receiptNumber}</p>
                  <p className="text-[10px] text-slate-500">
                    {tx.transactionDate} • {tx.paymentMode.toUpperCase()}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-semibold">{tx.termTitle}</p>
                </div>

                <div className="text-right space-y-1">
                  <span className="font-mono font-bold text-sm text-navy-950 block">
                    {formatCurrencyINR(tx.amountPaid)}
                  </span>
                  <Button variant="outline" size="sm" className="h-6 px-2 text-[10px]" onClick={() => window.print()}>
                    <Printer className="h-3 w-3 mr-1" />
                    Print Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <FeePaymentModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        student={selectedChild}
      />
    </div>
  );
}
