'use client';

import React, { useState } from 'react';
import { Dialog } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useERPStore } from '@/lib/store';
import { formatCurrencyINR, formatDate } from '@/lib/utils';
import {
  CreditCard,
  QrCode,
  Building,
  CheckCircle,
  FileText,
  Printer,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { FeeTransaction, Student } from '@/types';
import { INSTITUTION_INFO } from '@/lib/constants';

interface FeePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  defaultAmount?: number;
}

export function FeePaymentModal({
  isOpen,
  onClose,
  student,
  defaultAmount,
}: FeePaymentModalProps) {
  const { processFeePayment } = useERPStore();
  const [paymentMode, setPaymentMode] = useState<'upi' | 'credit_card' | 'net_banking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTxn, setCompletedTxn] = useState<FeeTransaction | null>(null);

  const amountToPay = defaultAmount || student.pendingFeeAmount || 28500;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const txn = processFeePayment(
        student.id,
        amountToPay,
        paymentMode,
        'Term 2 Academic & Transport Installment (Session 2026–27)'
      );
      setCompletedTxn(txn);
      setIsProcessing(false);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setCompletedTxn(null);
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={completedTxn ? 'Fee Payment Receipt' : 'School Fee Online Payment'}
      description={
        completedTxn
          ? 'Transaction completed successfully. Download or print your official fee receipt.'
          : `Paying outstanding fee for ${student.fullName} (${student.classSection} - Roll ${student.rollNumber})`
      }
      maxWidth={completedTxn ? '2xl' : 'lg'}
    >
      {completedTxn ? (
        /* Receipt View */
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded p-3 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold text-emerald-900">Payment Processed Successfully</p>
              <p className="text-emerald-700">
                Receipt Number: <span className="font-mono font-bold">{completedTxn.receiptNumber}</span>
              </p>
            </div>
          </div>

          {/* Printable Official Receipt */}
          <div className="border border-slate-300 rounded p-6 bg-white space-y-4 text-xs font-sans shadow-xs">
            {/* Header */}
            <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                  {INSTITUTION_INFO.name}
                </h4>
                <p className="text-slate-500 text-[11px]">{INSTITUTION_INFO.address}</p>
                <p className="text-slate-500 text-[11px]">
                  Affiliation: {INSTITUTION_INFO.affiliationNo} • School Code: {INSTITUTION_INFO.schoolCode}
                </p>
              </div>
              <div className="text-right">
                <Badge variant="success">FEE PAID</Badge>
                <p className="text-slate-500 text-[11px] mt-1 font-mono">{completedTxn.transactionDate}</p>
              </div>
            </div>

            {/* Student & Txn Info */}
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-200 text-slate-700">
              <div>
                <p className="text-slate-500 text-[11px]">Student Name:</p>
                <p className="font-semibold text-slate-900">{student.fullName}</p>
                <p className="text-slate-500 text-[11px] mt-2">Admission No / Roll:</p>
                <p className="font-mono font-medium">{student.admissionNo} • {student.rollNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-[11px]">Class & Section:</p>
                <p className="font-semibold text-slate-900">Class {student.classSection}</p>
                <p className="text-slate-500 text-[11px] mt-2">Payment Mode:</p>
                <p className="font-medium uppercase">{completedTxn.paymentMode.replace('_', ' ')}</p>
              </div>
            </div>

            {/* Fee Itemization */}
            <div className="space-y-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[11px]">
                    <th className="py-1">Fee Description</th>
                    <th className="py-1 text-right">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {completedTxn.feeHeads.map((head, idx) => (
                    <tr key={idx}>
                      <td className="py-1.5 text-slate-700">{head.head}</td>
                      <td className="py-1.5 text-right font-mono">{formatCurrencyINR(head.amount)}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-slate-300 font-bold text-slate-900">
                    <td className="py-2">Total Amount Paid</td>
                    <td className="py-2 text-right font-mono text-sm text-navy-900">
                      {formatCurrencyINR(completedTxn.amountPaid)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer & Signature */}
            <div className="border-t border-slate-200 pt-4 flex justify-between items-end text-[11px] text-slate-500">
              <div>
                <p className="italic text-slate-400">Computer generated digital receipt. No signature required.</p>
                <p className="font-mono text-[10px] text-slate-400">TXN-ID: {completedTxn.id}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-10 border-b border-dashed border-slate-400 mb-1 flex items-center justify-center text-[10px] text-slate-400">
                  [School Seal]
                </div>
                <p className="font-semibold text-slate-700">Accounts Officer</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="h-3.5 w-3.5 mr-1" />
              Print Receipt
            </Button>
            <Button variant="primary" size="sm" onClick={handleResetAndClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        /* Payment Selection View */
        <div className="space-y-4 text-xs">
          {/* Fee Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded p-4 flex justify-between items-center">
            <div>
              <p className="text-slate-500 text-[11px]">Installment Description</p>
              <p className="font-semibold text-slate-900 text-sm">Term 2 Academic & Transport Fee</p>
              <p className="text-slate-500 text-[11px] mt-0.5">Academic Session 2026–2027</p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-[11px]">Amount Payable</p>
              <p className="font-mono text-lg font-bold text-navy-950">
                {formatCurrencyINR(amountToPay)}
              </p>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-800 block">Select Payment Channel</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMode('upi')}
                className={`p-3 rounded border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMode === 'upi'
                    ? 'border-navy-900 bg-navy-50/50 text-navy-950 font-semibold ring-1 ring-navy-900'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <QrCode className="h-5 w-5 text-navy-800" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('credit_card')}
                className={`p-3 rounded border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMode === 'credit_card'
                    ? 'border-navy-900 bg-navy-50/50 text-navy-950 font-semibold ring-1 ring-navy-900'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="h-5 w-5 text-navy-800" />
                <span>Debit / Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('net_banking')}
                className={`p-3 rounded border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMode === 'net_banking'
                    ? 'border-navy-900 bg-navy-50/50 text-navy-950 font-semibold ring-1 ring-navy-900'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Building className="h-5 w-5 text-navy-800" />
                <span>Net Banking</span>
              </button>
            </div>
          </div>

          {/* Payment Details Container */}
          {paymentMode === 'upi' && (
            <div className="border border-slate-200 rounded p-4 text-center bg-white space-y-2">
              <div className="w-32 h-32 mx-auto bg-slate-100 border border-slate-300 rounded flex flex-col items-center justify-center p-2">
                <QrCode className="h-20 w-20 text-navy-950" />
                <span className="text-[10px] text-slate-500 font-mono">Scan via any UPI App</span>
              </div>
              <p className="text-[11px] font-mono text-slate-600">UPI VPA: vidyamandir.fee@sbi</p>
              <p className="text-[10px] text-slate-400">GPay • PhonePe • Paytm • BHIM UPI</p>
            </div>
          )}

          {paymentMode === 'credit_card' && (
            <div className="space-y-3 border border-slate-200 rounded p-4 bg-white">
              <div>
                <label className="text-[11px] text-slate-600 block mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8812"
                  defaultValue="4532 8910 2341 8812"
                  className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="08/29"
                    className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    defaultValue="419"
                    maxLength={3}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy-600"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMode === 'net_banking' && (
            <div className="space-y-2 border border-slate-200 rounded p-4 bg-white">
              <label className="text-[11px] text-slate-600 block mb-1">Select Bank</label>
              <select className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-navy-600">
                <option>State Bank of India (SBI)</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Punjab National Bank (PNB)</option>
                <option>Axis Bank</option>
              </select>
            </div>
          )}

          {/* Security Assurance */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>256-bit SSL encrypted institutional payment gateway with instant reconciliation.</span>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
            <Button variant="outline" size="sm" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handlePay} isLoading={isProcessing}>
              Pay {formatCurrencyINR(amountToPay)}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
