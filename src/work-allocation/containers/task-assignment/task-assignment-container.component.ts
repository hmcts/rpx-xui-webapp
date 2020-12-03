import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkAllocationTaskService } from 'src/work-allocation/services/work-allocation-task.service';

import { TaskFieldType, TaskService, TaskSort, TaskView } from '../../enums';
import TaskServiceConfig from '../../models/tasks/task-service-config.model';
import { Assignee, Caseworker } from './../../models/dtos/task';
import { Task, TaskFieldConfig } from './../../models/tasks';
import WorkAllocationUtils from './../../work-allocation.utils';

@Component({
  selector: 'exui-task-container-assignment',
  templateUrl: 'task-assignment-container.component.html',
  styleUrls: ['task-assignment-container.component.scss']
})
export class TaskAssignmentContainerComponent implements OnInit {
  public tasks: any [];
  public sortedBy: any;
  public showManage: boolean = false;
  public showProblem: boolean = false;
  public errorTitle: string;
  public errorDesc: string;
  public caseworker: Caseworker;

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
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
    if (!this.caseworker) {
      this.showProblem = true;
      this.errorTitle = "There is a problem";
      this.errorDesc = "You must select a name";
      return;
    }
    const assignee: Assignee = {
      id: this.caseworker.idamId,
      userName: `${this.caseworker.firstName} ${this.caseworker.lastName}`
    };
    console.log('Reassigning, but using a fake assignee for the PACT stub', assignee);
    this.taskService.assignTask(this.tasks[0].id, assignee).subscribe(
      err => {this.router.navigate([WorkAllocationUtils.handleTaskAssignErrorResult(err.status)])},
      () => {console.log('assignment was successful: received a 200 status');
      this.location.back();
    }, error => {
      console.error('There was an error when attempting to assign', error);
    });
  }

  public onCaseworkerChanged(caseworker: Caseworker): void {
    this.caseworker = caseworker;
  }
}
