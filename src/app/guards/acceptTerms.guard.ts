import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { of, Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import * as fromApp from '../store';
import { Store, select } from '@ngrx/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import { TermsAndCondition } from 'src/app/models/TermsAndCondition';
import { AppUtils } from '../app-utils';

@Injectable({
  providedIn: 'root'
})
export class AcceptTermsGuard implements CanActivate {
  constructor(private cookieService: CookieService,
              private store: Store<fromApp.State>) {
  }

  canActivate(): Observable<boolean> {
    const isPuiCaseManager = AppUtils.isRoleExistsForUser('pui-case-manager', this.cookieService);
    if (isPuiCaseManager) {
      return this.checkStore(this.store).pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
    }
    return of(true);
  }

  checkStore(store: Store<fromApp.State>) {
    return store.pipe(select(fromApp.getTandCLoaded),
      tap(tcConfirmed => {
        this.handleTC(tcConfirmed, '__userid__', 'accept-terms-and-conditions', this.cookieService, this.store);
      }),
      filter(tcConfirmed => tcConfirmed.isLoaded),
      take(1)
    );
  }

  handleTC(tcConfirmed: TermsAndCondition,
           userIdCookieName: string,
           acceptTcPath: string,
           cookieService: CookieService,
           store: Store<fromApp.State>) {
    if (!tcConfirmed.isLoaded) {
      const userId = cookieService.get(userIdCookieName);
      store.dispatch(new fromApp.LoadHasAcceptedTC(userId));
    }
    if (tcConfirmed.hasUserAcceptedTC === 'false') {
      store.dispatch(new fromApp.Go({path: [acceptTcPath]}));
    }
  }
}
