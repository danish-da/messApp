import { Injectable, signal } from '@angular/core';

export type Gateway = 'razorpay' | 'stripe' | 'upi';

export interface PaymentConfig {
  gateway: Gateway;
  razorpayKey?: string;
  stripeKey?: string;
  upiId?: string;
  upiName?: string;
}

export interface Transaction {
  id: string;
  date: string;
  month: string;
  amount: number;
  gateway: Gateway;
  status: 'success' | 'pending' | 'failed';
  reference: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  /** Configurable gateway — can be swapped at runtime */
  config = signal<PaymentConfig>({
    gateway: 'upi',
    upiId: 'mess@upi',
    upiName: 'Sri Murugan Mess',
    razorpayKey: 'rzp_test_XXXXXXXXXX',
    stripeKey: 'pk_test_XXXXXXXXXX',
  });

  /** Shared transaction store (mock — replace with HTTP calls) */
  transactions = signal<Transaction[]>([
    { id: 'TXN001', date: '01 Sep 2025', month: 'Sep 2025', amount: 1800, gateway: 'upi',      status: 'success', reference: 'UPI123456', description: 'September Mess Fee' },
    { id: 'TXN002', date: '03 Aug 2025', month: 'Aug 2025', amount: 1740, gateway: 'razorpay', status: 'success', reference: 'RZP789012', description: 'August Mess Fee'    },
    { id: 'TXN003', date: '01 Jul 2025', month: 'Jul 2025', amount: 1680, gateway: 'stripe',   status: 'success', reference: 'STR345678', description: 'July Mess Fee'       },
    { id: 'TXN004', date: '02 Jun 2025', month: 'Jun 2025', amount: 1920, gateway: 'upi',      status: 'failed',  reference: 'UPI901234', description: 'June Mess Fee'       },
    { id: 'TXN005', date: '01 May 2025', month: 'May 2025', amount: 1860, gateway: 'razorpay', status: 'success', reference: 'RZP567890', description: 'May Mess Fee'        },
  ]);

  updateConfig(patch: Partial<PaymentConfig>) {
    this.config.update(c => ({ ...c, ...patch }));
  }

  /** Simulate initiating a payment (returns mock promise) */
  initiatePayment(amount: number, description: string): Promise<Transaction> {
    const cfg = this.config();
    return new Promise(resolve => {
      setTimeout(() => {
        const txn: Transaction = {
          id: 'TXN' + Math.random().toString(36).slice(2, 8).toUpperCase(),
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          month: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
          amount,
          gateway: cfg.gateway,
          status: 'success',
          reference: cfg.gateway.toUpperCase() + Math.floor(Math.random() * 900000 + 100000),
          description,
        };
        this.transactions.update(list => [txn, ...list]);
        resolve(txn);
      }, 1800);
    });
  }
}
