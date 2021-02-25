import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '..';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
      public authService: AuthService,
      private readonly sessionStorage: SessionStorageService
  ) {
  }

  public canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().map( isAuth => {
      if (!isAuth) {
        this.storeRedirectUrl();
        this.authService.loginRedirect();
        return false;
      }

      this.redirectToStoredUrl();
      
      return true;
    });
  }

  private storeRedirectUrl(): void {
    this.sessionStorage.setItem('redirectUrl', window.location.pathname);
  }

  private redirectToStoredUrl(): void {
    const currentPathIsNotEmpty = /^\/([a-z]+)/g;
    const currentPathIsRoot = !window.location.pathname.match(currentPathIsNotEmpty);

    if (currentPathIsRoot) {
      const storedRedirectUrl = this.sessionStorage.getItem('redirectUrl', true);

      this.authService.setWindowLocationHref(storedRedirectUrl);
    }
  }
}
