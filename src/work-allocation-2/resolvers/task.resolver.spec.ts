import { RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Caseworker } from '../models/dtos';
import { TaskResolver } from './task.resolver';

describe('Task Resolver', () => {

  it('resolves on success', () => {
    const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
    const mockCaseWorkerService = jasmine.createSpyObj('CaseworkerDataService', ['getAll']);
    mockService.getTask.and.returnValue(of(null));
    mockCaseWorkerService.getAll.and.returnValue(of([] as Caseworker[]));
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
      expect(taskCaseWorkers).toEqual({task: null, caseworkers: []});
      expect(mockService.getTask).toHaveBeenCalledWith('somevalue');
    });
  });
});
