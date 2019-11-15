import { GuardUtil } from './guardUtil';

describe('Guard Util guard', () => {
    let guardUtil: GuardUtil;
    let mockService: any;

    beforeEach(() => {
        mockService = jasmine.createSpyObj('mockService', ['get']);
        guardUtil = new GuardUtil(mockService);
    });

    it('checkStore', () => {
        const mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        guardUtil.checkStore(mockStore, 'cases', 'true');
        expect(mockStore.pipe).toHaveBeenCalled();
    });

    it('handleTC url when not loaded', () => {
        const mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        const tc = { isLoaded: false, hasUserAcceptedTC: 'true' };
        guardUtil.handleTC(tc, 'cookieName', 'accept-tc-path', mockService, mockStore, 'true');
        expect(mockService.get).toHaveBeenCalledWith('cookieName');
        expect(mockStore.dispatch).toHaveBeenCalled();
    });

    it('handleTC url when loaded', () => {
        const mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        const tc = { isLoaded: true, hasUserAcceptedTC: 'false' };
        guardUtil.handleTC(tc, 'cookieName', 'accept-tc-path', mockService, mockStore, 'false');
        expect(mockStore.dispatch).toHaveBeenCalled();
    });
});
