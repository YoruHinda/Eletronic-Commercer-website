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

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/auth/login', user).pipe(tap((res) => {
      localStorage.setItem('token', btoa(JSON.stringify(res)))
    }));
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/auth/register', user);
  }

  logout() {
    localStorage.clear();
    this.router.navigate([''])
  }
}
