import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SessionStorageService } from '../../app/services';
import { Caseworker, CaseworkersByService } from '../models/dtos';
import { getAllCaseworkersFromServices, getCaseworkerSessionStorageKeyForServiceId, setCaseworkers } from '../utils';

@Injectable({ providedIn: 'root' })
export class CaseworkerDataService {
  public static caseWorkerUrl: string = '/workallocation/caseworker';
  public static caseWorkerForServices: string = 'workallocation/retrieveCaseWorkersForServices';
  public static caseworkersKey: string = 'caseworkers';
  public constructor(private readonly http: HttpClient, private readonly sessionStorageService: SessionStorageService) {}

  public getAll(): Observable<Caseworker[]> {
    if (this.sessionStorageService.getItem(CaseworkerDataService.caseworkersKey)) {
      const caseworkers = JSON.parse(this.sessionStorageService.getItem(CaseworkerDataService.caseworkersKey));
      return of(caseworkers as Caseworker[]);
    }
    return this.http.get<Caseworker[]>(CaseworkerDataService.caseWorkerUrl).pipe(
      tap((caseworkers) => this.sessionStorageService.setItem(CaseworkerDataService.caseworkersKey, JSON.stringify(caseworkers)))
    );
  }

  public getCaseworkersForServices(serviceIds: string[]): Observable<Caseworker[]> {
    const storedServices = [];
    const newServices = [];
    const storedCaseworkersByService = [];
    serviceIds.forEach((serviceId) => {
      const serviceKey = getCaseworkerSessionStorageKeyForServiceId(serviceId);
      if (this.sessionStorageService.getItem(serviceKey)) {
        storedServices.push(serviceId);
        storedCaseworkersByService.push({ service: serviceId, caseworkers: JSON.parse(this.sessionStorageService.getItem(serviceKey)) });
      } else {
        newServices.push(serviceId);
      }
    });
    // if all services are stored then return the stored caseworkers by service
    if (storedServices.length === serviceIds.length) {
      return of(getAllCaseworkersFromServices(storedCaseworkersByService) as Caseworker[]);
    }
    // all serviceIds passed in as node layer getting used anyway and caseworkers also stored there
    return this.http.post<CaseworkersByService[]>(CaseworkerDataService.caseWorkerForServices, { serviceIds }).pipe(
      tap((caseworkersByService) => {
        caseworkersByService.forEach((caseworkerListByService) => {
          // for any new service, ensure that they are then stored in the session
          if (newServices.includes(caseworkerListByService.service)) {
            setCaseworkers(caseworkerListByService.service, caseworkerListByService.caseworkers, this.sessionStorageService);
          }
        });
      }),
      map((caseworkersByService) => {
        return getAllCaseworkersFromServices(caseworkersByService);
      })
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
