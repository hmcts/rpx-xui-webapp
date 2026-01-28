import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseNotifier, CaseView, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Observable, of, Subscription } from 'rxjs';
import { first, mergeMap, switchMap } from 'rxjs/operators';
import { CaseRoleDetails } from '../../../role-access/models';
import { AllocateRoleService } from '../../../role-access/services';
import { Caseworker } from '../../../work-allocation/models/dtos';
import { Task } from '../../../work-allocation/models/tasks';
import { CaseworkerDataService, WorkAllocationCaseService } from '../../../work-allocation/services';
import { getAssigneeName } from '../../../work-allocation/utils';

@Component({
  standalone: false,
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
  public showSpinner$ : Observable<boolean>;
  public showSpinner: boolean = true;
  public caseNotifierSubscription: Subscription;

  constructor(private readonly waCaseService: WorkAllocationCaseService,
              private readonly route: ActivatedRoute,
              private readonly caseworkerService: CaseworkerDataService,
              private readonly rolesService: AllocateRoleService,
              private readonly featureToggleService: FeatureToggleService,
              private readonly loadingService: LoadingService,
              private readonly caseNotifier: CaseNotifier) { }

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading as any;
    const loadingToken = this.loadingService.register();
    let caseId: string;
    this.caseNotifierSubscription = this.caseNotifier.caseView.subscribe((caseNotifDetails) => {
      if (caseNotifDetails) {
        caseId = caseNotifDetails.case_id;
      }
    });
    const tasksSearch$ = this.waCaseService.getTasksByCaseId(caseId);
    tasksSearch$
      .pipe(
        first(),
        mergeMap((tasks) => {
          this.tasks = tasks;
          this.warningIncluded = this.tasks.some((task) => task.warnings);
          if (tasks && tasks.length > 0) {
            return this.caseworkerService.getUsersFromServices([tasks[0].jurisdiction]);
          }
          return of([]);
        })).pipe(mergeMap((caseworkers) => {
        this.caseworkers = caseworkers;
        return this.tasks && this.tasks.length > 0 ? this.getAssignedNamesForTasks() : of(this.tasks);
      })).subscribe((tasks) => {
        this.tasks = tasks;
        this.loadingService.unregister(loadingToken);
      }, () => {
        this.loadingService.unregister(loadingToken);
      });
    this.caseDetails = this.route.snapshot.data.case as CaseView;
  }

  public onTaskRefreshRequired(): void {
    const caseId = this.caseDetails.case_id;
    const tasksSearch$ = this.waCaseService.getTasksByCaseId(caseId);
    tasksSearch$.pipe(first(), mergeMap((taskList) => {
      this.tasks = taskList;
      return this.getAssignedNamesForTasks();
    })).subscribe((tasks) => {
      this.tasks = tasks;
      this.tasksRefreshed = true;
      this.warningIncluded = this.tasks.some((task) => task.warnings);
    });
  }

  private getAssignedNamesForTasks(): Observable<Task[]> {
    const assignedJudicialUsers: string[] = [];
    this.tasks.forEach((task) => {
      task.assigneeName = getAssigneeName(this.caseworkers, task.assignee);
      if (!task.assigneeName && task.assignee) {
        assignedJudicialUsers.push(task.assignee);
      }
    });
    return this.rolesService.getCaseRolesUserDetails(assignedJudicialUsers, [this.tasks[0].jurisdiction]).pipe(switchMap((judicialUserData) => {
      return this.getJudicialNamedTasks(judicialUserData);
    }));
  }

  public getJudicialNamedTasks(judicialUserData: CaseRoleDetails[]): Observable<Task[]> {
    this.tasks.forEach((task) => {
      const judicialAssignedData = judicialUserData.find((judicialUser) => judicialUser.sidam_id === task.assignee);
      task.assigneeName = judicialAssignedData ? judicialAssignedData.full_name : task.assigneeName;
    });
    return of(this.tasks);
  }
}
