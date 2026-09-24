import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number; text: string; date: string; time: string;
  reply?: string; replyDate?: string;
}

@Component({
  selector: 'app-comments',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  sidebarOpen = false;
  employeeName = 'Arjun Kumar';
  providerName = 'Sri Murugan Mess';
  newComment = '';
  charLimit = 300;

  navItems = [
    { label: 'Dashboard',       icon: '🏠', route: '/employee' },
    { label: 'Menu View',       icon: '📋', route: '/employee/menu-view' },
    { label: 'Payment History', icon: '💳', route: '/employee/payment-history' },
    { label: 'Comments',        icon: '💬', route: '/employee/comments' },
    { label: 'My Responses',    icon: '📊', route: '/employee/response' },
  ];

  comments: Comment[] = [
    {
      id: 1,
      text: 'The lunch quantity has been less for the past few days. Please increase the rice portion.',
      date: '12 Oct 2025', time: '2:30 PM',
      reply: 'Thank you for the feedback! We have noted this and will ensure proper portions from tomorrow.',
      replyDate: '12 Oct 2025, 4:00 PM',
    },
    {
      id: 2,
      text: 'Dinner was excellent today! The paneer curry was very tasty. Keep it up!',
      date: '10 Oct 2025', time: '9:15 PM',
      reply: 'Glad you enjoyed it! We will keep the quality consistent.',
      replyDate: '11 Oct 2025, 8:00 AM',
    },
    {
      id: 3,
      text: 'Can we have some variety in breakfast? Idli and dosa every day gets repetitive.',
      date: '8 Oct 2025', time: '9:00 AM',
    },
  ];

  get remaining() { return this.charLimit - this.newComment.length; }

  submitComment() {
    if (!this.newComment.trim()) return;
    this.comments.unshift({
      id: Date.now(),
      text: this.newComment.trim(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    });
    this.newComment = '';
  }
}
