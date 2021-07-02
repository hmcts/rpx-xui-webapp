import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/user-details.model';
import { SessionStorageService } from 'src/app/services';
import { CONFIG_CONSTANTS } from 'src/work-allocation-2/components/constants/config.constants';
import { LIST_CONSTANTS } from 'src/work-allocation-2/components/constants/list.constants';
import { TaskService, TaskSort } from 'src/work-allocation-2/enums';
import { PaginationParameter, SearchTaskRequest, SortParameter } from 'src/work-allocation-2/models/dtos';
import { WorkAllocationTaskService } from 'src/work-allocation-2/services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from 'src/work-allocation-2/utils';
import { InvokedTaskAction, Task, TaskFieldConfig, TaskServiceConfig, TaskSortField } from '../../models/tasks';

@Component({
    selector: 'exui-all-work-tasks',
    templateUrl: 'all-work-task.component.html',
    styleUrls: ['all-work-task.component.scss']
})
export class AllWorkTaskComponent implements OnInit {
  public constructor(private readonly taskService: WorkAllocationTaskService,
                     private sessionStorageService: SessionStorageService,
                     private readonly router: Router) {}

  public sortedBy: TaskSortField = {
    fieldName: '',
    order: TaskSort.NONE
  };

  public pagination: PaginationParameter = {
    page_number: 1,
    page_size: 25
  };
  public emptyMessage: string = 'Change your selection to view tasks.';

  private readonly defaultTaskServiceConfig: TaskServiceConfig = {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.NONE,
    defaultSortFieldName: 'dueDate',
    fields: this.fields,
  };
  public tasks: Task[] = new Array<Task>();
  public tasksTotal: number = 0;

  public get fields(): TaskFieldConfig[] {
    return CONFIG_CONSTANTS.AllWorkTasks;
  }

  public ngOnInit() {
    this.doLoad();
  }

  public get taskServiceConfig(): TaskServiceConfig {
    return this.defaultTaskServiceConfig;
  }

  public onPaginationEvent(pageNumber: number): void {
  }

  public onSortHandler(fieldName: string): void {
  }

  public onActionHandler(taskAction: InvokedTaskAction): void {
  }

  public get view(): string {
    return 'AllWork';
  }

  private doLoad(): void {
    this.performSearchPagination().subscribe(result => {
        this.tasks = result.tasks;
        this.tasksTotal = result.total_records;
      }, error => {
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
    });
  }

  public performSearchPagination(): Observable<any> {
    const searchRequest = this.getSearchTaskRequestPagination();
    return this.taskService.searchTaskWithPagination({ searchRequest, view: this.view });
  }

  public getSearchTaskRequestPagination(): SearchTaskRequest {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    let isJudge = false;
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const id = userInfo.id ? userInfo.id : userInfo.uid;
      isJudge = userInfo.roles.some(role => LIST_CONSTANTS.JUDGE_ROLES.includes(role));
    }
    return {
      search_parameters: [],
      sorting_parameters: [this.getSortParameter()],
      pagination_parameters: this.getPaginationParameter(),
      search_by: isJudge ? 'judge' : 'caseworker',
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
}
