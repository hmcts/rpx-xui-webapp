import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigConstants } from '../../components/constants';
import { InfoMessage, InfoMessageType, TaskService, TaskSort } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { Assignee, Caseworker } from '../../models/dtos';
import { TaskFieldConfig, TaskServiceConfig } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';

@Component({
  selector: 'exui-task-container-assignment',
  templateUrl: 'task-assignment-container.component.html',
  styleUrls: ['task-assignment-container.component.scss']
})
export class TaskAssignmentContainerComponent implements OnInit {
  public showProblem: boolean = false;
  public errorTitle: string;
  public errorDesc: string;
  public tasks: any [];
  public sortedBy: any;
  public showManage: boolean = false;
  public caseworker: Caseworker;

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService
  ) {}

  public get fields(): TaskFieldConfig[] {
    return ConfigConstants.TaskActions;
  }

  private get returnUrl(): string {
    let url;
    if (window && window.history && window.history.state) {
      url = window.history.state.returnUrl;
    }
    return url || '/tasks/list';
  }

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

  public reassign(): void {
    if (!this.caseworker) {
      this.showProblem = true;
      this.errorTitle = 'There is a problem';
      this.errorDesc = 'You must select a name';
      return;
    }
    const assignee: Assignee = {
      id: this.caseworker.idamId,
      userName: `${this.caseworker.firstName} ${this.caseworker.lastName}`
    };
    this.taskService.assignTask(this.tasks[0].id, assignee).subscribe(() => {
      this.reportSuccessAndReturn();
    }, error => {
      switch (error.status) {
        case 401:
        case 403:
          this.router.navigate(['/not-authorised']);
          break;
        case 500:
          this.router.navigate(['/service-down']);
          break;
        default:
          this.reportUnavailableErrorAndReturn();
          break;
      }
    });
  }

  public cancel(): void {
    this.returnWithMessage(null, {});
  }

  public onCaseworkerChanged(caseworker: Caseworker): void {
    this.caseworker = caseworker;
  }

  private reportSuccessAndReturn(): void {
    this.returnWithMessage({
      type: InfoMessageType.SUCCESS,
      message: InfoMessage.ASSIGNED_TASK,
    }, { badRequest: false });
  }

  private reportUnavailableErrorAndReturn(): void {
    this.returnWithMessage({
      type: InfoMessageType.WARNING,
      message: InfoMessage.TASK_NO_LONGER_AVAILABLE,
    }, { badRequest: true });
  }

  private returnWithMessage(message: InformationMessage, state: any): void {
    if (message) {
      this.messageService.emitInfoMessageChange(message);
    }
    this.router.navigateByUrl(this.returnUrl, { state: { ...state, message } });
  }
}
