import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../../app/services/logger/logger.service';
import { Case } from '../models/cases';
import { CaseSearchParameters, SearchCaseRequest } from '../models/dtos';
import Task from '../models/tasks/task.model';
import { logAndRethrow } from './work-allocation-error.utils';

const BASE_URL: string = '/workallocation/case';
export enum ACTION {
  ASSIGN = 'assign',
  CANCEL = 'cancel',
  CLAIM = 'claim',
  COMPLETE = 'complete',
  UNCLAIM = 'unclaim',
}

@Injectable({ providedIn: 'root' })
export class WorkAllocationCaseService {
  constructor(
    private readonly http: HttpClient,
    @Optional() private readonly logger?: LoggerService
  ) {}

  public getCase(caseId: string): Observable<Case> {
    const url = `${BASE_URL}/${caseId}`;
    return this.http
      .get<Case>(url)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WorkAllocationCaseService.getCase downstream failure; caseId=${caseId}; endpoint=${url}`,
            error
          )
        )
      );
  }

  public postCase(caseParams: CaseSearchParameters): Observable<Response> {
    return this.http
      .post<Response>(`${BASE_URL}`, caseParams)
      .pipe(
        catchError((error) =>
          logAndRethrow(this.logger, `WorkAllocationCaseService.postCase downstream failure; endpoint=${BASE_URL}`, error)
        )
      );
  }

  public searchCase(body: { searchRequest: SearchCaseRequest; view: string }): Observable<Case[]> {
    return this.http
      .post<Case[]>(`${BASE_URL}`, body)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WorkAllocationCaseService.searchCase downstream failure; view=${body.view}; endpoint=${BASE_URL}`,
            error
          )
        )
      );
  }

  public getMyCases(body: { searchRequest: SearchCaseRequest; view: string }): Observable<Case[]> {
    return this.http
      .post<Case[]>('/workallocation/my-work/cases', body)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WorkAllocationCaseService.getMyCases downstream failure; view=${body.view}; endpoint=/workallocation/my-work/cases`,
            error
          )
        )
      );
  }

  public getMyAccess(body: { searchRequest: SearchCaseRequest; view: string }): Observable<unknown> {
    return this.http
      .post<unknown>('/workallocation/my-work/myaccess', body)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WorkAllocationCaseService.getMyAccess downstream failure; view=${body.view}; endpoint=/workallocation/my-work/myaccess`,
            error
          )
        )
      );
  }

  public getCases(body: { searchRequest: SearchCaseRequest; view: string }): Observable<Case[]> {
    return this.http
      .post<Case[]>('/workallocation/all-work/cases', body)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WorkAllocationCaseService.getCases downstream failure; view=${body.view}; endpoint=/workallocation/all-work/cases`,
            error
          )
        )
      );
  }

  public getActionUrl(caseId: string, action: ACTION): string {
    return `${BASE_URL}/${caseId}/${action}`;
  }

  public getTasksByCaseId(caseId: string): Observable<Task[]> {
    const url = `${BASE_URL}/task/${caseId}`;
    return this.http
      .post<Task[]>(url, { refined: true })
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WorkAllocationCaseService.getTasksByCaseId downstream failure; caseId=${caseId}; endpoint=${url}`,
            error
          )
        )
      );
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
  public assignCase(caseId: string, user: Record<string, unknown>): Observable<Response> {
    // Make a POST with the specified assignee in the payload.
    return this.http
      .post<Response>(this.getActionUrl(caseId, ACTION.ASSIGN), user)
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WorkAllocationCaseService.assignCase downstream failure; caseId=${caseId}; endpoint=${this.getActionUrl(caseId, ACTION.ASSIGN)}`,
            error
          )
        )
      );
  }

  public claimCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.CLAIM);
  }

  public unclaimCase(caseId: string): Observable<Response> {
    return this.performActionOnCase(caseId, ACTION.UNCLAIM);
  }

  public performActionOnCase(caseId: string, action: ACTION): Observable<Response> {
    // Make a POST with an empty payload.
    return this.http
      .post<Response>(this.getActionUrl(caseId, action), {})
      .pipe(
        catchError((error) =>
          logAndRethrow(
            this.logger,
            `WorkAllocationCaseService.performActionOnCase downstream failure; caseId=${caseId}; action=${action}; endpoint=${this.getActionUrl(caseId, action)}`,
            error
          )
        )
      );
  }
}
