import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
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

public canActivate(): Observable<boolean | UrlTree> {
  return this.store.pipe(
    select(fromActions.getUserDetails),
    // wait until userDetails (and userInfo) are present
    filter((u): u is UserDetails => !!u && !!u.userInfo),
    take(1),
    map((u) => this.hasAccess(u) ? true : this.router.createUrlTree([BookingGuard.defaultUrl]))
  );
}

}
