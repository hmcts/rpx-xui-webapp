import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationModel } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationsDataService {
  public constructor(private readonly http: HttpClient) {
  }

  public getLocationById(locationId: string): Observable<LocationModel> {
    return this.http.get<LocationModel>(`api/prd/location/getLocationById?epimms_id=${locationId}`);
  }
}
