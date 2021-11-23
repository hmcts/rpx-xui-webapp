import { RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { RefDataModel } from './../../../../api/hearings/models/refData.model';
import { PriorityResolver } from './priority.resolve';


describe('Hearings Priority Resolver', () => {

  it('resolves on success', () => {
    const mockService = jasmine.createSpyObj('HearingsDataService', ['getPriorities']);
    mockService.getPriorities.and.returnValue(of([] as RefDataModel[]));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const taskResolver = new PriorityResolver(mockService, mockRouter);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      }
    };

    const taskCaseWorkers$ = taskResolver.resolve(route, {} as RouterStateSnapshot);
    taskCaseWorkers$.subscribe(taskCaseWorkers => {
      expect(taskCaseWorkers.priorities).toEqual([] as RefDataModel[]);
      expect(mockService.getPriorities).toHaveBeenCalledWith('somevalue');
    });
  });
});
