import { CookieService } from 'ngx-cookie';
import { of } from 'rxjs';
import { TermsConditionsService } from '../services/terms-and-conditions/terms-and-conditions.service';
import { AcceptTermsGuard } from './acceptTerms.guard';

describe('Accept terms guard', () => {
    let guard: AcceptTermsGuard;
    let mockStore: any;
    let mockCookie: jasmine.SpyObj<CookieService>;
    let mockTermsService: jasmine.SpyObj<TermsConditionsService>;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        mockCookie = jasmine.createSpyObj<CookieService>('mockCookie', ['get']);
        mockTermsService = jasmine.createSpyObj<TermsConditionsService>('mockTermsService', ['getTermsConditions', 'isTermsConditionsFeatureEnabled']);
        guard = new AcceptTermsGuard(mockStore, mockCookie, mockTermsService);
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });

    it('returns true for non pui users', (done: any) => {
        mockTermsService.isTermsConditionsFeatureEnabled.and.returnValue(of(true));
        mockCookie.get.and.returnValue('zui-case-manager');
        guard.canActivate().subscribe(access => {
            expect(access).toBeTruthy();
            done();
        });
    });

    xit('loads when not yet loaded', () => {
        mockCookie.get.and.callFake((key) => {
            if (key === 'roles') { return 'pui-case-manager'; }
            if (key === '__userid__') { return 'userId'; }
        });
        guard.canActivate().subscribe();
        expect(mockStore.dispatch).toHaveBeenCalled();
    });
});
