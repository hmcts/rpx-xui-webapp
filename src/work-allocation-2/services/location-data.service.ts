import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';

import { Location } from '../models/dtos';

@Injectable()
export class LocationDataService {
  public static locationUrl: string = '/workallocation2/location';
  public static allLocationsKey: string = 'allLocations';
  public constructor(private readonly http: HttpClient, private readonly sessionStorageService: SessionStorageService) {}

  public getLocation(locationId: string): Observable<Location> {
    return this.http.get<Location>(`${LocationDataService.locationUrl}/${locationId}`);
  }
  public getLocations(): Observable<Location[]> {
    if (this.sessionStorageService.getItem(LocationDataService.allLocationsKey)) {
      const caseworkers = JSON.parse(this.sessionStorageService.getItem(LocationDataService.allLocationsKey));
      return of(caseworkers as Location[]);
    }
    return this.http.get<Location[]>(`${LocationDataService.locationUrl}`).pipe(
      tap(allLocations => this.sessionStorageService.setItem(LocationDataService.allLocationsKey, JSON.stringify(allLocations)))
    );
  }
}
