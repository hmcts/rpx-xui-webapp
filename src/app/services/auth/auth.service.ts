
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpClient
  ) {
  }

  public loginRedirect() {
    const href = '/auth/login';
    this.setWindowLocationHref(href);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.httpService.get<boolean>('/auth/isAuthenticated');
  }

  public signOut() {
    const href = '/auth/logout';
    this.clearSessionStorage();
    this.setWindowLocationHref(href);
  }

  public logOut(): Observable<any> {
    this.clearSessionStorage();
    return this.httpService.get('/auth/logout?noredirect=true');
  }

  public logOutAndRedirect() {
    this.logOut().subscribe( () => {
      this.setWindowLocationHref('/idle-sign-out');
    });
  }

  public setWindowLocationHref(href: string) {
    window.location.href = href;
  }

  private clearSessionStorage() {
    window.sessionStorage.clear();
  }
}
