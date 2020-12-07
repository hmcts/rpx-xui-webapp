import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Task } from '../models/tasks';
import { WorkAllocationTaskService } from '../services';

@Injectable({ providedIn: 'root' })
export class TaskResolver implements Resolve<Task> {
    constructor(private readonly service: WorkAllocationTaskService) {}

    public resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<Task> {
      return this.service.getTask(route.paramMap.get('taskId'));
    }
}
