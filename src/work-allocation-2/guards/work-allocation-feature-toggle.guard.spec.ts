import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { WorkAllocationFeatureToggleGuard } from './work-allocation-feature-toggle.guard';

describe('WorkAllocationFeatureToggleGuard', () => {
    let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;
    let guard: WorkAllocationFeatureToggleGuard;
    let routerMock: jasmine.SpyObj<Router>;
    beforeEach(() => {
        featureToggleMock = jasmine.createSpyObj<FeatureToggleService>('FeatureToggleService', ['isEnabled', 'getValueOnce']);
        routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
        guard = new WorkAllocationFeatureToggleGuard(featureToggleMock, routerMock);
    });

    it('canActivate to be true', () => {
        featureToggleMock.getValueOnce.and.returnValue(of(true));
        const canActivate = guard.canActivate();
        canActivate.subscribe(activate => expect(activate).toBeTruthy());
    });

    it('canActivate to be false', () => {
        featureToggleMock.getValueOnce.and.returnValue(of(false));
        const canActivate = guard.canActivate();
        canActivate.subscribe(activate => expect(activate).toBeFalsy());
    });

    it('navigateUrl false', () => {
        WorkAllocationFeatureToggleGuard.navigateUrl(true, routerMock, 'someURL');
        expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('navigateUrl true', () => {
        WorkAllocationFeatureToggleGuard.navigateUrl(false, routerMock, 'someURL');
        expect(routerMock.navigate).toHaveBeenCalledWith(['someURL']);
    });
});
