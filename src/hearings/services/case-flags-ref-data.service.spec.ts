import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HearingsTelemetryService } from './hearings-telemetry.service';
import { CaseFlagsRefDataService } from './case-flags-ref-data.service';

describe('CaseFlagsRefDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: HearingsTelemetryService, useValue: null },
        CaseFlagsRefDataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should be created', inject([CaseFlagsRefDataService], (service: CaseFlagsRefDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCaseFlagsRefData', () => {
    it('should get case flags ref data', inject(
      [HttpTestingController, CaseFlagsRefDataService],
      (httpMock: HttpTestingController, service: CaseFlagsRefDataService) => {
        service.getCaseFlagsRefData('BBA3').subscribe((response) => {
          expect(response).toBeNull();
        });

        const req = httpMock.expectOne('api/prd/caseFlag/getCaseFlagRefData?serviceId=BBA3');
        expect(req.request.method).toEqual('GET');
        req.flush(null);
      }
    ));
  });
});
