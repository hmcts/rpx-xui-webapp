import { of } from 'rxjs';

import { Caseworker } from '../models/dtos';
import { getMockTasks } from '../tests/utils.spec';
import { TaskResolver } from './task.resolver';

describe('Task Resolver', () => {
  it('resolves on success', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockCaseWorkerService = jasmine.createSpyObj('CaseworkerDataService', ['getUserByIdamId']);
    mockService.getTask.and.returnValue(of({ task: getMockTasks()[0] }));
    mockCaseWorkerService.getUserByIdamId.and.returnValue(of({} as Caseworker));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskResolver = new TaskResolver(mockService, mockRouter, mockCaseWorkerService);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      },
    };

    const taskCaseWorker$ = taskResolver.resolve(route);
    taskCaseWorker$.subscribe((taskCaseWorker) => {
      expect(taskCaseWorker.task.task).toEqual(getMockTasks()[0]);
      expect(taskCaseWorker.caseworker).toEqual({} as Caseworker);
      expect(mockService.getTask).toHaveBeenCalledWith('somevalue');
    });
  });
});
