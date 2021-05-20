import { TestBed } from '@angular/core/testing';

import { JudicialWorkerDataService } from './judicialworker-data.service';

describe('JudicialWorkerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JudicialWorkerDataService = TestBed.get(JudicialWorkerDataService);
    expect(service).toBeTruthy();
  });
});
