import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { WAVerificationService } from '../../../work-allocation/services';
import { AppConstants } from '../../app.constants';
import { UserDetails } from '../../models';
import { HeaderConfigService } from '../../services/header-config/header-config.service';
import * as fromAppStore from '../../store';
import { filterNavigationItemsByAccess } from '../utils/navigation-access.utils';

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
    private readonly headerConfigService: HeaderConfigService,
    private readonly waVerificationService: WAVerificationService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const { accessDeniedRedirectUrl, requiredNavigationHref } = route.data as NavigationAccessGuardData;

    return this.store.pipe(
      select(fromAppStore.getUserDetails),
      filter((userDetails: UserDetails) => !!userDetails?.userInfo),
      switchMap((userDetails) => {
        const userRoles = userDetails.userInfo.roles ?? [];
        return combineLatest([
          this.headerConfigService.constructHeaderConfig(userRoles),
          this.waVerificationService.getWAVerification(),
        ]).pipe(
          map(([headerItems, waVerification]) =>
            filterNavigationItemsByAccess(headerItems, userRoles, AppConstants.MENU_FLAGS, {
              userDetails,
              waVerification,
            })
          ),
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
