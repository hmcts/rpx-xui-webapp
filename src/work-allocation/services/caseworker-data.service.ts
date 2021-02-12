import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from 'src/app/services';

import { Caseworker } from '../models/dtos';

@Injectable()
export class CaseworkerDataService {
  public static caseWorkerUrl: string = '/workallocation/caseworker';
  public static caseworkersKey: string;
  public constructor(private readonly http: HttpClient, private readonly sessionStorageService: SessionStorageService) {}

  public getAll(): Observable<Caseworker[]> {
    if (this.sessionStorageService.getItem(CaseworkerDataService.caseworkersKey)) {
      const caseworkers =  JSON.parse(this.sessionStorageService.getItem(CaseworkerDataService.caseworkersKey));
      return of(caseworkers as Caseworker[]);
    }
    return this.http.get<Caseworker[]>(CaseworkerDataService.caseWorkerUrl).pipe(
      tap(caseworkers => this.sessionStorageService.setItem(CaseworkerDataService.caseworkersKey, JSON.stringify(caseworkers)))
    );
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
