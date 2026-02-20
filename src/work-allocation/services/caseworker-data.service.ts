import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService } from '../../app/services/logger/logger.service';
import { Caseworker } from '../models/dtos';
import { logAndRethrow } from './work-allocation-error.utils';

@Injectable({ providedIn: 'root' })
export class CaseworkerDataService {
  public static caseWorkerUrl: string = '/workallocation/caseworker';
  public constructor(
    private readonly http: HttpClient,
    @Optional() private readonly logger?: LoggerService
  ) {}

  public getForLocation(locationId: string): Observable<Caseworker[]> {
    return this.http
      .get<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/location/${locationId}`)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `CaseworkerDataService.getForLocation downstream failure; locationId=${locationId}; endpoint=${CaseworkerDataService.caseWorkerUrl}/location/${locationId}`,
            error
          )
        )
      );
  }

  public getForService(serviceId: string): Observable<Caseworker[]> {
    return this.http
      .get<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/service/${serviceId}`)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `CaseworkerDataService.getForService downstream failure; serviceId=${serviceId}; endpoint=${CaseworkerDataService.caseWorkerUrl}/service/${serviceId}`,
            error
          )
        )
      );
  }

  public getForLocationAndService(locationId: string, serviceId: string): Observable<Caseworker[]> {
    return this.http
      .get<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/location/${locationId}/service/${serviceId}`)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `CaseworkerDataService.getForLocationAndService downstream failure; locationId=${locationId}; serviceId=${serviceId}; endpoint=${CaseworkerDataService.caseWorkerUrl}/location/${locationId}/service/${serviceId}`,
            error
          )
        )
      );
  }

  public search(term: string): Observable<Caseworker[]> {
    return this.http
      .post<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/search`, { term })
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `CaseworkerDataService.search downstream failure; termPresent=${Boolean(term)}; endpoint=${CaseworkerDataService.caseWorkerUrl}/search`,
            error
          )
        )
      );
  }

  public getDetails(caseworkerId: string): Observable<Caseworker> {
    return this.http
      .get<Caseworker>(`${CaseworkerDataService.caseWorkerUrl}/${caseworkerId}`)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `CaseworkerDataService.getDetails downstream failure; caseworkerId=${caseworkerId}; endpoint=${CaseworkerDataService.caseWorkerUrl}/${caseworkerId}`,
            error
          )
        )
      );
  }

  public getUsersFromServices(services: string[], term?: string): Observable<Caseworker[]> {
    const serviceList = Array.isArray(services) ? services.join(',') : 'none';
    return this.http
      .post<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/getUsersByServiceName`, { services, term })
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `CaseworkerDataService.getUsersFromServices downstream failure; services=${serviceList}; termPresent=${Boolean(term)}; endpoint=${CaseworkerDataService.caseWorkerUrl}/getUsersByServiceName`,
            error
          )
        )
      );
  }
}
