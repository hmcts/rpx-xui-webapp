import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { UserDetails } from '../../app/models';
import * as fromActions from '../../app/store';

@Injectable()
export class BookingGuard {
  public static defaultUrl: string = '/cases';

  constructor(
    private readonly router: Router,
    private readonly store: Store<fromActions.State>
  ) {}

  public canActivate(): Observable<boolean> {
    const userDetails$ = this.store.pipe(select(fromActions.getUserDetails));

    return userDetails$.pipe(
      // ignore falsy/partial emissions
      filter((u: any): u is UserDetails => !!u && !!u.userInfo),
      map((user) => {
        const roleCategory = user.userInfo.roleCategory;
        const roles = user.userInfo.roles ?? [];

        // TODO(EXUI-2073): Decision needed for roleCategory === <NEW_CATEGORY>.
        // QUESTION: Should users in <NEW_CATEGORY> have access to booking functionality in the UI?
        // CONTEXT: This guard controls route activation for booking pages; denied users are immediately redirected to BookingGuard.defaultUrl (/cases).
        // CONTEXT: Access requires two checks: user is treated as judicial (roleCategory === JUDICIAL or IDAM role includes caseworker-judge)
        // CONTEXT: and at least one roleAssignmentInfo item has bookable=true (boolean or "true" string). Non-judicial categories fail even when bookable assignments exist.
        const isJudicial = roleCategory === 'JUDICIAL' || roles.includes('caseworker-judge');

        const hasBookable = (user.roleAssignmentInfo ?? []).some((ra: any) => {
          const b = ra?.bookable;
          return b === true || (typeof b === 'string' && b.toLowerCase() === 'true');
        });

        return isJudicial && hasBookable;
      }),
      tap((allowed) => {
        if (!allowed) {
          this.router.navigate([BookingGuard.defaultUrl]);
        }
      }),
      take(1)
    );
  }
}
