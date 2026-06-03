import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Caseworker } from '../models/dtos';

@Injectable({ providedIn: 'root' })
export class CaseworkerDataService {
  public static readonly caseWorkerUrl: string = '/workallocation/caseworker';
  public constructor(private readonly http: HttpClient) {}

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

  public getUsersFromServices(services: string[], term?: string): Observable<Caseworker[]> {
    return this.http.post<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/getUsersByServiceName`, { services, term });
  }
}
