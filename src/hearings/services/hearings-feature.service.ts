import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { FeatureVariation } from '../../cases/models/feature-variation.model';
import { Utils } from '../../cases/utils/utils';
import { HearingJuristictionConfigService } from 'src/app/services/hearing-juristiction-config/hearing-juristiction-config.service';

@Injectable()
export class HearingsFeatureService {
  public static CASE_INFO: string = 'caseInfo';
  public static JURISDICTION: string = 'jurisdiction';
  public static CASE_TYPE: string = 'caseType';

  constructor(protected readonly sessionStorageService: SessionStorageService,
    protected readonly featureToggleService: FeatureToggleService,
    private readonly hearingJuristictionConfigService: HearingJuristictionConfigService) {}

  public isFeatureEnabled(featureName: string): Observable<boolean> {
    let jurisdiction: string;
    let caseType: string;

    return this.featureToggleService.getValueOnce<FeatureVariation[]>(featureName, []).pipe(
      map((featureVariations: FeatureVariation[]) => {
        const caseInfo = JSON.parse(this.sessionStorageService.getItem(HearingsFeatureService.CASE_INFO));
        if (caseInfo?.hasOwnProperty(HearingsFeatureService.JURISDICTION)) {
          jurisdiction = caseInfo[HearingsFeatureService.JURISDICTION];
        }
        if (caseInfo?.hasOwnProperty(HearingsFeatureService.CASE_TYPE)) {
          caseType = caseInfo[HearingsFeatureService.CASE_TYPE];
        }
        if (!jurisdiction || !caseType) {
          return false;
        }
        return featureVariations.some((featureVariation) => Utils.hasMatchedJurisdictionAndCaseType(featureVariation, jurisdiction, caseType));
      })
    );
  }

  public hearingAmmendmentsEnabled(): Observable<boolean> {
    let jurisdiction: string;
    let caseType: string;
    return this.hearingJuristictionConfigService.getHearingAmmendmentConfig().pipe(
      map((featureVariations: FeatureVariation[]) => {
        const caseInfo = JSON.parse(this.sessionStorageService.getItem(HearingsFeatureService.CASE_INFO));
        if (caseInfo?.hasOwnProperty(HearingsFeatureService.JURISDICTION)) {
          jurisdiction = caseInfo[HearingsFeatureService.JURISDICTION];
        }
        if (caseInfo?.hasOwnProperty(HearingsFeatureService.CASE_TYPE)) {
          caseType = caseInfo[HearingsFeatureService.CASE_TYPE];
        }
        if (!jurisdiction || !caseType) {
          return false;
        }
        console.log(featureVariations);
        console.log(featureVariations.some((featureVariation) => Utils.hasMatchedJurisdictionAndCaseType(featureVariation, jurisdiction, caseType)));
        return featureVariations.some((featureVariation) => Utils.hasMatchedJurisdictionAndCaseType(featureVariation, jurisdiction, caseType));
      })
    );
  }
}
