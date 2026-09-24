import { Component, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaymentService, Gateway, Transaction } from '../../core/payment';
import { NotificationService } from '../../core/notification';

@Component({
  selector: 'app-payment-history',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './payment-history.html',
  styleUrl: './payment-history.scss',
})
export class PaymentHistory {
  paymentSvc = inject(PaymentService);
  notifSvc   = inject(NotificationService);

  sidebarOpen = false;
  employeeName = 'Arjun Kumar';
  providerName = 'Sri Murugan Mess';

  showPayModal   = false;
  showConfigPanel = false;
  payLoading     = false;
  payDone        = false;

  upiInput = '';   // user types their UPI ID for confirmation

  navItems = [
    { label: 'Dashboard',       icon: '🏠', route: '/employee' },
    { label: 'Menu View',       icon: '📋', route: '/employee/menu-view' },
    { label: 'Payment History', icon: '💳', route: '/employee/payment-history' },
    { label: 'Comments',        icon: '💬', route: '/employee/comments' },
    { label: 'My Responses',    icon: '📊', route: '/employee/response' },
  ];

  gateways: { id: Gateway; label: string; icon: string }[] = [
    { id: 'razorpay', label: 'Razorpay',  icon: '💳' },
    { id: 'stripe',   label: 'Stripe',    icon: '🔵' },
    { id: 'upi',      label: 'UPI / QR',  icon: '📱' },
  ];

  // Signals from service
  config      = this.paymentSvc.config;
  transactions = this.paymentSvc.transactions;
  notifConfig = this.notifSvc.config;

  get selectedGateway() { return this.config().gateway; }

  /** Amount for current month (mock ₹1,860) */
  dueAmount = 1860;
  dueMonth  = 'September 2025';

  get totalPaid() {
    return this.transactions()
      .filter(t => t.status === 'success')
      .reduce((s, t) => s + t.amount, 0);
  }
  get pendingCount() {
    return this.transactions().filter(t => t.status === 'pending').length;
  }
  get lastPayment() {
    const s = this.transactions().find(t => t.status === 'success');
    return s ? `₹${s.amount} on ${s.date}` : '—';
  }

  selectGateway(gw: Gateway) {
    this.paymentSvc.updateConfig({ gateway: gw });
    this.upiInput = '';
    this.payDone  = false;
  }

  openPayModal() {
    this.showPayModal = true;
    this.payDone      = false;
    this.upiInput     = '';
  }
  closeModal() { this.showPayModal = false; }

  async pay() {
    if (this.config().gateway === 'upi' && !this.upiInput.trim()) return;
    this.payLoading = true;

    const txn = await this.paymentSvc.initiatePayment(this.dueAmount, `${this.dueMonth} Mess Fee`);
    this.notifSvc.notifyProviderOnPayment(this.employeeName, txn.amount, txn.reference);

    this.payLoading = false;
    this.payDone    = true;
    setTimeout(() => { this.closeModal(); }, 2000);
  }

  statusClass(s: string) {
    return s === 'success' ? 'chip-success' : s === 'pending' ? 'chip-pending' : 'chip-failed';
  }
  gatewayIcon(g: Gateway) {
    return this.gateways.find(gw => gw.id === g)?.icon ?? '💳';
  }
}
