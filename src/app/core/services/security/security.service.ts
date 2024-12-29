import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  logged!: boolean;

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/auth/login', user).pipe(tap((res) => {
      if (res) {
        localStorage.setItem('token', btoa(JSON.stringify(res['token'])))
        localStorage.setItem('username', btoa(JSON.stringify(res['username'])))
        localStorage.setItem('user_role', btoa(JSON.stringify(res['user_role'])))
        this.router.navigate([''])
        this.logged = true
        return res;
      }
    }));
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/auth/register', user);
  }

  logout() {
    localStorage.clear();
    this.logged = false;
    this.router.navigate(['login'])
  }

  isLogged(): boolean {
    return this.logged
  }

  getUserRole(): string {
    return localStorage.getItem('user_role') ? JSON.parse(atob(localStorage.getItem('user_role') as string)) : null;
  }
}
