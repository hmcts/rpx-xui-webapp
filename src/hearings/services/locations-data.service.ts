import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationByEpimmsModel } from '../models/location.model';

@Injectable({ providedIn: 'root' })
export class LocationsDataService {
  public constructor(private readonly http: HttpClient) {}

  public getLocationById(locationIds: string, serviceCode: string): Observable<LocationByEpimmsModel[]> {
    return this.http.get<LocationByEpimmsModel[]>(`api/prd/location/getLocationById?epimms_id=${locationIds}&serviceCode=${serviceCode}`);
  }
}
