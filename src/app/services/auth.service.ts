import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUtH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUtH_API + 'login',
      {
        userName: username,
        userPassword: password,
      },
      httpOptions
    );
  }

  register(username: string, password: string): Observable<any> {
    console.log(username + password);
    return this.http.post(
      AUtH_API + 'register',
      {
        userName: username,
        userPassword: password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUtH_API + 'signout', {}, httpOptions);
  }
}
