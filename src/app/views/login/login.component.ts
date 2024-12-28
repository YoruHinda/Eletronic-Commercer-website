import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SecurityService } from '../../core/services/security/security.service';
import { User } from '../../core/models/user';
import { FormsModule, NgForm } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  @ViewChild('loginErrorModal', { static: true }) loginErrorModal?: ElementRef;
  @ViewChild('registerModal') registerModal!: ElementRef

  constructor(private securityService: SecurityService) {
  }

  login(form: NgForm) {
    let user = new User(form.value['username'], form.value['password'])
    this.securityService.login(user).subscribe({
      next: () => {
        console.log(localStorage.getItem('token'))
      },
      error: () => {
        const a = new bootstrap.Modal(this.loginErrorModal?.nativeElement, {})
        a.show()
      }
    }
    )
  }

  showRegisterModal() {
    const a = new bootstrap.Modal(this.registerModal?.nativeElement, {})
    a.show()
  }

  register(form: NgForm) {

  }
}
