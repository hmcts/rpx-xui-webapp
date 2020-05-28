
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import * as jwtDecode from 'jwt-decode';
import { environment as config } from '../../../environments/environment';
import {EnvironmentService} from '../../shared/services/environment.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {AppConfigService} from '../config/configuration.services';

@Injectable()
export class AuthService {
  apiBaseUrl;
  COOKIE_KEYS;
  user;
  constructor(
    private cookieService: CookieService,
    private appConfigService: AppConfigService,
    private environmentService: EnvironmentService
  ) {
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId,
      ROLES: config.cookies.roles,
    };

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

  /**
   * Generate the Idam Login url.
   */
  generateLoginUrl() {

    const SCOPE = `profile openid roles manage-user create-user`;

    return this.environmentService.config$.map( environmentConfig => {

      const { clientId, idamWeb, oAuthCallback, protocol } = environmentConfig;

      const port = window.location.port ? `:${window.location.port}` : ``;
      const API_BASE_URL = `${protocol}://${window.location.hostname}${port}`;

      const callback = `${API_BASE_URL}/${oAuthCallback}`;

      return `${idamWeb}/login?response_type=code&client_id=${clientId}&redirect_uri=${callback}&scope=${SCOPE}`;
    });
  }

  loginRedirect() {
    this.generateLoginUrl().subscribe( url => {
      window.location.href = url;
    });
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

  logOutAndRedirect() {

    console.log('logOutAndRedirect');
    const { hostname, port } = window.location;
    const portNumber = port ? `:${port}` : '';

    const baseUrl = `http://${hostname}${portNumber}`;

    const idleSignOutUrl = `${baseUrl}/idle-sign-out`;
    window.location.href = `api/logout?redirect=${idleSignOutUrl}`;
  }
}
