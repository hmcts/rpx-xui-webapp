import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocationModel } from '../models/location.model';

@Injectable()
export class LocationService {

  constructor(private readonly http: HttpClient) {}

  public getAllLocations(): Observable<LocationModel[]> {
    return this.http.get<LocationModel[]>(`api/locations/getLocations?service=SSCS&locationType=hearing&searchTerm=wal`);
  }
}