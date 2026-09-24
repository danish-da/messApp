import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;
  focused = '';
  showPassword = false;
  isLoading = false;
  shakeForm = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.triggerShake();
      return;
    }
    this.isLoading = true;
    this.errorMsg = '';

    // TODO: connect to AuthService
    setTimeout(() => {
      this.isLoading = false;
      // Simulate role-based redirect — replace with real API response
      const role: string = 'employee'; // TODO: replace with actual role from API response
      this.router.navigate([role === 'provider' ? '/provider' : '/employee']);
    }, 1500);
  }

  private triggerShake() {
    this.shakeForm = true;
    setTimeout(() => (this.shakeForm = false), 500);
  }
}
