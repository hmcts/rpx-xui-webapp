import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { Observable, of, Subscription } from 'rxjs';
import { first, mergeMap, switchMap, tap } from 'rxjs/operators';

import { CaseRoleDetails } from '../../../role-access/models';
import { AllocateRoleService } from '../../../role-access/services';
import { Caseworker, } from '../../../work-allocation/models/dtos';
import { Task } from '../../../work-allocation/models/tasks';
import { CaseworkerDataService, WorkAllocationCaseService } from '../../../work-allocation/services';
import { getAssigneeName } from '../../../work-allocation/utils';

@Component({
  selector: 'exui-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss']
})
export class TasksContainerComponent implements OnInit {

  public caseDetails: CaseView;
  public tasks: Task[] = [];
  public tasksRefreshed: boolean = false;
  public caseworkers: Caseworker[] = [];
  public warningIncluded: boolean;

  private activatedRouteSubscription: Subscription;
  private tasksSubscription: Subscription;

  constructor(private readonly waCaseService: WorkAllocationCaseService,
              private readonly route: ActivatedRoute,
              private readonly caseworkerService: CaseworkerDataService,
              private readonly rolesService: AllocateRoleService) { }

  public ngOnInit(): void {
    // note: internal logic used to be stored in resolver - resolver removed for smoother navigation purposes
    // i.e. navigating before loading
    this.activatedRouteSubscription = this.route.data
      .pipe(
        tap((data) => {this.caseDetails = data.case as CaseView}),
        switchMap(() => {
          return this.waCaseService.getTasksByCaseId(this.caseDetails.case_id).pipe(
            first(),
            mergeMap((tasks: Task[]) => {
              this.tasks = tasks;
              this.warningIncluded = this.tasks.some(task => task.warnings);
              if (tasks && tasks.length > 0) {
                return this.caseworkerService.getCaseworkersForServices([tasks[0].jurisdiction]);
              } else {
                return of([]);
              }
            })
          )
        }
      )).subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  public onTaskRefreshRequired(): void {
    this.waCaseService.getTasksByCaseId(this.caseDetails.case_id).pipe(first(), mergeMap(taskList => {
      this.tasks = taskList;
      return this.getAssignedNamesForTasks();
    })).subscribe(tasks => {
      this.tasks = tasks;
      this.tasksRefreshed = true;
      this.warningIncluded = this.tasks.some(task => task.warnings);
    });
  }

  private getAssignedNamesForTasks(): Observable<Task[]> {
    const assignedJudicialUsers: string[] = [];
    this.tasks.forEach(task => {
      task.assigneeName = getAssigneeName(this.caseworkers, task.assignee);
      if (!task.assigneeName && task.assignee) {
        assignedJudicialUsers.push(task.assignee);
      }
    });
    return this.rolesService.getCaseRolesUserDetails(assignedJudicialUsers, [this.tasks[0].jurisdiction]).pipe(switchMap(judicialUserData => {
      return this.getJudicialNamedTasks(judicialUserData);
    }));
  }

  public getJudicialNamedTasks(judicialUserData: CaseRoleDetails[]): Observable<Task[]> {
    this.tasks.forEach(task => {
      const judicialAssignedData = judicialUserData.find(judicialUser => judicialUser.sidam_id === task.assignee);
      task.assigneeName = judicialAssignedData ? judicialAssignedData.full_name : task.assigneeName;
    });
    return of(this.tasks);
  }


}
