import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUtils } from '../../../app/app-utils';
import { AppConstants } from '../../../app/app.constants';
import { WALandingPageRoles } from '../../../work-allocation/models/common/service-config.model';
import { WASupportedJurisdictionsService } from '../../../work-allocation/services';
import { WASupportedRoleDetailsService } from '../../../work-allocation/services';
import * as fromActions from '../../store';
import { WAVerificationModel } from '../../models/wa-verification-model';
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
    private readonly wasupportedJurisdictionsService: WASupportedJurisdictionsService,
    private readonly wasupportedRoleDetailsService: WASupportedRoleDetailsService,
    private readonly loggerService: LoggerService
  ) {}

  public static defaultWAPage = '/work/my-work/list';
  public static defaultPage = '/cases';
  public static bookingUrl: string = '../booking';
  public static testOnlyLandingRole = 'hmcts-legal-operations';
  public waLandingPageRoles$: Observable<WALandingPageRoles>;
  public ngOnInit(): void {
    // EUI-6768 - release 1 blocks on this removed to progress onto release 2/3
    this.navigateBasedOnUserRole();
  }

  public navigateBasedOnUserRole() {
    const userDetails$ = this.store.pipe(select(fromActions.getUserDetails));
    const waLandingPageRoles$ = this.featureToggleService.getValueOnce(AppConstants.FEATURE_NAMES.waLandingPageRoles, null);
    const waSupportedCategories$ = this.wasupportedRoleDetailsService.getWASupportedRoleCategories();
    const waSupportedRoleTypes$ = this.wasupportedRoleDetailsService.getWASupportedRoleTypes();
    const waSupportedJurisdictions$ = this.wasupportedJurisdictionsService.getWASupportedJurisdictions();
    const userAccess$ = combineLatest([
      userDetails$,
      waLandingPageRoles$,
      waSupportedCategories$,
      waSupportedRoleTypes$,
      waSupportedJurisdictions$,
    ]);
    userAccess$
      .pipe(
        map(([userDetails, landingRoles, waSupportedCategories, waSupportedRoleTypes, waSupportedJurisdictions]) => {
          if (this.router.url !== '/') {
            return;
          }
          if (AppUtils.isBookableAndJudicialRole(userDetails)) {
            return this.router.navigate([ApplicationRoutingComponent.bookingUrl]);
          }
          if (!userDetails?.userInfo?.roles?.includes('pui-case-manager')) {
            let rolePresent = false;
            const waVerification: WAVerificationModel = {
              waSupportedCategories,
              waSupportedRoleTypes,
              waSupportedJurisdictions,
            };

            const landingRolesForRouting = Array.from(
              new Set([ApplicationRoutingComponent.testOnlyLandingRole, ...(landingRoles?.roles || [])])
            );

            for (let i = 0, len = landingRolesForRouting.length; i < len; i++) {
              const landingRole = landingRolesForRouting[i];
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
