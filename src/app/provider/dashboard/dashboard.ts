import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface MealSlot { slot: string; icon: string; time: string; menu: string; uploaded: boolean; }
interface EmployeeResponse { name: string; breakfast: string; lunch: string; dinner: string; }

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  sidebarOpen = false;
  providerName = 'Sri Murugan Mess';
  today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  stats = [
    { label: 'Total Employees', value: 24,    icon: '👥', color: '#457b9d' },
    { label: 'Meals Today',     value: 58,    icon: '🍽️', color: '#ff6b35' },
    { label: 'Pending Payments',value: 6,     icon: '⚠️', color: '#e63946' },
    { label: 'Monthly Revenue', value: '₹43,200', icon: '💰', color: '#2d6a4f' },
  ];

  meals: MealSlot[] = [
    { slot: 'Breakfast', icon: '🌅', time: '7:00 AM', menu: '', uploaded: false },
    { slot: 'Lunch',     icon: '☀️', time: '12:00 PM', menu: '', uploaded: false },
    { slot: 'Dinner',    icon: '🌙', time: '7:00 PM',  menu: '', uploaded: false },
  ];

  responses: EmployeeResponse[] = [
    { name: 'Arjun Kumar',   breakfast: 'needed',     lunch: 'needed',     dinner: 'not-needed' },
    { name: 'Priya Sharma',  breakfast: 'not-needed', lunch: 'needed',     dinner: 'needed'     },
    { name: 'Ravi Patel',    breakfast: 'needed',     lunch: 'not-needed', dinner: 'needed'     },
    { name: 'Sneha Raj',     breakfast: 'needed',     lunch: 'needed',     dinner: 'needed'     },
  ];

  navItems = [
    { label: 'Dashboard',    icon: '🏠', route: '/provider' },
    { label: 'Menu Upload',  icon: '📤', route: '/provider/menu-upload' },
    { label: 'Responses',    icon: '📊', route: '/provider/responses' },
    { label: 'Comments',     icon: '💬', route: '/provider/comments-view' },
  ];

  uploadMenu(meal: MealSlot) {
    if (meal.menu.trim()) meal.uploaded = true;
  }

  get greeting() {
    const h = new Date().getHours();
    return h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
  }

  statusIcon(s: string) {
    return s === 'needed' ? '✅' : '❌';
  }
}
