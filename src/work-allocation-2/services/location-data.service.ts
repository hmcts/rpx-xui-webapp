import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';

import { Location } from '../models/dtos';

@Injectable()
export class LocationDataService {
  public static locationUrl: string = '/workallocation2/location';
  public static locationsStorageKey: string = 'locations_cache';

  public constructor(private readonly http: HttpClient, private readonly sessionStorage: SessionStorageService) {
  }

  public getLocation(locationId: string): Observable<Location> {
    return this.http.get<Location>(`${LocationDataService.locationUrl}/${locationId}`);
  }

  public getLocations(): Observable<Location[]> {
    if (this.sessionStorage.getItem(LocationDataService.locationsStorageKey)) {
      const locations = JSON.parse(this.sessionStorage.getItem(LocationDataService.locationsStorageKey));
      return of(locations);
    }
    return this.http.get<Location[]>(LocationDataService.locationUrl)
      .pipe(
        tap((locations: Location[]) => this.sessionStorage.setItem(LocationDataService.locationsStorageKey, JSON.stringify(locations)))
      );
  }
}
