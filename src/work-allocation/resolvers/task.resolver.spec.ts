import { RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { Caseworker } from '../models/dtos';
import { getMockTasks } from '../tests/utils.spec';
import { TaskResolver } from './task.resolver';

describe('Task Resolver', () => {

  it('resolves on success', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockCaseWorkerService = jasmine.createSpyObj('CaseworkerDataService', ['getCaseworkersForServices']);
    mockService.getTask.and.returnValue(of({task: getMockTasks()[0]}));
    mockCaseWorkerService.getCaseworkersForServices.and.returnValue(of([] as Caseworker[]));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskResolver = new TaskResolver(mockService, mockRouter, mockCaseWorkerService);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      }
    };

    const taskCaseWorkers$ = taskResolver.resolve(route, {} as RouterStateSnapshot);
    taskCaseWorkers$.subscribe(taskCaseWorkers => {
      expect(taskCaseWorkers.task.task).toEqual(getMockTasks()[0]);
      expect(taskCaseWorkers.caseworkers).toEqual([]);
      expect(mockService.getTask).toHaveBeenCalledWith('somevalue');
    });
  });
});
