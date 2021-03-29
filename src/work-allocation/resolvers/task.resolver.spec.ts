import { RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { Task } from '../models/tasks';
import { TaskResolver } from './task.resolver';

describe('Task Resolver', () => {

    it('resolves on success', () => {
        const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
        const mockCaseWorkerService = jasmine.createSpyObj('mockCaseWorkerService', ['getAll'])
        mockService.getTask.and.returnValue(of({} as Task));
        mockCaseWorkerService.getAll.and.returnValue(of([]));
        const mockRouter = jasmine.createSpyObj('Router', [ 'navigate' ]);
        const taskResolver = new TaskResolver(mockService, mockRouter, mockCaseWorkerService);
        const route = jasmine.createSpyObj('Route', ['']);
        route.paramMap = {
            get: () => {
                return 'somevalue';
            }
        };

        const taskCaseWorkers$ = taskResolver.resolve(route, {} as RouterStateSnapshot);
        taskCaseWorkers$.subscribe(taskCaseWorkers => {
            expect(taskCaseWorkers.task).toEqual({} as Task);
            expect(taskCaseWorkers.caseworkers).toEqual([]);
            expect(mockService.getTask).toHaveBeenCalledWith('somevalue');
            expect(mockCaseWorkerService.getAll).toHaveBeenCalled();
        });
    });
});
