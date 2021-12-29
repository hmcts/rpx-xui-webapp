import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { JudicialWorkerDataService } from './judicialworker-data.service';

describe('JudicialWorkerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const mockHttpService = jasmine.createSpyObj('mockHttpService', ['put', 'get', 'post']);

  it('getAll should make correct api call', () => {
    const service = new JudicialWorkerDataService(mockHttpService, mockSessionStorageService);
    mockHttpService.get.and.returnValue(Observable.of([]));
    service.getCaseRolesUserDetails(['id1']);
    expect(mockHttpService.post).toHaveBeenCalledWith(`${JudicialWorkerDataService.roleUrl}/getJudicialUsers`, {userIds: ['id1']});
  });
});
