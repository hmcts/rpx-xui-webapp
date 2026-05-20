import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AppConstants } from '../../app.constants';
import { UserDetails } from '../../models';
import { HeaderConfigService } from '../../services/header-config/header-config.service';
import { filterNavigationItemsByAccess } from '../utils/navigation-access.utils';
import * as fromAppStore from '../../store';
import { WASupportedJurisdictionsService, WASupportedRoleDetailsService } from '../../../work-allocation/services';

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
    private readonly waSupportedJurisdictionsService: WASupportedJurisdictionsService,
    private readonly waSupportedRoleDetailsService: WASupportedRoleDetailsService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const { accessDeniedRedirectUrl, requiredNavigationHref } = route.data as NavigationAccessGuardData;

    return this.store.pipe(
      select(fromAppStore.getUserDetails),
      filter((userDetails: UserDetails) => !!userDetails?.userInfo),
      switchMap((userDetails) => {
        console.log('in navigation access guard');
        const userRoles = userDetails.userInfo.roles ?? [];

        const waSupportedCategories$ = this.waSupportedRoleDetailsService
          .getWASupportedRoleCategories()
          .pipe(catchError(() => of([])));

        const waSupportedRoleTypes$ = this.waSupportedRoleDetailsService.getWASupportedRoleTypes().pipe(catchError(() => of([])));

        const waSupportedJurisdictions$ = this.waSupportedJurisdictionsService
          .getWASupportedJurisdictions()
          .pipe(catchError(() => of([])));

        return combineLatest([
          this.headerConfigService.constructHeaderConfig(userRoles),
          waSupportedCategories$,
          waSupportedRoleTypes$,
          waSupportedJurisdictions$,
        ]).pipe(
          map(([headerItems, waSupportedCategories, waSupportedRoleTypes, waSupportedJurisdictions]) =>
            filterNavigationItemsByAccess(headerItems, userRoles, AppConstants.MENU_FLAGS, {
              userDetails,
              waVerification: {
                waSupportedCategories,
                waSupportedRoleTypes,
                waSupportedJurisdictions,
              },
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
