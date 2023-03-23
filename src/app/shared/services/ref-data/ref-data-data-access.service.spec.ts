import { TestBed } from '@angular/core/testing';

import { RefDataDataAccessService } from './ref-data-data-access.service';

describe('RefDataDataAccessService', () => {
  let service: RefDataDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefDataDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
