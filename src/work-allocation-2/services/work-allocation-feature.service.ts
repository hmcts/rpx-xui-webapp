import { Injectable } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { AppConstants } from '../../app/app.constants';

@Injectable({ providedIn: 'root' })
export class WorkAllocationFeatureService {
    constructor(private readonly featureToggleService: FeatureToggleService) {
    }

    public getActiveWAFeature(): Observable<string> {
         return this.featureToggleService.getValue<string>(AppConstants.FEATURE_NAMES.currentWAFeature, 'WorkAllocationRelease1');
    }
}
