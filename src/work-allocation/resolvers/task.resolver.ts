import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from '../models/tasks';
import { WorkAllocationTaskService } from '../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({ providedIn: 'root' })
export class TaskResolver implements Resolve<Task> {
  constructor(
    private readonly service: WorkAllocationTaskService,
    private readonly router: Router
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
    return this.service.getTask(route.paramMap.get('taskId')).pipe(
      catchError(error => {
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
        return EMPTY;
      })
    );
  }
}
