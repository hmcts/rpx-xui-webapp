import { AcceptTermsGuard } from './acceptTerms.guard';

describe('Accept terms guard', () => {
    let guard: AcceptTermsGuard;
    let mockStore: any;
    let mockGuardUtil: any;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        mockGuardUtil = jasmine.createSpyObj('guardUtil', ['checkStore', 'handleTC']);
        guard = new AcceptTermsGuard(mockStore, mockGuardUtil);
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });
});
