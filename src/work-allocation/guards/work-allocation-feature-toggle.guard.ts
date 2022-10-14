import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { AppConstants } from '../../app/app.constants';
import { WAFeatureConfig } from '../models/common/service-config.model';

@Injectable()
export class WorkAllocationFeatureToggleGuard implements CanActivate {
  public static defaultUrl: string = '/cases';
  constructor(private readonly featureToggleService: FeatureToggleService,
              private readonly router: Router) {
  }

  public checkIfRelease3(waServiceConfig: WAFeatureConfig, router: Router, url: string): boolean {
    console.log('guard works');
    return true;
    if (true) {
      router.navigate([url]);
    }
    return false;
  }

  // TODO? - May need to work out how to add in service and caseType params if we need this
  public canActivate(): Observable<boolean> {
    return of(true);
    console.log('9 to 5');
    return this.featureToggleService.getValueOnce<WAFeatureConfig>(AppConstants.FEATURE_NAMES.waServiceConfig, null).pipe(map(waServiceConfig => {
      console.log('working');
      return this.checkIfRelease3(waServiceConfig, this.router, WorkAllocationFeatureToggleGuard.defaultUrl);
    }));
  }
}
