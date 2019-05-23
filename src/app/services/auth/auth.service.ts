
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import * as jwtDecode from 'jwt-decode';
import { environment as config } from '../../../environments/environment';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

//import {Store} from '@ngrx/store';
import { select, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  apiBaseUrl;
  //httpClient;
  COOKIE_KEYS;
  user;
  user$;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId
    };

    this.apiBaseUrl =
      window.location.protocol +
      '//' +
      window.location.hostname +
      ':' +
      window.location.port;

    //this.httpCilent = httpCilent

    this.user = null;
  }



  generateLoginUrl() {
    const base = config.idam.idamLoginUrl;
    const clientId = config.idam.idamClientID;
    const callback = `${this.apiBaseUrl}/${config.idam.oauthCallbackUrl}`;
    return `${base}/login?response_type=code&client_id=${clientId}&redirect_uri=${callback}`;
  }

  // getAuthHeaders() {
  //     interface HeaderObject {
  //         [key: string]: string
  //     }
  //     const headers: HeaderObject = {
  //         Authorization: this.cookieService.get(this.COOKIE_KEYS.TOKEN),
  //         [this.COOKIE_KEYS.USER]: this.cookieService.get(this.COOKIE_KEYS.USER)
  //     }
  //     return headers
  // }

  loginRedirect() {
    window.location.href = this.generateLoginUrl();
  }

  decodeJwt(jwt) {
    return jwtDecode(jwt);
  }

  // public getUser() {
  //     if (this.user) {
  //         return this.user
  //     } else {
  //         this.user = this.httpCilent.get('/api/user').map(response => {
  //             return response
  //         })
  //         return this.user
  //     }
  // }

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


  // to do remove console.log
  signOut() {
    this.httpClient.get('/api/logout').subscribe((res) => {
      console.log('logged out from auth service', res);
    });
  }

}

