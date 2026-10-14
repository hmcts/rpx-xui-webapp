import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUtils } from '../../../app/app-utils';
import { AppConstants } from '../../../app/app.constants';
import { WALandingPageRoles } from '../../../work-allocation/models/common/service-config.model';
import { WAVerificationService } from '../../../work-allocation/services';
import * as fromActions from '../../store';
import { LoggerService } from '../../services/logger/logger.service';

@Component({
  standalone: false,
  templateUrl: './application-routing.component.html',
})
export class ApplicationRoutingComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly store: Store<fromActions.State>,
    private readonly featureToggleService: FeatureToggleService,
    private readonly waVerificationService: WAVerificationService,
    private readonly loggerService: LoggerService
  ) {}

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
    const waLandingPageRoles$ = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.waLandingPageRoles, null);
    const waVerification$ = this.waVerificationService.getWAVerification();
    const userAccess$ = combineLatest([userDetails$, waLandingPageRoles$, waVerification$]);
    userAccess$
      .pipe(
        map(([userDetails, landingRoles, waVerification]) => {
          if (this.router.url !== '/') {
            return;
          }
          if (AppUtils.isBookableAndJudicialRole(userDetails)) {
            return this.router.navigate([ApplicationRoutingComponent.bookingUrl]);
          }
          if (!userDetails?.userInfo?.roles?.includes('pui-case-manager')) {
            let rolePresent = false;

            for (let i = 0, len = landingRoles?.roles?.length || 0; i < len; i++) {
              const landingRole = landingRoles.roles[i];
              if (AppUtils.checkRoleIsSupported(waVerification, landingRole, userDetails)) {
                this.loggerService.log(`ApplicationRoutingComponent: matched landing role ${landingRole}`);
                rolePresent = true;
                break;
              }
            }
            this.router.navigate([
              rolePresent ? ApplicationRoutingComponent.defaultWAPage : ApplicationRoutingComponent.defaultPage,
            ]);
          } else {
            this.router.navigate([ApplicationRoutingComponent.defaultPage]);
          }
        })
      )
      .subscribe();
  }
}
