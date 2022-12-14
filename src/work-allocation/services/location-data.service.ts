import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SessionStorageService } from '../../app/services';
import { Location, LocationByEPIMMSModel } from '../models/dtos';

@Injectable()
export class LocationDataService {
  public static locationUrl: string = '/workallocation/location';
  public static fullLocationUrl: string = '/workallocation/full-location';
  public static allLocationsKey: string = 'allLocations';
  public constructor(private readonly http: HttpClient, private readonly sessionStorageService: SessionStorageService) { }

  public getLocations(): Observable<Location[]> {
    if (this.sessionStorageService.getItem(LocationDataService.allLocationsKey)) {
      const locations = JSON.parse(this.sessionStorageService.getItem(LocationDataService.allLocationsKey));
      return of(locations as Location[]);
    }
    return this.http.get<Location[]>(`${LocationDataService.locationUrl}`).pipe(
      tap(allLocations => this.sessionStorageService.setItem(LocationDataService.allLocationsKey, JSON.stringify(allLocations)))
    );
  }

  public getSpecificLocations(locationIds: string[], locationServices: string[]): Observable<LocationByEPIMMSModel[]> {
    if (!locationIds || locationIds.length === 0) {
      return of([]);
    }
    const bookableServices = JSON.parse(this.sessionStorageService.getItem('bookableServices')) || [];
    const serviceCodes: string[] = bookableServices.length ? bookableServices : locationServices;
    const options = {
      params: new HttpParams()
        .set('serviceCodes', serviceCodes.join())
    };
    // note: may be better way of searching by epimms_id in future - previously getting location by epimms id was mocked
    return this.http.get<LocationByEPIMMSModel[]>(`${LocationDataService.fullLocationUrl}`, options).map(
      allLocations => allLocations.filter(location => locationIds.includes(location.epimms_id)));
  }
}
