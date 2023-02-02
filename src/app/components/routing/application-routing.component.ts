import { AppConstants } from '../../../app/app.constants';
import { AppUtils } from '../../../app/app-utils';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { WALandingPageRoles } from '../../../work-allocation/models/common/service-config.model';
import * as fromActions from '../../store';

@Component({ templateUrl: './application-routing.component.html' })
export class ApplicationRoutingComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly store: Store<fromActions.State>,
    private readonly featureToggleService: FeatureToggleService
  ) { }
  public static defaultWAPage = '/work/my-work/list';
  public static defaultPage = '/cases';
  public static bookingUrl: string = '../booking';
  public waLandingPageRoles$: Observable<WALandingPageRoles>;
  public ngOnInit(): void {
    // EUI-6768 - release 1 blocks on this removed to progress onto release 2/3
    this.navigateBasedOnUserRole();
  }

  public navigateBasedOnUserRole() {
    const userDetails$ = this.store.pipe(select(fromActions.getUserDetails));
    const bookingFeatureToggle$: Observable<boolean> = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.booking, false);
    const waLandingPageRoles$ = this.featureToggleService.getValue(AppConstants.FEATURE_NAMES.waLandingPageRoles, null)
    const userAccess$ = combineLatest([userDetails$, bookingFeatureToggle$, waLandingPageRoles$]);
    userAccess$.pipe(map(([userDetails, bookingFeatureToggle, landingRoles]) => {
      if (this.router.url !== '/') {
        return;
      }
      if (bookingFeatureToggle && AppUtils.isBookableAndJudicialRole(userDetails)) {
        return this.router.navigate([ApplicationRoutingComponent.bookingUrl]);
      }
      if (userDetails && userDetails.userInfo && userDetails.userInfo.roles
        && !userDetails.userInfo.roles.includes('pui-case-manager')) {
          const userRoles = userDetails.userInfo.roles;
          let rolePresent = false;
          for (let i = 0, len = landingRoles.roles.length; i < len; i++) {
            if (userRoles.includes(landingRoles.roles[i])) {
              rolePresent = true;
              break;
            }
          }
          rolePresent ? this.router.navigate([ApplicationRoutingComponent.defaultWAPage]) : this.router.navigate([ApplicationRoutingComponent.defaultPage]);
      } else {
        this.router.navigate([ApplicationRoutingComponent.defaultPage]);
      }
    })).subscribe();

  }

}
