import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessagesModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { Subscription } from 'rxjs';

import { ErrorMessage } from '../../../app/models';
import { ConfigConstants } from '../../components/constants';
import { InfoMessage, InfoMessageType, TaskActionType, TaskService, TaskSort } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { Caseworker, Location } from '../../models/dtos';
import { TaskFieldConfig, TaskServiceConfig } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { getAssigneeName, handleFatalErrors } from '../../utils';

export const NAME_ERROR: ErrorMessage = {
  title: 'There is a problem',
  description: 'You must select a name',
  fieldId: 'task_assignment_caseworker'
};

@Component({
  selector: 'exui-task-container-assignment',
  templateUrl: 'task-assignment-container.component.html'
})
export class TaskAssignmentContainerComponent implements OnInit, OnDestroy {

  public tasks: any[];
  public showManage: boolean = false;
  public verb: TaskActionType;

  public successMessage: InfoMessage;
  public excludedCaseworkers: Caseworker[];
  public location: Location;

  public formGroup: FormGroup;
  public caseworkerErrorMessage: ErrorMessagesModel = null;
  public error: ErrorMessage = null;

  private assignTask: Subscription;

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService,
    private readonly fb: FormBuilder
  ) { }

  public get fields(): TaskFieldConfig[] {
    return this.showAssigneeColumn ? ConfigConstants.TaskActionsWithAssignee : ConfigConstants.TaskActions;
  }

  private get returnUrl(): string {
    let url: string;

    if (window && window.history && window.history.state) {
      url = window.history.state.returnUrl;
    }

    return url || '/mywork/list';
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
    this.initForm();
    // Get the task from the route, which will have been put there by the resolver.
    const task = this.route.snapshot.data.taskAndCaseworkers.task.task;
    const caseworkers = this.route.snapshot.data.taskAndCaseworkers.caseworkers;
    task.assigneeName = getAssigneeName(caseworkers, task.assignee);
    this.tasks = [task];
    this.verb = this.route.snapshot.data.verb as TaskActionType;
    this.successMessage = this.route.snapshot.data.successMessage as InfoMessage;
    if (task.assignee) {
      const names: string[] = task.assignee.split(' ');
      const firstName = names.shift();
      const lastName = names.join(' ');
      this.excludedCaseworkers = [{ firstName, lastName } as Caseworker];
    }
    if (task.location) {
      this.location = { locationName: task.location } as Location;
    }
  }

  public ngOnDestroy(): void {
    if (this.assignTask) {
      this.assignTask.unsubscribe();
    }
  }

  public initForm(): void {
    this.formGroup = this.fb.group({
      caseworkerName: ['', Validators.required]
    });
  }

  public assign(): void {
    if (!this.formGroup.valid) {
      this.caseworkerErrorMessage = {
        isInvalid: true,
        messages: [
          NAME_ERROR.description
        ]
      }
      this.error = NAME_ERROR;
      return;
    }

    this.clearErrors();

    const caseworkerIdamId = this.formGroup.get('caseworkerName').value;

    this.assignTask = this.taskService.assignTask(this.tasks[0].id, { userId: caseworkerIdamId }).subscribe({
      next: () => this.reportSuccessAndReturn(),
      error: (error: any) => {
        const handledStatus = handleFatalErrors(error.status, this.router);

        if (handledStatus > 0) {
          this.reportUnavailableErrorAndReturn();
        }
      }
    });
  }

  private clearErrors() {
    this.error = null;
    this.caseworkerErrorMessage = null;
  }

  public cancel(): void {
    this.returnWithMessage(null, {});
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
