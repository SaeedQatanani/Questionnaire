import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userSubject: Subject<any> = new Subject<any>();

  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
    this.userSubject.next(null);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    return !!user;
  }

  public getUserObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }

  public isAdmin(): boolean {
    const user = this.getUser();
    if (user && user.roles && user.roles.includes("ADMIN")) {
      return true;
    }
    return false;
  }
  
}