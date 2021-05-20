import { TestBed } from '@angular/core/testing';

import { LocationResolver } from './location-resolver.service';

describe('LocationResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationResolver = TestBed.get(LocationResolver);
    expect(service).toBeTruthy();
  });
});
