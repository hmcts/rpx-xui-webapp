import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AppUtils } from '../app-utils';
import * as fromApp from '../store';

@Injectable({
  providedIn: 'root'
})
export class AllowAcceptTermsGuard implements CanActivate {
  constructor(private store: Store<fromApp.State>,
              private cookieService: CookieService) {
  }

  canActivate(): Observable<boolean> {
    const isPuiCaseManager = AppUtils.isRoleExistsForUser('pui-case-manager', this.cookieService);
    if (!isPuiCaseManager) {
      return of(true);
    }
    return this.store.pipe(
      select(fromApp.getTandCLoaded),
      tap(tc => {
        if (!tc.isLoaded) {
          const userId = this.cookieService.get('__userid__');
          this.store.dispatch(new fromApp.LoadHasAcceptedTC(userId));
        }
      }),
      filter(tc => tc.isLoaded),
      map(tc => !tc.hasUserAcceptedTC)
    );
  }
}
