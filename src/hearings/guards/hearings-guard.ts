import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { Utils } from '../../cases/utils/utils';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';

@Injectable()
export class HearingsGuard {
  public static CASE_INFO: string = 'caseInfo';
  public static JURISDICTION: string = 'jurisdiction';
  public static CASE_TYPE: string = 'caseType';
  public static DEFAULT_URL: string = '/cases';
  public userRoles$: Observable<string[]>;

  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly sessionStorageService: SessionStorageService,
              protected readonly hearingJurisdictionConfigService: HearingJurisdictionConfigService
  ){
    this.userRoles$ = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
      map((userDetails) => userDetails.userInfo.roles)
    );
  }

  public hasMatchedPermissions(): Observable<boolean> {
    let jurisdiction: string;
    let caseType: string;
    return this.hearingJurisdictionConfigService.getHearingJurisdictionsConfig().pipe(
      map((jurisdictionsConfig) => {
        const caseInfo = JSON.parse(this.sessionStorageService.getItem(HearingsGuard.CASE_INFO));
        if (caseInfo?.hasOwnProperty(HearingsGuard.JURISDICTION)) {
          jurisdiction = caseInfo[HearingsGuard.JURISDICTION];
        }
        if (caseInfo?.hasOwnProperty(HearingsGuard.CASE_TYPE)) {
          caseType = caseInfo[HearingsGuard.CASE_TYPE];
        }
        if (!jurisdiction || !caseType) {
          return false;
        }
        return jurisdictionsConfig.some((featureVariation) => Utils.hasMatchedJurisdictionAndCaseType(featureVariation, jurisdiction, caseType));
      })
    );
  }
}
