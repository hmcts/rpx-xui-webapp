import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Caseworker } from '../models/dtos';

@Injectable({ providedIn: 'root' })
export class CaseworkerDataService {
  public static readonly caseWorkerUrl: string = '/workallocation/caseworker';
  public constructor(private readonly http: HttpClient) {}

  public getUsersByIdamIds(idamIds: string[], services: string[]): Observable<Caseworker[]> {
    return this.http.post<Caseworker[]>(`${CaseworkerDataService.caseWorkerUrl}/getUsersByIdamIds`, { idamIds, services });
  }

  public getUserByIdamId(idamId: string, silentNotFound = false): Observable<Caseworker> {
    return this.http.post<Caseworker>(`${CaseworkerDataService.caseWorkerUrl}/getUserByIdamId`, { idamId, silentNotFound });
  }
}
