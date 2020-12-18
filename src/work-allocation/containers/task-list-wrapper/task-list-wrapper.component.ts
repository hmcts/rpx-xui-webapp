import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {InfoMessage, InfoMessageType, TaskService, TaskSort} from '../../enums';
import { SearchTaskParameter, SearchTaskRequest } from '../../models/dtos';
import { InvokedTaskAction, Task, TaskFieldConfig, TaskServiceConfig, TaskSortField } from '../../models/tasks';
import { InfoMessageCommService, SessionStorageService, WorkAllocationTaskService } from '../../services';
import { DEFAULT_EMPTY_MESSAGE } from '../task-list/task-list.component';
import {InformationMessage} from '../../models/comms';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'task-list-wrapper.component.html'
})
export class TaskListWrapperComponent implements OnInit {

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected ref: ChangeDetectorRef,
    protected taskService: WorkAllocationTaskService,
    protected router: Router,
    protected infoMessageCommService: InfoMessageCommService,
    protected sessionStorageService: SessionStorageService
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

  public ngOnInit(): void {
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
    // Should this clear out the existing set first?
    this.performSearch().subscribe(result => {
      // Swap the commenting on these two lines to see the behaviour
      // when no tasks are returned.
      // NOTE: Do not commit them in a swapped state!
      this.tasks = result.tasks;
      this.ref.detectChanges();
      // this.tasks = [];
    });
  }

  /**
   * On the return of the refreshed tasks, we throw up a refresh message.
   */
  public refreshTasks(): void {

    this.performSearch().subscribe(result => {

      this.tasks = result.tasks;
      this.ref.detectChanges();

      const message: InformationMessage = {
        type: InfoMessageType.INFO,
        message: InfoMessage.LIST_OF_AVAILABLE_TASKS_REFRESHED,
      };

      this.infoMessageCommService.addMessage(message);
    });
  }

  public performSearch(): Observable<any> {

    const searchTaskRequest = this.getSearchTaskRequest();
    return this.taskService.searchTask(searchTaskRequest);
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
    this.sessionStorageService.setItem(this.sortSessionKey, JSON.stringify(this.sortedBy));

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
