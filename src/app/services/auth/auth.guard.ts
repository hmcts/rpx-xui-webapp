import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
  ) {
  }


  canActivate() {
    if (!this.authService.isAuthenticated()) {
      this.authService.loginRedirect();
      return false;
    }

    return true;
  }
}
