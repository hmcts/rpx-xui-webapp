import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { tap } from 'rxjs/operators';

import { AppConstants } from '../../app/app.constants';

@Injectable()
export class WorkAllocationFeatureToggleGuard implements CanActivate {
    public static defaultUrl: string = '/cases';
    constructor(private readonly featureToggleService: FeatureToggleService,
                private readonly router: Router) {
                }

    public static navigateUrl(isfeatureEnabled: boolean, router: Router, url: string) {
        if (!isfeatureEnabled) {
            router.navigate([url]);
        }
    }

    public canActivate() {
        return this.featureToggleService.getValueOnce<boolean>(AppConstants.FEATURE_NAMES.workAllocation, false).pipe(tap(isfeatureEnabled => {
            WorkAllocationFeatureToggleGuard.navigateUrl(isfeatureEnabled, this.router, WorkAllocationFeatureToggleGuard.defaultUrl);
        }));
    }
}
