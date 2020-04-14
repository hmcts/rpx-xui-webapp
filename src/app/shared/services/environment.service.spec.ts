import { inject, TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EnvironmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([EnvironmentService], (service: EnvironmentService) => {
    expect(service).toBeTruthy();
  }));
});
