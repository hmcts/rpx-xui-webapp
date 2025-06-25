import { of } from 'rxjs';

import { getMockTasks } from '../../work-allocation/tests/utils.spec';
import { CaseRole, RoleCategory } from '../models';
import { TaskRoleAccessResolver } from './task-role-access-resolver';

describe('Task Role Access Resolver', () => {
  it('resolves on success', () => {
    const mockCaseRole: CaseRole = {
      name: 'Example case name',
      roleCategory: RoleCategory.LEGAL_OPERATIONS,
      location: null,
      start: '01-01-2001',
      end: null,
      id: 'roleId',
      actorId: 'actorId',
      actions: null,
      email: null
    };
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockAllocateRoleService = jasmine.createSpyObj('AllocateRoleService', ['getCaseAccessRoles']);
    mockService.getTask.and.returnValue(of({ task: getMockTasks()[0] }));
    mockAllocateRoleService.getCaseAccessRoles.and.returnValue(of([mockCaseRole]));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskRoleAccessResolver = new TaskRoleAccessResolver(mockService, mockRouter, mockAllocateRoleService);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      }
    };

    const taskAndRole$ = taskRoleAccessResolver.resolve(route);
    taskAndRole$.subscribe((taskAndRole) => {
      expect(taskAndRole.task.task).toEqual(getMockTasks()[0]);
      expect(taskAndRole.role[0]).toEqual(mockCaseRole);
      expect(mockService.getTask).toHaveBeenCalledWith('somevalue');
    });
  });
});
