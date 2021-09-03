import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from '../../../app/models';
import { SessionStorageService } from '../../../app/services';
import { Task } from '../../../work-allocation-2/models/tasks';

@Component({
  selector: 'exui-case-task',
  templateUrl: './case-task.component.html',
  styleUrls: ['./case-task.component.scss']
})
export class CaseTaskComponent implements OnInit {
  @Input() public task: Task;
  public manageOptions: Array<{text: string, path: string}>;
  constructor(private readonly sessionStorageService: SessionStorageService) {}

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
    return task.permissions.includes('Own') && task.permissions.includes('Execute');
  }

  public getManageOptions(task: Task): Array<{text: string, path: string}> {
    if (!task.assignee) {
      if (task.permissions.length === 0 || (task.permissions.length === 1 && task.permissions.includes('Manage'))) {
        return [];
      } else {
        return [{text: 'Assign to me', path: ''}];
      }
    }

    if (this.isTaskAssignedToCurrentUser(task)) {
      return [
        {text: 'Assign to me', path: ''},
        {text: 'Reassign task', path: `/work/${task.id}/reassign`},
        {text: 'Unassign task', path: `/work/${task.id}/unclaim`}
      ];
    } else {
      if (task.permissions.includes('Execute') && task.permissions.includes('Manage')) {
        return [
          {text: 'Assign to me', path: ''},
          {text: 'Reassign task', path: `/work/${task.id}/reassign`},
          {text: 'Unassign task', path: `/work/${task.id}/unclaim`}
        ];
      } else if (task.permissions.includes('Manage')) {
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
