import { AcceptTermsGuard } from './acceptTerms.guard';

describe('Accept terms guard', () => {
    let guard: AcceptTermsGuard;
    let mockStore: any;
    let mockService: any;
    let mockGuardUtil: any;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        mockService = jasmine.createSpyObj('mockService', ['get']);
        mockGuardUtil = jasmine.createSpyObj('guardUtil', ['checkStore', 'handleTC']);
        guard = new AcceptTermsGuard(mockStore, mockService, mockGuardUtil);
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });
});
