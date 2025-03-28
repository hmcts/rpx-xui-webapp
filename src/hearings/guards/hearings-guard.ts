import { Injectable } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppConstants } from '../../app/app.constants';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { Utils } from '../../cases/utils/utils';
import { CaseNotifier } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class HearingsGuard {
  public static DEFAULT_URL: string = '/cases';
  public userRoles$: Observable<string[]>;
  protected featureName: string;
  private caseType: string;
  private jurisdiction: string;

  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly caseNotifier: CaseNotifier,
              protected readonly featureToggleService: FeatureToggleService) {
    this.userRoles$ = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
      map((userDetails) => userDetails.userInfo.roles)
    );
    this.featureName = AppConstants.FEATURE_NAMES.mcHearingsFeature;
    this.caseNotifier.caseView.pipe().subscribe((caseDetails) => {
      this.caseType = caseDetails.case_type.id;
      this.jurisdiction = caseDetails.case_type.jurisdiction.id;
    });
  }

  public hasMatchedPermissions(): Observable<boolean> {
    return this.featureToggleService.getValueOnce<FeatureVariation[]>(this.featureName, []).pipe(
      map((featureVariations: FeatureVariation[]) => {
        return featureVariations.some((featureVariation) =>
          Utils.hasMatchedJurisdictionAndCaseType(featureVariation, this.jurisdiction, this.caseType));
      })
    );
  }
}
