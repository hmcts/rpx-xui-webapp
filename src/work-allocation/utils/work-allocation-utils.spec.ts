import { getPrimaryLocation, handleFatalErrors, REDIRECTS, treatAsFatal, WILDCARD_SERVICE_DOWN } from './work-allocation-utils';
import { Caseworker, Location } from '../models/dtos/index';

describe('WorkAllocationUtils', () => {
  let mockRouter: any;

  it('should send back the status if it is 400', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    // test can handle fatal errors for 400 and 402 errors
    const firstStatus = handleFatalErrors(400, mockRouter);
    expect(firstStatus).toEqual(400);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should send back the status if it is not 500, 401 or 403', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    // ensure that the statuses are sent back and mockRouter.navigate has not been called
    const secondStatus = handleFatalErrors(402, mockRouter);
    expect(secondStatus).toEqual(402);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should return the status if there are no fatal changes', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    // ensure that the status of a 404 error is returned and navigate has not been called
    const firstStatus = treatAsFatal(404, mockRouter, []);
    expect(firstStatus).toEqual(404);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should attempt to navigate to the correct error pages', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
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
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
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
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
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
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
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

  it('should get primary location from a caseworker', () => {

    const LOCATION_1: Location = {
      location_id: '1',
      location: 'Test One',
      services: ['a', 'b'],
      is_primary: true
    };
    const LOCATION_2: Location = {
      location_id: '2',
      location: 'Test Two',
      services: ['a', 'c'],
      is_primary: false
    };
    const LOCATION_3: Location = {
      location_id: '3',
      location: 'Test Three',
      services: ['b', 'c'],
      is_primary: true
    };

    const CASEWORKER_1: Caseworker = {
      id: '1',
      first_name: 'Name',
      last_name: 'Test',
      email_id: 'nametest@test.com',
      base_location: [LOCATION_1, LOCATION_2]
    };
    const CASEWORKER_2: Caseworker = {
      id: '2',
      first_name: 'First',
      last_name: 'Last',
      email_id: 'firstlast@test.com',
      base_location: [LOCATION_2, LOCATION_3]
    };
    const CASEWORKER_3: Caseworker = {
      id: '3',
      first_name: 'One',
      last_name: 'Two',
      email_id: 'onetwo@test.com',
      base_location: [LOCATION_1, LOCATION_3]
    };
    const CASEWORKER_4: Caseworker = {
      id: '4',
      first_name: 'Fourth',
      last_name: 'Test',
      email_id: 'fourthtest@test.com',
      base_location: []
    };

    // check function deals correctly with example locations
    expect(getPrimaryLocation(CASEWORKER_1)).toEqual(LOCATION_1);
    expect(getPrimaryLocation(CASEWORKER_2)).toEqual(LOCATION_3);

    // for two primary locations, return last one
    expect(getPrimaryLocation(CASEWORKER_3)).toEqual(LOCATION_3);

    // if no primary location, return null
    expect(getPrimaryLocation(CASEWORKER_4)).toEqual(null);
  });
});
