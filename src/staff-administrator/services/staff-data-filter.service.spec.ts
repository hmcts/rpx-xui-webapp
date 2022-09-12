import { TestBed } from '@angular/core/testing';

import { StaffDataFilterService } from './staff-data-filter.service';

describe('StaffDataFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaffDataFilterService = TestBed.get(StaffDataFilterService);
    expect(service).toBeTruthy();
  });
});
