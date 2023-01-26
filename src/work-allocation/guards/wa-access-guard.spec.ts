import { Router } from '@angular/router';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { WorkAllocationAccessGuard } from './wa-access-guard';

describe('WorkAllocationAccessGuard', () => {
    let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;
    let guard: WorkAllocationAccessGuard;
    let routerMock: jasmine.SpyObj<Router>;
    beforeEach(async () => {
        featureToggleMock = jasmine.createSpyObj<FeatureToggleService>('FeatureToggleService', ['isEnabled', 'getValueOnce']);
        routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
        guard = new WorkAllocationAccessGuard(featureToggleMock, routerMock);
    });

    it('can activate with feature toggle on', () => {
        featureToggleMock.getValueOnce.and.returnValue(of(true));
        const canActivate = guard.canActivate();
        canActivate.subscribe(activate => expect(activate).toBeTruthy());
    });

    it('cannot activate with feature toggle off', () => {
        featureToggleMock.getValueOnce.and.returnValue(of(false));
        const canActivate = guard.canActivate();
        canActivate.subscribe(activate => expect(activate).toBeFalsy());
    });

    it('navigateUrl false', () => {
        WorkAllocationAccessGuard.navigateUrl(true, routerMock, 'someURL');
        expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('navigateUrl true', () => {
        WorkAllocationAccessGuard.navigateUrl(false, routerMock, 'someURL');
        expect(routerMock.navigate).toHaveBeenCalledWith(['someURL']);
    });
});
