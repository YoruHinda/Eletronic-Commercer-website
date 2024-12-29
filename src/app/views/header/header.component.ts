import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../core/services/security/security.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  homePage: string = ''
  adminPage: string = '/admin'
  isLogged!: boolean

  constructor(private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.isLogged = this.securityService.isLogged();
  }

  logout() {
    this.securityService.logout();
  }
}
