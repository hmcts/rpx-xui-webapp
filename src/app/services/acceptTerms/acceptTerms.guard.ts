import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { of, Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import * as fromApp from '../../../app/store';
import { Store, select } from '@ngrx/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcceptTermsGuard implements CanActivate {
  constructor(private cookieService: CookieService,
              private store: Store<fromApp.State>) {
  }

  canActivate(): Observable<boolean> {
    const isPuiCaseManager = this.isRoleExistsForUser('pui-case-manager');
    if (isPuiCaseManager) {
      return this.checkStore().pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
    }
    return of(true);
  }

  checkStore() {
    return this.store.pipe(select(fromApp.getTandCLoaded),
      tap(tcConfirmed => {
        if (!tcConfirmed.isLoaded) {
          const userId = this.cookieService.get('__userid__');
          this.store.dispatch(new fromApp.LoadHasAcceptedTC(userId));
        }
        if (tcConfirmed.hasUserAcceptedTC === 'false') {
          this.store.dispatch(new fromApp.Go({path: ['accept-terms-and-conditions']}));
        }

      }),
      filter(tcConfirmed => tcConfirmed.isLoaded),
      take(1)
    );
  }
  isRoleExistsForUser(roleName: string, cookiename: string = 'roles'): boolean {
    const userRoles = this.cookieService.get(cookiename);
    return userRoles && userRoles.indexOf(roleName) > 0;
  }
}
