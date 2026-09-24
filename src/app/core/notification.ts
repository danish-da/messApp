import { Injectable, signal } from '@angular/core';

export type Channel = 'sms' | 'email';

export interface NotificationConfig {
  smsEnabled: boolean;
  emailEnabled: boolean;
  providerPhone: string;
  providerEmail: string;
}

export interface NotificationLog {
  id: string;
  channel: Channel;
  recipient: string;
  message: string;
  sentAt: string;
  status: 'sent' | 'failed';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  config = signal<NotificationConfig>({
    smsEnabled: true,
    emailEnabled: true,
    providerPhone: '+91 98765 43210',
    providerEmail: 'provider@muruganmess.in',
  });

  logs = signal<NotificationLog[]>([]);

  updateConfig(patch: Partial<NotificationConfig>) {
    this.config.update(c => ({ ...c, ...patch }));
  }

  /**
   * Notify the provider after a successful payment.
   * In production, replace with real HTTP calls to SMS/email APIs
   * (e.g., Twilio for SMS, SendGrid / NodeMailer for email).
   */
  notifyProviderOnPayment(employeeName: string, amount: number, reference: string): void {
    const cfg = this.config();
    const msg = `Payment of ₹${amount} received from ${employeeName}. Ref: ${reference}`;
    const now = new Date().toLocaleString('en-IN');

    if (cfg.smsEnabled) {
      // TODO: Replace with real SMS API call
      console.log(`[SMS] → ${cfg.providerPhone}: ${msg}`);
      this._log('sms', cfg.providerPhone, msg, now);
    }

    if (cfg.emailEnabled) {
      // TODO: Replace with real Email API call (SendGrid / NodeMailer)
      console.log(`[EMAIL] → ${cfg.providerEmail}: ${msg}`);
      this._log('email', cfg.providerEmail, msg, now);
    }
  }

  private _log(channel: Channel, recipient: string, message: string, sentAt: string) {
    const entry: NotificationLog = {
      id: Math.random().toString(36).slice(2, 8),
      channel,
      recipient,
      message,
      sentAt,
      status: 'sent',
    };
    this.logs.update(l => [entry, ...l]);
  }
}
