import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../app/app.constants';
import {RoleAssignmentInfo, UserDetails} from '../../app/models';
import * as fromActions from '../../app/store';
import {RoleCategory} from '../models';

@Injectable()
export class BookingGuard implements CanActivate {
  public static defaultUrl: string = '/cases';

  constructor(private readonly router: Router,
              private readonly store: Store<fromActions.State>,
              private readonly featureToggleService: FeatureToggleService) {
  }

  public hasAccess(roleCategory: string, roleAssignments: RoleAssignmentInfo[]): boolean {
    return roleCategory !== RoleCategory.JUDICIAL && roleAssignments.some( roleAssignment => 'bookable' in roleAssignment && roleAssignment.bookable === true );
  }

  public canActivate(): Observable<boolean> {
    const userDetails$: Observable<UserDetails> = this.store.pipe(select(fromActions.getUserDetails));
    const bookingFeatureToggle$: Observable<boolean> = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.booking, false);
    const userAccess$ = combineLatest([userDetails$, bookingFeatureToggle$]);
    return userAccess$.pipe(map(([details, bookingFeatureToggle]) => {
      const { roleAssignmentInfo, userInfo } = details;
      if (!bookingFeatureToggle) {
        return false;
      }
      return this.hasAccess(userInfo.roleCategory, roleAssignmentInfo);
    })).pipe(tap(hasAccesss => {
      if (!hasAccesss) {
        this.router.navigate([BookingGuard.defaultUrl]);
      }
    }));
  }
}
