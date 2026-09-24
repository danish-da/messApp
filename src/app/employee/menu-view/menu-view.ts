import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface Meal { slot: string; icon: string; time: string; menu: string; status: 'pending' | 'needed' | 'not-needed'; }
interface DayMenu { date: string; label: string; isToday: boolean; meals: Meal[]; }

@Component({
  selector: 'app-menu-view',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-view.html',
  styleUrl: './menu-view.scss',
})
export class MenuView {
  sidebarOpen = false;
  employeeName = 'Arjun Kumar';
  providerName = 'Sri Murugan Mess';
  selectedDay = 0;

  navItems = [
    { label: 'Dashboard',       icon: '🏠', route: '/employee' },
    { label: 'Menu View',       icon: '📋', route: '/employee/menu-view' },
    { label: 'Payment History', icon: '💳', route: '/employee/payment-history' },
    { label: 'Comments',        icon: '💬', route: '/employee/comments' },
    { label: 'My Responses',    icon: '📊', route: '/employee/response' },
  ];

  weekMenu: DayMenu[] = [
    {
      date: 'Mon, 13 Oct', label: 'Mon', isToday: false,
      meals: [
        { slot: 'Breakfast', icon: '🌅', time: '7:00 – 9:00 AM',   menu: 'Idli, Sambar, Coconut Chutney',    status: 'needed' },
        { slot: 'Lunch',     icon: '☀️', time: '12:00 – 2:00 PM',  menu: 'Rice, Dal Fry, Aloo Sabzi, Papad', status: 'needed' },
        { slot: 'Dinner',    icon: '🌙', time: '7:00 – 9:00 PM',   menu: 'Chapati, Paneer Butter Masala',    status: 'not-needed' },
      ],
    },
    {
      date: 'Tue, 14 Oct', label: 'Tue', isToday: false,
      meals: [
        { slot: 'Breakfast', icon: '🌅', time: '7:00 – 9:00 AM',   menu: 'Poha, Chai',                       status: 'needed' },
        { slot: 'Lunch',     icon: '☀️', time: '12:00 – 2:00 PM',  menu: 'Rice, Sambar, Rasam, Curd',        status: 'not-needed' },
        { slot: 'Dinner',    icon: '🌙', time: '7:00 – 9:00 PM',   menu: 'Roti, Dal Tadka, Salad',           status: 'needed' },
      ],
    },
    {
      date: 'Wed, 15 Oct', label: 'Wed', isToday: true,
      meals: [
        { slot: 'Breakfast', icon: '🌅', time: '7:00 – 9:00 AM',   menu: 'Dosa, Sambar, Chutney',            status: 'pending' },
        { slot: 'Lunch',     icon: '☀️', time: '12:00 – 2:00 PM',  menu: 'Veg Biryani, Raita, Pickle',       status: 'pending' },
        { slot: 'Dinner',    icon: '🌙', time: '7:00 – 9:00 PM',   menu: 'Chapati, Chana Masala',            status: 'pending' },
      ],
    },
    {
      date: 'Thu, 16 Oct', label: 'Thu', isToday: false,
      meals: [
        { slot: 'Breakfast', icon: '🌅', time: '7:00 – 9:00 AM',   menu: 'Upma, Coconut Chutney',            status: 'pending' },
        { slot: 'Lunch',     icon: '☀️', time: '12:00 – 2:00 PM',  menu: 'Rice, Rajma, Sabzi',               status: 'pending' },
        { slot: 'Dinner',    icon: '🌙', time: '7:00 – 9:00 PM',   menu: 'Paratha, Curd, Pickle',            status: 'pending' },
      ],
    },
    {
      date: 'Fri, 17 Oct', label: 'Fri', isToday: false,
      meals: [
        { slot: 'Breakfast', icon: '🌅', time: '7:00 – 9:00 AM',   menu: 'Puri, Aloo Bhaji',                 status: 'pending' },
        { slot: 'Lunch',     icon: '☀️', time: '12:00 – 2:00 PM',  menu: 'Rice, Dal, Palak Sabzi',           status: 'pending' },
        { slot: 'Dinner',    icon: '🌙', time: '7:00 – 9:00 PM',   menu: 'Roti, Mix Veg Curry',              status: 'pending' },
      ],
    },
  ];

  get currentDay() { return this.weekMenu[this.selectedDay]; }

  get daySummary() {
    const meals = this.currentDay.meals;
    const needed = meals.filter(m => m.status === 'needed').length;
    const cost = needed * 60;
    return { needed, cost };
  }

  mark(meal: Meal, status: 'needed' | 'not-needed') {
    meal.status = status;
  }
}
