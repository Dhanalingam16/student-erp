import { mockFeeLedgers, mockTransactions } from '@school-erp/mock-data';
import { FeeLedger, PaymentTransaction } from '@school-erp/types';

export const feeService = {
  async getFeeLedgers(): Promise<FeeLedger[]> {
    return Promise.resolve(mockFeeLedgers);
  },

  async getFeeLedgerByStudent(studentId: string): Promise<FeeLedger | undefined> {
    return Promise.resolve(mockFeeLedgers.find(f => f.studentId === studentId) || mockFeeLedgers[0]);
  },

  async getTransactions(studentId?: string): Promise<PaymentTransaction[]> {
    if (studentId) {
      return Promise.resolve(mockTransactions.filter(t => t.studentId === studentId));
    }
    return Promise.resolve(mockTransactions);
  },

  async recordPayment(studentId: string, amount: number, method: 'UPI' | 'Credit Card' | 'Net Banking'): Promise<PaymentTransaction> {
    const newTxn: PaymentTransaction = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId,
      studentName: 'Rahul Sharma',
      receiptNo: `RCP-2026-${Math.floor(100 + Math.random() * 900)}`,
      amount,
      paymentMethod: method,
      transactionDate: new Date().toISOString().split('T')[0],
      status: 'Success',
      term: 'Quarter 2 Installment'
    };
    mockTransactions.unshift(newTxn);

    const ledger = mockFeeLedgers.find(f => f.studentId === studentId);
    if (ledger) {
      ledger.paidAmount += amount;
      ledger.dueAmount = Math.max(0, ledger.totalFee - ledger.paidAmount);
      if (ledger.dueAmount === 0) ledger.status = 'Paid';
    }

    return Promise.resolve(newTxn);
  }
};
