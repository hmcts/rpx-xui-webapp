import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { EMPTY, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AllocateRoleService } from '../../role-access/services';
import { Caseworker } from '../models/dtos';

import { Task } from '../models/tasks';
import { CaseworkerDataService, WorkAllocationTaskService } from '../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({ providedIn: 'root' })
export class TaskResolver {
  constructor(
    private readonly service: WorkAllocationTaskService,
    private readonly router: Router,
    private readonly caseworkerService: CaseworkerDataService,
    private readonly allocateRoleService: AllocateRoleService
  ) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<{ task: Task; caseworker: Caseworker | null }> {
    const task$ = this.service.getTask(route.paramMap.get('taskId')).pipe(
      catchError((error) => {
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
        return EMPTY;
      })
    );
    const caseworker$ = task$.pipe(
      mergeMap((task) => {
        if (!task.task.assignee) {
          // if no assignee, return no caseworker
          return of(null);
        }
        return this.allocateRoleService.getRoleCategoriesByUserId(task.task.assignee).pipe(
          switchMap((roleCategories) =>
            roleCategories?.includes(RoleCategory.JUDICIAL)
              ? // if judicial, get judicial user details, otherwise get caseworker details
                this.getJudicialUser(task.task.assignee, task.task.jurisdiction)
              : this.caseworkerService.getUserByIdamId(task.task.assignee)
          )
        );
      })
    );
    return forkJoin({ task: task$, caseworker: caseworker$ });
  }

  private getJudicialUser(assignee: string, jurisdiction: string): Observable<Caseworker | null> {
    return this.allocateRoleService.getCaseRolesUserDetails([assignee], [jurisdiction]).pipe(
      map((judicialUsers) => {
        const judicialUser = judicialUsers?.find((user) => user.sidam_id === assignee) || judicialUsers?.[0];
        return judicialUser
          ? ({
              idamId: judicialUser.sidam_id,
              // Do not bother splitting full_name as firstName and lastName are provided together anyway
              firstName: judicialUser.full_name,
              lastName: '',
              email: judicialUser.email_id,
            } as Caseworker)
          : null;
      })
    );
  }
}
