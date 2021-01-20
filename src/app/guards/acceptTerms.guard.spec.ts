import { of } from 'rxjs';
import { TermsConditionsService } from '../services/terms-and-conditions/terms-and-conditions.service';
import { AcceptTermsGuard } from './acceptTerms.guard';

describe('Accept terms guard', () => {
    let guard: AcceptTermsGuard;
    let mockStore: any;
    // let mockCookie: jasmine.SpyObj<CookieService>;

    beforeEach(() => {
        mockStore = jasmine.createSpyObj('mockStore', ['unsubscribe', 'dispatch', 'pipe']);
        // mockCookie = jasmine.createSpyObj<CookieService>('mockCookie', ['get']);
        guard = new AcceptTermsGuard(mockStore);
        mockStore.pipe.and.returnValue(of(true));
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });

    xit('returns true for non pui users', (done: any) => {
        guard.canActivate().subscribe(access => {
            expect(access).toBeTruthy();
            done();
        });
    });

    xit('loads when not yet loaded', () => {
        // mockCookie.get.and.callFake((key) => {
        //     if (key === 'roles') { return 'pui-case-manager'; }
        //     if (key === '__userid__') { return 'userId'; }
        // });
        guard.canActivate().subscribe();
        expect(mockStore.dispatch).toHaveBeenCalled();
    });
});
