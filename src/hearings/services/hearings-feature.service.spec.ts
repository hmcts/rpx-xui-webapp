import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MOCK_ENVIRONMENT_CONFIG } from '../../app/app.test-constants.spec';
import { ENVIRONMENT_CONFIG } from '../../models/environmentConfig.model';
import { HearingsFeatureService } from './hearings-feature.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HearingsFeatureService', () => {
  const dummyWindowAat = { location: new URL('https://manage-case.aat.platform.hmcts.net') };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        HearingsFeatureService,
        { provide: Window, useValue: dummyWindowAat },
        { provide: ENVIRONMENT_CONFIG, useValue: MOCK_ENVIRONMENT_CONFIG },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });
  it('should be created', inject([HearingsFeatureService], (service: HearingsFeatureService) => {
    expect(service).toBeTruthy();
  }));
});
