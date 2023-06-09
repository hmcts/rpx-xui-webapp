import { Injectable } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../app/app.constants';
import { FieldConfig } from '../models/common';

@Injectable({ providedIn: 'root' })
export class CheckReleaseVersionService {
  public subject = new Subject<FieldConfig[]>();

  constructor(private featureToggleService: FeatureToggleService) {}

  public isRelease4(): Observable<boolean> {
    return this.featureToggleService.getValue(AppConstants.FEATURE_NAMES.waServiceConfig, null).pipe(map((features) => {
      return features.configurations.findIndex((serviceConfig) => parseFloat(serviceConfig.releaseVersion) === 4) > -1;
    }));
  }
}
