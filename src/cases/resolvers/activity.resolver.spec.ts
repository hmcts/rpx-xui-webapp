import { ActivityResolver } from './activity.resolver';
import { ActivityService } from '@hmcts/ccd-case-ui-toolkit';

describe('ActivityResolver', () => {

  let activityService;
  let activityResolver: ActivityResolver;

  beforeEach(() => {
    activityService = jasmine.createSpyObj<ActivityService>('activityService', ['verifyUserIsAuthorized']);
    activityService.verifyUserIsAuthorized.and.returnValue(true);

    activityResolver = new ActivityResolver(activityService);
  });

  it('should verify if user is authorised for activity on resolve and return true when is authorised', () => {
    let result: Boolean;
    activityResolver.resolve().subscribe(r => result = r);
    expect(activityService.verifyUserIsAuthorized).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should verify if user is authorised for activity on resolve and return true when is not authorised', () => {
    let result: Boolean;
    activityResolver.resolve().subscribe(r => result = r);
    activityService.verifyUserIsAuthorized.and.returnValue(false);

    expect(result).toBe(true);
  });
});
