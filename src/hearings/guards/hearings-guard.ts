import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {FeatureToggleService} from '@hmcts/rpx-xui-common-lib';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../app/app.constants';
import {UserDetails} from '../../app/models';
import {SessionStorageService} from '../../app/services';
import * as fromAppStore from '../../app/store';
import {FeatureVariation} from '../../cases/models/feature-variation.model';
import {Utils} from '../../cases/utils/utils';

@Injectable()
export class HearingsGuard implements CanActivate {
  public static CASE_INFO: string = 'caseInfo';
  public static JURISDICTION: string = 'jurisdiction';
  public static DEFAULT_URL: string = '/cases';

  constructor(private readonly router: Router,
              private readonly appStore: Store<fromAppStore.State>,
              private readonly sessionStorageService: SessionStorageService,
              private readonly featureToggleService: FeatureToggleService) {
  }

  public canActivate(): Observable<boolean> {
    return combineLatest([
      this.featureToggleService.getValueOnce<FeatureVariation[]>(AppConstants.FEATURE_NAMES.mcHearingsFeature, []),
      this.appStore.pipe(select(fromAppStore.getUserDetails))
    ]).pipe(
      // @ts-ignore
      map(([featureVariations, userDetails]: [FeatureVariation[], UserDetails]) => {
        const caseInfo = JSON.parse(this.sessionStorageService.getItem(HearingsGuard.CASE_INFO));
        const jurisdiction = caseInfo && caseInfo.hasOwnProperty(HearingsGuard.JURISDICTION) ? caseInfo[HearingsGuard.JURISDICTION] : '';
        return featureVariations.some(featureVariation =>
          Utils.hasMatchedJurisdictionAndRole(featureVariation, jurisdiction, userDetails));
      })
    ).pipe(tap(hasMatchedJurisdictionAndRole => {
      if (!hasMatchedJurisdictionAndRole) {
        this.router.navigate([HearingsGuard.DEFAULT_URL]);
      }
    }));
  }
}
