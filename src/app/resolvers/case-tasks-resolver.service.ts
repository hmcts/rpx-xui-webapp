import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { Caseworker, TaskList } from '../../work-allocation-2/models/dtos';
import { CaseworkerDataService } from '../../work-allocation-2/services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../work-allocation-2/utils';

@Injectable({
  providedIn: 'root'
})
export class CaseTasksResolverService implements Resolve<{ tasks: TaskList; caseworkers: Caseworker[] }> {

  public static CASE_TASKS_URL: string = '/workallocation2/case/task';

  constructor(private readonly http: HttpClient,
              private readonly router: Router,
              private readonly caseworkerService: CaseworkerDataService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable< { tasks: TaskList; caseworkers: Caseworker[] } > {
    const caseId = route.paramMap.get('cid');
    const tasks$ = this.http.get<TaskList>(`${CaseTasksResolverService.CASE_TASKS_URL}/${caseId}`)
      .pipe(
        first(),
        catchError(error => {
          handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
          return EMPTY;
        })
      );
    const caseworker$ = this.caseworkerService.getAll();
    return forkJoin({tasks: tasks$, caseworkers: caseworker$});
  }
}
