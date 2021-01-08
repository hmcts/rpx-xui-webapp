import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SessionStorageService } from '../session-storage/session-storage.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpClient,
    private readonly sessionStorageService: SessionStorageService
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
    // Clear out the SessionStorage.
    this.sessionStorageService.clear();
    const href = '/auth/logout';
    this.setWindowLocationHref(href);
  }

  public logOut(): Observable<any> {
    // Clear out the SessionStorage.
    this.sessionStorageService.clear();
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
}
