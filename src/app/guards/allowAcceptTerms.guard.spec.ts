import { of } from 'rxjs';
import { AllowAcceptTermsGuard } from './allowAcceptTerms.guard';

describe('Allow Accept Terms guard', () => {
    let guard: AllowAcceptTermsGuard;
    let acceptGuard: any;

    beforeEach(() => {
        acceptGuard = jasmine.createSpyObj('acceptGuard', ['canActivate']);
        guard = new AllowAcceptTermsGuard(acceptGuard);
    });

    it('is Truthy', () => {
        expect(guard).toBeTruthy();
    });

    it('calls acceptGuard', () => {
        acceptGuard.canActivate.and.returnValue({ pipe: () => {} });
        guard.canActivate();
        expect(acceptGuard.canActivate).toHaveBeenCalled();
    });

    it('disallows access when accepted', (done: any) => {
        acceptGuard.canActivate.and.returnValue(of(true));
        guard.canActivate().subscribe(ok => {
            expect(ok).toBeFalsy();
            done();
        });
    });

    it('allows access when not accepted', (done: any) => {
        acceptGuard.canActivate.and.returnValue(of(false));
        guard.canActivate().subscribe(ok => {
            expect(ok).toBeTruthy();
            done();
        });
    });
});
