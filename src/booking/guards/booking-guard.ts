import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../app/app.constants';
import {UserDetails} from '../../app/models';
import * as fromActions from '../../app/store';
import {RoleCategory} from '../models';

@Injectable()
export class BookingGuard implements CanActivate {
  public static defaultUrl: string = '/cases';

  constructor(private readonly router: Router,
              private readonly store: Store<fromActions.State>,
              private readonly featureToggleService: FeatureToggleService) {
  }

  public hasAccess(userDetails: UserDetails): boolean {
    const { roleAssignmentInfo, userInfo } = userDetails;
    return userInfo.roleCategory === RoleCategory.JUDICIAL && roleAssignmentInfo.some( roleAssignment => 'bookable' in roleAssignment && roleAssignment.bookable === true );
  }

  public canActivate(): Observable<boolean> {
<<<<<<< HEAD
    return of(true);
    // const userDetails$: Observable<UserDetails> = this.store.pipe(select(fromActions.getUserDetails));
    // const bookingFeatureToggle$: Observable<boolean> = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.booking, false);
    // const userAccess$ = combineLatest([userDetails$, bookingFeatureToggle$]);
    // return userAccess$.pipe(map(([userDetails, bookingFeatureToggle]) => {
    //   if (!bookingFeatureToggle) {
    //     return false;
    //   }
    //   return this.hasAccess(userDetails);
    // })).pipe(tap(hasAccesss => {
    //   if (!hasAccesss) {
    //     this.router.navigate([BookingGuard.defaultUrl]);
    //   }
    // }));
=======
    const userDetails$: Observable<UserDetails> = this.store.pipe(select(fromActions.getUserDetails));
    const bookingFeatureToggle$: Observable<boolean> = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.booking, false);
    const userAccess$ = combineLatest([userDetails$, bookingFeatureToggle$]);
    return userAccess$.pipe(map(([userDetails, bookingFeatureToggle]) => {
      if (!bookingFeatureToggle) {
        return false;
      }
      // note: in order to enable booking url for guarded users just set return true for testing purposes
      // return true;
      return this.hasAccess(userDetails);
    })).pipe(tap(hasAccesss => {
      if (!hasAccesss) {
        this.router.navigate([BookingGuard.defaultUrl]);
      }
    }));
>>>>>>> 669d0f42f0500f3690967ff7d0b1c1738ab997d7
  }
}
