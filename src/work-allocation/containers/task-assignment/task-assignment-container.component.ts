import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorMessage } from '../../../app/models';
import { ConfigConstants } from '../../components/constants';
import { Assignment, InfoMessage, InfoMessageType, TaskService, TaskSort } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { Assignee, Caseworker } from '../../models/dtos';
import { TaskFieldConfig, TaskServiceConfig } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';

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
  public verb: Assignment;

  private successMessage: InfoMessage;

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
    this.verb = this.route.snapshot.data.verb as Assignment;
    this.successMessage = this.route.snapshot.data.successMessage as InfoMessage;
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
    this.returnWithMessages([], {});
  }

  public onCaseworkerChanged(caseworker: Caseworker): void {
    this.caseworker = caseworker;
  }

  private reportSuccessAndReturn(): void {
    const message = this.successMessage;
    this.returnWithMessages(
      [
        { type: InfoMessageType.SUCCESS, message }
      ],
      { badRequest: false }
    );
  }

  private reportUnavailableErrorAndReturn(): void {
    this.returnWithMessages(
      [
        { type: InfoMessageType.WARNING, message: InfoMessage.TASK_NO_LONGER_AVAILABLE },
        { type: InfoMessageType.INFO, message: InfoMessage.LIST_OF_TASKS_REFRESHED }
      ],
      { badRequest: true }
    );
  }

  private returnWithMessages(messages: InformationMessage[], state: any): void {
    if (messages.length > 0) {
      this.messageService.removeAllMessages();
      for (const message of messages) {
        this.messageService.addMessage(message);
      }
    }
    this.router.navigateByUrl(this.returnUrl, { state: { ...state, retainMessages: true } });
  }
}
