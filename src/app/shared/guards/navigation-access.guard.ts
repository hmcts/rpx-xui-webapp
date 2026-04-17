import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AppConstants } from '../../app.constants';
import { UserDetails } from '../../models';
import { HeaderConfigService } from '../../services/header-config/header-config.service';
import { filterNavigationItemsByAccess } from '../utils/navigation-access.utils';
import * as fromAppStore from '../../store';

interface NavigationAccessGuardData {
  accessDeniedRedirectUrl: string;
  requiredNavigationHref: string;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationAccessGuard {
  constructor(
    private readonly router: Router,
    private readonly store: Store<fromAppStore.State>,
    private readonly headerConfigService: HeaderConfigService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const { accessDeniedRedirectUrl, requiredNavigationHref } = route.data as NavigationAccessGuardData;

    return this.store.pipe(
      select(fromAppStore.getUserDetails),
      filter((userDetails: UserDetails) => !!userDetails?.userInfo),
      switchMap((userDetails) => {
        const userRoles = userDetails.userInfo.roles ?? [];
        return this.headerConfigService.constructHeaderConfig(userRoles).pipe(
          map((headerItems) => filterNavigationItemsByAccess(headerItems, userRoles, AppConstants.MENU_FLAGS)),
          map((headerItems) => headerItems.some((item) => item.href === requiredNavigationHref))
        );
      }),
      tap((allowed) => {
        if (!allowed) {
          this.router.navigateByUrl(accessDeniedRedirectUrl);
        }
      }),
      take(1)
    );
  }
}
