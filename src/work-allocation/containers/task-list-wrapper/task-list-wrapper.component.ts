import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService, TaskSort } from '../../enums';
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
  constructor(private readonly router: Router,
              private readonly workAllocationTaskService: WorkAllocationTaskService
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
    return this.workAllocationTaskService;
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

    // Remove after integration.
    this.sortTasks();
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

    // Now sort the tasks.
    this.sortTasks();
  }

  /**
   * InvokedTaskAction from the Task List Component, so that we can handle the User's
   * action.
   */
  public onActionHandler(taskAction: InvokedTaskAction): void {

    // Remove after integration
    console.log('Task Home received InvokedTaskAction:');
    console.log(taskAction.task.id);
    this.router.navigate([`/tasks/reassign/123456`]);
  }

  // Remove after integration.
  private sortTasks(): void {
    if (this.tasks && this.sortedBy) {
      this.tasks = this.tasks.sort((a: Task, b: Task) => {
        const aVal = a[this.sortedBy.fieldName];
        const bVal = b[this.sortedBy.fieldName];
        let sortVal = 0;
        if (typeof aVal === 'string') {
          sortVal = aVal.localeCompare(bVal);
        } else if (aVal instanceof Date) {
          sortVal = aVal.getTime() - new Date(bVal).getTime();
        }
        return this.sortedBy.order === TaskSort.ASC ? sortVal : -sortVal;
      });
    }
  }
}
