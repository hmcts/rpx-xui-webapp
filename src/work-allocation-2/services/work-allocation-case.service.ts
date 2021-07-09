import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Case from '../models/cases/case.model';

import { SearchCaseRequest } from '../models/dtos';
const BASE_URL: string = '/workallocation2/task';
@Injectable({ providedIn: 'root' })
export class WorkAllocationCaseService {

  constructor(private readonly http: HttpClient) {}

  public searchCase(body: { searchRequest: SearchCaseRequest, view: string }): Observable<Case[]> {
    return this.http.post<Case[]>(`${BASE_URL}`, body);
  }

  public searchCaseWithPagination(body: { searchRequest: SearchCaseRequest, view: string }): Observable<Case[]> {
    return this.http.post<Case[]>(`/workallocation2/caseWithPagination`, body);
  }
}
