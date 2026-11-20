import { Component, OnDestroy, OnInit } from '@angular/core';
import { CaseNotifier, CaseView, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, filter, finalize, first, mergeMap, switchMap, take, takeUntil } from 'rxjs/operators';
import { CaseRoleDetails } from '../../../role-access/models';
import { AllocateRoleService } from '../../../role-access/services';
import { Caseworker } from '../../../work-allocation/models/dtos';
import { Task } from '../../../work-allocation/models/tasks';
import { CaseworkerDataService, WorkAllocationCaseService } from '../../../work-allocation/services';
import { getAssigneeIdsFromTasks, getAssigneeNameFromList } from '../../../work-allocation/utils';

@Component({
  standalone: false,
  selector: 'exui-tasks-container',
  templateUrl: './tasks-container.component.html',
  styleUrls: ['./tasks-container.component.scss'],
})
export class TasksContainerComponent implements OnInit, OnDestroy {
  public caseDetails: CaseView;
  public tasks: Task[] = [];
  public tasksRefreshed: boolean = false;
  public caseworkers: Caseworker[] = [];
  public warningIncluded: boolean;
  public showSpinner$: Observable<boolean>;
  public showSpinner: boolean = true;
  public caseNotifierSubscription: Subscription;
  public caseId: string;
  private loadingToken: string | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly waCaseService: WorkAllocationCaseService,
    private readonly caseworkerService: CaseworkerDataService,
    private readonly rolesService: AllocateRoleService,
    private readonly loadingService: LoadingService,
    private readonly caseNotifier: CaseNotifier
  ) {}

  public ngOnInit(): void {
    this.showSpinner$ = this.loadingService.isLoading;
    this.caseNotifierSubscription = this.caseNotifier.caseView
      .pipe(
        filter((caseNotifDetails) => !!caseNotifDetails?.case_id),
        take(1)
      )
      .subscribe((caseNotifDetails) => {
        this.caseDetails = caseNotifDetails;
        this.caseId = caseNotifDetails.case_id;
        this.loadingToken = this.loadingService.register();
        this.loadTasks();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.caseNotifierSubscription?.unsubscribe();
    this.releaseLoadingToken();
  }

  private loadTasks(): void {
    const tasksSearch$ = this.waCaseService.getTasksByCaseId(this.caseId);
    tasksSearch$
      .pipe(
        takeUntil(this.destroy$),
        first(),
        mergeMap((tasks) => {
          this.tasks = tasks;
          this.warningIncluded = this.tasks.some((task) => task.warnings);
          if (tasks && tasks.length > 0) {
            const assigneeIds = getAssigneeIdsFromTasks(tasks);
            return this.caseworkerService.getUsersByIdamIds(assigneeIds, [this.tasks[0].jurisdiction]).pipe(
              first(),
              switchMap((caseworkers) => {
                this.caseworkers = caseworkers;
                return this.getAssignedNamesForTasks();
              })
            );
          }
          this.caseworkers = [];
          return of([]);
        }),
        catchError(() => of(this.tasks)),
        finalize(() => this.releaseLoadingToken())
      )
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }

  private releaseLoadingToken(): void {
    if (this.loadingToken) {
      this.loadingService.unregister(this.loadingToken);
      this.loadingToken = null;
    }
  }

  public onTaskRefreshRequired(): void {
    const caseId = this.caseId;
    const tasksSearch$ = this.waCaseService.getTasksByCaseId(caseId);
    tasksSearch$
      .pipe(
        first(),
        mergeMap((taskList) => {
          this.tasks = taskList;
          if (taskList && taskList.length > 0) {
            const assigneeIds = getAssigneeIdsFromTasks(taskList);
            return this.caseworkerService.getUsersByIdamIds(assigneeIds, [taskList[0].jurisdiction]).pipe(
              first(),
              switchMap((caseworkers) => {
                this.caseworkers = caseworkers;
                return this.getAssignedNamesForTasks();
              })
            );
          }
          this.caseworkers = [];
          return of(taskList);
        })
      )
      .subscribe((tasks) => {
        this.tasks = tasks;
        this.tasksRefreshed = true;
        this.warningIncluded = this.tasks.some((task) => task.warnings);
      });
  }

  private getAssignedNamesForTasks(): Observable<Task[]> {
    const assignedJudicialUsers: string[] = [];
    this.tasks.forEach((task) => {
      task.assigneeName = getAssigneeNameFromList(this.caseworkers, task.assignee);
      if (!task.assigneeName && task.assignee) {
        assignedJudicialUsers.push(task.assignee);
      }
    });
    return this.rolesService.getCaseRolesUserDetails(assignedJudicialUsers, [this.tasks[0].jurisdiction]).pipe(
      switchMap((judicialUserData) => {
        return this.getJudicialNamedTasks(judicialUserData);
      })
    );
  }

  public getJudicialNamedTasks(judicialUserData: CaseRoleDetails[]): Observable<Task[]> {
    this.tasks.forEach((task) => {
      const judicialAssignedData = judicialUserData.find((judicialUser) => judicialUser.sidam_id === task.assignee);
      task.assigneeName = judicialAssignedData ? judicialAssignedData.full_name : task.assigneeName;
    });
    return of(this.tasks);
  }
}
