import { TestBed } from '@angular/core/testing';

import { ExuiCoreService } from './exui-core.service';

describe('ExuiCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExuiCoreService = TestBed.get(ExuiCoreService);
    expect(service).toBeTruthy();
  });
});
