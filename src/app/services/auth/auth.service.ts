
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie';
import { AppUtils } from 'src/app/app-utils';
import { AppConstants } from 'src/app/app.constants';
import { environment as config } from '../../../environments/environment';
import { AppConfigService } from '../config/configuration.services';

@Injectable()
export class AuthService {
  public apiBaseUrl;
  public COOKIE_KEYS;
  public user;
  constructor(
    private readonly cookieService: CookieService,
    private readonly appConfigService: AppConfigService
  ) {
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId
    };

    // tslint:disable-next-line: prefer-template
    this.apiBaseUrl = window.location.protocol + '//' + window.location.hostname;

    if (window.location.port) { // don't add colon if there is no port
      // tslint:disable-next-line: prefer-template
      this.apiBaseUrl +=   ':' + window.location.port;
    }

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

  public generateLoginUrl() {
    const env = AppUtils.getEnvironment(window.location.origin);
    // const base = this.appConfigService.getRoutesConfig().idam.idamLoginUrl;
    const base = AppConstants.REDIRECT_URL[env];
    const clientId = this.appConfigService.getRoutesConfig().idam.idamClientID;
    const callback = `${this.apiBaseUrl}/${this.appConfigService.getRoutesConfig().idam.oauthCallbackUrl}`;
    const scope = `profile openid roles manage-user create-user`;
    return `${base}/login?response_type=code&client_id=${clientId}&redirect_uri=${callback}&scope=${scope}`;
  }

  public loginRedirect() {
    window.location.href = this.generateLoginUrl();
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
    window.location.href = '/api/logout';
  }
}
