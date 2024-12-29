import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

export class LoginComponent implements OnInit {
  @ViewChild('loginErrorModal', { static: true }) loginErrorModal!: ElementRef;
  @ViewChild('registerModal', { static: true }) registerModal!: ElementRef
  registerErrorOcurred: boolean = false;
  registerSuccess: boolean = false;
  registerModalControl: any
  loginErrorControl: any

  constructor(private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.registerModalControl = new bootstrap.Modal(this.registerModal.nativeElement, {})
    this.loginErrorControl = new bootstrap.Modal(this.loginErrorModal.nativeElement, {})
  }

  login(form: NgForm) {
    const user = new User(form.value['username'], form.value['password'])
    this.securityService.login(user).subscribe({
      next: () => {
        console.log(localStorage.getItem('token'))
      },
      error: () => {
        this.loginErrorControl.show()
      }
    }
    )
  }

  showRegisterModal() {
    this.registerModalControl.show()
  }

  register(form: NgForm) {
    const user = new User(form.value['username'], form.value['password'])
    this.securityService.register(user).subscribe({
      next: () => {
        this.registerModalControl.hide()
        this.registerSuccess = true;
        this.registerErrorOcurred = false;
      },
      error: () => {
        this.registerModalControl.hide()
        this.registerSuccess = false;
        this.registerErrorOcurred = true;
      }
    })
  }
}
