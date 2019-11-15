import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { of, Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import * as fromApp from '../store';
import { Store } from '@ngrx/store';
import {catchError, switchMap} from 'rxjs/operators';
import { AppUtils } from '../app-utils';
import { GuardUtil } from './guardUtil';

@Injectable({
  providedIn: 'root'
})
export class AllowAcceptTermsGuard implements CanActivate {
  constructor(private cookieService: CookieService,
              private store: Store<fromApp.State>,
              private guardUtil: GuardUtil) {
  }

  canActivate(): Observable<boolean> {
    const isPuiCaseManager = AppUtils.isRoleExistsForUser('pui-case-manager', this.cookieService);
    if (isPuiCaseManager) {
      return this.guardUtil.checkStore(this.store, 'cases', 'true').pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
    }
    return of(true);
  }
}
