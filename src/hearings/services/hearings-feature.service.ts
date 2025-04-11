import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { Utils } from '../../cases/utils/utils';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';
import * as fromAppStore from '../../app/store';
import { Store } from '@ngrx/store';
import * as fromHearingReducers from '../store/reducers';

@Injectable()
export class HearingsFeatureService {
  public static JURISDICTION: string = 'jurisdictionId';
  public static CASE_TYPE: string = 'caseType';

  constructor(protected readonly hearingStore: Store<fromAppStore.State>,
    protected readonly featureToggleService: FeatureToggleService,
    private readonly hearingJurisdictionConfigService: HearingJurisdictionConfigService) {}

  public isFeatureEnabled(featureName: string): Observable<boolean> {
    return this.featureToggleService.getValueOnce<FeatureVariation[]>(featureName, []).pipe(
      switchMap((featureVariations: FeatureVariation[]) =>
        this.hearingStore.select(fromHearingReducers.caseInfoSelector).pipe(
          map((caseInfo) => {
            let jurisdiction: string;
            let caseType: string;

            if (caseInfo?.hasOwnProperty(HearingsFeatureService.JURISDICTION)) {
              jurisdiction = caseInfo[HearingsFeatureService.JURISDICTION];
            }
            if (caseInfo?.hasOwnProperty(HearingsFeatureService.CASE_TYPE)) {
              caseType = caseInfo[HearingsFeatureService.CASE_TYPE];
            }
            if (!jurisdiction || !caseType) {
              return false;
            }
            return featureVariations.some((featureVariation) =>
              Utils.hasMatchedJurisdictionAndCaseType(featureVariation, jurisdiction, caseType)
            );
          })
        )
      )
    );
  }

  public hearingAmendmentsEnabled(): Observable<boolean> {
    return this.hearingJurisdictionConfigService.getHearingAmendmentConfig().pipe(
      switchMap((featureVariations: FeatureVariation[]) => {
        return this.hearingStore.select(fromHearingReducers.caseInfoSelector).pipe(
          map((caseInfo) => {
            let jurisdiction: string;
            let caseType: string;

            if (caseInfo?.hasOwnProperty(HearingsFeatureService.JURISDICTION)) {
              jurisdiction = caseInfo[HearingsFeatureService.JURISDICTION];
            }
            if (caseInfo?.hasOwnProperty(HearingsFeatureService.CASE_TYPE)) {
              caseType = caseInfo[HearingsFeatureService.CASE_TYPE];
            }
            if (!jurisdiction || !caseType) {
              return false;
            }
            return featureVariations.some((featureVariation) => Utils.hasMatchedJurisdictionAndCaseType(featureVariation, jurisdiction, caseType)
            );
          })
        );
      })
    );
  }
}
