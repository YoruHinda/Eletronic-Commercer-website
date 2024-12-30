import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from '../core/services/security/security.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private router: Router, private securityService: SecurityService) { }
  canActivate(): boolean {
    if (this.securityService.isLogged() && this.securityService.getUserRole() === 'ADMIN') {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
