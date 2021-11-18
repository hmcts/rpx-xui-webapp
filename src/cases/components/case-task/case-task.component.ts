import { Component, Input, OnInit } from '@angular/core';
import { TaskPermission } from '../../../work-allocation-2/models/tasks/task-permission.model';
import { UserInfo, UserRole } from '../../../app/models';
import { SessionStorageService } from '../../../app/services';
import { Task } from '../../../work-allocation-2/models/tasks';
import { AppUtils } from '../../../app/app-utils';
import { replaceAll } from '../../../cases/utils/utils';

@Component({
  selector: 'exui-case-task',
  templateUrl: './case-task.component.html',
  styleUrls: ['./case-task.component.scss']
})
export class CaseTaskComponent implements OnInit {
  private static CASE_REFERENCE_VARIABLE = '${[CASE_REFERENCE]}';
  private static CASE_ID_VARIABLE = '${[case_id]}';
  private static TASK_ID_VARIABLE = '${[id]}';
  private static VARIABLES: string[] = [
    CaseTaskComponent.CASE_REFERENCE_VARIABLE,
    CaseTaskComponent.CASE_ID_VARIABLE,
    CaseTaskComponent.TASK_ID_VARIABLE
  ];
  public manageOptions: { text: string, path: string }[];
  public isUserJudicial: boolean;
  private pTask: Task;

  constructor(private readonly sessionStorageService: SessionStorageService) {
  }

  public get task(): Task {
    return this.pTask;
  }

  @Input()
  public set task(value: Task) {
    value.description = CaseTaskComponent.replaceVariablesWithRealValues(value);
    this.pTask = value;
  }

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
    this.manageOptions = this.getManageOptions(this.task);
  }

  public getAssigneeName(task: Task): string {
    return task.assigneeName ? task.assigneeName : 'Unassigned';
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

  public getManageOptions(task: Task): {text: string, path: string} [] {
    if (!task.assignee) {
      if (task.permissions.length === 0 || (task.permissions.length === 1 && task.permissions.includes(TaskPermission.MANAGE))) {
        return [];
      } else {
        return [{text: 'Assign to me', path: `/work/${task.id}/assign`}];
      }
    }

    if (this.isTaskAssignedToCurrentUser(task)) {
      return [
        {text: 'Reassign task', path: `/work/${task.id}/reassign`},
        {text: 'Unassign task', path: `/work/${task.id}/unclaim`}
      ];
    } else {
      if (task.permissions.includes(TaskPermission.EXECUTE) && task.permissions.includes(TaskPermission.MANAGE)) {
        return [
          {text: 'Assign to me', path: `/work/${task.id}/assign`},
          {text: 'Reassign task', path: `/work/${task.id}/reassign`},
          {text: 'Unassign task', path: `/work/${task.id}/unclaim`}
        ];
      } else if (task.permissions.includes(TaskPermission.MANAGE)) {
        return [
          {text: 'Reassign task', path: `/work/${task.id}/reassign`},
          {text: 'Unassign task', path: `/work/${task.id}/unclaim`}
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
