'use client';

import React, { useState } from 'react';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { ConfirmationDialog } from '../ui/confirmation-dialog';
import { useERPStore } from '@/lib/store';
import { formatCurrencyINR } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Student } from '@/types';

interface CollectFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  student?: Student;
}

export function CollectFeeModal({ isOpen, onClose, student }: CollectFeeModalProps) {
  const { students, processFeePayment } = useERPStore();
  const [selectedStudentId, setSelectedStudentId] = useState(student?.id || students[0]?.id);
  const [amount, setAmount] = useState<number>(student?.pendingFeeAmount || 28500);
  const [paymentMode, setPaymentMode] = useState<'cash' | 'cheque' | 'upi'>('cash');
  const [instrumentNo, setInstrumentNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const targetStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    setShowConfirm(true);
  };

  const handleFinalConfirm = () => {
    const txn = processFeePayment(
      targetStudent.id,
      amount,
      paymentMode,
      `Term 2 Installment (${paymentMode.toUpperCase()}${instrumentNo ? ` - Ref: ${instrumentNo}` : ''})`
    );
    setShowConfirm(false);
    setSuccessMsg(`Receipt ${txn.receiptNumber} successfully created and credited to student account.`);
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1800);
  };

  return (
    <>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Offline Fee Collection Counter"
        description="Record Cash, Cheque, or POS payment and issue official signed fee receipt"
        maxWidth="md"
      >
        {successMsg ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-center space-y-2">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
            <p className="font-semibold text-emerald-900 text-sm">{successMsg}</p>
            <p className="text-xs text-emerald-700">Ledger balance updated.</p>
          </div>
        ) : (
          <form onSubmit={handleInitialSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">Select Student</label>
              <select
                value={selectedStudentId}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value);
                  const st = students.find((s) => s.id === e.target.value);
                  if (st) setAmount(st.pendingFeeAmount || 28500);
                }}
                className="w-full px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-800 focus:ring-1 focus:ring-navy-600"
              >
                {students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.fullName} ({st.classSection} - Roll {st.rollNumber}) — Due:{' '}
                    {formatCurrencyINR(st.pendingFeeAmount)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">Amount to Collect (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={100}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-800 focus:ring-1 focus:ring-navy-600 font-mono"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded bg-white text-slate-800 focus:ring-1 focus:ring-navy-600"
                >
                  <option value="cash">Cash (Counter Deposit)</option>
                  <option value="cheque">Cheque / Demand Draft</option>
                  <option value="upi">POS Counter Terminal / UPI</option>
                </select>
              </div>
            </div>

            {paymentMode === 'cheque' && (
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded">
                <div>
                  <label className="text-slate-600 block mb-1">Cheque / DD Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 041892"
                    value={instrumentNo}
                    onChange={(e) => setInstrumentNo(e.target.value)}
                    className="w-full px-2.5 py-1 border border-slate-200 rounded bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1">Bank Name & Branch</label>
                  <input
                    type="text"
                    placeholder="e.g. SBI Dwarka Sector 6"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-2.5 py-1 border border-slate-200 rounded bg-white"
                    required
                  />
                </div>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded text-[11px] text-amber-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              <span>
                Submitting this entry updates the school account ledger and generates an official audit trail entry.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Proceed to Verification
              </Button>
            </div>
          </form>
        )}
      </Dialog>

      {/* Confirmation safeguard */}
      <ConfirmationDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleFinalConfirm}
        title="Confirm Offline Fee Receipt Generation"
        description={`Are you sure you want to record an offline payment of ${formatCurrencyINR(
          amount
        )} via ${paymentMode.toUpperCase()} for student ${targetStudent.fullName}? This will reduce the student's outstanding balance immediately.`}
        confirmText="Confirm & Issue Receipt"
        variant="primary"
      />
    </>
  );
}
