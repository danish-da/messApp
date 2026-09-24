import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface EmployeeResponse {
  name: string;
  breakfast: 'needed' | 'not-needed' | 'pending';
  lunch:     'needed' | 'not-needed' | 'pending';
  dinner:    'needed' | 'not-needed' | 'pending';
}

interface DayTab {
  label: string;
  date:  string;
  isToday: boolean;
}

@Component({
  selector: 'app-responses',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './responses.html',
  styleUrl: './responses.scss',
})
export class Responses {
  sidebarOpen = false;
  providerName = 'Sri Murugan Mess';
  selectedDay = 0;

  navItems = [
    { label: 'Dashboard',    icon: '🏠', route: '/provider' },
    { label: 'Menu Upload',  icon: '📤', route: '/provider/menu-upload' },
    { label: 'Responses',    icon: '📊', route: '/provider/responses' },
    { label: 'Comments',     icon: '💬', route: '/provider/comments-view' },
  ];

  days: DayTab[] = [
    { label: 'Mon', date: 'Mon, 13 Oct', isToday: false },
    { label: 'Tue', date: 'Tue, 14 Oct', isToday: false },
    { label: 'Wed', date: 'Wed, 15 Oct', isToday: true  },
    { label: 'Thu', date: 'Thu, 16 Oct', isToday: false },
    { label: 'Fri', date: 'Fri, 17 Oct', isToday: false },
  ];

  allResponses: Record<number, EmployeeResponse[]> = {
    0: [
      { name: 'Arjun Kumar',   breakfast: 'needed',     lunch: 'needed',     dinner: 'not-needed' },
      { name: 'Priya Sharma',  breakfast: 'not-needed', lunch: 'needed',     dinner: 'needed'     },
      { name: 'Ravi Patel',    breakfast: 'needed',     lunch: 'not-needed', dinner: 'needed'     },
      { name: 'Sneha Raj',     breakfast: 'needed',     lunch: 'needed',     dinner: 'needed'     },
      { name: 'Karthik M',     breakfast: 'not-needed', lunch: 'not-needed', dinner: 'needed'     },
    ],
    1: [
      { name: 'Arjun Kumar',   breakfast: 'needed',     lunch: 'needed',     dinner: 'needed'     },
      { name: 'Priya Sharma',  breakfast: 'needed',     lunch: 'needed',     dinner: 'not-needed' },
      { name: 'Ravi Patel',    breakfast: 'not-needed', lunch: 'needed',     dinner: 'not-needed' },
    ],
    2: [],
    3: [],
    4: [],
  };

  get currentDay() { return this.days[this.selectedDay]; }

  get responses(): EmployeeResponse[] {
    return this.allResponses[this.selectedDay] ?? [];
  }

  get mealSummary() {
    const r = this.responses;
    return {
      breakfast: r.filter(e => e.breakfast === 'needed').length,
      lunch:     r.filter(e => e.lunch     === 'needed').length,
      dinner:    r.filter(e => e.dinner    === 'needed').length,
    };
  }

  slotIcon(s: string) {
    return s === 'needed' ? '✅' : s === 'not-needed' ? '❌' : '⏳';
  }
  chipClass(s: string) {
    return s === 'needed' ? 'chip-g' : s === 'not-needed' ? 'chip-r' : 'chip-m';
  }

  exportCSV() {
    const rows = [['Employee','Breakfast','Lunch','Dinner']];
    this.responses.forEach(r => rows.push([r.name, r.breakfast, r.lunch, r.dinner]));
    const csv = rows.map(r => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv,' + encodeURIComponent(csv);
    a.download = `responses-${this.currentDay.date.replace(/,? /g,'-')}.csv`;
    a.click();
  }
}
