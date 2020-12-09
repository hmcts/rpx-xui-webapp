import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkAllocationTaskService } from 'src/work-allocation/services/work-allocation-task.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskService, TaskSort, InfoMessageType, InfoMessage } from '../../enums';
import { Task, TaskFieldConfig, TaskSortField } from '../../models/tasks';
import InvokedTaskAction from '../../models/tasks/invoked-task-action.model';
import TaskServiceConfig from '../../models/tasks/task-service-config.model';
import WorkAllocationUtils from '../../work-allocation.utils';
import { DEFAULT_EMPTY_MESSAGE } from '../task-list/task-list.component';
import { SearchTaskRequest } from 'api/workAllocation/interfaces/taskSearchParameter';

@Component({
  selector: 'exui-task-list-wrapper',
  templateUrl: 'task-list-wrapper.component.html'
})
export class TaskListWrapperComponent implements OnInit {

  public state$: Observable<object>;

  public badRequest: Boolean = false;

  public messages: any[];

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected taskService: WorkAllocationTaskService,
    protected router: Router,
    protected route: ActivatedRoute
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

  public ngOnInit(): void {

    // check if an error has been returned with the page
    this.state$ = this.route.paramMap
    .pipe(map(() => window.history.state))
    // if an error has been returned from the page then return the correct info messages
    if (this.badRequestPresent()) {
      this.messages = [{infoMessage: InfoMessage.TASK_NO_LONGER_AVAILABLE, infoMessageType: InfoMessageType.WARNING},
                       {infoMessage: InfoMessage.LIST_OF_AVAILABLE_TASKS_REFRESHED, infoMessageType: InfoMessageType.INFO}]
    }
    // Set up the default sorting.
    this.sortedBy = {
      fieldName: this.taskServiceConfig.defaultSortFieldName,
      order: this.taskServiceConfig.defaultSortDirection
    };

    this.loadTasks();
  }

  /**
   * Load the tasks to display in the component.
   * NOTE: This should be overridden by a component that
   * needs different behaviour.
   */
  public loadTasks(): void {
    const searchTaskRequest = this.getSearchTaskRequest();
    this.taskService.searchTask(searchTaskRequest).subscribe(result => {
      // Swap the commenting on these two lines to see the behaviour
      // when no tasks are returned.
      // NOTE: Do not commit them in a swapped state!
      this.tasks = result.tasks;
    }, error => {
      const navigateTo = WorkAllocationUtils.handleTaskAssignErrorResult(error.status)
      this.router.navigate([navigateTo]);
    });
  }

  /**
   * Get a search task request appropriate to the current view,
   * sort order, etc.
   */
  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        {
          key: this.sortedBy.fieldName,
          operator: 'available',
          values: [ this.sortedBy.order ]
        }
      ]
    };
  }

  // Check if the task list has been routed to because of an error
  public badRequestPresent(): boolean {

    if (this.route.snapshot.paramMap.get('badRequest') === 'true') {
      return true;
    }
    else {
      return false;
    }
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
