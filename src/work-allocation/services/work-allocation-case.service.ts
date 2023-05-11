import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Case } from '../models/cases';
import { CaseSearchParameters, SearchCaseRequest } from '../models/dtos';
import Task from '../models/tasks/task.model';

const BASE_URL: string = '/workallocation/case';
export enum ACTION {
  ASSIGN = 'assign',
  CANCEL = 'cancel',
  CLAIM = 'claim',
  COMPLETE = 'complete',
  UNCLAIM = 'unclaim'
}

@Injectable({ providedIn: 'root' })
export class WorkAllocationCaseService {
  constructor(private readonly http: HttpClient) {}

  public getCase(caseId: string): Observable<Case> {
    const url = `${BASE_URL}/${caseId}`;
    return this.http.get<Case>(url);
  }

  public postCase(caseParams: CaseSearchParameters): Observable<Response> {
    return this.http.post<any>(`${BASE_URL}`, caseParams);
  }

  public searchCase(body: { searchRequest: SearchCaseRequest, view: string }): Observable<Case[]> {
    return this.http.post<Case[]>(`${BASE_URL}`, body);
  }

  public getMyCases(body: { searchRequest: SearchCaseRequest, view: string }): Observable<Case[]> {
    return this.http.post<Case[]>('/workallocation/my-work/cases', body);
  }

  public getMyAccess(body: { searchRequest: SearchCaseRequest, view: string }): Observable<any> {
    return this.http.post<any>('/workallocation/my-work/myaccess', body);
  }

  public getCases(body: { searchRequest: SearchCaseRequest, view: string }): Observable<Case[]> {
    return this.http.post<Case[]>('/workallocation/all-work/cases', body);
  }

  public getActionUrl(caseId: string, action: ACTION): string {
    return `${BASE_URL}/${caseId}/${action}`;
  }

  public getTasksByCaseId(caseId: string): Observable<Task[]> {
    return this.http.post<Task[]>(`${BASE_URL}/task/${caseId}`, { refined: true });
  }

  public getTasksByCaseIdUpdated(caseId: string): Observable<Task[]> {
    return this.http.post<Task[]>(`${BASE_URL}/task/${caseId}`, { refined: true });
  }

  /**
   * Call the API to complete a case.
   * @param caseId specifies which case should be completed.
   */
  public completeCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.COMPLETE);
  }

  public cancelCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.CANCEL);
  }

  /**
   * Call the API to assign a case to a user.
   * @param caseId specifies which case should be assigned.
   * @param user specifies who this case should be assigned to.
   */
  public assignCase(caseId: string, user: any): Observable<Response> {
    // Make a POST with the specified assignee in the payload.
    return this.http.post<any>(this.getActionUrl(caseId, ACTION.ASSIGN), user);
  }

  public claimCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.CLAIM);
  }

  public unclaimCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.UNCLAIM);
  }

  public performActionOnCase(caseId: string, action: ACTION): Observable<Response> {
    // Make a POST with an empty payload.
    return this.http.post<any>(this.getActionUrl(caseId, action), {});
  }
}
