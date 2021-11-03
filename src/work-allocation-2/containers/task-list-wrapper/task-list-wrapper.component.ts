import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService, FilterService, FilterSetting } from '@hmcts/rpx-xui-common-lib';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';

import { SessionStorageService } from '../../../app/services';
import { ListConstants } from '../../components/constants';
import { InfoMessage, InfoMessageType, SortOrder, TaskActionIds, TaskService } from '../../enums';
import { Caseworker, Location } from '../../interfaces/common';
import { FieldConfig, SortField } from '../../models/common';
import { PaginationParameter, SearchTaskRequest, SortParameter } from '../../models/dtos';
import { InvokedTaskAction, Task, TaskServiceConfig } from '../../models/tasks';
import { CaseworkerDataService, InfoMessageCommService, LocationDataService, WASupportedJurisdictionsService, WorkAllocationTaskService } from '../../services';
import { getAssigneeName, handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';

@Component({
  templateUrl: 'task-list-wrapper.component.html',
  providers: [InfoMessageCommService]
})
export class TaskListWrapperComponent implements OnDestroy, OnInit {

  public specificPage: string = '';
  public caseworkers: Caseworker[];
  public locations: Location[] = new Array<Location>();
  public showSpinner$: Observable<boolean>;
  public sortedBy: SortField;
  public pagination: PaginationParameter;
  private pTasks: Task[];
  public selectedLocations: string[] = [];
  private tasksLoaded: boolean = false;
  protected userDetailsKey: string = 'userDetails';

  private selectedLocationsSubscription: Subscription;

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
    protected loadingService: LoadingService,
    protected featureToggleService: FeatureToggleService,
    protected locationService: LocationDataService,
    protected waSupportedJurisdictionsService: WASupportedJurisdictionsService,
    protected filterService: FilterService
  ) {
  }
  public taskServiceConfig: TaskServiceConfig;

  public get tasks(): Task[] {
    return this.pTasks;
  }

  public set tasks(value: Task[]) {
    this.pTasks = value;
  }

  private pTasksTotal: number;
  public get tasksTotal(): number {
    return this.pTasksTotal;
  }
  public set tasksTotal(value: number) {
    this.pTasksTotal = value;
  }

  public get fields(): FieldConfig[] {
    return [];
  }

  public getTaskServiceConfig(): TaskServiceConfig {
    return {
      service: TaskService.IAC,
      defaultSortDirection: SortOrder.ASC,
      defaultSortFieldName: this.getDateField('dueDate'),
      fields: this.fields
    };
  }

  public getDateField(defaultSortColumn: string): string {
    const field = this.fields.find(currentField => currentField.isDate);
    if (field) {
      return field.sortName;
    }
    return defaultSortColumn;
  }

  public get emptyMessage(): string {
    return ListConstants.EmptyMessage.Default;
  }

  /**
   * To be overridden.
   */
  public get sortSessionKey(): string {
    return 'sortSessionKey';
  }

  /**
   * To be overridden.
   */
   public get pageSessionKey(): string {
    return 'pageSessionKey';
  }

  /**
   * To be overridden.
   */
  public get view(): string {
    return 'default';
  }

  public get returnUrl(): string {
    return this.router ? this.router.url : '/mywork';
  }

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

  public ngOnInit(): void {
    this.taskServiceConfig = this.getTaskServiceConfig();
    this.loadCaseWorkersAndLocations();
    this.setupTaskList();
    this.loadTasks();
  }

  public ngOnDestroy(): void {
    if (this.selectedLocationsSubscription) {
      this.selectedLocationsSubscription.unsubscribe();
    }
  }

  public loadCaseWorkersAndLocations() {
    this.selectedLocationsSubscription = this.filterService.getStream('locations')
      .pipe(
        filter((f: FilterSetting) => f && f.hasOwnProperty('fields'))
      )
      .subscribe((f: FilterSetting) => {
        this.selectedLocations = f.fields.find((field) => field.name === 'locations').value;
        // timeout ensures tasks are loaded on initial local setting
        // waits for initial setting to be persisted via task-filter-component
        setTimeout(() => {
          if (this.tasksLoaded || this.filterService.isInitialSetting) {
            this.doLoad();
            this.filterService.isInitialSetting = false;
          }
        }, 1);
    });
  }

  public setupTaskList() {
    this.caseworkerService.getAll().subscribe(caseworkers => {
      this.caseworkers = [ ...caseworkers ];
    }, error => {
      handleFatalErrors(error.status, this.router);
    });
    // Try to get the sort order out of the session.
    const sortStored = this.sessionStorageService.getItem(this.sortSessionKey);
    if (sortStored) {
      const { fieldName, order } = JSON.parse(sortStored);
      this.sortedBy = {
        fieldName,
        order: order as SortOrder
      };
    } else {
      // Otherwise, set up the default sorting.
      this.sortedBy = {
        fieldName: this.taskServiceConfig.defaultSortFieldName,
        order: this.taskServiceConfig.defaultSortDirection
      };
    }
    const pageSorted = +this.sessionStorageService.getItem(this.pageSessionKey);
    this.pagination = {
      page_number: pageSorted ? pageSorted : 1,
      page_size: 25
    };
  }

  /**
   * Load the tasks to display in the component.
   */
  public loadTasks(): void {
    if (this.wasBadRequest) {
      this.refreshTasks();
    } else {
      this.doLoad();
    }
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

  public performSearchPagination(): Observable<any> {
    const searchRequest = this.getSearchTaskRequestPagination();
    return this.taskService.searchTaskWithPagination({ searchRequest, view: this.view });
  }

  /**
   * Get a search task request appropriate to the current view,
   * sort order, etc.
   */
   public getSearchTaskRequestPagination(): SearchTaskRequest {
    return {
      search_parameters: [],
      sorting_parameters: [this.getSortParameter()],
      pagination_parameters: this.getPaginationParameter()
    };
  }

  public getSortParameter(): SortParameter {
    return {
      sort_by: this.sortedBy.fieldName,
      sort_order: this.sortedBy.order
    };
  }

  public getPaginationParameter(): PaginationParameter {
    return { ...this.pagination };
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
    let order: SortOrder = SortOrder.ASC;
    if (this.sortedBy.fieldName === fieldName && this.sortedBy.order === SortOrder.ASC) {
      order = SortOrder.DESC;
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

    if (this.returnUrl.includes('manager') && taskAction.action.id === TaskActionIds.RELEASE) {
      this.specificPage = 'manager';
    }
    const state = {
      returnUrl: this.returnUrl,
      showAssigneeColumn: taskAction.action.id !== TaskActionIds.ASSIGN
    };
    const actionUrl = `/work/${taskAction.task.id}/${taskAction.action.id}/${this.specificPage}`;
    this.router.navigate([actionUrl], { state });
  }

  // Do the actual load. This is separate as it's called from two methods.
  private doLoad(): void {
    this.showSpinner$ = this.loadingService.isLoading;
    const loadingToken = this.loadingService.register();
    this.performSearchPagination().subscribe(result => {
        this.loadingService.unregister(loadingToken);
        this.tasks = result.tasks;
        this.tasksTotal = result.total_records;
        this.tasks.forEach(task => task.assigneeName = getAssigneeName(this.caseworkers, task.assignee));
        this.tasksLoaded = true;
        this.ref.detectChanges();
      }, error => {
        this.loadingService.unregister(loadingToken);
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
    });
  }

  public onPaginationHandler(pageNumber: number): void {
    this.pagination.page_number = pageNumber;
    this.sessionStorageService.setItem(this.pageSessionKey, pageNumber.toString());
    this.doLoad();
  }

  public isCurrentUserJudicial(): boolean {
    const userInfoStr = this.sessionStorageService.getItem(this.userDetailsKey);
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const isJudge = AppUtils.isLegalOpsOrJudicial(userInfo.roles) === UserRole.Judicial;
      return isJudge;
    }
    return false
  }
}
