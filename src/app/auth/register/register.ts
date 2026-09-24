import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Provider { id: number; name: string; location: string; }

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  role: 'employee' | 'provider' = 'employee';
  registerForm!: FormGroup;
  focused = '';
  showPassword = false;
  isLoading = false;
  shakeForm = false;
  errorMsg = '';

  // TODO: load from API
  providers: Provider[] = [
    { id: 1, name: 'Sri Murugan Mess', location: 'Anna Nagar' },
    { id: 2, name: 'Saravana Bhavan Mess', location: 'T. Nagar' },
    { id: 3, name: 'Home Kitchen Mess', location: 'Velachery' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      name:       ['', Validators.required],
      phone:      ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required, Validators.minLength(6)]],
      providerId: [''],
    });
  }

  setRole(r: 'employee' | 'provider') {
    this.role = r;
    const ctrl = this.registerForm.get('providerId')!;
    if (r === 'employee') {
      ctrl.setValidators(Validators.required);
    } else {
      ctrl.clearValidators();
      ctrl.setValue('');
    }
    ctrl.updateValueAndValidity();
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.triggerShake();
      return;
    }
    this.isLoading = true;
    this.errorMsg = '';

    // TODO: connect to AuthService register API
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, 1500);
  }

  private triggerShake() {
    this.shakeForm = true;
    setTimeout(() => (this.shakeForm = false), 500);
  }
}
