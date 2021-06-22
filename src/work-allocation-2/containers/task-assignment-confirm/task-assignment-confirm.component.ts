import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoMessage, InfoMessageType, TaskActionType } from 'src/work-allocation-2/enums';
import { handleFatalErrors } from '../../utils';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';
import { InformationMessage } from '../../models/comms';
import { TaskAssigneeModel } from '../../models/tasks/task-assignee.model';
import { map } from 'rxjs/operators';
import { Person } from '../../models/dtos';

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
    private readonly messageService: InfoMessageCommService) { }

  public ngOnInit(): void {
    this.verb = this.route.snapshot.data.verb as TaskActionType;
    this.taskId = this.route.snapshot.params['taskId'];
    // @ts-ignore
    this.rootPath = this.route.snapshot._urlSegment.segments[0].path;
    this.taskAndCaseworker = this.route.snapshot.data.taskAndCaseworkers.data;
    console.log('this.taskAndCaseworker=' + this.taskAndCaseworker);
    this.route.paramMap
      .pipe(map(() => window.history.state)).subscribe(person => {
        this.selectedPerson = person;
      });
  }

  public onChange(): void {
    // console.log('route=' + JSON.stringify(this.route.url));
    // this.router.navigate('/reassign');
    // console.log('this.route.snapshot._urlSegment.segment[0].path=' + this.route.snapshot._urlSegment.segments[0].path);
    this.router.navigate([this.rootPath, this.taskId, 'reassign']);
  }

  public onSubmit(): void {
    this.assignTask = this.taskService.assignTask(this.taskId, { userId: this.selectedPerson.id }).subscribe({
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
    this.router.navigate([this.rootPath, 'list'], { state: { ...state, retainMessages: true } });
  }
}
