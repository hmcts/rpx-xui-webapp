import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from '../../../app/models';
import { SessionStorageService } from '../../../app/services';
import { Task } from '../../../work-allocation-2/models/tasks';
import { TaskPermission } from '../../../work-allocation-2/models/tasks/task-permission.model';

@Component({
  selector: 'exui-case-task',
  templateUrl: './case-task.component.html',
  styleUrls: ['./case-task.component.scss']
})
export class CaseTaskComponent implements OnInit {

  constructor(private readonly sessionStorageService: SessionStorageService) {
  }

  public get task(): Task {
    return this.pTask;
  }

  @Input()
  public set task(value: Task) {
    value.description = CaseTaskComponent.replaceCaseRefVarWithCaseId(value.description, value);
    this.pTask = value;
  }

  private static CASE_REFERENCE_VARIABLE = '${[CASE_REFERENCE]}';
  public manageOptions: { text: string, path: string }[];
  private pTask: Task;

  private static replaceCaseRefVarWithCaseId(str: string, task: Task): string {
    if (!str) {
      return '';
    }
    return str.replace(CaseTaskComponent.CASE_REFERENCE_VARIABLE, task.case_id);
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
      return task.assignee && task.assignee === userId;
    }
    return false;
  }

  public doesUserHaveOwnAndExecute(task: Task): boolean {
    return task.permissions.includes(TaskPermission.OWN) && task.permissions.includes(TaskPermission.EXECUTE);
  }

  public getManageOptions(task: Task): { text: string, path: string }[] {
    if (!task.assignee) {
      if (task.permissions.length === 0 || (task.permissions.length === 1 && task.permissions.includes(TaskPermission.MANAGE))) {
        return [];
      } else {
        return [{text: 'Assign to me', path: ''}];
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
          {text: 'Assign to me', path: ''},
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
}
