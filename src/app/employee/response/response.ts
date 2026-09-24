import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface DayResponse {
  date: string; day: string;
  breakfast: 'needed' | 'not-needed' | 'no-menu';
  lunch:     'needed' | 'not-needed' | 'no-menu';
  dinner:    'needed' | 'not-needed' | 'no-menu';
}

@Component({
  selector: 'app-response',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './response.html',
  styleUrl: './response.scss',
})
export class Response {
  sidebarOpen = false;
  employeeName = 'Arjun Kumar';
  providerName = 'Sri Murugan Mess';
  selectedMonth = 'October 2025';

  navItems = [
    { label: 'Dashboard',       icon: '🏠', route: '/employee' },
    { label: 'Menu View',       icon: '📋', route: '/employee/menu-view' },
    { label: 'Payment History', icon: '💳', route: '/employee/payment-history' },
    { label: 'Comments',        icon: '💬', route: '/employee/comments' },
    { label: 'My Responses',    icon: '📊', route: '/employee/response' },
  ];

  months = ['October 2025', 'September 2025', 'August 2025'];

  responses: DayResponse[] = [
    { date: '01 Oct', day: 'Wed', breakfast: 'needed',     lunch: 'needed',     dinner: 'needed'     },
    { date: '02 Oct', day: 'Thu', breakfast: 'needed',     lunch: 'not-needed', dinner: 'needed'     },
    { date: '03 Oct', day: 'Fri', breakfast: 'not-needed', lunch: 'needed',     dinner: 'not-needed' },
    { date: '04 Oct', day: 'Sat', breakfast: 'needed',     lunch: 'needed',     dinner: 'needed'     },
    { date: '05 Oct', day: 'Sun', breakfast: 'no-menu',    lunch: 'no-menu',    dinner: 'needed'     },
    { date: '06 Oct', day: 'Mon', breakfast: 'needed',     lunch: 'needed',     dinner: 'not-needed' },
    { date: '07 Oct', day: 'Tue', breakfast: 'needed',     lunch: 'not-needed', dinner: 'needed'     },
    { date: '08 Oct', day: 'Wed', breakfast: 'not-needed', lunch: 'needed',     dinner: 'needed'     },
    { date: '09 Oct', day: 'Thu', breakfast: 'needed',     lunch: 'needed',     dinner: 'needed'     },
    { date: '10 Oct', day: 'Fri', breakfast: 'needed',     lunch: 'needed',     dinner: 'not-needed' },
  ];

  get totalNeeded() {
    return this.responses.reduce((sum, r) =>
      sum + [r.breakfast, r.lunch, r.dinner].filter(s => s === 'needed').length, 0);
  }

  get totalSkipped() {
    return this.responses.reduce((sum, r) =>
      sum + [r.breakfast, r.lunch, r.dinner].filter(s => s === 'not-needed').length, 0);
  }

  get totalBill() { return this.totalNeeded * 60; }

  icon(status: string) {
    if (status === 'needed')     return '✅';
    if (status === 'not-needed') return '❌';
    return '—';
  }

  chipClass(status: string) {
    if (status === 'needed')     return 'chip-needed';
    if (status === 'not-needed') return 'chip-skip';
    return 'chip-none';
  }
}
