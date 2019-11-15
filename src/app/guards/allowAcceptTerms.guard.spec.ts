import { AllowAcceptTermsGuard } from './allowAcceptTerms.guard';

describe('Allow Accept Terms guard', () => {
    let guard: AllowAcceptTermsGuard;
    let mockStore: any;
    let mockGuardUtil: any;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        mockGuardUtil = jasmine.createSpyObj('guardUtil', ['checkStore', 'handleTC']);
        guard = new AllowAcceptTermsGuard(mockStore, mockGuardUtil);
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });
});
