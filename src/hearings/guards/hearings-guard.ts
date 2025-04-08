import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromAppStore from '../../app/store';
import { Utils } from '../../cases/utils/utils';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';
import { CaseNotifier } from '@hmcts/ccd-case-ui-toolkit';

@Injectable()
export class HearingsGuard {
  public static DEFAULT_URL: string = '/cases';
  public userRoles$: Observable<string[]>;
  private caseType: string;
  private jurisdiction: string;

  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly caseNotifier: CaseNotifier,
              protected readonly hearingJurisdictionConfigService: HearingJurisdictionConfigService
  ){
    this.userRoles$ = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
      map((userDetails) => userDetails.userInfo.roles)
    );
    this.caseNotifier.caseView.pipe().subscribe((caseDetails) => {
      this.caseType = caseDetails.case_type.id;
      this.jurisdiction = caseDetails.case_type.jurisdiction.id;
    });
  }

  public hasMatchedPermissions(): Observable<boolean> {
    return this.hearingJurisdictionConfigService.getHearingJurisdictionsConfig().pipe(
      map((jurisdictionsConfig) => {
        if (!this.jurisdiction || !this.caseType) {
          return false;
        }
        return jurisdictionsConfig.some((featureVariation) => Utils.hasMatchedJurisdictionAndCaseType(featureVariation, this.jurisdiction, this.caseType));
      })
    );
  }
}
