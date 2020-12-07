import {AppUtils} from './../../../app/app-utils';
import {Router, ActivatedRoute} from '@angular/router';
import {WorkAllocationTaskService} from 'src/work-allocation/services/work-allocation-task.service';
import { Component } from '@angular/core';

import { TaskFieldType, TaskView } from '../../enums';
import { SearchTaskRequest } from '../../models/dtos/search-task-request';
import { Task, TaskFieldConfig } from '../../models/tasks';
import { TaskListWrapperComponent } from './../task-list-wrapper/task-list-wrapper.component';

@Component({
  selector: 'exui-available-tasks',
  templateUrl: 'available-tasks.component.html'
})
export class AvailableTasksComponent extends TaskListWrapperComponent {

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected taskService: WorkAllocationTaskService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    super(taskService, router, route);
  }

  // List of tasks
  private pTasks: Task[];
  public get tasks(): Task[] {
    return this.pTasks;
  }
  public set tasks(value: Task[]) {
    this.pTasks = value;
  }

  private readonly CASE_REFERENCE_FIELD: TaskFieldConfig = {
    name: 'caseReference',
    type: TaskFieldType.STRING,
    columnLabel: 'Case reference',
    views: TaskView.TASK_LIST,
  };

  /**
   * Mock TaskFieldConfig[]
   *
   * Fields is the property of the TaskFieldConfig[], containing the configuration
   * for the fields as returned by the API.
   *
   * The sorting will handled by this component, via the
   * WP api as this component.
   */
  private readonly pFields: TaskFieldConfig[] = [
    this.CASE_REFERENCE_FIELD,
    {
      name: 'caseName',
      type: TaskFieldType.STRING,
      columnLabel: 'Case name',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'caseCategory',
      type: TaskFieldType.STRING,
      columnLabel: 'Case category',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'location',
      type: TaskFieldType.STRING,
      columnLabel: 'Location',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'taskName',
      type: TaskFieldType.STRING,
      columnLabel: 'Task',
      views: TaskView.TASK_LIST,
    },
    {
      name: 'dueDate',
      type: TaskFieldType.DATE_DUE,
      columnLabel: 'Date',
      views: TaskView.TASK_LIST,
    },
  ];

  public get fields(): TaskFieldConfig[] {
    return this.pFields;
  }

  public getSearchTaskRequest(): SearchTaskRequest {
    const activatedRoute = this.router.routerState.root.snapshot;
    const data = AppUtils.getRouteData(activatedRoute);
    const operator = data.operator || 'available';
    return {
      search_parameters: [
        {
          key: this.sortedBy.fieldName,
          operator,
          values: [ this.sortedBy.order ]
        }
      ]
    };
  }
}
