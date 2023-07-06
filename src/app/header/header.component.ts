import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SessionService } from '../services/session.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[] | undefined;
  showButton = true;
  locale: string = 'en-US';
  unsubscriber$ = new Subject();

  constructor(
    private session: SessionService,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}
  
  ngOnInit() {
    this.session.isLoggedIn() ? this.handleLoggedIn() : this.handleNoUser();
    this.session
    .getUserObservable()
    .pipe(takeUntil(this.unsubscriber$))
    .subscribe((user) => {
      user ? this.handleLoggedIn() : this.handleNoUser();
    });
  }
  
    ngOnDestroy(): void {
      this.unsubscriber$.unsubscribe();
    }
  
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out');
        this.session.clean();
        this.router.navigate(['/auth']);
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  switchLocale() {
    this.locale = this.locale === 'en-US' ? 'ar-SA' : 'en-US';
    this.translateService.use(this.locale);
  }

  handleLoggedIn() {
    this.showButton = true;
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      {
        label: 'Questions',
        icon: 'pi pi-question',
        routerLink: '/questions',
      },
      { label: 'About', icon: 'pi pi-info-circle', routerLink: '/about' },
      { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    ];
  }

  handleNoUser() {
    this.showButton = false;
    this.items = [
      { label: 'About', icon: 'pi pi-info-circle', routerLink: '/about' },
      { label: 'Log in', icon: 'pi pi-user', routerLink: '/auth' },
    ];
  }
}
