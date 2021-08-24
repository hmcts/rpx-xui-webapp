import { RoleAssignmentService } from './role-assignment.service';

const mockRoles = [{ roleId: '1', roleName: 'Role 1' },
      { roleId: '2', roleName: 'Role 2' },
      { roleId: '3', roleName: 'Role 3' }];

describe('RoleAssignmentService', () => {
    let roleAssignmentService: RoleAssignmentService;
    let mockHttp: any;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        roleAssignmentService = new RoleAssignmentService();
    });
    it('should be able to set judicial and legal ops roles', () => {
        expect(roleAssignmentService.legalOpsRoles).toBe(undefined);
        roleAssignmentService.judicialRoles = mockRoles;
        roleAssignmentService.legalOpsRoles = roleAssignmentService.judicialRoles;
        expect(roleAssignmentService.legalOpsRoles).toBe(mockRoles);
    });
});
