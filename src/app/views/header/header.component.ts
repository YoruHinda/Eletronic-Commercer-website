import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../core/services/security/security.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLogged!: boolean

  constructor(private securityService: SecurityService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLogged = this.securityService.isLogged();
  }

  logout() {
    this.securityService.logout();
  }

  userLoginNavigator() {
    if (this.securityService.isLogged() && this.securityService.getUserRole() == 'USER') {
      this.router.navigate([''])
    }
    if (this.securityService.isLogged() && this.securityService.getUserRole() == 'ADMIN') {
      this.router.navigate(['/admin'])
    }
    if (!(this.securityService.isLogged())) {
      this.router.navigate(['/login'])
    }
  }
}