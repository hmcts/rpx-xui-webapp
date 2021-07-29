import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AssignHintText, InfoMessage, InfoMessageType, TaskActionType } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { Person } from '../../models/dtos';
import { TaskAssigneeModel } from '../../models/tasks/task-assignee.model';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { handleFatalErrors } from '../../utils';

@Component({
  selector: 'exui-task-assignment-confirm',
  templateUrl: './task-assignment-confirm.component.html'
})
export class TaskAssignmentConfirmComponent implements OnInit {

  public verb: TaskActionType;
  public taskId: string;
  public rootPath: string;
  public taskAndCaseworker: TaskAssigneeModel;
  public successMessage: InfoMessage;
  public assignTask: any;
  public selectedPerson: Person;
  public assignHintText: string;

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService) {
  }

  private get returnUrl(): string {
    // Default URL is '' because this is the only sensible return navigation if the user has used browser navigation
    // buttons, which clear the `window.history.state` object
    let url: string = '';

    // The returnUrl is undefined if the user has used browser navigation buttons, so check for its presence
    if (window && window.history && window.history.state && window.history.state.returnUrl) {
      url = window.history.state.returnUrl;
    }

    return url;
  }

  public ngOnInit(): void {
    this.verb = this.route.snapshot.data.verb as TaskActionType;
    this.taskId = this.route.snapshot.params['taskId'];
    this.rootPath = this.router.url.split('/')[1];
    this.taskAndCaseworker = this.route.snapshot.data.taskAndCaseworkers.data;
    this.route.paramMap
      .pipe(map(() => window.history.state)).subscribe(person => {
      this.selectedPerson = person;
    });
    this.assignHintText = this.verb === 'Assign' ? AssignHintText.CHECK_ASSIGNING : AssignHintText.CHECK_REASSIGNING;
  }

  public onChange(): void {
    this.router.navigate([this.rootPath, this.taskId, this.verb.toLowerCase()], {state: this.selectedPerson});
  }

  public onSubmit(): void {
    this.assignTask = this.taskService.assignTask(this.taskId, {userId: this.selectedPerson.id}).subscribe({
      next: () => this.reportSuccessAndReturn(),
      error: (error: any) => {
        const handledStatus = handleFatalErrors(error.status, this.router);

        if (handledStatus > 0) {
          this.reportUnavailableErrorAndReturn();
        }
      }
    });
  }

  public onCancel(): void {
    // Use returnUrl to return the user to the "All work" or "My work" screen, depending on which one they started from
    this.router.navigate([this.returnUrl]);
  }

  private reportSuccessAndReturn(): void {
    const message = this.verb === 'Assign' ? InfoMessage.ASSIGNED_TASK : InfoMessage.REASSIGNED_TASK;
    this.returnWithMessage(
      {type: InfoMessageType.SUCCESS, message},
      {badRequest: false}
    );
  }

  private reportUnavailableErrorAndReturn(): void {
    this.returnWithMessage({
      type: InfoMessageType.WARNING,
      message: InfoMessage.TASK_NO_LONGER_AVAILABLE,
    }, {badRequest: true});
  }

  private returnWithMessage(message: InformationMessage, state: any): void {
    if (message) {
      this.messageService.nextMessage(message);
    }
    // Use returnUrl to return the user to the "All work" or "My work" screen, depending on which one they started from
    this.router.navigate([this.returnUrl], {state: {...state, retainMessages: true}});
  }
}
