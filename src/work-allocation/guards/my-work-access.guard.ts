import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AppConstants } from '../../app/app.constants';
import { UserDetails } from '../../app/models';
import { HeaderConfigService } from '../../app/services/header-config/header-config.service';
import { filterNavigationItemsByAccess } from '../../app/shared/utils/navigation-access.utils';
import * as fromAppStore from '../../app/store';

@Injectable({
  providedIn: 'root',
})
export class MyWorkAccessGuard {
  public static readonly defaultUrl: string = '/cases';
  public static readonly myWorkUrl: string = '/work/my-work/list';

  constructor(
    private readonly router: Router,
    private readonly store: Store<fromAppStore.State>,
    private readonly headerConfigService: HeaderConfigService
  ) {}

  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAppStore.getUserDetails),
      filter((userDetails: UserDetails) => !!userDetails?.userInfo),
      switchMap((userDetails) => {
        const userRoles = userDetails.userInfo.roles ?? [];
        return this.headerConfigService.constructHeaderConfig(userRoles).pipe(
          map((headerItems) => filterNavigationItemsByAccess(headerItems, userRoles, AppConstants.MENU_FLAGS)),
          map((headerItems) => headerItems.some((item) => item.href === MyWorkAccessGuard.myWorkUrl))
        );
      }),
      tap((allowed) => {
        if (!allowed) {
          this.router.navigateByUrl(MyWorkAccessGuard.defaultUrl);
        }
      }),
      take(1)
    );
  }
}
