import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { JudicialUserModel } from '../models/judicialUser.model';
import { reportHearingsApiErrors } from './hearings-api-error-telemetry';
import { HearingsTelemetryService } from './hearings-telemetry.service';

@Injectable({ providedIn: 'root' })
export class JudicialRefDataService {
  public constructor(
    private readonly http: HttpClient,
    @Optional() private readonly telemetry?: HearingsTelemetryService
  ) {}

  public searchJudicialUserByPersonalCodes(personalCodes: string[]): Observable<JudicialUserModel[]> {
    return this.http
      .post<JudicialUserModel[]>('api/prd/judicial/searchJudicialUserByPersonalCodes', {
        personal_code: personalCodes,
      })
      .pipe(reportHearingsApiErrors(this.telemetry, 'searchJudicialUserByPersonalCodes'));
  }

  public searchJudicialUserByIdamID(idamIds: string[]): Observable<JudicialUserModel[]> {
    return this.http.post<JudicialUserModel[]>('api/prd/judicial/searchJudicialUserByIdamId', { sidam_ids: idamIds });
  }
}
