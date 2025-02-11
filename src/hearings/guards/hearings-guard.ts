import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';
import * as fromAppStore from '../../app/store';
import { Utils } from '../../cases/utils/utils';
import { HearingJuristictionConfigService } from 'src/app/services/hearing-juristiction-config/hearing-juristiction-config.service';

@Injectable()
export class HearingsGuard {
  public static CASE_INFO: string = 'caseInfo';
  public static JURISDICTION: string = 'jurisdiction';
  public static CASE_TYPE: string = 'caseType';
  public static DEFAULT_URL: string = '/cases';
  public userRoles$: Observable<string[]>;

  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly sessionStorageService: SessionStorageService,
              protected readonly hearingJuristictionConfigService: HearingJuristictionConfigService
  ){
    this.userRoles$ = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
      map((userDetails) => userDetails.userInfo.roles)
    );
  }

  public hasMatchedPermissions(): Observable<boolean> {
    let jurisdiction: string;
    let caseType: string;
    return this.hearingJuristictionConfigService.getConfig().pipe(
      map((juristictionsConfig) => {
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
        return juristictionsConfig.some((featureVariation) => Utils.hasMatchedJurisdictionAndCaseType(featureVariation, jurisdiction, caseType));
      })
    );
  }
}
