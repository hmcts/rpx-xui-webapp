import {Injectable} from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import {CookieService} from 'ngx-cookie';
import {environment as config} from '../../../environments/environment';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Injectable()
export class AuthService {
  public COOKIE_KEYS;
  public user;
  constructor(
    private cookieService: CookieService
  ) {
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId,
      ROLES: config.cookies.roles,
    };

    this.user = null;
  }

  public canActivate() {
    console.log('reached can activate');
    if (!this.isAuthenticated()) {
      this.loginRedirect();
      return false;
    }

    return true;
  }

  public loginRedirect() {
    window.location.href = '/auth/login';
  }

  public decodeJwt(jwt) {
    return jwtDecode(jwt);
  }

  public isAuthenticated(): boolean {
    const jwt = this.cookieService.get(this.COOKIE_KEYS.TOKEN);
    if (!jwt) {
      return false;
    }
    const jwtData = this.decodeJwt(jwt);
    const notExpired = jwtData.exp > Math.round(new Date().getTime() / 1000);
    // do stuff!!
    return notExpired;
  }


  public signOut() {
    window.location.href = '/auth/logout';
  }
}
