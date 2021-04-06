import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { Caseworker } from 'api/workAllocation/interfaces/task';
import { Observable } from 'rxjs';

import { SessionStorageService } from '../../../app/services';
import { ListConstants } from '../../components/constants';
import { InfoMessage, InfoMessageType, TaskActionIds, TaskService, TaskSort } from '../../enums';
import { SearchTaskRequest, SortParameter } from '../../models/dtos';
import { InvokedTaskAction, Task, TaskFieldConfig, TaskServiceConfig, TaskSortField } from '../../models/tasks';
import { CaseworkerDataService, InfoMessageCommService, WorkAllocationTaskService, WorkAllocationFeatureService } from '../../services';

import { getAssigneeName, handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';

@Component({
  templateUrl: 'task-list-wrapper.component.html'
})
export class TaskListWrapperComponent implements OnInit {

  /**
   * Flag to indicate whether or not we've arrived here following a bad
   * request with a flag having been set on another route. The flag is
   * passed through the router and so is held in window.history.state.
   */
  private get wasBadRequest(): boolean {
    if (window && window.history && window.history.state) {
      return !!window.history.state.badRequest;
    }
    return false;
  }

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected ref: ChangeDetectorRef,
    protected taskService: WorkAllocationTaskService,
    protected router: Router,
    protected infoMessageCommService: InfoMessageCommService,
    protected sessionStorageService: SessionStorageService,
    protected alertService: AlertService,
    protected caseworkerService: CaseworkerDataService,
    protected featureService: WorkAllocationFeatureService
  ) {}

  public specificPage: string = '';
  public caseworkers: Caseworker[];

  private pTasks: Task[];
  public get tasks(): Task[] {
    return this.pTasks;
  }
  public set tasks(value: Task[]) {
    this.pTasks = value;
  }

  public get fields(): TaskFieldConfig[] {
    return [];
  }

  public get taskServiceConfig(): TaskServiceConfig {
    return this.defaultTaskServiceConfig;
  }

  public get emptyMessage(): string {
    return ListConstants.EmptyMessage.Default;
  }

  /**
   * Mock TaskServiceConfig.
   */
  private readonly defaultTaskServiceConfig: TaskServiceConfig = {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.ASC,
    defaultSortFieldName: 'dueDate',
    fields: this.fields,
  };

  public sortedBy: TaskSortField;

  /**
   * To be overridden.
   */
  public get sortSessionKey(): string {
    return 'sortSessionKey';
  }

  /**
   * To be overridden.
   */
  public get view(): string {
    return 'default';
  }

  public get returnUrl(): string {
    return this.router ? this.router.url : '/tasks';
  }

  public ngOnInit(): void {
    this.caseworkerService.getAll().subscribe(caseworkers => {
      this.caseworkers = [ ...caseworkers ];
    }, error => {
      handleFatalErrors(error.status, this.router);
    });
    // Try to get the sort order out of the session.
    const stored = this.sessionStorageService.getItem(this.sortSessionKey);
    if (stored) {
      const { fieldName, order } = JSON.parse(stored);
      this.sortedBy = {
        fieldName,
        order: order as TaskSort
      };
    } else {
      // Otherwise, set up the default sorting.
      this.sortedBy = {
        fieldName: this.taskServiceConfig.defaultSortFieldName,
        order: this.taskServiceConfig.defaultSortDirection
      };
    }
    this.loadTasks();
  }

  /**
   * Load the tasks to display in the component.
   */
  public loadTasks(): void {
    this.featureService.getActiveWAFeature().subscribe(feature => {
      if (feature === 'WorkAllocationRelease2'){
        this.loadTasksVersion2();
      } else {
        this.loadTasksVersion1();
      }
    }, error => {
      handleFatalErrors(error.status, this.router);
    });
  }

  /**
   * On the return of the refreshed tasks, we throw up a refresh message.
   */
  public refreshTasks(): void {
    this.infoMessageCommService.addMessage({
      type: InfoMessageType.INFO,
      message: InfoMessage.LIST_OF_TASKS_REFRESHED,
    });
    this.doLoad();
  }

  public performSearch(): Observable<any> {
    const searchRequest = this.getSearchTaskRequest();
    return this.taskService.searchTask({ searchRequest, view: this.view });
  }

  /**
   * Get a search task request appropriate to the current view,
   * sort order, etc.
   */
  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [],
      sorting_parameters: [this.getSortParameter()]
    };
  }

  public getSortParameter(): SortParameter {
    return {
      sort_by: this.sortedBy.fieldName,
      sort_order: this.sortedBy.order
    };
  }

  /**
   * We need to sort the Task List based on the fieldName.
   *
   * Following on from this function we will need to retrieve the sorted tasks from
   * the WA Api, once we have these then we need to set the tasks and fields, and pass
   * these into the TaskListComponent.
   *
   * @param fieldName - ie. 'caseName'
   */
  public onSortHandler(fieldName: string): void {
    let order: TaskSort = TaskSort.ASC;
    if (this.sortedBy.fieldName === fieldName && this.sortedBy.order === TaskSort.ASC) {
      order = TaskSort.DSC;
    }
    this.sortedBy = { fieldName, order };
    this.sessionStorageService.setItem(this.sortSessionKey, JSON.stringify(this.sortedBy));

    this.loadTasks();
  }

  /**
   * InvokedTaskAction from the Task List Component, so that we can handle the User's
   * action.
   */
  public onActionHandler(taskAction: InvokedTaskAction): void {
    if (taskAction.action.id === TaskActionIds.GO) {
      const goToCaseUrl = `/cases/case-details/${taskAction.task.case_id}`;
      this.router.navigate([goToCaseUrl]);
      return;
    }

    if (this.returnUrl.includes('manager')  && taskAction.action.id === TaskActionIds.RELEASE) {
      this.specificPage = 'manager';
    }
    const state = {
      returnUrl: this.returnUrl,
      showAssigneeColumn: taskAction.action.id !== TaskActionIds.ASSIGN
    };
    const actionUrl = `/tasks/${taskAction.task.id}/${taskAction.action.id}/${this.specificPage}`;
    this.router.navigate([actionUrl], { state });
  }

  // Do the actual load. This is separate as it's called from two methods.
  private doLoad(): void {
    // Should this clear out the existing set first?
    this.performSearch().subscribe(result => {
      this.tasks = result.tasks;
      this.tasks.forEach(task => task.assigneeName = getAssigneeName(this.caseworkers, task.assignee));
      this.ref.detectChanges();
    }, error => {
      handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
    });
  }

  private loadTasksVersion1(): void {
    if (this.wasBadRequest) {
      this.refreshTasks();
    } else {
      this.doLoad();
    }
  }

  private loadTasksVersion2(): void {
    if (this.wasBadRequest) {
      this.refreshTasks();
    } else {
      this.doLoad();
    }
  }

}
