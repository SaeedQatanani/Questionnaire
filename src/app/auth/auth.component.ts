import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private session: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.session.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.session.getUser().roles;
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    if (!this.isLoginMode) {
      console.log(username + password);
      this.authService.register(username, password).subscribe({
        next: () => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/auth']);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        },
      });
    } else {
      this.authService.login(username, password).subscribe({
        next: data => {
          this.session.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.session.getUser().roles;
          this.router.navigate(['/profile']);
        },
        error: error => {
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
