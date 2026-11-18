import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationByEpimmsModel } from '../models/location.model';
import { reportHearingsApiErrors } from './hearings-api-error-telemetry';
import { HearingsTelemetryService } from './hearings-telemetry.service';

@Injectable({ providedIn: 'root' })
export class LocationsDataService {
  public constructor(
    private readonly http: HttpClient,
    @Optional() private readonly telemetry?: HearingsTelemetryService
  ) {}

  public getLocationById(locationIds: string, serviceCode: string): Observable<LocationByEpimmsModel[]> {
    return this.http
      .get<LocationByEpimmsModel[]>(`api/prd/location/getLocationById?epimms_id=${locationIds}&serviceCode=${serviceCode}`)
      .pipe(reportHearingsApiErrors(this.telemetry, 'getLocationById'));
  }
}
