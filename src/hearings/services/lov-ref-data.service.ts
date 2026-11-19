import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { LovRefDataModel } from '../models/lovRefData.model';
import { reportHearingsApiErrors } from './hearings-api-error-telemetry';
import { HearingsTelemetryService } from './hearings-telemetry.service';

@Injectable({ providedIn: 'root' })
export class LovRefDataService {
  public constructor(
    private readonly http: HttpClient,
    @Optional() private readonly telemetry?: HearingsTelemetryService
  ) {}

  public getListOfValues(category: string, service: string, isChildRequired: boolean = false): Observable<LovRefDataModel[]> {
    const options = {
      params: new HttpParams()
        .set('categoryId', category)
        .set('serviceId', service)
        .set('isChildRequired', isChildRequired ? 'Y' : 'N'),
    };
    return this.http
      .get<LovRefDataModel[]>('api/prd/lov/getLovRefData', options)
      .pipe(reportHearingsApiErrors(this.telemetry, 'getListOfValues'));
  }
}
