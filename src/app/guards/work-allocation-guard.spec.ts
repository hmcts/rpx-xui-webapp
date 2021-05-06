import { WorkAllocationGuard } from './work-allocation-guard';
import { of } from 'rxjs';

describe('WorkAllocationGuard', () => {
    let guard: WorkAllocationGuard;
    let featureService: any;

    beforeEach(() => {
        featureService = jasmine.createSpyObj('featureService', ['getActiveWAFeature']);
        guard = new WorkAllocationGuard(featureService);
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });

    it('canActivate true', () => {
        featureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease2'))
        const result = guard.canActivate();
        result.subscribe(isActive => expect(isActive).toBeTruthy());
    });

    it('canActivate true', () => {
        featureService.getActiveWAFeature.and.returnValue(of('WorkAllocationRelease1'))
        const result = guard.canActivate();
        result.subscribe(isActive => expect(isActive).toBeFalsy());
    });
});
