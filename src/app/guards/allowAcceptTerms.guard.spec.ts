import { AllowAcceptTermsGuard } from './allowAcceptTerms.guard';

describe('Allow Accept Terms guard', () => {
    let guard: AllowAcceptTermsGuard;
    let mockStore: any;
    let mockService: any;
    let mockGuardUtil: any;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        mockService = jasmine.createSpyObj('mockService', ['get']);
        mockGuardUtil = jasmine.createSpyObj('guardUtil', ['checkStore', 'handleTC']);
        guard = new AllowAcceptTermsGuard(mockStore, mockService, mockGuardUtil);
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });
});
