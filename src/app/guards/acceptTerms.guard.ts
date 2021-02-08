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
    return of(false);
  }
}
