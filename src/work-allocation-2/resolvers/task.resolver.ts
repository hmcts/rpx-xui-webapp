import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from '../models/tasks';
import { WorkAllocationTaskService } from '../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({ providedIn: 'root' })
export class TaskResolver implements Resolve<Task> {
  constructor(
    private readonly service: WorkAllocationTaskService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
    console.log('route=' + this.route);
    console.log('router=' + this.router);
    const taskId = route.paramMap.get('taskId');
    const regExp = new RegExp('^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$');
    const isTakId = regExp.test(taskId);
    console.log('isTakId=' + isTakId);
    if (isTakId) {
      return this.service.getTask(taskId).pipe(
        catchError(error => {
          handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
          return EMPTY;
        })
      );
    }
    return EMPTY;
  }
}
