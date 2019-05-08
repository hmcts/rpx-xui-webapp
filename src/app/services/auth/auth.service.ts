//import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie'
import * as jwtDecode from 'jwt-decode'
import { environment as config } from "../../../environments/environment";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/share";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  api_base_url;
  httpClient;
  COOKIE_KEYS;
  user;
  user$;
  constructor(
    // private httpCilent: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.COOKIE_KEYS = {
      TOKEN: config.cookies.token,
      USER: config.cookies.userId
    }

    this.api_base_url =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port;
    //this.httpCilent = httpCilent
    this.user = null;
  }

  canActivate() {
    console.log("reached can activate");
    if (!this.isAuthenticated()) {
      this.loginRedirect();
      return false;
    }

    return true;
  }

  generateLoginUrl() {
    const base = config.idam.idamLoginUrl;
    const clientId = config.idam.idamClientID;
    const callback = `${this.api_base_url}/${config.idam.oauthCallbackUrl}`;
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
    return jwtDecode(jwt)
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
    const jwt = this.cookieService.get(this.COOKIE_KEYS.TOKEN)
    if (!jwt) {
      return false
    }
    const jwtData = this.decodeJwt(jwt)
    const notExpired = jwtData.exp > Math.round(new Date().getTime() / 1000)
    // do stuff!!
    return notExpired
  }

  // isAuthenticated(): boolean {
  //   // false for now
  //   return false;
  // }

  signOut() {
    window.location.href = "/api/logout";
  }
}
