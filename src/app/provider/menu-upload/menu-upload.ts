import { Component, signal, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface MealItem {
  name: string;
  price: number;
}

interface MealSlot {
  slot: string;
  icon: string;
  color: string;
  time: string;
  items: MealItem[];
  draft: string;       // textarea binding
  published: boolean;
}

interface DayEntry {
  label: string;    // Mon, Tue …
  date: string;     // e.g. Mon, 13 Oct
  isToday: boolean;
  meals: MealSlot[];
}

@Component({
  selector: 'app-menu-upload',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './menu-upload.html',
  styleUrl: './menu-upload.scss',
})
export class MenuUpload {
  sidebarOpen = false;
  providerName = 'Sri Murugan Mess';
  // 0=Mon, 1=Tue … 6=Sun — pre-selects today's tab
  selectedDay = (new Date().getDay() + 6) % 7;


  navItems = [
    { label: 'Dashboard',    icon: '🏠', route: '/provider' },
    { label: 'Menu Upload',  icon: '📤', route: '/provider/menu-upload' },
    { label: 'Responses',    icon: '📊', route: '/provider/responses' },
    { label: 'Comments',     icon: '💬', route: '/provider/comments-view' },
  ];

  /** Stats visible at top */
  get stats() {
    const day = this.currentDay;
    return [
      { label: 'Breakfast', icon: '🌅', color: '#ffb703', value: day.meals[0].published ? '✅ Uploaded' : '⏳ Pending' },
      { label: 'Lunch',     icon: '☀️', color: '#52b788', value: day.meals[1].published ? '✅ Uploaded' : '⏳ Pending' },
      { label: 'Dinner',    icon: '🌙', color: '#4361ee', value: day.meals[2].published ? '✅ Uploaded' : '⏳ Pending' },
      { label: 'Employees', icon: '👥', color: '#ff6b35', value: '120 Linked' },
    ];
  }

  weekDays: DayEntry[] = this._buildWeek();

  get currentDay() { return this.weekDays[this.selectedDay]; }

  get allPublished() {
    return this.currentDay.meals.every(m => m.published);
  }

  get publishedCount() {
    return this.currentDay.meals.filter(m => m.published).length;
  }

  publishMeal(meal: MealSlot) {
    if (!meal.draft.trim()) return;
    meal.items = meal.draft
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter(Boolean)
      .map(name => ({ name, price: 60 }));
    meal.published = true;
  }

  publishAll() {
    this.currentDay.meals.forEach(m => this.publishMeal(m));
  }

  editMeal(meal: MealSlot) {
    meal.published = false;
  }

  private _buildWeek(): DayEntry[] {
    const today = new Date();
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    // Shift so Mon=0
    const dow = (today.getDay() + 6) % 7; // 0=Mon
    const entries: DayEntry[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - dow + i);
      const label = days[d.getDay()];
      const date = `${label}, ${d.getDate()} ${months[d.getMonth()]}`;
      const isToday = i === dow;

      entries.push({
        label,
        date,
        isToday,
        meals: [
          { slot: 'Breakfast', icon: '🌅', color: '#ffb703', time: '7:00 – 9:00 AM',  draft: '', items: [], published: false },
          { slot: 'Lunch',     icon: '☀️', color: '#52b788', time: '12:00 – 2:00 PM', draft: '', items: [], published: false },
          { slot: 'Dinner',    icon: '🌙', color: '#4361ee', time: '7:00 – 9:00 PM',  draft: '', items: [], published: false },
        ],
      });
    }

    return entries;
  }
}
