import { AppConstants } from '../../../app/app.constants';
import { AppUtils } from '../../../app/app-utils';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
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
  public ngOnInit(): void {
    // EUI-6768 - release 1 blocks on this removed to progress onto release 2/3
    this.navigateBasedOnUserRole();
  }

  public navigateBasedOnUserRole() {
    const userDetails$ = this.store.pipe(select(fromActions.getUserDetails));
    const bookingFeatureToggle$: Observable<boolean> = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.booking, false);
    const userAccess$ = combineLatest([userDetails$, bookingFeatureToggle$]);

    userAccess$.pipe(map(([userDetails, bookingFeatureToggle]) => {
      if (this.router.url !== '/') {
        return;
      }
      if (bookingFeatureToggle && AppUtils.isBookableAndJudicialRole(userDetails)) {
        return this.router.navigate([ApplicationRoutingComponent.bookingUrl]);
      }
      userDetails && userDetails.userInfo && userDetails.userInfo.roles
        && !userDetails.userInfo.roles.includes('pui-case-manager')
        &&
        (userDetails.userInfo.roles.includes('caseworker-ia-iacjudge')
          || userDetails.userInfo.roles.includes('caseworker-ia-caseofficer')
          || userDetails.userInfo.roles.includes('caseworker-ia-admofficer'))
        ? this.router.navigate([ApplicationRoutingComponent.defaultWAPage]) : this.router.navigate([ApplicationRoutingComponent.defaultPage]);
    })).subscribe();

  }

}
