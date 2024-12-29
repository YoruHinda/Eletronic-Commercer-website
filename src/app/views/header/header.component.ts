import { Component } from '@angular/core';
import { SecurityService } from '../../core/services/security/security.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  homePage: string = ''
  adminPage: string = '/admin'

  constructor(private securityService: SecurityService) {
  }
}
