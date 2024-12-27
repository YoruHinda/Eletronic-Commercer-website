import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SecurityService } from '../../core/services/security/security.service';
import { User } from '../../core/models/user';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private securityService: SecurityService) {

  }

  login(form: NgForm) {
    let user = new User(form.value['username'], form.value['password'])
    this.securityService.login(user).subscribe(() => {
      console.log(localStorage.getItem('token'))
    });
  }
}
