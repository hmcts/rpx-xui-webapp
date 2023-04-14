import { RoleAccessHttpError, SpecificRole } from '../models';
import { InfoMessageType } from '../models/enums/info-message-type';
import { getTitleText, handleError, REDIRECTS } from './role-access-utils';

describe('WorkAllocationUtils', () => {
  let mockRouter: any;
  const error: RoleAccessHttpError = {
    status: 400,
    message: 'Service down'
  };
  const exampleUrl = '/cases';

  it('should send back the status if it is 400', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    // test can handle fatal errors for 400 and 402 errors
    handleError(error, mockRouter, exampleUrl);
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('should send back the status if it is not 500, 401 or 403', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    error.status = 200;
    handleError(error, mockRouter, exampleUrl);
    const additionalState = { state: { showMessage: true, message: { type: InfoMessageType.WARNING, message: 'Service down' } } };
    expect(mockRouter.navigate).toHaveBeenCalledWith([exampleUrl], additionalState);
  });

  it('should attempt to navigate to the correct error pages', () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    // should get correct redirect for 500
    error.status = 500;
    handleError(error, mockRouter, exampleUrl);
    expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.ServiceDown]);

    // correct redirect for 401
    error.status = 401;
    handleError(error, mockRouter, exampleUrl);
    expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);

    // correct redirect for 403
    error.status = 403;
    handleError(error, mockRouter, exampleUrl);
    expect(mockRouter.navigate).toHaveBeenCalledWith([REDIRECTS.NotAuthorised]);
  });

  it('should correctly set the title text', () => {
    const firstRole: SpecificRole = {
      id: 'first-role',
      name: 'First role'
    };
    const caseManager: SpecificRole = {
      id: 'case-manager',
      name: 'Case manager'
    };
    // test that title can mention specifc role
    expect(getTitleText(firstRole, 'allocate', 'JUDICIAL')).toBe('allocate a First role');
    // case manager
    expect(getTitleText(caseManager, 'reallocate', 'LEGAL_OPS')).toBe('reallocate a legal ops case manager');
    // category of role
    expect(getTitleText(null, 'remove', 'LEGAL_OPS')).toBe('remove a LEGAL OPS role');
    // unspecific role
    expect(getTitleText(null, 'view', null)).toBe('view a role');
  });
});

