import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorMessage } from '../../../app/models';
import { ConfigConstants } from '../../components/constants';
import { InfoMessage, InfoMessageType, TaskActionType, TaskService, TaskSort } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { Assignee, Caseworker, Location } from '../../models/dtos';
import { TaskFieldConfig, TaskServiceConfig } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { handleFatalErrors } from '../../utils';

export const NAME_ERROR: ErrorMessage = {
  title: 'There is a problem',
  description: 'You must select a name',
  fieldId: 'task_assignment_caseworker'
};
@Component({
  selector: 'exui-task-container-assignment',
  templateUrl: 'task-assignment-container.component.html',
  styleUrls: ['task-assignment-container.component.scss']
})
export class TaskAssignmentContainerComponent implements OnInit {
  public error: ErrorMessage = null;
  public tasks: any [];
  public sortedBy: any;
  public showManage: boolean = false;
  public caseworker: Caseworker;
  public verb: TaskActionType;

  public successMessage: InfoMessage;
  public excludedCaseworkers: Caseworker[];
  public location: Location;

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService
  ) {}

  public get fields(): TaskFieldConfig[] {
    return this.showAssigneeColumn ? ConfigConstants.TaskActionsWithAssignee : ConfigConstants.TaskActions;
  }

  private get returnUrl(): string {
    let url;
    if (window && window.history && window.history.state) {
      url = window.history.state.returnUrl;
    }
    return url || '/tasks/list';
  }

  private get showAssigneeColumn(): boolean {
    if (window && window.history && window.history.state) {
      return !!window.history.state.showAssigneeColumn;
    }
    return false;
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
    this.verb = this.route.snapshot.data.verb as TaskActionType;
    this.successMessage = this.route.snapshot.data.successMessage as InfoMessage;
    if (task.assignee) {
      const names: string[] = task.assignee.split(' ');
      const firstName = names.shift();
      const lastName = names.join(' ');
      this.excludedCaseworkers = [ { firstName, lastName } as Caseworker ];
    }
    if (task.location) {
      this.location = { locationName: task.location } as Location;
    }
  }

  public assign(): void {
    if (!this.caseworker) {
      this.error = NAME_ERROR;
      return;
    }
    this.error = null;
    const assignee: Assignee = {
      id: this.caseworker.idamId,
      userName: `${this.caseworker.firstName} ${this.caseworker.lastName}`
    };
    this.taskService.assignTask(this.tasks[0].id, assignee).subscribe(() => {
      this.reportSuccessAndReturn();
    }, error => {
      const handledStatus = handleFatalErrors(error.status, this.router);
      if (handledStatus > 0) {
        this.reportUnavailableErrorAndReturn();
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
    const message = this.successMessage;
    this.returnWithMessage(
      { type: InfoMessageType.SUCCESS, message },
      { badRequest: false }
    );
  }

  private reportUnavailableErrorAndReturn(): void {
    this.returnWithMessage({
      type: InfoMessageType.WARNING,
      message: InfoMessage.TASK_NO_LONGER_AVAILABLE,
    }, { badRequest: true });
  }

  private returnWithMessage(message: InformationMessage, state: any): void {
    if (message) {
      this.messageService.nextMessage(message);
    }
    this.router.navigateByUrl(this.returnUrl, { state: { ...state, retainMessages: true } });
  }
}
