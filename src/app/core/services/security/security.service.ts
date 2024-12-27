import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpClient: HttpClient, private route: Router) { }

  login(username: string, password: string) {

  }

  register(username: string, password: string) {

  }
}
