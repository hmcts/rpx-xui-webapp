import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigConstants } from '../../components/constants';
import { InfoMessage, InfoMessageType, TaskActionType, TaskService, TaskSort } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { TaskFieldConfig, TaskServiceConfig } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { ACTION } from '../../services/work-allocation-task.service';
import { getAssigneeName, handleFatalErrors } from '../../utils';

interface RouteData {
  verb: TaskActionType;
  successMessage: InfoMessage;
  description?: string;
  actionTitle?: string;
}

@Component({
  selector: 'exui-task-action-container',
  templateUrl: 'task-action-container.component.html'
})
export class TaskActionContainerComponent implements OnInit {
  public tasks: any [];
  public sortedBy: any;
  public showManage: boolean = false;

  public routeData: RouteData;

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService
  ) {}

  public get fields(): TaskFieldConfig[] {
    return ConfigConstants.TaskActionsWithAssignee;
  }

  private get returnUrl(): string {
    let url: string;
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
    const { task } = this.route.snapshot.data.taskAndCaseworkers.task;
    this.tasks = [ task ];
    this.routeData = this.route.snapshot.data as RouteData;
    if (!this.routeData.actionTitle) {
      this.routeData.actionTitle = `${this.routeData.verb} task`;
    }
    if (task.assignee) {
      task.assigneeName = getAssigneeName(this.route.snapshot.data.taskAndCaseworkers.caseworkers, task.assignee);
    }
  }

  public performAction(): void {
    let action: ACTION;
    switch (this.routeData.verb) {
      case TaskActionType.Cancel:
        action = ACTION.CANCEL;
        break;
      case TaskActionType.MarkAsDone:
        action = ACTION.COMPLETE;
        break;
      case TaskActionType.Unassign:
        action = ACTION.UNCLAIM;
        break;
      default:
        // If we get here, something has gone wrong as the only actions that should
        // be possible are the ones above.
        break;
    }

    if (action) {
      this.taskService.performActionOnTask(this.tasks[0].id, action).subscribe(() => {
        this.reportSuccessAndReturn();
      }, error => {
        const handledStatus = handleFatalErrors(error.status, this.router);
        if (handledStatus > 0) {
          this.reportUnavailableErrorAndReturn();
        }
      });
    }
  }

  public cancel(): void {
    this.returnWithMessage(null, {});
  }

  private reportSuccessAndReturn(): void {
    const message = this.routeData.successMessage;
    this.returnWithMessage(
      { type: InfoMessageType.SUCCESS, message },
      { badRequest: false }
    );
  }

  private reportUnavailableErrorAndReturn(): void {
    this.returnWithMessage(
      { type: InfoMessageType.WARNING, message: InfoMessage.TASK_NO_LONGER_AVAILABLE },
      { badRequest: true }
    );
  }

  public returnWithMessage(message: InformationMessage, state: any): void {
    if (message) {
      this.messageService.nextMessage(message);
    }
    this.router.navigateByUrl(this.returnUrl, { state: { ...state, retainMessages: true } });
  }
}
