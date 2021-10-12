import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Location } from '../models/dtos';

@Injectable()
export class LocationDataService {
  public static locationUrl: string = '/workallocation2/location';
  public constructor(private readonly http: HttpClient) {}

  public getLocation(locationId: string): Observable<Location> {
    return this.http.get<Location>(`${LocationDataService.locationUrl}/${locationId}`);
  }
  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(LocationDataService.locationUrl);
  }
}
