import { TestBed } from '@angular/core/testing';

import { ExuiSharedLazyService } from './exui-shared-lazy.service';

describe('ExuiSharedLazyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExuiSharedLazyService = TestBed.get(ExuiSharedLazyService);
    expect(service).toBeTruthy();
  });
});
