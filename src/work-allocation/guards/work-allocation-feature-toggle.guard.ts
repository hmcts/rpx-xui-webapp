import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { AppConstants } from 'src/app/app.constants';

@Injectable()
export class WorkAllocationFeatureToggleGuard implements CanActivate {
    constructor(private readonly featureToggleService: FeatureToggleService
    ) {}

    public canActivate() {
        return this.featureToggleService.isEnabled(AppConstants.FEATURE_NAMES.workAllocation);
    }
}
