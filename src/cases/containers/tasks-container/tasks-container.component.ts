import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { Observable, of } from 'rxjs';
import { first, mergeMap, switchMap } from 'rxjs/operators';

import { CaseRoleDetails } from '../../../role-access/models';
import { AllocateRoleService } from '../../../role-access/services';
import { Caseworker, } from '../../../work-allocation-2/models/dtos';
import { Task } from '../../../work-allocation-2/models/tasks';
import { CaseworkerDataService, WorkAllocationCaseService } from '../../../work-allocation-2/services';
import { getAssigneeName } from '../../../work-allocation-2/utils';

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

  constructor(private readonly waCaseService: WorkAllocationCaseService,
              private readonly route: ActivatedRoute,
              private readonly caseworkerService: CaseworkerDataService,
              private readonly rolesService: AllocateRoleService) { }

  public ngOnInit(): void {
    // note: internal logic used to be stored in resolver - resolver removed for smoother navigation purposes
    // i.e. navigating before loading
    const caseId = this.route.snapshot.paramMap.get('cid');
    const tasks$ = this.waCaseService.getTasksByCaseId(caseId);
    tasks$
      .pipe(
        first(),
        mergeMap((tasks) => {
          this.tasks = tasks;
          this.warningIncluded = this.tasks.some(task => task.warnings);
          if (tasks && tasks.length > 0) {
            return this.caseworkerService.getCaseworkersForServices([tasks[0].jurisdiction]);
          } else {
            return of([]);
          }
        })).pipe(mergeMap(caseworkers => {
          this.caseworkers = caseworkers;
          return this.tasks && this.tasks.length > 0 ? this.getAssignedNamesForTasks() : of(this.tasks);
        })).subscribe(tasks => {
          this.tasks = tasks;
        });
    this.caseDetails = this.route.snapshot.data.case as CaseView;
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
      if (!task.assigneeName) {
        assignedJudicialUsers.push(task.assignee);
      }
    });
    return this.rolesService.getCaseRolesUserDetails(assignedJudicialUsers, [this.tasks[0].jurisdiction]).pipe(switchMap(judicialUserData => {
      return this.getJudicialNamedTasks(judicialUserData);
    }));
  }

  private getJudicialNamedTasks(judicialUserData: CaseRoleDetails[]): Observable<Task[]> {
    this.tasks.forEach(task => {
      const judicialAssignedData = judicialUserData.find(judicialUser => judicialUser.sidam_id === task.assignee);
      task.assigneeName = judicialAssignedData ? judicialAssignedData.known_as : task.assigneeName;
    });
    return of(this.tasks);
  }
}
