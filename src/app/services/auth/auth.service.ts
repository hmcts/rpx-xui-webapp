
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import * as jwtDecode from 'jwt-decode';
import { environment as config } from '../../../environments/environment';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {AppConfigService} from '../config/configuration.services';
import { AppUtils } from 'src/app/app-utils';
import { AppConstants } from 'src/app/app.constants';

@Injectable()
export class AuthService {
  apiBaseUrl;
  COOKIE_KEYS;
  user;
  constructor(
    private cookieService: CookieService,
    private appConfigService: AppConfigService
  ) {
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId,
      ROLES: config.cookies.roles,
    };

    this.apiBaseUrl = window.location.protocol + '//' + window.location.hostname;

    if (window.location.port) { // don't add colon if there is no port
      this.apiBaseUrl +=   ':' + window.location.port;
    }

    this.user = null;
  }

  canActivate() {
    console.log('reached can activate');
    if (!this.isAuthenticated()) {
      this.loginRedirect();
      return false;
    }

    return true;
  }

  generateLoginUrl() {
    const env = AppUtils.getEnvironment(window.location.origin);
    const idamLoginUrl = this.appConfigService.getRoutesConfig().idam.idamLoginUrl;
    const base = idamLoginUrl ? idamLoginUrl : AppConstants.REDIRECT_URL[env];
    const clientId = this.appConfigService.getRoutesConfig().idam.idamClientID;
    const callback = `${this.apiBaseUrl}/${this.appConfigService.getRoutesConfig().idam.oauthCallbackUrl}`;
    const scope = `profile openid roles manage-user create-user`;
    return `${base}/login?response_type=code&client_id=${clientId}&redirect_uri=${callback}&scope=${scope}`;
  }

  loginRedirect() {
    window.location.href = this.generateLoginUrl();
  }

  decodeJwt(jwt) {
    return jwtDecode(jwt);
  }


  isAuthenticated(): boolean {
    const jwt = this.cookieService.get(this.COOKIE_KEYS.TOKEN);
    if (!jwt) {
      return false;
    }
    const jwtData = this.decodeJwt(jwt);
    const notExpired = jwtData.exp > Math.round(new Date().getTime() / 1000);
    // do stuff!!
    return notExpired;
  }


  signOut() {
    window.location.href = '/api/logout';
  }
}
