import { handleFatalErrors, REDIRECTS, treatAsFatal, WILDCARD_SERVICE_DOWN } from './work-allocation.utils';

describe('WorkAllocationUtils', () => {
    const mockRouter = {
        navigate: jasmine.createSpy('navigate')
    };

    it('should send back the status if it is not 500, 401 or 403', () => {
        // test can handle fatal errors for 400 and 402 errors
        const firstStatus = handleFatalErrors(400, mockRouter);
        const secondStatus = handleFatalErrors(402, mockRouter);

        // ensure that the statuses are sent back and mockRouter.navigate has not been called
        expect(firstStatus).toEqual(400);
        expect(secondStatus).toEqual(402);
        expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should return the status if there are no fatal changes', () => {
        // ensure that the status of a 404 error is returned and navigate has not been called
        const firstStatus = treatAsFatal(404, mockRouter, []);
        expect(firstStatus).toEqual(404);
        expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should attempt to navigate to the correct error pages', () => {
        // should get correct redirect for 500
        const serviceDown = handleFatalErrors(500, mockRouter);
        expect(serviceDown).toEqual(0);
        expect(mockRouter.navigate).toHaveBeenCalledWith([ REDIRECTS.ServiceDown ]);

        // correct redirect for 401
        const unAuthorised = handleFatalErrors(401, mockRouter);
        expect(unAuthorised).toEqual(0);
        expect(mockRouter.navigate).toHaveBeenCalledWith([ REDIRECTS.NotAuthorised ]);

        // correct redirect for 403
        const isForbidden = handleFatalErrors(403, mockRouter);
        expect(isForbidden).toEqual(0);
        expect(mockRouter.navigate).toHaveBeenCalledWith([ REDIRECTS.NotAuthorised ]);
    });

    it('should allow setting a fatal redirect', () => {
        // set fatal redirect for 404 and 415 as example
        const REDIRECT_TEST = [{ status: 404, redirectTo: REDIRECTS.ServiceDown }, { status: 415, redirectTo: REDIRECTS.NotAuthorised }];
        const firstStatus = treatAsFatal(404, mockRouter, REDIRECT_TEST);

        // ensure that a 404 has been treated as fatal and sent to service down
        expect(firstStatus).toEqual(0);
        expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.ServiceDown]);

        const secondStatus = treatAsFatal(415, mockRouter, REDIRECT_TEST);

        // ensure that a 415 has been treated as fatal and sent to not authorised
        expect(secondStatus).toEqual(0);
        expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);

        const thirdStatus = treatAsFatal(402, mockRouter, REDIRECT_TEST);

        // a return of the original status confirms there has been no redirect
        expect(thirdStatus).toEqual(402);
        // note: navigate method has already been called so cannot verify that
    });

    it('should allow setting wildcard to ensure all errors sent to service down', () => {
        // test wildcard with 402 error
        const firstStatus = treatAsFatal(402, mockRouter, WILDCARD_SERVICE_DOWN);

        // expect redirect to occur
        expect(firstStatus).toEqual(0);
        expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.ServiceDown]);

        // test wildcard with 404 error
        const secondStatus = treatAsFatal(404, mockRouter, WILDCARD_SERVICE_DOWN);

        // expect redirect to occur
        expect(secondStatus).toEqual(0);
        expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.ServiceDown]);
    });

    it('should ensure correctly setting redirects for handling of all errors', () => {
        // set fatal redirect for 404 and 415 as example
        const REDIRECT_TEST = [{ status: 404, redirectTo: REDIRECTS.ServiceDown }, { status: 415, redirectTo: REDIRECTS.NotAuthorised }];
        const firstStatus = handleFatalErrors(404, mockRouter, REDIRECT_TEST);

        // ensure that a 404 has been treated as fatal and sent to service down
        expect(firstStatus).toEqual(0);
        expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.ServiceDown]);

        const secondStatus = handleFatalErrors(415, mockRouter, REDIRECT_TEST);

        // ensure that a 415 has been treated as fatal and sent to not authorised
        expect(secondStatus).toEqual(0);
        expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);
    });
});
