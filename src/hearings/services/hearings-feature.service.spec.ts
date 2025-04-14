import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HearingsFeatureService } from './hearings-feature.service';

describe('HearingsFeatureService', () => {
  const dummyWindowAat = { location: new URL('https://manage-case.aat.platform.hmcts.net') };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        HearingsFeatureService,
        { provide: Window, useValue: dummyWindowAat }
      ]
    });
  });
  it('should be created', inject([HearingsFeatureService], (service: HearingsFeatureService) => {
    expect(service).toBeTruthy();
  }));
});
