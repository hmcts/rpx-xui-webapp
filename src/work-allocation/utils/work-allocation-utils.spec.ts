import { PersonRole } from '@hmcts/rpx-xui-common-lib';
import { RoleCategory } from '../../role-access/models';
import { LocationsByRegion } from '../models/dtos';
import { TaskPermission } from '../models/tasks';
import {
  REDIRECTS,
  WILDCARD_SERVICE_DOWN,
  getCurrentUserRoleCategory,
  getDestinationUrl,
  getLabel,
  getOptions,
  getRoleCategoryToBeSelectedByDefault,
  handleFatalErrors,
  handleTasksFatalErrors,
  locationWithinRegion,
  treatAsFatal
} from './work-allocation-utils';

describe('WorkAllocationUtils', () => {
  let mockRouter: any;
  let sessionStorageService: any;

  const taskRoles = [{
    role_category: RoleCategory.ADMIN,
    role_name: '',
    permissions: [TaskPermission.OWN],
    authorisations: []
  },
  {
    role_category: RoleCategory.LEGAL_OPERATIONS,
    role_name: '',
    permissions: [TaskPermission.EXECUTE],
    authorisations: []
  },
  {
    role_category: RoleCategory.JUDICIAL,
    role_name: '',
    permissions: [TaskPermission.OWN],
    authorisations: []
  }
  ];

  const taskRolesWithOneOwnPermission = [{
    role_category: RoleCategory.LEGAL_OPERATIONS,
    role_name: '',
    permissions: [TaskPermission.EXECUTE],
    authorisations: []
  },
  {
    role_category: RoleCategory.JUDICIAL,
    role_name: '',
    permissions: [TaskPermission.OWN],
    authorisations: []
  }];

  const userInfo = {
    id: 'user-123',
    active: true,
    forename: 'Test',
    surname: 'User',
    email: 'testuser@test.com',
    roles: null,
    roleCategory: RoleCategory.LEGAL_OPERATIONS
  };

  beforeEach(() => {
    sessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
    sessionStorageService.getItem.and.returnValue(JSON.stringify(userInfo));
    mockRouter = jasmine.createSpyObj('router', ['navigate']);
  });

  it('should send back the status if it is 400', () => {
    // test can handle fatal errors for 400 and 402 errors
    const firstStatus = handleFatalErrors(400, mockRouter);
    expect(firstStatus).toEqual(400);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should send back the status if it is not 500, 401 or 403', () => {
    // ensure that the statuses are sent back and mockRouter.navigate has not been called
    const secondStatus = handleFatalErrors(402, mockRouter);
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
    expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.ServiceDown]);

    // correct redirect for 401
    const unAuthorised = handleFatalErrors(401, mockRouter);
    expect(unAuthorised).toEqual(0);
    expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);

    // correct redirect for 403
    const isForbidden = handleFatalErrors(403, mockRouter);
    expect(isForbidden).toEqual(0);
    expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);
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

  it('getOptions should return with user role category selected by default', () => {
    const options = getOptions(taskRoles, sessionStorageService);
    expect(options.length).toEqual(3);
    expect(options[0].optionId).toEqual('ADMIN');
    expect(options[0].label).toEqual(PersonRole.ADMIN);
    expect(options[1].optionId).toEqual('LEGAL_OPERATIONS');
    expect(options[1].label).toEqual(PersonRole.CASEWORKER);
    expect(options[2].optionId).toEqual('JUDICIAL');
    expect(options[2].label).toEqual(PersonRole.JUDICIAL);
    expect(sessionStorageService.getItem).toHaveBeenCalled();
    expect(options[1].checked).toEqual('checked');
  });

  it('getOptions should return with user role category own permission selected by default', () => {
    const options = getOptions(taskRolesWithOneOwnPermission, sessionStorageService);
    expect(options.length).toEqual(2);
    expect(options[0].optionId).toEqual('LEGAL_OPERATIONS');
    expect(options[0].label).toEqual(PersonRole.CASEWORKER);
    expect(options[1].optionId).toEqual('JUDICIAL');
    expect(options[1].label).toEqual(PersonRole.JUDICIAL);
    expect(sessionStorageService.getItem).toHaveBeenCalledTimes(0);
    expect(options[1].checked).toEqual('checked');
  });

  it('should return current user role category if only one role category with own permission', () => {
    const defaultRoleCategory = getRoleCategoryToBeSelectedByDefault(taskRolesWithOneOwnPermission, sessionStorageService);
    expect(sessionStorageService.getItem).toHaveBeenCalledTimes(0);
    expect(defaultRoleCategory).toEqual('JUDICIAL');
  });

  it('should return current user role category if more than one role category with own permission', () => {
    const defaultRoleCategory = getRoleCategoryToBeSelectedByDefault(taskRoles, sessionStorageService);
    expect(sessionStorageService.getItem).toHaveBeenCalled();
    expect(defaultRoleCategory).toEqual('LEGAL_OPERATIONS');
  });

  it('should get current user role category', () => {
    const currentUserRoleCategory = getCurrentUserRoleCategory(sessionStorageService);
    expect(sessionStorageService.getItem).toHaveBeenCalled();
    expect(currentUserRoleCategory).toEqual('LEGAL_OPERATIONS');
  });

  it('getLabel', () => {
    let label = getLabel(RoleCategory.LEGAL_OPERATIONS);
    expect(label).toEqual('Legal Ops');

    label = getLabel(RoleCategory.ADMIN);
    expect(label).toEqual('Admin');

    label = getLabel(RoleCategory.JUDICIAL);
    expect(label).toEqual('Judicial');

    try {
      getLabel('some' as RoleCategory);
    } catch (error) {
      expect(error.message).toContain('Invalid roleCategory');
    }
  });

  it('should attempt to navigate to the correct error page for task related errors', () => {
    const taskId = 'd2f13dad-494c-11ec-9740-b6b84d919277';
    const returnUrl = '/work/my-work/list';
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
      url: `/work/${taskId}/reassign/confirm`
    };

    // should get correct redirect for 500
    const serviceDown = handleTasksFatalErrors(500, mockRouter);
    expect(serviceDown).toEqual(0);
    expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.ServiceDown]);

    // correct redirect for 401
    const unAuthorised = handleTasksFatalErrors(401, mockRouter);
    expect(unAuthorised).toEqual(0);
    expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);

    // correct redirect for 403
    const isForbidden = handleTasksFatalErrors(403, mockRouter);
    expect(isForbidden).toEqual(0);
    expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);

    // correct redirect for 401 with url param set
    const personNotAuthorised = handleTasksFatalErrors(401, mockRouter, null, returnUrl);
    expect(personNotAuthorised).toEqual(0);
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/work/${taskId}/person-not-authorised`], { state: { returnUrl } });
  });

  it('should return correct destination url for task assignment error', () => {
    const url = '/work/case-id-1234/assign/confirm';
    const destinationUrl = getDestinationUrl(url);
    expect(destinationUrl).toEqual('/work/case-id-1234/person-not-authorised');
  });

  it('should return correct destination url for task reassignment error', () => {
    const url = '/work/case-id-1234/reassign/confirm';
    const destinationUrl = getDestinationUrl(url);
    expect(destinationUrl).toEqual('/work/case-id-1234/person-not-authorised');
  });

  it('should verify that a location is within a region', () => {
    const regionLocations: LocationsByRegion[] = [{ regionId: '1', locations: ['123'] }, { regionId: '2', locations: ['234'] }];
    expect(locationWithinRegion(regionLocations, '1', '123')).toEqual(true);
    expect(locationWithinRegion(regionLocations, '2', '234')).toEqual(true);
    expect(locationWithinRegion(regionLocations, '1', '234')).toEqual(false);
    expect(locationWithinRegion(regionLocations, null, '234')).toEqual(false);
    expect(locationWithinRegion([], '1', '123')).toEqual(false);
  });
});
