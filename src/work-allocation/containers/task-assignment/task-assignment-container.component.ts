import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfigConstants } from '../../components/constants';
import { TaskService, TaskSort } from '../../enums';
import { Assignee, Caseworker } from '../../models/dtos';
import { TaskFieldConfig, TaskServiceConfig } from '../../models/tasks';
import { WorkAllocationTaskService } from '../../services';

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
    private readonly location: Location
  ) {}

  public get fields(): TaskFieldConfig[] {
    return ConfigConstants.TaskActions;
  }

  public taskServiceConfig: TaskServiceConfig = {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.ASC,
    defaultSortFieldName: 'dueDate',
    fields: this.fields,
  };
  public manageLink = '';
  public ngOnInit(): void {
    // Set up the default sorting.
    this.sortedBy = {
      fieldName: this.taskServiceConfig.defaultSortFieldName,
      order: this.taskServiceConfig.defaultSortDirection
    };

    // Get the task from the route, which will have been put there by the resolver.
    const { task } = this.route.snapshot.data.task;
    this.manageLink = `manage_${task.id}`;
    this.tasks = [ task ];
  }

  public reassign(): void {
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

  public cancel(): void {
    this.location.back();
  }

  public onCaseworkerChanged(caseworker: Caseworker): void {
    this.caseworker = caseworker;
  }
}
