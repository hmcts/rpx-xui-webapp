import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoggerService } from '../../app/services/logger/logger.service';
import { Caseworker } from '../models/dtos';
import { logAndRethrow } from './work-allocation-error.utils';

@Injectable({ providedIn: 'root' })
export class CaseworkerDataService {
  public static readonly caseWorkerUrl: string = '/workallocation/caseworker';
  public constructor(
    private readonly http: HttpClient,
    @Optional() private readonly logger?: LoggerService
  ) {}

  public getUsersByIdamIds(idamIds: string[], services: string[]): Observable<Caseworker[]> {
    return this.http
      .post<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/getUsersByIdamIds`, { idamIds, services })
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `CaseworkerDataService.getUsersByIdamIds downstream failure; idamIdsCount=${idamIds.length}; services=${services.join(',')}; endpoint=${CaseworkerDataService.caseWorkerUrl}/getUsersByIdamIds`,
            error
          )
        )
      );
  }

  public getUserByIdamId(idamId: string, silentNotFound = false): Observable<Caseworker> {
    return this.http
      .post<Caseworker>(`${CaseworkerDataService.caseWorkerUrl}/getUserByIdamId`, { idamId, silentNotFound })
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `CaseworkerDataService.getUserByIdamId downstream failure; idamIdPresent=${Boolean(idamId)}; silentNotFound=${silentNotFound}; endpoint=${CaseworkerDataService.caseWorkerUrl}/getUserByIdamId`,
            error
          )
        )
      );
  }
}
