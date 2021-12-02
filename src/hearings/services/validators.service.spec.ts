import { inject, TestBed } from '@angular/core/testing';
import { ValidatorsService } from './validators.service';

describe('HearingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValidatorsService,
      ]
    });
  });

  it('should be created', inject([ValidatorsService], (service: ValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
