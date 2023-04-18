import { HttpClient } from '@angular/common/http';
import { RoleExclusionsService } from './role-exclusions.service';

describe('RoleExclusionsService', () => {
  let roleExclusionsService: RoleExclusionsService;
  let mockHttp: HttpClient;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj<HttpClient>('HttpService', ['get', 'post']);
    roleExclusionsService = new RoleExclusionsService(mockHttp);
  });

  it('getCurrentUserRoleExclusions', () => {
    roleExclusionsService.getCurrentUserRoleExclusions('12343454545', 'JUR', 'caseType', 'someId');
    expect(mockHttp.post).toHaveBeenCalledWith(
      `${RoleExclusionsService.exclusionsUrl}/post`,
      { caseId: '12343454545', jurisdiction: 'JUR', caseType: 'caseType', exclusionId: 'someId' }
    );
  });
});
