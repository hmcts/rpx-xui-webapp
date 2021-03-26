import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Caseworker } from '../models/dtos';

import { Task } from '../models/tasks';
import { CaseworkerDataService, WorkAllocationTaskService } from '../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({ providedIn: 'root' })
export class TaskResolver implements Resolve<any> {
  constructor(
    private readonly service: WorkAllocationTaskService,
    private readonly router: Router,
    private readonly caseworkerService: CaseworkerDataService
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable< { task: Task; caseworkers: Caseworker[]; } > {
    const task$ =  this.service.getTask(route.paramMap.get('taskId')).pipe(
      catchError(error => {
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
        return EMPTY;
      })
    );
    const caseworker$ = this.caseworkerService.getAll();

    return forkJoin({task: task$, caseworkers: caseworker$});
  }
}
