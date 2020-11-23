import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/dtos/task';

export class LocationDataService {
    public static locationUrl: string = '/workallocation/location';
    public constructor(private readonly http: HttpClient) {}

    public getLocation(locationId: string): Observable<Location> {
      return this.http.get<Location>(`${LocationDataService.locationUrl}/${locationId}`);
    }
    public getLocations(): Observable<Location[]> {
      return this.http.get<Location[]>(LocationDataService.locationUrl);
    }
}
