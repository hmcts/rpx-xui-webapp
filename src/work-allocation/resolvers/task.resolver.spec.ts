import { of } from 'rxjs';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';

import { Caseworker } from '../models/dtos';
import { getAssignedMockTask } from '../tests/utils.spec';
import { TaskResolver } from './task.resolver';

describe('Task Resolver', () => {
  it('resolves on success for non-judicial assigned task', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockCaseWorkerService = jasmine.createSpyObj('CaseworkerDataService', ['getUserByIdamId']);
    const mockAllocateRoleService = jasmine.createSpyObj('AllocateRoleService', [
      'getCaseRolesUserDetails',
      'getRoleCategoriesByUserId',
    ]);
    mockService.getTask.and.returnValue(of({ task: getAssignedMockTask() }));
    mockCaseWorkerService.getUserByIdamId.and.returnValue(of({} as Caseworker));
    mockAllocateRoleService.getRoleCategoriesByUserId.and.returnValue(of([RoleCategory.LEGAL_OPERATIONS]));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskResolver = new TaskResolver(mockService, mockRouter, mockCaseWorkerService, mockAllocateRoleService);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      },
    };

    const taskCaseWorker$ = taskResolver.resolve(route);
    taskCaseWorker$.subscribe((taskCaseWorker) => {
      expect(taskCaseWorker.task.task).toEqual(getAssignedMockTask());
      expect(taskCaseWorker.caseworker).toEqual({} as Caseworker);
      expect(mockService.getTask).toHaveBeenCalledWith('somevalue');
      expect(mockAllocateRoleService.getRoleCategoriesByUserId).toHaveBeenCalledWith(getAssignedMockTask().assignee);
      expect(mockCaseWorkerService.getUserByIdamId).toHaveBeenCalledWith(getAssignedMockTask().assignee);
      expect(mockAllocateRoleService.getCaseRolesUserDetails).not.toHaveBeenCalled();
    });
  });

  it('gets judicial user details for a judicial assigned task', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockCaseWorkerService = jasmine.createSpyObj('CaseworkerDataService', ['getUserByIdamId']);
    const mockAllocateRoleService = jasmine.createSpyObj('AllocateRoleService', [
      'getCaseRolesUserDetails',
      'getRoleCategoriesByUserId',
    ]);
    const judicialTask = {
      ...getAssignedMockTask(),
      assignee: 'judicial-user-id',
      jurisdiction: 'IA',
      role_category: RoleCategory.JUDICIAL,
    };
    mockService.getTask.and.returnValue(of({ task: judicialTask }));
    mockAllocateRoleService.getRoleCategoriesByUserId.and.returnValue(of([RoleCategory.JUDICIAL]));
    mockAllocateRoleService.getCaseRolesUserDetails.and.returnValue(
      of([
        {
          sidam_id: 'judicial-user-id',
          full_name: 'Judge Judy',
          email_id: 'judge@example.com',
        },
      ])
    );
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskResolver = new TaskResolver(mockService, mockRouter, mockCaseWorkerService, mockAllocateRoleService);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      },
    };

    const taskCaseWorker$ = taskResolver.resolve(route);
    taskCaseWorker$.subscribe((taskCaseWorker) => {
      expect(taskCaseWorker.task.task).toEqual(judicialTask);
      expect(taskCaseWorker.caseworker).toEqual({
        idamId: 'judicial-user-id',
        firstName: 'Judge Judy',
        lastName: '',
        email: 'judge@example.com',
      } as Caseworker);
      expect(mockAllocateRoleService.getRoleCategoriesByUserId).toHaveBeenCalledWith('judicial-user-id');
      expect(mockAllocateRoleService.getCaseRolesUserDetails).toHaveBeenCalledWith(['judicial-user-id'], ['IA']);
      expect(mockCaseWorkerService.getUserByIdamId).not.toHaveBeenCalled();
    });
  });

  it('gets caseworker details for a non-judicial user assigned to a judicial task', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockCaseWorkerService = jasmine.createSpyObj('CaseworkerDataService', ['getUserByIdamId']);
    const mockAllocateRoleService = jasmine.createSpyObj('AllocateRoleService', [
      'getCaseRolesUserDetails',
      'getRoleCategoriesByUserId',
    ]);
    const judicialTaskAssignedToCaseworker = {
      ...getAssignedMockTask(),
      assignee: 'caseworker-user-id',
      role_category: RoleCategory.JUDICIAL,
    };
    mockService.getTask.and.returnValue(of({ task: judicialTaskAssignedToCaseworker }));
    mockAllocateRoleService.getRoleCategoriesByUserId.and.returnValue(of([RoleCategory.LEGAL_OPERATIONS]));
    mockCaseWorkerService.getUserByIdamId.and.returnValue(of({ idamId: 'caseworker-user-id' } as Caseworker));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskResolver = new TaskResolver(mockService, mockRouter, mockCaseWorkerService, mockAllocateRoleService);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      },
    };

    const taskCaseWorker$ = taskResolver.resolve(route);
    taskCaseWorker$.subscribe((taskCaseWorker) => {
      expect(taskCaseWorker.task.task).toEqual(judicialTaskAssignedToCaseworker);
      expect(taskCaseWorker.caseworker).toEqual({ idamId: 'caseworker-user-id' } as Caseworker);
      expect(mockAllocateRoleService.getRoleCategoriesByUserId).toHaveBeenCalledWith('caseworker-user-id');
      expect(mockCaseWorkerService.getUserByIdamId).toHaveBeenCalledWith('caseworker-user-id');
      expect(mockAllocateRoleService.getCaseRolesUserDetails).not.toHaveBeenCalled();
    });
  });
});
