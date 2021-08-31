import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { TaskList } from '../../work-allocation-2/models/dtos';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../work-allocation-2/utils';

@Injectable({
  providedIn: 'root'
})
export class CaseTasksResolverService implements Resolve<TaskList> {

  public static CASE_TASKS_URL: string = '/workallocation2/case/task';

  constructor(private readonly http: HttpClient, private readonly router: Router) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskList> {
    const caseId = route.paramMap.get('cid');
    return this.http.get<TaskList>(`${CaseTasksResolverService.CASE_TASKS_URL}/${caseId}`)
      .pipe(
        first(),
        catchError(error => {
          handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
          return EMPTY;
        })
      );
  }
}
