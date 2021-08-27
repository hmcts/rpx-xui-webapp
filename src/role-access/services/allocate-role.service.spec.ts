import { of } from 'rxjs';
import { AllocateRoleService } from '.';

const mockRoles = [{ roleId: '1', roleName: 'Role 1' },
      { roleId: '2', roleName: 'Role 2' },
      { roleId: '3', roleName: 'Role 3' }];

describe('AllocateRoleService', () => {
    let roleAssignmentService: AllocateRoleService;
    let mockHttp: any;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        roleAssignmentService = new AllocateRoleService(mockHttp);
    });
    it('should be able to set judicial and legal ops roles', () => {
        mockHttp.get.and.returnValue(of(mockRoles));
        roleAssignmentService.getValidRoles();
        expect(mockHttp.get).toHaveBeenCalledWith('/api/role-access/allocate-role/valid-roles');
    });
});
