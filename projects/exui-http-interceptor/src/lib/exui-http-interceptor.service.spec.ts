import { TestBed } from '@angular/core/testing';

import { ExuiHttpInterceptorService } from './exui-http-interceptor.service';

describe('ExuiHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExuiHttpInterceptorService = TestBed.get(ExuiHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
