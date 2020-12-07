import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService, TaskSort, TaskActionIds } from '../../enums';
import { SearchTaskRequest } from '../../models/dtos/search-task-request';
import { Task, TaskFieldConfig, TaskSortField } from '../../models/tasks';
import InvokedTaskAction from '../../models/tasks/invoked-task-action.model';
import TaskServiceConfig from '../../models/tasks/task-service-config.model';
import { WorkAllocationTaskService } from '../../services/work-allocation-task.service';

@Component({
  templateUrl: 'task-list-wrapper.component.html'
})
export class TaskListWrapperComponent implements OnInit {

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected taskService: WorkAllocationTaskService,
    private readonly router: Router
  ) {}

  public get tasks(): Task[] {
    return [];
  }
  public set tasks(value: Task[]) {
    // To be overridden.
  }

  public get fields(): TaskFieldConfig[] {
    return [];
  }

  public get taskServiceConfig(): TaskServiceConfig {
    return this.defaultTaskServiceConfig;
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
   * NOTE: This should be overridden by a component that
   * needs different behaviour.
   */
  public loadTasks(): void {
    const searchTaskRequest = this.getSearchTaskRequest();
    this.taskService.searchTask(searchTaskRequest).subscribe(result => {
      this.tasks = result.tasks;
    });
  }

  /**
   * User claims a task.
   *
   * Does this link into assign tasks?
   */
  public claimTask(taskId): void {

    console.log('claimTask');
    console.log(taskId);

    this.taskService.claimTask(taskId).subscribe(claimTask => {
      console.log('claimTask Response');
      console.log(claimTask);
    });
  }

  public navigateToTask(actionId, taskId): void {

    this.router.navigate([`/tasks/${actionId}/${taskId}`]);
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
    switch (taskAction.action.id) {
      case TaskActionIds.REASSIGN:
        this.navigateToTask(taskAction.action.id, taskAction.task.id);
        break;
      case TaskActionIds.CLAIM:
        console.log('claim task');
        this.claimTask(taskAction.task.id);
        break;
      default:
        this.navigateToTask(taskAction.action.id, taskAction.task.id);
    }
    // On an Assignment if the service returns a 200 then we need to popup a message
    // on this page.
  }
}
