import { Injectable } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../app/app.constants';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { Utils } from '../../cases/utils/utils';

@Injectable()
export class HearingsGuard {
  public static CASE_INFO: string = 'caseInfo';
  public static JURISDICTION: string = 'jurisdiction';
  public static CASE_TYPE: string = 'caseType';
  public static DEFAULT_URL: string = '/cases';
  public userRoles$: Observable<string[]>;

  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly sessionStorageService: SessionStorageService,
              protected readonly featureToggleService: FeatureToggleService) {
    this.userRoles$ = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
      map((userDetails) => userDetails.userInfo.roles)
    );
  }

  public hasMatchedPermissions(): Observable<boolean> {
    return combineLatest([
      this.featureToggleService.getValueOnce<FeatureVariation[]>(AppConstants.FEATURE_NAMES.mcHearingsFeature, []),
      this.userRoles$
    ]).pipe(
      map(([featureVariations, userRoles]: [FeatureVariation[], string[]]) => {
        const caseInfo = JSON.parse(this.sessionStorageService.getItem(HearingsGuard.CASE_INFO));
        const jurisdiction = caseInfo && caseInfo.hasOwnProperty(HearingsGuard.JURISDICTION) ? caseInfo[HearingsGuard.JURISDICTION] : '';
        const caseType = caseInfo && caseInfo.hasOwnProperty(HearingsGuard.CASE_TYPE) ? caseInfo[HearingsGuard.CASE_TYPE] : '';
        return featureVariations.some((featureVariation) =>
          Utils.hasMatchedPermissions(featureVariation, jurisdiction, caseType, userRoles));
      })
    );
  }
}
