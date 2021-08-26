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
    it('should be able to set judicial and legal ops roles', () => {
        mockHttp.get.and.returnValue(of(mockRoles));
        roleAssignmentService.getValidRoles();
        expect(mockHttp.get).toHaveBeenCalledWith('/api/role-access/valid-roles/get');
    });
});
