import { AcceptTermsGuard } from './acceptTerms.guard';

describe('Accept Tc Wrapper Component', () => {
    let guard: AcceptTermsGuard;
    let mockStore: any;
    let mockService: any;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        mockService = jasmine.createSpyObj('mockService', ['get']);
        guard = new AcceptTermsGuard(mockStore, mockService);
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });

    it('isRoleExistsForUser', () => {
        mockService.get.and.returnValue('role1,role2,role3');
        const roleExists = guard.isRoleExistsForUser('role1', mockService);
        expect(roleExists).toEqual(true);
    });

    it('checkStore', () => {
        guard.checkStore(mockStore);
        expect(mockStore.pipe).toHaveBeenCalled();
    });

    it('handleTC url when not loaded', () => {
        const tc = { isLoaded: false, hasUserAcceptedTC: 'true' };
        guard.handleTC(tc, 'cookieName', 'accept-tc-path', mockService, mockStore);
        expect(mockService.get).toHaveBeenCalledWith('cookieName');
        expect(mockStore.dispatch).toHaveBeenCalled();
    });

    it('handleTC url when loaded', () => {
        const tc = { isLoaded: true, hasUserAcceptedTC: 'false' };
        guard.handleTC(tc, 'cookieName', 'accept-tc-path', mockService, mockStore);
        expect(mockStore.dispatch).toHaveBeenCalled();
    });
});
