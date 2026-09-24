import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  employeeName: string;
  date: string;
  text: string;
  reply: string;
  replyDate: string;
  replying: boolean;
  draftReply: string;
}

@Component({
  selector: 'app-comments-view',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './comments-view.html',
  styleUrl: './comments-view.scss',
})
export class CommentsView {
  sidebarOpen = false;
  providerName = 'Sri Murugan Mess';
  filterStatus: 'all' | 'pending' | 'replied' = 'all';

  navItems = [
    { label: 'Dashboard',    icon: '🏠', route: '/provider' },
    { label: 'Menu Upload',  icon: '📤', route: '/provider/menu-upload' },
    { label: 'Responses',    icon: '📊', route: '/provider/responses' },
    { label: 'Comments',     icon: '💬', route: '/provider/comments-view' },
  ];

  comments: Comment[] = [
    { id: 1, employeeName: 'Arjun Kumar',   date: 'Wed, 15 Oct · 8:30 AM',  text: 'The sambar today was a bit watery. Could you add more tamarind?', reply: 'Sure, we\'ll improve it tomorrow!', replyDate: 'Wed, 15 Oct · 9:00 AM', replying: false, draftReply: '' },
    { id: 2, employeeName: 'Priya Sharma',  date: 'Wed, 15 Oct · 9:15 AM',  text: 'Breakfast was excellent! Loved the chutneys.', reply: 'Thank you Priya! Your feedback motivates us 😊', replyDate: 'Wed, 15 Oct · 9:45 AM', replying: false, draftReply: '' },
    { id: 3, employeeName: 'Ravi Patel',    date: 'Tue, 14 Oct · 1:00 PM',  text: 'Please consider a non-spicy option for lunch.', reply: '', replyDate: '', replying: false, draftReply: '' },
    { id: 4, employeeName: 'Sneha Raj',     date: 'Tue, 14 Oct · 2:30 PM',  text: 'Rice quantity was less today.', reply: '', replyDate: '', replying: false, draftReply: '' },
    { id: 5, employeeName: 'Karthik M',     date: 'Mon, 13 Oct · 8:00 AM',  text: 'Idli was soft and fresh! Excellent breakfast.', reply: 'Glad you enjoyed it, Karthik!', replyDate: 'Mon, 13 Oct · 8:30 AM', replying: false, draftReply: '' },
  ];

  get filtered() {
    if (this.filterStatus === 'pending') return this.comments.filter(c => !c.reply);
    if (this.filterStatus === 'replied') return this.comments.filter(c => !!c.reply);
    return this.comments;
  }

  get pendingCount() { return this.comments.filter(c => !c.reply).length; }
  get repliedCount() { return this.comments.filter(c => !!c.reply).length; }

  startReply(c: Comment) {
    c.replying = true;
    c.draftReply = '';
  }
  cancelReply(c: Comment) { c.replying = false; }

  sendReply(c: Comment) {
    if (!c.draftReply.trim()) return;
    c.reply = c.draftReply.trim();
    c.replyDate = new Date().toLocaleString('en-IN', { weekday:'short', day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
    c.replying = false;
  }
}
