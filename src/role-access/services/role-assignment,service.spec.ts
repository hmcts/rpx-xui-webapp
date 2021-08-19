import { of } from 'rxjs';
import { RoleAssignmentService } from './role-assignment.service';

const mockRoles = [{ roleId: '1', roleName: 'Role 1' },
      { roleId: '2', roleName: 'Role 2' },
      { roleId: '3', roleName: 'Role 3' }];

describe('RoleAssignmentService', () => {
    let roleAssignmentService: RoleAssignmentService;
    let mockHttp: any;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        roleAssignmentService = new RoleAssignmentService(mockHttp);
    });
    it('getCurrentUserRoleExclusions', () => {
        mockHttp.get.and.returnValue(of(mockRoles))
        roleAssignmentService.setRoleAllocations();
        expect(mockHttp.get).toHaveBeenCalledWith(`${RoleAssignmentService.allocationsUrl}/judiciary/get`);
        expect(mockHttp.get).toHaveBeenCalledWith(`${RoleAssignmentService.allocationsUrl}/legal-ops/get`);
    });
});
