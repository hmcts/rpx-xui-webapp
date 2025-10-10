import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as fromAppStore from '../../app/store';
import { Utils } from '../../cases/utils/utils';
import * as fromHearingReducers from '../store/reducers';
import { HearingJurisdictionConfigService } from 'src/app/services/hearing-jurisdiction-config/hearing-jurisdiction-config.service';
import { Router } from '@angular/router';

@Injectable()
export class HearingsGuard {
  public static DEFAULT_URL: string = 'cases';
  public userRoles$: Observable<string[]>;

  constructor(protected readonly appStore: Store<fromAppStore.State>,
              protected readonly hearingJurisdictionConfigService: HearingJurisdictionConfigService,
              protected readonly hearingStore: Store<fromAppStore.State>,
              protected readonly router: Router
  ){
    this.userRoles$ = this.appStore.pipe(select(fromAppStore.getUserDetails)).pipe(
      map((userDetails) => userDetails.userInfo.roles)
    );
  }

  public hasMatchedPermissions(): Observable<boolean> {
    return this.hearingStore.select(fromHearingReducers.caseInfoSelector).pipe(
      switchMap((caseInfo) => {
        if (!caseInfo?.jurisdictionId || !caseInfo?.caseType) {
          this.router.navigate([HearingsGuard.DEFAULT_URL]);
          return of(false);
        }
        return this.hearingStore.select(fromHearingReducers.serviceHearingValueSelector).pipe(
          switchMap((hearingValueModel) => {
            if (hearingValueModel){
              return this.hearingJurisdictionConfigService.getHearingJurisdictionsConfig().pipe(
                map((jurisdictionsConfig) =>
                  jurisdictionsConfig.some((featureVariation) =>
                    Utils.hasMatchedJurisdictionAndCaseType(
                      featureVariation,
                      caseInfo.jurisdictionId,
                      caseInfo.caseType
                    )
                  )
                )
              );
            }
            this.router.navigate([`/cases/case-details/${caseInfo.jurisdictionId}/${caseInfo.caseType}/${caseInfo.caseReference}`]);
            return of(false);
          }),
          map((result) => !!result)
        );
      })
    );
  }
}
