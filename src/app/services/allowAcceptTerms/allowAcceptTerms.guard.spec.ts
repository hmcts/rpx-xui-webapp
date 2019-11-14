import { AllowAcceptTermsGuard } from './allowAcceptTerms.guard';

describe('Allow Accept Terms guard', () => {
    let guard: AllowAcceptTermsGuard;
    let mockStore: any;
    let mockService: any;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        mockService = jasmine.createSpyObj('mockService', ['get']);
        guard = new AllowAcceptTermsGuard(mockStore, mockService);
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
        guard.handleTC(tc, 'cookieName', 'cases', mockService, mockStore);
        expect(mockService.get).toHaveBeenCalledWith('cookieName');
        expect(mockStore.dispatch).toHaveBeenCalled();
    });

    it('handleTC url when loaded', () => {
        const tc = { isLoaded: true, hasUserAcceptedTC: 'true' };
        guard.handleTC(tc, 'cookieName', 'cases', mockService, mockStore);
        expect(mockStore.dispatch).toHaveBeenCalled();
    });
});
