import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Meal { slot: string; time: string; menu: string; status: 'pending' | 'needed' | 'not-needed'; icon: string; }

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  sidebarOpen = false;
  employeeName = 'Arjun Kumar';
  providerName = 'Sri Murugan Mess';
  today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  meals: Meal[] = [
    { slot: 'Breakfast', time: '7:00 AM – 9:00 AM', menu: 'Idli, Sambar, Chutney', status: 'pending', icon: '🌅' },
    { slot: 'Lunch',     time: '12:00 PM – 2:00 PM', menu: 'Rice, Dal, Sabzi, Papad', status: 'needed',  icon: '☀️' },
    { slot: 'Dinner',    time: '7:00 PM – 9:00 PM',  menu: 'Chapati, Paneer Curry', status: 'pending', icon: '🌙' },
  ];

  stats = [
    { label: 'Days Marked', value: 18, icon: '📅', color: '#ff6b35' },
    { label: 'This Month Bill', value: '₹2,160', icon: '💰', color: '#2d6a4f' },
    { label: 'Due Date', value: '5 Nov', icon: '⏰', color: '#e63946' },
    { label: 'Meals Taken', value: 42, icon: '🍽️', color: '#457b9d' },
  ];

  navItems = [
    { label: 'Dashboard', icon: '🏠', route: '/employee' },
    { label: 'Menu View', icon: '📋', route: '/employee/menu-view' },
    { label: 'Payment History', icon: '💳', route: '/employee/payment-history' },
    { label: 'Comments', icon: '💬', route: '/employee/comments' },
    { label: 'My Responses', icon: '📊', route: '/employee/response' },
  ];

  get greeting() {
    const h = new Date().getHours();
    return h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
  }

  markMeal(meal: Meal, status: 'needed' | 'not-needed') {
    meal.status = status;
  }
}
