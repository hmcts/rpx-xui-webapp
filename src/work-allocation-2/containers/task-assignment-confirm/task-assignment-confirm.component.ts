import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { InfoMessage, InfoMessageType, TaskActionType } from 'src/work-allocation-2/enums';
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

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService) {
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
  }

  public onChange(): void {
    this.router.navigate([this.rootPath, this.taskId, 'reassign'], {state: this.selectedPerson});
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
    this.router.navigate([this.rootPath, 'list']);
  }

  public onCancel(): void {
    this.router.navigate([this.rootPath, 'list']);
  }

  private reportSuccessAndReturn(): void {
    const message = InfoMessage.REASSIGNED_TASK;
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
    this.router.navigate([this.rootPath, 'list'], {state: {...state, retainMessages: true}});
  }
}
