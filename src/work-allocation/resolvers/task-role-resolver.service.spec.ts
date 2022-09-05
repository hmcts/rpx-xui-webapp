import { RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { TASK_ROLES } from '../../../api/workAllocation/constants/task-roles.mock.data';
import { TaskRole } from '../models/tasks';

import { TaskRoleResolverService } from './task-role-resolver.service';

describe('TaskRoleResolverService', () => {
  it('resolves on success', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTaskRoles']);
    mockService.getTaskRoles.and.returnValue(of(TASK_ROLES));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskResolver = new TaskRoleResolverService(mockService, mockRouter);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      }
    };

    const taskRoles$ = taskResolver.resolve(route, {} as RouterStateSnapshot);
    taskRoles$.subscribe((taskRoles: TaskRole[]) => {
      expect(taskRoles).toEqual(TASK_ROLES);
    });
  });
});
