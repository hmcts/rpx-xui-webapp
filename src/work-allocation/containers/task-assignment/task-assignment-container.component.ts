import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkAllocationTaskService } from 'src/work-allocation/services/work-allocation-task.service';

import { TaskFieldType, TaskService, TaskSort, TaskView } from '../../enums';
import TaskServiceConfig from '../../models/tasks/task-service-config.model';
import { Assignee, Caseworker } from './../../models/dtos/task';
import { TaskFieldConfig } from './../../models/tasks';

@Component({
  selector: 'exui-task-container-assignment',
  templateUrl: 'task-assignment-container.component.html',
  styleUrls: ['task-assignment-container.component.scss']
})
export class TaskAssignmentContainerComponent implements OnInit {
  public tasks: any [];
  public sortedBy: any;
  public showManage: boolean = false;
  public caseworker: Caseworker;

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router
  ) {}

  /**
   * Mock TaskFieldConfig[]
   *
   * Fields is the property of the TaskFieldConfig[], containing the configuration
   * for the fields as returned by the API.
   *
   * The sorting will handled by this component, via the
   * WP api as this component.
   */
  public fields: TaskFieldConfig[] = [
    {
      name: 'caseReference',
      type: TaskFieldType.CASE_REFERENCE,
      columnLabel: 'Case reference',
      views: TaskView.TASK_LIST,
    },
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
    }
  ];

  public taskServiceConfig: TaskServiceConfig = {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.ASC,
    defaultSortFieldName: 'dueDate',
    fields: this.fields,
  };
  public readonly manageLink = 'manage_5678901234567890';
  public ngOnInit(): void {
    // Set up the default sorting.
    this.sortedBy = {
      fieldName: this.taskServiceConfig.defaultSortFieldName,
      order: this.taskServiceConfig.defaultSortDirection
    };

    // Get the task from the route, which will have been put there by the resolver.
    const { task } = this.route.snapshot.data.task;
    this.tasks = [ task ];
  }

  public reAssign(): void {
    this.router.navigate(['/tasks'], {fragment: this.manageLink});
    if (!this.caseworker) {
      console.error('No caseworker selected. This is part of the unhappy path that is not yet done.');
      return;
    }
    const assignee: Assignee = {
      id: this.caseworker.idamId,
      userName: `${this.caseworker.firstName} ${this.caseworker.lastName}`
    };
    this.taskService.assignTask(this.tasks[0].id, assignee).subscribe(() => {
      console.log('assignment was successful');
      this.location.back();
    }, error => {
      console.error('There was an error when attempting to assign', error);
    });
  }

  public onCaseworkerChanged(caseworker: Caseworker): void {
    this.caseworker = caseworker;
  }
}
