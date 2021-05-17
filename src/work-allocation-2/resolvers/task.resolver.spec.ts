import { RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { Task } from '../models/tasks';
import { TaskResolver } from './task.resolver';

describe('Task Resolver', () => {

  it('resolves on success', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    mockService.getTask.and.returnValue(of({} as Task));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskResolver = new TaskResolver(mockService, mockRouter);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      }
    };

    const taskCaseWorkers$ = taskResolver.resolve(route, {} as RouterStateSnapshot);
    taskCaseWorkers$.subscribe(taskCaseWorkers => {
      expect(taskCaseWorkers).toEqual({} as Task);
      expect(mockService.getTask).toHaveBeenCalledWith('somevalue');
    });
  });
});
