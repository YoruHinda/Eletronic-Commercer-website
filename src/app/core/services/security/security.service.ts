import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

const TOKEN = 'token'
const USER = 'username'
const USER_ROLE = 'user_role'

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/auth/login', user).pipe(tap((res) => {
      if (res) {
        localStorage.setItem(TOKEN, btoa(JSON.stringify(res['token'])))
        localStorage.setItem(USER, btoa(JSON.stringify(res['username'])))
        localStorage.setItem(USER_ROLE, btoa(JSON.stringify(res['user_role'])))
        this.router.navigate(['/'])
        return res;
      }
    }));
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/auth/register', user);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login'])
  }

  isLogged(): boolean {
    return localStorage.getItem(USER) ? true : false;
  }

  getUserRole(): string {
    return localStorage.getItem(USER_ROLE) ? JSON.parse(atob(localStorage.getItem(USER_ROLE) as string)) : null;
  }

  getToken(): string {
    return localStorage.getItem(TOKEN) ? JSON.parse(atob(localStorage.getItem(TOKEN) as string)) : null;
  }
}
