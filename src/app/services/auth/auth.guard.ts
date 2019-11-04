import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
  ) {
  }


  public canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.authService.loginRedirect();
      return false;
    }

    return true;
  }
}
