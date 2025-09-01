import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserDetails } from '../../app/models';
import * as fromActions from '../../app/store';

@Injectable()
export class BookingGuard {
  public static defaultUrl: string = '/cases';

  constructor(private readonly router: Router,
              private readonly store: Store<fromActions.State>) {}

  public hasAccess(userDetails: UserDetails): boolean {
    const { roleAssignmentInfo, userInfo } = userDetails;
    return userInfo.roleCategory === RoleCategory.JUDICIAL && roleAssignmentInfo.some((roleAssignment) => 'bookable' in roleAssignment && (roleAssignment.bookable === true || roleAssignment.bookable === 'true'));
  }

  public canActivate(): Observable<boolean> {
    const userDetails$: Observable<UserDetails> = this.store.pipe(select(fromActions.getUserDetails));
    const userAccess$ = userDetails$;
    return userAccess$.pipe(map((userDetails) => {
      // note: in order to enable booking url for guarded users just set return true for testing purposes
      // return true;
      return this.hasAccess(userDetails);
    })).pipe(tap((hasAccesss) => {
      if (!hasAccesss) {
        this.router.navigate([BookingGuard.defaultUrl]);
      }
    }));
  }
}
