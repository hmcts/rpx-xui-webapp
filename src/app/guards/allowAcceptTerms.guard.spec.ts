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
        guard.canActivate();
        expect(acceptGuard.canActivate).toHaveBeenCalled();
    });
});
