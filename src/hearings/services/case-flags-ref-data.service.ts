import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { reportHearingsApiErrors } from './hearings-api-error-telemetry';
import { HearingsTelemetryService } from './hearings-telemetry.service';

@Injectable({ providedIn: 'root' })
export class CaseFlagsRefDataService {
  public constructor(
    private readonly http: HttpClient,
    @Optional() private readonly telemetry?: HearingsTelemetryService
  ) {}

  public getCaseFlagsRefData(serviceId: string): Observable<any> {
    return this.http
      .get<any>(`api/prd/caseFlag/getCaseFlagRefData?serviceId=${serviceId}`)
      .pipe(reportHearingsApiErrors(this.telemetry, 'getCaseFlagsRefData'));
  }
}
