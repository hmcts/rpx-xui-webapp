import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkAllocationTaskService } from 'src/work-allocation/services/work-allocation-task.service';

import { TaskService, TaskSort } from '../../enums';
import { SearchTaskRequest } from '../../models/dtos/search-task-request';
import { Task, TaskFieldConfig, TaskSortField } from '../../models/tasks';
import InvokedTaskAction from '../../models/tasks/invoked-task-action.model';
import TaskServiceConfig from '../../models/tasks/task-service-config.model';
import {WorkAllocationTaskService} from '../../services/work-allocation-task.service';

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

  public get taskService(): WorkAllocationTaskService {
    return this.taskService;
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
    this.router.navigate([`/tasks/${taskAction.action.id}/${taskAction.task.id}`]);
  }
}
