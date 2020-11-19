import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caseworker } from '../models/dtos/task';

export class CaseworkerDataService {
    public constructor(private readonly http: HttpClient) {}

    public getAll(): Observable<Caseworker[]> {
      return this.http.get<Caseworker[]>('workallocation/caseworker');
    }
    public getForLocation(locationId: string): Observable<Caseworker[]> {
      return this.http.get<Caseworker[]>(`workallocation/caseworker/location/${locationId}`);
    }
    public getForService(serviceId: string): Observable<Caseworker[]> {
      return this.http.get<Caseworker[]>(`workallocation/caseworker/service/${serviceId}`);
    }
    public getForLocationAndService(locationId: string, serviceId: string): Observable<Caseworker[]> {
      return this.http.get<Caseworker[]>(`workallocation/caseworker/location/${locationId}/service/${serviceId}`);
    }
    public search(term: string): Observable<Caseworker[]> {
      return this.http.post<Caseworker[]>(`workallocation/caseworker/search`, { term });
    }
    public getDetails(caseworkerId: string): Observable<Caseworker> {
      return this.http.get<Caseworker>(`workallocation/caseworker/${caseworkerId}`);
    }
}
