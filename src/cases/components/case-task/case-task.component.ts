import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';
import { SessionStorageService } from '../../../app/services';
import { replaceAll } from '../../../cases/utils/utils';
import { Caseworker } from '../../../work-allocation-2/models/dtos';
import { Task, TaskPermission } from '../../../work-allocation-2/models/tasks';
import { WorkAllocationTaskService } from '../../../work-allocation-2/services';
import { getAssigneeName, handleTasksFatalErrors, REDIRECTS } from '../../../work-allocation-2/utils';

@Component({
  selector: 'exui-case-task',
  templateUrl: './case-task.component.html',
  styleUrls: ['./case-task.component.scss']
})
export class CaseTaskComponent implements OnInit {
  private static readonly CASE_REFERENCE_VARIABLE = '${[CASE_REFERENCE]}';
  private static readonly CASE_ID_VARIABLE = '${[case_id]}';
  private static readonly TASK_ID_VARIABLE = '${[id]}';
  private static readonly VARIABLES: string[] = [
    CaseTaskComponent.CASE_REFERENCE_VARIABLE,
    CaseTaskComponent.CASE_ID_VARIABLE,
    CaseTaskComponent.TASK_ID_VARIABLE
  ];
  public manageOptions: { text: string, path: string, state: any }[];
  public isUserJudicial: boolean;
  private pTask: Task;
  private returnUrl = '';

  constructor(private readonly router: Router,
              private readonly sessionStorageService: SessionStorageService,
              protected taskService: WorkAllocationTaskService) {
  }

  public get task(): Task {
    return this.pTask;
  }

  @Input()
  public set task(value: Task) {
    value.description = CaseTaskComponent.replaceVariablesWithRealValues(value);
    this.pTask = value;
  }

  @Input() public caseworkers: Caseworker[] = [];

  /**
   * Emit an event to refresh tasks
   */
   @Output() public taskRefreshRequired: EventEmitter<void>
   = new EventEmitter();

  public static replaceVariablesWithRealValues(task: Task): string {
    if (!task.description) {
      return '';
    }
    return CaseTaskComponent.VARIABLES.reduce((description: string, variable: string) => {
      if (variable === CaseTaskComponent.TASK_ID_VARIABLE) {
        return replaceAll(description, variable, task.id);
      }
      return replaceAll(description, variable, task.case_id);
    }, task.description);
  }

  public ngOnInit(): void {
    this.returnUrl = this.router.url;
    this.manageOptions = this.getManageOptions(this.task);
  }

  public getAssigneeName(task: Task): string {
    return task.assignee ? getAssigneeName(this.caseworkers, task.assignee) : 'Unassigned';
  }

  public isTaskAssignedToCurrentUser(task: Task): boolean {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      const userId = userInfo.id ? userInfo.id : userInfo.uid;
      this.isUserJudicial = AppUtils.isLegalOpsOrJudicial(userInfo.roles) === UserRole.Judicial;
      return task.assignee && task.assignee === userId;
    }
    return false;
  }

  public doesUserHaveOwnAndExecute(task: Task): boolean {
    return task.permissions.includes(TaskPermission.OWN) && task.permissions.includes(TaskPermission.EXECUTE);
  }

  public getDueDateTitle(): string {
    return this.isUserJudicial ? 'Task created' : 'Due date';
  }

  public onActionHandler(task: Task, option: any): void {
    if (option.id === 'claim') {
      this.taskService.claimTask(task.id).subscribe(() => {
        /* this.infoMessageCommService.nextMessage({
          type: InfoMessageType.SUCCESS,
          message: InfoMessage.ASSIGNED_TASK_AVAILABLE_IN_MY_TASKS,
        }); */
        this.taskRefreshRequired.emit();
      }, error => {
        this.claimTaskErrors(error.status);
      });
      return;
    }
    const actionUrl = `/work/${task.id}/${option.id}`;
    this.router.navigate([actionUrl], { state: option.state});
  }

  /**
   * Navigate the User to the correct error page, or throw an on page warning
   * that the Task is no longer available.
   */
   public claimTaskErrors(status: number): void {
    const REDIRECT_404 = [{status: 404, redirectTo: REDIRECTS.ServiceDown}];
    const handledStatus = handleTasksFatalErrors(status, this.router, REDIRECT_404);
    if (handledStatus > 0) {
      // TODO: Update with case alert message
      /* this.infoMessageCommService.nextMessage({
        type: InfoMessageType.WARNING,
        message: InfoMessage.TASK_NO_LONGER_AVAILABLE,
      }); */
      if (handledStatus === 400) {
        this.taskRefreshRequired.emit();
      }
    }
  }

  public getManageOptions(task: Task): {id: string, text: string, state: any} [] {
    const state = {
      returnUrl: this.returnUrl,
    };
    if (!task.assignee) {
      if (task.permissions.length === 0 || (task.permissions.length === 1 && task.permissions.includes(TaskPermission.MANAGE))) {
        return [];
      } else {
        return [{id: 'claim', text: 'Assign to me', state}];
      }
    }

    if (this.isTaskAssignedToCurrentUser(task)) {
      return [
        {id: 'reassign', text: 'Reassign task', state},
        {id: 'unclaim', text: 'Unassign task', state}
      ];
    } else {
      if (task.permissions.includes(TaskPermission.EXECUTE) && task.permissions.includes(TaskPermission.MANAGE)) {
        return [
          {id: 'claim', text: 'Assign to me', state},
          {id: 'reassign', text: 'Reassign task', state},
          {id: 'unclaim', text: 'Unassign task', state}
        ];
      } else if (task.permissions.includes(TaskPermission.MANAGE)) {
        return [
          {id: 'reassign', text: 'Reassign task', state},
          {id: 'unclaim', text: 'Unassign task', state}
        ];
      } else {
        return [];
      }
    }
  }

    public toDate(value: string | number | Date): Date {
    if (value) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }
}
