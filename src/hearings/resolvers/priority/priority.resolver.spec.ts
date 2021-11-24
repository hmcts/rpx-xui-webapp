import { RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { RefDataModel } from './../../../../api/hearings/models/refData.model';
import { PriorityResolver } from './priority.resolve';

describe('Hearings Priority Resolver', () => {
  it('resolves on success', () => {
    const mockHearingDataService = jasmine.createSpyObj('HearingsDataService', ['getRefData']);
    mockHearingDataService.getRefData.and.returnValue(of([] as RefDataModel[]));
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const hearingResolver = new PriorityResolver(mockRouter, mockHearingDataService);
    const route = jasmine.createSpyObj('Route', ['']);
    route.paramMap = {
      get: () => {
        return 'somevalue';
      }
    };
    const hearingData$ = hearingResolver.resolve(route, {} as RouterStateSnapshot);
    hearingData$.subscribe(hearingDataPriorities => {
      expect(hearingDataPriorities).toEqual([]);
      expect(mockHearingDataService.getRefData).toHaveBeenCalled();
    });
  });
});
