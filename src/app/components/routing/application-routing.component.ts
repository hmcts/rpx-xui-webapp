import { Component, OnInit } from '@angular/core';
import { FeatureToggleService, RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConstants } from '../../../app/app.constants';
import { AppUtils } from '../../../app/app-utils';
import { WorkAllocationFeatureService } from '../../../work-allocation/services';
import * as fromActions from '../../store';


@Component({ templateUrl: './application-routing.component.html'})
export class ApplicationRoutingComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly workAllocationFeatureService: WorkAllocationFeatureService,
    private readonly store: Store<fromActions.State>,
    private readonly featureToggleService: FeatureToggleService
  ) {}
  public static defaultWAPage = '/work/my-work/list';
  public static defaultPage = '/cases';
  public static bookingUrl: string = '../booking';
  public ngOnInit(): void {
    this.workAllocationFeatureService.getActiveWAFeature().subscribe((currentWAFeatureName) =>
        this.navigateUrlBasedOnFeatureToggle(currentWAFeatureName)
      );
  }

  public navigateUrlBasedOnFeatureToggle(currentWAFeatureName: string): void {
    currentWAFeatureName === 'WorkAllocationRelease2'
      ? this.navigateBasedOnUserRole()
      : this.router.navigate([ApplicationRoutingComponent.defaultPage]);
  }

  public navigateBasedOnUserRole() {
    const userDetails$ = this.store.pipe(select(fromActions.getUserDetails));
    const bookingFeatureToggle$: Observable<boolean> = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.booking, false);
    const userAccess$ = combineLatest([userDetails$, bookingFeatureToggle$]);

    userAccess$.pipe(map(([userDetails, bookingFeatureToggle]) => {
      const { roleAssignmentInfo, userInfo } = userDetails;
      const isBookableAndJudicialRole = userInfo.roleCategory === RoleCategory.JUDICIAL && roleAssignmentInfo.some( roleAssignment => 'bookable' in roleAssignment && roleAssignment.bookable === true );
      if (bookingFeatureToggle && isBookableAndJudicialRole) {
        return this.router.navigate([ApplicationRoutingComponent.bookingUrl]);
      }
      if (bookingFeatureToggle && AppUtils.isBookableAndJudicialRole(userDetails)) {
        return this.router.navigate([ApplicationRoutingComponent.bookingUrl]);
      }
      userDetails && userDetails.userInfo && userDetails.userInfo.roles &&
      (userDetails.userInfo.roles.includes('caseworker-ia-iacjudge')
      || userDetails.userInfo.roles.includes('caseworker-ia-caseofficer')
      || userDetails.userInfo.roles.includes('caseworker-ia-admofficer')
      || userDetails.userInfo.roles.includes('caseworker-civil'))
      ? this.router.navigate([ApplicationRoutingComponent.defaultWAPage]) : this.router.navigate([ApplicationRoutingComponent.defaultPage]);
    })).subscribe();

  }

}
