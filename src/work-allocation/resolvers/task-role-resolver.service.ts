import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TaskRole } from '../models/tasks';
import { WorkAllocationTaskService } from '../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class TaskRoleResolverService implements Resolve<TaskRole[]> {

  constructor(private readonly service: WorkAllocationTaskService, private readonly router: Router) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaskRole[]> {
    return this.service.getTaskRoles(route.paramMap.get('taskId')).pipe(
      catchError(error => {
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
        return EMPTY;
      })
    );
  }
}
