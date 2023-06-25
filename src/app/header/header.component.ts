import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SessionService } from '../services/session.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private session: SessionService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Questions', icon: 'pi pi-question', routerLink: '/questions' },
      { label: 'About', icon: 'pi pi-info-circle', routerLink: '/about' },
      { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' }
    ];
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log("Logged out");
        this.session.clean();
        this.router.navigate(['/auth']);
      },
      error: error => {
        console.log(error.error);
      }
    })
  }
}