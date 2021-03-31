import { Injectable } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable, of } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';

@Injectable({ providedIn: 'root' })
export class WorkAllocationFeatureService {
    constructor(private readonly featureToggleService: FeatureToggleService) {
    }

    public getFeatureName(): Observable<string> {
        return this.featureToggleService.getValue<string>(AppConstants.FEATURE_NAMES.currentWAFeature, 'WorkAllocationRelease1');
    }
}
