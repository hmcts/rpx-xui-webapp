import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AppUtils } from '../app-utils';
import { TermsConditionsService } from '../services/terms-and-conditions/terms-and-conditions.service';
import * as fromApp from '../store';

@Injectable({
  providedIn: 'root'
})
export class AcceptTermsGuard implements CanActivate {
  constructor(private readonly store: Store<fromApp.State>) {
  }

  public canActivate(): Observable<boolean> {
    try {
      const isTandCEnabled$ = this.store.pipe(select(fromApp.getIsTermsAndConditionsFeatureEnabled));
      return isTandCEnabled$.pipe(switchMap(enabled => enabled ? this.enableTermsAndConditions() : of(true)));
    } catch (e) {
      return of(true);
    }
  }

  private enableTermsAndConditions(): Observable<boolean> {
    // const isPuiCaseManager = AppUtils.isRoleExistsForUser('pui-case-manager', this.cookieService);
    // if (!isPuiCaseManager) {
    //   return of(true);
    // }
    // return this.store.pipe(
    //   select(fromApp.getTandCLoaded),
    //   tap(tc => {
    //     if (!tc.isLoaded) {
    //       const userId = this.cookieService.get('__userid__');
    //       this.store.dispatch(new fromApp.LoadHasAcceptedTC(userId));
    //     }
    //   }),
    //   filter(tc => tc.isLoaded),
    //   map(tc => tc.hasUserAcceptedTC),
    //   tap(accepted => {
    //     if (!accepted && window.location.href.indexOf('accept-terms-and-conditions') === -1) {
    //       window.location.href = '/accept-terms-and-conditions';
    //     }
    //   })
    // );
    return of(false);
  }
}
