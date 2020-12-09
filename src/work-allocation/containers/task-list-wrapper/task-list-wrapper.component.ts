import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService, TaskSort } from '../../enums';
import { SearchTaskParameter, SearchTaskRequest } from '../../models/dtos';
import { InvokedTaskAction, Task, TaskFieldConfig, TaskServiceConfig, TaskSortField } from '../../models/tasks';
import { WorkAllocationTaskService } from '../../services';
import { InfoMessageCommService } from '../../services/info-message-comms.service';
import { DEFAULT_EMPTY_MESSAGE } from '../task-list/task-list.component';

@Component({
  templateUrl: 'task-list-wrapper.component.html'
})
export class TaskListWrapperComponent implements OnInit {

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected taskService: WorkAllocationTaskService,
    protected router: Router,
    protected infoMessageCommService: InfoMessageCommService
  ) {}

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
    return DEFAULT_EMPTY_MESSAGE;
  }

  /**
   * Communicate what information message needs to be displayed.
   */
  public get messageService(): InfoMessageCommService {

    return this.infoMessageCommService;
  }

  public get route(): Router {

    return this.router;
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

  public ngOnInit(): void {
    // Set up the default sorting.
    this.sortedBy = {
      fieldName: this.taskServiceConfig.defaultSortFieldName,
      order: this.taskServiceConfig.defaultSortDirection
    };

    this.loadTasks();
  }

  /**
   * Load the tasks to display in the component.
   */
  public loadTasks(): void {
    // Should this clear out the existing set first?
    const searchTaskRequest = this.getSearchTaskRequest();
    this.taskService.searchTask(searchTaskRequest).subscribe(result => {
      // Swap the commenting on these two lines to see the behaviour
      // when no tasks are returned.
      // NOTE: Do not commit them in a swapped state!
      this.tasks = result.tasks;
      // this.tasks = [];
    });
  }

  /**
   * Get a search task request appropriate to the current view,
   * sort order, etc.
   */
  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        this.getSortParameter()
      ]
    };
  }

  public getSortParameter(): SearchTaskParameter {
    return {
      key: this.sortedBy.fieldName,
      operator: 'sort',
      values: [ this.sortedBy.order ]
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
    // TODO: Remove everything below after integration.
    // This is all to prove the mechanism works.
    console.log('Task Home received Sort on:');
    console.log(fieldName);
    console.log('Faking the sort now');
    let order: TaskSort = TaskSort.ASC;
    if (this.sortedBy.fieldName === fieldName && this.sortedBy.order === TaskSort.ASC) {
      order = TaskSort.DSC;
    }
    this.sortedBy = { fieldName, order };

    this.loadTasks();
  }

  /**
   * InvokedTaskAction from the Task List Component, so that we can handle the User's
   * action.
   */
  public onActionHandler(taskAction: InvokedTaskAction): void {
    // Remove after integration
    console.log('Task Home received InvokedTaskAction:');
    console.log(taskAction);
    this.router.navigate([`/tasks/${taskAction.action.id}/${taskAction.task.id}`]);
  }
}
