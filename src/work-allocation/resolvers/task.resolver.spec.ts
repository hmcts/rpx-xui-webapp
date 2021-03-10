import { RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { Task } from '../models/tasks';
import { TaskResolver } from './task.resolver';

describe('Task Resolver', () => {

    it('resolves on success', () => {
        const mockService = jasmine.createSpyObj('WorkAllocationTaskService', ['getTask']);
        mockService.getTask.and.returnValue(of({} as Task));
        const mockRouter = jasmine.createSpyObj('Router', [ 'navigate' ]);
        const taskResolver = new TaskResolver(mockService, mockRouter);
        const route = jasmine.createSpyObj('Route', ['']);
        route.paramMap = {
            get: () => {
                return 'somevalue';
            }
        };
        const task$ = taskResolver.resolve(route, {} as RouterStateSnapshot);
        expect(mockService.getTask).toHaveBeenCalledWith('somevalue');
        task$.subscribe(task => expect(task).toEqual({} as Task));
    });
});
