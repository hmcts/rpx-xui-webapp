import { of, throwError } from 'rxjs';

import { Caseworker } from '../models/dtos';
import { getAssignedMockTask } from '../tests/utils.spec';
import { TaskResolver } from './task.resolver';

describe('Task Resolver', () => {
  it('resolves on success', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockCaseWorkerService = jasmine.createSpyObj('CaseworkerDataService', ['getUserByIdamId']);
    mockService.getTask.and.returnValue(of({ task: getAssignedMockTask() }));
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
      expect(taskCaseWorker.task.task).toEqual(getAssignedMockTask());
      expect(taskCaseWorker.caseworker).toEqual({} as Caseworker);
      expect(mockService.getTask).toHaveBeenCalledWith('somevalue');
      expect(mockCaseWorkerService.getUserByIdamId).toHaveBeenCalledWith(getAssignedMockTask().assignee, true);
    });
  });

  it('returns null caseworker when getUserByIdamId returns 404', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockCaseWorkerService = jasmine.createSpyObj('CaseworkerDataService', ['getUserByIdamId']);
    mockService.getTask.and.returnValue(of({ task: getAssignedMockTask() }));
    mockCaseWorkerService.getUserByIdamId.and.returnValue(throwError({ status: 404 }));
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
      expect(taskCaseWorker.task.task).toEqual(getAssignedMockTask());
      expect(taskCaseWorker.caseworker).toBeNull();
      expect(mockCaseWorkerService.getUserByIdamId).toHaveBeenCalledWith(getAssignedMockTask().assignee, true);
    });
  });

  it('does not suppress non-404 getUserByIdamId errors', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockCaseWorkerService = jasmine.createSpyObj('CaseworkerDataService', ['getUserByIdamId']);
    mockService.getTask.and.returnValue(of({ task: getAssignedMockTask() }));
    mockCaseWorkerService.getUserByIdamId.and.returnValue(throwError({ status: 500 }));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskResolver = new TaskResolver(mockService, mockRouter, mockCaseWorkerService);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      },
    };

    const taskCaseWorker$ = taskResolver.resolve(route);
    taskCaseWorker$.subscribe({
      error: (error) => {
        expect(error.status).toEqual(500);
        expect(mockCaseWorkerService.getUserByIdamId).toHaveBeenCalledWith(getAssignedMockTask().assignee, true);
      },
    });
  });
});
