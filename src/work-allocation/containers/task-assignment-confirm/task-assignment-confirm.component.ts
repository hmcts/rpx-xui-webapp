import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '@hmcts/ccd-case-ui-toolkit';
import { Person } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { AppUtils } from '../../../app/app-utils';
import { InfoMessage } from '../../../app/shared/enums/info-message';
import { InformationMessage } from '../../../app/shared/models';
import { UserInfo, UserRole } from '../../../app/models';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { RoleCategory } from '../../../role-access/models';
import { InfoMessageType } from '../../../role-access/models/enums';
import { AssignHintText, TaskActionType } from '../../enums';
import { Task } from '../../models/tasks';
import { WorkAllocationTaskService } from '../../services';
import { handleTasksFatalErrors } from '../../utils';

@Component({
  selector: 'exui-task-assignment-confirm',
  templateUrl: './task-assignment-confirm.component.html'
})
export class TaskAssignmentConfirmComponent implements OnInit {
  public verb: TaskActionType;
  public taskId: string;
  public rootPath: string;
  public task: Task;
  public successMessage: InfoMessage;
  public assignTask: any;
  public selectedPerson: Person;
  public assignHintText: string;
  public isUserJudicial: boolean;
  public roleCategory: RoleCategory;

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService,
    private readonly sessionStorageService: SessionStorageService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.selectedPerson = navigation.extras.state.selectedPerson;
      this.roleCategory = navigation.extras.state.roleCategory;
    }
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
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      if (userInfo) {
        this.isUserJudicial = AppUtils.getUserRole(userInfo.roles) === UserRole.Judicial;
      }
    }
    this.verb = this.route.snapshot.data.verb as TaskActionType;
    this.taskId = this.route.snapshot.params.taskId;
    if (this.router && this.router.url) {
      this.rootPath = this.router.url.split('/')[1];
    }
    this.task = this.route.snapshot.data.taskAndCaseworkers.task.task;
    this.assignHintText = this.verb === 'Assign' ? AssignHintText.CHECK_ASSIGNING : AssignHintText.CHECK_REASSIGNING;
  }

  public onChange(): void {
    this.router.navigate(
      [this.rootPath, this.taskId, this.verb.toLowerCase()],
      {
        state: {
          person: this.selectedPerson,
          returnUrl: this.returnUrl
        },
        queryParams: {
          roleCategory: this.roleCategory,
          service: this.task.jurisdiction
        }
      }
    );
  }

  public onSubmit(): void {
    this.assignTask = this.taskService.assignTask(this.taskId, { userId: this.selectedPerson.id }).subscribe({
      next: () => this.reportSuccessAndReturn(),
      error: (error: any) => {
        const handledStatus = handleTasksFatalErrors(error.status, this.router, null, this.returnUrl);

        if (handledStatus > 0) {
          this.reportUnavailableErrorAndReturn();
        }
      }
    });
  }

  public onCancel(): void {
    // Use returnUrl to return the user to the "All work", "My work" or "Cases - Tasks" screen, depending on which one they started from
    this.router.navigate([this.returnUrl]);
  }

  public getDueDateTitle(): string {
    return this.isUserJudicial ? 'Task created' : 'Due date';
  }

  public toDate(value: string | number | Date): Date {
    if (value) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }

  private reportSuccessAndReturn(): void {
    const message = this.verb === 'Assign' ? InfoMessage.ASSIGNED_TASK : InfoMessage.REASSIGNED_TASK;
    this.returnWithMessage(
      { type: InfoMessageType.SUCCESS, message },
      { badRequest: false }
    );
  }

  private reportUnavailableErrorAndReturn(): void {
    this.returnWithMessage({
      type: InfoMessageType.WARNING,
      message: InfoMessage.TASK_NO_LONGER_AVAILABLE
    }, { badRequest: true });
  }

  private returnWithMessage(message: InformationMessage, state: any): void {
    if (message) {
      if (this.returnUrl.includes('case-details')) {
        state = {
          showMessage: true,
          messageText: message.message
        };
      } else {
        this.messageService.nextMessage(message);
      }
    }
    // Use returnUrl to return the user to the "All work" or "My work" screen, depending on which one they started from
    this.router.navigate([this.returnUrl], { state: { ...state, retainMessages: true } });
  }
}
