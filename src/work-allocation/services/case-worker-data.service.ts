import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caseworker } from '../models/dtos/task';

export class CaseworkerDataService {
    public static caseWorkerUrl: string = '/workallocation/caseworker';
    public constructor(private readonly http: HttpClient) {}

    public getAll(): Observable<Caseworker[]> {
      return this.http.get<Caseworker[]>(CaseworkerDataService.caseWorkerUrl);
    }
    public getForLocation(locationId: string): Observable<Caseworker[]> {
      return this.http.get<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/location/${locationId}`);
    }
    public getForService(serviceId: string): Observable<Caseworker[]> {
      return this.http.get<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/service/${serviceId}`);
    }
    public getForLocationAndService(locationId: string, serviceId: string): Observable<Caseworker[]> {
      return this.http.get<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/location/${locationId}/service/${serviceId}`);
    }
    public search(term: string): Observable<Caseworker[]> {
      return this.http.post<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/search`, { term });
    }
    public getDetails(caseworkerId: string): Observable<Caseworker> {
      return this.http.get<Caseworker>(`${CaseworkerDataService.caseWorkerUrl}/${caseworkerId}`);
    }
}
