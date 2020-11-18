import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';
import { WorkAllocationFeatureToggleGuard } from './work-allocation-feature-toggle.guard';

describe('WorkAllocationFeatureToggleGuard', () => {
    let featureToggleMock: jasmine.SpyObj<FeatureToggleService>;
    let guard: WorkAllocationFeatureToggleGuard;
    beforeEach(() => {
        featureToggleMock = jasmine.createSpyObj<FeatureToggleService>('FeatureToggleService', ['isEnabled']);
        guard = new WorkAllocationFeatureToggleGuard(featureToggleMock);
    });

    it('canActivate to be true', () => {
        featureToggleMock.isEnabled.and.returnValue(of(true));
        const canActivate = guard.canActivate();
        canActivate.subscribe(activate => expect(activate).toBeTruthy());
    });

    it('canActivate to be false', () => {
        featureToggleMock.isEnabled.and.returnValue(of(false));
        const canActivate = guard.canActivate();
        canActivate.subscribe(activate => expect(activate).toBeFalsy());
    });
});
