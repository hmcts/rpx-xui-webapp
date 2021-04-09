import { Injectable } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkAllocationFeatureService {
    constructor(private readonly featureToggleService: FeatureToggleService) {
    }

    public getActiveWAFeature(): Observable<string> {
        return this.featureToggleService.getValue<string>(AppConstants.FEATURE_NAMES.currentWAFeature, 'WorkAllocationRelease1');
    }
}
